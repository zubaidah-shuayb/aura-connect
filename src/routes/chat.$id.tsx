import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, CalendarHeart, Image as ImageIcon, Mic, Send, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app/shell";
import { Btn, Chip, Glass, Ring } from "@/components/app/primitives";
import { byId, conversations, icebreakers } from "@/lib/mock-data";

export const Route = createFileRoute("/chat/$id")({
  loader: ({ params }) => {
    const person = byId(params.id);
    if (!person) throw notFound();
    return { name: person.name };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Chat with ${loaderData.name} — Zee Connect` : "Conversation — Zee Connect" },
      { name: "description", content: "A premium messaging space with voice notes, reactions, icebreakers and date planning." },
      { property: "og:title", content: loaderData ? `Chat with ${loaderData.name}` : "Conversation" },
      { property: "og:description", content: "Voice notes, reactions, icebreakers and date planning." },
    ],
  }),
  component: Chat,
});

type Msg = { from: string; text: string; time: string; reaction?: string | undefined; kind?: "voice" | "plan" };

function Chat() {
  const { id } = Route.useParams();
  const person = byId(id)!;
  const seed = (conversations.find((c) => c.id === id)?.messages ?? []) as Msg[];
  const [msgs, setMsgs] = useState<Msg[]>([
    ...seed,
    { from: "them", text: "Voice note", time: "18:07", kind: "voice" },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text, time: "now" }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "them", text: "Okay, now I'm properly intrigued.", time: "now" }]);
    }, 1800);
  };

  const react = (i: number) =>
    setMsgs((m) => m.map((msg, idx) => (idx === i ? { ...msg, reaction: msg.reaction ? undefined : "✨" } : msg)));

  return (
    <AppShell nav={false}>
      <header className="glass sticky top-0 z-30 mx-3 mt-3 flex items-center gap-3 rounded-full p-2 pr-5">
        <Link to="/messages" aria-label="Back" className="grid size-11 place-items-center rounded-full">
          <ArrowLeft className="size-5" />
        </Link>
        <Link to="/profile/$id" params={{ id: person.id }} className="flex flex-1 items-center gap-3">
          <Ring src={person.photo} alt={person.name} size={40} live={person.online} />
          <div>
            <p className="font-semibold leading-tight">{person.name}</p>
            <p className="text-[11px] text-muted-foreground">{person.lastActive}</p>
          </div>
        </Link>
      </header>

      <div className="px-5 pt-8 pb-40">
        <div className="mb-8 text-center">
          <p className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">You resonated 3 days ago</p>
          <p className="gradient-text mt-1 text-sm font-semibold">
            {person.compatibility}% · you both love {person.interests[0]?.toLowerCase()}
          </p>
        </div>

        <div className="space-y-3">
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
            >
              <motion.button
                whileTap={{ scale: 0.97 }}
                onDoubleClick={() => react(i)}
                onClick={() => react(i)}
                className={`relative max-w-[78%] rounded-3xl px-4 py-3 text-left text-[15px] leading-relaxed ${
                  m.from === "me"
                    ? "gradient-fill rounded-br-lg text-primary-foreground elev"
                    : "glass rounded-bl-lg"
                }`}
              >
                {m.kind === "voice" ? (
                  <span className="flex items-center gap-2">
                    <Mic className="size-4" />
                    <span className="flex items-end gap-[3px]">
                      {[6, 12, 18, 10, 22, 14, 8, 16, 11, 20, 7].map((h, k) => (
                        <motion.span
                          key={k}
                          animate={{ height: [h * 0.5, h, h * 0.6] }}
                          transition={{ duration: 1.1, repeat: Infinity, delay: k * 0.07 }}
                          className="w-[3px] rounded-full bg-current opacity-70"
                          style={{ height: h }}
                        />
                      ))}
                    </span>
                    <span className="text-xs opacity-70">0:18</span>
                  </span>
                ) : (
                  m.text
                )}
                <span className="mt-1 block text-[10px] opacity-60">{m.time}</span>
                <AnimatePresence>
                  {m.reaction && (
                    <motion.span
                      initial={{ scale: 0, y: 6 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      className="glass absolute -bottom-3 right-3 rounded-full px-2 py-0.5 text-xs"
                    >
                      {m.reaction}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex">
                <div className="glass flex items-center gap-1.5 rounded-3xl rounded-bl-lg px-4 py-4">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                      className="size-2 rounded-full bg-foreground/60"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Glass className="mt-8 p-5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <CalendarHeart className="size-4 text-primary" /> Plan something
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Sunday market, then a long lunch in Santos.</p>
          <div className="mt-4 flex gap-2">
            <Btn size="sm" onClick={() => send("Sunday market it is. 10am?")}>Suggest Sunday</Btn>
            <Btn size="sm" variant="glass">Other ideas</Btn>
          </div>
        </Glass>

        <div className="mt-6">
          <p className="mb-3 flex items-center gap-2 px-1 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <Sparkles className="size-3.5" /> Icebreakers
          </p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {icebreakers.map((t) => (
              <Chip key={t} onClick={() => send(t)} className="whitespace-nowrap">{t}</Chip>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(14px,env(safe-area-inset-bottom))]">
        <div className="glass flex w-full max-w-lg items-center gap-2 rounded-full p-2 pl-4">
          <button aria-label="Send photo" className="grid size-10 place-items-center rounded-full text-muted-foreground">
            <ImageIcon className="size-5" />
          </button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(draft)}
            placeholder={`Message ${person.name}`}
            aria-label="Message"
            className="min-w-0 flex-1 bg-transparent py-3 text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <button aria-label="Record voice note" className="grid size-10 place-items-center rounded-full text-muted-foreground">
            <Mic className="size-5" />
          </button>
          <Btn size="icon" aria-label="Send" onClick={() => send(draft)}>
            <Send className="size-5" />
          </Btn>
        </div>
      </div>
    </AppShell>
  );
}
