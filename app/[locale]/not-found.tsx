import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { FooterSlim } from "@/components/layout/Footer";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <>
      <main id="main" className="flex-1 bg-cloud">
        <div className="container-x flex flex-col items-start gap-5 py-28">
          <h1 className="text-display-sm">{t("title")}</h1>
          <p className="max-w-[560px] text-lg text-lead">{t("body")}</p>
          <Button href="/">{t("home")}</Button>
        </div>
      </main>
      <FooterSlim legal="medical" />
    </>
  );
}
