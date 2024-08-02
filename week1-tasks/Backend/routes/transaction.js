const express = require('express');
const { getAccount, deposit, withdraw } = require('../controllers/transactionController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/account', protect, getAccount);
router.post('/deposit', protect, deposit);
router.post('/withdraw', protect, withdraw);

module.exports = router;
