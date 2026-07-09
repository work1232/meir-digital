import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import {
  ConceptsGrid,
  FeaturedProjectCard,
} from "@/components/sections/portfolio-cards";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.portfolio" });
  return { title: t("title"), description: t("description") };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PortfolioContent />;
}

function PortfolioContent() {
  const t = useTranslations("portfolio");
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
          <FeaturedProjectCard />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title={t("conceptsTitle")} />
          <ConceptsGrid />
          <Reveal delay={0.3} className="mt-12 flex flex-col items-center gap-4">
            <p className="text-muted-foreground">{t("ctaStrip")}</p>
            <WhatsAppButton text={tCta("whatsappMessage")}>
              {t("ctaButton")}
            </WhatsAppButton>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
