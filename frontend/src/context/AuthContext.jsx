import { createContext, useContext, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';

const AuthContext = createContext(null);

function readStoredUser() {
  const storedUser = localStorage.getItem('homemart_user');
  return storedUser ? JSON.parse(storedUser) : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  function saveSession(authData) {
    localStorage.setItem('homemart_token', authData.token);
    localStorage.setItem('homemart_user', JSON.stringify(authData.user));
    setUser(authData.user);
  }

  async function register(form) {
    const authData = await registerUser(form);
    saveSession(authData);
  }

  async function login(form) {
    const authData = await loginUser(form);
    saveSession(authData);
  }

  function logout() {
    localStorage.removeItem('homemart_token');
    localStorage.removeItem('homemart_user');
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      isAdmin: user?.role === 'admin',
      register,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
