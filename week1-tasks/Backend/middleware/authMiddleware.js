const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization || req.headers.authorization.startsWith('Bearer')) {
    try {
      console.log('Token:', req.headers.authorization);
      token = req.headers.authorization
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded:', decoded);
      req.user = await User.findById(decoded.id);
      console.log('User:', req.user);
      next();
    } catch (err) {
      res.status(401).json({ message: 'Not authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

exports.getUser = (req, res) => {
  res.json(req.user);
};
