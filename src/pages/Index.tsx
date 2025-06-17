import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { apiQuery } from '../lib/api/util/api-query';
import { CategorySchema } from '../lib/category/schemas/category';

export interface CategoryDropdownProps {
  category: CategorySchema;
  isOpen: boolean;
  onToggle: () => void;
}

const CategoryDropdown = ({
  category,
  isOpen,
  onToggle,
}: CategoryDropdownProps) => (
  <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
    <button
      onClick={onToggle}
      className="w-full px-4 py-3 text-left font-semibold transition hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {category.name}
    </button>

    {isOpen && (
      <div className="border-t px-4 py-3 text-gray-700 dark:text-gray-300">
        <em>Gastos aún no cargados.</em>
      </div>
    )}
  </div>
);

export const Index = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['categories'],
    queryFn: () => apiQuery('/expenses_category', CategorySchema.array()),
  });

  const [openCategoryIds, setOpenCategoryIds] = useState<Set<number>>(
    new Set(),
  );

  const toggleCategory = (id: number) => {
    setOpenCategoryIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4 p-6">
      {data.map((category) => (
        <CategoryDropdown
          key={category.id}
          category={category}
          isOpen={openCategoryIds.has(category.id)}
          onToggle={() => toggleCategory(category.id)}
        />
      ))}
    </div>
  );
};
