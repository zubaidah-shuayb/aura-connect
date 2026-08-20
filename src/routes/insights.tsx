import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Glass, SuccessBurst } from "@/components/app/primitives";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "AI insights — Zee Connect" },
      { name: "description", content: "A gentle read on how your profile comes across, what resonates and what to try next." },
      { property: "og:title", content: "AI insights — Zee Connect" },
      { property: "og:description", content: "How your profile comes across, and what to try next." },
    ],
  }),
  component: Insights,
});

const stats = [
  { label: "Warmth", value: 84 },
  { label: "Clarity of intent", value: 71 },
  { label: "Conversation starters", value: 92 },
];

function Insights() {
  return (
    <AppShell>
      <ScreenHeader eyebrow="Reflection" title="How you come across" back="/me" />
      <div className="space-y-5 px-5">
        <SuccessBurst label="Your profile felt 34% warmer this week" />

        <Glass className="p-6">
          {stats.map((s, i) => (
            <div key={s.label} className={i ? "mt-5" : ""}>
              <div className="flex justify-between text-sm">
                <span>{s.label}</span>
                <span className="text-muted-foreground">{s.value}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-fill h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </Glass>

        <Glass className="p-6">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            <Sparkles className="size-4" /> Try this week
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>Record a 20-second voice intro — profiles with voice get 2.4× more replies.</li>
            <li>Your third photo does the most work. Move it first.</li>
            <li>You answer fastest in the evening; that's when your best conversations start.</li>
          </ul>
        </Glass>
      </div>
    </AppShell>
  );
}
