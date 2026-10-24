"use client";

import { useTranslations } from "next-intl";
import { useId, useState, useSyncExternalStore } from "react";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
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

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, () => false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

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
      <div className="container-x flex items-center justify-between gap-6 py-3.5 md:py-[18px]">
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
          className="hidden items-center gap-8 text-base font-medium lg:flex"
        >
          {navItems.map((item) => {
            const current = item.key === "rooms" && onRooms;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "link-grow no-underline",
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
    </header>
  );
}
