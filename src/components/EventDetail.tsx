
import React, { useState } from 'react';
import { MapPin, Share, ArrowDown, Star, ShoppingBag, Clock, Users as UsersIcon, Gift, Wallet, Crown } from 'lucide-react';
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

  // Enhanced user data with Swiggy ecosystem integration
  const userProfile = {
    swiggyOne: true,
    tier: "Gold",
    walletBalance: 450,
    loyaltyPoints: 2840,
    lastDeliveryOrder: "2 days ago",
    totalOrders: 127,
    favoriteRestaurants: ["Bombay Street Kitchen", "Blue Terrace", "Toscano"]
  };

  // Enhanced restaurant data with ecosystem integration
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
    swiggyOneDiscount: "Extra 10% off with Swiggy One",
    deliveryAvailable: true,
    avgDeliveryPrice: "₹180 for two",
    menuHighlights: [
      { name: "Signature Vada Pav", price: "₹45", description: "Your usual favorite!", loyaltyPoints: 15 },
      { name: "Pav Bhaji Combo", price: "₹120", description: "You ordered this last time", loyaltyPoints: 40 },
      { name: "Mumbai Special Thali", price: "₹180", description: "Perfect for sharing", loyaltyPoints: 60 }
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
      {/* Header with Swiggy Integration */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center mb-2">
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
          
          {/* Swiggy Ecosystem Navigation */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-orange-600 font-medium">Swiggy</span>
            <span>•</span>
            <span>Food Delivery</span>
            <span>•</span>
            <span>Instamart</span>
            <span>•</span>
            <span className="text-orange-600 font-medium">Events</span>
          </div>
        </div>
      </div>

      {/* Swiggy One Benefits Banner */}
      {userProfile.swiggyOne && (
        <div className="mx-4 mt-4">
          <Card className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-900">Swiggy One {userProfile.tier} Benefits Apply</p>
                <p className="text-xs text-purple-700">Free delivery + Extra discounts + Priority booking</p>
              </div>
              <Badge className="bg-purple-600 text-white text-xs">Active</Badge>
            </div>
          </Card>
        </div>
      )}

      {/* Event Banner */}
      <div className="relative h-64 bg-gray-200 mx-4 mt-4 rounded-lg overflow-hidden">
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
        {/* Cross-Service Integration Card */}
        <Card className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-start gap-3 mb-3">
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
                <Badge className="bg-green-600 text-white text-xs">
                  ✓ {primaryRestaurant.userOrderHistory} orders
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                  Last order: {primaryRestaurant.lastOrderDate}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Cross-Service Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-orange-500 hover:bg-orange-600 text-sm">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Order Delivery
            </Button>
            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 text-sm">
              <Gift className="h-4 w-4 mr-2" />
              View Menu
            </Button>
          </div>
          
          {/* Unified Benefits */}
          <div className="mt-3 p-3 bg-white rounded-lg border">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-gray-900">Combined Benefits</p>
                <p className="text-xs text-gray-600">Event booking + Food delivery</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-orange-600">₹95 saved</p>
                <p className="text-xs text-gray-500">vs separate bookings</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Unified Wallet & Loyalty */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Payment & Rewards</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Swiggy Money</p>
                <p className="text-xs text-gray-600">₹{userProfile.walletBalance} available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Loyalty Points</p>
                <p className="text-xs text-gray-600">{userProfile.loyaltyPoints} points</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-900">This booking earns</p>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                250 points
              </Badge>
            </div>
            <p className="text-xs text-gray-600">
              Valid across all Swiggy services • Redeem for food orders, discounts & more
            </p>
          </div>
        </Card>

        {/* Event Info with Cross-Service Context */}
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
            
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="h-4 w-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Food Delivery Available</p>
              </div>
              <p className="text-xs text-blue-700">
                Order from {primaryRestaurant.name} directly to the event venue • {primaryRestaurant.deliveryTime} delivery
              </p>
            </div>
          </div>
        </Card>

        {/* New Bundled Booking Flow */}
        <BookingFlow eventData={eventData} restaurantData={primaryRestaurant} />

        {/* Restaurant Menu with Ecosystem Benefits */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Menu from {primaryRestaurant.name}</h3>
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Your favorites
            </Badge>
          </div>
          
          <div className="space-y-3">
            {primaryRestaurant.menuHighlights.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-purple-600 border-purple-200 text-xs">
                      +{item.loyaltyPoints} points
                    </Badge>
                    {userProfile.swiggyOne && (
                      <Badge className="bg-purple-600 text-white text-xs">
                        One member price
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.price}</p>
                  <Button size="sm" variant="outline" className="mt-1 text-xs">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-orange-900">Bundle & Save</h4>
                <p className="text-sm text-orange-700">{primaryRestaurant.swiggyOneDiscount} + Event discount</p>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                Order to Event
              </Button>
            </div>
          </div>
        </Card>

        {/* Unified Order History */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Your History with {primaryRestaurant.name}</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Food Delivery</p>
                <p className="text-sm text-gray-600">{primaryRestaurant.userOrderHistory} orders • Last: {primaryRestaurant.lastOrderDate}</p>
              </div>
              <Button size="sm" variant="outline">
                Reorder
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Events & Dining</p>
                <p className="text-sm text-gray-600">2 events attended • Great experience</p>
              </div>
              <Button size="sm" variant="outline">
                View History
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
