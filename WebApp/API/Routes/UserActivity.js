const express = require('express');
const router = express.Router();
const UserActivity = require('../Models/UserActivityModel');

// Log a new activity
router.post('/log', async (req, res) => {
  try {
    const { userId, type, medicineId, quantity } = req.body;
    if (!userId || !type || !medicineId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const activity = new UserActivity({
      user: userId,
      type,
      medicine: medicineId,
      quantity
    });
    await activity.save();
    res.json({ success: true, message: 'Activity logged', activity });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// Get all activities for a user (optionally filter by type)
router.get('/list/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { type } = req.query;
    const filter = { user: userId };
    if (type) filter.type = type;
    const activities = await UserActivity.find(filter).populate('medicine').sort({ createdAt: -1 });
    res.json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
