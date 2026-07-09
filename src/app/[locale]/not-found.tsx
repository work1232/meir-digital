import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedBackground } from "@/components/shared/animated-background";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-32 text-center">
      <AnimatedBackground variant="subtle" />
      <p className="font-heading text-8xl font-extrabold text-gradient md:text-9xl">
        {t("title")}
      </p>
      <h1 className="mt-6 font-heading text-2xl font-bold md:text-3xl">
        {t("heading")}
      </h1>
      <p className="mt-3 text-muted-foreground">{t("desc")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 font-semibold text-white shadow-lg glow-sm transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
      >
        {t("back")}
      </Link>
    </section>
  );
}
