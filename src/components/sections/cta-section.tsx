import { useTranslations } from "next-intl";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppIcon } from "@/components/shared/icons";
import { ImageBackdrop } from "@/components/shared/image-backdrop";
import { site, whatsappLink } from "@/lib/site";

export function CtaSection({ backdrop }: { backdrop?: string }) {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {backdrop && <ImageBackdrop src={backdrop} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-16 text-center text-white shadow-2xl md:px-16 md:py-20">
            <div className="absolute inset-0 bg-grid opacity-15" aria-hidden />
            <div
              className="absolute -start-20 -top-20 size-64 rounded-full bg-white/15 blur-3xl"
              aria-hidden
            />
            <div
              className="absolute -bottom-24 -end-16 size-72 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h2 className="font-heading text-3xl font-extrabold text-balance sm:text-4xl md:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85 text-pretty md:text-lg">
                {t("subtitle")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={whatsappLink(t("whatsappMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-[oklch(0.45_0.25_297)] shadow-lg transition-all duration-300 hover:bg-white/90 hover:shadow-xl active:scale-[0.98]"
                >
                  <WhatsAppIcon className="size-5" />
                  {t("button")}
                </a>
                <span className="text-sm text-white/80">
                  {t("orCall")}{" "}
                  <a
                    href={site.phoneHref}
                    className="font-bold underline underline-offset-4 hover:text-white"
                    dir="ltr"
                  >
                    {site.phoneDisplay}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
