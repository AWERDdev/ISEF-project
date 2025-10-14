const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
// 'mongodb://127.0.0.1:27017/TaskMaster' Local service
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MEDISupply'  , {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 5,
      family: 4
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on failure
  }
};

module.exports = connectDB;
