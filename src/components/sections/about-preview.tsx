import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ValuesGrid } from "./values-grid";

export function AboutPreview() {
  const t = useTranslations("about");
  const locale = useLocale();
  const Arrow = locale === "he" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("body")}
        />
        <ValuesGrid />
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-semibold text-brand-2 transition-colors hover:text-brand-1"
          >
            {t("cta")}
            <Arrow className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
