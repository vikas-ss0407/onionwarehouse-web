const express = require('express');
const { createBox, getBoxes, updateBox, deleteBox } = require('../controllers/boxController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createBox);          // Add box
router.get('/', authMiddleware, getBoxes);            // Get all boxes
router.put('/:id', authMiddleware, updateBox);        // Update box
router.delete('/:id', authMiddleware, deleteBox);     // Delete box

module.exports = router;
