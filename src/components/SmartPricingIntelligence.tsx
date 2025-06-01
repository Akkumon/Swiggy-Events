
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Users, DollarSign, BarChart } from 'lucide-react';

interface PricingRecommendation {
  strategy: string;
  price: number;
  expectedAttendees: number;
  revenue: number;
  reasoning: string;
}

const SmartPricingIntelligence = ({ eventType, location }: { eventType: string; location: string }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<PricingRecommendation[]>([]);

  const generatePricingRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const recs: PricingRecommendation[] = [
        {
          strategy: "Maximize Revenue",
          price: 599,
          expectedAttendees: 45,
          revenue: 26955,
          reasoning: "Premium pricing based on local market analysis and event exclusivity"
        },
        {
          strategy: "Fill Capacity",
          price: 399,
          expectedAttendees: 80,
          revenue: 31920,
          reasoning: "Competitive pricing to maximize attendance and customer acquisition"
        },
        {
          strategy: "Market Average",
          price: 499,
          expectedAttendees: 65,
          revenue: 32435,
          reasoning: "Balanced approach based on similar events in your area"
        }
      ];
      setRecommendations(recs);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Smart Pricing Intelligence</h3>
        </div>
        <Button 
          onClick={generatePricingRecommendations}
          disabled={isAnalyzing}
          size="sm"
          variant="outline"
        >
          {isAnalyzing ? "Analyzing..." : "Get Pricing"}
        </Button>
      </div>

      {!recommendations.length && !isAnalyzing && (
        <div className="text-center py-6 text-gray-500">
          <BarChart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">Get AI-powered pricing recommendations based on market data</p>
        </div>
      )}

      {isAnalyzing && (
        <div className="text-center py-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Analyzing market data for {eventType} in {location}...</p>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-3">
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <strong>Market Analysis:</strong> Similar {eventType} events in {location} charge ₹450-650
            </p>
          </div>
          
          {recommendations.map((rec, index) => (
            <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={index === 2 ? "default" : "secondary"}>
                    {rec.strategy}
                  </Badge>
                  {index === 2 && <Badge variant="outline" className="text-green-600">Recommended</Badge>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{rec.price}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {rec.expectedAttendees} attendees
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  ₹{rec.revenue.toLocaleString()} revenue
                </div>
              </div>
              
              <p className="text-xs text-gray-500">{rec.reasoning}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SmartPricingIntelligence;
