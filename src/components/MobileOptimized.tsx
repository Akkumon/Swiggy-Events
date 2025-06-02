
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileOptimizedProps {
  children: React.ReactNode;
  className?: string;
  enableSwipe?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  minTouchTarget?: boolean;
}

const MobileOptimized: React.FC<MobileOptimizedProps> = ({
  children,
  className = '',
  enableSwipe = false,
  onSwipeLeft,
  onSwipeRight,
  minTouchTarget = false
}) => {
  const isMobile = useIsMobile();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
      // Haptic feedback for devices that support it
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  };

  const baseClasses = `
    ${minTouchTarget ? 'min-h-[44px] min-w-[44px]' : ''}
    ${isMobile ? 'touch-manipulation' : ''}
    ${enableSwipe ? 'select-none' : ''}
    ${className}
  `;

  const touchProps = enableSwipe ? {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } : {};

  return (
    <div
      className={baseClasses.trim()}
      {...touchProps}
    >
      {children}
    </div>
  );
};

export default MobileOptimized;
