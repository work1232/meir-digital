import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A muted photo layer that sits behind a section's content and melts into
 * the page background, so text stays readable in both themes.
 */
export function ImageBackdrop({
  src,
  position = "full",
  className,
  priority = false,
}: {
  src: string;
  position?: "full" | "top" | "bottom";
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 -z-10 overflow-hidden",
        position === "full" && "inset-y-0",
        position === "top" && "top-0 h-[32rem]",
        position === "bottom" && "bottom-0 h-[36rem]",
        className
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover opacity-25 saturate-[0.65] dark:opacity-[0.15]"
      />
      <div
        className={cn(
          "absolute inset-0",
          position === "full" &&
            "bg-gradient-to-b from-background via-background/45 to-background",
          position === "top" &&
            "bg-gradient-to-b from-background/70 via-background/40 to-background",
          position === "bottom" &&
            "bg-gradient-to-t from-background/70 via-background/40 to-background"
        )}
      />
    </div>
  );
}
