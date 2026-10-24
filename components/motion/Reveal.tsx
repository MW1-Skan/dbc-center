"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds; grid children pass index * 0.07 for the stagger. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "figure" | "header";
  id?: string;
};

/**
 * Fades content in while moving it up 16px, once, when it scrolls into view.
 * Pure CSS driven by a 2-line IntersectionObserver, so no animation runtime is
 * downloaded before first paint. Content is only hidden when JavaScript runs
 * (`html[data-js]`), and `prefers-reduced-motion` shows everything immediately.
 */
export function Reveal({ children, className, delay = 0, as = "div", id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.reveal = "shown";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The tag is chosen at runtime; typing it as "div" keeps the ref prop happy for every element kind.
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as Ref<HTMLDivElement>}
      id={id}
      className={className}
      data-reveal="hidden"
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
