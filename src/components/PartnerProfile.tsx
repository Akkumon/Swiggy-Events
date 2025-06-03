
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Users, Star, Plus, Sparkles } from 'lucide-react';

const PartnerProfile = () => {
  const navigate = useNavigate();

  // Mock partner data
  const partnerStats = {
    totalEvents: 12,
    attendees: 450,
    rating: 4.7,
    revenue: '₹85,000'
  };

  return (
    <div className="space-y-6">
      {/* Create Event CTA - Prominent placement */}
      <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <h2 className="text-xl font-bold">Ready to Create Magic?</h2>
            </div>
            <p className="text-orange-100 mb-4 text-sm">
              Use AI to craft amazing events that bring people together and boost your business
            </p>
            <Button 
              onClick={() => navigate('/create-event')}
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Organize an Event
            </Button>
          </div>
          <div className="hidden sm:block">
            <Calendar className="h-16 w-16 text-orange-200" />
          </div>
        </div>
      </Card>

      {/* Partner Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Calendar className="h-6 w-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{partnerStats.totalEvents}</div>
          <div className="text-sm text-gray-600">Events Created</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{partnerStats.attendees}</div>
          <div className="text-sm text-gray-600">Total Attendees</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{partnerStats.rating}</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </Card>
        
        <Card className="p-4 text-center">
          <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{partnerStats.revenue}</div>
          <div className="text-sm text-gray-600">Revenue</div>
        </Card>
      </div>

      {/* Recent Events */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Your Recent Events</h3>
          <Badge className="bg-green-100 text-green-700">Active Partner</Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Street Food Festival</h4>
              <p className="text-sm text-gray-600">156 attendees • Dec 15, 2024</p>
            </div>
            <Badge className="bg-orange-100 text-orange-700">Completed</Badge>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Wine Tasting Evening</h4>
              <p className="text-sm text-gray-600">32 attendees • Dec 21, 2024</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => navigate('/partner-portal')}
        >
          View All Events
        </Button>
      </Card>

      {/* AI Features Highlight */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">AI-Powered Features</h3>
        </div>
        <p className="text-purple-700 text-sm mb-4">
          Leverage cutting-edge AI to create, price, and promote your events
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 text-sm">Smart Content Creation</h4>
            <p className="text-xs text-purple-600 mt-1">AI-generated descriptions & titles</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 text-sm">Dynamic Pricing</h4>
            <p className="text-xs text-purple-600 mt-1">Optimize revenue with AI insights</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PartnerProfile;
