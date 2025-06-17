import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div className="flex grow flex-col justify-center">
    <h2 className="mb-4 text-center text-3xl font-semibold">
      Algo salió mal :(
    </h2>
    <p className="my-2 text-center">¿Quizá necesitas logearte?</p>
    <div className="text-center">
      <button
        onClick={resetErrorBoundary}
        className="border-foreground cursor-pointer rounded-full border-2 px-3 py-1 text-lg font-semibold"
      >
        Reintentar
      </button>
    </div>
  </div>
);
