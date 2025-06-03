
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, ShoppingBag, Calendar, User, Package, Plus } from 'lucide-react';

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock user type - in real app this would come from auth context
  const isPartner = true; // This would be determined by actual authentication

  const tabs = [
    {
      id: 'swiggy',
      label: 'SWIGGY',
      icon: MapPin,
      path: '/',
      isActive: false
    },
    {
      id: 'food',
      label: 'FOOD',
      icon: Package,
      path: '/food',
      isActive: false
    },
    {
      id: 'instamart',
      label: 'INSTAMART',
      icon: ShoppingBag,
      path: '/instamart',
      isActive: false
    },
    {
      id: 'events',
      label: 'EVENTS',
      icon: Calendar,
      path: '/',
      isActive: location.pathname === '/' || location.pathname.startsWith('/event')
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
    <>
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

      {/* Floating Action Button for Partners */}
      {isPartner && (
        <button
          onClick={() => navigate('/create-event')}
          className="fixed bottom-20 right-4 w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 hover:scale-105"
          aria-label="Create Event"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}
    </>
  );
};

export default TabBar;
