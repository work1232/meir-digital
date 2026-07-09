import { useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/shared/icons";
import { Separator } from "@/components/ui/separator";
import { navKeys, site, whatsappLink } from "@/lib/site";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label={t("common.brand")} className="w-fit">
              <Logo markClassName="h-9" />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <nav aria-label={t("footer.quickLinks")} className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {t("footer.quickLinks")}
            </h3>
            {navKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {t("footer.servicesTitle")}
            </h3>
            {[0, 1, 2, 3].map((i) => (
              <Link
                key={i}
                href="/services"
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {t(`footer.servicesList.${i}`)}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {t("footer.contactTitle")}
            </h3>
            <a
              href={site.phoneHref}
              className="flex w-fit items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <Phone className="size-4 text-brand-2" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
            <a
              href={whatsappLink(t("contact.whatsappCard.message"))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              <WhatsAppIcon className="size-4 text-brand-2" />
              {t("common.whatsapp")}
            </a>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p>{t("footer.rights", { year })}</p>
          <p>{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
