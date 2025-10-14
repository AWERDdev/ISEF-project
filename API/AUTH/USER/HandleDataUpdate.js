const express = require('express');
const router = express.Router();
const User = require('../../Models/UserModel');
const rust = require('../../rust_lib/pkg/rust_lib.js');

// Update user data
router.post('/Update', async (req, res) => {
  try {
    console.log('Received update request:', req.body);
    const { userId, name, email, phone, password, address } = req.body;
    if (!userId || !name || !email || !phone || !password || !address) {
      console.log('Missing fields:', { userId, name, email, phone, password, address });
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const user = await User.findById(userId);
    console.log('User found:', user);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    let changed = false;
    if (user.name !== name) { user.name = name; changed = true; }
    if (user.email !== email) { user.email = email; changed = true; }
    if (user.phone !== phone) { user.phone = phone; changed = true; }
    // Convert address string to object { full: address }
    if (!user.address || user.address.full !== address) {
      user.address = { full: address };
      changed = true;
    }
    // Use Rust WASM for password validation and hashing
    let passwordMatch = false;
    try {
      if (typeof rust.verify_password_wasm === "function") {
        passwordMatch = await rust.verify_password_wasm(password, user.password);
        console.log("Password verified (top-level)");
      } else if (typeof rust.default?.verify_password_wasm === "function") {
        passwordMatch = await rust.default.verify_password_wasm(password, user.password);
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
        user.password = hashedPassword;
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
    await user.save();
    console.log('User updated:', user);
    res.json({ success: true, user });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
