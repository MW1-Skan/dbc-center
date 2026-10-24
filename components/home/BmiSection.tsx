import { NextIntlClientProvider, useMessages } from "next-intl";
import { pickMessages } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { BmiCalculator } from "./BmiCalculator";

/** Mint rounded panel hosting the client-side BMI calculator. */
export function BmiSection() {
  const messages = useMessages();
  return (
    <section id="bmi" className="scroll-mt-24 bg-white px-3 pb-14 md:px-6 lg:pb-28">
      <Reveal className="mx-auto max-w-[1240px] rounded-panel-lg bg-mint px-6 py-10 md:px-[72px] md:py-20">
        <NextIntlClientProvider messages={pickMessages(messages, ["Bmi", "Common"])}>
          <BmiCalculator />
        </NextIntlClientProvider>
      </Reveal>
    </section>
  );
}
