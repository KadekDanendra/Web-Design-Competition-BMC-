import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, Lang } from "./i18n";

type Theme = "light" | "dark";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  t: typeof translations.id;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
  }, [theme]);

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t: translations[lang] }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const c = useContext(AppContext);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
