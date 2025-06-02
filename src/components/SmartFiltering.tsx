
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Heart, 
  Zap, 
  Calendar, 
  Users, 
  Map,
  Filter,
  X
} from 'lucide-react';

interface SmartFilteringProps {
  onFilterChange: (filters: any) => void;
  showMapView: boolean;
  onMapToggle: () => void;
}

const SmartFiltering = ({ onFilterChange, showMapView, onMapToggle }: SmartFilteringProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showAllFilters, setShowAllFilters] = useState(false);

  const smartFilters = [
    {
      category: "Based on your behavior",
      filters: [
        { id: "italian-lover", label: "More Italian events", icon: Heart, color: "text-red-500 bg-red-50 border-red-200" },
        { id: "frequent-diner", label: "At restaurants you visit", icon: Users, color: "text-green-500 bg-green-50 border-green-200" },
        { id: "weekend-explorer", label: "Weekend experiences", icon: Calendar, color: "text-blue-500 bg-blue-50 border-blue-200" }
      ]
    },
    {
      category: "Location & Distance",
      filters: [
        { id: "walking-distance", label: "Within walking distance", icon: MapPin, color: "text-orange-500 bg-orange-50 border-orange-200", subtitle: "< 500m" },
        { id: "quick-commute", label: "Quick commute", icon: MapPin, color: "text-orange-500 bg-orange-50 border-orange-200", subtitle: "< 2km" },
        { id: "along-route", label: "Along your usual routes", icon: MapPin, color: "text-orange-500 bg-orange-50 border-orange-200" }
      ]
    },
    {
      category: "Mood & Occasion",
      filters: [
        { id: "relaxing-evening", label: "Relaxing evening", icon: Heart, color: "text-purple-500 bg-purple-50 border-purple-200" },
        { id: "high-energy", label: "High-energy night", icon: Zap, color: "text-yellow-500 bg-yellow-50 border-yellow-200" },
        { id: "date-night", label: "Perfect for date night", icon: Heart, color: "text-pink-500 bg-pink-50 border-pink-200" },
        { id: "celebration", label: "Great for celebrations", icon: Users, color: "text-indigo-500 bg-indigo-50 border-indigo-200" }
      ]
    },
    {
      category: "Timing",
      filters: [
        { id: "tonight", label: "Tonight", icon: Clock, color: "text-red-500 bg-red-50 border-red-200" },
        { id: "this-weekend", label: "This weekend", icon: Calendar, color: "text-blue-500 bg-blue-50 border-blue-200" },
        { id: "after-work", label: "After work hours", icon: Clock, color: "text-gray-500 bg-gray-50 border-gray-200", subtitle: "6 PM onwards" }
      ]
    }
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onFilterChange([]);
  };

  const getVisibleCategories = () => {
    return showAllFilters ? smartFilters : smartFilters.slice(0, 2);
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <h3 className="font-medium text-gray-900">Smart Filters</h3>
          {activeFilters.length > 0 && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              {activeFilters.length} active
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMapToggle}
            className={showMapView ? "bg-orange-50 border-orange-200 text-orange-600" : ""}
          >
            <Map className="h-4 w-4 mr-1" />
            {showMapView ? "List View" : "Map View"}
          </Button>
          
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Smart Suggestions Based on Behavior */}
      <Card className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-blue-900">Smart Suggestion</span>
        </div>
        <p className="text-sm text-blue-700 mb-2">
          Based on your dining pattern, you typically book events on weekends around Italian restaurants
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleFilter("weekend-explorer")}
            className="text-xs bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Apply Weekend Filter
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleFilter("italian-lover")}
            className="text-xs bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Show Italian Events
          </Button>
        </div>
      </Card>

      {/* Filter Categories */}
      <div className="space-y-4">
        {getVisibleCategories().map((category) => (
          <div key={category.category}>
            <h4 className="text-sm font-medium text-gray-700 mb-2">{category.category}</h4>
            <div className="grid grid-cols-1 gap-2">
              {category.filters.map((filter) => {
                const IconComponent = filter.icon;
                const isActive = activeFilters.includes(filter.id);
                
                return (
                  <Button
                    key={filter.id}
                    variant="outline"
                    onClick={() => toggleFilter(filter.id)}
                    className={`justify-start h-auto p-3 text-left ${
                      isActive 
                        ? `${filter.color} border-2` 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <IconComponent className={`h-4 w-4 ${isActive ? filter.color.split(' ')[0] : 'text-gray-500'}`} />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isActive ? filter.color.split(' ')[0] : 'text-gray-900'}`}>
                          {filter.label}
                        </p>
                        {filter.subtitle && (
                          <p className="text-xs text-gray-500">{filter.subtitle}</p>
                        )}
                      </div>
                      {isActive && (
                        <div className={`w-2 h-2 rounded-full ${filter.color.split(' ')[0].replace('text-', 'bg-')}`} />
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Toggle */}
      <Button
        variant="ghost"
        onClick={() => setShowAllFilters(!showAllFilters)}
        className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50"
      >
        {showAllFilters ? 'Show Less Filters' : `Show More Filters (${smartFilters.length - 2} more categories)`}
      </Button>

      {/* Applied Filters Summary */}
      {activeFilters.length > 0 && (
        <Card className="p-3 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filterId) => {
              const filter = smartFilters
                .flatMap(cat => cat.filters)
                .find(f => f.id === filterId);
              
              return filter ? (
                <Badge
                  key={filterId}
                  variant="outline"
                  className="text-xs bg-white"
                >
                  {filter.label}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFilter(filterId)}
                    className="ml-1 h-3 w-3 p-0 hover:bg-red-100"
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </Badge>
              ) : null;
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SmartFiltering;
