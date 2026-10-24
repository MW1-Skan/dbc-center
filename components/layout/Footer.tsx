import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contact } from "@/content/contact";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const year = 2026;

/** Full footer used on the home page. Columns collapse to the mobile layout below 768px. */
export function Footer() {
  const t = useTranslations("Footer");
  const linkClass = "text-on-navy-muted no-underline hover:text-white";
  const heading =
    "mb-1 hidden text-[13px] font-bold tracking-eyebrow uppercase text-white md:block";

  return (
    <footer className="bg-navy-900 text-[15px] text-on-navy-muted">
      <div className="container-x flex flex-col gap-[26px] pt-11 pb-[120px] md:gap-14 md:pt-20 md:pb-10">
        <div className="flex flex-col gap-[26px] md:grid md:grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] md:gap-10">
          <div className="flex flex-col gap-[18px]">
            <Logo tone="white" size="responsive" asLink={false} />
            <p className="hidden max-w-[260px] md:block">{t("tagline")}</p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className={heading}>{t("visit")}</h3>
            <span>
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br className="hidden md:inline" />
              <span className="md:hidden">, </span>
              {contact.address.city}, {contact.address.country}
            </span>
            <span>{contact.hours}</span>
            <a
              href={contact.mapsHref}
              className="hidden font-semibold text-teal-200 no-underline hover:text-white md:inline"
            >
              {t("openInMaps")}
            </a>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <h3 className={heading}>{t("contact")}</h3>
            <a
              href={contact.phoneHref}
              dir="ltr"
              className="self-start font-semibold text-white no-underline hover:text-white md:font-normal md:text-on-navy-muted"
            >
              {contact.phoneDisplay}
            </a>
            <a href={contact.whatsappHref} className={cn(linkClass, "hidden md:inline")}>
              {t("whatsapp")}
            </a>
            <a href={contact.emailHref} className={linkClass}>
              {contact.email}
            </a>
          </div>

          <div className="hidden flex-col gap-3 md:flex">
            <h3 className={heading}>{t("explore")}</h3>
            <Link href="/#procedures" className={linkClass}>
              {t("procedures")}
            </Link>
            <Link href="/book" className={linkClass}>
              {t("book")}
            </Link>
            <Link href="/rooms" className={linkClass}>
              {t("rooms")}
            </Link>
            <Link href="/#advice" className={linkClass}>
              {t("advice")}
            </Link>
          </div>

          <div className="flex flex-row gap-5 md:flex-col md:gap-3">
            <h3 className={heading}>{t("follow")}</h3>
            {contact.social.map((s) => (
              <a key={s.id} href={s.href} className={cn(linkClass, "underline md:no-underline")}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 text-[13px] text-on-navy-faint md:border-t md:border-on-navy-muted/18 md:pt-7 md:text-sm">
          <span className="md:hidden">{t("copyrightShort", { year })}</span>
          <span className="hidden md:inline">{t("copyright", { year })}</span>
          <div className="hidden gap-6 md:flex">
            <a href={contact.legal.privacyHref} className="text-on-navy-faint hover:text-white">
              {t("privacy")}
            </a>
            <a
              href={contact.legal.medicalDisclaimerHref}
              className="text-on-navy-faint hover:text-white"
            >
              {t("medicalDisclaimer")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Compact footer used on the booking and rooms pages. */
export function FooterSlim({ legal }: { legal: "medical" | "rental" }) {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-navy-900 text-sm text-on-navy-faint">
      <div className="container-x flex flex-wrap items-center justify-between gap-4 py-8 pb-[110px] md:pb-8">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-mark-white.png"
            alt=""
            width={32}
            height={32}
            className="size-8 object-contain"
            loading="lazy"
          />
          <span>{t("copyrightShort", { year })}</span>
        </div>
        <div className="flex gap-6">
          <a href={contact.legal.privacyHref} className="text-on-navy-faint hover:text-white">
            {t("privacy")}
          </a>
          <a
            href={
              legal === "medical"
                ? contact.legal.medicalDisclaimerHref
                : contact.legal.rentalTermsHref
            }
            className="text-on-navy-faint hover:text-white"
          >
            {legal === "medical" ? t("medicalDisclaimer") : t("rentalTerms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
