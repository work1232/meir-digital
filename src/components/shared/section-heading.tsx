import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

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
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" aria-hidden />
          {kicker}
        </span>
      )}
      <Tag className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
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
