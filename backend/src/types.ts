export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  userId: string;
  customerName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  guestCount: number;
  package: string;
  foodPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Mixed';
  specialRequirements?: string;
  additionalNotes?: string;
  internalNotes?: string;
  followUpDate?: string;
  estimatedAmount: number;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  menuType?: 'normal' | 'deluxe' | 'premium' | 'all';
  description: string;
  price?: number;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  isAvailable?: boolean;
  sortOrder?: number;
  tags?: string[];
  isOdiaSpecialty?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  category: 'catering' | 'cook';
  image: string;
  features: string[];
  icon: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface CateringPackage {
  id: string;
  name: string;
  pricePerPerson: number;
  description: string;
  startersCount: number;
  mainCourseCount: number;
  dessertCount: number;
  drinksCount: number;
  staffIncluded: boolean;
  decorationOption: boolean;
  features: string[];
  popular?: boolean;
  isFeatured?: boolean;
  minGuests?: number;
  sortOrder?: number;
  menuItemsCount?: number;
  menuTitle?: string;
  cardBadge?: string;
  image?: string;
  menuCategories?: Array<{
    category: string;
    items: string[];
    id?: string;
    group?: string;
    icon?: string;
  }>;
  packageInclusions?: string[];
  signatureHighlights?: string[];
}


export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  eventType: string;
  photo?: string;
  date: string;
  isApproved?: boolean;
  isPublished?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  internalNotes?: string;
  followUpDate?: string;
  createdAt: string;
  read: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface HomepageContent {
  heroHeading: string;
  heroSubtitle: string;
  heroBgVideoUrl: string;
  heroBgImageUrl: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  trustStats: {
    eventsServed: string;
    masterChefs: string;
    happyGuests: string;
    hygieneRating: string;
  };
  sectionVisibility: {
    hero: boolean;
    quickStats: boolean;
    calculator: boolean;
    featuredDishes: boolean;
    services: boolean;
    packages: boolean;
    testimonials: boolean;
    ctaBanner: boolean;
  };
}

export interface AboutContent {
  companyTitle: string;
  subtitle: string;
  heritageStory: string;
  culinaryMission: string;
  culinaryVision: string;
  fssaiNumber: string;
  experienceYears: number;
  guidingPillars: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  teamMembers: {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
  }[];
}

export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  iconName?: string;
  isVeg?: boolean;
  visible: boolean;
  sortOrder: number;
}

export interface WebsiteSettings {
  businessName: string;
  tagline: string;
  phoneHotline: string;
  whatsappNumber: string;
  supportEmail: string;
  headquartersAddress: string;
  operatingHours: string;
  logoUrl: string;
  socialInstagram: string;
  socialFacebook: string;
  socialYoutube: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}
