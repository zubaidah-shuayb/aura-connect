import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Glass, Ring, SectionTitle } from "@/components/app/primitives";
import { byId, conversations, people } from "@/lib/mock-data";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Conversations — Zee Connect" },
      { name: "description", content: "Your ongoing conversations, new matches and voice notes in one calm inbox." },
      { property: "og:title", content: "Conversations — Zee Connect" },
      { property: "og:description", content: "A calm inbox for your conversations and new matches." },
    ],
  }),
  component: Messages,
});

function Messages() {
  return (
    <AppShell>
      <ScreenHeader eyebrow="Chats" title="Conversations" />

      <SectionTitle title="New matches" subtitle="Say the first thing" />
      <div className="no-scrollbar mb-9 flex gap-4 px-5">
        {people.map((p) => (
          <Link key={p.id} to="/chat/$id" params={{ id: p.id }} className="flex w-16 shrink-0 flex-col items-center gap-2">
            <Ring src={p.photo} alt={p.name} size={62} live={p.online} />
            <span className="truncate text-xs text-muted-foreground">{p.name}</span>
          </Link>
        ))}
      </div>

      <div className="space-y-3 px-5">
        {conversations.map((c) => {
          const p = byId(c.id)!;
          return (
            <Link key={c.id} to="/chat/$id" params={{ id: c.id }}>
              <Glass whileHover={{ x: 4 }} className="flex items-center gap-4 p-4">
                <Ring src={p.photo} alt={p.name} size={56} live={p.online} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold">{p.name}</p>
                    <span className="text-[11px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{c.preview}</p>
                </div>
                {c.unread > 0 && (
                  <span className="gradient-fill grid size-6 place-items-center rounded-full text-[11px] font-bold text-primary-foreground">
                    {c.unread}
                  </span>
                )}
              </Glass>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
