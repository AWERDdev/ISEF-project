const express = require('express');
const router = express.Router();

// Basic GET route
router.get('/', (req, res) => {
  res.send('QuoteRequest route is working!');
});

// Main POST route
router.post('/request', (req, res) => {
  console.log('Quote request:', req.body);
  res.json({ success: true, message: 'Quote request received' });
});

module.exports = router;
