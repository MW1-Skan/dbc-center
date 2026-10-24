/**
 * Every contact fact lives here once and is rendered everywhere from this file.
 * Values in [square brackets] are placeholders we do not have yet (see PLACEHOLDERS.md).
 */
export const contact = {
  name: "Delta Bariatric Center",
  shortName: "DBC",
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
    /** One-line form used in the top bar and aside cards. */
    inline: "713 Al Horreya Road, Delta Building, Louran, Alexandria",
  },
  /** Placeholder until the clinic confirms opening hours. */
  hours: "[Sat–Thu · 00:00–00:00]",
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
