import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Quote, Share } from 'lucide-react';
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
  };
  onViewDetails: () => void;
}

const EnhancedEventCard = ({ event, onViewDetails }: EnhancedEventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getEventTheme(event.type);

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 cursor-pointer ${theme.visualElements.shadowStyle}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Editor's Pick Badge */}
        {event.editorsPick && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm">
              ✨ Swiggy Pick
            </Badge>
          </div>
        )}
        
        {/* Food Available Badge */}
        {event.foodAvailable && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <Badge className="bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm">
              Food Available
            </Badge>
          </div>
        )}
      </div>

      {/* Content with thematic styling */}
      <div className={`p-3 sm:p-4 pb-4 sm:pb-5 ${theme.colors.background}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-base sm:text-lg font-semibold tracking-tight ${theme.colors.primary} flex-1`}>
            {event.name}
          </h3>
        </div>

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
          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click event
                // TODO: Implement actual sharing functionality
                console.log(`Sharing event: ${event.name}`);
                // Example: navigator.share or open a share modal
                if (navigator.share) {
                  navigator.share({
                    title: event.name,
                    text: event.description,
                    url: window.location.href, // Replace with actual event URL
                  }).catch(console.error);
                } else {
                  // Fallback for browsers that don't support navigator.share
                  alert(`Share this event: ${event.name} - ${window.location.href}`);
                }
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-orange-500 hover:bg-orange-600 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedEventCard;
