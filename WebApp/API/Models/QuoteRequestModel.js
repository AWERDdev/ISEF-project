const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotaRequestSchema = new Schema({
    user: {
      kind: { type: String, enum: ['USER', 'COMP'], required: true },
      ref: { type: Schema.Types.ObjectId, required: true, refPath: 'user.kind' }
    },
    medicine: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: {type: Date,default: Date.now}
  });
  
  // Update the updatedAt field before saving
  QuotaRequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  // Create index for better search performance
  QuotaRequestSchema.index({ name: 'text', category: 'text', description: 'text' });
  
  module.exports = mongoose.model('QuotaRequest', QuotaRequestSchema);