const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  boxNumber: { type: String, required: true },
  type: { type: String },
  quantity: { type: Number, default: 0 },
  pricePerKg: { type: Number, default: 0 },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
});

module.exports = mongoose.models.Box || mongoose.model('Box', boxSchema);
