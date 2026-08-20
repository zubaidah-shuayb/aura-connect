import { createFileRoute } from "@tanstack/react-router";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Glass, Ring } from "@/components/app/primitives";
import { events, people } from "@/lib/mock-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Zee Connect" },
      { name: "description", content: "Small, warm gatherings near you: supper clubs, photo walks, sunrise swims." },
      { property: "og:title", content: "Events — Zee Connect" },
      { property: "og:description", content: "Small, warm gatherings near you." },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <AppShell>
      <ScreenHeader eyebrow="In real life" title="Small gatherings" back="/me" />
      <div className="space-y-4 px-5">
        {events.map((e) => (
          <Glass key={e.id} whileHover={{ y: -4 }} className="p-6">
            <p className="gradient-text text-xs font-semibold tracking-[0.2em] uppercase">{e.tag}</p>
            <h2 className="display mt-2 text-3xl leading-tight">{e.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{e.when} · {e.where}</p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {people.slice(0, 4).map((p) => <Ring key={p.id} src={p.photo} alt={p.name} size={32} />)}
                </div>
                <span className="text-xs text-muted-foreground">{e.going} going</span>
              </div>
              <Btn size="sm">Save a spot</Btn>
            </div>
          </Glass>
        ))}
      </div>
    </AppShell>
  );
}
