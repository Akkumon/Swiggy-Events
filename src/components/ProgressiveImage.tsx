
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
  placeholder?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  lowQualitySrc,
  placeholder
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc || placeholder || '');

  useEffect(() => {
    const img = new Image();
    
    const handleLoad = () => {
      setCurrentSrc(src);
      setImageLoaded(true);
    };

    const handleError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);
    img.src = src;

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src]);

  if (imageError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 text-center p-4">
          <span className="text-sm">Image unavailable</span>
        </div>
      </div>
    );
  }

  if (!imageLoaded && !currentSrc) {
    return <Skeleton className={className} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-70'
          } ${lowQualitySrc && !imageLoaded ? 'filter blur-sm' : ''}`}
        />
      )}
      
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
    </div>
  );
};

export default ProgressiveImage;
