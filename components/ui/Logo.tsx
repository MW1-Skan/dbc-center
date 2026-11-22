import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "color" | "white";
  size?: "sm" | "md" | "footer" | "responsive";
  asLink?: boolean;
  className?: string;
};

const sizes = {
  sm: {
    mark: 42,
    word: "text-[19px]",
    sub: "text-[9.5px] tracking-[.34em] mt-[5px]",
    gap: "gap-2.5",
  },
  md: { mark: 52, word: "text-2xl", sub: "text-[11px] tracking-[.36em] mt-1.5", gap: "gap-3.5" },
  footer: {
    mark: 48,
    word: "text-[22px]",
    sub: "text-[10.5px] tracking-[.36em] mt-1.5",
    gap: "gap-3.5",
  },
} as const;

export function Logo({ tone = "color", size = "md", asLink = true, className }: LogoProps) {
  const t = useTranslations("Common");
  const src = tone === "white" ? "/brand/logo-mark-white.png" : "/brand/logo-mark.png";
  const wordColor = tone === "white" ? "text-white" : "text-navy-700";
  const subColor = tone === "white" ? "text-teal-200" : "text-teal-600";

  const responsive = size === "responsive";
  const s = responsive ? sizes.md : sizes[size];

  const content = (
    <>
      <Image
        src={src}
        alt=""
        width={s.mark}
        height={s.mark}
        priority={size !== "footer"}
        className={cn("object-contain", responsive ? "size-[42px] md:size-[52px]" : undefined)}
        style={responsive ? undefined : { width: s.mark, height: s.mark }}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading font-bold tracking-[.1em]",
            wordColor,
            responsive ? "text-[19px] md:text-2xl" : s.word,
          )}
        >
          {t("brandWord")}
        </span>
        <span
          className={cn(
            "font-bold",
            subColor,
            responsive
              ? "mt-[5px] text-[9.5px] tracking-[.34em] md:mt-1.5 md:text-[11px] md:tracking-[.36em]"
              : s.sub,
          )}
        >
          {t("brandSub")}
        </span>
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center no-underline",
    responsive ? "gap-2.5 md:gap-3.5" : s.gap,
    className,
  );

  if (!asLink) return <span className={classes}>{content}</span>;
  return (
    <Link href="/" className={classes} title={t("homeLinkLabel")}>
      {content}
    </Link>
  );
}
