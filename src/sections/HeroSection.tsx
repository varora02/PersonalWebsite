import { useEffect, useRef, type PointerEvent } from "react";
import { GardenBird } from "../components/GardenBird";
import { SiteNav } from "../components/SiteNav";
import { publicAsset } from "../lib/assets";

export function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = hero.current;
    if (!element) return;
    const resize = () => {
      if (!plane.current) return;
      const { width, height } = element.getBoundingClientRect();
      const scale = Math.max(width / 1774, height / 887);
      const artWidth = 1774 * scale;
      const artHeight = 887 * scale;
      const mobile = window.matchMedia("(max-width: 600px)").matches;
      Object.assign(plane.current.style, {
        width: `${artWidth}px`, height: `${artHeight}px`,
        left: `${(width - artWidth) * (mobile ? 0.53 : 0.5)}px`,
        top: `${(height - artHeight) * (mobile ? 0.5 : 0.6)}px`,
      });
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    return () => observer.disconnect();
  }, []);
  function moveGarden(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--garden-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 9}px`);
    event.currentTarget.style.setProperty("--garden-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 6}px`);
  }
  return (
    <section ref={hero} id="home" className="garden-hero" onPointerMove={moveGarden} onPointerLeave={(event) => {
      event.currentTarget.style.setProperty("--garden-x", "0px");
      event.currentTarget.style.setProperty("--garden-y", "0px");
    }}>
      <div className="garden-plane" ref={plane}>
        <img className="garden-art" src={publicAsset("art/garden.jpg")} alt="" loading="eager" width="1774" height="887" />
        <GardenBird />
      </div>
      <div className="garden-shade" />
      <SiteNav light />
      <div className="hero-copy">
        <h1>varun arora</h1>
        <a className="hero-link" href="#projects">Explore <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
