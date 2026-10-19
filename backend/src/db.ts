import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import {
  User,
  Booking,
  MenuItem,
  ServiceItem,
  CateringPackage,
  GalleryItem,
  ReviewItem,
  ContactMessage,
  AppNotification,
  HomepageContent,
  AboutContent,
  NavigationItem,
  WebsiteSettings,
} from './types.js';
import { officialMenuItems } from './data/officialMenu.js';
import { officialVegMenuItems } from './data/vegMenuSeed.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveDbPath(): { dataDir: string; dbFile: string } {
  if (process.env.DB_FILE) {
    const customFile = path.resolve(process.env.DB_FILE);
    return { dataDir: path.dirname(customFile), dbFile: customFile };
  }
  const backendData = path.resolve(__dirname, '../data/db.json');
  if (fs.existsSync(backendData)) {
    return { dataDir: path.dirname(backendData), dbFile: backendData };
  }
  const cwdData = path.resolve(process.cwd(), 'data/db.json');
  if (fs.existsSync(cwdData)) {
    return { dataDir: path.dirname(cwdData), dbFile: cwdData };
  }
  const cwdBackendData = path.resolve(process.cwd(), 'backend/data/db.json');
  if (fs.existsSync(cwdBackendData)) {
    return { dataDir: path.dirname(cwdBackendData), dbFile: cwdBackendData };
  }
  return { dataDir: path.dirname(backendData), dbFile: backendData };
}

const { dataDir: DATA_DIR, dbFile: DB_FILE } = resolveDbPath();

interface DatabaseSchema {
  users: User[];
  bookings: Booking[];
  menuItems: MenuItem[];
  services: ServiceItem[];
  packages: CateringPackage[];
  gallery: GalleryItem[];
  reviews: ReviewItem[];
  contactMessages: ContactMessage[];
  notifications: AppNotification[];
  homepage: HomepageContent;
  about: AboutContent;
  navigation: NavigationItem[];
  settings: WebsiteSettings;
}

