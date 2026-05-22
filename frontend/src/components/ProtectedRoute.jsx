import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute({ adminOnly = false, children }) {
  const { isAdmin, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
