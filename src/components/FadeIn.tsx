import { useRef, type CSSProperties, type ReactNode } from "react";
import { useOnScreen } from "../hooks/useOnScreen";

export function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, "0px");
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>{children}</div>;
}
