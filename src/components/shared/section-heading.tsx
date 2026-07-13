import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { StreamMotif } from "./stream-motif";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
  as: Tag = "h2",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {kicker && (
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-2">
          <StreamMotif dots={4} />
          {kicker}
        </span>
      )}
      <Tag className="font-display text-3xl leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-[3.25rem]">
        {title}
      </Tag>
      {subtitle && (
        <p className="max-w-2xl text-base text-muted-foreground text-pretty md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
