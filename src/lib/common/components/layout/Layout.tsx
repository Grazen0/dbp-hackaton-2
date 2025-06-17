import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useRef, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router';
import { ScrollRestorer } from '../behavior/ScrollRestorer';
import { ErrorFallback } from '../pages/ErrorFallback';
import { LoadingScreen } from '../pages/LoadingScreen';
import { LeftBar } from './LeftBar';

export interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  return (
    <div className="flex max-h-screen grow justify-items-stretch bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <ScrollRestorer ref={mainRef} />
      <LeftBar className="w-58 min-w-58 lg:w-72 lg:min-w-72" />
      <main
        tabIndex={0}
        role="main"
        autoFocus
        ref={mainRef}
        className="flex grow flex-col overflow-y-scroll border-x border-gray-200 px-8 py-6 dark:border-gray-700"
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={ErrorFallback}
              key={location.pathname}
            >
              <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </main>
    </div>
  );
};
