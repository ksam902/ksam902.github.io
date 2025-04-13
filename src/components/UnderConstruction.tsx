'use client';

import { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';
import { Skeleton } from './ui/skeleton';

interface UnderConstructionProps {
  title?: string;
  message?: string;
  showPlaceholders?: boolean;
}

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

const UnderConstruction = ({
  title = 'Under Construction',
  message = 'This section is being built. Check back soon to see the latest updates!',
  showPlaceholders = true,
}: UnderConstructionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      scope.current = createScope({ root: containerRef }).add(() => {
        // Animate the progress bar
        animate('.progress-bar-fill', {
          width: ['0%', '75%'],
          duration: 3000,
          delay: 1000,
          easing: 'easeInOutQuart',
          direction: 'alternate',
        });
      });

      return () => {
        scope.current?.revert();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="construction-icon text-5xl mb-6">🚧</div>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>

        <p className="message mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {message}
        </p>

        <div className="w-full max-w-md mt-10 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div className="progress-bar-fill h-2.5 bg-blue-600 dark:bg-blue-400 rounded-full w-0"></div>
        </div>

        {showPlaceholders && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
            <SkeletonCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default UnderConstruction;
