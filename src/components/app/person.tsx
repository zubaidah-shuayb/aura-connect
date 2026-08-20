import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import type { Person } from "@/lib/mock-data";
import { SectionTitle } from "./primitives";

export function PersonTall({ p, index = 0 }: { p: Person; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotateX: -4, rotateY: 4, y: -6 }}
      style={{ transformPerspective: 900 }}
      className="shrink-0"
    >
      <Link
        to="/profile/$id"
        params={{ id: p.id }}
        className="group relative block h-72 w-52 overflow-hidden rounded-4xl elev"
      >
        <img
          src={p.photo}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        {p.online && (
          <span className="glass absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium">
            <span className="size-1.5 rounded-full bg-emerald-400" /> Online
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3 text-white">
          <p className="display text-2xl leading-none">
            {p.name} <span className="text-white/70">{p.age}</span>
          </p>
          <p className="mt-1.5 flex items-center gap-1 text-[12px] text-white/80">
            <MapPin className="size-3" /> {p.distance}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function PersonWide({ p, index = 0 }: { p: Person; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0"
    >
      <Link
        to="/profile/$id"
        params={{ id: p.id }}
        className="group glass flex w-[19rem] items-center gap-4 rounded-4xl p-3"
      >
        <div className="relative size-24 shrink-0 overflow-hidden rounded-3xl">
          <img
            src={p.photo}
            alt={p.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="display text-xl leading-tight">
            {p.name}, {p.age}
          </p>
          <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{p.bio}</p>
          <p className="gradient-text mt-2 text-xs font-semibold">{p.compatibility}% resonance</p>
        </div>
      </Link>
    </motion.div>
  );
}

export function Rail({
  title,
  subtitle,
  items,
  kind = "tall",
}: {
  title: string;
  subtitle?: string;
  items: Person[];
  kind?: "tall" | "wide";
}) {
  return (
    <section className="mb-10">
      <SectionTitle title={title} {...(subtitle ? { subtitle } : {})} />
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-2">
        {items.map((p, i) =>
          kind === "tall" ? <PersonTall key={p.id + i} p={p} index={i} /> : <PersonWide key={p.id + i} p={p} index={i} />,
        )}
      </div>
    </section>
  );
}
