"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LogoMark } from "@/components/brand/logo";

export function Preloader() {
  const t = useTranslations("preloader");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("md-preloaded")) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem("md-preloaded", "1");
      setDone(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          role="status"
          aria-label={t("label")}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
        >
          <LogoMark animated className="h-24" />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-heading text-sm font-bold tracking-[0.3em] text-muted-foreground"
            dir="ltr"
          >
            MEIR DIGITAL
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
