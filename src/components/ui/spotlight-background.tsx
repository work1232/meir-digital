"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Individual Spotlight element — an elongated, blurred beam of light.
export const Spotlight = ({ className, ...props }: HTMLMotionProps<"div">) => {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl will-change-transform",
        className
      )}
      {...props}
    />
  );
};

/**
 * The three drifting beams alone (no wrapper) — layer this inside any
 * `relative` section. Colors follow the brand palette and adapt to the
 * light/dark theme.
 */
export function SpotlightOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <Spotlight
        initial={{ x: "-50%", y: "-50%", rotate: "0deg" }}
        animate={{
          x: ["-50%", "-30%", "-70%", "-50%"],
          y: ["-50%", "-70%", "-30%", "-50%"],
          rotate: ["0deg", "15deg", "-15deg", "0deg"],
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="start-[18%] top-[30%] h-[36rem] w-52 bg-[radial-gradient(50%_50%_at_50%_50%,var(--brand-1),transparent_70%)] opacity-[0.13] dark:opacity-25 dark:mix-blend-screen"
      />

      <Spotlight
        initial={{ x: "0%", y: "0%", rotate: "0deg" }}
        animate={{
          x: ["0%", "20%", "-20%", "0%"],
          y: ["0%", "30%", "10%", "0%"],
          rotate: ["-20deg", "0deg", "20deg", "-20deg"],
        }}
        transition={{
          duration: 15,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 3,
        }}
        className="start-1/2 -top-24 h-[42rem] w-60 bg-[radial-gradient(50%_50%_at_50%_50%,var(--brand-2),transparent_70%)] opacity-[0.15] dark:opacity-30 dark:mix-blend-screen"
      />

      <Spotlight
        initial={{ x: "0%", y: "0%", rotate: "10deg" }}
        animate={{
          x: ["0%", "-30%", "10%", "0%"],
          y: ["0%", "-20%", "20%", "0%"],
          rotate: ["10deg", "-10deg", "25deg", "10deg"],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 5,
        }}
        className="end-[12%] top-[10%] h-[32rem] w-48 bg-[radial-gradient(50%_50%_at_50%_50%,var(--brand-3),transparent_70%)] opacity-[0.13] dark:opacity-25 dark:mix-blend-screen"
      />
    </div>
  );
}

// SpotlightBackground container — wraps content with the animated beams.
const SpotlightBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <SpotlightOverlay />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightBackground;
