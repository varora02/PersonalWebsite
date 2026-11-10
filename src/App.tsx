import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { NotesPage, NotePage } from "./pages/NotesPage";
import { CatPage } from "./pages/CatPage";
import { HomePage } from "./pages/HomePage";
import { LifeOSMetricsPage } from "./pages/LifeOSMetricsPage";

export default function AppRouter() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    const pagePath = pathname.replace(/\/+$/, "") || "/";
    document.title = pagePath === "/about" ? "About — Varun Arora" : pagePath.startsWith("/notes") ? "Notes — Varun Arora" : pagePath === "/cat" ? "Mango — Varun Arora" : pagePath.includes("life") ? "Instrumenting my life — Varun Arora" : "Varun Arora — Projects";
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return (
    <div id="top"><a className="skip-link" href="#main">Skip to content</a><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/:slug" element={<NotePage />} />
      <Route path="/writing" element={<Navigate to="/notes" replace />} />
      <Route path="/cat" element={<CatPage />} />
      <Route path="/writing/instrumenting-my-life" element={<LifeOSMetricsPage />} />
      <Route path="/experiments/lifeos-metrics" element={<LifeOSMetricsPage />} />
    </Routes></div>
  );
}
