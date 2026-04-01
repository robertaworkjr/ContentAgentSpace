
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import NotFound from "./pages/NotFound";
import PromptStore from "./pages/PromptStorePage";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCancel from "./pages/PurchaseCancel";
import ParticleWorld from "./pages/ParticleWorld";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/prompt-store" element={<PromptStore />} />
          <Route path="/success" element={<PurchaseSuccess />} />
          <Route path="/cancel" element={<PurchaseCancel />} />
          <Route path="/particle-world" element={<ParticleWorld />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
