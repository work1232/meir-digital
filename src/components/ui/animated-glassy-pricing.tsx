"use client";

import React, { useRef, useEffect, useState } from "react";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";

// --- Internal Helper Components --- //

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/** Brand background colors fed to the shader per theme (sRGB 0..1). */
const DARK_BG: [number, number, number] = [0.078, 0.078, 0.125];
const LIGHT_BG: [number, number, number] = [0.984, 0.98, 0.988];

export const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<
    [number, number, number]
  >(DARK_BG);

  useEffect(() => {
    const root = document.documentElement;
    const updateColor = () => {
      const isDark = root.classList.contains("dark");
      setBackgroundColor(isDark ? DARK_BG : LIGHT_BG);
    };
    updateColor();
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateColor();
        }
      }
    });
    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    // Ring shader tinted with the brand magenta→violet→indigo palette.
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v = rotate2d(iTime)*uv;
        float m = clamp(v.x*0.5+0.5, 0.0, 1.0);
        vec3 magenta = vec3(0.88, 0.13, 0.82);
        vec3 violet  = vec3(0.58, 0.25, 0.95);
        vec3 indigo  = vec3(0.31, 0.35, 0.91);
        vec3 foregroundColor = mix(
          mix(magenta, violet, smoothstep(0.0, 0.5, m)),
          indigo,
          smoothstep(0.5, 1.0, m)
        );
        vec3 color = mix(uBackgroundColor, foregroundColor, mask);
        color = mix(color, vec3(1.), paintCircle(uv,center,radius,.003).r);
        gl_FragColor = vec4(color, 1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(
          gl.getShaderInfoLog(shader) || "Shader compilation error"
        );
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");
    glBgColorLocationRef.current = gl.getUniformLocation(
      program,
      "uBackgroundColor"
    );

    let animationFrameId: number;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed left-0 top-0 z-0 block h-full w-full bg-background opacity-60 dark:opacity-100"
      aria-hidden
    />
  );
};

// --- EXPORTED Building Blocks --- //

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  currency?: string;
  periodLabel?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  popularLabel?: string;
  buttonVariant?: "primary" | "secondary";
  onSelect?: () => void;
}

export const PricingCard = ({
  planName,
  description,
  price,
  currency = "₪",
  periodLabel,
  features,
  buttonText,
  isPopular = false,
  popularLabel,
  buttonVariant = "primary",
  onSelect,
}: PricingCardProps) => {
  const cardClasses = `
    backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-xl flex-1 w-full md:max-w-xs px-3 py-4 sm:px-5 sm:py-6 md:px-7 md:py-8 flex flex-col transition-all duration-300
    from-black/5 to-black/0 border border-black/10
    dark:from-white/10 dark:to-white/5 dark:border-white/10 dark:backdrop-brightness-[0.91]
    ${
      isPopular
        ? "md:scale-105 relative ring-2 ring-brand-2/40 dark:from-white/20 dark:to-white/10 dark:border-brand-2/40 shadow-2xl glow-sm"
        : ""
    }
  `;
  const buttonClasses = `
    mt-auto w-full py-1.5 text-[10px] sm:text-xs md:py-2.5 md:text-[14px] rounded-xl font-semibold transition font-sans
    ${
      buttonVariant === "primary"
        ? "bg-brand-gradient hover:brightness-110 text-white shadow-md"
        : "bg-black/10 hover:bg-black/20 text-foreground border border-black/20 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20"
    }
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && popularLabel && (
        <div className="absolute -top-3 end-2 rounded-full bg-brand-gradient px-2 py-0.5 text-[9px] font-semibold text-white shadow-md sm:text-[11px] md:-top-4 md:end-4 md:px-3 md:py-1 md:text-[12px]">
          {popularLabel}
        </div>
      )}
      <div className="mb-2 md:mb-3">
        <h3 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-2xl md:text-[34px]">
          {planName}
        </h3>
        <p className="mt-1 font-sans text-[10px] text-foreground/70 sm:text-sm md:text-[15px]">
          {description}
        </p>
      </div>
      <div className="my-3 flex flex-wrap items-baseline gap-1 sm:gap-2 md:my-6">
        <span
          className="font-heading text-xl font-extrabold text-gradient sm:text-3xl md:text-[48px]"
          dir="ltr"
        >
          {currency}
          {price}
        </span>
        {periodLabel && (
          <span className="font-sans text-[9px] text-foreground/70 sm:text-xs md:text-[14px]">
            {periodLabel}
          </span>
        )}
      </div>
      <div className="mb-3 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.1)_50%,transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09)_20%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.09)_80%,transparent)] md:mb-5" />
      <ul className="mb-4 flex flex-col gap-1.5 font-sans text-[9.5px] leading-tight text-foreground/90 sm:text-xs sm:leading-normal md:mb-6 md:gap-2 md:text-[14px]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-1.5 md:gap-2">
            <CheckIcon className="h-2.5 w-2.5 shrink-0 text-brand-1 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />{" "}
            {feature}
          </li>
        ))}
      </ul>
      <RippleButton className={buttonClasses.trim()} onClick={onSelect}>
        {buttonText}
      </RippleButton>
    </div>
  );
};

// --- EXPORTED Customizable Page Component --- //

interface ModernPricingPageProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  plans: PricingCardProps[];
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true,
}: ModernPricingPageProps) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {showAnimatedBackground && <ShaderCanvas />}
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
        <div className="mx-auto mb-14 w-full max-w-5xl text-center">
          <h1 className="font-heading text-[48px] font-bold leading-tight tracking-tight text-gradient md:text-[64px]">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-[16px] text-foreground/80 md:text-[20px]">
            {subtitle}
          </p>
        </div>
        <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-8 md:flex-row md:gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.planName} {...plan} />
          ))}
        </div>
      </main>
    </div>
  );
};
