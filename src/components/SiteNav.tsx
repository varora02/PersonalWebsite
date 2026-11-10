import { Link, NavLink } from "react-router-dom";

export function SiteNav({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header ${light ? "site-header-light" : ""}`}>
      <Link to="/" className="wordmark" aria-label="Varun Arora — home">va<span>.</span></Link>
      <nav aria-label="Main navigation">
        <Link to="/#projects">Projects</Link>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/about">About</NavLink>
        <a href="mailto:varorav99@gmail.com" className="nav-contact">Email <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
