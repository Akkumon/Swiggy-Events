
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsHome from '../components/EventsHome';
import EventDetail from '../components/EventDetail';
import CreateEvent from '../components/CreateEvent';
import DeliveryDashboard from '../components/DeliveryDashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<EventsHome />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
      </Routes>
    </div>
  );
};

export default Index;
