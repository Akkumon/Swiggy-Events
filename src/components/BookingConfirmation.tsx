
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Calendar, Clock, MapPin, Users, Share, Download, MessageCircle, QrCode, Bell } from 'lucide-react';

interface BookingConfirmationProps {
  bookingData: any;
  selectedPackage: 'bundle' | 'event-only';
  eventData: any;
  restaurantData: any;
  bundlePrice: any;
  onNewBooking: () => void;
}

const BookingConfirmation = ({ bookingData, selectedPackage, eventData, restaurantData, bundlePrice, onNewBooking }: BookingConfirmationProps) => {
  const [showQRCodes, setShowQRCodes] = useState(false);
  
  const bookingId = `SWG${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const totalCost = selectedPackage === 'bundle' ? bundlePrice.total * bookingData.partySize : bundlePrice.event * bookingData.partySize;

  const addToCalendar = () => {
    const startDate = new Date();
    startDate.setHours(18, 0, 0); // 6:00 PM
    const endDate = new Date();
    endDate.setHours(22, 0, 0); // 10:00 PM

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventData.name)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`${selectedPackage === 'bundle' ? 'Dinner + Event Package' : 'Event Ticket'} at ${restaurantData.name}`)}&location=${encodeURIComponent(eventData.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const shareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: `${eventData.name} Booking Confirmed`,
        text: `I'll be at ${eventData.name} ${selectedPackage === 'bundle' ? 'with dinner' : ''} at ${restaurantData.name}!`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Success Header */}
      <Card className="p-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-green-900 mb-2">Booking Confirmed!</h2>
        <p className="text-green-700">Your {selectedPackage === 'bundle' ? 'dinner + event package' : 'event ticket'} is secured</p>
        <Badge className="bg-green-600 hover:bg-green-700 text-white mt-2">
          Booking ID: {bookingId}
        </Badge>
      </Card>

      {/* Booking Details */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-gray-900">{eventData.name}</p>
              <p className="text-sm text-gray-600">{restaurantData.name}</p>
            </div>
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
              {selectedPackage === 'bundle' ? 'Dinner + Event' : 'Event Only'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span>{eventData.date}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-gray-500 mr-2" />
              <span>{bookingData.partySize} {bookingData.partySize === 1 ? 'person' : 'people'}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span>{selectedPackage === 'bundle' ? '6:00 PM' : '7:30 PM'}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
              <span>{eventData.location}</span>
            </div>
          </div>

          {selectedPackage === 'bundle' && bookingData.tablePreference && (
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-900">Table Preference</p>
              <p className="text-sm text-orange-700">{bookingData.tablePreference}</p>
            </div>
          )}

          {bookingData.dietaryPreferences && bookingData.dietaryPreferences.length > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Dietary Preferences</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {bookingData.dietaryPreferences.map((pref: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-blue-700 border-blue-300 text-xs">
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Group Information */}
      {bookingData.isGroupBooking && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Group Booking</h3>
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
              <Users className="h-3 w-3 mr-1" />
              Group
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Group Size</span>
              <span>{bookingData.partySize + (bookingData.inviteList?.length || 0)} people</span>
            </div>
            <div className="flex justify-between">
              <span>Split Payment</span>
              <span className="text-green-600">₹{Math.round(totalCost / bookingData.partySize)} per person</span>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="w-full mt-3 text-purple-600 border-purple-300 hover:bg-purple-50"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Open Group Chat
          </Button>
        </Card>
      )}

      {/* QR Codes */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Digital Tickets</h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowQRCodes(!showQRCodes)}
          >
            <QrCode className="h-4 w-4 mr-2" />
            {showQRCodes ? 'Hide' : 'Show'} QR Codes
          </Button>
        </div>

        {showQRCodes && (
          <div className="space-y-4">
            {selectedPackage === 'bundle' && (
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="w-32 h-32 bg-white border-2 border-orange-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-orange-500" />
                </div>
                <p className="text-sm font-medium text-orange-900">Restaurant Check-in</p>
                <p className="text-xs text-orange-700">Show at restaurant entrance</p>
              </div>
            )}
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-32 h-32 bg-white border-2 border-blue-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-blue-900">Event Entry</p>
              <p className="text-xs text-blue-700">Scan at event venue</p>
            </div>
          </div>
        )}
      </Card>

      {/* Smart Reminders */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start">
          <Bell className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Smart Reminders Enabled</h3>
            <div className="space-y-1 text-sm text-blue-700">
              {selectedPackage === 'bundle' && (
                <p>• "Your table is ready" - 15 mins before dinner</p>
              )}
              <p>• "Event starts in 30 minutes" - Pre-event reminder</p>
              <p>• Weather updates and venue changes</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Summary */}
      <Card className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Payment Summary</h3>
        <div className="space-y-2 text-sm">
          {selectedPackage === 'bundle' && (
            <>
              <div className="flex justify-between">
                <span>Dinner ({bookingData.partySize} guests)</span>
                <span>₹{bundlePrice.dinner * bookingData.partySize}</span>
              </div>
              <div className="flex justify-between">
                <span>Event ({bookingData.partySize} tickets)</span>
                <span>₹{bundlePrice.event * bookingData.partySize}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Bundle Savings</span>
                <span>-₹{bundlePrice.savings * bookingData.partySize}</span>
              </div>
              <Separator />
            </>
          )}
          <div className="flex justify-between font-medium text-lg">
            <span>Total Paid</span>
            <span>₹{totalCost}</span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={addToCalendar}>
          <Calendar className="h-4 w-4 mr-2" />
          Add to Calendar
        </Button>
        <Button variant="outline" onClick={shareBooking}>
          <Share className="h-4 w-4 mr-2" />
          Share Plans
        </Button>
      </div>

      <Button onClick={onNewBooking} className="w-full bg-orange-500 hover:bg-orange-600">
        Book Another Event
      </Button>
    </div>
  );
};

export default BookingConfirmation;
