import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import Loading from '../components/Loading.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { addToCart } from '../api/cartApi';
import { getCategories, getProducts } from '../api/productApi';

const emptyFilters = {
  search: '',
  category: '',
  sort: ''
};

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load categories');
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError('');
        const data = await getProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load products');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [filters]);

  async function handleAddToCart(productId) {
    try {
      await addToCart(productId, 1);
      setCartMessage('Product added to cart');
      window.setTimeout(() => setCartMessage(''), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add product to cart');
    }
  }

  return (
    <div>
      <section className="mb-6 rounded-md bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Home appliances and essentials</p>
        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-950">Shop HomeMart products</h1>
            <p className="mt-2 max-w-2xl text-stone-600">
              Browse kitchen tools, laundry appliances, and home comfort products.
            </p>
          </div>
          {cartMessage && (
            <div className="rounded-md border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
              {cartMessage}
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterSidebar
          filters={filters}
          categories={categories}
          onChange={setFilters}
          onReset={() => setFilters(emptyFilters)}
        />

        <section>
          <ErrorMessage message={error} />
          {loading ? (
            <div className="mt-4">
              <Loading label="Loading products" />
            </div>
          ) : products.length ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-md border border-stone-200 bg-white p-6 text-center text-stone-600">
              No products match your filters.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
