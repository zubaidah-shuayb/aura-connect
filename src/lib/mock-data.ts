import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Person = {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos: string[];
  distance: string;
  city: string;
  online: boolean;
  lastActive: string;
  bio: string;
  intention: string;
  interests: string[];
  prompt: { q: string; a: string }[];
  lifestyle: { label: string; value: string }[];
  voiceIntro: { title: string; length: string };
  timeline: { year: string; event: string }[];
  funFact: string;
  compatibility: number;
};

const mk = (
  id: string,
  name: string,
  age: number,
  photo: string,
  o: Partial<Person>,
): Person => ({
  id,
  name,
  age,
  photo,
  photos: [photo],
  distance: "2 km away",
  city: "Lisbon",
  online: true,
  lastActive: "Active now",
  bio: "",
  intention: "Something real, unhurried",
  interests: [],
  prompt: [],
  lifestyle: [
    { label: "Pets", value: "One very opinionated cat" },
    { label: "Travel", value: "Slow trains over fast flights" },
    { label: "Music", value: "Ambient, jazz, and 90s R&B" },
    { label: "Movies", value: "Wong Kar-wai marathons" },
    { label: "Food", value: "Anything with too much garlic" },
    { label: "Goals", value: "Build a studio by the sea" },
  ],
  voiceIntro: { title: "A little about me", length: "0:24" },
  timeline: [
    { year: "2019", event: "Moved cities with two suitcases" },
    { year: "2022", event: "Learned to develop film at home" },
    { year: "2025", event: "Started a Sunday supper club" },
  ],
  funFact: "I can name any song within three seconds.",
  compatibility: 88,
  ...o,
});

export const people: Person[] = [
  mk("mira", "Mira", 29, p1, {
    photos: [p1, p3, p5],
    distance: "1.2 km away",
    bio: "Architect by day, ceramicist by weekend. I collect doorways and long dinners.",
    interests: ["Ceramics", "Film photography", "Natural wine", "Jazz", "Cold swims"],
    prompt: [
      { q: "The way to win me over", a: "Send me a photo of a beautiful staircase." },
      { q: "A perfect Sunday", a: "Market, kiln, six hours of cooking, no plans after." },
    ],
    compatibility: 94,
    funFact: "I have made 212 mugs and kept exactly two.",
  }),
  mk("theo", "Theo", 33, p2, {
    photos: [p2, p6],
    distance: "3.4 km away",
    online: false,
    lastActive: "Active 2h ago",
    bio: "Sound designer. I fall asleep to field recordings and wake up to espresso.",
    interests: ["Analog synths", "Surfing", "Bread", "Vinyl", "Hiking"],
    prompt: [
      { q: "My most controversial take", a: "Silence is the best track on any album." },
      { q: "Together we could", a: "Record the city at 5am and call it art." },
    ],
    compatibility: 91,
  }),
  mk("amara", "Amara", 31, p3, {
    photos: [p3, p1],
    distance: "800 m away",
    bio: "Neuroscientist who dances badly and confidently. Ask me about memory.",
    interests: ["Salsa", "Neuroscience", "Poetry", "Running", "Cooking"],
    prompt: [
      { q: "I geek out on", a: "How memory rewrites itself every time you tell a story." },
      { q: "First date energy", a: "Espresso, a long walk, and zero small talk." },
    ],
    compatibility: 96,
  }),
  mk("kenji", "Kenji", 28, p4, {
    photos: [p4, p2],
    distance: "5.1 km away",
    online: false,
    lastActive: "Active yesterday",
    bio: "Product designer. Quietly competitive at bouldering and crosswords.",
    interests: ["Bouldering", "Design", "Ramen", "Chess", "Cycling"],
    prompt: [
      { q: "Two truths", a: "I've never lost a crossword race. I have lost every arm wrestle." },
      { q: "I'm looking for", a: "Someone who texts like a human, not a headline." },
    ],
    compatibility: 89,
  }),
  mk("elena", "Elena", 44, p5, {
    photos: [p5, p3],
    distance: "6.8 km away",
    bio: "Gallery curator. Two grown kids, one small boat, endless curiosity.",
    interests: ["Contemporary art", "Sailing", "Opera", "Gardening", "Travel"],
    intention: "A partner in slow adventures",
    prompt: [
      { q: "Life lately", a: "Learning to sail alone and loving the quiet of it." },
      { q: "Best gift I've received", a: "A hand-drawn map of a place we hadn't been yet." },
    ],
    compatibility: 87,
  }),
  mk("mateo", "Mateo", 36, p6, {
    photos: [p6, p4],
    distance: "2.7 km away",
    bio: "Chef. I measure friendships in shared meals. Currently obsessed with fermentation.",
    interests: ["Fermentation", "Football", "Guitar", "Markets", "Dogs"],
    prompt: [
      { q: "My love language", a: "Feeding you something you didn't know you needed." },
      { q: "Weekend plan", a: "Market at 7, kitchen till 2, rooftop after." },
    ],
    compatibility: 92,
  }),
];

