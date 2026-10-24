import Image from "next/image";
import { NextIntlClientProvider, useMessages, useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import { pickMessages } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { CallbackForm } from "./CallbackForm";

export function CallbackBand() {
  const t = useTranslations("Callback");
  const messages = useMessages();
  const contactLink =
    "flex items-center gap-3.5 font-semibold text-white no-underline hover:text-white";

  return (
    <section id="book" className="scroll-mt-24 bg-white">
      <div className="container-x section-y">
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] overflow-hidden rounded-[26px] bg-navy-800 md:rounded-panel-lg md:border md:border-line md:shadow-panel">
          <div className="relative flex flex-col gap-4 overflow-hidden p-7 pb-0 text-white md:gap-6 md:p-14">
            <Image
              src="/brand/logo-mark-white.png"
              alt=""
              width={340}
              height={340}
              aria-hidden
              className="absolute -end-[70px] -top-[70px] size-[220px] object-contain opacity-[.07] md:-end-[90px] md:top-auto md:-bottom-[90px] md:size-[340px]"
            />
            <span className="hidden text-sm font-bold tracking-eyebrow text-teal-200 uppercase md:block">
              {t("eyebrow")}
            </span>
            <h2 className="text-band text-white">{t("title")}</h2>
            <p className="max-w-[440px] text-[15px] text-on-navy-muted md:text-[17px]">
              <span className="md:hidden">{t("leadShort")}</span>
              <span className="hidden md:inline">{t("lead")}</span>
            </p>
            <div className="mt-auto hidden flex-col gap-3.5 pt-4 md:flex">
              <a href={contact.phoneHref} className={contactLink}>
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                  <PhoneIcon size={18} className="text-teal-200" />
                </span>
                <span dir="ltr">{contact.phoneDisplay}</span>
              </a>
              <a href={contact.whatsappHref} className={contactLink}>
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                  <WhatsAppIcon size={18} className="text-teal-200" />
                </span>
                {t("whatsapp")}
              </a>
            </div>
          </div>

          <div className="relative p-7 text-white md:bg-white md:p-14 md:text-body">
            <NextIntlClientProvider
              messages={pickMessages(messages, ["Callback", "Forms", "Common"])}
            >
              <CallbackForm />
            </NextIntlClientProvider>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
