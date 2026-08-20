import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Glass({ className, children, ...rest }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn("glass rounded-3xl", className)} {...rest}>
      {children}
    </motion.div>
  );
}

type BtnProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "glass" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Btn({ variant = "primary", size = "md", className, children, ...rest }: BtnProps) {
  const variants: Record<string, string> = {
    primary: "gradient-fill text-primary-foreground elev",
    glass: "glass text-foreground",
    ghost: "text-muted-foreground hover:text-foreground",
    outline: "border border-border text-foreground",
  };
  const sizes: Record<string, string> = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-base",
    icon: "size-12",
  };
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium select-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full px-4 text-sm font-medium transition-colors",
        active
          ? "gradient-fill text-primary-foreground elev"
          : "glass text-foreground/85",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border/70 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  );
}

export function Ring({
  src,
  alt,
  size = 56,
  live,
}: {
  src: string;
  alt: string;
  size?: number;
  live?: boolean;
}) {
  return (
    <span className="relative inline-block" style={{ width: size, height: size }}>
      <span className="gradient-fill absolute inset-0 rounded-full opacity-90" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-[2px] rounded-full border-2 border-background object-cover"
        style={{ width: size - 4, height: size - 4 }}
      />
      {live && (
        <span className="absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-background bg-emerald-400" />
      )}
    </span>
  );
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 px-5">
      <div>
        <h2 className="display text-2xl">{title}</h2>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded-3xl", className)} />;
}

export function LoadingRail() {
  return (
    <div className="no-scrollbar flex gap-4 overflow-x-auto px-5">
      {[0, 1, 2].map((i) => (
        <SkeletonCard key={i} className="h-64 w-44 shrink-0" />
      ))}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-5 flex flex-col items-center gap-3 rounded-4xl border border-dashed border-border px-8 py-14 text-center"
    >
      <div className="glass animate-float grid size-16 place-items-center rounded-full text-primary">{icon}</div>
      <h3 className="display text-2xl">{title}</h3>
      <p className="max-w-xs text-sm text-muted-foreground">{body}</p>
      {action}
    </motion.div>
  );
}

export function SuccessBurst({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="glass mx-5 flex items-center gap-3 rounded-full px-5 py-3"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 14 }}
        className="gradient-fill grid size-8 place-items-center rounded-full text-primary-foreground"
      >
        ✓
      </motion.span>
      <span className="text-sm font-medium">{label}</span>
    </motion.div>
  );
}
