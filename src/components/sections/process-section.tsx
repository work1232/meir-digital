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
          <ol className="grid grid-cols-2 gap-6 max-lg:[&>*:last-child]:col-span-2 sm:gap-10 lg:grid-cols-5 lg:gap-6">
            {STEP_ICONS.map((Icon, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <li className="relative flex flex-col items-center text-center lg:px-2">
                  <span className="relative z-10 mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg glow-sm">
                    <Icon className="size-6" />
                    <span className="absolute -top-2 -end-2 flex size-6 items-center justify-center rounded-full border border-border bg-background font-heading text-xs font-bold">
                      {i + 1}
                    </span>
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
