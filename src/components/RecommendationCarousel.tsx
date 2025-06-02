
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Sparkles, Users, Heart, Bookmark, Share, MapPin, Clock } from 'lucide-react';

interface RecommendationCarouselProps {
  onEventClick: (eventId: number) => void;
}

const RecommendationCarousel = ({ onEventClick }: RecommendationCarouselProps) => {
  const recommendations = [
    {
      id: 8,
      title: "Rooftop Jazz & Wine",
      venue: "Skyline Lounge",
      image: "https://images.unsplash.com/photo-1574391884720-bbc30de1fba8?w=300&h=150&fit=crop",
      time: "Tonight, 8:00 PM",
      distance: "1.2 km away",
      reason: "Because you love jazz and wine tastings",
      socialProof: "3 friends are going",
      friendsAvatars: [
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      ],
      tags: ["Popular with your network", "Perfect for date night"],
      attendees: 67,
      price: "₹2,500 for two"
    },
    {
      id: 9,
      title: "Street Food Carnival",
      venue: "Forum Mall Plaza",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=150&fit=crop",
      time: "Tomorrow, 6:00 PM",
      distance: "800 m away",
      reason: "Based on your 12 street food orders",
      socialProof: "Popular with people like you",
      networkActivity: "47 people in your area went to similar events",
      tags: ["Great for groups", "Family friendly"],
      attendees: 203,
      price: "₹500 per person"
    },
    {
      id: 10,
      title: "Cooking Masterclass",
      venue: "Chef's Table Academy",
      image: "https://images.unsplash.com/photo-1556908114-f6e7ad7d3136?w=300&h=150&fit=crop",
      time: "Sat, 3:00 PM",
      distance: "2.1 km away",
      reason: "You frequently order Italian food",
      socialProof: "Trending in Koramangala",
      trendingNote: "Bookings up 340% this week",
      tags: ["Learn & taste", "Interactive experience"],
      attendees: 24,
      price: "₹3,200 per person"
    }
  ];

  const handleQuickAction = (action: string, eventId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`${action} action for event ${eventId}`);
    
    if (action === 'share' && navigator.share) {
      navigator.share({
        title: 'Check out this event!',
        text: 'Found this amazing event on Swiggy Events',
        url: window.location.href
      }).catch(console.error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
        <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs ml-auto">
          AI Powered
        </Badge>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {recommendations.map((rec) => (
            <CarouselItem key={rec.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <Card 
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onEventClick(rec.id)}
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={rec.image}
                    alt={rec.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => handleQuickAction('save', rec.id, e)}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => handleQuickAction('share', rec.id, e)}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {rec.tags && (
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      {rec.tags.slice(0, 1).map((tag, index) => (
                        <Badge key={index} className="bg-orange-500 text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{rec.venue}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {rec.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {rec.distance}
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="bg-blue-50 rounded-lg p-2 mb-3 border border-blue-100">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-900">Why this?</span>
                    </div>
                    <p className="text-xs text-blue-700">{rec.reason}</p>
                  </div>

                  {/* Social Proof */}
                  <div className="space-y-2 mb-3">
                    {rec.friendsAvatars && (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {rec.friendsAvatars.map((avatar, index) => (
                            <img
                              key={index}
                              src={avatar}
                              alt="Friend"
                              className="w-6 h-6 rounded-full border-2 border-white"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-green-600 font-medium">{rec.socialProof}</p>
                      </div>
                    )}
                    
                    {rec.networkActivity && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-orange-500" />
                        <p className="text-xs text-orange-600">{rec.networkActivity}</p>
                      </div>
                    )}
                    
                    {rec.trendingNote && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <p className="text-xs text-red-600 font-medium">{rec.trendingNote}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span>{rec.attendees} going</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {rec.price}
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-3 bg-orange-500 hover:bg-orange-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(rec.id);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecommendationCarousel;
