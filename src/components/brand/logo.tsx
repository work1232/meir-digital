"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The logo mark recreates the brand asset as vector data: five dotted
 * streams flowing toward the top-right, colored by a single
 * magenta→violet→indigo gradient across the whole mark.
 */
const STREAMS: { head: [number, number]; tail: [number, number] }[] = [
  { head: [34, 22], tail: [106, 16] },
  { head: [26, 46], tail: [106, 34] },
  { head: [20, 70], tail: [106, 52] },
  { head: [16, 94], tail: [106, 70] },
  { head: [12, 120], tail: [106, 88] },
];

const DOTS_PER_STREAM = 7;

function streamDots(head: [number, number], tail: [number, number]) {
  return Array.from({ length: DOTS_PER_STREAM }, (_, i) => {
    const t = i / (DOTS_PER_STREAM - 1);
    return {
      x: head[0] + (tail[0] - head[0]) * t,
      y: head[1] + (tail[1] - head[1]) * t,
      r: 9 * Math.pow(1 - t, 1.15) + 1,
      t,
    };
  });
}

export function LogoMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 118 134"
      className={cn("h-9 w-auto", className)}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient
          id="meir-gradient"
          gradientUnits="userSpaceOnUse"
          x1="14"
          y1="14"
          x2="108"
          y2="120"
        >
          <stop offset="0" stopColor="#E020D0" />
          <stop offset="0.5" stopColor="#9333EA" />
          <stop offset="1" stopColor="#4E5AE8" />
        </linearGradient>
      </defs>
      {STREAMS.map((stream, si) => {
        const dots = streamDots(stream.head, stream.tail);
        return (
          <g key={si}>
            {dots.slice(0, -1).map((dot, di) => {
              const next = dots[di + 1];
              return (
                <line
                  key={di}
                  x1={dot.x}
                  y1={dot.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="url(#meir-gradient)"
                  strokeWidth={next.r * 0.9}
                  strokeLinecap="round"
                />
              );
            })}
            {dots.map((dot, di) =>
              animated ? (
                <motion.circle
                  key={di}
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.r}
                  fill="url(#meir-gradient)"
                  initial={{ opacity: 0.2, scale: 0.6 }}
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: si * 0.12 + dot.t * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: `${dot.x}px ${dot.y}px` }}
                />
              ) : (
                <circle
                  key={di}
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.r}
                  fill="url(#meir-gradient)"
                />
              )
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  textClassName,
  hideText = false,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  hideText?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)} dir="ltr">
      <LogoMark className={markClassName} />
      {!hideText && (
        <span className={cn("flex flex-col leading-none", textClassName)}>
          <span className="whitespace-nowrap font-heading text-base font-extrabold tracking-wide text-foreground">
            MEIR DIGITAL
          </span>
          <span className="mt-1 whitespace-nowrap text-[9px] font-semibold tracking-[0.32em] text-gradient">
            WEB DEVELOPER
          </span>
        </span>
      )}
    </span>
  );
}
