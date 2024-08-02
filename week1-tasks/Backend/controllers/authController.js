const User = require('../models/User');
const jwt = require('jsonwebtoken');
const express = require('express');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.registerUser = async (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;
  const balance = req.body.balance;

  console.log('Received request:', email , password , balance); // Log the entire request body

  if (!email || !password || !balance) {
    console.log('Missing email or password'); // Log missing fields
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    console.log('Checking if user exists'); // Log check for existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('User already exists'); // Log existing user
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('Creating new user'); // Log user creation
    const user = await User.create({ email : email, password : password , balance : balance}); 
    console.log("New user : ",user);

    if (user) {
      console.log('User created successfully:', user); // Log successful user creation
      res.status(201).json({
        _id: user._id,
        email: user.email,
        balance: user.balance,
        token: generateToken(user._id),
      });
    } else {
      console.log('Invalid user data'); // Log invalid user data
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Error during user registration:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};


exports.authUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
  catch (error) {
    console.error('Error:', error); 
    res.status(500).json({ message: 'Server error' });
  }
}