import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export function FaqSection({ limit }: { limit?: number }) {
  const t = useTranslations("faq");
  const items = (t.raw("items") as { q: string; a: string }[]).slice(
    0,
    limit ?? undefined
  );

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          kicker={t("kicker")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Reveal>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-2xl border border-border bg-card/60 px-6 backdrop-blur"
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="last:border-b-0"
              >
                <AccordionTrigger className="text-start font-heading text-base font-semibold md:text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
