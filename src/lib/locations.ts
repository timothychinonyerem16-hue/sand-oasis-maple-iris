export type LocationCategory =
  | "lecture_theatre"
  | "faculty"
  | "department"
  | "hostel"
  | "library"
  | "clinic"
  | "food"
  | "water"
  | "atm"
  | "shop"
  | "printing"
  | "admin"
  | "other";

export interface CampusLocation {
  id: string;
  name: string;
  category: LocationCategory;
  lat: number;
  lng: number;
  description?: string;
  universityId: string;
  campusId: string;
  isVerified: boolean;
  openingHours?: string;
  tags?: string[];
}

export interface FoodVendor extends CampusLocation {
  category: "food";
  menu?: { name: string; price: number }[];
  priceRange?: string;
  isOpen?: boolean;
  rating?: number;
}

export interface WaterPoint extends CampusLocation {
  category: "water";
  status: "available" | "unavailable" | "unknown";
  lastReportedAt?: string;
  reportedBy?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: string;
  faculty?: string;
  postedAt: string;
  isVerified: boolean;
}

export const UNN_CENTER = { lat: 6.8673, lng: 7.4085 };

export const SAMPLE_LOCATIONS: CampusLocation[] = [
  {
    id: "loc-001",
    name: "Princess Alexandra Auditorium",
    category: "lecture_theatre",
    lat: 6.8668,
    lng: 7.4092,
    description: "Main auditorium for large lectures and events",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    tags: ["auditorium", "events"],
  },
  {
    id: "loc-002",
    name: "New Anatomy Lecture Theatre",
    category: "lecture_theatre",
    lat: 6.8655,
    lng: 7.411,
    description: "Lecture theatre for Anatomy courses",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    tags: ["anatomy", "medical"],
  },
  {
    id: "loc-003",
    name: "Faculty of Medical Sciences",
    category: "faculty",
    lat: 6.865,
    lng: 7.4105,
    description: "Faculty of Medical Sciences building complex",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-004",
    name: "Faculty of Arts",
    category: "faculty",
    lat: 6.8626,
    lng: 7.4054,
    description: "Faculty of Arts complex",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-005",
    name: "School of General Studies",
    category: "faculty",
    lat: 6.8632,
    lng: 7.4058,
    description: "GS building for General Studies courses",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-006",
    name: "Nnamdi Azikiwe Library",
    category: "library",
    lat: 6.866,
    lng: 7.407,
    description: "Main university library",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    openingHours: "8:00 AM - 10:00 PM",
  },
  {
    id: "loc-007",
    name: "UNN Medical Centre",
    category: "clinic",
    lat: 6.8645,
    lng: 7.406,
    description: "University medical centre",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    openingHours: "8:00 AM - 6:00 PM",
  },
  {
    id: "loc-008",
    name: "Mary Slessor Hall",
    category: "hostel",
    lat: 6.8685,
    lng: 7.4065,
    description: "Female hostel",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-009",
    name: "Balewa Hostel",
    category: "hostel",
    lat: 6.869,
    lng: 7.405,
    description: "Student hostel",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-010",
    name: "Presidential Hostel",
    category: "hostel",
    lat: 6.87,
    lng: 7.4075,
    description: "Student hostel",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-011",
    name: "First Bank UNN Branch",
    category: "atm",
    lat: 6.8675,
    lng: 7.4095,
    description: "Bank and ATM",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-012",
    name: "University Admin Building",
    category: "admin",
    lat: 6.867,
    lng: 7.408,
    description: "Main administrative building",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-013",
    name: "Institute of African Studies",
    category: "department",
    lat: 6.8665,
    lng: 7.4098,
    description: "Institute of African Studies",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-014",
    name: "Faculty of Biological Sciences",
    category: "faculty",
    lat: 6.864,
    lng: 7.4085,
    description: "Faculty of Biological Sciences",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
  {
    id: "loc-015",
    name: "Ekpo Convocation Arena",
    category: "other",
    lat: 6.868,
    lng: 7.41,
    description: "Convocation and events arena",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
  },
];

export const SAMPLE_FOOD: FoodVendor[] = [
  {
    id: "food-001",
    name: "Chitis Restaurant",
    category: "food",
    lat: 6.8662,
    lng: 7.4078,
    description: "Popular campus eatery",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    priceRange: "₦500 – ₦2,000",
    isOpen: true,
    rating: 4.2,
    menu: [
      { name: "Rice + Egg", price: 800 },
      { name: "Rice + Chicken", price: 1200 },
      { name: "Beans + Plantain", price: 700 },
      { name: "Noodles", price: 600 },
    ],
    tags: ["rice", "beans", "affordable"],
  },
  {
    id: "food-002",
    name: "Mama Put Junction",
    category: "food",
    lat: 6.8658,
    lng: 7.4065,
    description: "Local food vendor near hostels",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: false,
    priceRange: "₦300 – ₦1,000",
    isOpen: true,
    rating: 3.9,
    menu: [
      { name: "Yam + Sauce", price: 500 },
      { name: "Garri + Soup", price: 400 },
      { name: "Rice + Stew", price: 600 },
    ],
    tags: ["affordable", "local"],
  },
  {
    id: "food-003",
    name: "Faculty Cafeteria — Arts",
    category: "food",
    lat: 6.8628,
    lng: 7.4058,
    description: "Cafeteria near Faculty of Arts",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    priceRange: "₦400 – ₦1,500",
    isOpen: true,
    rating: 4.0,
    menu: [
      { name: "Jollof Rice", price: 700 },
      { name: "Fried Rice", price: 900 },
      { name: "Moi Moi", price: 300 },
    ],
    tags: ["rice", "jollof"],
  },
];

function minutesAgo(mins: number) {
  return new Date(Date.now() - mins * 60 * 1000).toISOString();
}

export const SAMPLE_WATER: WaterPoint[] = [
  {
    id: "water-001",
    name: "Hostel Water Point — Mary Slessor",
    category: "water",
    lat: 6.8686,
    lng: 7.4066,
    description: "Water point near Mary Slessor Hall",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    status: "available",
    lastReportedAt: minutesAgo(7),
    reportedBy: "student",
  },
  {
    id: "water-002",
    name: "Balewa Water Point",
    category: "water",
    lat: 6.8691,
    lng: 7.4051,
    description: "Water point at Balewa Hostel",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    status: "unavailable",
    lastReportedAt: minutesAgo(25),
    reportedBy: "student",
  },
  {
    id: "water-003",
    name: "Library Area Water",
    category: "water",
    lat: 6.8661,
    lng: 7.4071,
    description: "Water point near main library",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: false,
    status: "unknown",
  },
  {
    id: "water-004",
    name: "Medical Sciences Water Point",
    category: "water",
    lat: 6.8651,
    lng: 7.4106,
    description: "Water point near Medical Sciences",
    universityId: "unn",
    campusId: "nsukka",
    isVerified: true,
    status: "available",
    lastReportedAt: minutesAgo(45),
    reportedBy: "student",
  },
];

export const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "Faculty of Medical Sciences — registration update",
    body: "All 200 Level students should complete course registration by Friday. Visit the faculty office for assistance.",
    category: "faculty",
    faculty: "Medical Sciences",
    postedAt: minutesAgo(120),
    isVerified: true,
  },
  {
    id: "ann-002",
    title: "University water maintenance notice",
    body: "Water supply will be interrupted in some hostels on Thursday between 10 AM and 2 PM for maintenance.",
    category: "university",
    postedAt: minutesAgo(300),
    isVerified: true,
  },
  {
    id: "ann-003",
    title: "SUG meeting — all students invited",
    body: "Student Union Government general meeting this Saturday at the Arena. Agenda includes welfare and security.",
    category: "organization",
    postedAt: minutesAgo(720),
    isVerified: false,
  },
];

export function getAllLocations(): CampusLocation[] {
  return [...SAMPLE_LOCATIONS, ...SAMPLE_FOOD, ...SAMPLE_WATER];
}

export function searchLocations(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return getAllLocations();
  const fuzzy = q.replace(/theartre/g, "theatre");
  return getAllLocations().filter(
    (loc) =>
      loc.name.toLowerCase().includes(fuzzy) ||
      loc.category.replace("_", " ").includes(fuzzy) ||
      loc.description?.toLowerCase().includes(fuzzy) ||
      loc.tags?.some((t) => t.includes(fuzzy)),
  );
}

export function categoryLabel(category: LocationCategory) {
  return category.replaceAll("_", " ");
}
