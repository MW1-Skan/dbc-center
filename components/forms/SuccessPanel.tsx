import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body: string;
  actions?: ReactNode;
  className?: string;
  /** Heading level: the booking page uses h2, the rooms page h3. */
  as?: "h2" | "h3";
};

/** Centered success state with a self-drawing checkmark. */
export function SuccessPanel({ title, body, actions, className, as: Heading = "h2" }: Props) {
  return (
    <div
      role="status"
      className={cn(
        "fade-in flex flex-col items-center gap-[18px] rounded-panel border border-line bg-white px-6 py-14 text-center md:px-12 md:py-[72px]",
        className,
      )}
    >
      <span className="flex size-[76px] items-center justify-center rounded-full bg-chip">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#127379"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path className="check-draw" d="M20 6L9 17l-5-5" />
        </svg>
      </span>
      <Heading
        className={cn(
          Heading === "h2" ? "text-[28px] md:text-[32px]" : "text-[26px] md:text-[30px]",
        )}
      >
        {title}
      </Heading>
      <p className="max-w-[460px] text-lead">{body}</p>
      {actions ? (
        <div className="flex flex-wrap justify-center gap-3.5 pt-2.5">{actions}</div>
      ) : null}
    </div>
  );
}
