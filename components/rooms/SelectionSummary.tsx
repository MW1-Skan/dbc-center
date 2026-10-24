"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import type { RentableRoomId } from "@/content/rooms";
import { useRoomSelection } from "./RoomSelection";

const EXIT_MS = 180;

type ChipState = { id: RentableRoomId; leaving: boolean };

/**
 * "Your selection" card. Chips animate in with a CSS keyframe and out by staying
 * mounted for 180ms with `data-leaving` while the exit keyframe plays.
 */
export function SelectionSummary() {
  const t = useTranslations("RoomsPage");
  const { selected } = useRoomSelection();
  const [chips, setChips] = useState<ChipState[]>(() =>
    selected.map((id) => ({ id, leaving: false })),
  );
  const timers = useRef(new Map<RentableRoomId, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const pending = timers.current;
    setChips((current) => {
      const next: ChipState[] = [];
      for (const chip of current) {
        const stillSelected = selected.includes(chip.id);
        if (stillSelected) {
          if (chip.leaving) {
            clearTimeout(pending.get(chip.id));
            pending.delete(chip.id);
          }
          next.push({ id: chip.id, leaving: false });
        } else if (!chip.leaving) {
          next.push({ id: chip.id, leaving: true });
          pending.set(
            chip.id,
            setTimeout(() => {
              pending.delete(chip.id);
              setChips((c) => c.filter((x) => x.id !== chip.id));
            }, EXIT_MS),
          );
        } else {
          next.push(chip);
        }
      }
      for (const id of selected)
        if (!next.some((c) => c.id === id)) next.push({ id, leaving: false });
      return next.sort((a, b) => a.id.localeCompare(b.id));
    });
  }, [selected]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  const visible = chips.filter((c) => !c.leaving);

  return (
    <div className="flex flex-col gap-3.5 rounded-[22px] border border-line bg-white p-6">
      <span className="text-[13px] font-bold tracking-[.12em] text-muted uppercase">
        {t("inquiry.selectionTitle")}
      </span>
      {chips.length > 0 ? (
        <div className="flex flex-wrap gap-2" aria-live="polite">
          {chips.map((chip) => (
            <span
              key={chip.id}
              data-leaving={chip.leaving || undefined}
              className="chip-enter rounded-pill bg-teal-500 px-3.5 py-1.5 text-[15px] font-semibold text-white"
            >
              {t("rooms.roomName", { number: Number(chip.id.slice(1)) })}
            </span>
          ))}
        </div>
      ) : null}
      {visible.length === 0 ? (
        <span className="fade-in text-[15px] text-muted" aria-live="polite">
          {t.rich("inquiry.noSelection", {
            link: (c) => (
              <a href="#rooms" className="underline">
                {c}
              </a>
            ),
          })}
        </span>
      ) : null}
    </div>
  );
}
