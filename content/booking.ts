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
