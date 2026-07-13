import { useTranslations } from "next-intl";
import {
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SunMoon,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const FEATURES = [
  { key: "speed", icon: Zap, wide: true },
  { key: "responsive", icon: Smartphone, wide: false },
  { key: "seo", icon: Search, wide: false },
  { key: "animations", icon: Sparkles, wide: false },
  { key: "secure", icon: ShieldCheck, wide: false },
  { key: "darkmode", icon: SunMoon, wide: true },
] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <Reveal
              key={feature.key}
              delay={i * 0.07}
              className={cn(
                "card-lux group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/40 hover:glow-sm md:p-6",
                feature.wide && "lg:col-span-2"
              )}
            >
              {feature.wide && (
                <div
                  className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
                  aria-hidden
                />
              )}
              <div className="relative">
                <span className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-brand-2 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <feature.icon className="size-6" />
                </span>
                <h3 className="font-heading text-lg font-bold">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {t(`items.${feature.key}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
