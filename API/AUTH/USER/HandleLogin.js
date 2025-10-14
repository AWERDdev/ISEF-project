const express = require('express')
const router = express.Router()
const UserSchema = require('../../Models/UserModel.js')
const rust = require('../../rust_lib/pkg/rust_lib.js');

// In-memory failed attempts tracker (for production, use Redis or DB) - commented out
// const failedAttemptsMap = {};

router.get('/',(req,res)=>{
    console.log('Login Route called')
    res.json({ message: "this is login route" })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log('Login attempt for:', email)
    // const key = email; // Could also use req.ip or email+ip - commented out

    // 1. Rate limiting - commented out due to WASM errors
    // let allowed;
    // if (typeof rust.rate_limiter_wasm === "function") {
    //     allowed = await rust.rate_limiter_wasm(key);
    //     console.log("Rate limiter (top-level)");
    // } else if (typeof rust.default?.rate_limiter_wasm === "function") {
    //     allowed = await rust.default.rate_limiter_wasm(key);
    //     console.log("Rate limiter (default)");
    // } else {
    //     throw new Error("rate_limiter_wasm not found in WASM module");
    // }
    // if (!allowed) {
    //     return res.status(429).send('Too many attempts. Try again later.');
    // }

    try {
        // Find user by email
        const user = await UserSchema.findOne({ email })
            if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

        // Verify password using Rust
        try {
            let isValidPassword;
            if (typeof rust.verify_password_wasm === "function") {
                isValidPassword = await rust.verify_password_wasm(password, user.password);
                console.log("Password verified (top-level)");
            } else if (typeof rust.default?.verify_password_wasm === "function") {
                isValidPassword = await rust.default.verify_password_wasm(password, user.password);
                console.log("Password verified (default)");
            } else {
                throw new Error("verify_password_wasm not found in WASM module");
            }
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                })
            }
        } catch (error) {
            console.error('Password verification error:', error)
            return res.status(500).json({
                success: false,
                message: "Error verifying password: " + error
            })
        }

        // On successful login, reset failed attempts - commented out
        // failedAttemptsMap[key] = 0;

        // Create JWT token using Rust
        try {
            let token;
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(user._id.toString());
                console.log("Token created (top-level)");
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(user._id.toString());
                console.log("Token created (default)");
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        } catch (error) {
            console.error('Token creation error:', error)
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            })
        }

    } catch (error) {
        console.error('Login error:', error)
        
        // Handle MongoDB duplicate key errors (unlikely during login but good practice)
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
            message: error.message || "An error occurred during login"
        })
    }
})

module.exports = router