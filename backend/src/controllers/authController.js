const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'homemart_development_secret',
    { expiresIn: '7d' }
  );
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email, and password are required');
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
  if (existingUsers.length) {
    res.status(409);
    throw new Error('Email is already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );

  const user = { id: result.insertId, name, email, role: 'user' };

  res.status(201).json({
    user: publicUser(user),
    token: createToken(user)
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!users.length) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const user = users[0];
  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    user: publicUser(user),
    token: createToken(user)
  });
});

module.exports = { register, login };
