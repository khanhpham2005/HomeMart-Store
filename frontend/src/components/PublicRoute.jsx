import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
