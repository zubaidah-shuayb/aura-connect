import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Check, Crown } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Glass } from "@/components/app/primitives";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Zee Connect Gold — slower, deeper discovery" },
      { name: "description", content: "Zee Connect Gold: curated introductions, voice-first profiles, resonance insights and event priority." },
      { property: "og:title", content: "Zee Connect Gold" },
      { property: "og:description", content: "Curated introductions, insights and event priority." },
    ],
  }),
  component: Premium,
});

const perks = [
  "Three curated introductions each week, chosen by resonance",
  "See who noticed you, unblurred",
  "Voice-first profiles and longer voice notes",
  "Priority invitations to Zee Connect events",
  "Deeper insights into how you come across",
  "Travel mode for the cities you love",
];

function Premium() {
  return (
    <AppShell>
      <ScreenHeader eyebrow="Membership" title="Zee Connect Gold" back="/me" />
      <div className="px-5">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="mb-6 flex justify-center">
          <span className="gradient-fill grid size-24 place-items-center rounded-[2rem] text-primary-foreground elev">
            <Crown className="size-10" />
          </span>
        </motion.div>

        <Glass className="p-6">
          <h2 className="display text-3xl leading-tight">Fewer people. <span className="gradient-text">Better evenings.</span></h2>
          <ul className="mt-5 space-y-3">
            {perks.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 text-sm"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {p}
              </motion.li>
            ))}
          </ul>
        </Glass>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { n: "1 month", p: "€19" },
            { n: "6 months", p: "€12", best: true },
            { n: "12 months", p: "€9" },
          ].map((o) => (
            <motion.button
              key={o.n}
              whileTap={{ scale: 0.96 }}
              className={`rounded-3xl border p-4 text-center ${o.best ? "border-primary bg-secondary/60" : "border-border"}`}
            >
              <p className="text-xs text-muted-foreground">{o.n}</p>
              <p className="display mt-1 text-2xl">{o.p}</p>
              <p className="text-[10px] text-muted-foreground">per month</p>
            </motion.button>
          ))}
        </div>

        <Btn size="lg" className="mt-6 w-full">Start 7 days free</Btn>
        <p className="mt-3 text-center text-xs text-muted-foreground">Concept only — nothing is charged.</p>
      </div>
    </AppShell>
  );
}
