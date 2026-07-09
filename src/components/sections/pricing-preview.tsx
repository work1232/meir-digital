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
        <div className="grid gap-6 md:grid-cols-3 md:items-start">
          {PLAN_KEYS.map((key, i) => {
            const popular = key === "business";
            const features = (t.raw(`plans.${key}.features`) as string[]).slice(0, 4);
            return (
              <Reveal
                key={key}
                delay={i * 0.1}
                className={cn(
                  "relative rounded-2xl border border-border bg-card/60 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:glow-sm",
                  popular && "border-brand-2/50 shadow-xl ring-1 ring-brand-2/30 md:-mt-3 md:mb-3"
                )}
              >
                {popular && (
                  <span className="absolute -top-3.5 start-6 rounded-full bg-brand-gradient px-3 py-1 text-xs font-bold text-white shadow-md">
                    {t("popularBadge")}
                  </span>
                )}
                <h3 className="font-heading text-xl font-bold">
                  {t(`plans.${key}.name`)}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`plans.${key}.desc`)}
                </p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span
                    className="font-heading text-4xl font-extrabold text-gradient"
                    dir="ltr"
                  >
                    ₪{t(`plans.${key}.price`)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tCommon("oneTime")}
                  </span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <WhatsAppButton
                  size="sm"
                  variant={popular ? "gradient" : "outline"}
                  text={t(`plans.${key}.whatsapp`)}
                  className="mt-7 w-full"
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
