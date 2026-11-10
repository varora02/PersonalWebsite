import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="site-footer compact-footer">
      <div className="section-shell footer-strip">
        <Link to="/" className="footer-signature">Varun Arora<span>© {new Date().getFullYear()}</span></Link>
        <a className="footer-email" href="mailto:varorav99@gmail.com">varorav99@gmail.com ↗</a>
        <nav aria-label="Social links"><a href="https://github.com/varora02" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/varora02/" target="_blank" rel="noreferrer">LinkedIn ↗</a></nav>
      </div>
    </footer>
  );
}
