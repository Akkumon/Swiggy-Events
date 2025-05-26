
import React, { useState } from 'react';
import { MapPin, Share, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const EventsHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');

  const events = [
    {
      id: 1,
      name: "Street Food Festival",
      date: "Today, 6:00 PM",
      location: "Central Park, Koramangala",
      description: "Experience the best street food from 20+ vendors",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=200&fit=crop",
      foodAvailable: true,
      attendees: 156,
      type: "Food Festival"
    },
    {
      id: 2,
      name: "Live Jazz & Dinner",
      date: "Tomorrow, 7:30 PM",
      location: "Blue Terrace Restaurant, Indiranagar",
      description: "Intimate jazz performance with curated dinner menu",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop",
      foodAvailable: true,
      attendees: 45,
      type: "Music & Dining"
    },
    {
      id: 3,
      name: "Community Garden Workshop",
      date: "Sat, 10:00 AM",
      location: "Cubbon Park Extension",
      description: "Learn sustainable gardening with local breakfast",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop",
      foodAvailable: true,
      attendees: 89,
      type: "Workshop"
    },
    {
      id: 4,
      name: "Lakeside Food Picnic",
      date: "Sun, 11:00 AM",
      location: "Ulsoor Lake, Central Bangalore",
      description: "Family-friendly picnic with food stalls and activities",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop",
      foodAvailable: true,
      attendees: 234,
      type: "Community"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center mb-3">
            {/* Swiggy Logo */}
            <div className="w-12 h-12 mr-4">
              <img 
                src="/lovable-uploads/0f555462-9c4a-4b14-883a-dae7423545e2.png" 
                alt="Swiggy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-orange-600 leading-tight">Swiggy</h1>
              <h2 className="text-lg font-medium text-orange-600 leading-tight">Events</h2>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'events'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discover Events
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'food'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Food Orders
            </button>
            <button
              onClick={() => setActiveTab('organize')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
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
      <div className="px-4 py-6">
        {activeTab === 'events' && (
          <>
            {/* Quick Stats */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Events Near You</h2>
                <p className="text-gray-600 text-sm">12 events happening in Koramangala this week</p>
              </div>
            </div>

            {/* Events Feed */}
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div onClick={() => navigate(`/event/${event.id}`)}>
                    {/* Event Image */}
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90 text-gray-700">
                          {event.type}
                        </Badge>
                      </div>
                      {event.foodAvailable && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-orange-500 hover:bg-orange-600">
                            Food Available
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1">
                          {event.name}
                        </h3>
                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <Share className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-medium text-orange-600">{event.date}</span>
                          <span className="text-gray-500 ml-2">• {event.attendees} going</span>
                        </div>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === 'food' && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your Event Food Orders</h3>
            <p className="text-gray-600 mb-4">Track orders placed for events you're attending</p>
            <Button variant="outline">View Order History</Button>
          </div>
        )}

        {activeTab === 'organize' && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Event</h3>
              <p className="text-gray-600 mb-6">Host events and connect with your local community</p>
              <Button 
                onClick={() => navigate('/create-event')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Create New Event
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">For Restaurant Partners</h4>
              <p className="text-sm text-gray-600 mb-3">
                Promote your events and reach more customers in your neighborhood
              </p>
              <Button variant="outline" size="sm">
                Partner Portal
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">For Delivery Partners</h4>
              <p className="text-sm text-gray-600 mb-3">
                Access event-specific delivery opportunities
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/delivery-dashboard')}
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
