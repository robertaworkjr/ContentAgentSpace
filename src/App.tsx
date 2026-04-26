
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "@/components/Analytics";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PromptStore from "./pages/PromptStorePage";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCancel from "./pages/PurchaseCancel";
import PromptGenerator from "./pages/PromptGenerator";
import UpsellPage from "./pages/UpsellPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prompt-store" element={<PromptStore />} />
          <Route path="/prompt-generator" element={<PromptGenerator />} />
          <Route path="/success" element={<PurchaseSuccess />} />
          <Route path="/upsell" element={<UpsellPage />} />
          <Route path="/cancel" element={<PurchaseCancel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
