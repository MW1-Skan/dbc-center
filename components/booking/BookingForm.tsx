"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition, type ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { bookingDepartments, procedureInterest, timesOfDay, visitReasons } from "@/content/booking";
import { contact } from "@/content/contact";
import { submitBooking, type ActionResult } from "@/lib/actions";
import type { BookingData, BookingInput } from "@/lib/schemas/booking";
import { lazyResolver } from "@/lib/forms/lazy-resolver";
import { cn } from "@/lib/utils";
import { Field, FieldError, describedBy } from "@/components/forms/Field";
import { FormAlert } from "@/components/forms/FormAlert";
import { Honeypot } from "@/components/forms/Honeypot";
import { PhoneField } from "@/components/forms/PhoneField";
import { Chip } from "@/components/forms/Chip";
import { SuccessPanel } from "@/components/forms/SuccessPanel";
import { Button } from "@/components/ui/Button";

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-[18px] border-0 p-0">
      <legend className="mb-[18px] flex items-center gap-3.5 p-0">
        <span className="inline-flex size-[34px] items-center justify-center rounded-full bg-navy-700 font-heading text-[15px] font-semibold text-white">
          {n}
        </span>
        <span className="font-heading text-xl font-semibold text-navy-800 md:text-[22px]">
          {title}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

