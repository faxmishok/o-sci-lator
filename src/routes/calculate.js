const express = require('express');
const router = express.Router();
const {
  calculateExpression,
  calculateMatrix,
} = require('../controllers/calculateController');

router.post('/', calculateExpression);
router.post('/matrix', calculateMatrix);

module.exports = router;