let dbData: DatabaseSchema | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function saveDatabase() {
  try {
    ensureDataDir();
    if (dbData) {
      fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

export const initialHomepage: HomepageContent = {
  heroHeading: 'AD CATERING & COOK SERVICES',
  heroSubtitle: "Odisha's Premier Royal Festive & Wedding Catering. Authentic heritage delicacies, 5-star live master counters, and executive private cook services for banquets of 25 to 5,000+ guests.",
  heroBgVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-table-with-food-4074-large.mp4',
  heroBgImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
  primaryCtaText: 'Plan Your Grand Event',
  primaryCtaLink: '/booking',
  secondaryCtaText: 'Explore 145+ Menu Dishes',
  secondaryCtaLink: '/menu',
  trustStats: {
    eventsServed: '1,200+',
    masterChefs: '25+',
    happyGuests: '500,000+',
    hygieneRating: '4.9/5',
  },
  sectionVisibility: {
    hero: true,
    quickStats: true,
    calculator: true,
    featuredDishes: true,
    services: true,
    packages: true,
    testimonials: true,
    ctaBanner: true,
  },
};

export const initialAbout: AboutContent = {
  companyTitle: 'About AD Catering & Cook Services',
  subtitle: 'Preserving Authentic Heritage Flavors with Modern Hospitality Excellence',
  heritageStory: "Founded with a passion for authentic culinary traditions and flawless hospitality, AD Catering & Cook Services has grown to become Odisha's premier choice for festive, corporate, and royal wedding celebrations. Our culinary repertoire blends the deep-rooted richness of traditional Odia delicacies—such as slow-cooked Dalma, Machha Besara, Mutton Kasa, and earthen-baked Chhena Poda—with pan-Indian royal banquets, live Chinese woks, and European pastry dessert lounges.",
  culinaryMission: 'To deliver unforgettable gastronomic journeys and warm, impeccable hospitality while upholding the highest standards of food purity, taste, and safety.',
  culinaryVision: 'To be the most trusted and celebrated banquet catering and private master cook enterprise across Eastern India.',
  fssaiNumber: 'FSSAI-12024999000182',
  experienceYears: 15,
  guidingPillars: [
    {
      id: 'pil_1',
      title: 'Quality Food',
      description: 'Freshly prepared with pure cow ghee, authentic whole spices, and rich regional flavors.',
      icon: 'UtensilsCrossed',
    },
    {
      id: 'pil_2',
      title: 'FSSAI & Spotless Hygiene',
      description: 'Sterilized equipment, temperature-controlled transport, and strict hairnet/glove protocols.',
      icon: 'ShieldCheck',
    },
    {
      id: 'pil_3',
      title: 'Master Cooks & Halwais',
      description: 'Over 25+ veteran chefs specializing in Odia feasts, live tandoor, Mughlai, and traditional sweets.',
      icon: 'ChefHat',
    },
    {
      id: 'pil_4',
      title: 'Punctual VIP Service',
      description: 'Polite uniformed banquet stewards, seamless buffet flow, and spotless post-event cleanup.',
      icon: 'Crown',
    },
  ],
  teamMembers: [
    {
      id: 'tm_1',
      name: 'AD Catering and Cook Services',
      role: 'Founder & Managing Director',
      bio: 'Visionary hospitality entrepreneur dedicated to elevating traditional Odisha banquet culture into royal luxury experiences.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'tm_2',
      name: 'Master Chef Debasish Mohanty',
      role: 'Head Executive Chef',
      bio: '25+ years mastering authentic Odia Bhoji specialties, dum biryanis, and royal gravies.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'tm_3',
      name: 'Ramesh Halwai',
      role: 'Master Confectioner & Sweets Head',
      bio: 'Legendary sweetmaker famous for hot earthen baked Chhena Poda, Rasabali, and saffron Rasmalai.',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=600&q=80',
    },
  ],
};

export const initialNavigation: NavigationItem[] = [
  { id: 'nav_1', name: 'Home', path: '/', visible: true, sortOrder: 1, iconName: 'Home' },
  { id: 'nav_2', name: 'Menu', path: '/menu', visible: true, sortOrder: 2, iconName: 'Utensils' },
  { id: 'nav_3', name: 'Veg Menu', path: '/veg-menu', isVeg: true, visible: true, sortOrder: 3, iconName: 'Leaf' },
  { id: 'nav_4', name: 'Packages', path: '/packages', visible: true, sortOrder: 4, iconName: 'Package' },
  { id: 'nav_5', name: 'Services', path: '/services', visible: true, sortOrder: 5, iconName: 'Award' },
  { id: 'nav_6', name: 'Cook Service', path: '/cook-service', visible: true, sortOrder: 6, iconName: 'ChefHat' },
  { id: 'nav_7', name: 'Gallery', path: '/gallery', visible: true, sortOrder: 7, iconName: 'Image' },
  { id: 'nav_8', name: 'About', path: '/about', visible: true, sortOrder: 8, iconName: 'Sparkles' },
  { id: 'nav_9', name: 'Contact', path: '/contact', visible: true, sortOrder: 9, iconName: 'Phone' },
];

export const initialSettings: WebsiteSettings = {
  businessName: 'AD Catering and Cook Services',
  tagline: "Odisha's Premier Festive, Wedding & Master Cook Experience",
  phoneHotline: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  supportEmail: 'contact@adcatering.com',
  headquartersAddress: 'Plot 104, Swosti Plaza Lane, Jaydev Vihar, Bhubaneswar, Odisha 751013',
  operatingHours: 'Monday - Sunday: 7:00 AM - 11:30 PM (IST)',
  logoUrl: '/favicon.svg',
  socialInstagram: 'https://instagram.com/adcatering_official',
  socialFacebook: 'https://facebook.com/adcateringservices',
  socialYoutube: 'https://youtube.com/@adcatering',
  seoTitle: 'AD Catering and Cook Services | Royal Festive & Wedding Catering Odisha',
  seoDescription: 'Premier wedding catering, festive bhoji, authentic Odia delicacies, and certified home cook services in Bhubaneswar, Cuttack, Puri & across Odisha.',
  seoKeywords: 'catering bhubaneswar, odia wedding catering, cook service odisha, mutton kasa catering, best caterer in cuttack, chhena poda sweetmaker',
};

export async function initDatabase(): Promise<DatabaseSchema> {
  if (dbData) return dbData;

  ensureDataDir();
  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      dbData = JSON.parse(raw);
      if (dbData && officialMenuItems && officialMenuItems.length > 0) {
        if (!dbData.menuItems) dbData.menuItems = [];
        const existingNames = new Set(dbData.menuItems.map(i => i.name.toLowerCase()));
        let added = false;
        const allOfficialSeeds = [...(officialMenuItems || []), ...(officialVegMenuItems || [])];
        for (const item of allOfficialSeeds) {
          if (!existingNames.has(item.name.toLowerCase())) {
            dbData.menuItems.push(item);
            existingNames.add(item.name.toLowerCase());
            added = true;
          }
        }
        if (dbData.packages && Array.isArray(dbData.packages)) {
          const basic = dbData.packages.find(p => p.name.includes('BASIC'));
          if (basic && basic.pricePerPerson !== 850) {
            basic.pricePerPerson = 850;
            added = true;
          }
          const prem = dbData.packages.find(p => p.name.includes('PREMIUM'));
          if (prem && prem.pricePerPerson !== 950) {
            prem.pricePerPerson = 950;
            added = true;
          }
          let del = dbData.packages.find(p => p.name.includes('DELUXE'));
          if (del && del.pricePerPerson !== 1050) {
            del.pricePerPerson = 1050;
            added = true;
          } else if (!del) {
            dbData.packages.push({
              id: 'pkg_deluxe',
              name: 'DELUXE PACKAGE',
              pricePerPerson: 1050,
              description: 'The pinnacle of winter ice-glass banquet hospitality with master live counters, VIP buffet styling, and grand multi-course delicacies.',
              startersCount: 6,
              mainCourseCount: 12,
              dessertCount: 4,
              drinksCount: 3,
              staffIncluded: true,
              decorationOption: true,
              features: [
                '6 Live Master Counter Starters',
                'VIP Odia Mutton Kasa + Prawn Malai Curry',
                'Butter Chicken + Crab Masala / Fish Besara',
                'Paneer Lababdar + Malai Kofta + Dal Makhani',
                'Zafrani Dum Biryani + Dry Fruit Pulao',
                'Live Tandoor Breads Assortment',
                '4 Luxury Desserts (Chhena Poda, Rasmalai, Ice Cream, Hot Gulab Jamun)',
                '5-Star Royal Ice Banquet Table Setup & Executive Service Staff',
              ],
              popular: false,
            });
            added = true;
          }
        }
        if (!dbData.homepage) {
          dbData.homepage = initialHomepage;
          added = true;
        }
        if (!dbData.about) {
          dbData.about = initialAbout;
          added = true;
        }
        if (!dbData.navigation) {
          dbData.navigation = initialNavigation;
          added = true;
        }
        if (!dbData.settings) {
          dbData.settings = initialSettings;
          added = true;
        }
        if (added) {
          saveDatabase();
        }
      }
      return dbData!;
    } catch (e) {
      console.warn('Could not read existing db.json, generating default seeds...');
    }
  }

  // Generate seeds
  const adminPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'Admin@123456', 10);
  const customerPasswordHash = bcrypt.hashSync('Customer@123', 10);

  const initialUsers: User[] = [
    {
      id: 'usr_admin_1',
      name: process.env.ADMIN_NAME || 'AD Catering and Cook Services (Admin)',
      email: process.env.ADMIN_EMAIL || 'admin@adcatering.com',
      phone: '+91 9876543210',
      password: adminPasswordHash,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'usr_cust_1',
      name: 'Rohan Pattnaik',
      email: 'customer@gmail.com',
      phone: '+91 9437123456',
      password: customerPasswordHash,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  const initialMenuItems: MenuItem[] = [
    // Traditional Odia Delicacies
    {
      id: 'menu_1',
      name: 'Authentic Dalma',
      description: 'Slow-cooked lentils loaded with raw papaya, pumpkin, eggplant, roasted cumin and desi ghee tempering.',
      price: 180,
      category: 'Traditional Odia Food',
      isVeg: true,
      isPopular: true,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_2',
      name: 'Machha Besara (Odia Fish Curry)',
      description: 'Fresh Rohu fish steaks stewed in traditional pungent mustard paste, dry mango (Ambula), and green chilies.',
      price: 320,
      category: 'Fish',
      isVeg: false,
      isPopular: true,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_3',
      name: 'Odia Mutton Kasa',
      description: 'Tender goat meat slow-simmered in mustard oil with hand-ground spices, caramelized onions, and fried potatoes.',
      price: 450,
      category: 'Mutton',
      isVeg: false,
      isPopular: true,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_4',
      name: 'Chhena Poda (Royal Baked Cheese)',
      description: 'Legendary caramelized cottage cheese baked to perfection with cardamom, cashew nuts, and natural caramel crust.',
      price: 240,
      category: 'Desserts',
      isVeg: true,
      isPopular: true,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_5',
      name: 'Puri Jagannath Style Khaja',
      description: 'Crispy layered wheat pastry glazed with aromatic sugar syrup, fresh and flaky from our master sweets artisans.',
      price: 160,
      category: 'Desserts',
      isVeg: true,
      isPopular: false,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_6',
      name: 'Royal Pakhala Platter',
      description: 'Fermented aromatic rice tempered with curd, mint, roasted cumin, served with Saga Bhaja, Badi Chura, and Aloo Bhaja.',
      price: 220,
      category: 'Traditional Odia Food',
      isVeg: true,
      isPopular: true,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_7',
      name: 'Dahi Baingan',
      description: 'Golden fried eggplant steeped in spiced spiced yogurt sauce tempered with mustard seeds and curry leaves.',
      price: 190,
      category: 'Vegetarian',
      isVeg: true,
      isPopular: false,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    },
    // Multi-Cuisine Royal Favorites
    {
      id: 'menu_8',
      name: 'Royal Chicken Biryani (Dum Style)',
      description: 'Fragrant aged basmati rice cooked on slow charcoal with tender chicken chunks, saffron, kewra water, and fried onions.',
      price: 360,
      category: 'Chicken',
      isVeg: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_9',
      name: 'Paneer Butter Masala',
      description: 'Velvety makhani gravy infused with butter, cashew cream, fenugreek leaves, and succulent cubes of malai paneer.',
      price: 290,
      category: 'Paneer',
      isVeg: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_10',
      name: 'Golden Fish Fry Amritsari',
      description: 'Crispy fried river fish fillets crusted with carom seeds (ajwain), gram flour, and tangy chaat masala.',
      price: 340,
      category: 'Starters',
      isVeg: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_11',
      name: 'Crispy Hara Bhara Kebab',
      description: 'Pan-seared spinach, green peas, and fresh cottage cheese patties infused with roasted spices and mint dip.',
      price: 210,
      category: 'Starters',
      isVeg: true,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_12',
      name: 'Bengali/Odia Machha Tarkari',
      description: 'Homestyle rich fish curry simmered with sliced potatoes, pointed gourd (potol), and mild garam masala.',
      price: 310,
      category: 'Fish',
      isVeg: false,
      isPopular: false,
      isOdiaSpecialty: true,
      image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_13',
      name: 'Dal Tadka Desi Ghee',
      description: 'Yellow arhar lentils tempered in pure cow ghee with cumin, garlic, dry red chillies, and fresh coriander.',
      price: 170,
      category: 'Dal',
      isVeg: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_14',
      name: 'Kashmiri Mutton Rogan Josh',
      description: 'Aromatic mutton curry cooked with ratan jot, fennel seed powder, dry ginger, and yogurt in slow copper handi.',
      price: 490,
      category: 'Mutton',
      isVeg: false,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_15',
      name: 'Kesari Rasmalai',
      description: 'Soft melt-in-mouth cottage cheese discs soaked in saffron-infused clotted milk garnished with pistachio flakes.',
      price: 180,
      category: 'Desserts',
      isVeg: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_16',
      name: 'Hot Gulab Jamun with Rabdi',
      description: 'Mawa dumplings soaked in cardamom sugar syrup, crowned with chilled creamy laccha rabdi.',
      price: 160,
      category: 'Desserts',
      isVeg: true,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_17',
      name: 'Aromatic Jeera Pulao',
      description: 'Long-grain basmati rice tossed with whole cumin seeds, star anise, cardamom, and clarified butter.',
      price: 190,
      category: 'Rice',
      isVeg: true,
      isPopular: false,
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'menu_18',
      name: 'Fresh Virgin Mint Mojito & Aam Panna',
      description: 'Refreshing welcome coolers prepared with raw mango pulp, roasted cumin, rock salt, or fresh crushed garden mint.',
      price: 120,
      category: 'Drinks',
      isVeg: true,
      isPopular: true,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const initialServices: ServiceItem[] = [
    {
      id: 'srv_1',
      title: 'Grand Wedding Catering',
      description: 'Complete royal wedding food experience with live cooking stations, opulent buffet decor, welcoming drinks, and multi-course royal feasts.',
      startingPrice: 449,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      icon: 'Crown',
      features: ['Live Counter Stalls', 'Uniformed Banquet Staff', 'Full Cutlery & Crockery Setup', 'Custom Bride & Groom Menu'],
    },
    {
      id: 'srv_2',
      title: 'Traditional Odia Feast Catering',
      description: 'Heritage culinary journey from temple recipes to royal household delicacies: authentic Dalma, Machha Besara, Mutton Kasa, and hot Chhena Poda.',
      startingPrice: 349,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      icon: 'UtensilsCrossed',
      features: ['Traditional Banana Leaf Option', 'Authentic Mustard Gravies', 'Freshly Baked Chhena Poda', 'Puri Temple Style Sweets'],
    },
    {
      id: 'srv_3',
      title: 'Birthday & Anniversary Parties',
      description: 'Fun, vibrant, and delectable catering for milestones, kid birthdays, and anniversaries with finger foods, live chaat, and gourmet desserts.',
      startingPrice: 249,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      icon: 'Sparkles',
      features: ['Live Chaat & Pasta Counter', 'Kid-friendly Delights', 'Mocktails & Punch Bowl', 'Custom Theme Food Styling'],
    },
    {
      id: 'srv_4',
      title: 'Corporate Galas & Conferences',
      description: 'Punctual, hygienic, executive culinary setups tailored for seminars, boardroom luncheons, product launches, and annual corporate banquets.',
      startingPrice: 320,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      icon: 'Briefcase',
      features: ['High-speed Buffet Flow', 'Packed Bento Box Options', 'Continuous Coffee & Tea Lounge', 'GST Billing & Invoicing'],
    },
    {
      id: 'srv_5',
      title: 'Housewarming & Puja Catering',
      description: 'Pure, sacred satvik and customized vegetarian or mixed meals prepared with utmost purity and sacred devotion for family rituals.',
      startingPrice: 219,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
      icon: 'Home',
      features: ['Pure Satvik Options', 'Zero Onion-Garlic Menus', 'Temple-Style Bhog Presentation', 'Eco-friendly Areca Ware'],
    },
    {
      id: 'srv_6',
      title: 'Outdoor & Destination Catering',
      description: 'Full mobile kitchen setup capable of delivering piping hot, gourmet feasts at outdoor lawns, beach resorts, farmhouses, and heritage forts.',
      startingPrice: 399,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      icon: 'Trees',
      features: ['Mobile Tandoor & Woks', 'Generators & Warming Equipment', 'Weather-proof Buffet Stations', 'Waste Management & Cleanup'],
    },
    // Cook Services
    {
      id: 'srv_7',
      title: 'Master Home Cook Service',
      description: 'Hire our certified experienced private chef to cook delicious multi-course meals directly in your home kitchen for family gatherings.',
      startingPrice: 1499,
      category: 'cook',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      icon: 'ChefHat',
      features: ['In-Home Meal Preparation', 'Fresh Grocery Verification', 'Hygienic Clean Kitchen Handover', 'Custom Family Flavors'],
    },
    {
      id: 'srv_8',
      title: 'Wedding Master Cook Team (Kharada & Halwai)',
      description: 'Full battalion of master cooks, helpers, and halwais for heavy traditional feast preparation at your venue or community center.',
      startingPrice: 4999,
      category: 'cook',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      icon: 'Users',
      features: ['Traditional Brass Handi Cooking', 'Dedicated Halwai for Sweets', 'Cooks for 100 to 2000+ Guests', 'Speedy Batch Serving'],
    },
    {
      id: 'srv_9',
      title: 'Non-Veg Specialist Cook',
      description: 'Expert chef specialized in spicy Odia Mutton Kasa, Fish Besara, Crab Kalia, and Charcoal Chicken Tandoor.',
      startingPrice: 1899,
      category: 'cook',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      icon: 'Flame',
      features: ['Perfect Meat Marination', 'Authentic Mustard Oil Cooking', 'Fresh Seafood Handling', 'Crispy Starters & Fries'],
    },
    {
      id: 'srv_10',
      title: 'Satvik & Pure Veg Specialist Cook',
      description: 'Master cook adhering strictly to Vedic vegetarian cooking guidelines without onion, garlic, or contamination.',
      startingPrice: 1599,
      category: 'cook',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      icon: 'Leaf',
      features: ['Zero Onion & Garlic', 'Temple Flavor Profiles', 'Pure Desi Ghee Usage', 'Sanitized Cooking Attire'],
    },
    {
      id: 'srv_11',
      title: 'Party & Weekend BBQ Cook',
      description: 'Energetic grill master and live cooking chef for weekend terrace parties, backyard barbecues, and cocktail evenings.',
      startingPrice: 2199,
      category: 'cook',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      icon: 'Utensils',
      features: ['Live Charcoal Grill', 'Tikka & Kebab Platters', 'Cocktail Appetizers', 'Interactive Guest Experience'],
    },
    {
      id: 'srv_12',
      title: 'Bulk Cooking & Event Kitchen Crew',
      description: 'Industrial-scale catering chefs and culinary assistants equipped to cook for festivals, yatras, tournaments, and mass feasts.',
      startingPrice: 6999,
      category: 'cook',
      image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=800&q=80',
      icon: 'Soup',
      features: ['Capacity for 3,000+ meals', 'Strict FIFO Food Safety', 'Calibrated Cooking Times', 'Complete Utensil Logistics'],
    }
  ];

  const initialPackages: CateringPackage[] = [
    {
      id: 'pkg_1',
      name: 'BASIC PACKAGE',
      pricePerPerson: 850,
      description: 'Clean, elegant frosted-glass spread ideal for intimate family gatherings, birthday get-togethers, and traditional pujas.',
      startersCount: 2,
      mainCourseCount: 4,
      dessertCount: 1,
      drinksCount: 1,
      staffIncluded: true,
      decorationOption: false,
      features: [
        '1 Welcome Cooler (Fresh Lime Soda / Jaljeera)',
        '2 Starters (Veg Crispy / Corn Seekh)',
        '1 Paneer / Seasonal Veg Specialty',
        '1 Dal Tadka / Authentic Dalma',
        'Steamed Basmati Rice + Phulka / Roti',
        '1 Traditional Sweet (Gulab Jamun)',
        'Salad, Papad & House Pickles',
        'Uniformed Service Staff & Chafing Station',
      ],
      popular: false,
    },
    {
      id: 'pkg_2',
      name: 'STANDARD PACKAGE',
      pricePerPerson: 299,
      description: 'Our most balanced package for receptions, anniversary feasts, and vibrant corporate banquets.',
      startersCount: 3,
      mainCourseCount: 6,
      dessertCount: 2,
      drinksCount: 2,
      staffIncluded: true,
      decorationOption: true,
      features: [
        '2 Welcome Coolers (Virgin Mojito + Mango)',
        '3 Starters (Chicken Tikka + Veg Kebabs)',
        'Chicken Curry / Fish Curry Option',
        'Paneer Butter Masala',
        'Authentic Dalma or Dal Makhani',
        'Jeera Rice / Pulao + Butter Naan',
        '2 Desserts (Hot Gulab Jamun + Ice Cream)',
        'Buffet Chafing Table Setup & Staff',
      ],
      popular: false,
    },
    {
      id: 'pkg_3',
      name: 'PREMIUM PACKAGE',
      pricePerPerson: 950,
      description: 'Our most selected luxury spread with live starter counters, royal gravies, aromatic dum biryani, and artisanal desserts.',
      startersCount: 4,
      mainCourseCount: 8,
      dessertCount: 3,
      drinksCount: 2,
      staffIncluded: true,
      decorationOption: true,
      features: [
        '4 Live Counter Starters (Amritsari Fish + Chicken Tikka + Kebabs)',
        'Royal Odia Mutton Kasa or Rogan Josh',
        'Butter Chicken / Fish Besara',
        'Shahi Paneer + Mixed Veg Jalfrezi',
        'Dum Biryani + Fragrant Pulao',
        'Tandoori Roti, Naan & Kulcha',
        '3 Desserts (Chhena Poda + Rasmalai + Kulfi)',
        'Full Ceramic Crockery & Premium Linen',
      ],
      popular: true,
    },
    {
      id: 'pkg_deluxe',
      name: 'DELUXE PACKAGE',
      pricePerPerson: 1050,
      description: 'The pinnacle of winter ice-glass banquet hospitality with master live counters, VIP buffet styling, and grand multi-course delicacies.',
      startersCount: 6,
      mainCourseCount: 12,
      dessertCount: 4,
      drinksCount: 3,
      staffIncluded: true,
      decorationOption: true,
      features: [
        '6 Live Counters (Chaat, Live BBQ & Seafood)',
        'Royal Odia Mutton Kasa, Prawn Malai Curry, Fish Fry',
        'Hyderabadi Dum Biryani & Fragrant Pulao',
        'Shahi Paneer, Dal Bukhara & Special Breads',
        'Assorted Breads from Live Tandoor',
        '4 Grand Artisanal Sweets (Chhena Poda, Rasmalai, Malpua)',
        'VIP Table Decor & Uniformed Executive Captains',
        'Complimentary Welcome Ice Mocktail Bar',
      ],
      popular: false,
    },
    {
      id: 'pkg_4',
      name: 'ROYAL PACKAGE',
      pricePerPerson: 699,
      description: 'The pinnacle of five-star hospitality. Unrestricted multi-cuisine banquet with master live counters and luxury presentation.',
      startersCount: 6,
      mainCourseCount: 12,
      dessertCount: 4,
      drinksCount: 3,
      staffIncluded: true,
      decorationOption: true,
      features: [
        '6 Live Counters (Chaat, Pasta, Live BBQ & Seafood)',
        'Odia Mutton Kasa, Prawn Malai Curry, Fish Fry',
        'Hyderabadi Chicken Dum Biryani',
        'Paneer Lababdar, Dal Bukhara, Pakhala Bhata Bar',
        'Assorted Bread Basket from Live Tandoor',
        '4 Grand Sweets (Chhena Poda, Rasmalai, Malpua, Rabdi)',
        'VIP Floral Table Decor & Executive Captains',
        'Complimentary Welcome Mocktail Bar',
      ],
      popular: false,
    }
  ];

  const initialGallery: GalleryItem[] = [
    {
      id: 'gal_1',
      title: 'Grand Royal Wedding Buffet',
      category: 'Weddings',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      description: 'Exquisite evening banquet setup for a 1,200-guest wedding reception in Bhubaneswar.',
    },
    {
      id: 'gal_2',
      title: 'Heritage Odia Royal Thali',
      category: 'Traditional Food',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      description: 'Traditional feast featuring authentic Dalma, Machha Besara, Aloo Bhaja, and Chhena Poda.',
    },
    {
      id: 'gal_3',
      title: 'Gourmet Live Tandoor & Grill',
      category: 'Cooking',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80',
      description: 'Live outdoor grilling station with sizzling chicken tikkas, paneer kebabs, and garlic naan.',
    },
    {
      id: 'gal_4',
      title: 'Corporate Annual Gala Dinner',
      category: 'Corporate',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      description: 'Buffet line arranged for an IT enterprise leadership dinner of 450 delegates.',
    },
    {
      id: 'gal_5',
      title: 'Artisan Dessert & Sweets Bar',
      category: 'Decorated Tables',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80',
      description: 'Artfully styled dessert display featuring warm Chhena Poda, chilled Rasmalai, and Jalebi.',
    },
    {
      id: 'gal_6',
      title: 'Evening Lawn Reception Setting',
      category: 'Events',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      description: 'Fairy lights and burgundy table runners for an outdoor romantic anniversary party.',
    },
    {
      id: 'gal_7',
      title: 'Traditional Clay Handi Preparation',
      category: 'Cooking',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
      description: 'Slow-simmered Mutton Kasa cooked over wood embers in authentic earthen cookware.',
    },
    {
      id: 'gal_8',
      title: 'Colorful Milestone Birthday Buffet',
      category: 'Birthdays',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80',
      description: 'Exciting kids and family food counter with sliders, live chaat, and custom cupcakes.',
    }
  ];

  const initialReviews: ReviewItem[] = [
    {
      id: 'rev_1',
      customerName: 'Soumya Ranjan Mohapatra',
      rating: 5,
      comment: 'AD Catering managed our wedding feast for 850 guests at Mayfair Lagoon. Every single person praised the Odia Mutton Kasa and authentic Chhena Poda. Outstanding hygiene and hospitality!',
      eventType: 'Grand Wedding Reception',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      date: '2026-08-14',
    },
    {
      id: 'rev_2',
      customerName: 'Priyanka Tripathy',
      rating: 5,
      comment: 'We hired their Professional Home Cook service for my parents 30th anniversary. Chef Suresh prepared a mouthwatering 7-course dinner. Punctual, respectful, and left the kitchen spotless.',
      eventType: 'Home Cook Anniversary Dinner',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: '2026-08-28',
    },
    {
      id: 'rev_3',
      customerName: 'Debabrata Das (TCS)',
      rating: 5,
      comment: 'Contracted AD Catering for our 500-attendee corporate conclave in Infocity. Smooth buffet transitions, delicious vegetarian spread, and perfect hot coffee throughout the day.',
      eventType: 'Corporate Summit',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      date: '2026-09-02',
    },
    {
      id: 'rev_4',
      customerName: 'Snigdha & Arindam Sahoo',
      rating: 5,
      comment: 'The Royal Package was worth every rupee! The live tandoor and Odia Dalma received endless compliments from all out-of-station guests. Truly the best catering in Odisha!',
      eventType: 'Engagement Celebration',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      date: '2026-09-11',
    }
  ];

  const initialBookings: Booking[] = [
    {
      id: 'book_1',
      bookingId: 'ADC-2026-1042',
      userId: 'usr_cust_1',
      customerName: 'Rohan Pattnaik',
      email: 'customer@gmail.com',
      phone: '+91 9437123456',
      eventType: 'Wedding Reception',
      eventDate: '2026-11-18',
      eventTime: '19:30',
      venue: 'Swosti Premium Lawn, Jaydev Vihar, Bhubaneswar',
      guestCount: 350,
      package: 'PREMIUM PACKAGE',
      foodPreference: 'Mixed',
      specialRequirements: 'Live fish fry counter and authentic hot Chhena Poda directly from oven.',
      additionalNotes: 'Need banquet staff in burgundy uniforms.',
      estimatedAmount: 157150,
      status: 'Confirmed',
      createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'book_2',
      bookingId: 'ADC-2026-1049',
      userId: 'usr_cust_1',
      customerName: 'Rohan Pattnaik',
      email: 'customer@gmail.com',
      phone: '+91 9437123456',
      eventType: 'Birthday Celebration',
      eventDate: '2026-12-05',
      eventTime: '18:00',
      venue: 'Club House, Shaheed Nagar, Bhubaneswar',
      guestCount: 75,
      package: 'STANDARD PACKAGE',
      foodPreference: 'Mixed',
      specialRequirements: 'Kid-friendly pasta counter and mocktail bar.',
      additionalNotes: '',
      estimatedAmount: 22425,
      status: 'Pending',
      createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  const initialContactMessages: ContactMessage[] = [
    {
      id: 'msg_1',
      name: 'Ananya Mishra',
      email: 'ananya.mishra@gmail.com',
      phone: '+91 9861112233',
      subject: 'Inquiry for 1000+ guest wedding at Cuttack',
      message: 'Hello, we are planning a wedding in Cuttack on December 20, 2026. Can you provide custom quotation for Royal Package with live Odia sweets counters?',
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      read: false,
    }
  ];

  const initialNotifications: AppNotification[] = [
    {
      id: 'notif_1',
      userId: 'usr_cust_1',
      title: 'Booking Confirmed!',
      message: 'Your booking ADC-2026-1042 for Wedding Reception has been confirmed by our head chef.',
      createdAt: new Date().toISOString(),
      read: false,
    }
  ];

  dbData = {
    users: initialUsers,
    bookings: initialBookings,
    menuItems: initialMenuItems,
    services: initialServices,
    packages: initialPackages,
    gallery: initialGallery,
    reviews: initialReviews,
    contactMessages: initialContactMessages,
    notifications: initialNotifications,
    homepage: initialHomepage,
    about: initialAbout,
    navigation: initialNavigation,
    settings: initialSettings,
  };

  saveDatabase();
  return dbData;
}

export function getDb(): DatabaseSchema {
  if (!dbData) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return dbData;
}
