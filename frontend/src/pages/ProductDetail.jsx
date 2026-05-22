import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import { addToCart } from '../api/cartApi';
import { getProduct } from '../api/productApi';
import { formatCurrency } from '../utils/formatCurrency';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load product');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleAddToCart() {
    try {
      await addToCart(product.id, 1);
      setMessage('Added to cart');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add product to cart');
    }
  }

  if (loading) return <Loading label="Loading product" />;

  return (
    <div>
      <Link to="/" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
        <ArrowLeft size={17} />
        Back to store
      </Link>

      <ErrorMessage message={error} />

      {product && (
        <section className="mt-4 grid gap-6 rounded-md border border-stone-200 bg-white p-5 md:grid-cols-2">
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80'}
            alt={product.name}
            className="h-80 w-full rounded-md object-cover"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{product.category}</p>
            <h1 className="mt-2 text-3xl font-bold text-stone-950">{product.name}</h1>
            <p className="mt-3 text-2xl font-bold text-stone-900">{formatCurrency(product.price)}</p>
            <p className="mt-4 text-stone-600">{product.description}</p>
            <p className="mt-4 text-sm text-stone-500">{product.stock} units available</p>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock < 1}
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              <ShoppingCart size={18} />
              Add to cart
            </button>
            {message && <p className="mt-3 text-sm font-medium text-brand-700">{message}</p>}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetail;
