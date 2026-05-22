import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Home, LogOut, PackagePlus, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { isAdmin, isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-brand-600 text-white' : 'text-stone-700 hover:bg-stone-100'
    }`;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-700">
          <Home size={24} />
          <span>HomeMart</span>
        </Link>
        {isLoggedIn && (
          <div className="flex flex-wrap gap-2">
            <NavLink to="/" className={linkClass}>
              <Home size={17} />
              Store
            </NavLink>
            <NavLink to="/cart" className={linkClass}>
              <ShoppingCart size={17} />
              Cart
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin/products" className={linkClass}>
                <PackagePlus size={17} />
                Products
              </NavLink>
            )}
            <div className="flex items-center gap-2 rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-700">
              <span className="font-medium">{user.name}</span>
              {isAdmin && <span className="rounded bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">Admin</span>}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
