"use client";

import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const locale = useLocale();
  const t = useTranslations("common");
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "he" ? "en" : "he";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 font-semibold"
      aria-label={t("languageToggle")}
      onClick={() => router.replace(pathname, { locale: nextLocale })}
    >
      <Languages className="size-4" />
      {t("languageToggle")}
    </Button>
  );
}
