export type Room = {
  id: "r1" | "r2" | "r3" | "r4" | "r5";
  number: 1 | 2 | 3 | 4 | 5;
  /** Room 1 is the clinic's own consultation room and is never rentable. */
  rentable: boolean;
};

export const rooms: readonly Room[] = [
  { id: "r1", number: 1, rentable: false },
  { id: "r2", number: 2, rentable: true },
  { id: "r3", number: 3, rentable: true },
  { id: "r4", number: 4, rentable: true },
  { id: "r5", number: 5, rentable: true },
] as const;

export type RoomId = Room["id"];
export type RentableRoomId = Exclude<RoomId, "r1">;

export const rentableRoomIds = rooms.filter((r) => r.rentable).map((r) => r.id) as [
  RentableRoomId,
  ...RentableRoomId[],
];

export const rentalTypes = ["monthly", "fullDay", "halfDay", "unsure"] as const;
export type RentalType = (typeof rentalTypes)[number];

export const weekDays = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
export type WeekDay = (typeof weekDays)[number];

export const daySlots = ["morning", "afternoon", "evening", "full"] as const;
export type DaySlot = (typeof daySlots)[number];

export const pricingTiers = ["halfDay", "fullDay", "monthly"] as const;
export const includedFeatures = [
  "furnished",
  "reception",
  "waiting",
  "utilities",
  "cleaning",
  "location",
] as const;
