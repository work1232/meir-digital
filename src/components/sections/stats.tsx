"use client";

import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Reveal } from "@/components/shared/reveal";

const ITEMS = [
  { key: "delivery", value: 7, suffix: "" },
  { key: "transparency", value: 100, suffix: "%" },
  { key: "packages", value: 3, suffix: "" },
  { key: "availability", value: 24, suffix: "/6" },
] as const;

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal
            key={item.key}
            delay={i * 0.08}
            className="rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:glow-sm"
          >
            <AnimatedCounter
              value={item.value}
              suffix={item.suffix}
              className="font-heading text-4xl font-extrabold text-gradient md:text-5xl"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              {t(`items.${item.key}.label`)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
