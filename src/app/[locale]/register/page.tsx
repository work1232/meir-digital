import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.register" });
  return { title: t("title"), description: t("description"), robots: { index: false } };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RegisterContent />;
}

function RegisterContent() {
  const t = useTranslations("auth.register");
  return (
    <AuthShell title={t("title")} subtitle={t("subtitle")}>
      <RegisterForm />
    </AuthShell>
  );
}
