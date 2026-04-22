import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
}

/**
 * SplitText — anima palabra por palabra entrando hacia arriba.
 * Inspirado en ReactBits SplitText.
 */
const SplitText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.06,
  as: Tag = "h1",
}: SplitTextProps) => {
  const words = text.split(" ");
  const MotionTag = motion[Tag] as typeof motion.h1;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

export default SplitText;