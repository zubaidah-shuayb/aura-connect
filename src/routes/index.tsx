import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Bell, Search, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app/shell";
import { Btn, Chip, Glass, Ring, SectionTitle } from "@/components/app/primitives";
import { Rail } from "@/components/app/person";
import { MatchMoment } from "@/components/app/match-moment";
import { byId, events, people, sections } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zee Connect — discover people, unhurried" },
      { name: "description", content: "A calm discovery home: people nearby, online now, shared interests, events and hidden gems." },
      { property: "og:title", content: "Zee Connect — discover people, unhurried" },
      { property: "og:description", content: "A calm discovery home for meeting people, designed to feel like the future." },
    ],
  }),
  component: Home,
});

const filters = ["Everyone", "Nearby", "Online", "New", "Events"];

function Home() {
  const [filter, setFilter] = useState("Everyone");
  const [match, setMatch] = useState(false);
  const spotlight = people[2]!;

  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pt-[max(20px,env(safe-area-inset-top))] pb-5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">Lisbon · Thursday</p>
          <h1 className="display mt-1 text-3xl">Good evening, Noa</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/search" aria-label="Search">
            <Btn variant="glass" size="icon"><Search className="size-5" /></Btn>
          </Link>
          <Link to="/notifications" aria-label="Notifications" className="relative">
            <Btn variant="glass" size="icon"><Bell className="size-5" /></Btn>
            <span className="gradient-fill absolute top-1 right-1 size-2.5 rounded-full" />
          </Link>
        </div>
      </header>

      <div className="no-scrollbar mb-7 flex gap-2 overflow-x-auto px-5">
        {filters.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <section className="mb-10 px-5">
        <motion.div whileHover={{ y: -4 }} className="relative overflow-hidden rounded-4xl elev">
          <img src={spotlight.photo} alt={spotlight.name} className="h-[26rem] w-full object-cover" width={768} height={1024} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 text-white">
            <span className="glass mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide">
              <Sparkles className="size-3.5" /> Tonight's resonance
            </span>
            <h2 className="display text-4xl leading-none">
              {spotlight.name}, {spotlight.age}
            </h2>
            <p className="mt-2 max-w-xs text-sm text-white/85">{spotlight.bio}</p>
            <div className="mt-5 flex gap-2">
              <Btn onClick={() => setMatch(true)}>Send resonance</Btn>
              <Link to="/profile/$id" params={{ id: spotlight.id }}>
                <Btn variant="glass">View profile</Btn>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {sections.slice(0, 3).map((s) => (
        <Rail
          key={s.title}
          title={s.title}
          subtitle={s.subtitle}
          kind={s.kind ?? "tall"}
          items={s.ids.map((id) => byId(id)!).filter(Boolean)}
        />
      ))}

      <section className="mb-10">
        <SectionTitle
          title="Events"
          subtitle="Meet in the real world, gently"
          action={
            <Link to="/events" className="text-sm text-primary">
              All
            </Link>
          }
        />
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5">
          {events.slice(0, 3).map((e) => (
            <Glass key={e.id} whileHover={{ y: -4 }} className="w-64 shrink-0 p-5">
              <p className="gradient-text text-xs font-semibold tracking-wide uppercase">{e.tag}</p>
              <h3 className="display mt-2 text-2xl leading-tight">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.when} · {e.where}</p>
              <div className="mt-4 flex items-center gap-2">
                {people.slice(0, 3).map((p) => (
                  <Ring key={p.id} src={p.photo} alt={p.name} size={28} />
                ))}
                <span className="text-xs text-muted-foreground">{e.going} going</span>
              </div>
            </Glass>
          ))}
        </div>
      </section>

      {sections.slice(3).map((s) => (
        <Rail
          key={s.title}
          title={s.title}
          subtitle={s.subtitle}
          kind={s.kind ?? "tall"}
          items={s.ids.map((id) => byId(id)!).filter(Boolean)}
        />
      ))}

      <MatchMoment person={spotlight} open={match} onClose={() => setMatch(false)} />
    </AppShell>
  );
}
