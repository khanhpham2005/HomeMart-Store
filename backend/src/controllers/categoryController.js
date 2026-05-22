const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const getCategories = asyncHandler(async (req, res) => {
  const [categories] = await db.query('SELECT * FROM categories ORDER BY name ASC');
  res.json(categories);
});

module.exports = { getCategories };
