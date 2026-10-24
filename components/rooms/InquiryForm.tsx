"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { daySlots, rentalTypes, weekDays } from "@/content/rooms";
import { submitRoomInquiry, type ActionResult } from "@/lib/actions";
import type { RoomInquiryInput } from "@/lib/schemas/rooms";
import { lazyResolver } from "@/lib/forms/lazy-resolver";
import { Field, describedBy } from "@/components/forms/Field";
import { FormAlert } from "@/components/forms/FormAlert";
import { Honeypot } from "@/components/forms/Honeypot";
import { PhoneField } from "@/components/forms/PhoneField";
import { Chip } from "@/components/forms/Chip";
import { SuccessPanel } from "@/components/forms/SuccessPanel";
import { Button } from "@/components/ui/Button";
import { useRoomSelection } from "./RoomSelection";

export function InquiryForm() {
  const t = useTranslations("RoomsPage.inquiry");
  const { selected } = useRoomSelection();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RoomInquiryInput>({
    resolver: lazyResolver<RoomInquiryInput>(() =>
      import("@/lib/forms/rooms-resolver").then((m) => m.default),
    ),
    defaultValues: {
      rooms: [],
      organization: "",
      specialty: "",
      countryCode: "+20",
      phone: "",
      email: "",
      rentalType: "monthly",
      startDate: "",
      days: [],
      slot: "morning",
      message: "",
      website: "",
    },
  });

  // Keep the selected rooms (chosen above the form) inside the submitted values.
  useEffect(() => {
    setValue("rooms", selected);
  }, [selected, setValue]);

  const days = useWatch({ control, name: "days" }) ?? [];
  const countryCode = useWatch({ control, name: "countryCode" });
  const slot = useWatch({ control, name: "slot" });

  const toggleDay = (d: (typeof weekDays)[number]) =>
    setValue("days", days.includes(d) ? days.filter((x) => x !== d) : [...days, d], {
      shouldValidate: true,
    });

  const onSubmit = handleSubmit((values) => {
    setResult(null);
    startTransition(async () => {
      setResult(await submitRoomInquiry(values));
    });
  });

  if (result?.ok) {
    return (
      <SuccessPanel
        as="h3"
        title={t("success.title")}
        body={t("success.body")}
        actions={
          <Button variant="outline" className="h-[54px] px-6" onClick={() => setResult(null)}>
            {t("success.edit")}
          </Button>
        }
      />
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative flex min-w-0 flex-col gap-[22px] rounded-panel border border-line bg-white p-6 md:p-11"
    >
      <Honeypot registration={register("website")} />
      <FormAlert result={result && !result.ok ? result : null} />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
        <Field id="rq-org" label={t("org")} error={errors.organization?.message}>
          <input
            id="rq-org"
            type="text"
            autoComplete="organization"
            className="field"
            {...describedBy("rq-org", errors.organization?.message)}
            {...register("organization")}
          />
        </Field>
        <Field id="rq-spec" label={t("specialty")} error={errors.specialty?.message}>
          <input
            id="rq-spec"
            type="text"
            placeholder={t("specialtyPlaceholder")}
            className="field"
            {...describedBy("rq-spec", errors.specialty?.message)}
            {...register("specialty")}
          />
        </Field>
        <PhoneField
          id="rq-phone"
          label={t("phone")}
          error={errors.phone?.message ?? errors.countryCode?.message}
          code={countryCode}
          codeRegistration={register("countryCode")}
          phoneRegistration={register("phone")}
        />
        <Field id="rq-email" label={t("email")} error={errors.email?.message}>
          <input
            id="rq-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className="field"
            {...describedBy("rq-email", errors.email?.message)}
            {...register("email")}
          />
        </Field>
        <Field id="rq-plan" label={t("rentalType")} error={errors.rentalType?.message}>
          <select id="rq-plan" className="field" {...register("rentalType")}>
            {rentalTypes.map((r) => (
              <option key={r} value={r}>
                {t(`rentalTypes.${r}`)}
              </option>
            ))}
          </select>
        </Field>
        <Field id="rq-start" label={t("startDate")} error={errors.startDate?.message}>
          <input
            id="rq-start"
            type="date"
            className="field"
            {...describedBy("rq-start", errors.startDate?.message)}
            {...register("startDate")}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-2.5">
        <span id="days-label" className="text-[15px] font-semibold">
          {t("days")}
        </span>
        <div role="group" aria-labelledby="days-label" className="flex flex-wrap gap-2.5">
          {weekDays.map((d) => (
            <Chip
              key={d}
              pressed={days.includes(d)}
              onClick={() => toggleDay(d)}
              className="min-w-16 justify-center"
            >
              {t(`dayNames.${d}`)}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span id="slot-label" className="text-[15px] font-semibold">
          {t("slot")}
        </span>
        <div role="group" aria-labelledby="slot-label" className="flex flex-wrap gap-2.5">
          {daySlots.map((s) => (
            <Chip
              key={s}
              pressed={slot === s}
              onClick={() => setValue("slot", s, { shouldValidate: true })}
              className="min-w-16 justify-center"
            >
              {t(`slots.${s}`)}
            </Chip>
          ))}
        </div>
      </div>

      <Field id="rq-msg" label={t("message")} optional error={errors.message?.message}>
        <textarea
          id="rq-msg"
          rows={3}
          placeholder={t("messagePlaceholder")}
          className="field"
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-4 pt-2 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
        <Button type="submit" size="xl" disabled={pending} className="max-md:w-full">
          {pending ? t("submitting") : t("submit")}
        </Button>
        <span className="text-[15px] text-muted">{t("submitNote")}</span>
      </div>
    </form>
  );
}
