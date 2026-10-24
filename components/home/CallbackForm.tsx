"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@/i18n/navigation";
import { callbackInterest } from "@/content/booking";
import { submitCallback, type ActionResult } from "@/lib/actions";
import type { CallbackInput } from "@/lib/schemas/callback";
import { lazyResolver } from "@/lib/forms/lazy-resolver";
import { Field, describedBy } from "@/components/forms/Field";
import { FormAlert } from "@/components/forms/FormAlert";
import { Honeypot } from "@/components/forms/Honeypot";
import { CheckIcon } from "@/components/ui/icons";

export function CallbackForm() {
  const t = useTranslations("Callback");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallbackInput>({
    resolver: lazyResolver<CallbackInput>(() =>
      import("@/lib/forms/callback-resolver").then((m) => m.default),
    ),
    defaultValues: { name: "", phone: "", interest: "unsure", website: "" },
  });

  const onSubmit = handleSubmit((values) => {
    setResult(null);
    startTransition(async () => {
      const res = await submitCallback(values);
      setResult(res);
      if (res.ok) reset();
    });
  });

  const labelClass = "text-sm md:text-[15px] text-white md:text-body";
  const inputClass = "field border-0 md:border-[1.5px] h-[50px] md:h-[52px] px-3.5 md:px-4";

  if (result?.ok) {
    return (
      <div
        role="status"
        className="fade-in flex h-full flex-col items-start justify-center gap-4 md:gap-5"
      >
        <span className="flex size-[60px] items-center justify-center rounded-full bg-white/10 md:bg-chip">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="text-teal-200 md:text-teal-600"
          >
            <path className="check-draw" d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <h3 className="text-[22px] text-white md:text-navy-800">{t("successTitle")}</h3>
        <p className="text-[15px] text-on-navy-muted md:text-[17px] md:text-lead">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="link-grow font-semibold text-teal-200 md:text-teal-600"
        >
          {t("another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4 md:gap-5">
      <h3 className="hidden text-[22px] md:block">{t("formTitle")}</h3>
      <Honeypot registration={register("website")} />
      <FormAlert result={result && !result.ok ? result : null} />

      <Field
        id="cb-name"
        label={t("name")}
        error={errors.name?.message}
        labelClassName={labelClass}
      >
        <input
          id="cb-name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className={inputClass}
          {...describedBy("cb-name", errors.name?.message)}
          {...register("name")}
        />
      </Field>

      <Field
        id="cb-phone"
        label={t("phone")}
        error={errors.phone?.message}
        labelClassName={labelClass}
      >
        <input
          id="cb-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t("phonePlaceholder")}
          className={inputClass}
          {...describedBy("cb-phone", errors.phone?.message)}
          {...register("phone")}
        />
      </Field>

      <Field
        id="cb-proc"
        label={t("interest")}
        error={errors.interest?.message}
        className="max-md:hidden"
        labelClassName={labelClass}
      >
        <select id="cb-proc" className={inputClass} {...register("interest")}>
          {callbackInterest.map((key) => (
            <option key={key} value={key}>
              {t(`interestOptions.${key}`)}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-4 md:pt-2">
        <button
          type="submit"
          disabled={pending}
          className="press mt-1 h-[54px] w-full rounded-pill bg-white text-[17px] font-bold text-navy-800 disabled:opacity-70 md:mt-0 md:w-auto md:bg-navy-700 md:px-7 md:font-semibold md:text-white md:hover:shadow-button"
        >
          {pending ? t("submitting") : t("submit")}
          <CheckIcon className="hidden" />
        </button>
        <Link
          href="/book"
          className="link-grow self-center font-semibold text-teal-200 md:self-auto md:text-teal-600"
        >
          <span className="md:hidden">{t("chooseDateShort")}</span>
          <span className="hidden md:inline">{t("chooseDate")}</span>
        </Link>
      </div>
    </form>
  );
}
