import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  label: ReactNode;
  optional?: boolean;
  /** i18n key under `Forms`, as produced by the Zod schemas. */
  error?: string;
  className?: string;
  labelClassName?: string;
  children: ReactNode;
};

export function Field({ id, label, optional, error, className, labelClassName, children }: Props) {
  const t = useTranslations("Common");
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className={cn("text-[15px] font-semibold", labelClassName)}>
        {label}
        {optional ? <span className="font-normal text-muted"> {t("optional")}</span> : null}
      </label>
      {children}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  const t = useTranslations("Forms");
  if (!error) return null;
  const key = error as Parameters<typeof t>[0];
  return (
    <p id={`${id}-error`} className="text-sm font-medium text-error">
      {t.has(key) ? t(key) : t("required")}
    </p>
  );
}

export function describedBy(id: string, error?: string) {
  return error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};
}
