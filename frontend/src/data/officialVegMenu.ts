// frontend/src/data/officialVegMenu.ts
// OFFICIAL VEG MENU PACKAGE DATA FOR AD CATERING AND COOK SERVICES
// Strictly contains the exact items specified for the Pure Veg Menu Package

export interface VegMenuItem {
  id: string;
  orderNumber: number; // 1 to 27
  name: string;
  category:
    | 'Welcome Drinks'
    | 'Soup'
    | 'Starter'
    | 'Plate Counter'
    | 'Main Course'
    | 'Sweet Dessert'
    | 'Special Inclusions';
  categoryNumber: number; // 1 to 7
  categoryHeading: string;
  description: string;
  image: string;
  isVeg: true;
  serving: string;
  tags: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
}

export interface VegCategoryMeta {
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  hindiOdiaHint: string;
  count: number;
  description: string;
  iconName: string;
}

export const officialVegCategories: VegCategoryMeta[] = [
  {
    number: 1,
    slug: 'welcome-drinks',
    title: '1. Welcome Drinks',
    shortTitle: 'Welcome Drinks',
    hindiOdiaHint: 'ସ୍ୱାଗତ ପାନୀୟ (Swagata Paniya)',
    count: 1,
    description: 'Refreshing celebratory mocktail blended with natural fruit juices and sparkling citrus garnish.',
    iconName: 'GlassWater',
  },
  {
    number: 2,
    slug: 'soup',
    title: '2. Soup Counter',
    shortTitle: 'Soup Counter',
    hindiOdiaHint: 'ଗରମ ସୁପ୍ (Garam Soup)',
    count: 1,
    description: 'Piping hot Indo-Chinese broth choice — Sweet Corn with crisp kernels or spicy Manchow with fried noodles.',
    iconName: 'Soup',
  },
  {
    number: 3,
    slug: 'starter',
    title: '3. Starters & Live Stalls',
    shortTitle: 'Starters',
    hindiOdiaHint: 'ଶାକାହାରୀ ଷ୍ଟାର୍ଟର୍ (Veg Starters)',
    count: 6,
    description: 'Crispy fried appetizers, charcoal tandoori paneer shashlik, and sizzling live chaat & gupchup counters.',
    iconName: 'Flame',
  },
  {
    number: 4,
    slug: 'plate-counter',
    title: '4. Plate Counter & Relishes',
    shortTitle: 'Plate Counter',
    hindiOdiaHint: 'ପ୍ଲେଟ୍ କାଉଣ୍ଟର (Plate Counter)',
    count: 5,
    description: 'Live plate accompaniment station with authentic Cuttacki Dahibara, Dahi Rashola, Italian pasta, fresh salad, and roasted papad.',
    iconName: 'UtensilsCrossed',
  },
  {
    number: 5,
    slug: 'main-course',
    title: '5. Royal Main Course',
    shortTitle: 'Main Course',
    hindiOdiaHint: 'ମୁଖ୍ୟ ଭୋଜନ (Royal Main Course)',
    count: 9,
    description: 'Dehradun Basmati Green Peas Rice, Rumali Roti, rich Dal Fry, Shahi Paneer, Navratan Korma, Mushroom Chilli, and seasonal curries.',
    iconName: 'Layers',
  },
  {
    number: 6,
    slug: 'sweet-dessert',
    title: '6. Sweet Desserts',
    shortTitle: 'Desserts',
    hindiOdiaHint: 'ରାଜକୀୟ ମିଠା (Royal Desserts)',
    count: 3,
    description: 'Signature Odia Kheer Sagar, piping hot desi ghee Jalebi / Gulab Jamun, and artisanal rich ice cream.',
    iconName: 'Cake',
  },
  {
    number: 7,
    slug: 'special-inclusions',
    title: '7. Hospitality & Counters',
    shortTitle: 'Inclusions',
    hindiOdiaHint: 'ପାନ ଓ ଜଳ ସେବା (Water & Paan)',
    count: 2,
    description: 'Hygienic sealed mineral water bottles and royal Banarasi sweet meetha paan counter for all banquet guests.',
    iconName: 'Sparkles',
  },
];

