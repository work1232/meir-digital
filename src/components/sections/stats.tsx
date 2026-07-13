"use client";

import { useTranslations } from "next-intl";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

const KEYS = ["delivery", "transparency", "packages", "availability"] as const;

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 sm:px-6 lg:grid-cols-4">
        {KEYS.map((key, i) => {
          // Numbers live in messages/*.json so they can be edited by hand.
          const value = Number(t.raw(`items.${key}.value`) as string) || 0;
          const suffix = (t.raw(`items.${key}.suffix`) as string) ?? "";
          return (
            <Reveal
              key={key}
              delay={i * 0.08}
              className={cn(
                "px-4 text-center sm:px-8",
                // Hairline separators between columns, brand-tinted.
                i > 0 && "lg:border-s lg:border-border",
                i % 2 === 1 && "border-s border-border lg:border-s"
              )}
            >
              <AnimatedCounter
                value={value}
                suffix={suffix}
                className="font-display text-5xl text-gradient md:text-6xl"
              />
              <p className="mx-auto mt-3 max-w-[16ch] text-sm text-muted-foreground">
                {t(`items.${key}.label`)}
              </p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
