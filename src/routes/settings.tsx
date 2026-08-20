import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Chip, Glass } from "@/components/app/primitives";
import { THEMES, useTheme } from "@/lib/theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Zee Connect" },
      { name: "description", content: "Choose your appearance theme, light or dark mode, notifications and privacy preferences." },
      { property: "og:title", content: "Settings — Zee Connect" },
      { property: "og:description", content: "Themes, appearance, notifications and privacy." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ label, hint, on, onChange }: { label: string; hint: string; on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex w-full items-center gap-4 py-3 text-left">
      <span className="flex-1">
        <span className="block font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
      <span className={`h-8 w-14 rounded-full p-1 transition-colors ${on ? "gradient-fill" : "bg-muted"}`}>
        <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={`block size-6 rounded-full bg-background ${on ? "ml-6" : ""}`} />
      </span>
    </button>
  );
}

function SettingsPage() {
  const { theme, setTheme, mode, setMode } = useTheme();
  const [prefs, setPrefs] = useState({ quiet: true, reduce: false, distance: true, reads: true });
  const flip = (k: keyof typeof prefs) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <AppShell>
      <ScreenHeader eyebrow="Settings" title="Make it yours" back="/me" />
      <div className="space-y-5 px-5">
        <Glass className="p-5">
          <p className="font-medium">Appearance theme</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {THEMES.map((t) => (
              <motion.button
                key={t.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setTheme(t.id)}
                className={`rounded-3xl border p-4 text-left transition-colors ${theme === t.id ? "border-primary bg-secondary/60" : "border-border"}`}
              >
                <span className="flex gap-1.5">
                  {t.swatch.map((c) => <span key={c} className="size-5 rounded-full" style={{ backgroundColor: c }} />)}
                </span>
                <span className="mt-3 block text-sm font-medium">{t.name}</span>
              </motion.button>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <Chip active={mode === "light"} onClick={() => setMode("light")}>Light</Chip>
            <Chip active={mode === "dark"} onClick={() => setMode("dark")}>Dark</Chip>
          </div>
        </Glass>

        <Glass className="divide-y divide-border px-5 py-2">
          <Toggle label="Quiet hours" hint="No alerts between 22:00 and 08:00" on={prefs.quiet} onChange={() => flip("quiet")} />
          <Toggle label="Reduce motion" hint="Softer, shorter animations" on={prefs.reduce} onChange={() => flip("reduce")} />
          <Toggle label="Show distance" hint="Others see approximate distance" on={prefs.distance} onChange={() => flip("distance")} />
          <Toggle label="Read receipts" hint="Let matches know you've read" on={prefs.reads} onChange={() => flip("reads")} />
        </Glass>

        <Glass className="p-5 text-sm text-muted-foreground">
          Zee Connect v1.0 · A design concept. No account, no backend, all data is local and fictional.
        </Glass>
      </div>
    </AppShell>
  );
}
