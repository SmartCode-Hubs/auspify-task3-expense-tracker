const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'auspify_expense_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied.' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// UPDATE USER PROFILE
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Build update object
    const updateData = { name, email };
    
    // If user typed a new password, hash it
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, 
      updateData, 
      { new: true }
    );

    res.json({ message: 'Profile updated successfully', user: { name: updatedUser.name, email: updatedUser.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;