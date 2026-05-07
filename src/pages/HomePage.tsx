import { SiteFooter } from "../components/SiteFooter";
import { AboutSection } from "../sections/AboutSection";
import { ExperimentsSection } from "../sections/ExperimentsSection";
import { FeaturedProjectSection } from "../sections/FeaturedProjectSection";
import { HeroSection } from "../sections/HeroSection";
import { ProjectsSection } from "../sections/ProjectsSection";

export function HomePage() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <HeroSection />
      <FeaturedProjectSection />
      <ProjectsSection />
      <ExperimentsSection />
      <AboutSection />
      <SiteFooter />
    </div>
  );
}
