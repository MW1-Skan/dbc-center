export const visitReasons = ["first", "follow", "second", "support"] as const;
export type VisitReason = (typeof visitReasons)[number];

export const timesOfDay = ["morning", "afternoon", "evening"] as const;
export type TimeOfDay = (typeof timesOfDay)[number];

/** Booking departments: the seven departments, with bariatric surgery first. */
export { departmentIds as bookingDepartments } from "./departments";

export const procedureInterest = ["unsure", "sleeve", "bypass", "plication", "balloon"] as const;
export type ProcedureInterest = (typeof procedureInterest)[number];

export const callbackInterest = [
  "unsure",
  "sleeve",
  "bypass",
  "plication",
  "balloon",
  "followUp",
] as const;
export type CallbackInterest = (typeof callbackInterest)[number];

/** Dialling codes offered on every phone field: Egypt first, then the Gulf, then free text. */
export const countryCodes = [
  { value: "+20", label: "🇪🇬 +20" },
  { value: "+966", label: "🇸🇦 +966" },
  { value: "+971", label: "🇦🇪 +971" },
  { value: "+965", label: "🇰🇼 +965" },
  { value: "+974", label: "🇶🇦 +974" },
  { value: "+973", label: "🇧🇭 +973" },
  { value: "+968", label: "🇴🇲 +968" },
  { value: "other", label: "+ …" },
] as const;

export const countryCodeValues = countryCodes.map((c) => c.value) as [
  (typeof countryCodes)[number]["value"],
  ...(typeof countryCodes)[number]["value"][],
];
export type CountryCode = (typeof countryCodes)[number]["value"];
