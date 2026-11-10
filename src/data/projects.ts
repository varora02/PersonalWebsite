export const projectFilters = ["All", "Apps", "Games", "AI"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

export type Project = {
  id: string;
  title: string;
  category: Exclude<ProjectFilter, "All">;
  description: string;
  link?: { href: string; label: string };
  image?: { src: string; alt: string };
  nightImage?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    id: "hotwheeler",
    title: "Hot Wheeler",
    category: "Games",
    description: "A 3D toy-car playground with loops, jumps, and drivable worlds.",
    link: { href: "https://hot-wheeler.vercel.app/", label: "Play" },
    image: { src: "projects/hotwheeler/jungle.jpg", alt: "A toy car facing the giant dinosaur skull entrance in Hot Wheeler’s Jurassic Valley" },
  },
  {
    id: "notchling",
    title: "NotchLing",
    category: "Apps",
    description: "A pet by your MacBook notch that follows your coding agents.",
    link: { href: "https://github.com/varora02/NotchLing", label: "Get the app" },
    image: { src: "projects/notchling/preview.png", alt: "NotchLing beside a MacBook notch, with a panel showing coding agents’ status" },
  },
  {
    id: "virtualpet",
    title: "VirtualPet",
    category: "Games",
    description: "A shared pet world that grows while you focus with friends.",
    image: { src: "projects/virtualpet/day.jpg", alt: "VirtualPet’s garden in daylight, with pets, a campsite, and a river" },
    nightImage: { src: "projects/virtualpet/night.jpg", alt: "The same VirtualPet garden at night, with rain, fireflies, and glowing lanterns" },
  },
  {
    id: "lifeos",
    title: "LifeOS",
    category: "Apps",
    description: "A weekly view of my time, habits, and health data.",
    image: { src: "projects/lifeos/earth-overview.svg", alt: "Earth dashboard mockup with sample screen time, location, tasks, and upcoming plans" },
  },
  {
    id: "failureHarness",
    title: "Failure Harness",
    category: "AI",
    description: "Local tests for how reliably language models return structured data.",
    image: { src: "projects/failure-harness/preview.svg", alt: "Failure Harness report preview: five of five JSON schema smoke tests passed using qwen2.5:1.5b" },
  },
  {
    id: "poseguide",
    title: "PoseGuide",
    category: "Apps",
    description: "An iPhone app for camera-based pose guidance.",
  },
];
