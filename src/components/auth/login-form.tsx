"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email.trim()) next.email = t("errors.emailRequired");
    else if (!EMAIL_RE.test(email.trim())) next.email = t("errors.emailInvalid");
    if (!password) next.password = t("errors.passwordRequired");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const supabase = getSupabase();
    if (!supabase) {
      setSubmitError(t("errors.notConfigured"));
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (error) {
      const message = error.message.toLowerCase();
      const notConfirmed =
        error.code === "email_not_confirmed" ||
        message.includes("not confirmed");
      const invalid =
        error.code === "invalid_credentials" || message.includes("invalid");
      setSubmitError(
        notConfirmed
          ? t("errors.emailNotConfirmed")
          : invalid
            ? t("errors.credentials")
            : t("errors.generic")
      );
      return;
    }

    toast.success(t("login.success"));
    router.push("/account");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {!isSupabaseConfigured && (
        <p
          className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400"
          role="alert"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          {t("errors.notConfigured")}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="login-email">{t("fields.email")}</Label>
        <Input
          id="login-email"
          type="email"
          dir="ltr"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("fields.emailPlaceholder")}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">{t("fields.password")}</Label>
        <Input
          id="login-password"
          type="password"
          dir="ltr"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("fields.passwordPlaceholder")}
          aria-invalid={Boolean(errors.password)}
        />
        {errors.password && (
          <p className="text-sm text-destructive" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-destructive" role="alert">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={submitting}
        className="w-full bg-brand-gradient font-semibold text-white shadow-md transition-all hover:brightness-110"
      >
        {submitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            {t("login.submitting")}
          </>
        ) : (
          t("login.submit")
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t("login.noAccount")}{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-2 hover:text-brand-1"
        >
          {t("login.registerLink")}
        </Link>
      </p>
    </form>
  );
}
