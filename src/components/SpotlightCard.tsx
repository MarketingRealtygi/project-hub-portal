import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * SpotlightCard — tarjeta con spotlight cursor + tilt 3D sutil.
 * Inspirado en ReactBits TiltedCard / Spotlight.
 */
const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set((x / rect.width) * 100);
    my.set((y / rect.height) * 100);
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, hsl(var(--primary) / 0.18), transparent 55%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-[var(--gradient-card)] p-px transition-shadow duration-500 hover:shadow-gold ${className}`}
    >
      {/* Animated gradient border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, hsl(var(--primary)) 0deg, transparent 90deg, transparent 270deg, hsl(var(--primary-glow)) 360deg)",
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-card overflow-hidden">
        {/* Spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;