import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Quote, Share, Star, ShoppingBag } from 'lucide-react';
import { getEventTheme } from '@/data/eventThemes';
interface EnhancedEventCardProps {
  event: {
    id: number;
    name: string;
    type: string;
    date: string;
    location: string;
    description: string;
    image: string;
    attendees: number;
    foodAvailable: boolean;
    userTestimonial?: string;
    hostNote?: string;
    editorsPick?: boolean;
    editorNote?: string;
    restaurantName?: string;
    cuisineType?: string;
    userOrderHistory?: number;
    restaurantRating?: number;
    specialties?: string[];
  };
  onViewDetails: () => void;
}
const EnhancedEventCard = ({
  event,
  onViewDetails
}: EnhancedEventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getEventTheme(event.type);

  // Mock user preferences and history
  const hasOrderedBefore = event.userOrderHistory && event.userOrderHistory > 0;
  const matchesPreferences = event.cuisineType === 'Italian' || event.cuisineType === 'Street Food';
  return <Card className={`overflow-hidden transition-all duration-300 cursor-pointer ${theme.visualElements.shadowStyle} ${isHovered ? 'shadow-lg' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={onViewDetails}>
      {/* Image with Restaurant Branding */}
      <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200 overflow-hidden">
        <img src={event.image} alt={event.name} className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`} />
        
        {/* Restaurant Branding Overlay */}
        {event.restaurantName}
        
        {/* Relationship Indicators */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {hasOrderedBefore && <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">
              ✓ You've ordered here
            </Badge>}
          {matchesPreferences && <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
              Matches your taste
            </Badge>}
          {event.editorsPick && <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
              ✨ Swiggy Pick
            </Badge>}
        </div>
        
        {/* Food Available Badge */}
        {event.foodAvailable && <div className="absolute bottom-2 right-2">
            <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">
              Food Available
            </Badge>
          </div>}
      </div>

      {/* Content with Restaurant Context */}
      <div className={`p-3 sm:p-4 pb-4 sm:pb-5 ${theme.colors.background}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-base sm:text-lg font-semibold tracking-tight ${theme.colors.primary} flex-1`}>
            {event.name}
          </h3>
        </div>

        {/* Restaurant Details */}
        {event.restaurantName && <div className="mb-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{event.restaurantName}</span>
                {event.restaurantRating && <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-gray-600 ml-1">{event.restaurantRating}</span>
                  </div>}
              </div>
              {event.cuisineType && <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs">
                  {event.cuisineType}
                </Badge>}
            </div>
            
            {hasOrderedBefore && <p className="text-xs text-green-600 mt-1">
                You've ordered here {event.userOrderHistory} times
              </p>}
            
            {event.specialties && event.specialties.length > 0 && <p className="text-xs text-gray-500 mt-1">
                Known for: {event.specialties.slice(0, 2).join(', ')}
              </p>}
          </div>}

        <div className={`flex items-center text-xs sm:text-sm ${theme.colors.secondary} mb-2`}>
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          {event.location}
        </div>

        <div className="flex justify-between items-center pt-3">
          {/* Date and Attendees */}
          <div className="text-xs sm:text-sm">
            <div className="flex items-center mb-1">
              <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-orange-500" />
              <span className={`font-medium ${theme.colors.accent}`}>{event.date}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 text-gray-500" />
              <span className="text-gray-500 text-[10px] sm:text-xs">{event.attendees} going</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {event.foodAvailable && <Button variant="ghost" size="sm" onClick={e => {
            e.stopPropagation();
            console.log(`Quick order from ${event.restaurantName}`);
          }} className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-1">
                <ShoppingBag className="h-4 w-4" />
              </Button>}
            <Button variant="ghost" size="sm" onClick={e => {
            e.stopPropagation();
            if (navigator.share) {
              navigator.share({
                title: event.name,
                text: event.description,
                url: window.location.href
              }).catch(console.error);
            } else {
              alert(`Share this event: ${event.name} - ${window.location.href}`);
            }
          }} className="text-gray-500 hover:text-gray-700 p-1">
              <Share className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-xs px-2 py-1">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>;
};
export default EnhancedEventCard;