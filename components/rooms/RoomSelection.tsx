"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { RentableRoomId } from "@/content/rooms";

type Ctx = {
  selected: RentableRoomId[];
  isSelected: (id: RentableRoomId) => boolean;
  toggle: (id: RentableRoomId) => void;
};

const RoomSelectionContext = createContext<Ctx | null>(null);

/** Shared selection for the floor plan, the room cards and the inquiry form. */
export function RoomSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<RentableRoomId[]>([]);

  const toggle = useCallback((id: RentableRoomId) => {
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  }, []);

  const value = useMemo<Ctx>(
    () => ({ selected, toggle, isSelected: (id) => selected.includes(id) }),
    [selected, toggle],
  );

  return <RoomSelectionContext.Provider value={value}>{children}</RoomSelectionContext.Provider>;
}

export function useRoomSelection() {
  const ctx = useContext(RoomSelectionContext);
  if (!ctx) throw new Error("useRoomSelection must be used inside RoomSelectionProvider");
  return ctx;
}
