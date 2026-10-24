"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { navItems } from "./Header";

type Props = { id: string; open: boolean; onClose: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Focusable, visible elements inside the panel, in DOM order. */
function focusables(panel: HTMLElement) {
  return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.tabIndex >= 0 && el.getClientRects().length > 0,
  );
}

/**
 * Drawer under the header for viewports below 1024px.
 * Traps focus, closes on Escape, restores focus to the trigger and locks body scroll.
 */
export function MobileMenu({ id, open, onClose }: Props) {
  const t = useTranslations("Nav");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (panel) focusables(panel)[0]?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = focusables(panel);
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("mobileLabel")}
      className="fade-in absolute inset-x-0 top-full max-h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-white shadow-header lg:hidden"
      style={{ animation: "menu-in 220ms var(--ease-out-soft) both" }}
    >
      <style>{`@keyframes menu-in{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}`}</style>
      <nav
        aria-label={t("mobileLabel")}
        className="container-x flex flex-col gap-1 pt-2 pb-5 md:pb-6"
      >
        {navItems
          .filter((item) => item.key !== "advice")
          .map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              className="py-3 text-lg font-semibold text-navy-700 no-underline md:text-[17px]"
            >
              {t(item.key)}
            </Link>
          ))}
        <Button href="/book" size="sm" className="mt-2 max-md:hidden" onClick={onClose}>
          {t("book")}
        </Button>
      </nav>
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className="fixed inset-0 -z-10 cursor-default bg-navy-900/30"
        onClick={onClose}
      />
    </div>
  );
}
