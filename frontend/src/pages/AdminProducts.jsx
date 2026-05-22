import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Plus, Trash2 } from 'lucide-react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import { deleteProduct, getProducts } from '../api/productApi';
import { formatCurrency } from '../utils/formatCurrency';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this product?');
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not delete product');
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-950">Product management</h1>
          <p className="mt-1 text-stone-600">Add, edit, and delete HomeMart inventory items.</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700"
        >
          <Plus size={18} />
          Add product
        </Link>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <div className="mt-4">
          <Loading label="Loading products" />
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-md border border-stone-200 bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-stone-100 text-stone-700">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-stone-200">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${product.id}/edit`}
                        className="rounded-md border border-stone-300 p-2 text-stone-700 hover:bg-stone-100"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit size={17} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
