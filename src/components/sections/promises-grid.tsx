import { useTranslations } from "next-intl";
import { Headset, MessageSquareText, Palette, RefreshCcw } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

const PROMISES = [
  { key: "explain", icon: MessageSquareText },
  { key: "fixes", icon: RefreshCcw },
  { key: "design", icon: Palette },
  { key: "availability", icon: Headset },
] as const;

export function PromisesGrid() {
  const t = useTranslations("services.promises");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PROMISES.map((promise, i) => (
        <Reveal
          key={promise.key}
          delay={i * 0.08}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/40 hover:glow-sm"
        >
          <div
            className="absolute -end-10 -top-10 size-28 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
            aria-hidden
          />
          <span className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-brand-2 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
            <promise.icon className="size-6" />
          </span>
          <h3 className="font-heading text-lg font-bold">
            {t(`${promise.key}.title`)}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {t(`${promise.key}.desc`)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
