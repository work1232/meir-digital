import { useTranslations } from "next-intl";
import { Award, Gauge, Gem, Handshake } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const VALUES = [
  { key: "fast", icon: Gauge },
  { key: "quality", icon: Gem },
  { key: "expectations", icon: Handshake },
  { key: "experience", icon: Award },
] as const;

export function ValuesGrid() {
  const t = useTranslations("about.values");

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {VALUES.map((value, i) => (
        <Reveal
          key={value.key}
          delay={i * 0.08}
          className="group rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/40 hover:glow-sm md:p-6"
        >
          <span className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-brand-2 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
            <value.icon className="size-6" />
          </span>
          <h3 className="font-heading text-lg font-bold">
            {t(`${value.key}.title`)}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(`${value.key}.desc`)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
