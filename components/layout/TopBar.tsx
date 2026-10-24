import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { LanguageToggle } from "./LanguageToggle";

/** Navy utility bar: address, hours, phone and the language toggle. Hidden on phones. */
export function TopBar() {
  const t = useTranslations("TopBar");
  return (
    <div className="hidden bg-navy-800 text-sm text-on-navy-light md:block">
      <div className="container-x flex flex-wrap items-center justify-between gap-3 py-2.5">
        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2">
            <PinIcon size={16} className="text-teal-300" />
            {t("address")}
          </span>
          <span className="hidden items-center gap-2 lg:flex">
            <ClockIcon size={16} className="text-teal-300" />
            {contact.hours}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={contact.phoneHref}
            className="force-ltr flex items-center gap-2 font-semibold text-white no-underline hover:text-white"
          >
            <PhoneIcon size={16} className="text-teal-300" />
            <span dir="ltr">{contact.phoneDisplay}</span>
          </a>
          <LanguageToggle />
        </div>
      </div>
    </div>
  );
}
