import { useState } from "react";
import { publicAsset } from "../lib/assets";

type PreviewImage = { src: string; alt: string };

export function DayNightPreview({ day, night }: { day: PreviewImage; night: PreviewImage }) {
  const [dayPercent, setDayPercent] = useState(50);

  return (
    <div className="project-preview day-night-preview">
      <img src={publicAsset(night.src)} alt={night.alt} width="1440" height="821" loading="lazy" />
      <img className="day-night-day" src={publicAsset(day.src)} alt={day.alt} width="1440" height="821" loading="lazy" style={{ clipPath: `inset(0 ${100 - dayPercent}% 0 0)` }} />
      <span className="day-night-label day-label" aria-hidden="true">Day</span>
      <span className="day-night-label night-label" aria-hidden="true">Night</span>
      <span className="day-night-divider" style={{ left: `${dayPercent}%` }} aria-hidden="true"><span>↔</span></span>
      <input
        type="range"
        min="0"
        max="100"
        value={dayPercent}
        onChange={(event) => setDayPercent(Number(event.target.value))}
        aria-label="Compare VirtualPet day and night"
        aria-valuetext={`${dayPercent}% day, ${100 - dayPercent}% night`}
      />
    </div>
  );
}
