
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Bell, Heart, MapPin } from 'lucide-react';

interface CustomerSegment {
  name: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  engagement: string;
}

const CustomerTargetingTools = ({ eventType, cuisine }: { eventType: string; cuisine: string }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const analyzeCustomerSegments = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const customerSegments: CustomerSegment[] = [
        {
          name: "Regular Customers",
          count: 247,
          description: "Customers who ordered from you in the last 30 days",
          icon: <Heart className="h-4 w-4" />,
          engagement: "85% open rate"
        },
        {
          name: `${cuisine} Food Lovers`,
          count: 432,
          description: `Customers who frequently order ${cuisine} cuisine`,
          icon: <Target className="h-4 w-4" />,
          engagement: "72% event attendance"
        },
        {
          name: "Local Event Enthusiasts",
          count: 156,
          description: "Customers who attend local food events regularly",
          icon: <MapPin className="h-4 w-4" />,
          engagement: "90% conversion rate"
        },
        {
          name: "Weekend Diners",
          count: 189,
          description: "Customers who order frequently on weekends",
          icon: <Users className="h-4 w-4" />,
          engagement: "68% weekend engagement"
        }
      ];
      setSegments(customerSegments);
      setIsAnalyzing(false);
    }, 1500);
  };

  const toggleSegment = (segmentName: string) => {
    setSelectedSegments(prev => 
      prev.includes(segmentName) 
        ? prev.filter(s => s !== segmentName)
        : [...prev, segmentName]
    );
  };

  const totalReach = segments
    .filter(s => selectedSegments.includes(s.name))
    .reduce((sum, s) => sum + s.count, 0);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">Customer Targeting</h3>
        </div>
        <Button 
          onClick={analyzeCustomerSegments}
          disabled={isAnalyzing}
          size="sm"
          variant="outline"
        >
          {isAnalyzing ? "Analyzing..." : "Find Customers"}
        </Button>
      </div>

      {!segments.length && !isAnalyzing && (
        <div className="text-center py-6 text-gray-500">
          <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Discover customer segments that match your event</p>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Analyzing customer data...</p>
        </div>
      )}

      {segments.length > 0 && (
        <div className="space-y-3">
          <div className="bg-purple-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-purple-800">
              <strong>Smart Insights:</strong> Based on your delivery history and customer preferences
            </p>
          </div>
          
          {segments.map((segment) => (
            <div 
              key={segment.name}
              onClick={() => toggleSegment(segment.name)}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedSegments.includes(segment.name) 
                  ? 'bg-purple-50 border-purple-200' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {segment.icon}
                  <span className="font-medium">{segment.name}</span>
                  <Badge variant="outline">{segment.count} customers</Badge>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {segment.engagement}
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{segment.description}</p>
            </div>
          ))}

          {selectedSegments.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Ready to Notify</span>
              </div>
              <p className="text-sm text-green-800 mb-3">
                Reach <strong>{totalReach} customers</strong> who are likely to attend your event
              </p>
              <Button size="sm" className="w-full">
                Send Event Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default CustomerTargetingTools;