export const byId = (id: string) => people.find((p) => p.id === id);

export const sections: { title: string; subtitle: string; ids: string[]; kind?: "tall" | "wide" }[] = [
  { title: "People around you", subtitle: "Within 5 km, right now", ids: ["mira", "amara", "mateo", "theo"], kind: "tall" },
  { title: "Recommended for you", subtitle: "Curated by how you connect", ids: ["amara", "mira", "kenji"], kind: "wide" },
  { title: "Online now", subtitle: "Say something before the moment passes", ids: ["mira", "amara", "mateo"], kind: "tall" },
  { title: "Shared interests", subtitle: "You both love film and slow mornings", ids: ["theo", "kenji", "elena"], kind: "tall" },
  { title: "Hidden gems", subtitle: "Profiles that deserve a second look", ids: ["elena", "kenji"], kind: "wide" },
  { title: "New people", subtitle: "Joined this week near you", ids: ["kenji", "mateo", "elena"], kind: "tall" },
  { title: "Recently active", subtitle: "Around in the last hour", ids: ["mateo", "theo", "mira"], kind: "tall" },
  { title: "Trending", subtitle: "Most saved profiles in Lisbon", ids: ["amara", "mateo"], kind: "wide" },
];

export const events = [
  { id: "e1", title: "Natural wine & vinyl", when: "Thu · 19:30", where: "Alfama rooftop", going: 24, tag: "Tonight" },
  { id: "e2", title: "Sunrise sea swim", when: "Sat · 06:45", where: "Praia do Guincho", going: 11, tag: "This week" },
  { id: "e3", title: "Analog photo walk", when: "Sun · 16:00", where: "Príncipe Real", going: 38, tag: "Popular" },
  { id: "e4", title: "Supper club: six strangers", when: "Fri · 20:00", where: "Santos", going: 6, tag: "Almost full" },
];

export const interests = [
  "Ceramics", "Film photography", "Natural wine", "Jazz", "Cold swims", "Bouldering",
  "Design", "Ramen", "Chess", "Cycling", "Salsa", "Poetry", "Running", "Cooking",
  "Surfing", "Vinyl", "Hiking", "Gardening", "Opera", "Sailing", "Fermentation", "Dogs",
];

export const conversations = [
  {
    id: "amara",
    unread: 2,
    preview: "Okay but the staircase thing was a test and you passed",
    time: "now",
    messages: [
      { from: "them", text: "Your kiln photos are unfair. I have kitchen envy.", time: "18:02" },
      { from: "me", text: "It's 80% mess, 20% mug. Come see the mess sometime.", time: "18:05" },
      { from: "them", text: "Okay but the staircase thing was a test and you passed", time: "18:06" },
    ],
  },
  {
    id: "theo",
    unread: 0,
    preview: "Voice note · 0:18",
    time: "2h",
    messages: [
      { from: "them", text: "Recorded the trams at 5am. Sending you the good one.", time: "07:12" },
      { from: "me", text: "That is the most romantic thing anyone has sent me.", time: "07:40" },
    ],
  },
  {
    id: "mira",
    unread: 1,
    preview: "Sunday? I'll bring the bad wine.",
    time: "1d",
    messages: [
      { from: "them", text: "Sunday? I'll bring the bad wine.", time: "21:15" },
    ],
  },
];

export const icebreakers = [
  "Ask about the 212 mugs.",
  "You both swim in cold water — compare the worst one.",
  "Send a photo of the last beautiful doorway you saw.",
  "Plan a Sunday that starts at a market.",
];

export const notifications = [
  { id: "n1", kind: "match", text: "You and Amara matched", time: "2m", who: "amara" },
  { id: "n2", kind: "like", text: "Mira saved your profile", time: "1h", who: "mira" },
  { id: "n3", kind: "event", text: "Analog photo walk starts in 2 days", time: "3h", who: "theo" },
  { id: "n4", kind: "insight", text: "Your profile felt 34% warmer this week", time: "1d", who: "kenji" },
];
