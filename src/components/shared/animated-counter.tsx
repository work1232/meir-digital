"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (!inView) return;
    // Subscribe before setting the target, so an instant jump (e.g. under
    // prefers-reduced-motion) is not missed.
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest));
    });
    motionValue.set(value);
    const fallback = setTimeout(() => {
      if (ref.current) ref.current.textContent = String(value);
    }, 2000);
    return () => {
      unsubscribe();
      clearTimeout(fallback);
    };
  }, [inView, value, motionValue, spring]);

  return (
    <span className={className} dir="ltr">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
