import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Clock, Utensils, ArrowLeft, MessageCircle, CheckCircle } from 'lucide-react';

interface BookingFormProps {
  selectedPackage: 'bundle' | 'event-only';
  eventData: any;
  restaurantData: any;
  bundlePrice: any;
  selectedTiming?: any;
  onSubmit: (formData: any) => void;
  onBack: () => void;
}

const BookingForm = ({ selectedPackage, eventData, restaurantData, bundlePrice, selectedTiming, onSubmit, onBack }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    partySize: 2,
    dietaryPreferences: [] as string[],
    tablePreference: '',
    specialRequests: '',
    isGroupBooking: false,
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'No Spicy Food', 'No Nuts'];
  const tableOptions = ['Window Seat', 'Quiet Area', 'Bar Seating', 'Outdoor Terrace', 'No Preference'];

  const handleDietaryChange = (preference: string) => {
    const updated = formData.dietaryPreferences.includes(preference)
      ? formData.dietaryPreferences.filter(p => p !== preference)
      : [...formData.dietaryPreferences, preference];
    setFormData({ ...formData, dietaryPreferences: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const totalPrice = selectedPackage === 'bundle' ? bundlePrice.total : bundlePrice.event;

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {selectedPackage === 'bundle' ? 'Dinner + Event Package' : 'Event Only Booking'}
          </h3>
          <p className="text-sm text-gray-600">{eventData.name} at {restaurantData.name}</p>
        </div>
      </div>

      {/* Timing Summary for Bundle */}
      {selectedPackage === 'bundle' && selectedTiming && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-green-900">Your Perfect Timing</h4>
            <Badge className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              {selectedTiming.name}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center text-green-700">
                <Utensils className="h-3 w-3 mr-1" />
                <span>Dinner</span>
              </div>
              <p className="font-medium">{selectedTiming.dinnerTime}</p>
            </div>
            <div>
              <div className="flex items-center text-green-700">
                <Clock className="h-3 w-3 mr-1" />
                <span>Buffer</span>
              </div>
              <p className="font-medium">{selectedTiming.bufferTime} mins</p>
            </div>
            <div>
              <div className="flex items-center text-green-700">
                <Clock className="h-3 w-3 mr-1" />
                <span>Event</span>
              </div>
              <p className="font-medium">{selectedTiming.eventTime}</p>
            </div>
          </div>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Party Size */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-900">Party Size</label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, partySize: Math.max(1, formData.partySize - 1) })}
                disabled={formData.partySize <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center font-medium">{formData.partySize}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setFormData({ ...formData, partySize: formData.partySize + 1 })}
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Users className="h-3 w-3 mr-1" />
            <span>Applies to both dinner and event</span>
          </div>
        </Card>

        {/* Dietary Preferences - Only for bundle */}
        {selectedPackage === 'bundle' && (
          <Card className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Dietary Preferences</h4>
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={formData.dietaryPreferences.includes(option) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDietaryChange(option)}
                  className={`text-xs ${
                    formData.dietaryPreferences.includes(option)
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-orange-50'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Table Preferences - Only for bundle */}
        {selectedPackage === 'bundle' && (
          <Card className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Table Preference</h4>
            <div className="grid grid-cols-2 gap-2">
              {tableOptions.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={formData.tablePreference === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFormData({ ...formData, tablePreference: option })}
                  className={`text-xs ${
                    formData.tablePreference === option
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'hover:bg-orange-50'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </Card>
        )}

        {/* Contact Information */}
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Contact Information</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600">Name</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="+91 9876543210"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
        </Card>

        {/* Group Booking Option */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Plan with Friends</h4>
              <p className="text-xs text-gray-600">Coordinate with your group and split payments</p>
            </div>
            <Button
              type="button"
              variant={formData.isGroupBooking ? "default" : "outline"}
              size="sm"
              onClick={() => setFormData({ ...formData, isGroupBooking: !formData.isGroupBooking })}
              className={formData.isGroupBooking ? 'bg-orange-500 hover:bg-orange-600' : 'hover:bg-orange-50'}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {formData.isGroupBooking ? 'Group Enabled' : 'Enable Group'}
            </Button>
          </div>
        </Card>

        {/* Special Requests */}
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Special Requests</h4>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows={3}
            placeholder="Anniversary celebration, wheelchair access, etc."
          />
        </Card>

        {/* Price Summary */}
        <Card className="p-4 bg-gray-50">
          <div className="space-y-2">
            {selectedPackage === 'bundle' && (
              <>
                <div className="flex justify-between text-sm">
                  <span>Dinner ({formData.partySize} guests)</span>
                  <span>₹{bundlePrice.dinner * formData.partySize}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Event ({formData.partySize} tickets)</span>
                  <span>₹{bundlePrice.event * formData.partySize}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Bundle Savings</span>
                  <span>-₹{bundlePrice.savings * formData.partySize}</span>
                </div>
                <Separator />
              </>
            )}
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{totalPrice * formData.partySize}</span>
            </div>
          </div>
        </Card>

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 py-3">
          {formData.isGroupBooking ? 'Continue to Group Setup' : 'Confirm Booking'}
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
