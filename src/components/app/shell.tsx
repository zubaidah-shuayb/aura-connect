import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Compass, Heart, MessageCircle, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Sparkles },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/likes", label: "Likes", icon: Heart },
  { to: "/messages", label: "Chats", icon: MessageCircle },
  { to: "/me", label: "You", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(14px,env(safe-area-inset-bottom))]">
      <div className="glass pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className="relative grid min-h-12 min-w-13 place-items-center rounded-full px-1"
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="gradient-fill absolute inset-0 rounded-full"
                />
              )}
              <span
                className={cn(
                  "relative flex flex-col items-center gap-0.5 transition-colors",
                  active ? "text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                <span className="text-[10px] font-medium tracking-wide">{label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AppShell({
  children,
  nav = true,
  className,
}: {
  children: ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="aurora-bg" aria-hidden />
      <main
        className={cn(
          "relative z-10 mx-auto w-full max-w-lg",
          nav ? "pb-32" : "pb-10",
          className,
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>
      {nav && <BottomNav />}
    </div>
  );
}

export function ScreenHeader({
  eyebrow,
  title,
  right,
  back,
}: {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
  back?: string;
}) {
  return (
    <header className="flex items-end justify-between gap-4 px-5 pt-[max(24px,env(safe-area-inset-top))] pb-6">
      <div>
        {back && (
          <Link to={back} className="mb-2 inline-block text-sm text-muted-foreground">
            ← Back
          </Link>
        )}
        {eyebrow && (
          <p className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">{eyebrow}</p>
        )}
        <h1 className="display mt-1 text-4xl leading-[1.05]">{title}</h1>
      </div>
      {right}
    </header>
  );
}
