import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppShell } from "@/components/app/shell";
import { Btn, Chip, Glass } from "@/components/app/primitives";
import { THEMES, useTheme } from "@/lib/theme";
import { interests } from "@/lib/mock-data";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome to Zee Connect" },
      { name: "description", content: "Set your appearance theme and the things you love, then start discovering." },
      { property: "og:title", content: "Welcome to Zee Connect" },
      { property: "og:description", content: "Choose a theme, choose what you love, and begin." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const [step, setStep] = useState(0);
  const { theme, setTheme, mode, setMode } = useTheme();
  const [picked, setPicked] = useState<string[]>(["Ceramics", "Jazz"]);
  const navigate = useNavigate();

  const toggle = (i: string) =>
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <AppShell nav={false} className="min-h-screen">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.section
            key="splash"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-screen flex-col items-center justify-center px-8 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="gradient-fill mb-10 size-28 rounded-full blur-[2px]"
            />
            <p className="text-[11px] font-semibold tracking-[0.42em] text-muted-foreground uppercase">Zee Connect</p>
            <h1 className="display mt-4 text-5xl leading-[1.05]">
              Meeting someone
              <br />
              <span className="gradient-text">should feel calm.</span>
            </h1>
            <p className="mt-5 max-w-sm text-[15px] text-muted-foreground">
              No endless swiping. Just a quiet, beautiful place to notice people — and be noticed back.
            </p>
            <Btn size="lg" className="mt-10 w-full max-w-xs" onClick={() => setStep(1)}>
              Begin
            </Btn>
          </motion.section>
        )}

        {step === 1 && (
          <motion.section
            key="theme"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="px-5 pt-[max(40px,env(safe-area-inset-top))]"
          >
            <h1 className="display text-4xl leading-tight">Choose how Zee Connect feels</h1>
            <p className="mt-2 text-sm text-muted-foreground">Seven appearances. Change it any time in settings.</p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {THEMES.map((t) => (
                <motion.button
                  key={t.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setTheme(t.id)}
                  className={`glass min-h-24 rounded-3xl p-4 text-left ${theme === t.id ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex gap-1.5">
                    {t.swatch.map((c) => (
                      <span key={c} className="size-5 rounded-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <p className="mt-3 font-medium">{t.name}</p>
                </motion.button>
              ))}
            </div>

            <Glass className="mt-5 flex items-center justify-between p-4">
              <div>
                <p className="font-medium">Appearance</p>
                <p className="text-xs text-muted-foreground">Light or dark, your eyes decide</p>
              </div>
              <div className="flex gap-2">
                <Chip active={mode === "light"} onClick={() => setMode("light")}>Light</Chip>
                <Chip active={mode === "dark"} onClick={() => setMode("dark")}>Dark</Chip>
              </div>
            </Glass>

            <div className="mt-8 flex gap-3">
              <Btn variant="glass" size="lg" onClick={() => setStep(0)}>Back</Btn>
              <Btn size="lg" className="flex-1" onClick={() => setStep(2)}>Continue</Btn>
            </div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section
            key="interests"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="px-5 pt-[max(40px,env(safe-area-inset-top))]"
          >
            <h1 className="display text-4xl leading-tight">What do you love?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Pick a few. We use them to find real overlap, not noise.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {interests.map((i) => (
                <Chip key={i} active={picked.includes(i)} onClick={() => toggle(i)}>
                  {i}
                </Chip>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">{picked.length} selected</p>
            <div className="mt-6 flex gap-3 pb-10">
              <Btn variant="glass" size="lg" onClick={() => setStep(1)}>Back</Btn>
              <Btn size="lg" className="flex-1" onClick={() => navigate({ to: "/" })}>
                Enter Zee Connect
              </Btn>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
