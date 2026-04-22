import React, { useEffect, useMemo, useRef, useState } from "react";

type SplitAnimationValues = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
};

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: SplitAnimationValues;
  to?: SplitAnimationValues;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

const EASE_MAP: Record<string, string> = {
  "power3.out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "power2.out": "cubic-bezier(0.16, 1, 0.3, 1)",
  "power4.out": "cubic-bezier(0.16, 1, 0.3, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
};

const toTransform = (values: SplitAnimationValues = {}) => {
  const x = values.x ?? 0;
  const y = values.y ?? 0;
  const scale = values.scale ?? 1;
  const rotate = values.rotate ?? 0;
  return `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
};

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const onceAnimatedRef = useRef(false);

  const wantsChars = splitType.includes("chars");
  const cssEase = EASE_MAP[ease] ?? EASE_MAP["power3.out"];
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const element = ref.current;
    if (!element || onceAnimatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        onceAnimatedRef.current = true;
        observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (!isVisible || !onLetterAnimationComplete) return;

    const totalTargets = wantsChars
      ? text.replace(/\s/g, "").length
      : words.length;

    const totalTime = totalTargets * delay + duration * 1000;
    const timeout = window.setTimeout(() => {
      onLetterAnimationComplete();
    }, totalTime);

    return () => window.clearTimeout(timeout);
  }, [delay, duration, isVisible, onLetterAnimationComplete, text, wantsChars, words.length]);

  const Tag = tag as React.ElementType;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`split-parent ${className}`.trim()}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {words.map((word, wordIndex) => (
        <React.Fragment key={`${word}-${wordIndex}`}>
          <span
            className="split-word"
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {wantsChars
              ? Array.from(word).map((char, charIndex) => {
                  const index = words
                    .slice(0, wordIndex)
                    .join("")
                    .length + charIndex + wordIndex;

                  return (
                    <span
                      key={`${char}-${index}`}
                      className="split-char"
                      style={{
                        display: "inline-block",
                        willChange: "transform, opacity",
                        opacity: isVisible ? to.opacity ?? 1 : from.opacity ?? 0,
                        transform: isVisible ? toTransform(to) : toTransform(from),
                        transitionProperty: "transform, opacity",
                        transitionDuration: `${duration}s`,
                        transitionTimingFunction: cssEase,
                        transitionDelay: `${index * delay}ms`,
                      }}
                    >
                      {char}
                    </span>
                  );
                })
              : (
                <span
                  style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                    opacity: isVisible ? to.opacity ?? 1 : from.opacity ?? 0,
                    transform: isVisible ? toTransform(to) : toTransform(from),
                    transitionProperty: "transform, opacity",
                    transitionDuration: `${duration}s`,
                    transitionTimingFunction: cssEase,
                    transitionDelay: `${wordIndex * delay}ms`,
                  }}
                >
                  {word}
                </span>
              )}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default SplitText;
