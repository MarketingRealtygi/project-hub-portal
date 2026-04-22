import { motion } from "framer-motion";

/**
 * Aurora background — gradient blobs flotantes inspirados en ReactBits.
 * Se posiciona absoluto detrás del hero.
 */
const Aurora = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-aurora aurora-drift opacity-90" />
      <motion.div
        className="absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-primary/30 blur-[120px]"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-primary-glow/25 blur-[140px]"
        animate={{ x: [0, -50, 30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-primary-deep/30 blur-[120px]"
        animate={{ x: [0, 30, -40, 0], y: [0, 30, -10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" />
    </div>
  );
};

export default Aurora;