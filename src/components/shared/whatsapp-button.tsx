import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

export function WhatsAppButton({
  text,
  children,
  className,
  variant = "gradient",
  size = "lg",
}: {
  text?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "gradient" | "outline";
  size?: "sm" | "lg";
}) {
  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 active:scale-[0.98]",
        size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm",
        variant === "gradient"
          ? "bg-brand-gradient text-white shadow-lg glow-sm hover:brightness-110 hover:glow"
          : "border border-border bg-secondary/50 text-foreground backdrop-blur hover:bg-secondary",
        className
      )}
    >
      <WhatsAppIcon className={size === "lg" ? "size-5" : "size-4"} />
      {children}
    </a>
  );
}
