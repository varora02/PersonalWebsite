import entries from "./notes.json";

// Add only writing supplied or explicitly approved by Varun.
export type Note = {
  slug: string;
  title: string;
  date: string;
  paragraphs: string[];
};

export const notes: Note[] = entries;
