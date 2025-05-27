import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Quote } from 'lucide-react';
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
      className={`overflow-hidden transition-all duration-300 cursor-pointer ${theme.visualElements.shadowStyle} ${theme.visualElements.borderStyle} ${theme.visualElements.cardStyle}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Image with hand-drawn map overlay on hover */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Editor's Pick Badge */}
        {event.editorsPick && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
              ✨ Editor's Pick
            </Badge>
          </div>
        )}
        
        {/* Food Available Badge */}
        {event.foodAvailable && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500 hover:bg-orange-600">
              Food Available
            </Badge>
          </div>
        )}
        
        {/* Hand-drawn style map overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 m-4 border-2 border-dashed border-orange-300">
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-orange-600" />
                <span className="font-medium">Meet the Host</span>
              </div>
              {event.hostNote && (
                <p className="text-xs text-gray-600 mt-1 italic">
                  "{event.hostNote}"
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content with thematic styling */}
      <div className={`p-4 ${theme.colors.background}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-lg font-semibold tracking-tight ${theme.colors.primary} flex-1`}>
            {event.name}
          </h3>
        </div>

        <div className={`flex items-center text-sm ${theme.colors.secondary} mb-2`}>
          <MapPin className="h-4 w-4 mr-1" />
          {event.location}
        </div>

        <p className={`text-sm ${theme.colors.primary} mb-3 line-clamp-2 ${theme.typography.bodyFont}`}>
          {event.description}
        </p>

        {/* User testimonial section */}
        {event.userTestimonial && (
          <div className="mb-3 p-2 bg-white/60 rounded-lg border-l-3 border-orange-300">
            <div className="flex items-start">
              <Quote className="h-3 w-3 text-orange-500 mr-1 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700 italic leading-relaxed">
                {event.userTestimonial}
              </p>
            </div>
          </div>
        )}

        {/* Editor's note for picks */}
        {event.editorsPick && event.editorNote && (
          <div className="mb-3 p-2 bg-purple-50 rounded-lg border border-purple-200">
            <p className={`text-xs ${theme.colors.accent} ${theme.typography.accentFont}`}>
              <span className="font-semibold">Editor's Note:</span> {event.editorNote}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <div className="flex items-center mb-1">
              <Calendar className="h-3 w-3 mr-1 text-orange-500" />
              <span className={`font-medium ${theme.colors.accent}`}>{event.date}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1 text-gray-500" />
              <span className="text-gray-500 text-xs">{event.attendees} going</span>
            </div>
          </div>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EnhancedEventCard;
