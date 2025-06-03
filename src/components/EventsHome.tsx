
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Clock,
  Plus,
  TrendingUp,
  Edit,
  Eye,
  Sparkles,
  Target
} from 'lucide-react';
import { mockEvents } from '@/data/mockEvents';

const EventsHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPartnerDashboard, setShowPartnerDashboard] = useState(true); // Mock partner status

  const partnerEvents = [
    {
      id: 'partner-1',
      name: 'Street Food Festival',
      date: 'Dec 15, 2024',
      attendees: 156,
      status: 'completed',
      revenue: 35000,
      canEdit: false
    },
    {
      id: 'partner-2', 
      name: 'Wine Tasting Evening',
      date: 'Dec 21, 2024',
      attendees: 32,
      status: 'upcoming',
      revenue: 18000,
      canEdit: true
    },
    {
      id: 'partner-3',
      name: 'Italian Cooking Workshop',
      date: 'Dec 28, 2024',
      attendees: 24,
      status: 'upcoming', 
      revenue: 12000,
      canEdit: true
    }
  ];

  const aiSuggestions = [
    {
      eventId: 'partner-2',
      type: 'description',
      title: 'Improve Event Description',
      suggestion: 'Try a more engaging description to boost bookings by 25%'
    },
    {
      eventId: 'partner-3',
      type: 'targeting',
      title: 'Target More Customers',
      suggestion: 'Notify Italian food lovers in your area (247 customers)'
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const searchLower = searchQuery.toLowerCase();
    const title = event.name?.toLowerCase() || '';
    const category = event.type?.toLowerCase() || '';
    const location = event.location?.toLowerCase() || '';
    
    return title.includes(searchLower) ||
           category.includes(searchLower) ||
           location.includes(searchLower);
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dine & Events</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events, restaurants, cuisines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Partner Dashboard Section */}
        {showPartnerDashboard && (
          <div className="mb-8">
            {/* Create New Event CTA */}
            <Card className="p-6 mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Organize Your Next Event</h2>
                  </div>
                  <p className="text-orange-100 mb-4 text-sm">
                    Use AI to create amazing events that bring people together
                  </p>
                  <Button 
                    onClick={() => navigate('/create-event')}
                    className="bg-white text-orange-600 hover:bg-orange-50 font-semibold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Event
                  </Button>
                </div>
              </div>
            </Card>

            {/* Your Events Section */}
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Events</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/partner-portal')}
                >
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {partnerEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{event.name}</h4>
                        <Badge 
                          className={event.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                        >
                          {event.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.attendees} attendees
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          ₹{event.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {event.canEdit && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <Card className="p-4 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">AI Suggestions</h3>
                </div>
                <div className="space-y-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-purple-900 text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-purple-600 mt-1">{suggestion.suggestion}</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-purple-200">
                          <Target className="h-4 w-4 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Separator className="my-6" />
          </div>
        )}

        {/* Regular Events Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Discover Events</h2>
          
          {/* Events Grid */}
          <div className="grid gap-4">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gradient-to-r from-orange-400 to-red-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                    <div className="text-white">
                      <Badge className="bg-white bg-opacity-20 text-white mb-2">
                        {event.type}
                      </Badge>
                      <h3 className="font-semibold text-lg">{event.name}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.date} {/* Using date as time is not available */}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{event.attendees} going</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">4.5</span> {/* Default rating */}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">₹500</div> {/* Default price */}
                      <div className="text-xs text-gray-500">per person</div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsHome;
