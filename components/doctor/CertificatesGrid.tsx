"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ChevronIcon, CloseIcon } from "@/components/ui/icons";

export type CertificateCardItem = {
  id: string;
  src: string;
  caption: string;
  counter: string;
};

type Props = {
  items: CertificateCardItem[];
  labels: {
    zoomHint: string;
    close: string;
    previous: string;
    next: string;
  };
};

export function CertificatesGrid({ items, labels }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerIndexRef = useRef<number | null>(null);

  const open = (index: number) => {
    openerIndexRef.current = index;
    setActiveIndex(index);
  };

  const close = useCallback(() => {
    const returnTo = openerIndexRef.current;
    setActiveIndex(null);
    if (returnTo !== null) {
      requestAnimationFrame(() => btnRefs.current[returnTo]?.focus());
    }
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((cur) => (cur === null ? null : (cur - 1 + items.length) % items.length));
  }, [items.length]);

  const next = useCallback(() => {
    setActiveIndex((cur) => (cur === null ? null : (cur + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      const isRtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRtl) prev();
        else next();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRtl) next();
        else prev();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeIndex, close, next, prev]);

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
        {items.map((item, i) => (
          <Reveal
            key={item.id}
            as="figure"
            delay={Math.min(i, 7) * 0.05}
            className="group lift flex flex-col overflow-hidden rounded-card-lg border border-line bg-white"
          >
            <button
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              aria-label={`${item.caption} — ${labels.zoomHint}`}
              className="flex h-full w-full cursor-pointer flex-col text-start"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line-faint bg-cloud">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="pointer-events-none absolute end-3 bottom-3 rounded-pill border border-line bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-navy-700 opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {labels.zoomHint}
                </span>
              </div>
              <figcaption className="p-5 text-[15px] leading-[1.4] font-semibold text-navy-800">
                {item.caption}
              </figcaption>
            </button>
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fade-in fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-900/85 p-4 backdrop-blur-xs md:p-8"
          onClick={close}
        >
          <div
            className="flex w-full max-w-[1040px] flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 rounded-pill bg-white/15 px-3 py-1 font-heading text-xs font-semibold tabular-nums">
                  {active.counter}
                </span>
                <span className="truncate text-sm font-medium text-on-navy-light md:text-base">
                  {active.caption}
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                aria-label={labels.close}
                className="press flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="relative flex items-center justify-center gap-2 md:gap-4">
              <button
                type="button"
                onClick={prev}
                aria-label={labels.previous}
                className="press hidden size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:flex"
              >
                <ChevronIcon size={22} className="-scale-x-100 rtl:scale-x-100" />
              </button>

              <div className="flex max-h-[76dvh] w-full items-center justify-center overflow-hidden rounded-card bg-white p-2 shadow-2xl md:p-4">
                <Image
                  src={active.src}
                  alt={active.caption}
                  width={1400}
                  height={1400}
                  style={{ width: "auto", height: "auto" }}
                  className="max-h-[72dvh] max-w-full rounded-lg object-contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={next}
                aria-label={labels.next}
                className="press hidden size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 md:flex"
              >
                <ChevronIcon size={22} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 md:hidden">
              <button
                type="button"
                onClick={prev}
                aria-label={labels.previous}
                className="press flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <ChevronIcon size={22} className="-scale-x-100 rtl:scale-x-100" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={labels.next}
                className="press flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                <ChevronIcon size={22} />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
