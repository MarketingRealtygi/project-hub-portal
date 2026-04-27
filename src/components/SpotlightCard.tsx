import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: CSSProperties;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  style,
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const mergedStyle = {
    ...style,
    ["--spotlight-color" as string]: spotlightColor,
  } as CSSProperties;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const element = divRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`.trim()}
      style={mergedStyle}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
