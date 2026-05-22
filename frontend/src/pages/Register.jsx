import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not register');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-stone-950">Register</h1>
        <p className="mt-1 text-stone-600">Create your HomeMart account.</p>
      </div>

      <ErrorMessage message={error} />

      <form onSubmit={handleSubmit} className="mt-4 rounded-md border border-stone-200 bg-white p-5">
        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Name</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>

        <label className="mb-5 block">
          <span className="mb-1 block text-sm font-medium text-stone-700">Password</span>
          <input
            required
            minLength="6"
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-500"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand-600 px-4 py-2 font-semibold text-white hover:bg-brand-700 disabled:cursor-wait disabled:bg-stone-400"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="mt-4 text-center text-sm text-stone-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
