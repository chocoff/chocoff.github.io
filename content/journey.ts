export type Stop = {
  id: string;
  kind: "study" | "work";
  place: string;
  placeLong?: string;
  role: string;
  start: string; // display form, e.g. "Mar 2023"
  end: string | null; // null = present
  location?: string;
  summary: string;
  notes?: readonly string[];
  url: string;
  logo: { src: string; width: number; height: number; wide?: boolean };
};

/** Oldest first. The path is drawn in this order. */
export const journey: readonly Stop[] = [
  {
    id: "uptp",
    kind: "study",
    place: "UPTP",
    placeLong: "Universidad Politécnica Taiwán-Paraguay",
    role: "B.S. Computer Science and Information Engineering",
    start: "Mar 2023",
    end: "Dec 2024",
    location: "Paraguay",
    summary:
      "Started the degree in Paraguay. Coursework across UPTP and NTUST: data structures, OOP, AI/ML, operating systems, networks.",
    url: "https://www.uptp.edu.py/",
    logo: { src: "/media/logos/uptp.png", width: 257, height: 75, wide: true },
  },
  {
    id: "cast",
    kind: "work",
    place: "Cast S.A.",
    role: "Software Engineering Intern",
    start: "Dec 2024",
    end: "Feb 2025",
    summary:
      "Developed RASA-based AI conversational agents to automate client support workflows.",
    url: "https://cast.com.py/",
    logo: { src: "/media/logos/cast.svg", width: 64, height: 64 },
  },
  {
    id: "ntust",
    kind: "study",
    place: "NTUST",
    placeLong: "National Taiwan University of Science and Technology (Taiwan Tech)",
    role: "Exchange program, Computer Science and Information Engineering",
    start: "Feb 2025",
    end: "Jun 2026",
    location: "Taipei, Taiwan",
    summary:
      "Continued the degree in Taipei through the UPTP and Taiwan Tech program.",
    url: "https://www.ntust.edu.tw/",
    logo: { src: "/media/logos/ntust.png", width: 415, height: 80, wide: true },
  },
  {
    id: "reekon",
    kind: "work",
    place: "REEKON",
    role: "AI Engineering Intern",
    start: "May 2026",
    end: "Jun 2026",
    summary:
      "Refactored and implemented a new Retrieval-Augmented Generation pipeline with diverse document chunking strategies and Docling.",
    url: "https://reekon.org/",
    logo: { src: "/media/logos/reekon.png", width: 152, height: 32, wide: true },
  },
  {
    id: "igs",
    kind: "work",
    place: "International Games System",
    role: "Software Engineering Intern, Arcade Department",
    start: "Jun 2026",
    end: "Aug 2026",
    location: "New Taipei, Taiwan",
    summary:
      "Developed and implemented the third stage of an arcade IP, including its boss fight and weather mechanics, and presented the results on the arcade machines themselves.",
    url: "https://www.igs.com.tw/en/",
    logo: { src: "/media/logos/igs.png", width: 140, height: 100 },
  },
  {
    id: "dualtti",
    kind: "work",
    place: "Dualtti",
    role: "Software Developer & Client Management",
    start: "Sep 2026",
    end: null,
    location: "Paraguay",
    summary:
      "Building software for a Paraguayan Meta Ads agency, and managing client accounts and their campaigns directly.",
    url: "https://dualtti.com/",
    logo: { src: "/media/logos/dualtti.png", width: 256, height: 256 },
  },
];
