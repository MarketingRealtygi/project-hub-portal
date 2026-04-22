import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollStackProps {
  children: ReactNode[];
  className?: string;
}

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * ScrollStack — inspirado en ReactBits ScrollStack.
 * Las cards se apilan progresivamente al hacer scroll, escalando
 * y desplazándose hacia atrás conforme aparece la siguiente.
 */
export const ScrollStackItem = ({ children, className = "" }: ScrollStackItemProps) => {
  return <div className={className}>{children}</div>;
};

const StackCard = ({
  children,
  index,
  total,
  progress,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  // Cada card ocupa 1/total del scroll. Empieza a "fijarse" al inicio de su tramo.
  const start = index / total;
  const end = (index + 1) / total;

  // Las cards previas se reducen y se desplazan hacia atrás cuando entra la siguiente
  const scale = useTransform(progress, [start, end], [1, 1 - (total - index - 1) * 0.04]);
  const y = useTransform(progress, [start, end], [0, -30]);
  const opacity = useTransform(progress, [start, end], [1, 0.6]);

  return (
    <div
      className="sticky"
      style={{
        top: `calc(8rem + ${index * 16}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div style={{ scale, y, opacity }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
};

const ScrollStack = ({ children, className = "" }: ScrollStackProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const items = Array.isArray(children) ? children : [children];
  // Reservamos altura para que cada card tenga su tramo de scroll
  const sectionHeight = `${items.length * 90}vh`;

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: sectionHeight }}>
      <div className="space-y-6">
        {items.map((child, i) => (
          <StackCard key={i} index={i} total={items.length} progress={scrollYProgress}>
            {child}
          </StackCard>
        ))}
      </div>
    </div>
  );
};

export default ScrollStack;