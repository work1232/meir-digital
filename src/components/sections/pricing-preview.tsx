"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { cn } from "@/lib/utils";

const PLAN_KEYS = ["basic", "business", "premium"] as const;

export function PricingPreview() {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-3 items-start gap-2 sm:gap-4 md:gap-6">
          {PLAN_KEYS.map((key, i) => {
            const popular = key === "business";
            const features = (t.raw(`plans.${key}.features`) as string[]).slice(0, 4);
            return (
              <Reveal
                key={key}
                delay={i * 0.1}
                className={cn(
                  "relative rounded-2xl border border-border bg-card/60 p-3 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:glow-sm sm:p-5 md:p-7",
                  popular && "border-brand-2/50 shadow-xl ring-1 ring-brand-2/30 md:-mt-3 md:mb-3"
                )}
              >
                {popular && (
                  <span className="absolute -top-3 start-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[9px] font-bold text-white shadow-md sm:-top-3.5 sm:start-6 sm:px-3 sm:py-1 sm:text-xs">
                    {t("popularBadge")}
                  </span>
                )}
                <h3 className="font-heading text-sm font-bold sm:text-lg md:text-xl">
                  {t(`plans.${key}.name`)}
                </h3>
                <p className="mt-1 text-[10px] text-muted-foreground sm:text-sm">
                  {t(`plans.${key}.desc`)}
                </p>
                <div className="mt-3 flex flex-wrap items-baseline gap-1 sm:mt-5 sm:gap-2">
                  <span
                    className="font-heading text-lg font-extrabold text-gradient sm:text-3xl md:text-4xl"
                    dir="ltr"
                  >
                    ₪{t(`plans.${key}.price`)}
                  </span>
                  <span className="text-[9px] text-muted-foreground sm:text-sm">
                    {tCommon("oneTime")}
                  </span>
                </div>
                <ul className="mt-3 space-y-1.5 sm:mt-6 sm:space-y-2.5">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-1 text-[9.5px] leading-tight sm:gap-2 sm:text-sm sm:leading-normal"
                    >
                      <Check className="mt-0.5 size-2.5 shrink-0 text-brand-2 sm:size-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  size="sm"
                  variant={popular ? "gradient" : "outline"}
                  text={t(`plans.${key}.whatsapp`)}
                  className="mt-4 w-full gap-1 px-1.5 py-1.5 text-[9px] sm:mt-7 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm [&_svg]:size-3 sm:[&_svg]:size-4"
                >
                  {tCommon("getQuote")}
                </WhatsAppButton>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.25} className="mt-10 flex justify-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 font-semibold text-brand-2 transition-colors hover:text-brand-1"
          >
            {t("viewFull")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
