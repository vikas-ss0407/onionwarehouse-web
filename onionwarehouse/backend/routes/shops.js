const express = require('express');
const { createShop, getShops, deleteShop } = require('../controllers/shopController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createShop);     // Add shop
router.get('/', authMiddleware, getShops);        // Get all shops of logged-in user
router.delete('/:id', authMiddleware, deleteShop);// Delete shop

module.exports = router;
