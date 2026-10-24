import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contact } from "@/content/contact";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

/** Call / WhatsApp / Book bar pinned to the bottom of phone viewports. */
export function StickyActionBar() {
  const t = useTranslations("Sticky");
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_1fr_2fr] gap-2 border-t border-line bg-white/96 px-4 py-3 shadow-sticky backdrop-blur-sm md:hidden">
      <a
        href={contact.phoneHref}
        aria-label={t("call")}
        className="press flex h-[50px] items-center justify-center rounded-input border-[1.5px] border-line-input text-navy-700 hover:text-navy-700"
      >
        <PhoneIcon />
      </a>
      <a
        href={contact.whatsappHref}
        aria-label={t("whatsapp")}
        className="press flex h-[50px] items-center justify-center rounded-input border-[1.5px] border-line-input text-teal-600 hover:text-teal-600"
      >
        <WhatsAppIcon />
      </a>
      <Link
        href="/book"
        className="press flex h-[50px] items-center justify-center rounded-input bg-navy-700 font-semibold text-white no-underline hover:text-white"
      >
        {t("book")}
      </Link>
    </div>
  );
}
