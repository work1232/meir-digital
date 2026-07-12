import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.pricing" });
  return { title: t("title"), description: t("description") };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PricingPlans />
      <div className="relative z-10 bg-background/80 backdrop-blur-sm">
        <FaqSection limit={4} />
        <CtaSection backdrop="/images/package-2.jpg" />
      </div>
    </>
  );
}
