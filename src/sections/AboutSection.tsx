import { useState } from "react";
import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";
import { publicAsset } from "../lib/assets";

export function AboutSection() {
  const [photograph, setPhotograph] = useState(false);
  return (
    <section id="about" className="section-shell about-section" aria-labelledby="about-heading"><FadeIn>
      <h1 id="about-heading" className="page-title">About</h1>
      <div className="about-grid">
        <div className="about-copy">
          <p className="about-lead">I’m Varun.<br />I make apps, games, and tools.</p>
          <a className="text-link" href="mailto:varorav99@gmail.com">Get in touch ↗</a>
        </div>
        <div className="mango-card">
          <div className="mango-image-wrap">
            <img src={publicAsset(photograph ? "mango/IMG_2973.jpeg" : "art/mango-painted.jpg")} alt={photograph ? "Mango, a black-and-white tuxedo cat, looking into a mirror" : "Painted portrait of Mango resting in a garden"} width="1536" height="1024" loading="lazy" />
            <button className="mango-switch" type="button" aria-pressed={photograph} onClick={() => setPhotograph((current) => !current)}>{photograph ? "Show painting" : "Show photograph"}<span aria-hidden="true">↔</span></button>
          </div>
          <div className="mango-caption"><h2>Mango</h2><Link to="/cat" className="text-link">Photo album ↗</Link></div>
        </div>
      </div>
    </FadeIn></section>
  );
}
