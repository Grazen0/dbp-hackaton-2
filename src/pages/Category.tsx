import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { LuTrash } from 'react-icons/lu';
import { useParams } from 'react-router';
import { apiQuery } from '../lib/api/util/api-query';
import { getAxiosInstance } from '../lib/api/util/axios-instance';
import { CategorySchema } from '../lib/category/schemas/category';
import { DateFilter } from '../lib/common/components/DataFilter';
import { NewExpenseForm } from '../lib/expense/components/NewExpenseForm';
import { ExpenseSchema } from '../lib/expense/schemas/expense';

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

export const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = parseInt(id ?? '', 10);
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const { data: expenses, refetch: refetchExpenses } = useSuspenseQuery({
    queryKey: ['expenses', categoryId, filter.year, filter.month],
    queryFn: () =>
      apiQuery('/expenses/detail', ExpenseSchema.array(), {
        config: {
          params: { categoryId, year: filter.year, month: filter.month },
        },
      }),
  });

  const { data: categories } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: () => apiQuery('/expenses_category', CategorySchema.array()),
  });

  const handleDelete = async (expenseId: number) => {
    await getAxiosInstance().delete(`/expenses/${expenseId}`);
    queryClient.clear();
    await refetchExpenses();
  };

  const category = useMemo(
    () => categories.find((c) => c.id === categoryId),
    [categoryId, categories],
  );

  if (!category) return <>Categoría no encontrada.</>;

  return (
    <div className="mx-auto max-w-2xl p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gastos de{' '}
          <span className="text-blue-600 dark:text-blue-400">
            "{category.name}"
          </span>
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Selecciona el año y mes para filtrar los gastos.
        </p>
      </div>

      <DateFilter
        initialYear={filter.year}
        initialMonth={filter.month}
        onApply={(newFilter) => setFilter(newFilter)}
      />

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-900">
        <NewExpenseForm categoryId={categoryId} />
      </div>

      <div className="mt-8">
        {expenses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No hay gastos registrados para este periodo.
          </p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.date.toISOString().split('T')[0]}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    S/. {item.amount.toFixed(2)}
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
      </div>
    </div>
  );
};
