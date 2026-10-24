import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"span"> & { tone?: "teal" | "warm" | "white" | "navy" };

const tones = {
  teal: "bg-chip text-teal-700",
  warm: "bg-warm text-warm-text",
  white: "bg-white text-teal-700",
  navy: "bg-teal-200 text-navy-800",
} as const;

export function Tag({ tone = "teal", className, ...props }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-[13px] font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
