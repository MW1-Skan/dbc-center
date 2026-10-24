import "server-only";
import { Resend } from "resend";
import type { EmailContent } from "./templates";

const DEFAULT_FROM = "Delta Bariatric Center <onboarding@resend.dev>";

export type SendOptions = EmailContent & { replyTo?: string };

/**
 * Sends one notification email to the clinic inbox.
 * Throws when the email service is not configured in production so the caller
 * can show a friendly error instead of silently dropping a request.
 */
export async function sendClinicEmail({
  subject,
  text,
  html,
  replyTo,
}: SendOptions): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CLINIC_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      // Never log the payload: it contains health data.
      console.info(
        `[notify] Email not configured (RESEND_API_KEY / CLINIC_EMAIL). Skipped: "${subject}"`,
      );
      return;
    }
    throw new Error("Email notifications are not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.NOTIFY_FROM_EMAIL || DEFAULT_FROM,
    to,
    subject,
    text,
    html,
    replyTo,
  });
  if (error) throw new Error(`Resend: ${error.name}`);
}
