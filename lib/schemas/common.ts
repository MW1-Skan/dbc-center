import { z } from "zod";
import { countryCodeValues } from "@/content/booking";

/** Error messages are i18n keys under the `Forms` namespace, translated in the UI. */
export const nameSchema = z.string().trim().min(2, "name").max(120, "name");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "required")
  .refine((v) => /^[+\d][\d\s().-]{6,19}$/.test(v) && v.replace(/\D/g, "").length >= 8, "phone");

const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

/** Optional email: blank input becomes undefined, anything else must be a valid address. */
export const countryCodeSchema = z.enum(countryCodeValues);

/** Full number for emails: "+20 1XX…" or the free-text value when "other" was chosen. */
export function formatPhone(countryCode: string, phone: string) {
  return countryCode === "other" ? phone : `${countryCode} ${phone}`;
}

export const optionalEmailSchema = z.preprocess(
  blankToUndefined,
  z.email("email").max(254, "email").optional(),
);

export const requiredEmailSchema = z
  .string()
  .trim()
  .min(1, "required")
  .max(254, "email")
  .pipe(z.email("email"));

export const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "date")
  .refine((v) => !Number.isNaN(Date.parse(v)), "date");

export const optionalIsoDateSchema = z.preprocess(blankToUndefined, isoDateSchema.optional());

/** Numeric input that may be left empty (comes from <input type="number">). */
export function optionalNumber(min: number, max: number, message = "number") {
  return z.preprocess(
    (v) => (v === "" || v === null || v === undefined || Number.isNaN(v) ? undefined : Number(v)),
    z.number().min(min, message).max(max, message).optional(),
  );
}

export function requiredNumber(min: number, max: number, message = "number") {
  return z.preprocess(
    (v) => (v === "" || v === null || v === undefined || Number.isNaN(v) ? undefined : Number(v)),
    z.number({ error: message }).min(min, message).max(max, message),
  );
}

export const notesSchema = z.string().trim().max(2000, "required").optional();

/** Honeypot: must stay empty. Bots that fill it get a silent "success". */
export const honeypotSchema = z.string().max(0).optional();
