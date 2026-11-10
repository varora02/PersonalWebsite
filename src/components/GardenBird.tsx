import { useEffect, useRef, useState } from "react";
import { publicAsset } from "../lib/assets";

type BirdState = "away" | "arriving" | "perched" | "leaving";

export function GardenBird() {
  const [state, setState] = useState<BirdState>("away");
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    const image = new Image();
    image.onload = () => setReady(true);
    image.src = publicAsset("art/garden-bird.png");
    return () => {
      preference.removeEventListener("change", update);
      image.onload = null;
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (state !== "arriving" && state !== "leaving") return;
    // A timer also settles the state if the tab is hidden during the flight.
    timer.current = setTimeout(() => setState(state === "arriving" ? "perched" : "away"), reducedMotion ? 160 : state === "arriving" ? 2300 : 1700);
    return () => clearTimeout(timer.current);
  }, [state, reducedMotion]);

  function toggleBird() {
    if (!ready || state === "arriving" || state === "leaving") return;
    setState(state === "away" ? "arriving" : "leaving");
  }

  return (
    <div className="garden-bird-anchor" data-state={state} data-reduced-motion={reducedMotion}>
      <span className="bird-contact-shadow" aria-hidden="true" />
      {state !== "away" && <span className="garden-bird-flight" aria-hidden="true"><span className="garden-bird-sprite" /></span>}
      <button
        type="button"
        className="garden-bird-button"
        aria-label={state === "perched" || state === "leaving" ? "Let the bird fly away" : "Call a bird to the statue"}
        aria-pressed={state === "perched" || state === "arriving"}
        aria-disabled={!ready || state === "arriving" || state === "leaving"}
        onClick={toggleBird}
      >
        <span className="garden-bird-marker" aria-hidden="true"><span /></span>
      </button>
      <span className="sr-only" role="status">{state === "perched" ? "A bird is perched on the statue’s head." : state === "leaving" ? "The bird flies away." : ""}</span>
    </div>
  );
}
