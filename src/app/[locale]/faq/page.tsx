import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.faq" });
  return { title: t("title"), description: t("description") };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="relative overflow-hidden pt-14">
        <AnimatedBackground variant="subtle" />
        <FaqSection />
      </div>
      <CtaSection />
    </>
  );
}
