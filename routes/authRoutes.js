const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: 'User registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'User login failed' });
  }
});

module.exports = router;
