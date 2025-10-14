const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['favorite', 'add_to_cart', 'buy', 'request_quote'], required: true },
  medicine: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

UserActivitySchema.index({ user: 1, type: 1, medicine: 1 });

module.exports = mongoose.model('UserActivity', UserActivitySchema);
  