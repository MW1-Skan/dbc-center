import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("eyebrow", className)} {...props} />;
}
