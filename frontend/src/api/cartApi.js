import api from './axios';

export async function getCart() {
  const { data } = await api.get('/cart');
  return data;
}

export async function addToCart(productId, quantity = 1) {
  const { data } = await api.post('/cart', { product_id: productId, quantity });
  return data;
}

export async function updateCartItem(id, quantity) {
  const { data } = await api.put(`/cart/${id}`, { quantity });
  return data;
}

export async function removeCartItem(id) {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
}
