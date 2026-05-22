const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const { search = '', category = '', sort = '' } = req.query;
  const filters = [];
  const values = [];

  if (search) {
    filters.push('p.name LIKE ?');
    values.push(`%${search}%`);
  }

  if (category) {
    filters.push('c.name = ?');
    values.push(category);
  }

  let sql = `
    SELECT p.id, p.name, p.description, c.name AS category, p.category_id,
      p.price, p.stock, p.image_url, p.created_at
    FROM products p
    JOIN categories c ON p.category_id = c.id
  `;

  if (filters.length) {
    sql += ` WHERE ${filters.join(' AND ')}`;
  }

  if (sort === 'price_asc') {
    sql += ' ORDER BY p.price ASC';
  } else if (sort === 'price_desc') {
    sql += ' ORDER BY p.price DESC';
  } else {
    sql += ' ORDER BY p.created_at DESC';
  }

  const [products] = await db.query(sql, values);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const [products] = await db.query(
    `SELECT p.id, p.name, p.description, c.name AS category, p.category_id,
      p.price, p.stock, p.image_url, p.created_at
     FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [req.params.id]
  );

  if (!products.length) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(products[0]);
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category_id, price, stock, image_url } = req.body;

  if (!name || !description || !category_id || price === undefined || stock === undefined) {
    res.status(400);
    throw new Error('Name, description, category, price, and stock are required');
  }

  const [result] = await db.query(
    `INSERT INTO products (name, description, category_id, price, stock, image_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, description, category_id, price, stock, image_url || '']
  );

  const [products] = await db.query(
    `SELECT p.id, p.name, p.description, c.name AS category, p.category_id,
      p.price, p.stock, p.image_url, p.created_at
     FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [result.insertId]
  );

  res.status(201).json(products[0]);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category_id, price, stock, image_url } = req.body;

  const [existing] = await db.query('SELECT id FROM products WHERE id = ?', [req.params.id]);
  if (!existing.length) {
    res.status(404);
    throw new Error('Product not found');
  }

  await db.query(
    `UPDATE products
     SET name = ?, description = ?, category_id = ?, price = ?, stock = ?, image_url = ?
     WHERE id = ?`,
    [name, description, category_id, price, stock, image_url || '', req.params.id]
  );

  const [products] = await db.query(
    `SELECT p.id, p.name, p.description, c.name AS category, p.category_id,
      p.price, p.stock, p.image_url, p.created_at
     FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [req.params.id]
  );

  res.json(products[0]);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ message: 'Product deleted successfully' });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
