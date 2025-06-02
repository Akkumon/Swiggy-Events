
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonLoaderProps {
  type: 'event-card' | 'recommendation' | 'restaurant-card' | 'event-detail';
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type, count = 1 }) => {
  const renderEventCardSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <Skeleton className="h-40 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );

  const renderRecommendationSkeleton = () => (
    <div className="flex-shrink-0 w-80 bg-white rounded-lg overflow-hidden shadow-sm">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  );

  const renderRestaurantCardSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="relative">
        <Skeleton className="h-40 w-full" />
        <div className="absolute top-2 left-2">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <div className="absolute bottom-2 right-2">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center space-x-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="h-4 w-20" />
        <div className="border-t pt-3 space-y-2">
          <Skeleton className="h-5 w-40" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventDetailSkeleton = () => (
    <div className="space-y-6">
      <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4">
            <Skeleton className="h-6 w-48 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'event-card':
        return renderEventCardSkeleton();
      case 'recommendation':
        return renderRecommendationSkeleton();
      case 'restaurant-card':
        return renderRestaurantCardSkeleton();
      case 'event-detail':
        return renderEventDetailSkeleton();
      default:
        return renderEventCardSkeleton();
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
