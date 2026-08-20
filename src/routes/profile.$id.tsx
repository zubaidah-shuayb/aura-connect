import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Mic, Pause, Play, Share2, X } from "lucide-react";
import { AppShell } from "@/components/app/shell";
import { Btn, Glass, Tag } from "@/components/app/primitives";
import { MatchMoment } from "@/components/app/match-moment";
import { byId } from "@/lib/mock-data";

export const Route = createFileRoute("/profile/$id")({
  loader: ({ params }) => {
    const p = byId(params.id);
    if (!p) throw notFound();
    return { name: p.name, bio: p.bio };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Zee Connect profile` : "Profile — Zee Connect" },
      { name: "description", content: loaderData?.bio ?? "An immersive Zee Connect profile." },
      { property: "og:title", content: loaderData ? `${loaderData.name} on Zee Connect` : "Profile" },
      { property: "og:description", content: loaderData?.bio ?? "An immersive Zee Connect profile." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { id } = Route.useParams();
  const p = byId(id)!;
  const [viewer, setViewer] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [match, setMatch] = useState(false);

  return (
    <AppShell nav={false}>
      <div className="relative">
        <motion.img
          src={p.photo}
          alt={p.name}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => setViewer(p.photo)}
          className="h-[34rem] w-full cursor-zoom-in object-cover"
          width={768}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-x-4 top-[max(14px,env(safe-area-inset-top))] flex justify-between">
          <Link to="/" aria-label="Back"><Btn variant="glass" size="icon"><ArrowLeft className="size-5" /></Btn></Link>
          <Btn variant="glass" size="icon" aria-label="Share"><Share2 className="size-5" /></Btn>
        </div>
        <div className="absolute inset-x-5 bottom-4">
          <h1 className="display text-5xl leading-none">{p.name} <span className="text-muted-foreground">{p.age}</span></h1>
          <p className="mt-2 text-sm text-muted-foreground">{p.distance} · {p.lastActive}</p>
        </div>
      </div>

      <div className="space-y-5 px-5 pt-6 pb-40">
        <Glass className="p-5">
          <p className="text-[15px] leading-relaxed">{p.bio}</p>
          <p className="gradient-text mt-4 text-sm font-semibold">{p.compatibility}% resonance with you</p>
        </Glass>

        <Glass className="flex items-center gap-4 p-5">
          <Btn size="icon" aria-label="Play voice intro" onClick={() => setPlaying((v) => !v)}>
            {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
          </Btn>
          <div className="flex-1">
            <p className="flex items-center gap-2 text-sm font-semibold"><Mic className="size-4" /> {p.voiceIntro.title}</p>
            <div className="mt-2 flex items-end gap-[3px]">
              {Array.from({ length: 34 }, (_, i) => 6 + ((i * 7) % 20)).map((h, i) => (
                <motion.span
                  key={i}
                  animate={playing ? { height: [h * 0.4, h, h * 0.5] } : { height: h * 0.6 }}
                  transition={{ duration: 0.9, repeat: playing ? Infinity : 0, delay: i * 0.04 }}
                  className="w-[3px] rounded-full bg-primary/70"
                  style={{ height: h }}
                />
              ))}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{p.voiceIntro.length}</span>
        </Glass>

        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {p.photos.map((ph, i) => (
            <motion.img
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => setViewer(ph)}
              src={ph}
              alt={`${p.name} photo ${i + 1}`}
              loading="lazy"
              className="h-56 w-40 shrink-0 cursor-zoom-in rounded-3xl object-cover"
            />
          ))}
        </div>

        <Glass className="p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Shared interests</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.interests.map((i) => <Tag key={i}>{i}</Tag>)}
          </div>
        </Glass>

        {p.prompt.map((pr) => (
          <Glass key={pr.q} className="p-5">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">{pr.q}</p>
            <p className="display mt-2 text-2xl leading-snug">{pr.a}</p>
          </Glass>
        ))}

        <Glass className="p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Lifestyle</p>
          <div className="mt-3 grid grid-cols-2 gap-4">
            {p.lifestyle.map((l) => (
              <div key={l.label}>
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{l.label}</p>
                <p className="mt-0.5 text-sm">{l.value}</p>
              </div>
            ))}
          </div>
        </Glass>

        <Glass className="p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">A short timeline</p>
          <div className="mt-4 space-y-4">
            {p.timeline.map((t) => (
              <div key={t.year} className="flex gap-4">
                <span className="gradient-text w-12 shrink-0 text-sm font-semibold">{t.year}</span>
                <span className="relative flex-1 border-l border-border pl-4 pb-1 text-sm">
                  <span className="gradient-fill absolute -left-[5px] top-1.5 size-2.5 rounded-full" />
                  {t.event}
                </span>
              </div>
            ))}
          </div>
        </Glass>

        <Glass className="p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Looking for</p>
          <p className="display mt-2 text-2xl">{p.intention}</p>
          <p className="mt-3 text-sm text-muted-foreground">Fun fact — {p.funFact}</p>
        </Glass>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(14px,env(safe-area-inset-bottom))]">
        <div className="glass flex w-full max-w-lg items-center gap-3 rounded-full p-2">
          <Btn variant="glass" size="icon" aria-label="Pass"><X className="size-5" /></Btn>
          <Btn className="flex-1" onClick={() => setMatch(true)}>
            <Heart className="size-5" /> Resonate
          </Btn>
          <Link to="/chat/$id" params={{ id: p.id }} aria-label="Message">
            <Btn variant="glass" size="icon"><MessageCircle className="size-5" /></Btn>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {viewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-xl"
          >
            <motion.img
              layout
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={viewer}
              alt={p.name}
              className="max-h-[85vh] rounded-4xl object-contain"
            />
            <Btn variant="glass" size="icon" className="absolute top-6 right-6" aria-label="Close photo">
              <X className="size-5" />
            </Btn>
          </motion.div>
        )}
      </AnimatePresence>

      <MatchMoment person={p} open={match} onClose={() => setMatch(false)} />
    </AppShell>
  );
}
