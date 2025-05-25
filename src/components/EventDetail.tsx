
import React, { useState } from 'react';
import { MapPin, Share, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const EventDetail = () => {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const eventData = {
    name: "Street Food Festival",
    date: "Today, 6:00 PM - 11:00 PM",
    location: "Central Park, Koramangala",
    description: "Experience the best street food from 20+ vendors. This vibrant festival brings together the city's most loved street food vendors in one location. Enjoy live music, community activities, and incredible food in a family-friendly atmosphere.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=300&fit=crop",
    attendees: 156,
    organizer: "Koramangala Community Hub",
    type: "Food Festival"
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
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop"
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
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
              <p className="font-medium text-gray-900">{eventData.organizer}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
              RSVP to Event
            </Button>
            <Button variant="outline" className="flex-1">
              Add to Calendar
            </Button>
          </div>
        </Card>

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

        {/* Food Ordering Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Order Food for This Event</h3>
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Event Special
            </Badge>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Pre-order from participating restaurants or get delivery at the event venue
          </p>

          <div className="space-y-3">
            {restaurants.map((restaurant) => (
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

          <div className="mt-4 p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-1">Special Event Delivery</h4>
            <p className="text-sm text-orange-700">
              Orders will be delivered directly to the event coordination desk for easy pickup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
