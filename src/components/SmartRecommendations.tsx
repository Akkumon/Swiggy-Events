
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, TrendingUp, MapPin } from 'lucide-react';

interface SmartRecommendationsProps {
  onEventClick: (eventId: number) => void;
}

const SmartRecommendations = ({ onEventClick }: SmartRecommendationsProps) => {
  const recommendations = [
    {
      id: 5,
      title: "Jazz & Wine Night at Toscano",
      reason: "Because you love Italian food and live music",
      restaurantName: "Toscano Italian Bistro",
      image: "https://images.unsplash.com/photo-1574391884720-bbc30de1fba8?w=300&h=150&fit=crop",
      matchType: "cuisine_preference",
      confidence: 95,
      orderHistory: 3
    },
    {
      id: 6,
      title: "Street Food Festival Extension",
      reason: "Based on your 5 orders at Mumbai Express",
      restaurantName: "Mumbai Express",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=150&fit=crop",
      matchType: "order_history",
      confidence: 88,
      orderHistory: 5
    },
    {
      id: 7,
      title: "Sunset BBQ at Grill Masters",
      reason: "People with similar tastes also enjoyed this",
      restaurantName: "Grill Masters",
      image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=150&fit=crop",
      matchType: "collaborative",
      confidence: 82,
      orderHistory: 0
    }
  ];

  const getMatchIcon = (matchType: string) => {
    switch (matchType) {
      case 'cuisine_preference':
        return <Heart className="h-3 w-3 text-red-500" />;
      case 'order_history':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'collaborative':
        return <Sparkles className="h-3 w-3 text-purple-500" />;
      default:
        return <Sparkles className="h-3 w-3 text-orange-500" />;
    }
  };

  const getMatchColor = (matchType: string) => {
    switch (matchType) {
      case 'cuisine_preference':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'order_history':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'collaborative':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      default:
        return 'bg-orange-50 border-orange-200 text-orange-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Card 
            key={rec.id} 
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onEventClick(rec.id)}
          >
            <div className="flex gap-3">
              <img
                src={rec.image}
                alt={rec.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-gray-900 text-sm leading-tight">
                    {rec.title}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    {getMatchIcon(rec.matchType)}
                    <span className="text-xs text-gray-500">{rec.confidence}%</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">{rec.restaurantName}</p>
                
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs border ${getMatchColor(rec.matchType)}`}>
                  {getMatchIcon(rec.matchType)}
                  <span>{rec.reason}</span>
                </div>
                
                {rec.orderHistory > 0 && (
                  <p className="text-xs text-green-600 mt-1">
                    You've ordered here {rec.orderHistory} times
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-100">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-orange-600" />
          <h3 className="font-medium text-orange-900">Trending in Koramangala</h3>
        </div>
        <p className="text-sm text-orange-700 mb-2">
          Based on your location and dining preferences
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs">
            Italian restaurants with live music
          </Badge>
          <Badge variant="outline" className="text-orange-600 border-orange-200 text-xs">
            Perfect for groups of 4
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;
