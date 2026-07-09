"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { AuthButton } from "./auth-button";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label={t("common.brand")}
          className="transition-opacity hover:opacity-80"
        >
          <Logo markClassName="h-8" />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <AuthButton />
          <WhatsAppButton
            size="sm"
            text={t("hero.whatsappMessage")}
            className="ms-1 hidden sm:inline-flex"
          >
            {t("common.whatsapp")}
          </WhatsAppButton>
        </div>
      </div>
    </motion.header>
  );
}
