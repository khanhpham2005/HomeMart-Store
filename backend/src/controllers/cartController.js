const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

async function fetchCartItems() {
  const [items] = await db.query(
    `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, p.stock, p.image_url,
      (ci.quantity * p.price) AS subtotal
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     ORDER BY ci.created_at DESC`
  );

  return items;
}

const getCart = asyncHandler(async (req, res) => {
  const items = await fetchCartItems();
  const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);

  res.json({ items, total });
});

const addToCart = asyncHandler(async (req, res) => {
  const { product_id, quantity = 1 } = req.body;

  if (!product_id) {
    res.status(400);
    throw new Error('Product id is required');
  }

  const [products] = await db.query('SELECT stock FROM products WHERE id = ?', [product_id]);
  if (!products.length) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (products[0].stock < 1) {
    res.status(400);
    throw new Error('Product is out of stock');
  }

  const requestedQuantity = Math.max(1, Number(quantity));
  const [existingItems] = await db.query('SELECT id, quantity FROM cart_items WHERE product_id = ?', [product_id]);

  if (existingItems.length) {
    const nextQuantity = Math.min(existingItems[0].quantity + requestedQuantity, products[0].stock);
    await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [nextQuantity, existingItems[0].id]);
  } else {
    const nextQuantity = Math.min(requestedQuantity, products[0].stock);
    await db.query('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)', [product_id, nextQuantity]);
  }

  const items = await fetchCartItems();
  const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
  res.status(201).json({ items, total });
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || Number(quantity) < 1) {
    res.status(400);
    throw new Error('Quantity must be at least 1');
  }

  const [items] = await db.query(
    `SELECT ci.id, p.stock
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.id = ?`,
    [req.params.id]
  );

  if (!items.length) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  const nextQuantity = Math.min(Number(quantity), items[0].stock);
  await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [nextQuantity, req.params.id]);

  const cartItems = await fetchCartItems();
  const total = cartItems.reduce((sum, item) => sum + Number(item.subtotal), 0);
  res.json({ items: cartItems, total });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const [result] = await db.query('DELETE FROM cart_items WHERE id = ?', [req.params.id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  const items = await fetchCartItems();
  const total = items.reduce((sum, item) => sum + Number(item.subtotal), 0);
  res.json({ items, total });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
};
