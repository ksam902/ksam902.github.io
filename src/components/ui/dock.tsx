'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from 'framer-motion';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/src/lib/utils';

const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};
type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};
type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
};
type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

type DocContextType = {
  mouseX: MotionValue;
  spring: SpringOptions;
  magnification: number;
  distance: number;
};
type DockProviderProps = {
  children: React.ReactNode;
  value: DocContextType;
};

const DockContext = createContext<DocContextType | undefined>(undefined);

function DockProvider({ children, value }: DockProviderProps) {
  return <DockContext.Provider value={value}>{children}</DockContext.Provider>;
}

function useDock() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error('useDock must be used within an DockProvider');
  }
  return context;
}

// --- DockItem Context --- //
type DockItemContextValue = {
  width: MotionValue<number>;
  isHovered: MotionValue<number>;
};

const DockItemContext = createContext<DockItemContextValue | undefined>(undefined);

function useDockItem() {
  const context = useContext(DockItemContext);
  if (!context) {
    throw new Error('useDockItem must be used within a DockItemProvider');
  }
  return context;
}
// --- End DockItem Context --- //

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => {
    return Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4);
  }, [magnification]);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{
        height: height,
        scrollbarWidth: 'none',
      }}
      className="mx-2 flex max-w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          'mx-auto flex w-fit gap-4 rounded-2xl bg-gray-50 px-4 dark:bg-neutral-900',
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>{children}</DockProvider>
      </motion.div>
    </motion.div>
  );
}

function DockItem({ children, className, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { distance, magnification, mouseX, spring } = useDock();

  const isHovered = useMotionValue(0);
  const widthMotionValue = useMotionValue(40); // Default width

  useEffect(() => {
    const updateWidth = () => {
      const domRect = ref.current?.getBoundingClientRect();
      if (domRect) {
        const mouseDistance = mouseX.get() - domRect.x - domRect.width / 2;
        let newWidth = 40;
        if (Math.abs(mouseDistance) < distance) {
          newWidth = magnification - (magnification - 40) * (Math.abs(mouseDistance) / distance);
        }
        widthMotionValue.set(newWidth);
      }
    };

    const unsubscribeMouseX = mouseX.on('change', updateWidth);
    updateWidth(); // Initial calculation

    return () => {
      unsubscribeMouseX();
    };
  }, [mouseX, distance, magnification, widthMotionValue]);

  const width = useSpring(widthMotionValue, spring);

  return (
    <DockItemContext.Provider value={{ width, isHovered }}>
      <motion.div
        ref={ref}
        style={{ width }}
        onClick={onClick} // Attach onClick handler
        onHoverStart={() => isHovered.set(1)}
        onHoverEnd={() => isHovered.set(0)}
        onFocus={() => isHovered.set(1)} // Keep focus for accessibility
        onBlur={() => isHovered.set(0)}
        className={cn(
          'relative inline-flex cursor-pointer items-center justify-center focus:outline-none', // Add cursor-pointer and remove default focus outline if needed
          className
        )}
        role="button" // Add role button for accessibility
        tabIndex={0} // Make it focusable
        aria-haspopup={false} // It doesn't open a popup
      >
        {children} {/* Render children directly */}
      </motion.div>
    </DockItemContext.Provider>
  );
}

function DockLabel({ children, className }: DockLabelProps) {
  const { isHovered } = useDockItem(); // Use context
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // isHovered is guaranteed to be defined by context
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
            className
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className }: DockIconProps) {
  const { width } = useDockItem(); // Use context

  // Width is guaranteed to be defined by context
  const widthTransform = useTransform(width, val => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

export { Dock, DockIcon, DockItem, DockLabel };
