import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyUs } from "@/components/sections/why-us";
import { Features } from "@/components/sections/features";
import { ProcessSection } from "@/components/sections/process-section";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Stats />
      <AboutPreview />
      <ServicesSection />
      <WhyUs />
      <Features />
      <ProcessSection />
      <PortfolioPreview />
      <PricingPreview />
      <FaqSection limit={4} />
      <CtaSection />
    </>
  );
}
