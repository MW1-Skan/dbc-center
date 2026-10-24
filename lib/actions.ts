"use server";

import { headers } from "next/headers";
import type { ZodType } from "zod";
import { notify, type NotifyEvent } from "./notify";
import { rateLimit } from "./rate-limit";
import { bookingSchema } from "./schemas/booking";
import { callbackSchema } from "./schemas/callback";
import { roomInquirySchema } from "./schemas/rooms";

export type ActionResult = { ok: true } | { ok: false; code: "invalid" | "rateLimited" | "failed" };

async function clientKey(form: string) {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || h.get("x-real-ip") || "local";
  return `${form}:${ip}`;
}

async function handle<T extends { website?: string }>(
  form: NotifyEvent["type"],
  schema: ZodType<T>,
  input: unknown,
  toEvent: (data: T) => NotifyEvent,
): Promise<ActionResult> {
  // 1. Validate on the server regardless of what the client did.
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, code: "invalid" };

  // 2. Honeypot: pretend success so bots learn nothing.
  if (parsed.data.website) return { ok: true };

  // 3. Per-IP rate limit.
  const { ok } = rateLimit(await clientKey(form));
  if (!ok) return { ok: false, code: "rateLimited" };

  // 4. Dispatch. Payloads are never logged.
  try {
    await notify(toEvent(parsed.data));
    return { ok: true };
  } catch (error) {
    console.error(
      `[notify] ${form} failed:`,
      error instanceof Error ? error.message : "unknown error",
    );
    return { ok: false, code: "failed" };
  }
}

export async function submitBooking(input: unknown): Promise<ActionResult> {
  return handle("booking", bookingSchema, input, (data) => ({ type: "booking", data }));
}

export async function submitCallback(input: unknown): Promise<ActionResult> {
  return handle("callback", callbackSchema, input, (data) => ({ type: "callback", data }));
}

export async function submitRoomInquiry(input: unknown): Promise<ActionResult> {
  return handle("roomInquiry", roomInquirySchema, input, (data) => ({ type: "roomInquiry", data }));
}
