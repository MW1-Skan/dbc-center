"use client";

import { useTranslations } from "next-intl";
import { rooms, type Room, type RentableRoomId } from "@/content/rooms";
import { cn } from "@/lib/utils";
import { useRoomSelection } from "./RoomSelection";

function roomState(room: Room, isSelected: (id: RentableRoomId) => boolean) {
  if (!room.rentable) return "taken" as const;
  return isSelected(room.id as RentableRoomId) ? ("on" as const) : ("off" as const);
}

export function FloorPlan() {
  const t = useTranslations("RoomsPage.rooms");
  const { isSelected, toggle } = useRoomSelection();

  return (
    <div className="flex flex-col gap-4 rounded-panel border border-line bg-cloud p-5 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[13px] font-bold tracking-[.12em] text-muted uppercase">
          {t("planNote")}
        </span>
        <div className="flex flex-wrap gap-[18px] text-sm text-lead">
          <span className="flex items-center gap-2">
            <span className="size-3.5 rounded border-[1.5px] border-line-plan bg-white" />
            {t("legend.available")}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3.5 rounded bg-teal-500" />
            {t("legend.selected")}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3.5 rounded stripes-taken" />
            {t("legend.inUse")}
          </span>
        </div>
      </div>

      {/* Scrolls horizontally inside its own box on small screens */}
      <div className="-mx-5 flex flex-col gap-2.5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0">
        <div className="grid min-w-[860px] grid-cols-[repeat(5,minmax(120px,1fr))_minmax(180px,1.4fr)] gap-2.5">
          {rooms.map((room) => {
            const state = roomState(room, isSelected);
            const name = t("roomName", { number: room.number });
            const aria =
              state === "taken"
                ? t("ariaInUse", { name })
                : state === "on"
                  ? t("ariaSelected", { name })
                  : t("ariaAvailable", { name });
            return (
              <button
                key={room.id}
                type="button"
                disabled={state === "taken"}
                aria-pressed={state === "taken" ? undefined : state === "on"}
                aria-label={aria}
                onClick={() => room.rentable && toggle(room.id as RentableRoomId)}
                className={cn(
                  "duration-fast flex h-[150px] flex-col items-center justify-center gap-0.5 rounded-input transition-colors",
                  state === "taken" && "cursor-not-allowed text-plan-taken-text stripes-taken",
                  state === "on" && "bg-teal-500 text-white",
                  state === "off" &&
                    "border-[1.5px] border-line-plan bg-white text-navy-800 hover:border-teal-500",
                )}
              >
                <strong className="font-heading text-base font-bold">{name}</strong>
                <span className="text-[13px]">
                  {state === "taken"
                    ? t("status.inUseLong")
                    : state === "on"
                      ? t("status.selected")
                      : t("status.available")}
                </span>
              </button>
            );
          })}
          <div className="flex h-[150px] flex-col items-center justify-center rounded-input border-[1.5px] border-dashed border-[#9CC9CD] bg-chip text-teal-700">
            <strong className="font-heading text-base font-bold">{t("waitingArea")}</strong>
            <span className="text-[13px]">{t("shared")}</span>
          </div>
        </div>
        <div className="grid min-w-[860px] grid-cols-[5fr_1.4fr] gap-2.5">
          <div className="flex h-[54px] items-center justify-center rounded-input bg-fill-soft text-[13px] font-bold tracking-[.12em] text-muted uppercase">
            {t("corridor")}
          </div>
          <div className="flex h-[54px] items-center justify-center rounded-input bg-navy-800 text-sm font-bold text-white">
            {t("reception")}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoomCards() {
  const t = useTranslations("RoomsPage.rooms");
  const { isSelected, toggle } = useRoomSelection();

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-[18px]">
      {rooms.map((room) => {
        const state = roomState(room, isSelected);
        const name = t("roomName", { number: room.number });
        return (
          <article
            key={room.id}
            className={cn(
              "lift duration-fast flex flex-col overflow-hidden rounded-[22px] border-2 bg-white transition-[border-color,box-shadow]",
              state === "on" ? "border-teal-500 shadow-card-teal" : "border-line",
              state === "taken" && "opacity-85",
            )}
          >
            <div
              role="img"
              aria-label={t("photoAlt")}
              className="flex h-[150px] items-end p-3 stripes-light"
            >
              <span
                className={cn(
                  "duration-fast rounded-pill px-3 py-[5px] text-[13px] font-bold transition-colors",
                  state === "taken" && "bg-white text-muted",
                  state === "on" && "bg-teal-500 text-white",
                  state === "off" && "bg-white text-teal-700",
                )}
              >
                {state === "taken"
                  ? t("status.inUse")
                  : state === "on"
                    ? t("status.selected")
                    : t("status.available")}
              </span>
            </div>
            <div className="flex grow flex-col gap-2.5 p-5">
              <h3 className="text-xl">{name}</h3>
              <span className="text-[15px] text-muted">
                {room.rentable ? t("size") : t("ownSize")}
              </span>
              <span className="grow text-[15px] text-muted">
                {room.rentable ? t("features") : t("ownFeatures")}
              </span>
              {room.rentable ? (
                <button
                  type="button"
                  aria-pressed={state === "on"}
                  onClick={() => toggle(room.id as RentableRoomId)}
                  className={cn(
                    "press duration-fast h-[46px] rounded-pill text-[15px] font-semibold transition-colors",
                    state === "on"
                      ? "bg-teal-500 text-white"
                      : "border-[1.5px] border-outline bg-white text-navy-700 hover:border-teal-500",
                  )}
                >
                  {state === "on" ? t("selected") : t("select")}
                </button>
              ) : (
                <span className="flex h-[46px] items-center justify-center rounded-pill bg-fill-disabled text-[15px] font-semibold text-muted">
                  {t("notForRent")}
                </span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
