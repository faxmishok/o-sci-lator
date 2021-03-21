const express = require('express');
const router = express.Router();
const { calculateExpression } = require('../controllers/calculateController');

router.post('/', calculateExpression);

module.exports = router;
