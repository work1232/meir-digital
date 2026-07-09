"use client";

import React, {
  ReactNode,
  useState,
  useMemo,
  MouseEvent,
  CSSProperties,
} from "react";

interface RippleState {
  key: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface RippleButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "ghost";
  rippleColor?: string;
  rippleDuration?: number;
  type?: "button" | "submit";
  ariaLabel?: string;
}

const JS_RIPPLE_KEYFRAMES = `
  @keyframes js-ripple-animation {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  .animate-js-ripple-effect {
    animation: js-ripple-animation var(--ripple-duration) ease-out forwards;
  }
`;

/**
 * Button with a material-style click ripple. The ripple color follows the
 * --button-ripple-color CSS variable (set per theme in globals.css).
 */
const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "default",
  rippleColor: userProvidedRippleColor,
  rippleDuration = 600,
  type = "button",
  ariaLabel,
}) => {
  const [jsRipples, setJsRipples] = useState<RippleState[]>([]);

  const determinedJsRippleColor = useMemo(() => {
    if (userProvidedRippleColor) return userProvidedRippleColor;
    return "var(--button-ripple-color, rgba(0, 0, 0, 0.1))";
  }, [userProvidedRippleColor]);

  const createJsRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple: RippleState = {
      key: Date.now(),
      x,
      y,
      size,
      color: determinedJsRippleColor,
    };
    setJsRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setJsRipples((current) =>
        current.filter((ripple) => ripple.key !== newRipple.key)
      );
    }, rippleDuration);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createJsRipple(event);
      onClick?.(event);
    }
  };

  const jsRippleElements = (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-[inherit]">
      {jsRipples.map((ripple) => (
        <span
          key={ripple.key}
          className="animate-js-ripple-effect absolute rounded-full"
          style={
            {
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: ripple.color,
              "--ripple-duration": `${rippleDuration}ms`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );

  const baseClasses =
    variant === "ghost"
      ? "relative border-none bg-transparent isolate overflow-hidden cursor-pointer px-4 py-2 rounded-lg"
      : "relative border-none overflow-hidden isolate transition-all duration-200 cursor-pointer px-4 py-2 rounded-lg";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
      <button
        type={type}
        aria-label={ariaLabel}
        className={`${baseClasses} ${disabledClasses} ${className}`}
        onClick={handleButtonClick}
        disabled={disabled}
      >
        <span className="pointer-events-none relative z-[1]">{children}</span>
        {jsRippleElements}
      </button>
    </>
  );
};

export { RippleButton };
