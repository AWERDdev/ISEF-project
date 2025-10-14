const express = require('express');
const router = express.Router();
const ShoppingCart = require('../Models/ShoppingCartModel');

// Basic GET route
router.get('/', (req, res) => {
  res.send('ShoppingCart route is working!');
});

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, medicineId, quantity } = req.body;
    if (!userId || !medicineId || !quantity) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // Upsert: add or update quantity if already exists
    const cartItem = await ShoppingCart.findOneAndUpdate(
      { user: userId, medicine: medicineId },
      { $set: { quantity } },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Item added to cart', cartItem });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Remove item from cart
router.post('/remove', async (req, res) => {
  try {
    const { userId, medicineId } = req.body;
    if (!userId || !medicineId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    await ShoppingCart.findOneAndDelete({ user: userId, medicine: medicineId });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// List all items in user's cart
router.get('/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await ShoppingCart.find({ user: userId }).populate('medicine');
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
