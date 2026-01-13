export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  image_url: string;
  features: string[];
  display_order: number;
  is_active: boolean;
}

export const servicesData: Service[] = [
  {
    id: "1",
    title: "Wedding Photography",
    slug: "wedding",
    description: "Professional wedding photography services capturing your special day with artistic vision and attention to detail.",
    short_description: "Capture your perfect day with stunning wedding photography",
    icon: "Heart",
    image_url: "/Services_Photos/Wedding_Photo.jpg",
    features: [
      "Full day coverage",
      "Professional editing",
      "Online gallery delivery",
      "Engagement session included"
    ],
    display_order: 1,
    is_active: true
  },
  {
    id: "2",
    title: "Pre-Wedding Photography",
    slug: "pre-wedding",
    description: "Beautiful pre-wedding photoshoots at romantic locations to celebrate your love story.",
    short_description: "Romantic pre-wedding shoots at stunning locations",
    icon: "Sunrise",
    image_url: "/Services_Photos/Pre_Wedding_Photo.jpg",
    features: [
      "Multiple locations",
      "Props and styling",
      "Same day preview",
      "Printed album included"
    ],
    display_order: 2,
    is_active: true
  },
  {
    id: "3",
    title: "Newborn Photography",
    slug: "newborn",
    description: "Gentle and safe newborn photography sessions capturing the precious early moments of your baby.",
    short_description: "Gentle newborn sessions capturing precious early moments",
    icon: "Baby",
    image_url: "/Services_Photos/newborn.JPG",
    features: [
      "Studio setup available",
      "Parent poses included",
      "Props and outfits",
      "Digital and printed copies"
    ],
    display_order: 3,
    is_active: true
  },
  {
    id: "4",
    title: "Birthday Photography",
    slug: "birthday",
    description: "Fun and vibrant birthday photography for all ages, from kids' parties to milestone celebrations.",
    short_description: "Capture birthday celebrations with vibrant, joyful photos",
    icon: "Cake",
    image_url: "/Services_Photos/Birthday_Shoot.jpg",
    features: [
      "Event coverage",
      "Candid moments",
      "Group photos",
      "Same day delivery available"
    ],
    display_order: 4,
    is_active: true
  },
  {
    id: "5",
    title: "Modeling Photography",
    slug: "modeling",
    description: "Professional modeling portfolio shoots with creative lighting and posing guidance.",
    short_description: "Professional portfolio shoots for aspiring models",
    icon: "Camera",
    image_url: "/Services_Photos/Modeling_Photo.JPG",
    features: [
      "Portfolio development",
      "Multiple looks",
      "Retouching included",
      "Studio and outdoor options"
    ],
    display_order: 5,
    is_active: true
  },
  {
    id: "6",
    title: "Indoor Photography",
    slug: "indoor",
    description: "Professional indoor photography sessions with controlled lighting and studio setup.",
    short_description: "Studio-quality indoor shoots with professional lighting",
    icon: "Home",
    image_url: "/Services_Photos/Indoor_Photo.jpg",
    features: [
      "Studio setup",
      "Professional lighting",
      "Background options",
      "Wardrobe consultation"
    ],
    display_order: 6,
    is_active: true
  },
  {
    id: "7",
    title: "Outdoor Photography",
    slug: "outdoor",
    description: "Beautiful outdoor photography sessions at scenic locations with natural lighting.",
    short_description: "Scenic outdoor shoots using natural lighting",
    icon: "Sunrise",
    image_url: "/Services_Photos/Outdoor_Photo.jpg",
    features: [
      "Location scouting",
      "Golden hour sessions",
      "Weather backup plan",
      "Multiple outfit changes"
    ],
    display_order: 7,
    is_active: true
  }
];
