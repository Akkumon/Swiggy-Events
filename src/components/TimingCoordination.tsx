
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, Calendar, ArrowRight, Coffee, Utensils, Music } from 'lucide-react';

interface TimingOption {
  id: string;
  name: string;
  description: string;
  dinnerTime: string;
  bufferTime: number;
  eventTime: string;
  totalDuration: string;
  benefits: string[];
  recommended?: boolean;
}

interface TimingCoordinationProps {
  eventTime: string;
  onTimingSelect: (timing: TimingOption) => void;
  selectedTiming?: TimingOption;
}

const TimingCoordination = ({ eventTime, onTimingSelect, selectedTiming }: TimingCoordinationProps) => {
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);

  const timingOptions: TimingOption[] = [
    {
      id: 'perfect',
      name: 'Perfect Timing',
      description: 'Optimal dining experience with comfortable transition',
      dinnerTime: '6:00 PM',
      bufferTime: 30,
      eventTime: eventTime,
      totalDuration: '4.5 hours',
      benefits: [
        'No rush between experiences',
        'Time to enjoy each course',
        'Perfect arrival at event',
        'Stress-free evening'
      ],
      recommended: true
    },
    {
      id: 'quick',
      name: 'Quick Bite',
      description: 'Efficient dining with focus on the event',
      dinnerTime: '6:45 PM',
      bufferTime: 15,
      eventTime: eventTime,
      totalDuration: '3.5 hours',
      benefits: [
        'Quick transition',
        'Light meal before event',
        'More time at event',
        'Good for casual dining'
      ]
    },
    {
      id: 'relaxed',
      name: 'Relaxed Pace',
      description: 'Extended dining with leisurely transition',
      dinnerTime: '5:30 PM',
      bufferTime: 45,
      eventTime: eventTime,
      totalDuration: '5 hours',
      benefits: [
        'Extended dining experience',
        'Extra buffer time',
        'No time pressure',
        'Perfect for celebrations'
      ]
    }
  ];

  const renderTimeline = (option: TimingOption) => {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Utensils className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs text-gray-600 mt-1">Dinner</span>
            <span className="text-sm font-medium">{option.dinnerTime}</span>
          </div>
          
          <div className="flex-1 flex items-center">
            <div className="flex-1 h-1 bg-orange-200 rounded">
              <div className="h-full bg-orange-500 rounded" style={{ width: '40%' }} />
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
            <div className="flex-1 h-1 bg-blue-200 rounded">
              <div className="h-full bg-blue-500 rounded" style={{ width: '60%' }} />
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Music className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs text-gray-600 mt-1">Event</span>
            <span className="text-sm font-medium">{option.eventTime}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center text-green-600 mb-1">
            <Clock className="h-3 w-3 mr-1" />
            <span className="text-xs">{option.bufferTime} min buffer</span>
          </div>
          <span className="text-sm text-gray-600">{option.totalDuration} total</span>
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Smart Timing Coordination</h3>
        <Badge className="bg-green-600 hover:bg-green-700 text-white">
          <CheckCircle className="h-3 w-3 mr-1" />
          Everything's coordinated perfectly
        </Badge>
      </div>
      
      <p className="text-gray-600 mb-6">We've calculated the perfect dining times for your event. Choose your preferred pace:</p>
      
      <div className="space-y-4">
        {timingOptions.map((option) => (
          <Card 
            key={option.id} 
            className={`p-4 cursor-pointer transition-all ${
              selectedTiming?.id === option.id 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-300'
            } ${option.recommended ? 'ring-2 ring-orange-200' : ''}`}
            onClick={() => onTimingSelect(option)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">{option.name}</h4>
                  {option.recommended && (
                    <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedDetails(expandedDetails === option.id ? null : option.id);
                }}
              >
                {expandedDetails === option.id ? 'Hide Details' : 'View Details'}
              </Button>
            </div>
            
            {renderTimeline(option)}
            
            {expandedDetails === option.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Why this timing works:</h5>
                <div className="grid grid-cols-2 gap-2">
                  {option.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Complete Experience Flow</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Arrive at {option.dinnerTime} → Enjoy dinner → {option.bufferTime} minutes to transition → Event starts at {option.eventTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium text-green-900">No Rush Guarantee</h4>
            <p className="text-sm text-green-700 mt-1">
              Your table reservation and event tickets are perfectly synchronized. If you're running late, just tap "Running Late?" in your booking confirmation for instant assistance.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TimingCoordination;
