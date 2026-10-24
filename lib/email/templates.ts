import en from "@/messages/en.json";
import type { BookingData } from "@/lib/schemas/booking";
import type { CallbackData } from "@/lib/schemas/callback";
import type { RoomInquiryData } from "@/lib/schemas/rooms";

type Row = [label: string, value: string | undefined];

export type EmailContent = { subject: string; text: string; html: string };

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

function render(title: string, intro: string, rows: Row[]): Omit<EmailContent, "subject"> {
  const present = rows.filter((r): r is [string, string] => Boolean(r[1] && r[1].trim()));
  const text = [title, "", intro, "", ...present.map(([l, v]) => `${l}: ${v}`)].join("\n");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F6F9FA;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#23364A">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E2EBEF;border-radius:20px">
<tr><td style="padding:28px 32px 8px"><h1 style="margin:0;font-size:22px;color:#0A2E55">${escape(title)}</h1><p style="margin:8px 0 0;color:#4F6175;font-size:15px">${escape(intro)}</p></td></tr>
<tr><td style="padding:16px 32px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px">
${present
  .map(
    ([l, v]) =>
      `<tr><td style="padding:10px 0;border-top:1px solid #EEF3F5;color:#4F6175;width:40%;vertical-align:top">${escape(l)}</td><td style="padding:10px 0;border-top:1px solid #EEF3F5;color:#23364A;white-space:pre-wrap">${escape(v)}</td></tr>`,
  )
  .join("")}
</table></td></tr></table></body></html>`;
  return { text, html };
}

const bmi = (h?: number, w?: number) => (h && w ? (w / (h / 100) ** 2).toFixed(1) : undefined);

export function bookingEmail(d: BookingData): EmailContent {
  const b = en.BookPage;
  const rows: Row[] = [
    ["Visit reason", b.reasons[d.reason].title],
    ["Department", b.departments[d.department]],
    ["Procedure of interest", b.procedures[d.procedure]],
    ["Preferred date", d.preferredDate],
    ["Second choice", d.secondDate],
    ["Time of day", `${b.times[d.timeOfDay].label} ${b.times[d.timeOfDay].hours}`],
    ["Full name", d.name],
    ["Phone / WhatsApp", d.phone],
    ["Email", d.email],
    ["Age", String(d.age)],
    ["Height (cm)", d.heightCm ? String(d.heightCm) : undefined],
    ["Weight (kg)", d.weightKg ? String(d.weightKg) : undefined],
    ["Estimated BMI", bmi(d.heightCm, d.weightKg)],
    ["Notes", d.notes],
  ];
  return {
    subject: `New appointment request — ${d.name} (${b.reasons[d.reason].title})`,
    ...render(
      "New appointment request",
      "Submitted through the booking page. Please call or WhatsApp the patient to confirm a time.",
      rows,
    ),
  };
}

export function callbackEmail(d: CallbackData): EmailContent {
  const c = en.Callback;
  const rows: Row[] = [
    ["Full name", d.name],
    ["Phone / WhatsApp", d.phone],
    ["Interested in", c.interestOptions[d.interest]],
  ];
  return {
    subject: `Call-back request — ${d.name}`,
    ...render(
      "Call-back request",
      "Submitted through the home page. Please call the patient back.",
      rows,
    ),
  };
}

export function roomInquiryEmail(d: RoomInquiryData): EmailContent {
  const r = en.RoomsPage;
  const roomNames = d.rooms.map((id) => `Room ${id.slice(1)}`).join(", ");
  const rows: Row[] = [
    ["Rooms", roomNames || "No preference"],
    ["Doctor or organization", d.organization],
    ["Specialty", d.specialty],
    ["Phone / WhatsApp", d.phone],
    ["Email", d.email],
    ["Rental type", r.inquiry.rentalTypes[d.rentalType]],
    ["Start date", d.startDate],
    ["Days", d.days.map((day) => r.inquiry.dayNames[day]).join(", ") || undefined],
    ["Part of the day", r.inquiry.slots[d.slot]],
    ["Message", d.message],
  ];
  return {
    subject: `Room rental inquiry — ${d.organization}`,
    ...render(
      "Room rental inquiry",
      "Submitted through the room rental page. Please reply with availability and a quote.",
      rows,
    ),
  };
}
