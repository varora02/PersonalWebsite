import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext({ theme: "light" as Theme, toggleTheme: () => {} });

export function SiteTheme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    try { return localStorage.getItem("garden-theme") === "dark" ? "dark" : "light"; }
    catch { return "light"; }
  });
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("garden-theme", theme); } catch { /* Theme still works without storage. */ }
  }, [theme]);
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(current => current === "light" ? "dark" : "light") }}>{children}</ThemeContext.Provider>;
}

export const useSiteTheme = () => useContext(ThemeContext);
