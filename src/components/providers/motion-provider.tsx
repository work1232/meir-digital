"use client";

import { MotionConfig } from "framer-motion";

/**
 * Respects the visitor's prefers-reduced-motion setting for all
 * framer-motion animations, without SSR/client branching (which would
 * cause hydration mismatches).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
