import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Chip, EmptyState, Glass, LoadingRail } from "@/components/app/primitives";
import { PersonWide } from "@/components/app/person";
import { interests, people } from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Zee Connect" },
      { name: "description", content: "Search people by name, interest or intention — ceramics, cold swims, slow adventures." },
      { property: "og:title", content: "Search — Zee Connect" },
      { property: "og:description", content: "Search by name, interest or intention." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = q
    ? people.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.interests.some((i) => i.toLowerCase().includes(q.toLowerCase())),
      )
    : [];

  return (
    <AppShell>
      <ScreenHeader eyebrow="Find" title="Search" back="/" />
      <div className="px-5">
        <Glass className="flex items-center gap-3 rounded-full px-5 py-1">
          <SearchIcon className="size-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ceramics, Amara, cold swims…"
            aria-label="Search people and interests"
            className="w-full bg-transparent py-4 text-[15px] outline-none placeholder:text-muted-foreground"
          />
        </Glass>

        {!q && (
          <>
            <p className="mt-7 mb-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Try</p>
            <div className="flex flex-wrap gap-2">
              {interests.slice(0, 10).map((i) => <Chip key={i} onClick={() => setQ(i)}>{i}</Chip>)}
            </div>
            <p className="mt-8 mb-4 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">While you think</p>
            <div className="-mx-5"><LoadingRail /></div>
          </>
        )}
      </div>

      {q && results.length === 0 && (
        <div className="mt-8">
          <EmptyState icon={<SearchIcon className="size-7" />} title="Nothing matched" body={`No one here loves "${q}" yet. Try another word.`} />
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-7 flex flex-col items-center gap-4 px-5">
          {results.map((p, i) => <PersonWide key={p.id} p={p} index={i} />)}
        </div>
      )}
    </AppShell>
  );
}
