export interface Testimonial {
  id: string;
  client_name: string;
  client_photo?: string;
  rating: number;
  feedback: string;
  service_type: string;
  date: string;
  is_featured: boolean;
  display_order: number;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    client_name: "Sarah Johnson",
    client_photo: "/img/client1.jpg",
    rating: 5,
    feedback: "Absolutely stunning photography! They captured our wedding day perfectly. Every photo tells a story and the quality is exceptional. Highly recommend!",
    service_type: "Wedding Photography",
    date: "2024-01-15",
    is_featured: true,
    display_order: 1
  },
  {
    id: "2",
    client_name: "Michael Chen",
    client_photo: "/img/client2.jpg",
    rating: 5,
    feedback: "Professional and creative team. They made our newborn photoshoot so comfortable and the results were beyond our expectations.",
    service_type: "Newborn Photography",
    date: "2024-02-20",
    is_featured: true,
    display_order: 2
  },
  {
    id: "3",
    client_name: "Emily Rodriguez",
    client_photo: "/img/client3.jpg",
    rating: 5,
    feedback: "Amazing pre-wedding shoot! They captured our love story beautifully. The locations were perfect and the editing was flawless.",
    service_type: "Pre-Wedding Photography",
    date: "2024-03-10",
    is_featured: true,
    display_order: 3
  },
  {
    id: "4",
    client_name: "David Park",
    rating: 4,
    feedback: "Great experience for my birthday photoshoot. The team was fun and professional, captured all the special moments perfectly.",
    service_type: "Birthday Photography",
    date: "2024-01-25",
    is_featured: false,
    display_order: 4
  },
  {
    id: "5",
    client_name: "Lisa Thompson",
    rating: 5,
    feedback: "Incredible modeling portfolio shoot! They knew exactly how to bring out my best features and the photos were stunning.",
    service_type: "Modeling Photography",
    date: "2024-02-15",
    is_featured: false,
    display_order: 5
  }
];