export const officialVegMenu: VegMenuItem[] = [
  // -------------------------------------------------------------
  // 1. WELCOME DRINKS (1 item)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_1',
    orderNumber: 1,
    name: 'Mocktail',
    category: 'Welcome Drinks',
    categoryNumber: 1,
    categoryHeading: '1. Welcome Drinks',
    description: 'Vibrant celebratory mocktails layered with fresh tropical fruit nectar, crushed mint, citrus fizz, and ice, served in tall crystal glassware.',
    image: '/images/DISHE/Mocktail.png',
    isVeg: true,
    serving: '1 Tall Crystal Glass (300ml)',
    tags: ['Tropical Mocktail', 'Welcome Drink', 'Refreshing Fizz'],
    isPopular: true,
    isFeatured: true,
  },

  // -------------------------------------------------------------
  // 2. SOUP (1 item)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_2',
    orderNumber: 2,
    name: 'Veg sweet corn / manchow soup',
    category: 'Soup',
    categoryNumber: 2,
    categoryHeading: '2. Soup Counter',
    description: 'Steaming gourmet soup duo — rich buttery American sweet corn broth or zesty garlic Manchow soup served with crispy fried noodles.',
    image: '/images/DISHE/S  C Soup (Veg. & Non Veg.).png',
    isVeg: true,
    serving: '1 Warm Ceramic Bowl (220ml)',
    tags: ['Sweet Corn', 'Manchow Soup', 'Hot Broth', 'Crispy Noodles'],
    isFeatured: true,
  },

  // -------------------------------------------------------------
  // 3. STARTERS (6 items)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_3',
    orderNumber: 3,
    name: 'American corn fry',
    category: 'Starter',
    categoryNumber: 3,
    categoryHeading: '3. Starters & Live Stalls',
    description: 'Golden sweet American corn kernels battered with oriental herbs and spices, wok-tossed with diced capsicum, spring onions, and cracked pepper.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    serving: '1 Portion (150g Platter)',
    tags: ['Crispy Corn', 'American Corn', 'Appetizer Favorite'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_4',
    orderNumber: 4,
    name: 'Hara bhara kabab',
    category: 'Starter',
    categoryNumber: 3,
    categoryHeading: '3. Starters & Live Stalls',
    description: 'Nutritious pan-seared patties crafted from pureed tender spinach, green peas, mashed potatoes, aromatic garam masala, and crowned with half cashew nut.',
    image: '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
    isVeg: true,
    serving: '3 Pieces / Portion',
    tags: ['Spinach & Peas', 'Shallow Fried', 'Desi Ghee', 'Cashew Crown'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_5',
    orderNumber: 5,
    name: 'Mushroom cheese ball',
    category: 'Starter',
    categoryNumber: 3,
    categoryHeading: '3. Starters & Live Stalls',
    description: 'Crispy panko-crusted croquettes stuffed with finely minced button mushrooms, gooey melted mozzarella cheese, and Italian herbs.',
    image: '/images/dishes/chilli-mushroom.jpg',
    isVeg: true,
    serving: '3 Crisp Balls / Serving',
    tags: ['Melted Mozzarella', 'Farm Mushroom', 'Crisp Croquette'],
    isFeatured: true,
  },
  {
    id: 'veg_pkg_6',
    orderNumber: 6,
    name: 'Paneer shashlik',
    category: 'Starter',
    categoryNumber: 3,
    categoryHeading: '3. Starters & Live Stalls',
    description: 'Skewered thick cubes of fresh Malai Paneer, bell peppers, tomatoes, and red onions marinated in hung curd and tandoori spices, charcoal-grilled to perfection.',
    image: '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
    isVeg: true,
    serving: '1 Charcoal Skewer (4 Chunks)',
    tags: ['Malai Paneer', 'Charcoal Tandoor', 'Smoky Bell Peppers'],
    isPopular: true,
    isFeatured: true,
  },
  {
    id: 'veg_pkg_7',
    orderNumber: 7,
    name: 'Dahi papdi chaat',
    category: 'Starter',
    categoryNumber: 3,
    categoryHeading: '3. Starters & Live Stalls',
    description: 'Crisp handmade flour papdis loaded with spiced boiled potatoes, chickpeas, chilled sweet yogurt, saunth tamarind chutney, mint chutney, and nylon sev.',
    image: '/images/DISHE/Dahi Papdi.png',
    isVeg: true,
    serving: '1 Chaat Plate (5 Crisp Papdis)',
    tags: ['Live Chaat Counter', 'Sweet Yogurt', 'Tamarind Saunth', 'Nylon Sev'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_8',
    orderNumber: 8,
    name: 'Gupchup',
    category: 'Starter',
    categoryNumber: 3,
    categoryHeading: '3. Starters & Live Stalls',
    description: 'Iconic live Gupchup (Pani Puri) stall with crispy hollow puris stuffed with warm spiced yellow pea-potato mash, served with tangy mint and sweet tamarind waters.',
    image: '/images/DISHE/PaniPuri.png',
    isVeg: true,
    serving: '6 Puris / Live Serving Counter',
    tags: ['Live Gupchup', 'Pani Puri', 'Spiced Mint Water', 'All-Time Favorite'],
    isPopular: true,
    isFeatured: true,
  },

  // -------------------------------------------------------------
  // 4. PLATE COUNTER (5 items)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_9',
    orderNumber: 9,
    name: 'Papad',
    category: 'Plate Counter',
    categoryNumber: 4,
    categoryHeading: '4. Plate Counter & Relishes',
    description: 'Crispy fire-roasted and golden fried Lijjat papads served as a crunchy accompaniment on every banquet dinner plate.',
    image: '/images/dishes/crispy-papad.jpg',
    isVeg: true,
    serving: '1 Whole Crisp Papad',
    tags: ['Crunchy Papad', 'Bikaneri Spice', 'Dinner Plate Classic'],
  },
  {
    id: 'veg_pkg_10',
    orderNumber: 10,
    name: 'Salad',
    category: 'Plate Counter',
    categoryNumber: 4,
    categoryHeading: '4. Plate Counter & Relishes',
    description: 'Garden fresh banquet salad composed of thinly sliced English cucumbers, farm tomatoes, carrots, radish, green chilies, and lemon wedges with rock salt.',
    image: '/images/royal-light-table.jpg',
    isVeg: true,
    serving: '1 Fresh Salad Bowl (100g)',
    tags: ['Garden Fresh', 'Crisp Cucumbers', 'Hydrating Greens'],
  },
  {
    id: 'veg_pkg_11',
    orderNumber: 11,
    name: 'Pasta',
    category: 'Plate Counter',
    categoryNumber: 4,
    categoryHeading: '4. Plate Counter & Relishes',
    description: 'Italian penne pasta tossed in a velvety cream sauce with sweet corn, capsicum, oregano, and grated parmesan cheese.',
    image: '/images/royal-light-table.jpg',
    isVeg: true,
    serving: '1 Plate Counter Portion (120g)',
    tags: ['Italian Penne', 'Cheesy Cream Sauce', 'Sweet Corn'],
  },
  {
    id: 'veg_pkg_12',
    orderNumber: 12,
    name: 'Dahi rashola',
    category: 'Plate Counter',
    categoryNumber: 4,
    categoryHeading: '4. Plate Counter & Relishes',
    description: 'Unique Odia delicacy of soft chhena rasgulla soaked in tempered spiced yogurt with roasted cumin and curry leaves, delivering sweet-savory harmony.',
    image: '/images/dishes/dahi-rashola.jpg',
    isVeg: true,
    serving: '1 Sweet-Savory Serving (1 Piece)',
    tags: ['Odia Dahi Rashola', 'Chhena Sweet & Curd', 'Heritage Delicacy'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_13',
    orderNumber: 13,
    name: 'Dahi bara',
    category: 'Plate Counter',
    categoryNumber: 4,
    categoryHeading: '4. Plate Counter & Relishes',
    description: 'World-famous Cuttack style soft urad dal vadas soaked in tempered light buttermilk curd, served with spicy aloo dum, ghuguni, and chopped onions.',
    image: '/images/DISHE/Dahiwada Aloudum.png',
    isVeg: true,
    serving: '2 Vadas with Aloo Dum & Ghuguni',
    tags: ['Cuttack Dahibara', 'World Famous', 'Must-Have Odia Plate'],
    isPopular: true,
    isFeatured: true,
  },

  // -------------------------------------------------------------
  // 5. MAIN COURSE (9 items)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_14',
    orderNumber: 14,
    name: 'Green peas rice',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Aromatic extra-long Basmati rice cooked with sweet green peas, whole cloves, star anise, and tempered in pure cow desi ghee.',
    image: '/images/royal-odia-feast.jpg',
    isVeg: true,
    serving: '1 Rice Handi Portion (250g)',
    tags: ['Basmati Rice', 'Green Peas', 'Desi Ghee Tempered'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_15',
    orderNumber: 15,
    name: 'Rumali roti',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Ultra-thin, handkerchief-soft Indian flatbread hand-tossed and cooked on an inverted tawa (roomali kadai), served piping hot.',
    image: '/images/royal-odia-feast.jpg',
    isVeg: true,
    serving: '2 Soft Rumali Rotis',
    tags: ['Handkerchief Soft', 'Live Ulta Tawa', 'Royal Indian Bread'],
    isFeatured: true,
  },
  {
    id: 'veg_pkg_16',
    orderNumber: 16,
    name: 'Yellow Dal fry',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Golden toor dal slow-boiled to creamy consistency, double-tempered in desi ghee with roasted cumin seeds, garlic, ginger, tomatoes, and dried red chilies.',
    image: '/images/DISHE/DALEMA.png',
    isVeg: true,
    serving: '1 Warm Lentil Katori (180ml)',
    tags: ['Desi Ghee Tadka', 'Toor Dal', 'Classic Comfort'],
  },
  {
    id: 'veg_pkg_17',
    orderNumber: 17,
    name: 'Fruits jelly',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Refreshing sweet palate cleanser prepared with crystal fruit gelatin, fresh pineapple chunks, and natural fruit essences.',
    image: '/images/dishes/chhena-poda.jpg',
    isVeg: true,
    serving: '1 Serving Cup (100g)',
    tags: ['Pineapple Fruit Jelly', 'Palate Cleanser', 'Sweet Relish'],
  },
  {
    id: 'veg_pkg_18',
    orderNumber: 18,
    name: 'Paneer punjabi / hyderabadi',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Soft cubes of farm cottage cheese simmered in your choice of rich Punjabi butter masala gravy or spicy Hyderabadi spinach-coriander gravy.',
    image: '/images/DISHE/Paneer Butter Masala.png',
    isVeg: true,
    serving: '1 Royal Handi Portion (200g)',
    tags: ['Shahi Paneer', 'Punjabi Butter Masala', 'Hyderabadi Gravy'],
    isPopular: true,
    isFeatured: true,
  },
  {
    id: 'veg_pkg_19',
    orderNumber: 19,
    name: 'Navaratna kurma',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Mughlai royal curry crafted with nine gems — mixed farm vegetables, paneer cubes, cashews, raisins, and dried nuts in a velvety cream sauce.',
    image: '/images/gourmet-ceramic-curry.jpg',
    isVeg: true,
    serving: '1 Shahi Bowl (200g)',
    tags: ['9 Royal Gems', 'Cashew Cream', 'Mughlai Feast'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_20',
    orderNumber: 20,
    name: 'Seasonal veg',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Fresh local farm-harvested seasonal vegetables cooked in aromatic Indian spices, lightly roasted with ginger, cumin, and fresh coriander.',
    image: '/images/gourmet-ceramic-curry.jpg',
    isVeg: true,
    serving: '1 Portion (180g)',
    tags: ['Farm Fresh', 'Seasonal Harvest', 'Wholesome Veg'],
  },
  {
    id: 'veg_pkg_21',
    orderNumber: 21,
    name: 'Mushroom chilli',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Crisp button mushrooms wok-tossed with crunchy bell peppers, onions, green chilies, soya sauce, and spicy garlic sauce.',
    image: '/images/dishes/chilli-mushroom.jpg',
    isVeg: true,
    serving: '1 Wok Platter (180g)',
    tags: ['Chilli Mushroom', 'Indo-Chinese', 'Spicy & Savory'],
    isPopular: true,
  },
  {
    id: 'veg_pkg_22',
    orderNumber: 22,
    name: 'Finger chips',
    category: 'Main Course',
    categoryNumber: 5,
    categoryHeading: '5. Royal Main Course',
    description: 'Golden-fried crisp potato batons sprinkled with peri-peri rock salt, a perennial hit with kids and banquet diners alike.',
    image: '/images/dishes/Pav_bhaji__2.jpg',
    isVeg: true,
    serving: '1 Hot Crispy Basket',
    tags: ['Crispy French Fries', 'Kids Favorite', 'Golden Potatoes'],
  },

  // -------------------------------------------------------------
  // 6. SWEET DESSERT (3 items)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_23',
    orderNumber: 23,
    name: 'Khir sagar',
    category: 'Sweet Dessert',
    categoryNumber: 6,
    categoryHeading: '6. Sweet Desserts',
    description: 'Odisha legendary dessert featuring marble-sized soft chhena dumplings submerged in thickened cardamom, saffron, and condensed sweet milk.',
    image: '/images/dishes/khir-sagar.jpg',
    isVeg: true,
    serving: '2 Dumplings in Saffron Rabdi (120ml)',
    tags: ['Odia Khir Sagar', 'Chhena Dumplings', 'Condensed Milk', 'Cardamom & Saffron'],
    isPopular: true,
    isFeatured: true,
  },
  {
    id: 'veg_pkg_24',
    orderNumber: 24,
    name: 'Hot jalebi / gulab jamun',
    category: 'Sweet Dessert',
    categoryNumber: 6,
    categoryHeading: '6. Sweet Desserts',
    description: 'Live sweet station serving spirals of crispy piping hot desi ghee Jalebis and melt-in-mouth warm Gulab Jamuns soaked in saffron sugar syrup.',
    image: '/images/dishes/chhena-poda.jpg',
    isVeg: true,
    serving: '2 Warm Sweet Portions',
    tags: ['Live Hot Jalebi', 'Desi Ghee', 'Gulab Jamun', 'Warm Syrup'],
    isPopular: true,
    isFeatured: true,
  },
  {
    id: 'veg_pkg_25',
    orderNumber: 25,
    name: 'Ice cream',
    category: 'Sweet Dessert',
    categoryNumber: 6,
    categoryHeading: '6. Sweet Desserts',
    description: 'Rich, velvety churned dairy ice cream served chilled in dessert cups with choice of Vanilla, Butterscotch, or Kesar Pista.',
    image: '/images/dishes/chhena-poda.jpg',
    isVeg: true,
    serving: '1 Chilled Dessert Cup (100ml)',
    tags: ['Velvety Ice Cream', 'Chilled Delight', 'Dessert Scoop'],
  },

  // -------------------------------------------------------------
  // 7. WATER & PAAN INCLUSIONS (2 items)
  // -------------------------------------------------------------
  {
    id: 'veg_pkg_26',
    orderNumber: 26,
    name: 'Water bottle',
    category: 'Special Inclusions',
    categoryNumber: 7,
    categoryHeading: '7. Hospitality & Counters',
    description: 'Individual packaged hygienic sealed 250ml / 500ml mineral water bottles supplied generously throughout the banquet service.',
    image: '/images/luxury-buffet-setup.jpg',
    isVeg: true,
    serving: 'Hygienic Sealed Mineral Water Bottles',
    tags: ['Packaged Mineral Water', 'Hygienic Sealed', 'Guest Comfort'],
  },
  {
    id: 'veg_pkg_27',
    orderNumber: 27,
    name: 'Paan counter',
    category: 'Special Inclusions',
    categoryNumber: 7,
    categoryHeading: '7. Hospitality & Counters',
    description: 'Regal live Banarasi Paan stall offering silver-leaf coated Meetha Paan, Gulkand, aromatic sweet supari, and digestives to conclude the banquet.',
    image: '/images/dishes/royal-paan-counter.jpg',
    isVeg: true,
    serving: 'Live Meetha Paan Counter for All Guests',
    tags: ['Live Paan Counter', 'Banarasi Meetha Paan', 'Silver Leaf', 'Royal Digestive'],
    isPopular: true,
    isFeatured: true,
  },
];
