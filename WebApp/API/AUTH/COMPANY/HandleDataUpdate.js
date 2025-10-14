const express = require('express');
const router = express.Router();
const Company = require('../../Models/CompanyModel');
const rust = require('../../rust_lib/pkg/rust_lib.js');

// Update company data
router.post('/Update', async (req, res) => {
  try {
    console.log('Received company update request:', req.body);
    const { companyId, CompanyName, CompanyType, AdministratorName, email, phone, password, MedicalLicense, businessAddress } = req.body;
    if (!companyId || !CompanyName || !CompanyType || !AdministratorName || !email || !phone || !password || !MedicalLicense || !businessAddress) {
      console.log('Missing fields:', { companyId, CompanyName, CompanyType, AdministratorName, email, phone, password, MedicalLicense, businessAddress });
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const company = await Company.findById(companyId);
    console.log('Company found:', company);
    if (!company) return res.status(404).json({ success: false, message: 'Company not found' });

    let changed = false;
    if (company.CompanyName !== CompanyName) {
      company.CompanyName = CompanyName;
      changed = true;
    }
    if (company.CompanyType !== CompanyType) {
      company.CompanyType = CompanyType;
      changed = true;
    }
    if (company.AdministratorName !== AdministratorName) {
      company.AdministratorName = AdministratorName;
      changed = true;
    }
    if (company.email !== email) {
      company.email = email;
      changed = true;
    }
    if (company.phone !== phone) {
      company.phone = phone;
      changed = true;
    }
    if (company.MedicalLicense !== MedicalLicense) {
      company.MedicalLicense = MedicalLicense;
      changed = true;
    }
    // Convert businessAddress string to object { full: businessAddress }
    if (!company.address || company.address.full !== businessAddress) {
      company.address = { full: businessAddress };
      changed = true;
    }
    // Use Rust WASM for password validation and hashing
    let passwordMatch = false;
    try {
      if (typeof rust.verify_password_wasm === "function") {
        passwordMatch = await rust.verify_password_wasm(password, company.password);
        console.log("Password verified (top-level)");
      } else if (typeof rust.default?.verify_password_wasm === "function") {
        passwordMatch = await rust.default.verify_password_wasm(password, company.password);
        console.log("Password verified (default)");
      } else {
        throw new Error("verify_password_wasm not found in WASM module");
      }
    } catch (error) {
      console.error('Password verification error:', error);
      return res.status(500).json({ success: false, message: "Error verifying password: " + error });
    }
    if (!passwordMatch) {
      try {
        let hashedPassword;
        if (typeof rust.hash_password_wasm === "function") {
          hashedPassword = await rust.hash_password_wasm(password);
          console.log("Password hashed (top-level)");
        } else if (typeof rust.default?.hash_password_wasm === "function") {
          hashedPassword = await rust.default.hash_password_wasm(password);
          console.log("Password hashed (default)");
        } else {
          throw new Error("hash_password_wasm not found in WASM module");
        }
        company.password = hashedPassword;
        changed = true;
      } catch (error) {
        console.error('Password hashing error:', error);
        return res.status(500).json({ success: false, message: "Password hashing failed: " + error });
      }
    }
    if (!changed) {
      console.log('No changes detected.');
      return res.status(200).json({ success: false, message: 'No changes detected.' });
    }
    await company.save();
    console.log('Company updated:', company);
    res.json({ success: true, company });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
