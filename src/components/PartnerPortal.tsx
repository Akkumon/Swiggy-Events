
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockPartnerData } from '@/data/mockData';
import { DollarSign, Calendar, Users, Star, TrendingUp } from 'lucide-react';

const PartnerPortal = () => {
  const navigate = useNavigate();

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
          <h1 className="text-lg font-semibold text-gray-900">Restaurant Partner Portal</h1>
        </div>
      </div>

      <div className="px-4 py-6">
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
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Event Bookings</h3>
          <div className="space-y-3">
            {mockPartnerData.recentBookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{booking.eventName}</h4>
                  <p className="text-sm text-gray-600">by {booking.organizer}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {booking.date}
                    <Users className="h-4 w-4 ml-3 mr-1" />
                    {booking.expectedAttendees} attendees
                  </div>
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

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Create New Event Listing
          </Button>
          <Button variant="outline" className="w-full">
            View Analytics
          </Button>
          <Button variant="outline" className="w-full">
            Manage Menu Items
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerPortal;
