import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Calendar, ChevronRight, Crown, HelpCircle, Pencil, Settings, Sparkles } from "lucide-react";
import { AppShell, ScreenHeader } from "@/components/app/shell";
import { Btn, Glass, Tag } from "@/components/app/primitives";
import p1 from "@/assets/p1.jpg";

export const Route = createFileRoute("/me")({
  head: () => ({
    meta: [
      { title: "Your Zee Connect profile" },
      { name: "description", content: "Your profile, resonance insights, premium, events and settings in one calm place." },
      { property: "og:title", content: "Your Zee Connect profile" },
      { property: "og:description", content: "Profile, insights, premium and settings." },
    ],
  }),
  component: Me,
});

const links = [
  { to: "/edit-profile", label: "Edit profile", icon: Pencil, hint: "Photos, prompts, voice" },
  { to: "/insights", label: "AI insights", icon: Sparkles, hint: "How you come across" },
  { to: "/premium", label: "Zee Connect Gold", icon: Crown, hint: "Slower, deeper discovery" },
  { to: "/events", label: "Events", icon: Calendar, hint: "3 near you this week" },
  { to: "/settings", label: "Settings", icon: Settings, hint: "Themes, privacy, alerts" },
  { to: "/help", label: "Help & safety", icon: HelpCircle, hint: "We're here" },
] as const;

function Me() {
  return (
    <AppShell>
      <ScreenHeader eyebrow="You" title="Noa Almeida" />

      <div className="px-5">
        <Glass className="overflow-hidden p-0">
          <div className="relative">
            <img src={p1} alt="Your profile" className="h-64 w-full object-cover" width={768} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-5 bottom-4 text-white">
              <p className="display text-3xl leading-none">Noa, 30</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-white/85">
                <BadgeCheck className="size-4" /> Verified · Lisbon
              </p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground">Profile completeness</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="gradient-fill h-full w-[82%] rounded-full" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">82% — add a voice intro to finish</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Ceramics", "Jazz", "Cold swims", "Film photography"].map((i) => <Tag key={i}>{i}</Tag>)}
            </div>
            <Link to="/edit-profile"><Btn className="mt-5 w-full">Edit profile</Btn></Link>
          </div>
        </Glass>

        <div className="mt-5 space-y-3">
          {links.map(({ to, label, icon: Icon, hint }) => (
            <Link key={to} to={to}>
              <Glass whileHover={{ x: 4 }} className="flex items-center gap-4 p-4">
                <span className="grid size-11 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{label}</span>
                  <span className="block text-xs text-muted-foreground">{hint}</span>
                </span>
                <ChevronRight className="size-5 text-muted-foreground" />
              </Glass>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
