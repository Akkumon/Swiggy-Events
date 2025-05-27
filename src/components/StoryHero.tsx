
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Foreground Story Layer */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <Badge className="w-fit mb-3 bg-orange-500/90 hover:bg-orange-600">
          {event.type}
        </Badge>
        
        {/* Human-written headline */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
          {event.story.headline}
        </h1>
        
        {/* Location with character */}
        <div className="flex items-center mb-3 text-white/90">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        
        {/* Empathy-driven narrative */}
        <p className="text-white/95 text-sm md:text-base mb-3 leading-relaxed max-w-2xl">
          {event.story.narrative}
        </p>
        
        {/* Meet the Host section */}
        <div className="flex items-center text-xs text-white/80 bg-white/10 backdrop-blur-sm rounded-lg p-2 w-fit">
          <Heart className="h-3 w-3 mr-1 text-red-400" />
          <span>{event.story.hostStory}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryHero;
