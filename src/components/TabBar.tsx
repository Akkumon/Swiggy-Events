
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ShoppingBag, Calendar, User } from 'lucide-react';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: 'swiggy',
      label: 'SWIGGY',
      icon: MapPin,
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      id: 'food',
      label: 'FOOD',
      icon: ShoppingBag,
      path: '/food',
      isActive: location.pathname === '/food'
    },
    {
      id: 'instamart',
      label: 'INSTAMART',
      icon: ShoppingBag,
      path: '/instamart',
      isActive: location.pathname === '/instamart'
    },
    {
      id: 'events',
      label: 'EVENTS',
      icon: Calendar,
      path: '/',
      isActive: location.pathname === '/' || location.pathname.startsWith('/event') || location.pathname === '/create-event'
    },
    {
      id: 'account',
      label: 'ACCOUNT',
      icon: User,
      path: '/account',
      isActive: location.pathname === '/account'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${
                tab.isActive 
                  ? 'text-orange-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <IconComponent className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
