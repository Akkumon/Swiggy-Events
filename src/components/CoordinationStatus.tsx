
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, AlertTriangle, Phone, MessageCircle } from 'lucide-react';

interface CoordinationStatusProps {
  dinnerTime: string;
  eventTime: string;
  bufferTime: number;
  isConfirmed?: boolean;
}

const CoordinationStatus = ({ dinnerTime, eventTime, bufferTime, isConfirmed = false }: CoordinationStatusProps) => {
  const coordinationItems = [
    {
      id: 'table',
      title: 'Table Reservation',
      status: 'confirmed',
      details: `Reserved for ${dinnerTime}`,
      action: 'View reservation details'
    },
    {
      id: 'timing',
      title: 'Transition Timing',
      status: 'optimized',
      details: `${bufferTime} minutes buffer time`,
      action: 'Adjust timing'
    },
    {
      id: 'event',
      title: 'Event Entry',
      status: 'synchronized',
      details: `Entry at ${eventTime}`,
      action: 'View event details'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'optimized':
      case 'synchronized':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'optimized':
      case 'synchronized':
        return 'bg-green-600 hover:bg-green-700';
      case 'pending':
        return 'bg-yellow-600 hover:bg-yellow-700';
      case 'warning':
        return 'bg-orange-600 hover:bg-orange-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Coordination Status</h3>
        <Badge className="bg-green-600 hover:bg-green-700 text-white">
          All Systems Go
        </Badge>
      </div>
      
      <div className="space-y-3">
        {coordinationItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              {getStatusIcon(item.status)}
              <div className="ml-3">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.details}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
              {item.action}
            </Button>
          </div>
        ))}
      </div>
      
      {isConfirmed && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Running Late?</p>
              <p className="text-sm text-gray-600">Quick assistance available</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Restaurant
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Quick Help
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CoordinationStatus;
