import { Breadcrumb } from "@/components/layout/Breadcrumb";

type Props = { crumb: string; title: string; lead: string };

/** White page heading with the faint logo arcs in the corner (booking page). */
export function PageHero({ crumb, title, lead }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden
        className="absolute -end-[120px] -top-[300px] size-[620px] rounded-full border-[10px] border-transparent border-b-navy-700 border-l-navy-700 opacity-[.08] rtl:-scale-x-100"
      />
      <div
        aria-hidden
        className="absolute -end-[150px] -top-[270px] size-[620px] rounded-full border-[10px] border-transparent border-b-teal-500 opacity-[.18]"
      />
      <div className="relative container-x flex flex-col gap-4 pt-10 pb-12 md:pt-14 md:pb-16">
        <div data-hero style={{ "--hero-delay": "0ms" } as React.CSSProperties}>
          <Breadcrumb current={crumb} />
        </div>
        <h1
          data-hero
          style={{ "--hero-delay": "80ms" } as React.CSSProperties}
          className="text-display-sm"
        >
          {title}
        </h1>
        <p
          data-hero
          style={{ "--hero-delay": "160ms" } as React.CSSProperties}
          className="max-w-[640px] text-[17px] text-lead md:text-[19px]"
        >
          {lead}
        </p>
      </div>
    </section>
  );
}
