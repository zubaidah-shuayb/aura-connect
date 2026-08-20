import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const THEMES = [
  { id: "classic", name: "Classic", swatch: ["#c98a4b", "#e0b579", "#f4e3c8"] },
  { id: "midnight", name: "Midnight", swatch: ["#5b5bd6", "#8ea4f2", "#c9b8ff"] },
  { id: "rose", name: "Rose", swatch: ["#d24a63", "#f08aa6", "#ffd4dd"] },
  { id: "ocean", name: "Ocean", swatch: ["#2f7ba8", "#4fb3c0", "#bfe6ea"] },
  { id: "aurora", name: "Aurora", swatch: ["#2fb98a", "#8b6cf0", "#b7f2dc"] },
  { id: "forest", name: "Forest", swatch: ["#2f6b4a", "#6fa86a", "#cfe6c9"] },
  { id: "sunset", name: "Sunset", swatch: ["#e2662f", "#ef8a63", "#ffd9a8"] },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type Mode = "light" | "dark";

type Ctx = {
  theme: ThemeId;
  mode: Mode;
  setTheme: (t: ThemeId) => void;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("classic");
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const t = localStorage.getItem("Zee Connect:theme") as ThemeId | null;
    const m = localStorage.getItem("Zee Connect:mode") as Mode | null;
    if (t) setTheme(t);
    if (m) setMode(m);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset["theme"] = theme;
    root.classList.toggle("dark", mode === "dark");
    localStorage.setItem("Zee Connect:theme", theme);
    localStorage.setItem("Zee Connect:mode", mode);
  }, [theme, mode]);

  const value = useMemo(
    () => ({ theme, mode, setTheme, setMode, toggleMode: () => setMode(mode === "dark" ? "light" : "dark") }),
    [theme, mode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
