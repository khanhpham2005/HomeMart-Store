import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80'}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{product.category}</p>
            <Link to={`/products/${product.id}`} className="mt-1 block text-lg font-semibold hover:text-brand-700">
              {product.name}
            </Link>
          </div>
          <p className="shrink-0 font-bold text-stone-900">{formatCurrency(product.price)}</p>
        </div>
        <p className="line-clamp-2 text-sm text-stone-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-sm text-stone-500">{product.stock} in stock</span>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            disabled={product.stock < 1}
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
