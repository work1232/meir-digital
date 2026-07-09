"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Layered ambient background: subtle grid + floating gradient orbs,
 * echoing the dark-navy grid of the brand logo.
 */
export function AnimatedBackground({
  className,
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "subtle";
}) {
  const orbOpacity = variant === "hero" ? "opacity-30" : "opacity-20";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent)]" />
      <motion.div
        className={cn(
          "absolute -top-32 start-[10%] h-96 w-96 rounded-full bg-[oklch(0.62_0.28_331)] blur-[120px]",
          orbOpacity
        )}
        animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={cn(
          "absolute top-1/4 end-[5%] h-[28rem] w-[28rem] rounded-full bg-[oklch(0.55_0.25_297)] blur-[130px]",
          orbOpacity
        )}
        animate={{ x: [0, -32, 0], y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {variant === "hero" && (
        <motion.div
          className={cn(
            "absolute -bottom-40 start-1/3 h-96 w-96 rounded-full bg-[oklch(0.5_0.2_270)] blur-[140px]",
            orbOpacity
          )}
          animate={{ x: [0, 24, 0], y: [0, -32, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
