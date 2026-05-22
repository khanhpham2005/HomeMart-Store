import api from './axios';

export async function getProducts(params = {}) {
  const { data } = await api.get('/products', { params });
  return data;
}

export async function getProduct(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function createProduct(product) {
  const { data } = await api.post('/products', product);
  return data;
}

export async function updateProduct(id, product) {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
}

export async function deleteProduct(id) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

export async function getCategories() {
  const { data } = await api.get('/categories');
  return data;
}