export function BookingForm() {
  const t = useTranslations("BookPage");
  const tc = useTranslations("Common");
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<BookingInput, unknown, BookingData>({
    resolver: lazyResolver<BookingInput, BookingData>(() =>
      import("@/lib/forms/booking-resolver").then((m) => m.default),
    ),
    defaultValues: {
      reason: "first",
      department: "bariatricSurgery",
      procedure: "unsure",
      preferredDate: "",
      secondDate: "",
      timeOfDay: "morning",
      name: "",
      countryCode: "+20",
      phone: "",
      email: "",
      age: "" as unknown as number,
      heightCm: "" as unknown as number,
      weightKg: "" as unknown as number,
      notes: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  // The BMI calculator links here with ?height=&weight=; fill the optional fields once.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const h = Number(params.get("height"));
    const w = Number(params.get("weight"));
    if (h >= 100 && h <= 250) setValue("heightCm", h);
    if (w >= 30 && w <= 400) setValue("weightKg", w);
  }, [setValue]);

  const reason = useWatch({ control, name: "reason" });
  const countryCode = useWatch({ control, name: "countryCode" });
  const timeOfDay = useWatch({ control, name: "timeOfDay" });

  const onSubmit = handleSubmit((values) => {
    setResult(null);
    startTransition(async () => {
      const res = await submitBooking(values);
      setResult(res);
      if (res.ok) window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  if (result?.ok) {
    return (
      <SuccessPanel
        title={t("success.title")}
        body={t("success.body")}
        actions={
          <>
            <Button href="/" className="h-[54px] px-[26px]">
              {t("success.home")}
            </Button>
            <Button
              variant="outline"
              className="h-[54px] px-6"
              onClick={() => {
                reset();
                setResult(null);
              }}
            >
              {t("success.again")}
            </Button>
          </>
        }
      />
    );
  }

  const grid2 = "grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-[18px]";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative flex min-w-0 flex-col gap-9 rounded-panel border border-line bg-white p-6 md:gap-11 md:p-12"
    >
      <Honeypot registration={register("website")} />
      <FormAlert result={result && !result.ok ? result : null} />

      <Step n={1} title={t("steps.reason")}>
        <div
          role="radiogroup"
          aria-label={t("steps.reason")}
          className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-3.5"
        >
          {visitReasons.map((r) => {
            const on = reason === r;
            return (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setValue("reason", r, { shouldValidate: true })}
                className={cn(
                  "duration-fast flex min-h-24 cursor-pointer flex-col gap-1.5 rounded-[18px] border-2 px-[22px] py-5 text-start transition-colors",
                  on ? "border-navy-700 bg-mint" : "border-line-card bg-white hover:border-outline",
                )}
              >
                <span className="flex items-center justify-between gap-3">
                  <strong className="text-[17px] font-bold text-navy-800">
                    {t(`reasons.${r}.title`)}
                  </strong>
                  <span
                    aria-hidden
                    className={cn(
                      "duration-fast box-border size-5 shrink-0 rounded-full transition-colors",
                      on ? "border-[6px] border-navy-700 bg-white" : "border-2 border-outline",
                    )}
                  />
                </span>
                <span className="text-[15px] text-muted">{t(`reasons.${r}.desc`)}</span>
              </button>
            );
          })}
        </div>
      </Step>

      <Step n={2} title={t("steps.who")}>
        <div className={grid2}>
          <Field id="bk-dept" label={t("department")} error={errors.department?.message}>
            <select id="bk-dept" className="field" {...register("department")}>
              {bookingDepartments.map((d) => (
                <option key={d} value={d}>
                  {t(`departments.${d}`)}
                </option>
              ))}
            </select>
          </Field>
          <Field id="bk-proc" label={t("procedure")} optional error={errors.procedure?.message}>
            <select id="bk-proc" className="field" {...register("procedure")}>
              {procedureInterest.map((p) => (
                <option key={p} value={p}>
                  {t(`procedures.${p}`)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Step>

      <Step n={3} title={t("steps.when")}>
        <div className={grid2}>
          <Field id="bk-date1" label={t("preferredDate")} error={errors.preferredDate?.message}>
            <input
              id="bk-date1"
              type="date"
              className="field"
              {...describedBy("bk-date1", errors.preferredDate?.message)}
              {...register("preferredDate")}
            />
          </Field>
          <Field id="bk-date2" label={t("secondDate")} optional error={errors.secondDate?.message}>
            <input
              id="bk-date2"
              type="date"
              className="field"
              {...describedBy("bk-date2", errors.secondDate?.message)}
              {...register("secondDate")}
            />
          </Field>
        </div>
        <div className="flex flex-col gap-2.5">
          <span id="tod-label" className="text-[15px] font-semibold">
            {t("timeOfDay")}
          </span>
          <div role="group" aria-labelledby="tod-label" className="flex flex-wrap gap-2.5">
            {timesOfDay.map((tod) => (
              <Chip
                key={tod}
                pressed={timeOfDay === tod}
                onClick={() => setValue("timeOfDay", tod, { shouldValidate: true })}
              >
                <span>{t(`times.${tod}.label`)}</span>
                <span className="font-normal opacity-80">{t(`times.${tod}.hours`)}</span>
              </Chip>
            ))}
          </div>
        </div>
      </Step>

      <Step n={4} title={t("steps.details")}>
        <div className={grid2}>
          <Field id="bk-name" label={t("name")} error={errors.name?.message}>
            <input
              id="bk-name"
              type="text"
              autoComplete="name"
              className="field"
              {...describedBy("bk-name", errors.name?.message)}
              {...register("name")}
            />
          </Field>
          <PhoneField
            id="bk-phone"
            label={t("phone")}
            error={errors.phone?.message ?? errors.countryCode?.message}
            code={countryCode}
            codeRegistration={register("countryCode")}
            phoneRegistration={register("phone")}
          />
          <Field id="bk-email" label={t("email")} optional error={errors.email?.message}>
            <input
              id="bk-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              className="field"
              {...describedBy("bk-email", errors.email?.message)}
              {...register("email")}
            />
          </Field>
          <Field id="bk-age" label={t("age")} error={errors.age?.message}>
            <input
              id="bk-age"
              type="number"
              min={12}
              max={99}
              inputMode="numeric"
              className="field"
              {...describedBy("bk-age", errors.age?.message)}
              {...register("age")}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-3.5 rounded-[18px] bg-mint p-[22px]">
          <span className="text-[15px] text-lead">
            {t.rich("bmiIntro", {
              strong: (c) => <strong className="font-bold text-navy-800">{c}</strong>,
            })}
          </span>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
            <Field id="bk-h" label={t("height")} error={errors.heightCm?.message}>
              <input
                id="bk-h"
                type="number"
                inputMode="numeric"
                className="field"
                {...describedBy("bk-h", errors.heightCm?.message)}
                {...register("heightCm")}
              />
            </Field>
            <Field id="bk-w" label={t("weight")} error={errors.weightKg?.message}>
              <input
                id="bk-w"
                type="number"
                inputMode="numeric"
                className="field"
                {...describedBy("bk-w", errors.weightKg?.message)}
                {...register("weightKg")}
              />
            </Field>
          </div>
        </div>

        <Field id="bk-notes" label={t("notes")} optional error={errors.notes?.message}>
          <textarea
            id="bk-notes"
            rows={4}
            placeholder={t("notesPlaceholder")}
            className="field"
            {...register("notes")}
          />
        </Field>
      </Step>

      <div className="flex flex-col gap-[22px] border-t border-line pt-7">
        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3 text-[15px] text-lead">
            <input
              type="checkbox"
              className="mt-0.5 size-5 shrink-0 accent-navy-700"
              {...describedBy("bk-consent", errors.consent?.message)}
              {...register("consent")}
            />
            <span>
              {t.rich("consent", {
                link: (c) => (
                  <a href={contact.legal.privacyHref} className="underline">
                    {c}
                  </a>
                ),
              })}
            </span>
          </label>
          <FieldError id="bk-consent" error={errors.consent?.message} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
          <Button type="submit" size="xl" disabled={pending} className="max-md:w-full">
            {pending ? t("submitting") : t("submit")}
          </Button>
          <span className="text-[15px] text-muted">{t("submitNote")}</span>
        </div>
        <span className="sr-only">{tc("optional")}</span>
      </div>
    </form>
  );
}
