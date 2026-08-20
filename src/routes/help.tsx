import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Glass } from "@/components/app/primitives";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & safety — Zee Connect" },
      { name: "description", content: "Answers about safety, privacy and meeting people well — plus how to reach a human." },
      { property: "og:title", content: "Help & safety — Zee Connect" },
      { property: "og:description", content: "Safety, privacy and how to reach a human." },
    ],
  }),
  component: Help,
});

const faqs = [
  { q: "How does resonance work?", a: "We compare interests, intentions and rhythms — how and when you like to talk — then surface a small number of people, not an endless feed." },
  { q: "Who can see my distance?", a: "Only approximate distance, and only if you allow it in Settings. It never shows a precise location." },
  { q: "Can I take a break?", a: "Yes. Pause discovery in Settings and your profile disappears until you return. Conversations stay waiting." },
  { q: "How do I report someone?", a: "Open their profile, tap share, then Report. Our team reviews every report within a few hours." },
];

function Help() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <AppShell>
      <ScreenHeader eyebrow="Support" title="Help & safety" back="/me" />
      <div className="space-y-4 px-5">
        <Glass className="flex items-center gap-4 p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-destructive/15 text-destructive">
            <AlertTriangle className="size-5" />
          </span>
          <div className="flex-1">
            <p className="font-medium">Something feels wrong?</p>
            <p className="text-xs text-muted-foreground">Tell us and we'll act quickly.</p>
          </div>
          <Btn size="sm" variant="glass">Report</Btn>
        </Glass>

        {faqs.map((f, i) => (
          <Glass key={f.q} className="overflow-hidden p-0">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-4 p-5 text-left">
              <span className="flex-1 font-medium">{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }}>
                <ChevronDown className="size-5 text-muted-foreground" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-sm text-muted-foreground"
                >
                  {f.a}
                </motion.p>
              )}
            </AnimatePresence>
          </Glass>
        ))}
      </div>
    </AppShell>
  );
}
