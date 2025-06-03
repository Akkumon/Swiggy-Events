
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from './ui/breadcrumb';
import EnhancedEventCard from './EnhancedEventCard';
import { mockEvents } from '@/data/mockEvents';
import { ChevronRight, Star, Clock, MapPin, Heart } from 'lucide-react';

const EventsHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');

  // Mock user dining history with events
  const userFavoriteRestaurants = [
    {
      id: 1,
      name: "Bombay Street Kitchen",
      cuisine: "Street Food",
      orderCount: 8,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop",
      currentEvent: {
        name: "Street Food Festival",
        time: "Today, 6:00 PM",
        attendees: 156
      }
    },
    {
      id: 2,
      name: "Blue Terrace Restaurant", 
      cuisine: "Italian",
      orderCount: 3,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=200&fit=crop",
      currentEvent: {
        name: "Live Jazz & Dinner",
        time: "Tomorrow, 7:30 PM", 
        attendees: 45
      }
    },
    {
      id: 3,
      name: "Toscano Italian Bistro",
      cuisine: "Italian", 
      orderCount: 5,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop",
      currentEvent: {
        name: "Wine Tasting Evening",
        time: "Sat, 7:00 PM",
        attendees: 32
      }
    }
  ];

  // Enhanced events with user context
  const enhancedEvents = mockEvents.map(event => ({
    ...event,
    restaurantName: event.id === 1 ? "Bombay Street Kitchen" : 
                   event.id === 2 ? "Blue Terrace Restaurant" :
                   event.id === 3 ? "Green Thumb Bistro" : "Lakeside Cafe",
    cuisineType: event.id === 1 ? "Street Food" :
                event.id === 2 ? "Italian" :
                event.id === 3 ? "Healthy" : "Multi-cuisine",
    userOrderHistory: event.id === 1 ? 8 : event.id === 2 ? 3 : 0,
    restaurantRating: event.id === 1 ? 4.5 : event.id === 2 ? 4.3 : event.id === 3 ? 4.6 : 4.2,
    specialties: event.id === 1 ? ["Vada Pav", "Pav Bhaji"] :
                event.id === 2 ? ["Pasta", "Wine Selection"] :
                event.id === 3 ? ["Organic Salads", "Fresh Herbs"] : ["BBQ", "Lake Views"]
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header with Ecosystem Integration */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container-responsive py-3 md:py-4">
          {/* Breadcrumb Navigation */}
          <Breadcrumb className="mb-3">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-orange-600 font-medium">
                  Swiggy
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dineout" className="text-gray-600">
                  Dineout & Events
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 font-medium">
                  Discover
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center mb-3">
            {/* Swiggy Logo */}
            <div className="w-12 h-12 md:w-16 md:h-16 mr-2">
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
          
          {/* Cross-service hint */}
          <div className="bg-orange-50 rounded-lg p-2 mb-3 border border-orange-100">
            <p className="text-xs text-orange-700">
              💡 Also available on Swiggy main app - Find events while ordering food!
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all tracking-tight ${
                activeTab === 'discover'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all tracking-tight ${
                activeTab === 'bookings'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-2 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all tracking-tight ${
                activeTab === 'profile'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-responsive section-padding">
        {activeTab === 'discover' && (
          <>
            {/* Events at Restaurants You Love - Primary Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-red-500" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                  Events at restaurants you love
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Based on your order history and dining preferences
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFavoriteRestaurants.map((restaurant) => (
                  <Card 
                    key={restaurant.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/event/${restaurant.id}`)}
                  >
                    <div className="relative h-40 bg-gray-200 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-600 text-white text-xs">
                          ✓ You've ordered here {restaurant.orderCount} times
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-orange-500 text-white text-xs">
                          Live Event
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600 ml-1">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-orange-600 mb-2">{restaurant.cuisine}</p>
                      
                      <div className="border-t pt-3">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {restaurant.currentEvent.name}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {restaurant.currentEvent.time}
                          </div>
                          <span>{restaurant.currentEvent.attendees} going</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Context-Aware Discovery */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 tracking-tight">
                Because you love Italian and live music
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                More events that match your dining preferences
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium text-blue-900">Smart Suggestion</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Based on your 3 orders at Blue Terrace Restaurant and preference for evening dining
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enhancedEvents.filter(event => event.cuisineType === 'Italian').map((event) => (
                  <EnhancedEventCard
                    key={event.id}
                    event={event}
                    onViewDetails={() => navigate(`/event/${event.id}`)}
                  />
                ))}
              </div>
            </div>

            {/* All Events - Secondary Position */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 tracking-tight">
                More events in your area
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enhancedEvents.map((event) => (
                  <EnhancedEventCard
                    key={event.id}
                    event={event}
                    onViewDetails={() => navigate(`/event/${event.id}`)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 tracking-tight">Your Event Bookings</h3>
            <p className="text-sm md:text-base text-gray-600 mb-4">Track your upcoming events and dining reservations</p>
            <Button 
              variant="outline"
              onClick={() => navigate('/order-history')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm md:text-base px-4 md:px-6 py-2 md:py-3"
            >
              View Booking History
            </Button>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 tracking-tight">Your Profile</h3>
            <p className="text-sm md:text-base text-gray-600 mb-6">Manage your dining preferences and event interests</p>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-medium text-gray-900 mb-2">Dining Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Italian</Badge>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Street Food</Badge>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Live Music</Badge>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-medium text-gray-900 mb-2">Event Interests</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Food Festivals</Badge>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Jazz Nights</Badge>
                  <Badge variant="outline" className="text-orange-600 border-orange-200">Wine Tastings</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsHome;
