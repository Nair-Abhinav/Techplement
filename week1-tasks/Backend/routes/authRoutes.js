const express = require('express');
const { registerUser, authUser } = require('../controllers/authController');
const { protect, getUser } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/me', protect, getUser);

module.exports = router;

