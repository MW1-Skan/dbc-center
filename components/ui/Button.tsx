import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "white" | "ghost" | "tint";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy-700 text-white hover:bg-navy-800 hover:text-white hover:shadow-button",
  outline:
    "bg-white text-navy-700 border-[1.5px] border-outline hover:text-navy-800 hover:shadow-button",
  white: "bg-white text-navy-800 hover:text-navy-800 hover:shadow-button",
  ghost:
    "bg-transparent text-white border-[1.5px] border-white/35 hover:text-white hover:bg-white/10",
  tint: "bg-chip text-navy-700 hover:text-navy-800 hover:shadow-button",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[52px] px-[22px] text-base",
  md: "h-[56px] px-6 text-[17px]",
  lg: "h-[60px] px-7 text-[17px]",
  xl: "h-[58px] px-[34px] text-lg",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentProps<"a">,
    "href" | "className"
  >;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className"
  >;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseClass =
  "press group inline-flex items-center justify-center gap-2.5 rounded-pill font-semibold whitespace-nowrap no-underline select-none disabled:opacity-60 disabled:pointer-events-none";

const styleKeys = ["variant", "size", "full", "className", "children"] as const;

function nativeProps<T extends object>(props: T) {
  const rest: Record<string, unknown> = { ...(props as Record<string, unknown>) };
  for (const key of styleKeys) delete rest[key];
  return rest;
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", full, className, children } = props;
  const classes = cn(baseClass, variants[variant], sizes[size], full && "w-full", className);

  if (props.href !== undefined) {
    const { href, ...rest } = nativeProps(props) as { href: string } & Omit<
      ComponentProps<"a">,
      "href"
    >;
    const external = /^(https?:|tel:|mailto:)/.test(href) || href.startsWith("#");
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type, ...rest } = nativeProps(props) as Omit<ComponentProps<"button">, "className">;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
