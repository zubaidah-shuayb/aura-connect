import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { SlidersHorizontal } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Chip, Glass } from "@/components/app/primitives";
import { PersonTall } from "@/components/app/person";
import { people } from "@/lib/mock-data";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore people — Zee Connect" },
      { name: "description", content: "Browse a living mosaic of people nearby, with gentle filters for distance, intent and interests." },
      { property: "og:title", content: "Explore people — Zee Connect" },
      { property: "og:description", content: "A living mosaic of people nearby, with gentle filters." },
    ],
  }),
  component: Explore,
});

const lenses = ["Mosaic", "Nearby", "Intentions", "Interests"];

function Explore() {
  const [lens, setLens] = useState("Mosaic");
  const [filters, setFilters] = useState(false);
  const [distance, setDistance] = useState(12);

  return (
    <AppShell>
      <ScreenHeader
        eyebrow="Explore"
        title="A city full of maybes"
        right={
          <Btn variant="glass" size="icon" aria-label="Filters" onClick={() => setFilters((f) => !f)}>
            <SlidersHorizontal className="size-5" />
          </Btn>
        }
      />

      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto px-5">
        {lenses.map((l) => (
          <Chip key={l} active={lens === l} onClick={() => setLens(l)}>{l}</Chip>
        ))}
      </div>

      {filters && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5">
          <Glass className="mb-6 p-5">
            <p className="font-medium">Distance</p>
            <input
              type="range"
              min={1}
              max={50}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="mt-3 h-2 w-full accent-[var(--primary)]"
              aria-label="Maximum distance"
            />
            <p className="mt-1 text-sm text-muted-foreground">Within {distance} km</p>
            <p className="mt-5 font-medium">Looking for</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Something real", "Slow adventures", "Friends first", "Open to anything"].map((x, i) => (
                <Chip key={x} active={i === 0}>{x}</Chip>
              ))}
            </div>
          </Glass>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4 px-5">
        {[...people, ...people].map((p, i) => (
          <div key={p.id + i} className={i % 5 === 0 ? "col-span-2" : ""}>
            <div className={i % 5 === 0 ? "[&>div>a]:h-80 [&>div>a]:w-full" : "[&>div>a]:w-full"}>
              <PersonTall p={p} index={i} />
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
