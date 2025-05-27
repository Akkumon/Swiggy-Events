import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin, Heart } from 'lucide-react';

interface StoryHeroProps {
  event: {
    name: string;
    type: string;
    location: string;
    image: string;
    story: {
      headline: string;
      narrative: string;
      hostStory: string;
    };
  };
}

const StoryHero = ({ event }: StoryHeroProps) => {
  return (
    <div className="relative h-80 overflow-hidden rounded-2xl">
      {/* Background Layer with subtle animation */}
      <div className="absolute inset-0">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Enhanced gradient overlay with progressive blur */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
      </div>

      {/* Foreground Story Layer with enhanced readability */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <Badge className="w-fit mb-3 bg-orange-500/90 hover:bg-orange-600 backdrop-blur-sm">
          {event.type}
        </Badge>
        
        {/* Human-written headline with enhanced contrast */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight drop-shadow-lg">
          {event.story.headline}
        </h1>
        
        {/* Location with character */}
        <div className="flex items-center mb-3 text-white/90">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm drop-shadow-md">{event.location}</span>
        </div>
        
        {/* Empathy-driven narrative with enhanced readability */}
        <p className="text-white/95 text-sm md:text-base mb-3 leading-relaxed max-w-2xl drop-shadow-md">
          {event.story.narrative}
        </p>
        
        {/* Meet the Host section with enhanced backdrop */}
        <div className="flex items-center text-xs text-white/90 bg-white/15 backdrop-blur-md rounded-lg p-2 w-fit border border-white/10">
          <Heart className="h-3 w-3 mr-1 text-red-400" />
          <span>{event.story.hostStory}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryHero;
