const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  medicine: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, required: true, min: 1 },
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
ShoppingCartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compound index for user and medicine for fast lookup
ShoppingCartSchema.index({ user: 1, medicine: 1 }, { unique: true });

module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);