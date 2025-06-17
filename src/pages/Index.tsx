import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { apiQuery } from '../lib/api/util/api-query';
import { CategorySchema } from '../lib/category/schemas/category';

export const Index = () => {
  const { data: categories } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: () => apiQuery('/expenses_category', CategorySchema.array()),
  });

  return (
    <div className="mx-auto w-2xl max-w-2xl p-6 sm:p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        Categorías
      </h1>

      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              to={`/${category.id}`}
              className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-lg font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
