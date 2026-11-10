import { Link, useParams } from "react-router-dom";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { notes } from "../data/notes";

export function NotesPage() {
  return (
    <div className="simple-page"><SiteNav /><main id="main" className="section-shell notes-page">
      <h1>Notes</h1>
      {notes.length === 0 ? <p className="notes-empty">No notes yet.</p> : (
        <ul className="notes-list">{notes.map((note) => <li key={note.slug}><Link to={`/notes/${note.slug}`}><h2>{note.title}</h2><time dateTime={note.date}>{note.date}</time></Link></li>)}</ul>
      )}
    </main><SiteFooter /></div>
  );
}

export function NotePage() {
  const { slug } = useParams();
  const note = notes.find((entry) => entry.slug === slug);
  return (
    <div className="simple-page"><SiteNav /><main id="main" className="section-shell notes-page note-page">
      <Link to="/notes" className="article-back">← Notes</Link>
      {note ? <article><h1>{note.title}</h1><time dateTime={note.date}>{note.date}</time>{note.paragraphs.map((paragraph, index) => <p key={`${note.slug}-${index}`}>{paragraph}</p>)}</article> : <><h1>Note not found</h1><p>This note is not available.</p></>}
    </main><SiteFooter /></div>
  );
}
