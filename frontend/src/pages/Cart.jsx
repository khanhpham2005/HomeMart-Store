import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import { getCart, removeCartItem, updateCartItem } from '../api/cartApi';
import { formatCurrency } from '../utils/formatCurrency';

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadCart() {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load cart');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleQuantityChange(itemId, quantity) {
    try {
      const data = await updateCartItem(itemId, quantity);
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update quantity');
    }
  }

  async function handleRemove(itemId) {
    try {
      const data = await removeCartItem(itemId);
      setCart(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove item');
    }
  }

  if (loading) return <Loading label="Loading cart" />;

  return (
    <div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-950">Shopping cart</h1>
          <p className="mt-1 text-stone-600">Review quantities and total price before checkout.</p>
        </div>
        <div className="rounded-md bg-white px-4 py-3 text-xl font-bold shadow-sm">
          Total: {formatCurrency(cart.total)}
        </div>
      </div>

      <ErrorMessage message={error} />

      {!cart.items.length ? (
        <div className="mt-4 rounded-md border border-stone-200 bg-white p-6 text-center text-stone-600">
          Your cart is empty.
        </div>
      ) : (
        <div className="mt-4 overflow-hidden rounded-md border border-stone-200 bg-white">
          {cart.items.map((item) => (
            <div key={item.id} className="grid gap-4 border-b border-stone-200 p-4 last:border-b-0 md:grid-cols-[90px_1fr_auto_auto] md:items-center">
              <img
                src={item.image_url || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80'}
                alt={item.name}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-stone-500">{formatCurrency(item.price)} each</p>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-stone-500">Qty</span>
                <input
                  min="1"
                  max={item.stock}
                  type="number"
                  value={item.quantity}
                  onChange={(event) => handleQuantityChange(item.id, event.target.value)}
                  className="w-20 rounded-md border border-stone-300 px-3 py-2"
                />
              </label>
              <div className="flex items-center justify-between gap-4 md:justify-end">
                <p className="font-bold">{formatCurrency(item.subtotal)}</p>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
