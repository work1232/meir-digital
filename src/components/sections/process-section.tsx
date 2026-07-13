import { useTranslations } from "next-intl";
import {
  CodeXml,
  MessagesSquare,
  PenTool,
  PhoneCall,
  Rocket,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

const STEP_ICONS = [PhoneCall, PenTool, CodeXml, MessagesSquare, Rocket];

export function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <div className="relative">
          <div
            className="absolute inset-x-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid grid-cols-2 gap-x-6 gap-y-12 max-lg:[&>*:last-child]:col-span-2 sm:gap-10 lg:grid-cols-5 lg:gap-6">
            {STEP_ICONS.map((Icon, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <li className="relative flex flex-col items-center text-center lg:px-2">
                  <span
                    className="pointer-events-none absolute -top-8 select-none font-display text-8xl leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--brand-2)_35%,transparent)] lg:text-9xl"
                    aria-hidden
                    dir="ltr"
                  >
                    {i + 1}
                  </span>
                  <span className="relative z-10 mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg glow-sm">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-heading text-base font-bold">
                    {t(`steps.${i}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`steps.${i}.desc`)}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
