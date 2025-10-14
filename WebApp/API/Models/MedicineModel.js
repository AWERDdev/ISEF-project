const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  // medicineId: { // Removed custom string ID
  //   type: ObjectId,
  //   required: true,
  //   unique: true,
  //   trim: true
  // },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  longDescription: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: "💊"
  },
  manufacturer: {
    type: String,
    trim: true
  },
  dosage: {
    type: String,
    trim: true
  },
  expiryDate: {
    type: Date
  },
  sideEffects: [{
    type: String,
    trim: true
  }],
  contraindications: [{
    type: String,
    trim: true
  }],
  minimumOrder: {
    type: Number,
    default: 10,
    min: 1
  },
  maxOrder: {
    type: Number,
    default: 10000,
    min: 1
  },
  deliveryTime: {
    type: String,
    default: "2-3 business days"
  },
  certifications: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
MedicineSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create index for better search performance
MedicineSchema.index({ name: 'text', category: 'text', description: 'text' });

module.exports = mongoose.model('Medicine', MedicineSchema);
