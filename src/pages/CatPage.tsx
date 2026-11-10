import { useRef, useState } from "react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { mangoImages } from "../data/mango";
import { publicAsset } from "../lib/assets";

export function CatPage() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  function advance(amount: number) { setSelected((index) => (index + amount + mangoImages.length) % mangoImages.length); }
  return (
    <div className="cat-page"><SiteNav /><main id="main" className="section-shell">
      <div className="cat-intro"><h1>Meet <em>Mango.</em></h1></div>
      <figure className="cat-portrait"><img src={publicAsset("art/mango-painted.jpg")} alt="An oil-painted portrait of Mango resting on a garden bench" width="1536" height="1024" /><figcaption>Painted from Mango’s photographs.</figcaption></figure>
      <div className="section-heading"><div><h2>The photo <em>album.</em></h2></div></div>
      <div className="cat-gallery">{mangoImages.map((filename, index) => <button className="cat-photo" key={filename} aria-label={`Open Mango photo ${index + 1}`} onClick={() => { setSelected(index); dialogRef.current?.showModal(); }}><img src={publicAsset(`mango/${filename}`)} alt={`Mango, photo ${index + 1} from his album`} width="400" height="400" loading="lazy" /></button>)}</div>
      <dialog ref={dialogRef} className="photo-dialog" aria-label="Mango photo viewer" onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); advance(1); } if (event.key === "ArrowLeft") { event.preventDefault(); advance(-1); } }}>
        <img src={publicAsset(`mango/${mangoImages[selected]}`)} alt={`Mango, enlarged photo ${selected + 1}`} />
        <div className="photo-dialog-controls"><button onClick={() => advance(-1)} aria-label="Previous photo">←</button><span aria-live="polite">{selected + 1} / {mangoImages.length}</span><button onClick={() => advance(1)} aria-label="Next photo">→</button><button onClick={() => dialogRef.current?.close()}>Close ✕</button></div>
      </dialog>
    </main><SiteFooter /></div>
  );
}
