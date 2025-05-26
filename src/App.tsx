
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsHome from "./components/EventsHome";
import EventDetail from "./components/EventDetail";
import CreateEvent from "./components/CreateEvent";
import DeliveryDashboard from "./components/DeliveryDashboard";
import OrderHistory from "./components/OrderHistory";
import PartnerPortal from "./components/PartnerPortal";
import NotFound from "./pages/NotFound";
import TabBar from "./components/TabBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-16">
          <Routes>
            <Route path="/" element={<EventsHome />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/partner-portal" element={<PartnerPortal />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <TabBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
