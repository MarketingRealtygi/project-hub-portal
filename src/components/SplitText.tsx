import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

/**
 * SplitText — Adaptación del componente oficial de ReactBits.
 * Como el plugin gsap/SplitText es premium (Club GreenSock), aquí
 * realizamos el split manualmente con la misma API pública.
 */
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
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.fonts?.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts?.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;
      // Reset content
      el.innerHTML = "";

      const wantsChars = splitType.includes("chars");
      const wantsWords = splitType.includes("words") || wantsChars;

      const targets: HTMLElement[] = [];
      const words = text.split(" ");

      words.forEach((word, wi) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        if (wantsChars) {
          Array.from(word).forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "split-char";
            charSpan.style.display = "inline-block";
            charSpan.style.willChange = "transform, opacity";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
            targets.push(charSpan);
          });
        } else if (wantsWords) {
          wordSpan.textContent = word;
          wordSpan.style.willChange = "transform, opacity";
          targets.push(wordSpan);
        } else {
          wordSpan.textContent = word;
        }

        el.appendChild(wordSpan);
        if (wi < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      const tween = gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: "transform, opacity",
          force3D: true,
        }
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        tween.kill();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    }
  );

  const style: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };
  const classes = `split-parent ${className}`;
  const Tag = (tag || "p") as React.ElementType;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      style={style}
      className={classes}
    >
      {text}
    </Tag>
  );
};

export default SplitText;
