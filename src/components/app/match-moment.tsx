import { AnimatePresence, motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import type { Person } from "@/lib/mock-data";
import { Btn } from "./primitives";

const particles = Array.from({ length: 26 }, (_, i) => i);

export function MatchMoment({
  person,
  open,
  onClose,
}: {
  person: Person;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-background/70 px-6 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.6, 1.35], opacity: [0, 0.9, 0.55] }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            className="gradient-fill pointer-events-none absolute size-[26rem] rounded-full blur-[90px]"
          />
          {particles.map((i) => {
            const angle = (i / particles.length) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: Math.cos(angle) * (120 + (i % 5) * 42),
                  y: Math.sin(angle) * (150 + (i % 4) * 38),
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.3],
                }}
                transition={{ duration: 2.2 + (i % 5) * 0.2, delay: 0.1 + (i % 7) * 0.06, ease: "easeOut" }}
                className="gradient-fill pointer-events-none absolute size-2 rounded-full"
              />
            );
          })}

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center -space-x-6">
              <motion.img
                src={person.photos[1] ?? person.photo}
                alt="You"
                initial={{ x: -70, rotate: -14, opacity: 0 }}
                animate={{ x: 0, rotate: -7, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.15 }}
                className="size-32 rounded-[2rem] border-2 border-background object-cover elev"
              />
              <motion.img
                src={person.photo}
                alt={person.name}
                initial={{ x: 70, rotate: 14, opacity: 0 }}
                animate={{ x: 0, rotate: 7, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.15 }}
                className="size-32 rounded-[2rem] border-2 border-background object-cover elev"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 text-[11px] font-semibold tracking-[0.4em] text-muted-foreground uppercase"
            >
              A resonance
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="display gradient-text mt-3 text-5xl leading-tight"
            >
              You and {person.name}
              <br />
              found each other
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4 max-w-xs text-sm text-muted-foreground"
            >
              {person.compatibility}% resonance · you both love {person.interests[0]?.toLowerCase()} and long dinners.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35 }}
              className="mt-9 flex w-full max-w-xs flex-col gap-3"
            >
              <Link to="/chat/$id" params={{ id: person.id }} onClick={onClose}>
                <Btn className="w-full" size="lg">
                  Say something
                </Btn>
              </Link>
              <Btn variant="glass" size="lg" onClick={onClose}>
                Keep discovering
              </Btn>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
