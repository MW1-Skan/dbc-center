import { z } from "zod";
import { daySlots, rentableRoomIds, rentalTypes, weekDays } from "@/content/rooms";
import {
  honeypotSchema,
  isoDateSchema,
  nameSchema,
  notesSchema,
  phoneSchema,
  requiredEmailSchema,
  countryCodeSchema,
} from "./common";

export const roomInquirySchema = z.object({
  /** Only rooms 2–5 can be selected; Room 1 is rejected by the enum. */
  rooms: z.array(z.enum(rentableRoomIds)).max(4),
  organization: nameSchema,
  specialty: z.string().trim().min(2, "required").max(120, "required"),
  countryCode: countryCodeSchema,
  phone: phoneSchema,
  email: requiredEmailSchema,
  rentalType: z.enum(rentalTypes),
  startDate: isoDateSchema,
  days: z.array(z.enum(weekDays)).max(7),
  slot: z.enum(daySlots),
  message: notesSchema,
  website: honeypotSchema,
});

export type RoomInquiryInput = z.input<typeof roomInquirySchema>;
export type RoomInquiryData = z.output<typeof roomInquirySchema>;
