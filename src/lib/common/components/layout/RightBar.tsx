import clsx from 'clsx';
import { type HTMLAttributes } from 'react';

export type Props = HTMLAttributes<HTMLDivElement>;

export const RightBar = ({ className, ...props }: Props) => {
  return (
    <aside {...props} className={clsx(className, 'mx-6 my-4 flex flex-col')}>
      <section className="grow">
        <div>
          <h3 className="mt-2 mb-2 text-xl font-semibold">Universidades</h3>
        </div>
      </section>
    </aside>
  );
};
