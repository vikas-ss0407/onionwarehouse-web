const Box = require('../models/Box');


exports.createBox = async (req, res) => {
try {
const { boxNumber, type, quantity, pricePerKg, shopId } = req.body;
const box = new Box({ boxNumber, type, quantity, pricePerKg, shopId });
await box.save();
res.json(box);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.getBoxes = async (req, res) => {
try {
const boxes = await Box.find().populate('shopId');
res.json(boxes);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.updateBox = async (req, res) => {
try {
const updated = await Box.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(updated);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.deleteBox = async (req, res) => {
try {
await Box.findByIdAndDelete(req.params.id);
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};