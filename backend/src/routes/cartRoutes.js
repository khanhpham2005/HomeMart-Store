const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem
} = require('../controllers/cartController');

const router = express.Router();

router.route('/').get(getCart).post(addToCart);
router.route('/:id').put(updateCartItem).delete(removeCartItem);

module.exports = router;
