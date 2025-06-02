
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  isNetworkError?: boolean;
  isOffline?: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
  isNetworkError = false,
  isOffline = false
}) => {
  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  const getErrorMessage = () => {
    if (isOffline) {
      return {
        title: "You're offline",
        message: "Check your internet connection and try again.",
        icon: WifiOff
      };
    }
    
    if (isNetworkError) {
      return {
        title: "Connection problem",
        message: "We're having trouble connecting to our servers. Please try again.",
        icon: Wifi
      };
    }
    
    return {
      title: "Something went wrong",
      message: error?.message || "An unexpected error occurred. Please try again.",
      icon: AlertTriangle
    };
  };

  const { title, message, icon: Icon } = getErrorMessage();

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Card className="p-6 text-center max-w-md w-full">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Icon className="h-8 w-8 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
          
          <div className="flex flex-col space-y-2 w-full">
            <Button 
              onClick={handleRetry}
              className="bg-orange-500 hover:bg-orange-600 min-h-[44px]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            {!isOffline && (
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="min-h-[44px]"
              >
                Go to Home
              </Button>
            )}
          </div>
          
          {isOffline && (
            <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg w-full">
              <p>💡 Tip: Some content may be available offline. Check your downloaded events.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ErrorFallback;
