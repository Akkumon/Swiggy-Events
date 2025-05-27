
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Camera, Heart, MessageCircle } from 'lucide-react';

interface CommunityVoicesProps {
  eventId: number;
}

const CommunityVoices = ({ eventId }: CommunityVoicesProps) => {
  // Mock community contributions - in real app, this would come from API
  const contributions = [
    {
      id: 1,
      author: "Priya M.",
      role: "Local Food Blogger",
      content: "I found my new favorite golgappa spot here—trust me, wear loose pants! 😄 The tamarind chutney was absolutely divine.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop",
      likes: 24,
      verified: true
    },
    {
      id: 2,
      author: "Rahul K.",
      role: "Event Photographer",
      content: "Captured some magical moments at sunset. The energy here is infectious - you can feel the community spirit!",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=100&h=100&fit=crop",
      likes: 18,
      verified: false
    },
    {
      id: 3,
      author: "Ananya S.",
      role: "Past Attendee",
      content: "Third time coming back! The organizers really care about bringing authentic flavors together. Don't miss the dosa corner!",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop",
      likes: 31,
      verified: true
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Community Voices</h3>
        <Badge variant="outline" className="text-orange-600 border-orange-200">
          Real Stories
        </Badge>
      </div>
      
      <div className="grid gap-3">
        {contributions.map((contribution) => (
          <Card key={contribution.id} className="p-4 bg-gradient-to-r from-orange-50/50 to-amber-50/50 border border-orange-100">
            <div className="flex space-x-3">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <img
                    src={contribution.image}
                    alt={contribution.author}
                    className="w-full h-full object-cover rounded-full"
                  />
                </Avatar>
                {contribution.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Camera className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{contribution.author}</h4>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-orange-600 font-medium">{contribution.role}</span>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-2">
                  {contribution.content}
                </p>
                
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{contribution.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center py-3">
        <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
          Share your experience →
        </button>
      </div>
    </div>
  );
};

export default CommunityVoices;
