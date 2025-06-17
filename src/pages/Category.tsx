import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LuTrash } from 'react-icons/lu';
import { useParams } from 'react-router';
import { z } from 'zod/v4';
import { apiQuery } from '../lib/api/util/api-query';
import { getAxiosInstance } from '../lib/api/util/axios-instance';

export const ExpenseSchema = z.object({
  id: z.number(),
  date: z.coerce.date(),
  amount: z.number(),
});

export type ExpenseSchema = z.infer<typeof ExpenseSchema>;

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id ?? '');

  const { data: expenses } = useSuspenseQuery({
    queryKey: ['expenses', categoryId],
    queryFn: () => apiQuery('/expenses', ExpenseSchema.array()),
  });

  const [cost, setCost] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const handleDelete = async (expenseId: number) => {
    await getAxiosInstance().delete(`/expenses/${expenseId}`);
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await getAxiosInstance().post('/expenses', {
      amount: cost,
      category: {
        id: categoryId,
      },
      date: `${year}-${month}-${day}`,
    });
    window.location.reload();
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Gastos de Categoría #{categoryId}
      </h1>

      {expenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No hay gastos registrados.
        </p>
      ) : (
        <ul className="mb-8 space-y-4">
          {expenses.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  {item.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  S/. {item.cost.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 transition hover:text-red-600"
              >
                <LuTrash className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Agregar nuevo gasto
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Monto (S/.)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Año
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Mes
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Día
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-special hover:bg-special-muted w-full rounded-full px-4 py-2 text-center text-white transition"
        >
          Agregar gasto
        </button>
      </form>
    </div>
  );
};
