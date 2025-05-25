
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    date: '',
    time: '',
    location: '',
    description: '',
    maxAttendees: '',
    foodAvailable: false,
    partnerRestaurants: []
  });

  const eventTypes = [
    'Food Festival',
    'Music & Dining',
    'Workshop',
    'Community Gathering',
    'Pop-up Market',
    'Cultural Event'
  ];

  const availableRestaurants = [
    { id: 1, name: 'Bombay Street Kitchen', cuisine: 'Street Food' },
    { id: 2, name: 'Dosa Corner Express', cuisine: 'South Indian' },
    { id: 3, name: 'Chaat Wala', cuisine: 'North Indian' },
    { id: 4, name: 'Burger Junction', cuisine: 'Fast Food' },
    { id: 5, name: 'Spice Garden', cuisine: 'Multi-cuisine' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Event created:', formData);
    navigate('/');
  };

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
          <h1 className="text-lg font-semibold text-gray-900">Create New Event</h1>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Introduction */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Event Creation</h2>
          <p className="text-gray-600 text-sm">
            Create engaging local events and connect with your community. Add participating restaurants to make your event even more appealing.
          </p>
        </Card>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  placeholder="e.g., Community Street Food Festival"
                  required
                />
              </div>

              <div>
                <Label htmlFor="eventType">Event Type *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Central Park, Koramangala"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Event Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your event, activities, and what attendees can expect..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxAttendees">Expected Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
          </Card>

          {/* Food Integration */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Integration</h3>
            
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox
                id="foodAvailable"
                checked={formData.foodAvailable}
                onCheckedChange={(checked) => setFormData({ ...formData, foodAvailable: checked === true })}
              />
              <Label htmlFor="foodAvailable">
                Enable food ordering for this event
              </Label>
            </div>

            {formData.foodAvailable && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Select restaurants that will participate in your event:
                </p>
                
                <div className="space-y-2">
                  {availableRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={`restaurant-${restaurant.id}`}
                        checked={formData.partnerRestaurants.includes(restaurant.id)}
                        onCheckedChange={(checked) => {
                          if (checked === true) {
                            setFormData({
                              ...formData,
                              partnerRestaurants: [...formData.partnerRestaurants, restaurant.id]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              partnerRestaurants: formData.partnerRestaurants.filter(id => id !== restaurant.id)
                            });
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={`restaurant-${restaurant.id}`} className="font-medium">
                          {restaurant.name}
                        </Label>
                        <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-1">How it works:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Attendees can pre-order food from participating restaurants</li>
                    <li>• Orders are delivered to your event coordination desk</li>
                    <li>• You'll receive updates on delivery timings</li>
                    <li>• Restaurants pay a small commission for increased visibility</li>
                  </ul>
                </div>
              </div>
            )}
          </Card>

          {/* Submit */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate('/')}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600"
            >
              Publish Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
