import React, { useState } from 'react';
import { MapPin, Share, ArrowDown, Star, ShoppingBag, Clock, Users as UsersIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import CommunityVoices from './CommunityVoices';
import BookingFlow from './BookingFlow';
import { useParams } from 'react-router-dom';
import { mockEvents } from '@/data/mockEvents';

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || '', 10);

  const eventData = mockEvents.find(event => event.id === eventId);

  // Enhanced restaurant data with user relationship
  const primaryRestaurant = {
    name: "Bombay Street Kitchen",
    cuisine: "Street Food • Mumbai Style",
    rating: 4.5,
    deliveryTime: "20-25 mins",
    userOrderHistory: 8,
    lastOrderDate: "3 days ago",
    favoriteItems: ["Vada Pav", "Pav Bhaji"],
    specialties: ["Authentic Mumbai Street Food", "Homemade Chutneys", "Fresh Daily Specials"],
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop",
    specialOffer: "20% off for event attendees",
    menuHighlights: [
      { name: "Signature Vada Pav", price: "₹45", description: "Your usual favorite!" },
      { name: "Pav Bhaji Combo", price: "₹120", description: "You ordered this last time" },
      { name: "Mumbai Special Thali", price: "₹180", description: "Perfect for sharing" }
    ]
  };

  const restaurants = [
    {
      id: 1,
      name: "Bombay Street Kitchen",
      cuisine: "Street Food • Mumbai Style",
      rating: 4.5,
      deliveryTime: "20-25 mins",
      specialOffer: "20% off for event attendees",
      popular: ["Vada Pav", "Pav Bhaji", "Bhel Puri"],
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop",
      userOrderHistory: 8
    },
    {
      id: 2,
      name: "Dosa Corner Express",
      cuisine: "South Indian • Quick Bites",
      rating: 4.3,
      deliveryTime: "15-20 mins",
      specialOffer: "Free delivery to event venue",
      popular: ["Masala Dosa", "Rava Dosa", "Filter Coffee"],
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Chaat Wala",
      cuisine: "North Indian • Chaat",
      rating: 4.6,
      deliveryTime: "25-30 mins",
      specialOffer: "Buy 2 Get 1 Free on select items",
      popular: ["Aloo Tikki", "Golgappa", "Raj Kachori"],
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
    }
  ];

  const agenda = [
    { time: "6:00 PM", activity: "Event Opening & Welcome" },
    { time: "6:30 PM", activity: "Food Stalls Open" },
    { time: "7:00 PM", activity: "Live Music Performance" },
    { time: "8:30 PM", activity: "Community Activities" },
    { time: "10:00 PM", activity: "Event Wind Down" }
  ];

  if (!eventData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="p-6 text-center">
          <h1 className="text-xl font-semibold mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you are looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            ← Back
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 flex-1">Event Details</h1>
          <Button variant="ghost" size="sm">
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Event Banner */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={eventData.image}
          alt={eventData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className="bg-orange-500 hover:bg-orange-600 mb-2">
            {eventData.type}
          </Badge>
          <h1 className="text-2xl font-bold text-white mb-1">{eventData.name}</h1>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {eventData.location}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Restaurant Relationship Highlight */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <div className="flex items-start gap-3">
            <img
              src={primaryRestaurant.image}
              alt={primaryRestaurant.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">{primaryRestaurant.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{primaryRestaurant.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{primaryRestaurant.cuisine}</p>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">
                  ✓ You've ordered here {primaryRestaurant.userOrderHistory} times
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                  Last order: {primaryRestaurant.lastOrderDate}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Your favorites: {primaryRestaurant.favoriteItems.join(', ')}
              </p>
            </div>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Order
            </Button>
          </div>
        </Card>

        {/* Event Info */}
        <Card className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-medium">{eventData.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Attendees</p>
              <p className="font-medium">{eventData.attendees} going</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">About This Event</p>
              <p className="text-gray-900">{eventData.description}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Organized by</p>
              <p className="font-medium text-gray-900">{eventData.organizer || 'Community Organizer'}</p>
            </div>
          </div>
        </Card>

        {/* New Bundled Booking Flow */}
        <BookingFlow eventData={eventData} restaurantData={primaryRestaurant} />

        {/* Restaurant Menu Highlights */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Menu Highlights from {primaryRestaurant.name}</h3>
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Based on your orders
            </Badge>
          </div>
          
          <div className="space-y-3">
            {primaryRestaurant.menuHighlights.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.price}</p>
                  <Button size="sm" variant="outline" className="mt-1 text-xs">
                    Add to Order
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-orange-900">Special Event Pricing</h4>
                <p className="text-sm text-orange-700">{primaryRestaurant.specialOffer}</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                View Full Menu
              </Button>
            </div>
          </div>
        </Card>

        {/* Community Voices Section */}
        <CommunityVoices eventId={eventId} />

        {/* Agenda */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Event Schedule</h3>
          <div className="space-y-3">
            {agenda.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 text-sm text-gray-600 font-medium">
                  {item.time}
                </div>
                <div className="flex-1 text-sm text-gray-900">
                  {item.activity}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Other Restaurants at Event */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Food Options</h3>
          
          <div className="space-y-3">
            {restaurants.slice(1).map((restaurant) => (
              <Card key={restaurant.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start space-x-3">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 truncate">
                        {restaurant.name}
                      </h4>
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 font-medium">★ {restaurant.rating}</span>
                        <span className="text-gray-500 ml-1">• {restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                    
                    {restaurant.userOrderHistory && restaurant.userOrderHistory > 0 && (
                      <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs mb-2">
                        ✓ You've ordered here {restaurant.userOrderHistory} times
                      </Badge>
                    )}
                    
                    {restaurant.specialOffer && (
                      <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs mb-2">
                        {restaurant.specialOffer}
                      </Badge>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Popular: {restaurant.popular.join(', ')}
                      </div>
                      <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                        Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
