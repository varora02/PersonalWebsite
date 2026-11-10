import { SiteFooter } from "../components/SiteFooter";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";

export function HomePage() {
  return <><HeroSection /><main id="main"><ProjectsSection /></main><SiteFooter /></>;
}
