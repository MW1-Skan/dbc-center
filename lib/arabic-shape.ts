/**
 * Minimal Arabic shaper: maps each letter to its Unicode presentation form
 * (isolated / final / initial / medial, plus the lam-alef ligatures) from the
 * joining context. Satori (used for the Open Graph image) measures text one
 * grapheme at a time with isolated glyph widths, so shaping the string first
 * makes its layout match what it draws. Not meant for HTML, where the browser
 * shapes text itself.
 */

/** [isolated, final, initial?, medial?] for each letter. */
const FORMS: Record<string, [number, number, number?, number?]> = {
  ء: [0xfe80, 0xfe80],
  آ: [0xfe81, 0xfe82],
  أ: [0xfe83, 0xfe84],
  ؤ: [0xfe85, 0xfe86],
  إ: [0xfe87, 0xfe88],
  ئ: [0xfe89, 0xfe8a, 0xfe8b, 0xfe8c],
  ا: [0xfe8d, 0xfe8e],
  ب: [0xfe8f, 0xfe90, 0xfe91, 0xfe92],
  ة: [0xfe93, 0xfe94],
  ت: [0xfe95, 0xfe96, 0xfe97, 0xfe98],
  ث: [0xfe99, 0xfe9a, 0xfe9b, 0xfe9c],
  ج: [0xfe9d, 0xfe9e, 0xfe9f, 0xfea0],
  ح: [0xfea1, 0xfea2, 0xfea3, 0xfea4],
  خ: [0xfea5, 0xfea6, 0xfea7, 0xfea8],
  د: [0xfea9, 0xfeaa],
  ذ: [0xfeab, 0xfeac],
  ر: [0xfead, 0xfeae],
  ز: [0xfeaf, 0xfeb0],
  س: [0xfeb1, 0xfeb2, 0xfeb3, 0xfeb4],
  ش: [0xfeb5, 0xfeb6, 0xfeb7, 0xfeb8],
  ص: [0xfeb9, 0xfeba, 0xfebb, 0xfebc],
  ض: [0xfebd, 0xfebe, 0xfebf, 0xfec0],
  ط: [0xfec1, 0xfec2, 0xfec3, 0xfec4],
  ظ: [0xfec5, 0xfec6, 0xfec7, 0xfec8],
  ع: [0xfec9, 0xfeca, 0xfecb, 0xfecc],
  غ: [0xfecd, 0xfece, 0xfecf, 0xfed0],
  ف: [0xfed1, 0xfed2, 0xfed3, 0xfed4],
  ق: [0xfed5, 0xfed6, 0xfed7, 0xfed8],
  ك: [0xfed9, 0xfeda, 0xfedb, 0xfedc],
  ل: [0xfedd, 0xfede, 0xfedf, 0xfee0],
  م: [0xfee1, 0xfee2, 0xfee3, 0xfee4],
  ن: [0xfee5, 0xfee6, 0xfee7, 0xfee8],
  ه: [0xfee9, 0xfeea, 0xfeeb, 0xfeec],
  و: [0xfeed, 0xfeee],
  ى: [0xfeef, 0xfef0],
  ي: [0xfef1, 0xfef2, 0xfef3, 0xfef4],
};

/** Lam + alef variants: [isolated, final]. */
const LAM_ALEF: Record<string, [number, number]> = {
  آ: [0xfef5, 0xfef6],
  أ: [0xfef7, 0xfef8],
  إ: [0xfef9, 0xfefa],
  ا: [0xfefb, 0xfefc],
};

const isTashkeel = (ch: string) => /[ً-ْٰ]/.test(ch);
/** Letters that connect to the following letter (have initial/medial forms). */
const joinsNext = (ch: string | undefined) => Boolean(ch && FORMS[ch] && FORMS[ch][2]);
const isLetter = (ch: string | undefined) => Boolean(ch && FORMS[ch]);

export function shapeArabic(text: string): string {
  const chars = Array.from(text);
  // Letters only, with the index of each in `chars`, so diacritics do not break joins.
  const letters = chars.map((ch, i) => ({ ch, i })).filter(({ ch }) => !isTashkeel(ch));
  const out = chars.slice();

  for (let k = 0; k < letters.length; k++) {
    const { ch, i } = letters[k];
    const forms = FORMS[ch];
    if (!forms) continue;
    const prev = letters[k - 1]?.ch;
    const next = letters[k + 1]?.ch;
    const prevJoins = joinsNext(prev);

    // Lam-alef ligature: consumes the following alef.
    if (ch === "ل" && next && LAM_ALEF[next]) {
      const [iso, fin] = LAM_ALEF[next];
      out[i] = String.fromCodePoint(prevJoins ? fin : iso);
      out[letters[k + 1].i] = "";
      k++;
      continue;
    }

    const nextJoins = isLetter(next) && Boolean(forms[2]);
    const code = prevJoins
      ? nextJoins
        ? (forms[3] ?? forms[1])
        : forms[1]
      : nextJoins
        ? (forms[2] ?? forms[0])
        : forms[0];
    out[i] = String.fromCodePoint(code);
  }
  return out.join("");
}

/**
 * Shapes an Arabic word and reverses it into visual order for a renderer that
 * draws glyphs left-to-right (presentation forms are not reordered by Satori's
 * bidi pass). Runs of Latin letters and digits keep their own order.
 */
export function shapeArabicVisual(word: string): string {
  const shaped = Array.from(shapeArabic(word)).filter((ch) => ch !== "");
  const out: string[] = [];
  let ltrRun: string[] = [];
  const flush = () => {
    if (ltrRun.length) out.push(ltrRun.join(""));
    ltrRun = [];
  };
  for (const ch of shaped) {
    if (/[0-9A-Za-z]/.test(ch)) ltrRun.push(ch);
    else {
      flush();
      out.push(ch);
    }
  }
  flush();
  return out.reverse().join("");
}
