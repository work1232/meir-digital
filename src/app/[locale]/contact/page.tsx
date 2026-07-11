import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Clock, Phone } from "lucide-react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { ImageBackdrop } from "@/components/shared/image-backdrop";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppIcon } from "@/components/shared/icons";
import { ContactForm } from "@/components/sections/contact-form";
import { site, whatsappLink } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");

  return (
    <section className="relative overflow-hidden pb-24 pt-36">
      <AnimatedBackground variant="subtle" />
      <ImageBackdrop src="/images/whatsapp-1.jpg" position="top" priority />
      <ImageBackdrop src="/images/whatsapp-2.jpg" position="bottom" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          as="h1"
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Reveal>
              <a
                href={whatsappLink(t("whatsappCard.message"))}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/40 hover:glow-sm"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-brand-2 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <WhatsAppIcon className="size-7" />
                </span>
                <span>
                  <span className="block font-heading text-lg font-bold">
                    {t("whatsappCard.title")}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {t("whatsappCard.desc")}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-brand-2">
                    {t("whatsappCard.action")}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={site.phoneHref}
                className="group flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/40 hover:glow-sm"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-brand-2 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <Phone className="size-7" />
                </span>
                <span>
                  <span className="block font-heading text-lg font-bold">
                    {t("phoneCard.title")}
                  </span>
                  <span className="block text-sm text-muted-foreground" dir="ltr">
                    {t("phoneCard.desc")}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-brand-2">
                    {t("phoneCard.action")}
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-center gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-brand-2">
                  <Clock className="size-7" />
                </span>
                <span>
                  <span className="block font-heading text-lg font-bold">
                    {t("hoursCard.title")}
                  </span>
                  <span className="block text-sm text-muted-foreground">
                    {t("hoursCard.desc")}
                  </span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
