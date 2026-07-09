import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { FeaturedProjectCard } from "./portfolio-cards";

export function PortfolioPreview() {
  const t = useTranslations("portfolio");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <FeaturedProjectCard />
        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 font-semibold backdrop-blur transition-all duration-300 hover:bg-secondary active:scale-[0.98]"
          >
            {tCommon("viewPortfolio")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
