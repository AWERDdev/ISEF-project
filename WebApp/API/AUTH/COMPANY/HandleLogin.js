const express = require('express')
const router = express.Router()
const COMPschema = require('../../Models/CompanyModel.js')
const rust = require('../../rust_lib/pkg/rust_lib.js');

router.get('/',(req,res)=>{
    console.log('Login Route called')
    res.json({ message: "this is login route" })
})


router.post('/login', async (req, res) => {
    try {
        
        const { companyEmail, password } = req.body
        console.log('Login attempt for:', companyEmail)

        // Find user by email
        const COMP = await COMPschema.findOne({ email:companyEmail })
        if (!COMP) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        // Verify password using Rust
        try {
            if (typeof rust.verify_password_wasm === "function") {
                const isValidPassword = await rust.verify_password_wasm(password, COMP.password);
                console.log("Password verified (top-level)");
                if (!isValidPassword) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    })
                }
            } else if (typeof rust.default?.verify_password_wasm === "function") {
                const isValidPassword = await rust.default.verify_password_wasm(password, COMP.password);
                console.log("Password verified (default)");
                if (!isValidPassword) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid email or password"
                    })
                }
            } else {
                throw new Error("verify_password_wasm not found in WASM module");
            }
        } catch (error) {
            console.error('Password verification error:', error)
            return res.status(500).json({
                success: false,
                message: "Error verifying password: " + error
            })
        }

        // Create JWT token using Rust
        try {
            let token;
            if (typeof rust.create_token_wasm === "function") {
                token = await rust.create_token_wasm(COMP._id.toString());
                console.log("Token created (top-level)");
            } else if (typeof rust.default?.create_token_wasm === "function") {
                token = await rust.default.create_token_wasm(COMP._id.toString());
                console.log("Token created (default)");
            } else {
                throw new Error("create_token_wasm not found in WASM module");
            }
            res.status(200).json({
                success: true,
                token,
                user: {
                    id: COMP._id,
                    name: COMP.AdministratorName,
                    email: COMP.email
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
        
        }
})

module.exports = router