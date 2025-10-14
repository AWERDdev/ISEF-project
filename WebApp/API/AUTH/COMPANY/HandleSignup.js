const express = require('express');
const router = express.Router();
const COMPschema = require('../../Models/CompanyModel.js');
const rust = require('../../rust_lib/pkg/rust_lib.js');
const mongoose = require('mongoose')

router.get('/',(req,res)=>{
    console.log('Signup Route called')
    res.json({ message: "this is signup route" })
})

router.post('/Signup', async (req, res) => {
    try {
  
        const { companyName,companyType,medicalLicense,password,phone,adminName,companyEmail,businessAddress } = req.body
        console.log('rust', rust)
        console.log('rust.validate_password_wasm:', typeof rust.validate_password_wasm);
        console.log('rust.default.validate_password_wasm:', typeof rust.default?.validate_password_wasm);
        console.log('Received signup request for:', companyEmail)

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
            })
        }
        console.log(" password validated ")
        
        // Check for existing company with same email
        console.log("checking if company email exists")
        const existingCOMPEmail = await COMPschema.findOne({ email: companyEmail })
        if (existingCOMPEmail) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
                field: "companyEmail",
                errorType: "duplicate"
            })
        }
        
        // Check for existing company with same company name
        console.log("checking if company name exists")
        const existingCOMPName = await COMPschema.findOne({ CompanyName: companyName })
        if (existingCOMPName) {
            return res.status(400).json({
                success: false,
                message: "Company name is already taken",
                field: "companyName",
                errorType: "duplicate"
            })
        }
        
        // Check for existing company with same medical license
        console.log("checking if medical license exists")
        const existingCOMPLicense = await COMPschema.findOne({ MedicalLicense: medicalLicense })
        if (existingCOMPLicense) {
            return res.status(400).json({
                success: false,
                message: "Medical license is already registered",
                field: "medicalLicense",
                errorType: "duplicate"
            })
        }
        
        // Check for existing company with same phone
        console.log("checking if phone exists")
        const existingCOMPPhone = await COMPschema.findOne({ phone: phone })
        if (existingCOMPPhone) {
            return res.status(400).json({
                success: false,
                message: "Phone number is already registered",
                field: "phone",
                errorType: "duplicate"
            })
        }
        
        console.log("Company doesn't exist")
        // Hash password using Rust
        console.log('hashing password')
        const hashedPassword = await rust.hash_password_wasm(password)
        console.log('password hashed')
        
        // Create new company
        console.log('saving comp data')
        const newCOMP = await COMPschema.create({
            CompanyName:companyName,
            CompanyType:companyType,
            AdministratorName:adminName,
            MedicalLicense:medicalLicense,
            email:companyEmail,
            password: hashedPassword,
            phone:phone,
            address:businessAddress,
        })
        console.log('Data saved')
        // Create JWT token using Rust
        console.log('creating token')
        const token = await rust.create_token_wasm(newCOMP._id.toString())
        console.log(' token created')
        console.log('sending results')
        res.status(201).json({
            success: true,
            token,
            COMP: {
                id: newCOMP.COMPID,
                name: newCOMP.CompanyName,
                email: newCOMP.email
            }
        })

    } catch (error) {
        console.error('Signup error:', error)
        
        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            let message = "Duplicate key error";
            let fieldName = field;
            
            switch (field) {
                case 'email':
                    message = "Email is already in use";
                    fieldName = "companyEmail";
                    break;
                case 'CompanyName':
                    message = "Company name is already taken";
                    fieldName = "companyName";
                    break;
                case 'MedicalLicense':
                    message = "Medical license is already registered";
                    fieldName = "medicalLicense";
                    break;
                case 'phone':
                    message = "Phone number is already registered";
                    fieldName = "phone";
                    break;
                case 'COMPID':
                    message = "Company ID already exists";
                    fieldName = "compId";
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
        })
    }
})

module.exports = router