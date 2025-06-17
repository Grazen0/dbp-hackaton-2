import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAxiosInstanceUnauthenticated } from '../lib/api/util/axios-instance';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // TODO: better error messages (password too short, etc)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await getAxiosInstanceUnauthenticated().post('/authentication/register', {
        email,
        passwd: password,
      });
      navigate('/login');
    } catch {
      setError('No se pudo crear la cuenta. Intenta con otro correo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-gray-300 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Crear cuenta
        </h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </p>
        )}

        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Correo electrónico
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />

        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {submitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};
