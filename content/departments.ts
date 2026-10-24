export const departmentIds = [
  "bariatricSurgery",
  "bariatricMedicine",
  "clinicalNutrition",
  "psychology",
  "physiotherapy",
  "plasticSurgery",
  "dermatology",
] as const;

export type DepartmentId = (typeof departmentIds)[number];
