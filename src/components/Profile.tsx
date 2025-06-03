
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Plus,
  Edit,
  Star,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  
  // Mock user data - in real app this would come from auth context
  const isPartner = true;
  const user = {
    name: "Rajesh Kumar",
    email: "rajesh@bombaystreet.com",
    phone: "+91 98765 43210",
    address: "Koramangala, Bangalore",
    isRestaurantPartner: true,
    restaurantName: "Bombay Street Kitchen",
    partnerSince: "2023"
  };

  const userEvents = [
    {
      id: 1,
      name: "Street Food Festival",
      date: "Dec 15, 2024",
      attendees: 156,
      status: "Live",
      revenue: "₹45,000"
    },
    {
      id: 2,
      name: "Dosa Making Workshop",
      date: "Dec 20, 2024",
      attendees: 32,
      status: "Upcoming",
      revenue: "₹12,000"
    }
  ];

  const aiSuggestions = [
    {
      type: "content",
      title: "Improve your event descriptions",
      description: "AI suggests more engaging descriptions for 40% higher bookings",
      action: "Try now"
    },
    {
      type: "targeting",
      title: "Target food enthusiasts",
      description: "320 customers in your area love street food events",
      action: "Notify them"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900">Profile</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Partner Event Creation CTA */}
        {isPartner && (
          <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Organize an Event</h2>
                <p className="text-orange-100 text-sm mb-4">
                  Use AI to create engaging events that attract more customers
                </p>
                <Button 
                  onClick={() => navigate('/create-event')}
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event with AI
                </Button>
              </div>
              <Calendar className="h-12 w-12 text-orange-200" />
            </div>
          </Card>
        )}

        {/* User Profile Info */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              {isPartner && (
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-orange-100 text-orange-700">Restaurant Partner</Badge>
                  <span className="text-sm text-gray-600">Since {user.partnerSince}</span>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </div>

          {isPartner && (
            <div className="mb-4 p-3 bg-orange-50 rounded-lg">
              <p className="font-medium text-orange-900">{user.restaurantName}</p>
              <p className="text-sm text-orange-700">Restaurant Partner Account</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{user.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">{user.address}</span>
            </div>
          </div>
        </Card>

        {/* Partner Dashboard - Your Events */}
        {isPartner && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Events</h3>
              <Button 
                onClick={() => navigate('/create-event')}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </div>

            <div className="space-y-3">
              {userEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <Badge 
                      variant={event.status === 'Live' ? 'default' : 'outline'}
                      className={event.status === 'Live' ? 'bg-green-500' : ''}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>{event.date}</span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.attendees} attendees
                      </span>
                    </div>
                    <span className="font-medium text-green-600">{event.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* AI Suggestions for Partners */}
        {isPartner && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
            </div>

            <div className="space-y-3">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {suggestion.type === 'content' ? 
                          <TrendingUp className="h-4 w-4 text-blue-600" /> : 
                          <Target className="h-4 w-4 text-blue-600" />
                        }
                        <h4 className="font-medium text-blue-900">{suggestion.title}</h4>
                      </div>
                      <p className="text-sm text-blue-700">{suggestion.description}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-blue-600 border-blue-300 hover:bg-blue-100"
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Regular User Bookings */}
        {!isPartner && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Bookings</h3>
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">No upcoming events booked</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Discover Events
              </Button>
            </div>
          </Card>
        )}

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50">
              <span className="text-gray-700">Notification Preferences</span>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50">
              <span className="text-gray-700">Privacy Settings</span>
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50">
              <span className="text-gray-700">Payment Methods</span>
            </button>
            {isPartner && (
              <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50">
                <span className="text-gray-700">Partner Dashboard</span>
              </button>
            )}
            <button className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-red-600">
              <span>Sign Out</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
