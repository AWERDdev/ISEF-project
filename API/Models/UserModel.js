const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Userschema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password:{
    type:String,
    trim:true,
    required:true
  },
  phone: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    default: 'User',
    enum: ['User']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  UserID: {
    type: ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true
  }
});

// Update the updatedAt field before saving
Userschema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.User ||  mongoose.model('User', Userschema);

