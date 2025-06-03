
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Heart, 
  CreditCard, 
  Gift, 
  Settings, 
  HelpCircle, 
  Star,
  ChevronRight,
  Wallet,
  Bell,
  Shield
} from 'lucide-react';

const Profile = () => {
  const user = {
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    memberSince: "Dec 2020"
  };

  const menuItems = [
    {
      icon: MapPin,
      title: "Your Addresses",
      subtitle: "Manage delivery addresses",
      hasChevron: true
    },
    {
      icon: Heart,
      title: "Favourites",
      subtitle: "Your liked restaurants & dishes",
      hasChevron: true
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      subtitle: "Manage payment methods",
      hasChevron: true
    },
    {
      icon: Gift,
      title: "Swiggy Money",
      subtitle: "₹450 available",
      hasChevron: true,
      badge: "₹450"
    },
    {
      icon: Settings,
      title: "Settings",
      subtitle: "App preferences & privacy",
      hasChevron: true
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get help or contact us",
      hasChevron: true
    }
  ];

  const quickActions = [
    {
      icon: Star,
      title: "Rate Experience",
      color: "text-yellow-600"
    },
    {
      icon: Wallet,
      title: "Add Money",
      color: "text-green-600"
    },
    {
      icon: Bell,
      title: "Notifications",
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: "Privacy",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-4 py-6">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Profile</h1>
          
          {/* User Info Card */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Swiggy One Gold
                  </Badge>
                  <span className="text-xs text-gray-500">Member since {user.memberSince}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col p-3 bg-white border-gray-200"
            >
              <action.icon className={`h-5 w-5 mb-1 ${action.color}`} />
              <span className="text-xs text-gray-700">{action.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        <Card className="divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start h-auto p-4 rounded-none"
            >
              <div className="flex items-center w-full">
                <item.icon className="h-5 w-5 text-gray-600 mr-3" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {item.badge}
                    </Badge>
                  )}
                  {item.hasChevron && (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            </Button>
          ))}
        </Card>
      </div>

      {/* App Info */}
      <div className="px-4 mt-6 text-center">
        <p className="text-xs text-gray-500">App Version 4.28.1</p>
        <p className="text-xs text-gray-500 mt-1">
          Terms & Conditions • Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Profile;
