import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Glass, Ring } from "@/components/app/primitives";
import { byId, notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Zee Connect" },
      { name: "description", content: "Gentle updates: new resonances, saved profiles, event reminders and weekly insights." },
      { property: "og:title", content: "Notifications — Zee Connect" },
      { property: "og:description", content: "Gentle updates, never noisy." },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <AppShell>
      <ScreenHeader eyebrow="Quiet updates" title="Notifications" back="/" />
      <div className="space-y-3 px-5">
        {notifications.map((n, i) => {
          const p = byId(n.who)!;
          return (
            <motion.div key={n.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link to="/profile/$id" params={{ id: p.id }}>
                <Glass className="flex items-center gap-4 p-4">
                  <Ring src={p.photo} alt={p.name} size={48} live={p.online} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.text}</p>
                    <p className="text-xs text-muted-foreground capitalize">{n.kind} · {n.time} ago</p>
                  </div>
                </Glass>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}
