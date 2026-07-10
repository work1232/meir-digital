"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/reveal";
import { site } from "@/lib/site";

export function FeaturedProjectCard() {
  const t = useTranslations("portfolio");
  const tags = t.raw("featured.tags") as string[];

  return (
    <Reveal className="overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur lg:grid lg:grid-cols-2">
      <div
        dir="ltr"
        className="relative border-b border-border lg:border-b-0 lg:border-e"
      >
        <div className="flex items-center gap-3 border-b border-border bg-secondary/40 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 truncate rounded-full bg-secondary px-3 py-1 text-center text-xs text-muted-foreground">
            yosi1223.github.io/work
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <iframe
            src={site.featuredProjectUrl}
            title={t("featured.name")}
            loading="lazy"
            tabIndex={-1}
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[250%] w-[250%] origin-top-left scale-[0.4] border-0"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex size-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {t("liveBadge")}
        </span>
        <h3 className="font-heading text-2xl font-bold md:text-3xl">
          {t("featured.name")}
        </h3>
        <p className="text-sm font-semibold text-brand-2">
          {t("featured.type")}
        </p>
        <p className="text-muted-foreground">{t("featured.desc")}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <a
          href={site.featuredProjectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-lg glow-sm transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
        >
          <ExternalLink className="size-4" />
          {t("featured.cta")}
        </a>
      </div>
    </Reveal>
  );
}

const CONCEPT_STYLES = [
  { accent: "#78716c", soft: "#f5f5f4", dark: "#292524" },
  { accent: "#ea580c", soft: "#fff7ed", dark: "#431407" },
  { accent: "#16a34a", soft: "#f0fdf4", dark: "#052e16" },
];

export function ConceptsGrid() {
  const t = useTranslations("portfolio");
  const concepts = t.raw("concepts") as {
    name: string;
    type: string;
    desc: string;
  }[];

  return (
    <div className="grid grid-cols-2 gap-4 max-md:[&>*:last-child]:col-span-2 md:grid-cols-3 md:gap-6">
      {concepts.map((concept, i) => {
        const style = CONCEPT_STYLES[i % CONCEPT_STYLES.length];
        return (
          <Reveal
            key={concept.name}
            delay={i * 0.1}
            className="group overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:glow-sm"
          >
            <div
              className="relative aspect-video overflow-hidden p-4 transition-transform duration-500"
              style={{ backgroundColor: style.soft }}
              aria-hidden
            >
              <div className="mx-auto flex h-full max-w-[240px] flex-col gap-2 transition-transform duration-500 group-hover:scale-[1.04]">
                <div className="flex items-center justify-between">
                  <span
                    className="h-2 w-10 rounded-full"
                    style={{ backgroundColor: style.dark, opacity: 0.8 }}
                  />
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-4 rounded-full"
                        style={{ backgroundColor: style.dark, opacity: 0.3 }}
                      />
                    ))}
                  </span>
                </div>
                <div
                  className="relative mt-1 flex-1 rounded-lg"
                  style={{
                    background: `linear-gradient(120deg, ${style.accent}, ${style.dark})`,
                  }}
                >
                  <span className="absolute start-3 top-3 h-2 w-1/2 rounded bg-white/85" />
                  <span className="absolute start-3 top-7 h-1.5 w-2/3 rounded bg-white/45" />
                  <span className="absolute bottom-3 start-3 h-4 w-14 rounded bg-white/90" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((c) => (
                    <span
                      key={c}
                      className="h-7 rounded-md"
                      style={{ backgroundColor: style.dark, opacity: 0.12 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-5">
              <span className="mb-2 inline-block rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {t("conceptBadge")}
              </span>
              <h3 className="font-heading text-lg font-bold">{concept.name}</h3>
              <p className="text-xs font-semibold text-brand-2">
                {concept.type}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {concept.desc}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
