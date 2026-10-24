import { useTranslations } from "next-intl";
import { contact } from "@/content/contact";
import type { ActionResult } from "@/lib/actions";

type Props = { result: Extract<ActionResult, { ok: false }> | null };

/** Friendly top-of-form error. Inputs keep their values; only this message changes. */
export function FormAlert({ result }: Props) {
  const t = useTranslations("Forms");
  if (!result) return null;
  const message =
    result.code === "rateLimited"
      ? t("rateLimited")
      : result.code === "invalid"
        ? t("invalid")
        : t("failed", { phone: contact.phoneDisplay });
  return (
    <div
      role="alert"
      className="fade-in rounded-input border border-error/20 bg-error-soft px-4 py-3 text-[15px] text-error-deep"
    >
      <strong className="block">{t("errorTitle")}</strong>
      <span>{message}</span>
    </div>
  );
}
