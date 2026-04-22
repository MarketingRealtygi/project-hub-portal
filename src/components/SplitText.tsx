import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Resaltar palabras específicas con className adicional */
  highlight?: { word: string; className: string };
}

/**
 * SplitText — Inspirado en ReactBits Split Text.
 * Anima caracter por caracter (con stagger) entrando desde abajo,
 * conservando saltos por palabra para evitar romper en medio.
 */
const SplitText = ({
  text,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.025,
  as: Tag = "h1",
  highlight,
}: SplitTextProps) => {
  const MotionTag = motion[Tag] as typeof motion.h1;
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      aria-label={text}
    >
      {words.map((word, wi) => {
        const isHighlight = highlight && word.toLowerCase().replace(/[.,!?]/g, "") === highlight.word.toLowerCase();
        return (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap align-bottom">
              {word.split("").map((char, ci) => (
                <span key={ci} className="inline-block overflow-hidden align-bottom leading-[1.05]">
                  <motion.span
                    variants={child}
                    className={`inline-block ${isHighlight ? highlight!.className : ""}`}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
            {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </Fragment>
        );
      })}
    </MotionTag>
  );
};

export default SplitText;