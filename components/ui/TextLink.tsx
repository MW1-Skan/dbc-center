import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./icons";

type Props = {
  href: string;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** Semibold navy link whose underline grows from the start edge. */
export function TextLink({ href, children, arrow, className, ...rest }: Props) {
  const classes = cn(
    "group inline-flex items-center gap-2 font-semibold text-navy-700 no-underline hover:text-navy-800",
    className,
  );
  const inner = (
    <>
      <span className="link-grow">{children}</span>
      {arrow ? <ArrowIcon size={16} className="nudge" /> : null}
    </>
  );
  const external = /^(https?:|tel:|mailto:)/.test(href) || href.startsWith("#");
  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}
