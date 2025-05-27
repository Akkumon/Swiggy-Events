export interface EventTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    accentFont: string;
  };
  visualElements: {
    cardStyle: string;
    borderStyle: string;
    shadowStyle: string;
  };
  mood: string;
  description: string;
}

export const eventThemes: Record<string, EventTheme> = {
  'Food Festival': {
    id: 'food-festival',
    name: 'Street Market Vibes',
    colors: {
      primary: 'text-orange-800',
      secondary: 'text-amber-700',
      accent: 'text-red-600',
      background: 'bg-gradient-to-br from-orange-50 via-amber-50 to-red-50'
    },
    typography: {
      headingFont: 'font-bold',
      bodyFont: 'font-medium',
      accentFont: 'font-mono'
    },
    visualElements: {
      cardStyle: '',
      borderStyle: '',
      shadowStyle: 'shadow-lg hover:shadow-xl'
    },
    mood: 'Bustling night markets',
    description: 'Warm, hand-painted textures that evoke street food energy'
  },
  'Music & Dining': {
    id: 'music-dining',
    name: 'Sophisticated Evenings',
    colors: {
      primary: 'text-slate-800',
      secondary: 'text-purple-700',
      accent: 'text-amber-600',
      background: 'bg-gradient-to-br from-slate-50 via-purple-50 to-amber-50'
    },
    typography: {
      headingFont: 'font-serif font-bold',
      bodyFont: 'font-serif',
      accentFont: 'font-light italic'
    },
    visualElements: {
      cardStyle: '',
      borderStyle: '',
      shadowStyle: 'shadow-md hover:shadow-lg'
    },
    mood: 'Candlelight sophistication',
    description: 'Elegant serif typography and deep-toned palettes'
  },
  'Workshop': {
    id: 'workshop',
    name: 'Creative Learning',
    colors: {
      primary: 'text-blue-800',
      secondary: 'text-teal-700',
      accent: 'text-green-600',
      background: 'bg-gradient-to-br from-blue-50 via-teal-50 to-green-50'
    },
    typography: {
      headingFont: 'font-bold',
      bodyFont: 'font-medium',
      accentFont: 'font-mono'
    },
    visualElements: {
      cardStyle: '',
      borderStyle: '',
      shadowStyle: 'shadow-md hover:shadow-lg'
    },
    mood: 'Hands-on creativity',
    description: 'Clean, modern design that promotes focus and learning'
  },
  'Community': {
    id: 'community',
    name: 'Neighborhood Spirit',
    colors: {
      primary: 'text-emerald-800',
      secondary: 'text-yellow-700',
      accent: 'text-pink-600',
      background: 'bg-gradient-to-br from-emerald-50 via-yellow-50 to-pink-50'
    },
    typography: {
      headingFont: 'font-bold',
      bodyFont: 'font-medium',
      accentFont: 'font-handwriting'
    },
    visualElements: {
      cardStyle: '',
      borderStyle: '',
      shadowStyle: 'shadow-lg hover:shadow-xl'
    },
    mood: 'Warm community connection',
    description: 'Friendly, approachable design that brings people together'
  }
};

export const getEventTheme = (eventType: string): EventTheme => {
  return eventThemes[eventType] || eventThemes['Community'];
};
