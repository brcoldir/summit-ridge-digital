import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CampaignPage } from "./pages/CampaignPage";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-automation" element={<CampaignPage />} />
        <Route path="/ai-lead-systems" element={<CampaignPage />} />
        <Route path="/ai-websites" element={<CampaignPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
