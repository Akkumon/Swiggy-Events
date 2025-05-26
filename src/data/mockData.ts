
export const mockOrderHistory = [
  {
    id: "ORD001",
    eventName: "Street Food Festival",
    restaurantName: "Bombay Street Kitchen",
    orderDate: "2024-05-20",
    deliveryTime: "6:30 PM",
    items: [
      { name: "Vada Pav", quantity: 2, price: 60 },
      { name: "Bhel Puri", quantity: 1, price: 80 }
    ],
    totalAmount: 200,
    status: "delivered"
  },
  {
    id: "ORD002",
    eventName: "Live Jazz & Dinner",
    restaurantName: "Blue Terrace Restaurant",
    orderDate: "2024-05-18",
    deliveryTime: "8:00 PM",
    items: [
      { name: "Chicken Tikka", quantity: 1, price: 350 },
      { name: "Garlic Naan", quantity: 2, price: 120 }
    ],
    totalAmount: 470,
    status: "delivered"
  },
  {
    id: "ORD003",
    eventName: "Community Garden Workshop",
    restaurantName: "Spice Garden",
    orderDate: "2024-05-15",
    deliveryTime: "11:30 AM",
    items: [
      { name: "South Indian Thali", quantity: 1, price: 250 }
    ],
    totalAmount: 250,
    status: "delivered"
  }
];

export const mockPartnerData = {
  totalEvents: 47,
  totalRevenue: 125000,
  activeListings: 12,
  avgRating: 4.6,
  recentBookings: [
    {
      id: "BK001",
      eventName: "Corporate Food Festival",
      organizer: "Tech Solutions Inc",
      date: "2024-05-28",
      expectedAttendees: 200,
      estimatedRevenue: 15000,
      status: "confirmed"
    },
    {
      id: "BK002",
      eventName: "Weekend Food Market",
      organizer: "Community Groups",
      date: "2024-05-25",
      expectedAttendees: 150,
      estimatedRevenue: 8000,
      status: "pending"
    }
  ]
};

export const restaurantImages = {
  1: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=200&fit=crop",
  2: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=200&fit=crop",
  3: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop",
  4: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=200&fit=crop",
  5: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=200&fit=crop"
};
