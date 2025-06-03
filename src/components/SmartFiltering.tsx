
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Filter, Users, MapPin, Star, Clock } from 'lucide-react';

interface SmartFilteringProps {
  onFilterChange: (filters: any) => void;
}

const SmartFiltering = ({ onFilterChange }: SmartFilteringProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const personalizedFilters = [
    {
      id: 'visited_restaurants',
      label: 'Events at restaurants you\'ve visited',
      count: 8,
      icon: <Star className="h-3 w-3" />
    },
    {
      id: 'italian_live_music',
      label: 'Italian restaurants with live music',
      count: 3,
      icon: <Filter className="h-3 w-3" />
    },
    {
      id: 'group_of_4',
      label: 'Perfect for your usual group of 4',
      count: 12,
      icon: <Users className="h-3 w-3" />
    },
    {
      id: 'walking_distance',
      label: 'Walking distance from your location',
      count: 6,
      icon: <MapPin className="h-3 w-3" />
    },
    {
      id: 'evening_events',
      label: 'Evening events (your preferred time)',
      count: 15,
      icon: <Clock className="h-3 w-3" />
    }
  ];

  const quickFilters = [
    'Food Available',
    'Tonight',
    'This Weekend',
    'Free Entry',
    'Live Music',
    'Outdoor Seating'
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Personalized Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-orange-500" />
          <h3 className="font-medium text-gray-900">Smart Filters for You</h3>
        </div>
        
        <div className="space-y-2">
          {personalizedFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilters.includes(filter.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter.id)}
              className={`w-full justify-between text-left h-auto py-2 px-3 ${
                activeFilters.includes(filter.id) 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'hover:bg-orange-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {filter.icon}
                <span className="text-sm">{filter.label}</span>
              </div>
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  activeFilters.includes(filter.id) 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </Card>

      {/* Quick Filters */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2 text-sm">Quick Filters</h4>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter)}
              className={`text-xs ${
                activeFilters.includes(filter) 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'hover:bg-orange-50'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {activeFilters.length > 0 && (
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-900">
              {activeFilters.length} filter{activeFilters.length > 1 ? 's' : ''} applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setActiveFilters([]);
                onFilterChange([]);
              }}
              className="text-orange-600 hover:text-orange-700 text-xs"
            >
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {activeFilters.map((filter) => (
              <Badge 
                key={filter} 
                variant="outline" 
                className="text-orange-700 border-orange-300 text-xs"
              >
                {personalizedFilters.find(f => f.id === filter)?.label || filter}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartFiltering;
