import { z } from "zod";
import { callbackInterest } from "@/content/booking";
import { honeypotSchema, nameSchema, phoneSchema } from "./common";

export const callbackSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  interest: z.enum(callbackInterest),
  website: honeypotSchema,
});

export type CallbackInput = z.input<typeof callbackSchema>;
export type CallbackData = z.output<typeof callbackSchema>;
