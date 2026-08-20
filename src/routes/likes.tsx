import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Chip, EmptyState, Glass } from "@/components/app/primitives";
import { MatchMoment } from "@/components/app/match-moment";
import { people } from "@/lib/mock-data";

export const Route = createFileRoute("/likes")({
  head: () => ({
    meta: [
      { title: "Likes & matches — Zee Connect" },
      { name: "description", content: "See who noticed you, who you saved, and turn a quiet signal into a conversation." },
      { property: "og:title", content: "Likes & matches — Zee Connect" },
      { property: "og:description", content: "See who noticed you and turn a signal into a conversation." },
    ],
  }),
  component: Likes,
});

function Likes() {
  const [tab, setTab] = useState<"noticed" | "saved" | "matches">("noticed");
  const [match, setMatch] = useState<string | null>(null);
  const noticed = people.slice(0, 4);
  const saved = people.slice(3);
  const matches = people.slice(0, 3);
  const list = tab === "noticed" ? noticed : tab === "saved" ? saved : matches;

  return (
    <AppShell>
      <ScreenHeader eyebrow="Signals" title="Who noticed you" />
      <div className="mb-6 flex gap-2 px-5">
        <Chip active={tab === "noticed"} onClick={() => setTab("noticed")}>Noticed you</Chip>
        <Chip active={tab === "saved"} onClick={() => setTab("saved")}>You saved</Chip>
        <Chip active={tab === "matches"} onClick={() => setTab("matches")}>Matches</Chip>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={<Heart className="size-7" />}
          title="Nothing here yet"
          body="Signals arrive quietly. Keep exploring and they'll show up."
          action={<Link to="/explore"><Btn className="mt-2">Explore people</Btn></Link>}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 px-5">
          {list.map((p, i) => (
            <Glass key={p.id + i} whileHover={{ y: -5 }} className="overflow-hidden p-0">
              <Link to="/profile/$id" params={{ id: p.id }}>
                <img src={p.photo} alt={p.name} loading="lazy" className={`h-52 w-full object-cover ${tab === "noticed" ? "blur-[6px]" : ""}`} />
              </Link>
              <div className="p-4">
                <p className="display text-xl leading-none">{p.name}, {p.age}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.distance}</p>
                <Btn size="sm" className="mt-3 w-full" onClick={() => setMatch(p.id)}>
                  <Sparkles className="size-4" /> Resonate
                </Btn>
              </div>
            </Glass>
          ))}
        </div>
      )}

      {match && (
        <MatchMoment person={people.find((p) => p.id === match)!} open onClose={() => setMatch(null)} />
      )}
    </AppShell>
  );
}
