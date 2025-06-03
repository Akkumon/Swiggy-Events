
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
import Profile from "./components/Profile";
import NotFound from "./pages/NotFound";
import TabBar from "./components/TabBar";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Swiggy Ecosystem Context */}
          <div className="min-h-screen bg-gray-50">
            {/* Global Swiggy Header - Hidden for now but shows ecosystem integration */}
            <div className="hidden bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-orange-600">Swiggy</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">Delivering happiness</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>One membership active</span>
                  <span>•</span>
                  <span>₹450 wallet</span>
                </div>
              </div>
            </div>
            
            <div className="pb-20">
              <Routes>
                <Route path="/" element={<EventsHome />} />
                <Route path="/event/:id" element={<EventDetail />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/partner-portal" element={<PartnerPortal />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Ecosystem Integration Routes */}
                <Route path="/food" element={<div className="p-4 text-center"><h1>Swiggy Food Delivery</h1><p>Redirecting to main Swiggy app...</p></div>} />
                <Route path="/instamart" element={<div className="p-4 text-center"><h1>Swiggy Instamart</h1><p>Grocery delivery service</p></div>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <TabBar />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
