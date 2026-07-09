import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/shared/section-heading";
import { PromisesGrid } from "./promises-grid";

export function ServicesSection() {
  const t = useTranslations("services");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <PromisesGrid />
      </div>
    </section>
  );
}
