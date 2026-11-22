/**
 * Every contact fact lives here once and is rendered everywhere from this file.
 * Values in [square brackets] are placeholders we do not have yet (see PLACEHOLDERS.md).
 */
export const contact = {
  name: "Delta Clinics",
  shortName: "Delta Clinics",
  bariatricDivision: "Delta Bariatric Center",
  phoneDisplay: "+20 104 476 4787",
  phoneHref: "tel:+201044764787",
  whatsappHref: "https://wa.me/201044764787",
  email: "karam966g@gmail.com",
  emailHref: "mailto:karam966g@gmail.com",
  address: {
    line1: "713 Al Horreya Road",
    line2: "Delta Building, Louran",
    city: "Alexandria",
    country: "Egypt",
  },
  /** Opening hours live in `messages/*.json` under `Contact.hours` for localization. */
  /** Placeholder links until the clinic provides the real URLs. */
  mapsHref: "#",
  social: [
    { id: "facebook", label: "Facebook", href: "#" },
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "tiktok", label: "TikTok", href: "#" },
  ],
  legal: {
    privacyHref: "#",
    medicalDisclaimerHref: "#",
    rentalTermsHref: "#",
  },
  /** Placeholder emergency line referenced on the booking page. */
  emergencyLine: "[emergency line]",
  geo: { city: "Alexandria", country: "EG" },
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);
