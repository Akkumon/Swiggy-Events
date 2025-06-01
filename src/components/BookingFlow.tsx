import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Calendar, Clock, MapPin, Star, Utensils, Ticket, Gift, MessageCircle } from 'lucide-react';
import BookingForm from './BookingForm';
import GroupBookingOptions from './GroupBookingOptions';
import BookingConfirmation from './BookingConfirmation';
import TimingCoordination from './TimingCoordination';
import CoordinationStatus from './CoordinationStatus';

interface BookingFlowProps {
  eventData: any;
  restaurantData: any;
}

const BookingFlow = ({ eventData, restaurantData }: BookingFlowProps) => {
  const [selectedPackage, setSelectedPackage] = useState<'bundle' | 'event-only' | null>(null);
  const [bookingStep, setBookingStep] = useState<'selection' | 'timing' | 'form' | 'group' | 'confirmation'>('selection');
  const [bookingData, setBookingData] = useState(null);
  const [selectedTiming, setSelectedTiming] = useState(null);

  const bundlePrice = {
    dinner: 800,
    event: 400,
    total: 1200,
    savings: 100
  };

  const handlePackageSelect = (packageType: 'bundle' | 'event-only') => {
    setSelectedPackage(packageType);
    if (packageType === 'bundle') {
      setBookingStep('timing');
    } else {
      setBookingStep('form');
    }
  };

  const handleTimingSelect = (timing: any) => {
    setSelectedTiming(timing);
    setBookingStep('form');
  };

  const handleFormSubmit = (formData: any) => {
    setBookingData({ ...formData, timing: selectedTiming });
    if (formData.isGroupBooking) {
      setBookingStep('group');
    } else {
      setBookingStep('confirmation');
    }
  };

  const handleGroupSetup = (groupData: any) => {
    setBookingData({ ...bookingData, ...groupData });
    setBookingStep('confirmation');
  };

  if (bookingStep === 'confirmation' && bookingData) {
    return (
      <BookingConfirmation
        bookingData={bookingData}
        selectedPackage={selectedPackage}
        eventData={eventData}
        restaurantData={restaurantData}
        bundlePrice={bundlePrice}
        onNewBooking={() => {
          setBookingStep('selection');
          setSelectedPackage(null);
          setBookingData(null);
          setSelectedTiming(null);
        }}
      />
    );
  }

  if (bookingStep === 'group' && bookingData) {
    return (
      <GroupBookingOptions
        bookingData={bookingData}
        selectedPackage={selectedPackage}
        onGroupSetup={handleGroupSetup}
        onBack={() => setBookingStep('form')}
      />
    );
  }

  if (bookingStep === 'form' && selectedPackage) {
    return (
      <div className="space-y-4">
        {selectedPackage === 'bundle' && selectedTiming && (
          <CoordinationStatus
            dinnerTime={selectedTiming.dinnerTime}
            eventTime={selectedTiming.eventTime}
            bufferTime={selectedTiming.bufferTime}
          />
        )}
        <BookingForm
          selectedPackage={selectedPackage}
          eventData={eventData}
          restaurantData={restaurantData}
          bundlePrice={bundlePrice}
          selectedTiming={selectedTiming}
          onSubmit={handleFormSubmit}
          onBack={() => {
            if (selectedPackage === 'bundle') {
              setBookingStep('timing');
            } else {
              setBookingStep('selection');
            }
          }}
        />
      </div>
    );
  }

  if (bookingStep === 'timing' && selectedPackage === 'bundle') {
    return (
      <div className="space-y-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={() => setBookingStep('selection')} className="mr-3">
            ← Back
          </Button>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Perfect Your Timing</h3>
            <p className="text-sm text-gray-600">Choose your ideal dinner + event experience</p>
          </div>
        </div>
        
        <TimingCoordination
          eventTime={eventData.time || '8:00 PM'}
          onTimingSelect={handleTimingSelect}
          selectedTiming={selectedTiming}
        />
        
        {selectedTiming && (
          <Button 
            onClick={() => setBookingStep('form')} 
            className="w-full bg-orange-500 hover:bg-orange-600 py-3"
          >
            Continue with {selectedTiming.name}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Book Your Experience</h3>
        <p className="text-gray-600">Choose between our bundled package or event-only option</p>
      </div>

      {/* Bundle Package - Primary Option */}
      <div className="space-y-4 mb-6">
        <Card className="p-4 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-600 hover:bg-green-700 text-white">
              <Gift className="h-3 w-3 mr-1" />
              Best Value
            </Badge>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-bold text-gray-900 mb-1">Dinner + Event Package</h4>
            <p className="text-sm text-gray-600">Complete evening experience at {restaurantData.name}</p>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Utensils className="h-4 w-4 text-orange-500 mr-2" />
                <span>3-Course Dinner</span>
              </div>
              <span className="font-medium">₹{bundlePrice.dinner}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Ticket className="h-4 w-4 text-orange-500 mr-2" />
                <span>Event Entry</span>
              </div>
              <span className="font-medium">₹{bundlePrice.event}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Bundle Total</span>
              <div className="text-right">
                <span className="line-through text-gray-500 text-xs mr-2">₹{bundlePrice.dinner + bundlePrice.event + bundlePrice.savings}</span>
                <span className="text-lg text-green-600">₹{bundlePrice.total}</span>
              </div>
            </div>
            <div className="text-center">
              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                Save ₹{bundlePrice.savings} vs separate bookings
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-600">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>6:00 PM Dinner</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>7:30 PM Event</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>Same Venue</span>
            </div>
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1" />
              <span>Reserved Table</span>
            </div>
          </div>

          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
            onClick={() => handlePackageSelect('bundle')}
          >
            Book Dinner + Event Package
          </Button>
        </Card>

        {/* Event Only - Secondary Option */}
        <Card className="p-4 border border-gray-200">
          <div className="mb-4">
            <h4 className="text-base font-semibold text-gray-900 mb-1">Event Only</h4>
            <p className="text-sm text-gray-600">Just the {eventData.name} experience</p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Ticket className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm">Event Entry</span>
            </div>
            <span className="text-lg font-medium">₹{bundlePrice.event}</span>
          </div>

          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => handlePackageSelect('event-only')}
          >
            Book Event Only
          </Button>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="text-center text-xs text-gray-500">
        <p className="mb-2">✓ Free cancellation up to 2 hours before</p>
        <p>✓ Group booking discounts available</p>
      </div>
    </Card>
  );
};

export default BookingFlow;
