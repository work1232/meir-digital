"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CircleCheck, LoaderCircle, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d+\-\s()]{9,15}$/;

type Errors = Partial<
  Record<"name" | "email" | "phone" | "password", string>
>;

export function RegisterForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [needsLogin, setNeedsLogin] = useState(false);

  const validate = () => {
    const next: Errors = {};
    if (!name.trim()) next.name = t("errors.nameRequired");
    if (!email.trim()) next.email = t("errors.emailRequired");
    else if (!EMAIL_RE.test(email.trim())) next.email = t("errors.emailInvalid");
    if (!phone.trim()) next.phone = t("errors.phoneRequired");
    else if (!PHONE_RE.test(phone.trim())) next.phone = t("errors.phoneInvalid");
    if (!password) next.password = t("errors.passwordRequired");
    else if (password.length < 8) next.password = t("errors.passwordShort");
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
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: name.trim(), phone: phone.trim() },
      },
    });
    setSubmitting(false);

    if (error) {
      const alreadyExists =
        error.code === "user_already_exists" ||
        error.message.toLowerCase().includes("already registered");
      setSubmitError(
        alreadyExists ? t("errors.emailTaken") : t("errors.generic")
      );
      return;
    }

    toast.success(t("register.successTitle"), {
      description: t("register.successDesc"),
    });

    if (data.session) {
      router.push("/account");
    } else {
      // Email confirmation is enabled in Supabase — ask the user to log in
      // after confirming.
      setNeedsLogin(true);
    }
  };

  if (needsLogin) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand-gradient text-white glow-sm">
          <CircleCheck className="size-8" />
        </span>
        <h2 className="font-heading text-xl font-bold">
          {t("register.successTitle")}
        </h2>
        <Button asChild variant="outline">
          <Link href="/login">{t("register.loginLink")}</Link>
        </Button>
      </div>
    );
  }

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
        <Label htmlFor="reg-name">{t("fields.name")}</Label>
        <Input
          id="reg-name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("fields.namePlaceholder")}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && (
          <p className="text-sm text-destructive" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">{t("fields.email")}</Label>
        <Input
          id="reg-email"
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
        <Label htmlFor="reg-phone">{t("fields.phone")}</Label>
        <Input
          id="reg-phone"
          type="tel"
          dir="ltr"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("fields.phonePlaceholder")}
          aria-invalid={Boolean(errors.phone)}
          className="text-start"
        />
        {errors.phone && (
          <p className="text-sm text-destructive" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-password">{t("fields.password")}</Label>
        <Input
          id="reg-password"
          type="password"
          dir="ltr"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("fields.passwordPlaceholder")}
          aria-invalid={Boolean(errors.password)}
        />
        <p className="text-xs text-muted-foreground">
          {t("fields.passwordHint")}
        </p>
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
            {t("register.submitting")}
          </>
        ) : (
          t("register.submit")
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {t("register.hasAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-2 hover:text-brand-1"
        >
          {t("register.loginLink")}
        </Link>
      </p>
    </form>
  );
}
