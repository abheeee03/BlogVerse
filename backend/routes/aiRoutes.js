const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Generate blog description
router.post('/generate-description', aiController.generateDescription);

module.exports = router; 