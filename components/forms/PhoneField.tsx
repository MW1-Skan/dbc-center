"use client";

import { useTranslations } from "next-intl";
import type { UseFormRegisterReturn } from "react-hook-form";
import { countryCodes } from "@/content/booking";
import { cn } from "@/lib/utils";
import { Field, describedBy } from "./Field";

type Props = {
  id: string;
  label: string;
  error?: string;
  codeRegistration: UseFormRegisterReturn;
  phoneRegistration: UseFormRegisterReturn;
  /** "other" switches the placeholder to a full international number. */
  code: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
};

/** Dialling-code select plus national number input, labelled as one field. */
export function PhoneField({
  id,
  label,
  error,
  codeRegistration,
  phoneRegistration,
  code,
  className,
  labelClassName,
  inputClassName,
}: Props) {
  const t = useTranslations("Forms");
  return (
    <Field
      id={id}
      label={label}
      error={error}
      className={className}
      labelClassName={labelClassName}
    >
      <div dir="ltr" className="flex gap-2">
        <select
          aria-label={t("countryCode")}
          className={cn("field w-auto shrink-0 px-3", inputClassName)}
          {...codeRegistration}
        >
          {countryCodes.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          autoComplete="tel-national"
          inputMode="tel"
          placeholder={code === "other" ? t("phoneOther") : t("phoneNational")}
          className={cn("field min-w-0 flex-1", inputClassName)}
          {...describedBy(id, error)}
          {...phoneRegistration}
        />
      </div>
    </Field>
  );
}
