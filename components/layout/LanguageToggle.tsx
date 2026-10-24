"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<Locale, string> = { en: "EN", ar: "عربي" };

/** Pill toggle in the top bar: the white active pill slides between EN and عربي. */
export function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const isAr = locale === "ar";

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn("relative grid grid-cols-2 gap-0.5 rounded-pill bg-white/8 p-[3px]", className)}
      data-pending={pending || undefined}
    >
      <span
        aria-hidden
        className={cn(
          "duration-base absolute inset-y-[3px] start-[3px] w-[calc(50%-4px)] rounded-pill bg-white transition-transform ease-out",
          isAr ? "translate-x-[calc(100%+2px)] rtl:-translate-x-[calc(100%+2px)]" : "translate-x-0",
        )}
      />
      {(["en", "ar"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => switchTo(code)}
          aria-pressed={locale === code}
          lang={code}
          className={cn(
            "duration-base relative z-10 min-h-[30px] rounded-pill px-3 text-[13px] font-bold transition-colors",
            locale === code ? "text-navy-800" : "text-on-navy-light hover:text-white",
          )}
        >
          {labels[code]}
        </button>
      ))}
    </div>
  );
}

/** Compact single button used in the mobile header. */
export function LanguageButton({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Common");
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const next: Locale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      lang={next}
      aria-label={`${labels[next]} · ${next === "ar" ? t("switchToArabic") : t("switchToEnglish")}`}
      onClick={() => startTransition(() => router.replace(pathname, { locale: next }))}
      className={cn(
        "press h-11 rounded-xl border border-line-soft bg-white px-3 text-[15px] font-bold text-navy-700",
        className,
      )}
    >
      {labels[next]}
    </button>
  );
}
