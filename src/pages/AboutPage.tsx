import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { AboutSection } from "../sections/AboutSection";

export function AboutPage() {
  return <div className="simple-page"><SiteNav /><main id="main"><AboutSection /></main><SiteFooter /></div>;
}
