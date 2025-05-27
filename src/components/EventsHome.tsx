import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryHero from './StoryHero';
import EnhancedEventCard from './EnhancedEventCard';
import { Button } from './ui/button';
import { mockEvents } from '@/data/mockEvents';

const EventsHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');

  // Enhanced events with story-driven content and community touches
  const featuredEvent = {
    name: "Street Food Festival",
    type: "Food Festival",
    location: "Central Park, Koramangala",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=300&fit=crop",
    story: {
      headline: "Taste the streets of Delhi under the stars",
      narrative: "Join Amit and his grandmother as they revive their family's beloved chaat stall, bringing four generations of secret recipes to life in the heart of Bangalore.",
      hostStory: "Meet Amit: 'My nani's golgappa recipe has never left our kitchen—until now.'"
    }
  };

  const events = mockEvents;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container-responsive py-3 md:py-4">
          <div className="flex items-center mb-3">
            {/* Swiggy Logo */}
            <div className="w-12 h-12 md:w-16 md:h-16 mr-4">
              <img 
                src="/lovable-uploads/0f555462-9c4a-4b14-883a-dae7423545e2.png" 
                alt="Swiggy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-orange-600 leading-tight tracking-tight">Swiggy</h1>
              <h2 className="text-base md:text-lg font-medium text-orange-600 leading-tight tracking-tight">Events</h2>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all tracking-tight ${
                activeTab === 'events'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discover Events
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all tracking-tight ${
                activeTab === 'food'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Food Orders
            </button>
            <button
              onClick={() => setActiveTab('organize')}
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all tracking-tight ${
                activeTab === 'organize'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Organize
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-responsive section-padding">
        {activeTab === 'events' && (
          <>
            {/* Story-Driven Hero Section */}
            <div className="mb-6">
              <StoryHero event={featuredEvent} />
            </div>

            {/* Human-Curated Editor's Section */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border-l-4 border-purple-400">
                <h2 className="text-base md:text-lg font-semibold text-purple-900 mb-2 tracking-tight">This Week's Editor's Pick</h2>
                <p className="text-sm md:text-base text-purple-700">
                  "This week I'm loving the Sunset Supper Club on Marine Drive—it's as much about the view as the dosa!"
                  <span className="block text-xs md:text-sm text-purple-600 mt-1 font-medium">— Priya, Swiggy Events Curator</span>
                </p>
              </div>
            </div>

            {/* Community Stats with Human Touch */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2 tracking-tight">Your Neighborhood Pulse</h2>
                <p className="text-sm md:text-base text-gray-600 mb-2">12 events happening in Koramangala this week, curated by your local community</p>
                <div className="text-xs md:text-sm text-orange-600 font-medium">
                  ✨ 89% of attendees say they discovered their new favorite spot through our events
                </div>
              </div>
            </div>

            {/* Enhanced Events Feed */}
            <div className="grid-responsive">
              {events.map((event) => (
                <EnhancedEventCard
                  key={event.id}
                  event={event}
                  onViewDetails={() => navigate(`/event/${event.id}`)}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'food' && (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 tracking-tight">Your Event Food Orders</h3>
            <p className="text-sm md:text-base text-gray-600 mb-4">Track orders placed for events you're attending</p>
            <Button 
              variant="outline"
              onClick={() => navigate('/order-history')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
            >
              View Order History
            </Button>
          </div>
        )}

        {activeTab === 'organize' && (
          <div className="grid-responsive">
            <div className="text-center py-8 md:py-12">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 tracking-tight">Create Your Event</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">Host events and connect with your local community</p>
              <Button 
                onClick={() => navigate('/create-event')}
                className="bg-orange-500 hover:bg-orange-600 font-medium text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
              >
                Create New Event
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 tracking-tight">For Restaurant Partners</h4>
              <p className="text-sm md:text-base text-gray-600 mb-3">
                Promote your events and reach more customers in your neighborhood
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/partner-portal')}
                className="border-orange-200 text-orange-600 hover:bg-orange-50 font-medium text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
              >
                Partner Portal
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2 tracking-tight">For Delivery Partners</h4>
              <p className="text-sm md:text-base text-gray-600 mb-3">
                Access event-specific delivery opportunities
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/delivery-dashboard')}
                className="border-orange-200 text-orange-600 hover:bg-orange-50 font-medium text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
              >
                DE Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsHome;
