import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { shapeArabicVisual } from "@/lib/arabic-shape";

export const alt = "Delta Bariatric Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const isAr = locale === "ar";

  const fontFile = isAr ? "IBMPlexSansArabic-SemiBold.ttf" : "Sora-SemiBold.ttf";
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts", fontFile)),
    readFile(join(process.cwd(), "public/brand/logo-mark-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  // Satori lays words out left-to-right whatever the direction and measures each
  // letter in its isolated form, so Arabic lines are pre-shaped and built word by
  // word in a reversed flex row; English text is rendered as-is.
  const line = (text: string, fontSize: number, color: string, maxWidth?: number) => {
    const base = { fontSize, lineHeight: 1.1, color, ...(maxWidth ? { maxWidth } : {}) };
    return isAr ? (
      <div
        style={{
          ...base,
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          columnGap: Math.round(fontSize * 0.28),
        }}
      >
        {text.split(" ").map((word, i) => (
          <span key={i}>{shapeArabicVisual(word)}</span>
        ))}
      </div>
    ) : (
      <span style={base}>{text}</span>
    );
  };

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0A2E55",
        color: "#FFFFFF",
        fontFamily: "Brand",
        alignItems: isAr ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isAr ? "row-reverse" : "row",
          alignItems: "center",
          gap: 24,
        }}
      >
        <img src={logoSrc} width={96} height={96} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 44, letterSpacing: 4 }}>DELTA</span>
          <span style={{ fontSize: 18, letterSpacing: 7, color: "#8FD3D8" }}>BARIATRIC CENTER</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isAr ? "flex-end" : "flex-start",
          gap: 20,
          width: "100%",
        }}
      >
        {line(t("siteName"), 60, "#FFFFFF", 960)}
        {line(t("ogTagline"), 30, "#C9D8E7")}
      </div>
      <div
        style={{
          position: "absolute",
          ...(isAr ? { left: -140 } : { right: -140 }),
          top: -140,
          width: 560,
          height: 560,
          borderRadius: 280,
          border: "14px solid #1A8F97",
          opacity: 0.35,
        }}
      />
    </div>,
    {
      ...size,
      fonts: [{ name: "Brand", data: font, weight: 600, style: "normal" }],
    },
  );
}
