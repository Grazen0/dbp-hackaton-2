import clsx from 'clsx';
import { useEffect, useState, type ComponentProps } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

export type Props = ComponentProps<'button'>;

export const DarkModeButton = ({ className, onClick, ...rest }: Props) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        toggleDarkMode();
      }}
      className={clsx(
        'flex items-center gap-2 rounded-full px-4 py-2 text-base transition-colors',
        'hover:bg-gray-200 dark:hover:bg-gray-700',
        className,
      )}
    >
      {isDark ? <LuSun size={20} /> : <LuMoon size={20} />}
      {isDark ? 'Modo claro' : 'Modo oscuro'}
    </button>
  );
};
