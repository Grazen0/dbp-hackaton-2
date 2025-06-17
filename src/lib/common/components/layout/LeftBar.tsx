import clsx from 'clsx';
import { type HTMLAttributes } from 'react';
import { LuHouse, LuUser } from 'react-icons/lu';
import { NavLink, useLocation } from 'react-router';
import { useUser } from '../../../auth/hooks/use-user';
import { DarkModeButton } from './DarkModeButton';

const links = [
  {
    to: '/',
    label: 'Inicio',
    Icon: LuHouse,
    exact: true,
  },
];

export type Props = HTMLAttributes<HTMLDivElement>;

export const LeftBar = ({ className, ...props }: Props) => {
  const [, user] = useUser();
  const location = useLocation();

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <aside {...props} className={clsx(className, 'flex flex-col px-6 py-4')}>
      <NavLink
        to="/"
        className="my-3 flex items-center text-4xl font-extrabold text-gray-900 dark:text-white"
      >
        Hackatón 2
      </NavLink>

      <nav className="block grow">
        {links.map((link) => {
          const isActive = link.exact
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to);

          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={clsx(
                'my-3 flex items-center rounded-full px-4 py-2.5 text-xl text-nowrap text-gray-700 transition-colors duration-400 ease-in-out hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700',
                isActive && 'text-blue-600 dark:text-blue-400',
              )}
            >
              <link.Icon
                className={clsx('mr-2', isActive && 'fill-current')}
                size={30}
              />
              <div>{link.label}</div>
            </NavLink>
          );
        })}
      </nav>

      <DarkModeButton className="my-4" />

      {user ? (
        <>
          <div className="flex border-t border-gray-200 pt-4 pr-3 dark:border-gray-700">
            <div className="flex grow items-center space-x-3 px-2">
              <LuUser size={30} />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {user.username}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={logOut}
            className="bg-special hover:bg-special-muted mt-4 flex items-center justify-center rounded-full border border-black px-3 py-2 text-xl font-semibold text-nowrap transition-colors ease-in-out dark:border-white dark:text-white"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <div className="space-y-2">
          <NavLink
            to="/register"
            className="flex items-center justify-center rounded-full border border-blue-600 px-3 py-2 text-lg font-semibold text-nowrap text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
          >
            Registrarte
          </NavLink>
          <NavLink
            to="/login"
            className="flex items-center justify-center rounded-full bg-blue-600 px-3 py-2 text-lg font-semibold text-nowrap text-white transition-colors hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Iniciar sesión
          </NavLink>
        </div>
      )}
    </aside>
  );
};
