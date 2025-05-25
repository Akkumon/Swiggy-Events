
import React, { useState } from 'react';
import { MapPin, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [eventDeliveryEnabled, setEventDeliveryEnabled] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const deliveryTasks = [
    {
      id: 1,
      type: 'event',
      eventName: 'Street Food Festival',
      restaurant: 'Bombay Street Kitchen',
      orderValue: '₹485',
      pickupLocation: 'Koramangala 5th Block',
      dropLocation: 'Event Coordination Desk - Central Park',
      distance: '2.1 km',
      estimatedTime: '18 mins',
      priority: 'high',
      specialInstructions: 'Deliver to event coordination desk, ask for Sarah'
    },
    {
      id: 2,
      type: 'event',
      eventName: 'Live Jazz & Dinner',
      restaurant: 'Blue Terrace Restaurant',
      orderValue: '₹1,250',
      pickupLocation: 'Indiranagar 100ft Road',
      dropLocation: 'Customer Table - Blue Terrace',
      distance: '0.5 km',
      estimatedTime: '8 mins',
      priority: 'medium',
      specialInstructions: 'Event attendee pre-order, table booking under "Raj"'
    },
    {
      id: 3,
      type: 'regular',
      restaurant: 'Dosa Corner',
      orderValue: '₹320',
      pickupLocation: 'BTM Layout',
      dropLocation: 'HSR Layout Sector 1',
      distance: '3.8 km',
      estimatedTime: '25 mins',
      priority: 'medium',
      specialInstructions: 'Regular delivery'
    }
  ];

  const stats = {
    totalEarnings: '₹1,847',
    eventDeliveries: 12,
    regularDeliveries: 28,
    avgEventTip: '₹45'
  };

  const filteredTasks = activeFilter === 'events' 
    ? deliveryTasks.filter(task => task.type === 'event')
    : activeFilter === 'regular'
    ? deliveryTasks.filter(task => task.type === 'regular')
    : deliveryTasks;

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-lg font-semibold text-gray-900 flex-1">Delivery Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="event-toggle" className="text-sm">Events</Label>
            <Switch
              id="event-toggle"
              checked={eventDeliveryEnabled}
              onCheckedChange={setEventDeliveryEnabled}
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.totalEarnings}</p>
            <p className="text-sm text-gray-600">Today's Earnings</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{stats.eventDeliveries}</p>
            <p className="text-sm text-gray-600">Event Deliveries</p>
          </Card>
        </div>

        {/* Event Delivery Benefits */}
        {eventDeliveryEnabled && (
          <Card className="p-4 mb-6 bg-gradient-to-r from-orange-50 to-red-50">
            <h3 className="font-semibold text-orange-900 mb-2">Event Delivery Benefits</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Higher tips: Avg ₹{stats.avgEventTip} per event delivery</li>
              <li>• Shorter distances within event venues</li>
              <li>• Fixed coordination points for easy delivery</li>
              <li>• Peak hour bonuses during events</li>
            </ul>
          </Card>
        )}

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Orders ({deliveryTasks.length})
          </button>
          <button
            onClick={() => setActiveFilter('events')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeFilter === 'events'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Events ({deliveryTasks.filter(t => t.type === 'event').length})
          </button>
          <button
            onClick={() => setActiveFilter('regular')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeFilter === 'regular'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Regular ({deliveryTasks.filter(t => t.type === 'regular').length})
          </button>
        </div>

        {/* Delivery Tasks */}
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {task.type === 'event' && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
                        Event Order
                      </Badge>
                    )}
                    {task.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        Priority
                      </Badge>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900">
                    {task.restaurant}
                    {task.eventName && (
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        • {task.eventName}
                      </span>
                    )}
                  </h4>
                  
                  <p className="text-lg font-bold text-green-600 mt-1">
                    {task.orderValue}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">{task.distance}</p>
                  <p className="font-medium text-gray-900">{task.estimatedTime}</p>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-start text-sm">
                  <span className="text-gray-600 w-16">Pickup:</span>
                  <span className="text-gray-900 flex-1">{task.pickupLocation}</span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowDown className="h-4 w-4 text-orange-500" />
                </div>
                <div className="flex items-start text-sm">
                  <span className="text-gray-600 w-16">Drop:</span>
                  <span className="text-gray-900 flex-1">{task.dropLocation}</span>
                </div>
              </div>

              {task.specialInstructions && (
                <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 mb-3">
                  <strong>Note:</strong> {task.specialInstructions}
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Accept Order
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {activeFilter === 'events' 
                ? 'No event deliveries available right now' 
                : 'No deliveries available right now'}
            </p>
            <Button variant="outline">Refresh</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
