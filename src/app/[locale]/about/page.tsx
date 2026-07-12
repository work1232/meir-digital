import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { ImageBackdrop } from "@/components/shared/image-backdrop";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { LogoMark } from "@/components/brand/logo";
import { ValuesGrid } from "@/components/sections/values-grid";
import { CtaSection } from "@/components/sections/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  const tCta = useTranslations("cta");

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-36">
        <AnimatedBackground variant="subtle" />
        <ImageBackdrop src="/images/about-1.jpg" priority />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            as="h1"
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("body")}
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-3xl border border-border bg-card/60 backdrop-blur">
              <div
                className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
                aria-hidden
              />
              <LogoMark className="h-40" />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">
                {t("storyTitle")}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {t("story1")}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {t("story2")}
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8">
              <WhatsAppButton text={tCta("whatsappMessage")}>
                {t("cta")}
              </WhatsAppButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden pb-20">
        <ImageBackdrop src="/images/about-2.jpg" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading title={t("valuesTitle")} />
          <ValuesGrid />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
