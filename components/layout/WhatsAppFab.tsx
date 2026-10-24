import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Floating WhatsApp button for desktop; phones use the sticky action bar instead. */
export function WhatsAppFab() {
  const t = useTranslations("Common");
  return (
    <a
      href={contact.whatsappHref}
      className="press fixed end-6 bottom-6 z-30 hidden h-14 items-center gap-2.5 rounded-pill bg-teal-500 ps-2 pe-[22px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(8,42,80,.5)] hover:bg-teal-600 hover:text-white md:flex"
      data-testid="whatsapp-fab"
    >
      <span className="flex size-10 items-center justify-center rounded-full bg-white/18">
        <WhatsAppIcon size={18} />
      </span>
      {t("whatsappFab")}
    </a>
  );
}
