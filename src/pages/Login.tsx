import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  getAxiosInstanceUnauthenticated,
  resetAxiosInstance,
} from '../lib/api/util/axios-instance';
import { useUser } from '../lib/auth/hooks/use-user';

export const Login = () => {
  const [reloadUser] = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await getAxiosInstanceUnauthenticated().post(
        '/authentication/login',
        {
          email,
          passwd: password,
        },
      );
      const { result } = res.data;
      localStorage.setItem('token', result.token);
      localStorage.setItem('email', result.username);
      reloadUser();
      resetAxiosInstance();
      queryClient.clear();

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Nombre de usuario o contraseña incorrectos');
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
          Iniciar sesión
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
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};
