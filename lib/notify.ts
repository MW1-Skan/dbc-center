import "server-only";
import type { BookingData } from "./schemas/booking";
import type { CallbackData } from "./schemas/callback";
import type { RoomInquiryData } from "./schemas/rooms";
import { bookingEmail, callbackEmail, roomInquiryEmail } from "./email/templates";
import { sendClinicEmail } from "./email/resend";

/**
 * Single entry point for every form submission.
 * Add adapters here (database, WhatsApp Business API, CRM) without touching the forms.
 */
export type NotifyEvent =
  | { type: "booking"; data: BookingData }
  | { type: "callback"; data: CallbackData }
  | { type: "roomInquiry"; data: RoomInquiryData };

export interface NotifyAdapter {
  name: string;
  send(event: NotifyEvent): Promise<void>;
}

const emailAdapter: NotifyAdapter = {
  name: "email",
  async send(event) {
    switch (event.type) {
      case "booking":
        return sendClinicEmail({ ...bookingEmail(event.data), replyTo: event.data.email });
      case "callback":
        return sendClinicEmail(callbackEmail(event.data));
      case "roomInquiry":
        return sendClinicEmail({ ...roomInquiryEmail(event.data), replyTo: event.data.email });
    }
  },
};

const adapters: NotifyAdapter[] = [emailAdapter];

export async function notify(event: NotifyEvent): Promise<void> {
  await Promise.all(adapters.map((adapter) => adapter.send(event)));
}
