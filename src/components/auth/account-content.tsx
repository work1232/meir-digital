"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Briefcase,
  Gem,
  LoaderCircle,
  LogOut,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { updateProfileAction } from "@/app/actions/auth";
import { WhatsAppIcon } from "@/components/shared/icons";
import { whatsappLink } from "@/lib/site";

export function AccountContent() {
  const t = useTranslations("account");
  const tAuth = useTranslations("auth");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const { user, profile, loading, configured, signOut, refresh } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile]);

  if (!configured) {
    return (
      <Shell>
        <p
          className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-400"
          role="alert"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {tAuth("errors.notConfigured")}
        </p>
      </Shell>
    );
  }

  if (loading) {
    return (
      <Shell>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </Shell>
    );
  }

  if (!user) {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/60 p-10 text-center backdrop-blur">
          <p className="text-muted-foreground">{t("loginRequired")}</p>
          <Button asChild className="bg-brand-gradient text-white">
            <Link href="/login">{t("goLogin")}</Link>
          </Button>
        </div>
      </Shell>
    );
  }

  const displayName = profile?.full_name || user.email?.split("@")[0] || "";
  const memberSince = new Intl.DateTimeFormat(
    locale === "he" ? "he-IL" : "en-US",
    { dateStyle: "long" }
  ).format(new Date(profile?.created_at ?? user.createdAt));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await updateProfileAction({
        fullName: fullName.trim(),
        phone: phone.trim(),
      });
      if (error) {
        toast.error(tAuth("errors.generic"));
        return;
      }
      toast.success(t("saved"));
      refresh();
    } catch {
      toast.error(tAuth("errors.generic"));
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <Shell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            {displayName ? t("welcome", { name: displayName }) : t("welcomeNoName")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("memberSince")}: {memberSince}
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut} className="gap-2">
          <LogOut className="size-4 rtl:-scale-x-100" />
          {tNav("logout")}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <Card className="bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading">{t("detailsTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="acc-email">{t("email")}</Label>
                <Input
                  id="acc-email"
                  dir="ltr"
                  value={user.email ?? ""}
                  disabled
                  className="text-start opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-name">{t("name")}</Label>
                <Input
                  id="acc-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="acc-phone">{t("phone")}</Label>
                <Input
                  id="acc-phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="text-start"
                />
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="bg-brand-gradient font-semibold text-white hover:brightness-110"
              >
                {saving ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : (
                  t("save")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="h-fit bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading">{t("quickTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <WhatsAppIcon className="size-5 text-brand-2" />
              {t("quickWhatsapp")}
            </a>
            <Link
              href="/pricing"
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Gem className="size-5 text-brand-2" />
              {t("quickPricing")}
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Briefcase className="size-5 text-brand-2" />
              {t("quickPortfolio")}
            </Link>
            {profile?.is_admin && (
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-xl border border-brand-2/40 bg-brand-2/5 p-3 text-sm font-semibold transition-colors hover:bg-brand-2/10"
              >
                <ShieldCheck className="size-5 text-brand-2" />
                {tNav("admin")}
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-svh px-4 pb-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}
