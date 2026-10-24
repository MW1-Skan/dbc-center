import { z } from "zod";
import { bookingDepartments, procedureInterest, timesOfDay, visitReasons } from "@/content/booking";
import {
  honeypotSchema,
  isoDateSchema,
  nameSchema,
  notesSchema,
  optionalEmailSchema,
  optionalIsoDateSchema,
  optionalNumber,
  phoneSchema,
  requiredNumber,
  countryCodeSchema,
} from "./common";

export const bookingSchema = z.object({
  reason: z.enum(visitReasons),
  department: z.enum(bookingDepartments),
  procedure: z.enum(procedureInterest),
  preferredDate: isoDateSchema,
  secondDate: optionalIsoDateSchema,
  timeOfDay: z.enum(timesOfDay),
  name: nameSchema,
  countryCode: countryCodeSchema,
  phone: phoneSchema,
  email: optionalEmailSchema,
  age: requiredNumber(12, 99, "age"),
  heightCm: optionalNumber(100, 250),
  weightKg: optionalNumber(30, 400),
  notes: notesSchema,
  consent: z.literal(true, { error: "consent" }),
  website: honeypotSchema,
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;
