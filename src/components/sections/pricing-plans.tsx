"use client";

import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";
import {
  PricingCard,
  ShaderCanvas,
} from "@/components/ui/animated-glassy-pricing";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const PLAN_KEYS = ["basic", "business", "premium"] as const;

const COMPARISON_ROWS = [
  "pages",
  "design",
  "animations",
  "responsive",
  "contactForm",
  "seo",
  "auth",
  "admin",
  "fixes",
  "delivery",
  "support",
] as const;

export function PricingPlans() {
  const t = useTranslations("pricing");
  const tCommon = useTranslations("common");

  return (
    <>
      <ShaderCanvas />
      <div className="relative z-10">
        <section className="pb-16 pt-36">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              as="h1"
              kicker={t("kicker")}
              title={t("title")}
              subtitle={t("subtitle")}
            />
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-stretch md:gap-6">
              {PLAN_KEYS.map((key) => {
                const popular = key === "business";
                return (
                  <PricingCard
                    key={key}
                    planName={t(`plans.${key}.name`)}
                    description={t(`plans.${key}.desc`)}
                    price={t(`plans.${key}.price`)}
                    periodLabel={tCommon("oneTime")}
                    features={t.raw(`plans.${key}.features`) as string[]}
                    buttonText={tCommon("getQuote")}
                    isPopular={popular}
                    popularLabel={t("popularBadge")}
                    buttonVariant={popular ? "primary" : "secondary"}
                    onSelect={() =>
                      window.open(
                        whatsappLink(t(`plans.${key}.whatsapp`)),
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  />
                );
              })}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-10 text-center text-sm text-muted-foreground">
                {t("priceNote")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeading title={t("comparison.title")} />
            <Reveal>
              <div className="overflow-x-auto rounded-2xl border border-border bg-card/70 backdrop-blur">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="min-w-40 py-4 font-heading text-sm font-bold text-foreground">
                        {t("comparison.feature")}
                      </TableHead>
                      {PLAN_KEYS.map((key) => (
                        <TableHead
                          key={key}
                          className={cn(
                            "min-w-32 py-4 text-center font-heading text-sm font-bold text-foreground",
                            key === "business" && "bg-brand-2/10"
                          )}
                        >
                          <span className="block">{t(`plans.${key}.name`)}</span>
                          <span className="mt-1 block text-gradient" dir="ltr">
                            ₪{t(`plans.${key}.price`)}
                          </span>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {COMPARISON_ROWS.map((row) => (
                      <TableRow key={row}>
                        <TableCell className="py-3.5 font-medium">
                          {t(`comparison.rows.${row}.label`)}
                        </TableCell>
                        {PLAN_KEYS.map((key) => {
                          const value = t(`comparison.rows.${row}.${key}`);
                          return (
                            <TableCell
                              key={key}
                              className={cn(
                                "py-3.5 text-center text-sm",
                                key === "business" && "bg-brand-2/10"
                              )}
                            >
                              {value === "true" ? (
                                <Check
                                  className="mx-auto size-4.5 text-brand-2"
                                  aria-label={tCommon("included")}
                                />
                              ) : value === "false" ? (
                                <Minus
                                  className="mx-auto size-4 text-muted-foreground/50"
                                  aria-label={tCommon("notIncluded")}
                                />
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
