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

        // Find company by email
        const COMP = await COMPschema.findOne({ email: companyEmail })
        if (!COMP) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        console.log('Company found:', {
            COMPID: COMP.COMPID,
            CompanyName: COMP.CompanyName,
            email: COMP.email
        })

        // Verify password using Rust
        try {
            let isValidPassword = false;
            if (typeof rust.verify_password_wasm === "function") {
                isValidPassword = await rust.verify_password_wasm(password, COMP.password);
                console.log("Password verified (top-level)");
            } else if (typeof rust.default?.verify_password_wasm === "function") {
                isValidPassword = await rust.default.verify_password_wasm(password, COMP.password);
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

            // Return company data with field names matching the schema
            const responseData = {
                success: true,
                token,
                COMP: {
                    COMPID: COMP.COMPID,           // Custom ID field from schema
                    _id: COMP._id,                  // MongoDB ID
                    CompanyName: COMP.CompanyName,  // Capital C
                    CompanyType: COMP.CompanyType,  // Capital C
                    email: COMP.email,              // lowercase from schema
                    phone: COMP.phone,
                    AdministratorName: COMP.AdministratorName,
                    MedicalLicense: COMP.MedicalLicense,
                    role: COMP.role
                }
            }

            console.log('Sending response:', responseData)
            res.status(200).json(responseData)

        } catch (error) {
            console.error('Token creation error:', error)
            return res.status(500).json({
                success: false,
                message: "Error creating authentication token: " + error
            })
        }

    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            success: false,
            message: "Server error during login"
        })
    }
})

module.exports = router