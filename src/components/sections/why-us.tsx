import { useTranslations } from "next-intl";
import { CircleCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function WhyUs() {
  const t = useTranslations("whyUs");
  const tCta = useTranslations("cta");
  const points = [0, 1, 2, 3, 4] as const;

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="start"
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
            className="mb-8"
          />
          <ul className="space-y-4">
            {points.map((i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-2" />
                  <span className="text-foreground/90">{t(`points.${i}`)}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.4} className="mt-8">
            <WhatsAppButton text={tCta("whatsappMessage")}>
              {tCta("button")}
            </WhatsAppButton>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <CodeWindow />
        </Reveal>
      </div>
    </section>
  );
}

/** Decorative code-editor mockup — always dark, like a developer's screen. */
function CodeWindow() {
  const lines: [number, string][] = [
    [40, "bg-[#c678dd]"],
    [72, "bg-[#61afef]"],
    [56, "bg-[#98c379]"],
    [80, "bg-[#61afef]"],
    [36, "bg-[#e5c07b]"],
    [64, "bg-[#98c379]"],
    [48, "bg-[#c678dd]"],
    [70, "bg-[#61afef]"],
    [30, "bg-[#e06c75]"],
  ];

  return (
    <div
      dir="ltr"
      className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#15152a] shadow-2xl glow-sm"
      aria-hidden
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-white/40">
          your-website.tsx
        </span>
      </div>
      <div className="space-y-3 p-6">
        {lines.map(([width, color], i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-4 font-mono text-[10px] text-white/25">
              {i + 1}
            </span>
            <span
              className={`h-2.5 rounded-full opacity-70 ${color}`}
              style={{ width: `${width}%`, marginInlineStart: i % 3 === 1 ? "1.5rem" : i % 3 === 2 ? "3rem" : 0 }}
            />
          </div>
        ))}
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
          <span className="size-2 animate-pulse rounded-full bg-[#28c840]" />
          <span className="font-mono text-xs text-white/50">
            build successful — deployed ✓
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-16 -end-16 size-48 rounded-full bg-brand-gradient opacity-20 blur-3xl" />
    </div>
  );
}
