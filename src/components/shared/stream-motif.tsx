import { cn } from "@/lib/utils";

/**
 * The brand "flowing dots" motif distilled to a single horizontal stream —
 * dots that taper as they trail off, echoing the logo. Used as a signature
 * divider under headings and beside kickers.
 */
export function StreamMotif({
  className,
  dots = 5,
  dir = "ltr",
}: {
  className?: string;
  dots?: number;
  dir?: "ltr" | "rtl";
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-hidden
      dir={dir}
    >
      {Array.from({ length: dots }, (_, i) => {
        const t = i / (dots - 1);
        const size = 3 + (1 - t) * 6;
        return (
          <span
            key={i}
            className="rounded-full bg-brand-gradient"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.35 + (1 - t) * 0.65,
            }}
          />
        );
      })}
    </span>
  );
}
