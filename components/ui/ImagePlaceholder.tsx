import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Visible label inside the frame, e.g. "Photo · Dr. Karam". */
  label?: string;
  /** Accessible description; defaults to the label. */
  alt?: string;
  tone?: "light" | "mint" | "navy";
  /** Where the label sits. */
  labelPosition?: "center" | "bottom-start";
  /** Enables the 1.03 zoom when an ancestor `.group` is hovered. */
  zoom?: boolean;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
};

const tones = {
  light: "stripes-light",
  mint: "stripes-mint",
  navy: "stripes-navy",
} as const;

/**
 * Striped stand-in for a photo. Swap for `next/image` later by replacing the
 * outer element with an <Image> of the same dimensions and radius.
 */
export function ImagePlaceholder({
  label,
  alt,
  tone = "light",
  labelPosition = "center",
  zoom,
  className,
  labelClassName,
  children,
}: Props) {
  const centered = labelPosition === "center";
  return (
    <div
      role="img"
      aria-label={alt ?? label}
      className={cn(
        "relative flex",
        tones[tone],
        centered ? "items-center justify-center" : "items-end justify-between p-[18px]",
        zoom && "duration-base transition-transform ease-out group-hover:scale-[1.03]",
        className,
      )}
    >
      {label ? (
        <span
          className={cn(
            "text-xs font-bold tracking-[.08em] uppercase",
            centered
              ? tone === "navy"
                ? "rounded-pill bg-white/12 px-3.5 py-[7px] text-on-navy-light"
                : "rounded-pill bg-white/90 px-3 py-1.5 text-label"
              : tone === "navy"
                ? "text-on-navy-muted"
                : "text-label",
            labelClassName,
          )}
        >
          {label}
        </span>
      ) : null}
      {children}
    </div>
  );
}
