import { Link, NavLink } from "react-router-dom";
import { useSiteTheme } from "./SiteTheme";

export function SiteNav({ light = false }: { light?: boolean }) {
  const { theme, toggleTheme } = useSiteTheme();
  return (
    <header className={`site-header ${light ? "site-header-light" : ""}`}>
      <button type="button" className="wordmark theme-wordmark" onClick={toggleTheme} aria-label={theme === "light" ? "Switch to night colors" : "Switch to daylight colors"} aria-pressed={theme === "dark"} title={theme === "light" ? "Switch to night" : "Switch to daylight"}>va<span>.</span></button>
      <nav aria-label="Main navigation">
        <Link to="/#projects">Projects</Link>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/about">About</NavLink>
        <a href="mailto:varorav99@gmail.com" className="nav-contact">Email <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
