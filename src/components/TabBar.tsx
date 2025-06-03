
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ShoppingBag, Calendar, User, Package, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock partner status - in real app this would come from auth context
  const isPartner = true; // Mock value - replace with actual partner status check

  // Mock notification counts for ecosystem integration
  const notifications = {
    swiggy: 2,
    instamart: 0,
    events: 1,
    organize: 0
  };

  const tabs = [
    {
      id: 'swiggy',
      label: 'SWIGGY',
      icon: MapPin,
      path: '/',
      isActive: false,
      notifications: notifications.swiggy,
      description: 'Food Delivery'
    },
    {
      id: 'food',
      label: 'FOOD',
      icon: Package,
      path: '/food',
      isActive: false,
      notifications: 0,
      description: 'Quick Bites'
    },
    {
      id: 'instamart',
      label: 'INSTAMART',
      icon: ShoppingBag,
      path: '/instamart',
      isActive: false,
      notifications: notifications.instamart,
      description: 'Groceries'
    },
    {
      id: 'events',
      label: 'EVENTS',
      icon: Calendar,
      path: '/',
      isActive: location.pathname === '/' || location.pathname.startsWith('/event'),
      notifications: notifications.events,
      description: 'Dine & Events'
    },
    {
      id: 'profile',
      label: 'PROFILE',
      icon: User,
      path: '/profile',
      isActive: location.pathname === '/profile',
      notifications: 0,
      description: 'Account'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      {/* Swiggy One Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Gift className="h-3 w-3" />
            <span>Swiggy One Gold • Active</span>
          </div>
          <span>2,840 points • ₹450 wallet</span>
        </div>
      </div>
      
      <div className="flex">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center py-2 px-1 relative ${
                tab.isActive 
                  ? 'text-orange-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <IconComponent className="h-5 w-5 mb-1" />
                {tab.notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[16px] h-4 flex items-center justify-center p-0">
                    {tab.notifications}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
              <span className="text-[10px] text-gray-400 mt-0.5">{tab.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
