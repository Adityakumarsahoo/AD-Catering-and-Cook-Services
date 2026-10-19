import { MenuItem } from '../types.js';

export const officialVegMenuItems: MenuItem[] = [
  // WELCOME DRINKS
  {
    id: "v_wd_1",
    name: "Mocktail",
    category: "WELCOME DRINKS",
    menuType: "all",
    description: "Refreshing tropical blend of fresh muddled garden mint, zesty lime, exotic fruit nectars, and sparkling effervescence served ice-cold.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 1,
    tags: ["Mocktail", "Refreshing", "Welcome Special", "Zero-Alcohol"]
  },

  // SOUP
  {
    id: "v_sp_1",
    name: "Veg Sweet Corn Soup",
    category: "SOUP",
    menuType: "all",
    description: "Warm, velvety broth loaded with crushed golden American sweet corn, finely minced garden vegetables, and aromatic white pepper.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 2,
    tags: ["Sweet Corn", "Velvety Soup", "Mild"]
  },
  {
    id: "v_sp_2",
    name: "Veg Manchow Soup",
    category: "SOUP",
    menuType: "all",
    description: "Robust Indo-Chinese dark broth infused with minced garlic, ginger, chopped wild mushrooms, scallions, and served with crispy fried noodles.",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 3,
    tags: ["Manchow", "Spicy & Tangy", "Crispy Noodles"]
  },

  // STARTER
  {
    id: "v_st_1",
    name: "American Corn Fry",
    category: "STARTER - VEG",
    menuType: "all",
    description: "Golden crispy corn bites with a delicious crunch.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 4,
    tags: ["American Corn", "Crispy", "Crunchy"]
  },
  {
    id: "v_st_2",
    name: "Hara Bhara Kabab",
    category: "STARTER - VEG",
    menuType: "all",
    description: "Herb-packed vegetarian kebabs with a delicate crisp exterior.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 5,
    tags: ["Hara Bhara", "Spinach & Peas", "Crisp Exterior"]
  },
  {
    id: "v_st_3",
    name: "Mushroom Cheese Ball",
    category: "STARTER - VEG",
    menuType: "all",
    description: "Crispy mushroom and cheese bites with a rich centre.",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 6,
    tags: ["Mushroom Cheese", "Molten Center", "Crumb Fried"]
  },
  {
    id: "v_st_4",
    name: "Paneer Shashlik",
    category: "STARTER - VEG",
    menuType: "all",
    description: "Char-grilled paneer with colourful vegetables.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 7,
    tags: ["Paneer Shashlik", "Char-grilled", "Tandoor"]
  },
  {
    id: "v_st_5",
    name: "Dahi Papdi Chaat",
    category: "STARTER - VEG",
    menuType: "all",
    description: "Crisp papdi layered with creamy yoghurt and vibrant chutneys.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 8,
    tags: ["Dahi Papdi", "Chaat", "Creamy Curd"]
  },
  {
    id: "v_st_6",
    name: "Gupchup",
    category: "STARTER - VEG",
    menuType: "all",
    description: "Crispy puris filled with tangy, refreshing flavours.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 9,
    tags: ["Gupchup", "Pani Puri", "Live Counter"]
  },

  // PLATE COUNTER
  {
    id: "v_pc_1",
    name: "Papad",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Crisp roasted and fried spiced lentil wafers dusted with roasted cumin and chaat masala.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 10,
    tags: ["Papad", "Crisp Lentil Wafers"]
  },
  {
    id: "v_pc_2",
    name: "Salad",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Artistically carved garden fresh cucumber ribbons, sweet carrots, vine tomatoes, and beetroot rosettes.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 11,
    tags: ["Fresh Salad", "Garden Greens"]
  },
  {
    id: "v_pc_3",
    name: "Pasta",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Penne pasta tossed in rich garlic parmesan cream with crisp garden bell peppers and fine Italian herbs.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 12,
    tags: ["Creamy Pasta", "Continental"]
  },
  {
    id: "v_pc_4",
    name: "Dahi Rashola",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Traditional celebration delicacy of tender cottage cheese dumplings soaked in seasoned spiced yoghurt with roasted cumin.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 13,
    tags: ["Dahi Rashola", "Odia Specialty", "Plate Feature"]
  },
  {
    id: "v_pc_5",
    name: "Dahi Bara",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Iconic Cuttack style soft urad dal vadas immersed in seasoned buttermilk, tempered with mustard seeds and curry leaves.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 14,
    tags: ["Dahi Bara", "Cuttack Classic", "Plate Feature"]
  },

  // MAIN COURSE
  {
    id: "v_mc_1",
    name: "Green Peas Rice",
    category: "RICE / PULAO / BIRYANI",
    menuType: "all",
    description: "Fragrant royal basmati rice gently tempered in desi cow ghee with sweet green garden peas, whole cardamom, and bay leaves.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 15,
    tags: ["Green Peas Rice", "Desi Ghee", "Main Course Feature"]
  },
  {
    id: "v_mc_2",
    name: "Rumali Roti",
    category: "ROTI / NAN / PURI",
    menuType: "all",
    description: "Paper-thin, ultra-soft handkerchief flatbread expertly cooked on an inverted hot tawa and folded fresh.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 16,
    tags: ["Rumali Roti", "Paper Thin", "Hot Flatbread"]
  },
  {
    id: "v_mc_3",
    name: "Yellow Dal Fry",
    category: "DAL",
    menuType: "all",
    description: "Slow-cooked yellow toor lentils tempered with pure desi ghee, cumin seeds, garlic slivers, and fresh coriander.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 17,
    tags: ["Yellow Dal Fry", "Desi Ghee", "Tadka"]
  },
  {
    id: "v_mc_4",
    name: "Fruits Jelly",
    category: "SWEET DESSERT",
    menuType: "all",
    description: "Glistening chilled fruit jelly layered with colorful real fruit pieces, offering a palate-cleansing sweetness.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 18,
    tags: ["Fruits Jelly", "Chilled Delight", "Colourful"]
  },
  {
    id: "v_mc_5a",
    name: "Paneer Punjabi",
    category: "PANEER",
    menuType: "all",
    description: "Soft cubes of malai cottage cheese simmered in a luscious, velvety tomato-cashew makhani gravy enriched with butter and kasuri methi.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 19,
    tags: ["Paneer Punjabi", "Makhani", "Rich Cashew"]
  },
  {
    id: "v_mc_5b",
    name: "Paneer Hyderabadi",
    category: "PANEER",
    menuType: "all",
    description: "Royal green gravy crafted with fresh mint, coriander leaves, roasted poppy seeds, coconut, and simmered tender paneer blocks.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 20,
    tags: ["Paneer Hyderabadi", "Green Herb Gravy", "Nawabi"]
  },
  {
    id: "v_mc_6",
    name: "Navaratna Kurma",
    category: "VEGETABLE",
    menuType: "all",
    description: "Nine culinary jewels of tender seasonal vegetables, fruits, dry nuts, and cottage cheese cooked in a royal mild cashew cream kurma.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 21,
    tags: ["Navaratna Kurma", "Nine Jewels", "Cashew Cream"]
  },
  {
    id: "v_mc_7",
    name: "Seasonal Veg",
    category: "VEGETABLE",
    menuType: "all",
    description: "Fresh farm-picked seasonal cauliflower, green peas, carrots, and beans dry-roasted with aromatic whole spices.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 22,
    tags: ["Seasonal Veg", "Farm Fresh", "Spiced Roast"]
  },
  {
    id: "v_mc_8",
    name: "Mushroom Chilli",
    category: "MUSHROOM",
    menuType: "all",
    description: "Crispy button mushrooms wok-tossed with scallions, capsicum, green chillies, and savory dark soy.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 23,
    tags: ["Mushroom Chilli", "Indo-Chinese", "Wok Tossed"]
  },
  {
    id: "v_mc_9",
    name: "Finger Chips",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Crispy golden potato fingers fried to perfection, lightly seasoned with rock salt and fine herbs.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 24,
    tags: ["Finger Chips", "French Fries", "Golden Crisp"]
  },

  // SWEET DESSERT
  {
    id: "v_des_1",
    name: "Khir Sagar",
    category: "SWEET DESSERT",
    menuType: "all",
    description: "Odisha specialty of miniature fresh cottage cheese dumplings poached in thickened cardamom-infused sweetened milk with saffron.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 25,
    tags: ["Khir Sagar", "Odia Dessert", "Saffron Milk"]
  },
  {
    id: "v_des_2a",
    name: "Hot Jalebi",
    category: "SWEET DESSERT",
    menuType: "all",
    description: "Crisp, golden saffron spirals fried live in pure desi ghee and immersed in warm aromatic cardamom syrup.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 26,
    tags: ["Hot Jalebi", "Desi Ghee", "Saffron Syrup"]
  },
  {
    id: "v_des_2b",
    name: "Gulab Jamun",
    category: "SWEET DESSERT",
    menuType: "all",
    description: "Warm, melt-in-mouth golden khoya dumplings gently steeped in rose-scented sugar nectar.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 27,
    tags: ["Gulab Jamun", "Warm Khoya", "Rose Syrup"]
  },
  {
    id: "v_des_3",
    name: "Ice Cream",
    category: "SWEET DESSERT",
    menuType: "all",
    description: "Smooth, creamy celebration scoops of rich vanilla and strawberry ice cream, garnished with roasted almond flakes.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 28,
    tags: ["Ice Cream", "Artisanal Scoops", "Chilled"]
  },

  // WATER BOTTLE
  {
    id: "v_wb_1",
    name: "Water Bottle",
    category: "WATER BOTTLE",
    menuType: "all",
    description: "Hygienically packaged, crystal clear purified natural mineral water bottles provided for every honored guest.",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 29,
    tags: ["Water Bottle", "Purified Water", "Sealed"]
  },

  // PAAN COUNTER
  {
    id: "v_pn_1",
    name: "Paan Counter",
    category: "PAAN COUNTER",
    menuType: "all",
    description: "Traditional royal digestive paan prepared live with tender Magahi betel leaf, sweetened gulkand, fragrant cardamom, sweet fennel, and edible silver leaf.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 30,
    tags: ["Paan Counter", "Digestive Paan", "Live Counter"]
  }
];
