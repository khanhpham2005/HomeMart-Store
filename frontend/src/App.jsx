import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import AdminProducts from './pages/AdminProducts.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-ink">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/new"
            element={
              <ProtectedRoute adminOnly>
                <ProductFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoute adminOnly>
                <ProductFormPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
