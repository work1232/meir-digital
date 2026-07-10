import { AnimatedBackground } from "@/components/shared/animated-background";
import { LogoMark } from "@/components/brand/logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pb-24 pt-32">
      <AnimatedBackground variant="subtle" />
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/70 p-8 shadow-2xl backdrop-blur-xl md:p-10">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <LogoMark className="h-14" />
          <h1 className="font-heading text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
