const express = require('express')
const router = express.Router()
const Userschema = require('../../Models/UserModel.js')
const rust = require('../../rust_lib/pkg/rust_lib.js');
const mongoose = require('mongoose');

router.get('/',(req,res)=>{
    console.log('Signup Route called')
    res.json({ message: "this is signup route" })
})

router.post('/Signup', async (req, res) => {
    try {
        const { name, password, email, phone, address } = req.body;
        console.log('rust', rust)
        console.log('rust.validate_password_wasm:', typeof rust.validate_password_wasm);
        console.log('rust.default.validate_password_wasm:', typeof rust.default?.validate_password_wasm);
        console.log('Received signup request for:', email)

        // Validate password using Rust
        console.log("validating password")
        try {
            if (typeof rust.validate_password_wasm === "function") {
                await rust.validate_password_wasm(password);
                console.log("Password validated (top-level)");
            } else if (typeof rust.default?.validate_password_wasm === "function") {
                await rust.default.validate_password_wasm(password);
                console.log("Password validated (default)");
            } else {
                throw new Error("validate_password_wasm not found in WASM module");
            }
        } catch (error) {
            console.error("Password validation error:", error);
            return res.status(400).json({
                success: false,
                message: "Password validation failed: " + error
            });
        }
        console.log(" password validated ")
        
        // Check for existing user with same email
        console.log("checking if user email exists")
        const existingUserEmail = await Userschema.findOne({ email });
        if (existingUserEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
                field: "email",
                errorType: "duplicate"
            });
        }
        
        console.log("user doesn't exist")
        // Hash password using Rust
        console.log('hashing password')
        let hashedPassword;
        try {
            if (typeof rust.hash_password_wasm === "function") {
                hashedPassword = await rust.hash_password_wasm(password);
                console.log("Password hashed (top-level)");
            } else if (typeof rust.default?.hash_password_wasm === "function") {
                hashedPassword = await rust.default.hash_password_wasm(password);
                console.log("Password hashed (default)");
            } else {
                throw new Error("hash_password_wasm not found in WASM module");
            }
        } catch (error) {
            console.error("Password hashing error:", error);
            return res.status(500).json({
                success: false,
                message: "Password hashing failed: " + error
            });
        }
        
        // Create new user (let MongoDB handle UserID generation)
        console.log('saving user data')
        let newUser;
        try {
            newUser = await Userschema.create({
                name,
                email,
                password: hashedPassword,
                phone,
                address,
            });
        } catch (error) {
            console.error('User creation error:', error);
            
            // Handle MongoDB duplicate key errors
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                let message = "Duplicate key error";
                let fieldName = field;
                
                switch (field) {
                    case 'email':
                        message = "Email is already in use";
                        fieldName = "email";
                        break;
                    case 'UserID':
                        message = "User ID already exists";
                        fieldName = "userId";
                        break;
                    default:
                        message = `${field} is already taken`;
                        fieldName = field;
                }
                
                return res.status(400).json({
                    success: false,
                    message: message,
                    field: fieldName,
                    errorType: "duplicate"
                });
            }
            
            return res.status(500).json({
                success: false,
                message: error.message || "An error occurred during signup"
            });
        }
        console.log('Data saved')
        // Create JWT token using Rust
        console.log('creating token')
        let token;
        try {
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(newUser._id.toString());
                console.log("Token created (top-level)");
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(newUser._id.toString());
                console.log("Token created (default)");
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
        } catch (error) {
            console.error('Token creation error:', error);
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            });
        }
        console.log(' token created')
        console.log('sending results')
        res.status(201).json({
            success: true,
            token,
            USER: {
                id: newUser.UserID,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            let message = "Duplicate key error";
            let fieldName = field;
            
            switch (field) {
                case 'email':
                    message = "Email is already in use";
                    fieldName = "email";
                    break;
                case 'UserID':
                    message = "User ID already exists";
                    fieldName = "userId";
                    break;
                default:
                    message = `${field} is already taken`;
                    fieldName = field;
            }
            
            return res.status(400).json({
                success: false,
                message: message,
                field: fieldName,
                errorType: "duplicate"
            });
        }
        
        res.status(500).json({
            success: false,
            message: error.message || "An error occurred during signup"
        });
    }
});

module.exports = router