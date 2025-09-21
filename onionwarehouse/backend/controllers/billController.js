const Bill = require('../models/Bill');


exports.createBill = async (req, res) => {
try {
const { boxId, sellingPrice } = req.body;
// fetch box details
const Box = require('../models/Box');
const box = await Box.findById(boxId).populate('shopId');
if (!box) return res.status(404).json({ message: 'Box not found' });


const total = box.quantity * sellingPrice;
const bill = new Bill({
boxNumber: box.boxNumber,
type: box.type,
shopName: box.shopId?.name || 'No Shop',
quantity: box.quantity,
costPrice: box.pricePerKg,
sellingPrice,
total,
createdBy: req.user.id,
});


await bill.save();
res.json(bill);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.getBills = async (req, res) => {
try {
const bills = await Bill.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
res.json(bills);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};