
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockPartnerData } from '@/data/mockData';
import { DollarSign, Calendar, Users, Star, TrendingUp, Lightbulb, Target, Zap } from 'lucide-react';

const PartnerPortal = () => {
  const navigate = useNavigate();
  const [showOptimizations, setShowOptimizations] = useState(false);

  const aiOptimizations = [
    {
      title: "Peak Hour Event Suggestion",
      description: "Schedule events during 7-9 PM for 35% higher attendance",
      impact: "+35% attendance",
      type: "timing"
    },
    {
      title: "Cuisine-Based Targeting",
      description: "Target customers who love street food for better conversions",
      impact: "+28% bookings",
      type: "audience"
    },
    {
      title: "Pricing Optimization",
      description: "Increase price to ₹550 based on local market analysis",
      impact: "+₹12,000 revenue",
      type: "pricing"
    }
  ];

  const successMetrics = [
    {
      title: "AI-Generated Events",
      value: "23",
      change: "+12 this month",
      color: "text-green-600"
    },
    {
      title: "Revenue Increase",
      value: "25%",
      change: "vs last quarter",
      color: "text-blue-600"
    },
    {
      title: "Customer Reach",
      value: "1,247",
      change: "targeted customers",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-lg font-semibold text-gray-900">AI-Powered Partner Dashboard</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* AI Success Banner */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Your AI Success Story</h2>
              <p className="text-blue-100 text-sm mb-4">
                AI tools helped generate ₹45,000 additional revenue this month
              </p>
              <div className="flex gap-4">
                {successMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <p className="text-lg font-bold">{metric.value}</p>
                    <p className="text-xs text-blue-100">{metric.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <Zap className="h-8 w-8 text-yellow-300" />
          </div>
        </Card>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-lg font-semibold">₹{mockPartnerData.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600">+25% vs last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Events</p>
                <p className="text-lg font-semibold">{mockPartnerData.totalEvents}</p>
                <p className="text-xs text-blue-600">12 AI-generated</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Listings</p>
                <p className="text-lg font-semibold">{mockPartnerData.activeListings}</p>
                <p className="text-xs text-purple-600">85% AI-optimized</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-lg font-semibold">{mockPartnerData.avgRating}/5</p>
                <p className="text-xs text-yellow-600">+0.3 improvement</p>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Optimization Suggestions */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-orange-500" />
              <h3 className="font-semibold text-gray-900">AI Optimization Suggestions</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowOptimizations(!showOptimizations)}
            >
              {showOptimizations ? 'Hide' : 'Show'} Insights
            </Button>
          </div>

          {!showOptimizations ? (
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-sm text-orange-800">
                Get personalized recommendations to boost your event performance
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {aiOptimizations.map((optimization, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-orange-50 to-red-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{optimization.title}</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {optimization.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{optimization.description}</p>
                  <Button size="sm" variant="outline" className="border-orange-200">
                    Apply Suggestion
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Recent Bookings with AI Insights */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Event Bookings</h3>
          <div className="space-y-3">
            {mockPartnerData.recentBookings.map((booking, index) => (
              <div key={booking.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{booking.eventName}</h4>
                    {index < 2 && <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800">AI-Generated</Badge>}
                  </div>
                  <p className="text-sm text-gray-600">by {booking.organizer}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {booking.date}
                    <Users className="h-4 w-4 ml-3 mr-1" />
                    {booking.expectedAttendees} attendees
                  </div>
                  {index < 2 && (
                    <p className="text-xs text-blue-600 mt-1">
                      ↗ 40% higher booking rate with AI content
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <Badge className={booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {booking.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">₹{booking.estimatedRevenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Insights */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">AI Customer Insights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Top Customer Segment</span>
              </div>
              <p className="text-lg font-bold text-purple-900">Food Enthusiasts</p>
              <p className="text-xs text-purple-600">247 active customers</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Best Event Time</span>
              </div>
              <p className="text-lg font-bold text-green-900">Friday 7-9 PM</p>
              <p className="text-xs text-green-600">35% higher attendance</p>
            </div>
          </div>
        </Card>

        {/* Success Stories */}
        <Card className="p-4 mb-6 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-900 mb-4">Partner Success Stories</h3>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800">
                "AI content generation increased our event bookings by 40%"
              </p>
              <p className="text-xs text-green-600 mt-1">- Similar restaurant in your area</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800">
                "Smart pricing optimization added ₹15,000 monthly revenue"
              </p>
              <p className="text-xs text-green-600 mt-1">- Successful partner using AI tools</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600"
            onClick={() => navigate('/create-event')}
          >
            🚀 Create AI-Powered Event
          </Button>
          <Button variant="outline" className="w-full">
            📊 View AI Analytics
          </Button>
          <Button variant="outline" className="w-full">
            🎯 Optimize Customer Targeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerPortal;
