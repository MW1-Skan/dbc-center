import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Breadcrumb({ current, dark }: { current: string; dark?: boolean }) {
  const t = useTranslations("Breadcrumb");
  const color = dark ? "text-on-navy-faint" : "text-muted";
  return (
    <nav aria-label={t("label")} className={cn("flex gap-2 text-sm", color)}>
      <Link
        href="/"
        className={cn("underline", color, dark ? "hover:text-white" : "hover:text-navy-700")}
      >
        {t("home")}
      </Link>
      <span aria-hidden>/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}
