const express = require('express');
const { createBill, getBills } = require('../controllers/billController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createBill);   // Create bill
router.get('/', authMiddleware, getBills);      // Get bills for logged-in user

module.exports = router;
