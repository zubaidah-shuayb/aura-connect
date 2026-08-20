import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Plus } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Chip, Glass, SuccessBurst } from "@/components/app/primitives";
import { interests } from "@/lib/mock-data";
import p1 from "@/assets/p1.jpg";
import p3 from "@/assets/p3.jpg";
import p5 from "@/assets/p5.jpg";

export const Route = createFileRoute("/edit-profile")({
  head: () => ({
    meta: [
      { title: "Edit your profile — Zee Connect" },
      { name: "description", content: "Arrange photos, write prompts, record a voice intro and choose the interests that matter." },
      { property: "og:title", content: "Edit your profile — Zee Connect" },
      { property: "og:description", content: "Photos, prompts, voice intro and interests." },
    ],
  }),
  component: EditProfile,
});

function EditProfile() {
  const [picked, setPicked] = useState<string[]>(["Ceramics", "Jazz", "Cold swims"]);
  const [bio, setBio] = useState("Architect by day, ceramicist by weekend. I collect doorways and long dinners.");
  const [saved, setSaved] = useState(false);

  return (
    <AppShell>
      <ScreenHeader eyebrow="Your profile" title="Edit" back="/me" />
      <div className="space-y-5 px-5">
        <Glass className="p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Photos</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[p1, p3, p5].map((src, i) => (
              <img key={i} src={src} alt={`Photo ${i + 1}`} loading="lazy" className="aspect-3/4 w-full rounded-2xl object-cover" />
            ))}
            {[0, 1, 2].map((i) => (
              <button key={i} className="grid aspect-3/4 w-full place-items-center rounded-2xl border border-dashed border-border text-muted-foreground">
                <Plus className="size-5" />
              </button>
            ))}
          </div>
        </Glass>

        <Glass className="p-5">
          <label htmlFor="bio" className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">About you</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="mt-3 w-full resize-none rounded-2xl bg-secondary/60 p-4 text-[15px] outline-none focus:ring-2 focus:ring-ring"
          />
        </Glass>

        <Glass className="flex items-center gap-4 p-5">
          <Btn size="icon" aria-label="Record voice intro"><Mic className="size-5" /></Btn>
          <div className="flex-1">
            <p className="font-medium">Voice intro</p>
            <p className="text-xs text-muted-foreground">Not recorded yet — 20 seconds is plenty</p>
          </div>
        </Glass>

        <Glass className="p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Interests</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {interests.map((i) => (
              <Chip
                key={i}
                active={picked.includes(i)}
                onClick={() => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))}
              >
                {i}
              </Chip>
            ))}
          </div>
        </Glass>

        {saved && <SuccessBurst label="Profile saved" />}
        <Btn size="lg" className="w-full" onClick={() => setSaved(true)}>Save changes</Btn>
      </div>
    </AppShell>
  );
}
