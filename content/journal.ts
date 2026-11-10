/**
 * The journal: shelves first, posts as they are written.
 * Add a post to `posts` and it appears under its shelf.
 */
export type Shelf = { id: string; name: string; holds: string; href?: string };
export type Post = { shelf: string; title: string; date: string; summary: string; href: string };

export const shelves: readonly Shelf[] = [
  { id: "records", name: "Records", holds: "Milestones and recognition, each with its public source.", href: "#records" },
  { id: "reading", name: "Reading", holds: "My path through the Cosmere, one flame per book.", href: "#cosmere" },
  { id: "notes", name: "Notes", holds: "Technical write-ups: things I learned the hard way." },
  { id: "builds", name: "Build logs", holds: "Progress on personal projects, as they happen." },
  { id: "university", name: "University", holds: "Two campuses, two countries: UPTP and Taiwan Tech." },
  { id: "reflections", name: "Reflections", holds: "Longer thoughts on work, games and the road so far." },
];

export const posts: readonly Post[] = [];
