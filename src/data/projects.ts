export type Project = {
  id: "lifeos" | "virtualpet" | "failureHarness" | "poseguide";
  title: string;
  category: string;
  description: string;
  details: string[];
  status: "Building" | "Live" | "Exploring" | "Archived";
};

export const projects: Project[] = [
  {
    id: "lifeos",
    title: "LifeOS",
    category: "Systems / Product",
    description:
      "A personal operating system for translating reflection, energy, and routines into cleaner execution.",
    details: ["Decision support", "Behavior systems", "React + automation"],
    status: "Building",
  },
  {
    id: "virtualpet",
    title: "VirtualPet",
    category: "Game / Social",
    description:
      "A multiplayer Pomodoro app where your focus sessions keep a shared pet world alive. Study together, grow together.",
    details: ["Multiplayer", "Pomodoro sessions", "React + Canvas"],
    status: "Building",
  },
  {
    id: "failureHarness",
    title: "Failure Harness",
    category: "AI Evaluation",
    description:
      "A local-first LLM evaluation harness for measuring JSON and schema reliability across prompts and model runs.",
    details: ["Schema validation", "Run reports", "Python + Ollama"],
    status: "Building",
  },
  {
    id: "poseguide",
    title: "PoseGuide",
    category: "iOS / Computer Vision",
    description:
      "An iPhone MVP for camera-based pose guidance with simulator-friendly capture flows and pose overlay validation.",
    details: ["SwiftUI", "Vision overlays", "Node backend"],
    status: "Exploring",
  },
];
