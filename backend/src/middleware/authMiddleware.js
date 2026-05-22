const jwt = require('jsonwebtoken');
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('Login required');
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'homemart_development_secret');
  } catch (error) {
    res.status(401);
    throw new Error('Invalid or expired token');
  }

  const [users] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id]);
  if (!users.length) {
    res.status(401);
    throw new Error('User not found');
  }

  req.user = users[0];
  next();
});

function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    next(new Error('Admin access required'));
    return;
  }

  next();
}

module.exports = { protect, adminOnly };
