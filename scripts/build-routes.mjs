import { copyFile, mkdir, readFile } from "node:fs/promises";

// GitHub Pages serves files rather than rewriting requests to the React app.
// Give each public page an entry so shared links and refreshes work too.
const routes = ["about", "notes", "writing", "cat", "writing/instrumenting-my-life", "experiments/lifeos-metrics"];
const notes = JSON.parse(await readFile(new URL("../src/data/notes.json", import.meta.url), "utf8"));
for (const note of notes) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(note.slug)) {
    throw new Error(`Invalid note URL slug: ${note.slug}`);
  }
  routes.push(`notes/${note.slug}`);
}
await Promise.all(routes.map(async (route) => {
  await mkdir(`dist/${route}`, { recursive: true });
  await copyFile("dist/index.html", `dist/${route}/index.html`);
}));
