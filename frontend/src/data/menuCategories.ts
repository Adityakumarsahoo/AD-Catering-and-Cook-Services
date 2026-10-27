// frontend/src/data/menuCategories.ts
// Master metadata configuration for all 22 catering menu categories
// Sourced from AD Catering & Cook Services official master menu cards

export interface MenuCategoryMeta {
  key: string;               // Matches item.category in defaultMenu.ts
  slug: string;              // URL / DOM anchor safe slug
  label: string;            // Formatted display title
  shortLabel: string;       // Compact label for mobile pills
  hindiOdiaHint?: string;   // Regional name hint
  description: string;      // Appetizing category introduction
  iconName: string;         // Lucide icon identifier
  isNonVeg?: boolean;       // Mostly/entirely non-veg category
  isOdiaHeritage?: boolean; // Authentic Odia regional cuisine
  fallbackImage: string;    // Guaranteed local asset image
}

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  {
    key: 'WELCOME DRINK',
    slug: 'welcome-drink',
    label: 'Welcome Drinks',
    shortLabel: 'Drinks',
    hindiOdiaHint: 'ସ୍ୱାଗତ ପାନୀୟ (Swagata Paniya)',
    description: 'Chilled artisanal fruit milkshakes, refreshing mocktails, traditional thick sweet lassi, aam panna, and comforting saffron hot badam milk served in royal glassware.',
    iconName: 'GlassWater',
    fallbackImage: '/images/dishes/Badam_Milk_Drink.jpg',
  },
  {
    key: 'SOUP',
    slug: 'soup',
    label: 'Soup Station',
    shortLabel: 'Soups',
    hindiOdiaHint: 'ସୁପ୍ ଷ୍ଟେସନ୍ (Garam Soup)',
    description: 'Piping hot, fragrant broths and velvety soups including classic Cream of Tomato, Indo-Chinese Hot & Sour, Sweet Corn, and zesty Lemon Coriander.',
    iconName: 'Soup',
    fallbackImage: '/images/dishes/spiced-jaljeera.jpg',
  },
  {
    key: 'COUNTER STARTER',
    slug: 'counter-starter',
    label: 'Live Counter Starters',
    shortLabel: 'Live Chaat',
    hindiOdiaHint: 'ଲାଇଭ୍ ଚାଟ୍ କାଉଣ୍ଟର (Live Chaat)',
    description: 'Interactive live banquet counters featuring authentic Cuttacki Dahibara Aludam, crisp Pani Puri with assorted tangy waters, Raj Kachori, Dahi Papdi, and sizzling Pav Bhaji.',
    iconName: 'Store',
    fallbackImage: '/images/dishes/live-panipuri.jpg',
  },
  {
    key: 'STARTER (VEG)',
    slug: 'starter-veg',
    label: 'Starters (Veg)',
    shortLabel: 'Veg Starters',
    hindiOdiaHint: 'ଶାକାହାରୀ ଷ୍ଟାର୍ଟର୍ (Veg Starters)',
    description: 'Sizzling tandoor and golden-fried vegetarian appetizers — Crispy Corn, Hara Bhara Kabab, Paneer Stick Tikka, Dragon Paneer, Manchurian, and Spring Rolls.',
    iconName: 'Sparkles',
    fallbackImage: '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  },
  {
    key: 'STARTER (NON-VEG)',
    slug: 'starter-non-veg',
    label: 'Starters (Non-Veg)',
    shortLabel: 'Non-Veg Starters',
    hindiOdiaHint: 'ଆମିଷ ଷ୍ଟାର୍ଟର୍ (Non-Veg Starters)',
    description: 'Crisp boneless Fish Fingers, Amritsari Fish, Golden Fried Prawns, Tangdi Kebabs, Chicken Malai Tikka, and smoky Tandoori Chicken grilled over live charcoal.',
    iconName: 'Flame',
    isNonVeg: true,
    fallbackImage: '/images/dishes/odia-mutton-kasa.jpg',
  },
  {
    key: 'EGGS TO ORDER',
    slug: 'eggs-to-order',
    label: 'Eggs to Order',
    shortLabel: 'Egg Station',
    hindiOdiaHint: 'ଅଣ୍ଡା ସ୍ପେଶାଲ୍ (Egg Station)',
    description: 'Fresh farm eggs prepared on live banquet grills — Boiled Eggs, Poached Eggs, Fluffy Masala Omelettes, Crispy Egg Chops, Egg Scotch, and spicy Egg Pakodas.',
    iconName: 'Egg',
    isNonVeg: true,
    fallbackImage: '/images/dishes/Dahibara_Aludam.jpg',
  },
  {
    key: 'ROTI / NAN / PURI',
    slug: 'roti-nan-puri',
    label: 'Roti, Naan & Puri',
    shortLabel: 'Breads & Puris',
    hindiOdiaHint: 'ରୁଟି, ନାନ୍ ଏବଂ ପୁରୀ (Breads)',
    description: 'Fresh from the clay tandoor and hot oil — Butter Naan, Garlic Naan, Rumali Roti, traditional Odia Thunka Puri, Chakuli, Biri Kachori, and stuffed Parathas.',
    iconName: 'Utensils',
    fallbackImage: '/images/royal-odia-feast.jpg',
  },
  {
    key: 'RICE / PULAO / BIRYANI',
    slug: 'rice-pulao-biryani',
    label: 'Rice, Pulao & Biryani',
    shortLabel: 'Rice & Biryani',
    hindiOdiaHint: 'ଭାତ, ପଲାଉ ଓ ବିରିୟାନି (Rice & Biryani)',
    description: 'Fragrant long-grain Dehradun Basmati rice preparations — Jeera Rice, Royal Kashmiri Pulao, Kaju Pulao, Dum Chicken Biryani, Mutton Biryani, and Chinese Fried Rice.',
    iconName: 'CookingPot',
    fallbackImage: '/images/royal-odia-feast.jpg',
  },
  {
    key: 'DAL',
    slug: 'dal',
    label: 'Dal & Lentils',
    shortLabel: 'Dals',
    hindiOdiaHint: 'ଡାଲି ଓ ତଡକା (Dal & Lentils)',
    description: 'Slow-simmered Punjabi Dal Makhani, Dal Bukhara, Dal Tadka with desi ghee, traditional Odia Khati Mithi Dal, Coconut Dal, and rich Dal Maharani.',
    iconName: 'Soup',
    fallbackImage: '/images/dishes/odia-dalma.jpg',
  },
  {
    key: 'CHUTNEY & RAITA',
    slug: 'chutney-raita',
    label: 'Chutney & Raita',
    shortLabel: 'Chutneys',
    hindiOdiaHint: 'ଚଟଣି ଓ ରାଇତା (Relishes)',
    description: 'Tangy and cooling accompaniments — Mango Khajur Chutney, Odia Plastic Chutney, Dahi Baingan, Nadia Pachadi, chilled Boondi Raita, Green Salad, and crisp Papad.',
    iconName: 'Salad',
    fallbackImage: '/images/dishes/dahi-rashola.jpg',
  },
  {
    key: 'VEGETABLE',
    slug: 'vegetable',
    label: 'Vegetable Curries',
    shortLabel: 'Veg Curries',
    hindiOdiaHint: 'ସବଜି କୋର୍ମା ଓ ମସଲା (Veg Curries)',
    description: 'Grand royal banquet vegetable creations — Navratan Korma, Mix Veg Butter Masala, Veg Jalfrezi, Kashmiri Dum Aloo, Parwal Korma, and rich Chana Masala.',
    iconName: 'Carrot',
    fallbackImage: '/images/gourmet-ceramic-curry.jpg',
  },
  {
    key: 'MUSHROOM',
    slug: 'mushroom',
    label: 'Mushroom Specialties',
    shortLabel: 'Mushrooms',
    hindiOdiaHint: 'ଛତୁ ମସଲା (Mushroom)',
    description: 'Tender button mushrooms tossed in aromatic gravies — Mushroom Kadai, Mushroom Butter Masala, spicy Mushroom Takatak, Mushroom Hyderabadi, and Odia Mushroom Besar.',
    iconName: 'Leaf',
    fallbackImage: '/images/dishes/chilli-mushroom.jpg',
  },
  {
    key: 'PANEER',
    slug: 'paneer',
    label: 'Paneer Delicacies',
    shortLabel: 'Paneer',
    hindiOdiaHint: 'ପନିର ସ୍ପେଶାଲ୍ (Paneer Delicacies)',
    description: 'Fresh dairy cottage cheese slow-cooked in rich cashew-tomato gravies — Paneer Butter Masala, Shahi Korma, Paneer Tikka Masala, Pasanda, Palak Paneer, and Tiranga Paneer.',
    iconName: 'Crown',
    fallbackImage: '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  },
  {
    key: 'FISH',
    slug: 'fish',
    label: 'Fish & Seafood',
    shortLabel: 'Fish',
    hindiOdiaHint: 'ମାଛ କାଳିଆ ଓ ବେସର (Fish Specialties)',
    description: 'Fresh freshwater Rohu, Katla, and silver Pomfret cooked in traditional Mustard Fish Besar, rich Fish Kalia, Tawa Fried Pomfret, and coastal Crab Masala.',
    iconName: 'Fish',
    isNonVeg: true,
    fallbackImage: '/images/dishes/macha-besara.jpg',
  },
  {
    key: 'PRAWN',
    slug: 'prawn',
    label: 'Prawn Delights',
    shortLabel: 'Prawns',
    hindiOdiaHint: 'ଚିଙ୍ଗୁଡ଼ି ମଲାଇକରି (Prawns)',
    description: 'Succulent coastal Bay prawns simmered in rich coconut Chingudi Malai Curry, Butter Garlic sauce, spicy Prawn Masala, and traditional Mustard Prawn Besar.',
    iconName: 'Fish',
    isNonVeg: true,
    fallbackImage: '/images/dishes/macha-besara.jpg',
  },
  {
    key: 'CHICKEN',
    slug: 'chicken',
    label: 'Chicken Curries',
    shortLabel: 'Chicken',
    hindiOdiaHint: 'କୁକୁଡ଼ା ମାଂସ (Chicken Curries)',
    description: 'Regal banquet poultry dishes — Chicken Butter Masala, Dum Chicken, Chicken Maharaja, Mughlai Chicken, rich Chicken Bharta, and legendary Katki Special Chicken.',
    iconName: 'Drumstick',
    isNonVeg: true,
    fallbackImage: '/images/dishes/odia-mutton-kasa.jpg',
  },
  {
    key: 'MUTTON',
    slug: 'mutton',
    label: 'Mutton & Gosht',
    shortLabel: 'Mutton',
    hindiOdiaHint: 'ଖାସି ମାଂସ କସା (Mutton Specialties)',
    description: 'Tender baby goat meat slow-simmered in pure desi ghee — Odia Mutton Kasa, Kashmiri Rogan Josh, Mutton Bhuna Roast, Mutton Ghee Roast, and Keema Mutton.',
    iconName: 'Flame',
    isNonVeg: true,
    fallbackImage: '/images/dishes/odia-mutton-kasa.jpg',
  },
  {
    key: 'AAMISHA (NON-VEG)',
    slug: 'aamisha-non-veg',
    label: 'Aamisha (Odia Non-Veg)',
    shortLabel: 'Odia Non-Veg',
    hindiOdiaHint: 'ଆମିଷ ଭୋଜି (Authentic Odia Non-Veg)',
    description: 'Heritage Odia celebratory delicacies — Chuna Macha Bhaja & Besar, legendary Macha Munda Ghanta, Mudhi Ghanta, Poi Chingudi Ghanta, Macha Aambila, and Chingudi Checha.',
    iconName: 'Sparkles',
    isNonVeg: true,
    isOdiaHeritage: true,
    fallbackImage: '/images/dishes/macha-besara.jpg',
  },
  {
    key: 'ODISSI SPECIAL',
    slug: 'odissi-special',
    label: 'Odissi Heritage Feast',
    shortLabel: 'Odissi Special',
    hindiOdiaHint: 'ଓଡ଼ିଶୀ ପାରମ୍ପରିକ ଭୋଜନ (Mahaprasad Heritage)',
    description: 'Sacred temple-style and festive Odia preparations — Ghee Arna, Kanika sweet rice, cooling Dahi Pakhala, temple Dalma, Tomato Khajur Khatta, and Awu Khatta.',
    iconName: 'Award',
    isOdiaHeritage: true,
    fallbackImage: '/images/dishes/dahi-pakhala.jpg',
  },
  {
    key: 'SADDA (VEG)',
    slug: 'sadda-veg',
    label: 'Sadda (Traditional Odia Veg)',
    shortLabel: 'Odia Sadda Veg',
    hindiOdiaHint: 'ସାଧା ଭୋଜନ (Traditional Odia Veg)',
    description: 'Authentic homestyle vegetarian preps — Sadda Mahura, Santula, Chhuin Badi Aloo Besar, crunchy Badi Chura, Saga Muga, Potal Aloo Rasa, Aloo Posto, and Baigan Bhaja.',
    iconName: 'Leaf',
    isOdiaHeritage: true,
    fallbackImage: '/images/dishes/odia-dalma.jpg',
  },
  {
    key: 'CONTINENTAL',
    slug: 'continental',
    label: 'Continental & Global',
    shortLabel: 'Continental',
    hindiOdiaHint: 'କଣ୍ଟିନେଣ୍ଟାଲ୍ (Continental)',
    description: 'Global banquet favorites — Creamy Russian Salad, Street Corn Pasta, Golden Cheese Balls, Saut’e Vegetables, Continental Chicken Roast, and baked Augratin.',
    iconName: 'UtensilsCrossed',
    fallbackImage: '/images/dishes/Pav_bhaji__2.jpg',
  },
  {
    key: 'DESERT',
    slug: 'desert',
    label: 'Royal Sweets & Desserts',
    shortLabel: 'Desserts',
    hindiOdiaHint: 'ମିଠା ଓ ଡେଜର୍ଟ୍ (Royal Odia Mithai)',
    description: 'Legendary Pahala Rasagola, slow-baked Chhena Poda, Nimapada Chhena Jhilli, Kendrapara Rasabali, Kheer Sagar, Shahi Tukda, Baked Boondi, Rabdi, Malpua, and Kulfi.',
    iconName: 'Cake',
    fallbackImage: '/images/dishes/chhena-poda.jpg',
  },
];

// Helper to look up category metadata by raw category string
export function getCategoryMeta(categoryKey: string): MenuCategoryMeta {
  const normalized = (categoryKey || '').trim().toUpperCase();
  const match = MENU_CATEGORIES.find(
    (c) => c.key === normalized || c.slug === categoryKey.toLowerCase()
  );
  if (match) return match;

  return {
    key: categoryKey,
    slug: categoryKey.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    label: categoryKey,
    shortLabel: categoryKey,
    description: 'Authentic culinary preparation freshly crafted by AD Catering master chefs.',
    iconName: 'UtensilsCrossed',
    fallbackImage: '/images/dishes/chhena-poda.jpg',
  };
}
