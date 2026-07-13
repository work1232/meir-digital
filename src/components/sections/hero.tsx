"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown, Rocket, Sparkles, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

const TECH = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Supabase"];

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-14 pt-28">
      <AnimatedBackground variant="hero" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="flex flex-col items-start gap-6 max-lg:items-center max-lg:text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="size-4 text-brand-1" />
            {t("badge")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-[2.75rem] leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl"
          >
            <span className="block">{t("titleLine1")}</span>
            <span className="relative inline-block">
              <span className="text-gradient">{t("titleLine2")}</span>
              <motion.span
                className="absolute -bottom-2 start-0 h-[3px] w-full origin-[right_center] rounded-full bg-brand-gradient rtl:origin-[right_center]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="max-w-xl text-lg text-muted-foreground text-pretty"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="flex flex-wrap items-center gap-3 max-lg:justify-center"
          >
            <WhatsAppButton text={t("whatsappMessage")}>
              {t("ctaPrimary")}
            </WhatsAppButton>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 font-semibold backdrop-blur transition-all duration-300 hover:bg-secondary active:scale-[0.98]"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        <BrowserMock url={t("mockBrowserUrl")} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-14"
      >
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {t("techStrip")}
        </p>
        <TechMarquee />
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-4 start-1/2 hidden -translate-x-1/2 rtl:translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function TechMarquee() {
  const row = (
    <div className="flex shrink-0 items-center gap-3 pe-3">
      {TECH.map((name) => (
        <span
          key={name}
          dir="ltr"
          className="rounded-full border border-border bg-secondary/40 px-5 py-2 text-sm font-semibold text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div
      dir="ltr"
      className="mx-auto flex max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
    >
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {row}
        {row}
      </motion.div>
    </div>
  );
}

function BrowserMock({ url }: { url: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      className="relative w-full max-lg:mx-auto max-lg:max-w-md"
    >
      <motion.div
        aria-hidden
        animate={{ y: [-10, 6, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-5 -start-4 z-10 flex size-12 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur"
      >
        <Zap className="size-5 text-brand-1" />
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [8, -8, 8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-5 -end-4 z-10 flex size-12 items-center justify-center rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur"
      >
        <Rocket className="size-5 text-brand-3" />
      </motion.div>

      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-2xl backdrop-blur-xl glow-sm"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3" dir="ltr">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 truncate rounded-full bg-secondary px-3 py-1 text-center text-xs text-muted-foreground">
            {url}
          </div>
        </div>
        <div className="space-y-4 p-6" aria-hidden>
          <div className="relative h-28 overflow-hidden rounded-xl bg-brand-gradient">
            <div className="absolute inset-0 bg-grid opacity-25" />
            <div className="absolute start-4 top-5 h-3 w-2/5 rounded bg-white/80" />
            <div className="absolute start-4 top-11 h-2 w-3/5 rounded bg-white/50" />
            <div className="absolute start-4 top-16 h-2 w-1/2 rounded bg-white/50" />
            <div className="absolute bottom-4 start-4 h-6 w-20 rounded-md bg-white/90" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-lg bg-secondary" />
            <div className="h-16 rounded-lg bg-secondary" />
            <div className="h-16 rounded-lg bg-secondary" />
          </div>
          <div className="space-y-2">
            <div className="h-2.5 w-3/4 rounded bg-secondary" />
            <div className="h-2.5 w-1/2 rounded bg-secondary" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-28 rounded-lg bg-brand-gradient" />
            <div className="h-9 w-28 rounded-lg border border-border" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
