
import React, { useEffect, useState } from 'react';

interface AccessibilityEnhancedProps {
  children: React.ReactNode;
  ariaLabel?: string;
  role?: string;
  tabIndex?: number;
  highContrast?: boolean;
  focusVisible?: boolean;
}

const AccessibilityEnhanced: React.FC<AccessibilityEnhancedProps> = ({
  children,
  ariaLabel,
  role,
  tabIndex,
  highContrast = false,
  focusVisible = true
}) => {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('base');

  useEffect(() => {
    // Check for user's contrast preference
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    setIsHighContrast(prefersHighContrast || highContrast);

    // Check for user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }

    // Listen for font size changes (simulated - in real app this would be from settings)
    const handleFontSizeChange = () => {
      const savedFontSize = localStorage.getItem('fontSize') || 'base';
      setFontSize(savedFontSize);
    };

    handleFontSizeChange();
    window.addEventListener('storage', handleFontSizeChange);

    return () => {
      window.removeEventListener('storage', handleFontSizeChange);
    };
  }, [highContrast]);

  const accessibilityClasses = `
    ${fontSize === 'large' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : ''}
    ${focusVisible ? 'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2' : ''}
    transition-colors duration-200
    ${isHighContrast ? 'high-contrast-mode' : ''}
  `;

  // Apply high contrast styles dynamically
  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.style.setProperty('--text-primary', '#000000');
      document.documentElement.style.setProperty('--text-secondary', '#333333');
      document.documentElement.style.setProperty('--bg-primary', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#f5f5f5');
      document.documentElement.style.setProperty('--border-color', '#000000');
    } else {
      document.documentElement.style.removeProperty('--text-primary');
      document.documentElement.style.removeProperty('--text-secondary');
      document.documentElement.style.removeProperty('--bg-primary');
      document.documentElement.style.removeProperty('--bg-secondary');
      document.documentElement.style.removeProperty('--border-color');
    }
  }, [isHighContrast]);

  return (
    <div
      className={accessibilityClasses.trim()}
      aria-label={ariaLabel}
      role={role}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

export default AccessibilityEnhanced;
