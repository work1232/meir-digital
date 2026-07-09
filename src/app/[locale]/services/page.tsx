import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Check, Layers, MonitorSmartphone, Rocket } from "lucide-react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { PromisesGrid } from "@/components/sections/promises-grid";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });
  return { title: t("title"), description: t("description") };
}

const OFFERINGS = [
  { key: "landing", icon: Rocket },
  { key: "business", icon: MonitorSmartphone },
  { key: "custom", icon: Layers },
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("services");
  const tCta = useTranslations("cta");

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36">
        <AnimatedBackground variant="subtle" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            as="h1"
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <PromisesGrid />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            title={t("offeringsTitle")}
            subtitle={t("offeringsSubtitle")}
          />
          <div className="grid gap-6 md:grid-cols-3">
            {OFFERINGS.map((offering, i) => {
              const features = t.raw(
                `offerings.${offering.key}.features`
              ) as string[];
              return (
                <Reveal
                  key={offering.key}
                  delay={i * 0.1}
                  className="group flex flex-col rounded-3xl border border-border bg-card/60 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/40 hover:glow-sm"
                >
                  <span className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-secondary text-brand-2 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <offering.icon className="size-7" />
                  </span>
                  <h3 className="font-heading text-xl font-bold">
                    {t(`offerings.${offering.key}.title`)}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {t(`offerings.${offering.key}.desc`)}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.3} className="mt-12 flex flex-col items-center gap-4">
            <p className="text-muted-foreground">{t("ctaStrip")}</p>
            <WhatsAppButton text={tCta("whatsappMessage")}>
              {tCta("button")}
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
