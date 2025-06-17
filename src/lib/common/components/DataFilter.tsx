// src/common/components/DateFilter.tsx
import { useState } from 'react';

type DateFilterProps = {
  initialYear: number;
  initialMonth: number;
  onApply: (filter: { year: number; month: number }) => void;
};

export const DateFilter = ({
  initialYear,
  initialMonth,
  onApply,
}: DateFilterProps) => {
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const handleApply = () => {
    onApply({ year, month });
  };

  return (
    <div className="mb-4 flex flex-wrap items-end gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Año
        </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Mes
        </label>
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="w-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {m.toString().padStart(2, '0')}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleApply}
        className="mt-auto rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
      >
        Buscar
      </button>
    </div>
  );
};
