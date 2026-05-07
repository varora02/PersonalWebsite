import { Route, Routes } from "react-router-dom";
import { CatPage } from "./pages/CatPage";
import { HomePage } from "./pages/HomePage";
import { LifeOSMetricsPage } from "./pages/LifeOSMetricsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cat" element={<CatPage />} />
      <Route path="/experiments/lifeos-metrics" element={<LifeOSMetricsPage />} />
    </Routes>
  );
}
