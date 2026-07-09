"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Briefcase,
  CircleHelp,
  CircleUserRound,
  Gem,
  Home,
  MessageCircle,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: UserRound },
  { key: "services", href: "/services", icon: Wrench },
  { key: "portfolio", href: "/portfolio", icon: Briefcase },
  { key: "pricing", href: "/pricing", icon: Gem },
  { key: "faq", href: "/faq", icon: CircleHelp },
  { key: "contact", href: "/contact", icon: MessageCircle },
] as const;

const BASE_SIZE = 40;
const MAX_SIZE = 64;

export function Dock() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { user } = useAuth();
  const mouseX = useMotionValue(Infinity);

  return (
    <nav
      aria-label={t("menu")}
      className="pointer-events-none fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center"
    >
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 16 }}
        className="pointer-events-auto flex items-end gap-1 rounded-2xl border border-border bg-background/70 px-2 py-1.5 shadow-2xl backdrop-blur-xl max-[420px]:origin-bottom max-[420px]:scale-[0.85]"
      >
        {NAV.map((item) => (
          <DockItem
            key={item.key}
            mouseX={mouseX}
            href={item.href}
            label={t(item.key)}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
        <div className="mx-1 h-8 w-px self-center bg-border" aria-hidden />
        <DockItem
          mouseX={mouseX}
          href={user ? "/account" : "/login"}
          label={user ? t("account") : t("login")}
          icon={CircleUserRound}
          active={pathname === "/account" || pathname === "/login"}
        />
      </motion.div>
    </nav>
  );
}

function DockItem({
  mouseX,
  href,
  label,
  icon: Icon,
  active,
}: {
  mouseX: MotionValue<number>;
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const size = useSpring(
    useTransform(distance, [-110, 0, 110], [BASE_SIZE, MAX_SIZE, BASE_SIZE]),
    { mass: 0.1, stiffness: 200, damping: 14 }
  );

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center justify-center"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-10 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground shadow-md"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-xl transition-colors",
          active
            ? "bg-brand-gradient text-white shadow-md"
            : "bg-secondary/80 text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon className="size-1/2" strokeWidth={2} />
      </Link>
      <span
        className={cn(
          "absolute -bottom-1.5 h-1 w-1 rounded-full bg-brand-2 transition-opacity",
          active ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      />
    </motion.div>
  );
}
