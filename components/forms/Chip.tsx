import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<"button">, "children"> & {
  pressed: boolean;
  children: ReactNode;
};

/** Pill toggle used for time of day, week days and parts of the day. */
export function Chip({ pressed, className, children, ...rest }: Props) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "press duration-fast inline-flex h-12 items-center gap-2 rounded-pill border-[1.5px] px-5 text-base font-semibold transition-colors",
        pressed
          ? "border-navy-700 bg-navy-700 text-white"
          : "border-line-input bg-white text-navy-800 hover:border-navy-700",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
