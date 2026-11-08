"use client";

import { useTranslations } from "next-intl";
import { useId, useState, useSyncExternalStore } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LanguageButton } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";

export type NavItem = {
  key: "doctor" | "procedures" | "team" | "stories" | "advice" | "rooms";
  href: string;
};

export const navItems: NavItem[] = [
  { key: "doctor", href: "/#doctor" },
  { key: "procedures", href: "/#procedures" },
  { key: "team", href: "/#team" },
  { key: "stories", href: "/#stories" },
  { key: "advice", href: "/#advice" },
  { key: "rooms", href: "/rooms" },
];

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 24;
/** Threshold after which the home page offers a back-to-top control. */
const getScrolledFar = () => window.scrollY > 480;

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, () => false);
  const scrolledFar = useSyncExternalStore(subscribeScroll, getScrolledFar, () => false);
  const tc = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const onHome = pathname === "/";
  const onRooms = pathname === "/rooms";
  const onBook = pathname === "/book";

  return (
    <header
      className={cn(
        "duration-base sticky top-0 z-40 border-b border-line bg-white transition-shadow ease-out",
        scrolled && "shadow-header",
      )}
      data-scrolled={scrolled || undefined}
    >
      <div className="container-x flex items-center justify-between gap-4 py-3.5 md:py-[18px] xl:gap-6">
        <div
          className={cn(
            "duration-base origin-[left_center] transition-transform ease-out rtl:origin-[right_center]",
            scrolled && "scale-[.92]",
          )}
        >
          <Logo size="responsive" />
        </div>

        <nav
          aria-label={t("mainLabel")}
          className="hidden items-center gap-4 text-[15px] font-medium lg:flex xl:gap-8 xl:text-base"
        >
          {navItems.map((item) => {
            const current = item.key === "rooms" && onRooms;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "link-grow whitespace-nowrap no-underline",
                  current
                    ? "border-b-2 border-teal-500 pb-0.5 font-bold text-navy-700"
                    : "text-body hover:text-navy-700",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            href="/book"
            size="sm"
            variant={onBook ? "tint" : "primary"}
            aria-current={onBook ? "page" : undefined}
            className="max-lg:hidden"
          >
            {t("book")}
          </Button>
          <LanguageButton className="md:hidden" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            aria-controls={menuId}
            className="press flex size-11 items-center justify-center rounded-xl border border-line-soft bg-white text-navy-700 md:size-12 lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <MobileMenu id={menuId} open={open} onClose={() => setOpen(false)} />

      {/* Slot under the bar at the start edge: "Home" away from the home page, "Back to top" on it. */}
      {!onHome ? (
        <Link
          href="/"
          aria-label={t("backHomeLabel")}
          className="press fade-in absolute start-5 top-full mt-3 inline-flex h-10 items-center gap-2 rounded-pill border border-line bg-white/95 ps-3 pe-4 text-sm font-semibold text-navy-700 no-underline shadow-header backdrop-blur-sm hover:text-navy-800 md:start-8"
          data-testid="back-home"
        >
          <ArrowIcon size={16} className="-scale-x-100 rtl:scale-x-100" />
          {t("backHome")}
        </Link>
      ) : scrolledFar ? (
        <button
          type="button"
          aria-label={tc("backToTop")}
          onClick={() => window.scrollTo({ top: 0 })}
          className="press fade-in absolute start-5 top-full mt-3 flex size-10 items-center justify-center rounded-full border border-line bg-white/95 text-navy-700 shadow-header backdrop-blur-sm hover:text-navy-800 md:start-8"
          data-testid="back-to-top"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </button>
      ) : null}
    </header>
  );
}
