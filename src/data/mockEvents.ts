export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  image: string;
  foodAvailable: boolean;
  attendees: number;
  type: string;
  userTestimonial?: string;
  hostNote?: string;
  editorsPick?: boolean;
  editorNote?: string;
  organizer?: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Street Food Festival",
    date: "Today, 6:00 PM",
    location: "Central Park, Koramangala",
    description: "Experience the best street food from 20+ vendors with live cooking demonstrations",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=200&fit=crop",
    foodAvailable: true,
    attendees: 156,
    type: "Food Festival",
    userTestimonial: "I found my new favorite golgappa spot here—trust me, wear loose pants!",
    hostNote: "Come hungry, leave happy! - Chef Pradeep",
    editorsPick: true,
    editorNote: "This week I'm loving the energy and authentic flavors—it's community dining at its finest!",
    organizer: "Koramangala Community Hub"
  },
  {
    id: 2,
    name: "Live Jazz & Dinner",
    date: "Tomorrow, 7:30 PM",
    location: "Blue Terrace Restaurant, Indiranagar",
    description: "Intimate jazz performance with curated dinner menu featuring local musicians",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop",
    foodAvailable: true,
    attendees: 45,
    type: "Music & Dining",
    userTestimonial: "The perfect date night—great music, even better food, and that candlelit ambiance!",
    hostNote: "Every song tells a story. - Maya & The Blue Notes"
  },
  {
    id: 3,
    name: "Community Garden Workshop",
    date: "Sat, 10:00 AM",
    location: "Cubbon Park Extension",
    description: "Learn sustainable gardening with local breakfast and take-home herb kits",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop",
    foodAvailable: true,
    attendees: 89,
    type: "Workshop",
    userTestimonial: "Learned so much and made new friends! Plus the fresh mint tea was divine.",
    hostNote: "Growing food, growing community. - Green Thumb Collective"
  },
  {
    id: 4,
    name: "Lakeside Food Picnic",
    date: "Sun, 11:00 AM",
    location: "Ulsoor Lake, Central Bangalore",
    description: "Family-friendly picnic with food stalls, boat rides, and children's activities",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=200&fit=crop",
    foodAvailable: true,
    attendees: 234,
    type: "Community",
    userTestimonial: "Perfect family day out! Kids loved the boat rides, we loved the dosa stalls.",
    hostNote: "Where families create memories. - Lakeside Events Team",
    editorsPick: false
  }
]; 