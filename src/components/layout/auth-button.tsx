"use client";

import { useTranslations } from "next-intl";
import { CircleUserRound } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

export function AuthButton() {
  const { user } = useAuth();
  const t = useTranslations("nav");

  if (user) {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/account" aria-label={t("account")} title={t("account")}>
          <CircleUserRound className="size-5" />
        </Link>
      </Button>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/login">{t("login")}</Link>
    </Button>
  );
}
