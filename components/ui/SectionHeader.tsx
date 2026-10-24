import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: ReactNode;
  title: ReactNode;
  /** Optional lead paragraph under the title. */
  lead?: ReactNode;
  /** Optional right-hand content (paragraph or link). */
  aside?: ReactNode;
  titleClassName?: string;
  maxWidth?: string;
  className?: string;
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  aside,
  titleClassName,
  maxWidth = "max-w-[640px]",
  className,
  dark,
}: Props) {
  return (
    <Reveal className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div className={cn("flex flex-col gap-4", maxWidth)}>
        <Eyebrow className={dark ? "text-teal-200" : undefined}>{eyebrow}</Eyebrow>
        <h2 className={cn("text-section", dark && "text-white", titleClassName)}>{title}</h2>
        {lead ? <p className={cn("text-lead", dark && "text-on-navy-muted")}>{lead}</p> : null}
      </div>
      {aside}
    </Reveal>
  );
}
