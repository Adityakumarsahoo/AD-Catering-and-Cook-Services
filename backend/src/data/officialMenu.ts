import { MenuItem } from '../types.js';

export const officialMenuItems: MenuItem[] = [
  // ==========================================
  // 1. WELCOME DRINKS
  // ==========================================
  {
    id: "wd_1",
    name: "Virgin Mojito",
    category: "WELCOME DRINKS",
    menuType: "all",
    description: "Muddled fresh garden mint, zesty lime wedges, simple syrup, and sparkling soda served ice-cold.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 1,
    tags: ["Signature Cooler", "Chilled", "Citrus"]
  },
  {
    id: "wd_2",
    name: "Blue Lagoon Mocktail",
    category: "WELCOME DRINKS",
    menuType: "deluxe",
    description: "Vibrant tropical blue curacao syrup shaken with lemon juice, sprite, and crushed ice.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 2,
    tags: ["Party Favorite", "Tropical"]
  },
  {
    id: "wd_3",
    name: "Aam Panna (Raw Mango Cooler)",
    category: "WELCOME DRINKS",
    menuType: "normal",
    description: "Traditional roasted raw mango nectar blended with roasted cumin, rock salt, mint, and black pepper.",
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 3,
    tags: ["Traditional", "Digestive", "Summer Special"]
  },
  {
    id: "wd_4",
    name: "Royal Badam Kesar Milk",
    category: "WELCOME DRINKS",
    menuType: "premium",
    description: "Rich chilled whole milk infused with Kashmiri saffron strands, crushed almonds, cardamoms, and pistachios.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 4,
    tags: ["Royal Welcome", "Kesar", "Dry Fruits"]
  },
  {
    id: "wd_5",
    name: "Jaljeera Refreshment",
    category: "WELCOME DRINKS",
    menuType: "normal",
    description: "Zesty digestive drink prepared with stone-ground cumin, fresh coriander, tamarind, and boondi crunch.",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 5,
    tags: ["Digestive", "Refreshing"]
  },
  {
    id: "wd_6",
    name: "Fresh Lime Soda (Sweet & Salted)",
    category: "WELCOME DRINKS",
    menuType: "normal",
    description: "Freshly squeezed lemon juice with carbonated club soda, rock salt, and balanced cane sugar.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 6,
    tags: ["Classic", "Zero-Alcohol"]
  },

  // ==========================================
  // 2. SOUP
  // ==========================================
  {
    id: "sp_1",
    name: "Sweet Corn Veg Soup",
    category: "SOUP",
    menuType: "normal",
    description: "Velvety broth of crushed golden corn kernels, diced celery, spring carrots, and white pepper.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 7,
    tags: ["Comforting", "Mild"]
  },
  {
    id: "sp_2",
    name: "Hot & Sour Chicken Soup",
    category: "SOUP",
    menuType: "deluxe",
    description: "Spicy and tangy Chinese style dark broth loaded with shredded chicken, black mushrooms, bamboo shoots, and egg ribbons.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isAvailable: true,
    sortOrder: 8,
    tags: ["Spicy", "Chef's Special"]
  },
  {
    id: "sp_3",
    name: "Tomato Dhaniya Shorba",
    category: "SOUP",
    menuType: "normal",
    description: "Slow-simmered vine-ripened plum tomatoes infused with roasted cumin, ginger juliennes, and fresh green coriander roots.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 9,
    tags: ["Desi Shorba", "Aromatic"]
  },
  {
    id: "sp_4",
    name: "Veg Manchow Soup with Crispy Noodles",
    category: "SOUP",
    menuType: "deluxe",
    description: "Spiced garlic, ginger, and soy broth filled with chopped vegetables and served with crunchy fried noodles.",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 10,
    tags: ["Indo-Chinese", "Crunchy"]
  },

  // ==========================================
  // 3. COUNTER STARTER
  // ==========================================
  {
    id: "cs_1",
    name: "Live Puchka / Pani Puri Counter",
    category: "COUNTER STARTER",
    menuType: "deluxe",
    description: "Crisp puffed semolina puris served live with spiced potato filling, zesty mint-coriander spicy water, and sweet tamarind sonth.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 11,
    tags: ["Live Counter", "Crowd Favorite", "Street Style"]
  },
  {
    id: "cs_2",
    name: "Live Dahi Vada Aloo Dum Counter",
    category: "COUNTER STARTER",
    menuType: "deluxe",
    description: "Authentic Cuttack style soft urad dal vadas immersed in spiced thin yogurt, topped with fiery slow-cooked Aloo Dum, sev, and chutney.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 12,
    tags: ["Cuttack Special", "Iconic Odia", "Live Stall"]
  },
  {
    id: "cs_3",
    name: "Live Papdi Chaat & Samosa Chaat",
    category: "COUNTER STARTER",
    menuType: "deluxe",
    description: "Crispy fried flour crackers and crushed samosas layered with spiced chickpeas, sweet curd, pomegranate pearls, and nylon sev.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 13,
    tags: ["Live Chaat", "Tangy"]
  },
  {
    id: "cs_4",
    name: "Crispy Baby Corn Salt & Pepper",
    category: "COUNTER STARTER",
    menuType: "normal",
    description: "Crunchy golden fried tender baby corn wok-tossed with scallions, crushed black pepper, garlic, and sea salt.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 14,
    tags: ["Crispy", "Finger Food"]
  },
  {
    id: "cs_5",
    name: "Golden Veg Spring Rolls",
    category: "COUNTER STARTER",
    menuType: "normal",
    description: "Crisp hand-rolled pastry filled with finely shredded stir-fried cabbage, carrots, bell peppers, served with sweet chili dip.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 15,
    tags: ["Hot & Crispy"]
  },
  {
    id: "cs_6",
    name: "Chicken Reshmi Kebab (Live Charcoal)",
    category: "COUNTER STARTER",
    menuType: "premium",
    description: "Silky boneless chicken tenders marinated in cashew paste, fresh cream, white pepper, and grilled live over hot charcoal.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 16,
    tags: ["Live Grill", "Melt In Mouth", "Royal Kebab"]
  },

  // ==========================================
  // 4. STARTER - VEG
  // ==========================================
  {
    id: "sv_1",
    name: "Tandoori Paneer Tikka",
    category: "STARTER - VEG",
    menuType: "deluxe",
    description: "Plump cubes of fresh malai paneer marinated in hung curd, Kashmiri deghi mirch, mustard oil, and charred in clay oven with bell peppers.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 17,
    tags: ["Tandoor Special", "Chef's Recommendation"]
  },
  {
    id: "sv_2",
    name: "Crispy Hara Bhara Kebab",
    category: "STARTER - VEG",
    menuType: "normal",
    description: "Pan-grilled patties crafted from blanched spinach, sweet green peas, mashed potatoes, and crushed cottage cheese.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 18,
    tags: ["Nutritious", "Melt-In-Mouth"]
  },
  {
    id: "sv_3",
    name: "Malai Paneer Pakoda",
    category: "STARTER - VEG",
    menuType: "normal",
    description: "Fresh cottage cheese sandwich stuffed with mint chutney, dipped in spiced ajwain gram flour batter and fried golden.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 19,
    tags: ["Rainy Day Classic", "Crunchy"]
  },
  {
    id: "sv_4",
    name: "Crispy Fried Corn Basket",
    category: "STARTER - VEG",
    menuType: "normal",
    description: "Sweet American corn kernels coated in seasoned rice flour, flash-fried and dusted with roasted cumin and tangy chaat masala.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 20,
    tags: ["Sweet & Savory", "Snack Favorite"]
  },
  {
    id: "sv_5",
    name: "Kurkuri Bhindi",
    category: "STARTER - VEG",
    menuType: "deluxe",
    description: "Thinly julienned ladyfingers dusted with roasted chickpea flour, mango powder, and carom seeds, crisped to perfection.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 21,
    tags: ["Extra Crispy", "Traditional Spices"]
  },

  // ==========================================
  // 5. STARTER - NON-VEG
  // ==========================================
  {
    id: "snv_1",
    name: "Amritsari Fish Fry",
    category: "STARTER - NON-VEG",
    menuType: "deluxe",
    description: "Crispy river fish fillets marinated with crushed ajwain (carom), ginger-garlic, gram flour, and deep fried with green chutney dip.",
    image: "https://images.unsplash.com/photo-1535400255456-984241443b29?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 22,
    tags: ["Signature Starter", "River Fish", "Crispy"]
  },
  {
    id: "snv_2",
    name: "Tandoori Chicken Roast",
    category: "STARTER - NON-VEG",
    menuType: "deluxe",
    description: "Tender chicken on the bone marinated in spiced thick curd, mustard oil, crushed fenugreek leaves, and charred in the charcoal tandoor.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isAvailable: true,
    sortOrder: 23,
    tags: ["Tandoor Masterpiece", "Juicy"]
  },
  {
    id: "snv_3",
    name: "Chicken Seekh Kebab",
    category: "STARTER - NON-VEG",
    menuType: "deluxe",
    description: "Finely minced chicken spiced with green chillies, mint, garam masala, skewered and slow roasted over live coals.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 24,
    tags: ["Charcoal Grilled", "Fragrant"]
  },
  {
    id: "snv_4",
    name: "Crispy Golden Prawns Fry",
    category: "STARTER - NON-VEG",
    menuType: "premium",
    description: "Jumbo coastal prawns marinated with crushed black pepper, garlic paste, rolled in golden crumbs and fried crisp.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 25,
    tags: ["Coastal Delicacy", "Crunchy Seafood"]
  },
  {
    id: "snv_5",
    name: "Mutton Boti Kebab",
    category: "STARTER - NON-VEG",
    menuType: "premium",
    description: "Succulent boneless baby goat meat cubes marinated in papaya tenderizer and royal Mughlai spices, charred on skewers.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isAvailable: true,
    sortOrder: 26,
    tags: ["Chef's Special", "Royal Mutton"]
  },

  // ==========================================
  // 6. PANEER
  // ==========================================
  {
    id: "pan_1",
    name: "Paneer Butter Masala",
    category: "PANEER",
    menuType: "all",
    description: "Silky tomato and cashew makhani gravy enriched with pure cow butter, kasuri methi, and melt-in-mouth cubes of fresh malai paneer.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 27,
    tags: ["Top Seller", "Rich Makhani"]
  },
  {
    id: "pan_2",
    name: "Kadai Paneer",
    category: "PANEER",
    menuType: "normal",
    description: "Diced cottage cheese sautéed with crisp green bell peppers, onions, and freshly pounded roasted coriander-fennel kadai masala.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 28,
    tags: ["Robust Flavors", "Semi-Dry"]
  },
  {
    id: "pan_3",
    name: "Shahi Paneer",
    category: "PANEER",
    menuType: "deluxe",
    description: "Royal white gravy crafted from blanched cashews, khoya, melon seeds, scented with green cardamom and sweet saffron essence.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 29,
    tags: ["Mughlai Royalty", "Sweet & Savory"]
  },
  {
    id: "pan_4",
    name: "Matar Paneer",
    category: "PANEER",
    menuType: "normal",
    description: "Homestyle celebration classic of tender green peas and soft paneer simmered in aromatic onion, tomato, and cumin gravy.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 30,
    tags: ["Classic Comfort"]
  },
  {
    id: "pan_5",
    name: "Paneer Lababdar",
    category: "PANEER",
    menuType: "premium",
    description: "Extravagant gravy with grated cottage cheese folded into velvety onion-tomato sauce alongside chunky paneer diamonds.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 31,
    tags: ["Luxury Preparation", "Creamy"]
  },

  // ==========================================
  // 7. FISH
  // ==========================================
  {
    id: "fish_1",
    name: "Machha Besara (Traditional Mustard Fish)",
    category: "FISH",
    menuType: "all",
    description: "Fresh Mahanadi river Rohu steaks cooked in authentic Odia stone-ground yellow mustard paste, dried mango (Ambula), garlic, and fried badi.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 32,
    tags: ["Signature Odia", "Mustard Infused", "Heritage"]
  },
  {
    id: "fish_2",
    name: "Bengali / Odia Machha Tarkari",
    category: "FISH",
    menuType: "normal",
    description: "Homestyle celebration fish curry with light golden gravy, fried potatoes, pointed gourd (potol), and warm whole spices.",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 33,
    tags: ["Comforting", "Light Gravy"]
  },
  {
    id: "fish_3",
    name: "Fish Kalia (Royal Feast Curry)",
    category: "FISH",
    menuType: "deluxe",
    description: "Rich, aromatic, deep-red fish gravy cooked with slow-browned onions, ginger paste, yogurt, and whole black cardamom.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isAvailable: true,
    sortOrder: 34,
    tags: ["Wedding Banquet", "Rich Gravy"]
  },
  {
    id: "fish_4",
    name: "Katla Machha Kasa",
    category: "FISH",
    menuType: "deluxe",
    description: "Thick, spicy, dry-roasted curry of fresh Katla fish cooked in mustard oil with onions, garlic cloves, and hand-ground garam masala.",
    image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 35,
    tags: ["Spicy Kasa", "Katla Special"]
  },

  // ==========================================
  // 8. PRAWN
  // ==========================================
  {
    id: "pr_1",
    name: "Chingudi Jhola (Odia Prawn Curry)",
    category: "PRAWN",
    menuType: "deluxe",
    description: "Coastal fresh Chilika prawns cooked with soft potatoes in a spicy, aromatic cumin and ginger-garlic broth.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 36,
    tags: ["Chilika Prawns", "Authentic Odia"]
  },
  {
    id: "pr_2",
    name: "Prawn Malai Curry",
    category: "PRAWN",
    menuType: "premium",
    description: "Jumbo fresh prawns gently poached in freshly squeezed thick coconut milk, seasoned with cinnamon bark and green cardamom.",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 37,
    tags: ["Coconut Cream", "Royal Feast", "Mild & Aromatic"]
  },
  {
    id: "pr_3",
    name: "Spicy Prawn Masala",
    category: "PRAWN",
    menuType: "deluxe",
    description: "Plump prawns stir-fried in cast iron kadai with caramelized onions, fresh tomatoes, curry leaves, and crushed red chilies.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 38,
    tags: ["Spicy", "Semi-Dry Masala"]
  },

  // ==========================================
  // 9. CHICKEN
  // ==========================================
  {
    id: "chk_1",
    name: "Traditional Chicken Curry",
    category: "CHICKEN",
    menuType: "normal",
    description: "Classic celebration chicken curry cooked with mustard oil, golden fried potato wedges, whole spices, and coriander.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 39,
    tags: ["Feast Staple", "Homestyle Gravy"]
  },
  {
    id: "chk_2",
    name: "Chicken Masala",
    category: "CHICKEN",
    menuType: "normal",
    description: "Juicy chicken cuts cooked in a robust, thick brown onion-tomato masala flavored with roasted cloves and coriander seeds.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 40,
    tags: ["Thick Gravy", "Medium Spice"]
  },
  {
    id: "chk_3",
    name: "Chicken Dopyaza",
    category: "CHICKEN",
    menuType: "deluxe",
    description: "Succulent chicken braised with a two-stage infusion of caramelized onions and crunchy sautéed pearl onions.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 41,
    tags: ["Mughlai Classic", "Onion Rich"]
  },
  {
    id: "chk_4",
    name: "Chicken Hyderabadi",
    category: "CHICKEN",
    menuType: "deluxe",
    description: "Rich, aromatic green herb chicken curry prepared with fresh mint, coriander leaves, roasted poppy seeds, and desiccated coconut.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isAvailable: true,
    sortOrder: 42,
    tags: ["Green Herb Gravy", "Nawabi Style"]
  },
  {
    id: "chk_5",
    name: "Butter Chicken (Murgh Makhani)",
    category: "CHICKEN",
    menuType: "deluxe",
    description: "Smoky tandoori boneless chicken tikka simmered gently in a velvety, buttery satin-smooth tomato cashew gravy with kasuri methi.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 43,
    tags: ["All-Time Favorite", "Creamy Makhani"]
  },
  {
    id: "chk_6",
    name: "Odia Chicken Kasa",
    category: "CHICKEN",
    menuType: "deluxe",
    description: "Slow-roasted chicken in an iron kadai with dark browned onion masala, garlic cloves, and freshly crushed garam masala.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 44,
    tags: ["Authentic Kasa", "Spicy"]
  },

  // ==========================================
  // 10. MUTTON
  // ==========================================
  {
    id: "mut_1",
    name: "Odia Mutton Kasa",
    category: "MUTTON",
    menuType: "deluxe",
    description: "Legendary slow-cooked fresh goat meat browned in pure mustard oil with whole bay leaves, garlic pods, and dark caramelized gravy.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 45,
    tags: ["Crown Jewel of Odisha", "Slow Cooked", "Handi Preparation"]
  },
  {
    id: "mut_2",
    name: "Mutton Rogan Josh",
    category: "MUTTON",
    menuType: "premium",
    description: "Regal Kashmiri delicacy prepared with slow-braised mutton shanks, fragrant fennel seed powder, ginger, and natural ratan jot crimson hue.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 46,
    tags: ["Kashmiri Royal", "Aromatic"]
  },
  {
    id: "mut_3",
    name: "Traditional Feast Mutton Curry",
    category: "MUTTON",
    menuType: "deluxe",
    description: "Classic wedding banquet goat curry served with soft large fried potatoes, rich spiced red oil gravy, and fresh cilantro.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 47,
    tags: ["Wedding Banquet", "Traditional Feast"]
  },
  {
    id: "mut_4",
    name: "Mutton Dalcha",
    category: "MUTTON",
    menuType: "premium",
    description: "Slow-stewed tender mutton cubes combined with chana dal, bottle gourd, tamarind pulp, and aromatic curry spices.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 48,
    tags: ["Biryani Accompaniment", "Tangy Lentil"]
  },

  // ==========================================
  // 11. EGG
  // ==========================================
  {
    id: "egg_1",
    name: "Golden Fried Egg Curry",
    category: "EGG",
    menuType: "normal",
    description: "Farm-fresh hard-boiled eggs pan-fried with turmeric and salt, simmered in a spiced onion, tomato, and cumin gravy.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 49,
    tags: ["Comfort Classic"]
  },
  {
    id: "egg_2",
    name: "Spicy Egg Masala",
    category: "EGG",
    menuType: "normal",
    description: "Golden eggs slit and braised in a thick roasted onion gravy with diced green bell peppers and garam masala.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 50,
    tags: ["Thick Masala"]
  },
  {
    id: "egg_3",
    name: "Egg Dopyaza",
    category: "EGG",
    menuType: "deluxe",
    description: "Boiled and browned eggs cooked with an abundance of caramelized and sautéed pearl onions and whole coriander.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isAvailable: true,
    sortOrder: 51,
    tags: ["Double Onion"]
  },

  // ==========================================
  // 12. ROTI / NAN / PURI
  // ==========================================
  {
    id: "rot_1",
    name: "Butter Naan",
    category: "ROTI / NAN / PURI",
    menuType: "all",
    description: "Pillowy refined wheat flatbread baked inside our live clay tandoor and brushed generously with salted butter.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 52,
    tags: ["Tandoor Fresh", "Staple"]
  },
  {
    id: "rot_2",
    name: "Tandoori Roti with Butter",
    category: "ROTI / NAN / PURI",
    menuType: "all",
    description: "Traditional whole-wheat crisp flatbread slapped on the walls of the live clay tandoor and topped with pure cow ghee.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 53,
    tags: ["Whole Wheat", "Live Tandoor"]
  },
  {
    id: "rot_3",
    name: "Flaky Laccha Paratha",
    category: "ROTI / NAN / PURI",
    menuType: "deluxe",
    description: "Multi-layered flaky spiral whole-wheat flatbread cooked golden brown on a hot griddle with clarified butter.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 54,
    tags: ["Flaky Layers", "Desi Ghee"]
  },
  {
    id: "rot_4",
    name: "Odia Luchi / Puri (Piped Hot)",
    category: "ROTI / NAN / PURI",
    menuType: "normal",
    description: "Puffed, golden-white, deep-fried bread made with seasoned wheat and ghee, fried live in pure groundnut oil.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 55,
    tags: ["Festive Odia", "Hot & Puffed"]
  },
  {
    id: "rot_5",
    name: "Garlic Butter Naan",
    category: "ROTI / NAN / PURI",
    menuType: "premium",
    description: "Tandoori naan topped with roasted minced garlic, fresh coriander leaves, and glazed with melted butter.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 56,
    tags: ["Garlic Aroma", "Gourmet"]
  },
  {
    id: "rot_6",
    name: "Rumali Roti",
    category: "ROTI / NAN / PURI",
    menuType: "deluxe",
    description: "Paper-thin, ultra-soft handkerchief flatbread expertly tossed in the air and cooked on an inverted hemispherical tawa.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 57,
    tags: ["Paper Thin", "Nawabi"]
  },

  // ==========================================
  // 13. RICE / PULAO / BIRYANI
  // ==========================================
  {
    id: "rc_1",
    name: "Royal Chicken Dum Biryani",
    category: "RICE / PULAO / BIRYANI",
    menuType: "deluxe",
    description: "Aged long-grain basmati rice sealed in copper handis with succulent marinated chicken, saffron milk, fried onions, and kewra.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 58,
    tags: ["Dum Handi", "Aged Basmati", "Celebration King"]
  },
  {
    id: "rc_2",
    name: "Royal Mutton Dum Biryani",
    category: "RICE / PULAO / BIRYANI",
    menuType: "premium",
    description: "Slow-cooked layers of fragrant basmati rice and tender baby goat meat infused with star anise, cardamom, and saffron ghee.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 59,
    tags: ["Gourmet Banquet", "Chef's Special"]
  },
  {
    id: "rc_3",
    name: "Kashmiri Shahi Veg Pulao",
    category: "RICE / PULAO / BIRYANI",
    menuType: "normal",
    description: "Long grain basmati rice sautéed in pure ghee with green peas, diced carrots, fried cashews, and golden sultanas.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 60,
    tags: ["Aromatic Pulao", "Mild"]
  },
  {
    id: "rc_4",
    name: "Jeera Rice (Desi Ghee)",
    category: "RICE / PULAO / BIRYANI",
    menuType: "normal",
    description: "Fluffy basmati rice tempered with cracked royal cumin seeds, whole cloves, and clarified cow butter.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 61,
    tags: ["Classic Staple"]
  },
  {
    id: "rc_5",
    name: "Kanika (Sweet Fragrant Odia Rice)",
    category: "RICE / PULAO / BIRYANI",
    menuType: "deluxe",
    description: "Traditional sweet aromatic rice prepared with pure cow ghee, cloves, cinnamon, bay leaves, turmeric, and fried cashew nuts.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 62,
    tags: ["Temple Heritage", "Sweet Feast Rice"]
  },
  {
    id: "rc_6",
    name: "Steamed Aromatic Basmati Rice",
    category: "RICE / PULAO / BIRYANI",
    menuType: "normal",
    description: "Light, long-grain, separate steamed white basmati rice, perfect with dal and curries.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 63,
    tags: ["Staple Base"]
  },

  // ==========================================
  // 14. DAL
  // ==========================================
  {
    id: "dal_1",
    name: "Dal Makhani (Slow Charcoal Simmered)",
    category: "DAL",
    menuType: "deluxe",
    description: "Black urad lentils and red kidney beans slow-simmered over live charcoal for 16 hours, enriched with cream and white butter.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 64,
    tags: ["Overnight Simmered", "Creamy Dal"]
  },
  {
    id: "dal_2",
    name: "Dal Tadka Desi Ghee",
    category: "DAL",
    menuType: "normal",
    description: "Yellow toor lentils tempered with pure cow ghee, crunchy garlic bits, dry whole red chillies, and fresh green coriander.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 65,
    tags: ["Comfort Classic", "Aromatic Tempering"]
  },
  {
    id: "dal_3",
    name: "Authentic Odia Dalma",
    category: "DAL",
    menuType: "all",
    description: "Wholesome toor lentil preparation cooked with seasonal raw banana, pumpkin, eggplant, tomatoes, tempered with panch phoron & roasted cumin-chilli powder.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 66,
    tags: ["Temple Specialty", "Nutritious", "Authentic Odia"]
  },
  {
    id: "dal_4",
    name: "Dal Fry Dhaba Style",
    category: "DAL",
    menuType: "normal",
    description: "Creamy cooked lentils sautéed in an iron wok with finely chopped onions, tomatoes, ginger, and aromatic garam masala.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 67,
    tags: ["Dhaba Flavor"]
  },

  // ==========================================
  // 15. CHUTNEY & RAITA
  // ==========================================
  {
    id: "cht_1",
    name: "Ouu Khatta (Elephant Apple Chutney)",
    category: "CHUTNEY & RAITA",
    menuType: "deluxe",
    description: "Celebrated sweet and tangy Odia chutney prepared with tender elephant apple slices, jaggery, mustard seeds, and curry leaves.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 68,
    tags: ["Odisha Treasure", "Sweet & Tangy"]
  },
  {
    id: "cht_2",
    name: "Sweet Tomato Khajur Chutney",
    category: "CHUTNEY & RAITA",
    menuType: "normal",
    description: "Thick caramelized tomato chutney cooked with dates, ginger slivers, raisins, and aromatic panch phoron.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 69,
    tags: ["Wedding Essential", "Dates & Raisins"]
  },
  {
    id: "cht_3",
    name: "Mix Vegetable Boondi Raita",
    category: "CHUTNEY & RAITA",
    menuType: "normal",
    description: "Chilled whipped artisanal curd blended with crisp fried chickpea pearls, diced cucumber, tomatoes, and roasted cumin powder.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 70,
    tags: ["Cooling", "Crispy Pearls"]
  },
  {
    id: "cht_4",
    name: "Pineapple Raita",
    category: "CHUTNEY & RAITA",
    menuType: "deluxe",
    description: "Sweet, juicy diced pineapple chunks folded into sweetened curd with black salt, roasted cumin, and mint.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 71,
    tags: ["Fruity & Chilled"]
  },

  // ==========================================
  // 16. VEGETABLE
  // ==========================================
  {
    id: "veg_1",
    name: "Mix Vegetable Handi",
    category: "VEGETABLE",
    menuType: "normal",
    description: "Medley of seasonal carrots, green beans, cauliflower, green peas, and paneer cubes cooked in a rich onion-tomato gravy.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 72,
    tags: ["Buffet Classic"]
  },
  {
    id: "veg_2",
    name: "Malai Kofta (Makhani Gravy)",
    category: "VEGETABLE",
    menuType: "deluxe",
    description: "Golden fried dumplings of cottage cheese and potatoes stuffed with mawa and dry fruits, resting in satin smooth cashew gravy.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 73,
    tags: ["Royal Veg", "Melt in Mouth"]
  },
  {
    id: "veg_3",
    name: "Aloo Gobi Roast",
    category: "VEGETABLE",
    menuType: "normal",
    description: "Crispy fried cauliflower florets and potatoes dry roasted with ginger juliennes, green chillies, and fragrant roasted spices.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 74,
    tags: ["Dry Veg", "Traditional"]
  },
  {
    id: "veg_4",
    name: "Navratan Korma",
    category: "VEGETABLE",
    menuType: "premium",
    description: "Nine jewels of vegetables, fruits, dry nuts, and cottage cheese cooked in a rich, sweet, and mild royal cashew cream sauce.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 75,
    tags: ["Imperial Mughal", "Rich & Mild"]
  },
  {
    id: "veg_5",
    name: "Potola Rasa (Pointed Gourd Delicacy)",
    category: "VEGETABLE",
    menuType: "deluxe",
    description: "Fried pointed gourd (potol) cooked in a thick gravy of freshly grated coconut, cashews, and aromatic spices.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 76,
    tags: ["Heritage Odia", "Coconut Gravy"]
  },

  // ==========================================
  // 17. MUSHROOM
  // ==========================================
  {
    id: "msh_1",
    name: "Mushroom Masala",
    category: "MUSHROOM",
    menuType: "normal",
    description: "Plump button mushrooms sautéed in a spicy brown onion and tomato masala with bell peppers.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 77,
    tags: ["Earthly Flavor", "Vegetarian Special"]
  },
  {
    id: "msh_2",
    name: "Kadai Mushroom",
    category: "MUSHROOM",
    menuType: "deluxe",
    description: "Fresh button mushrooms tossed with diced capsicum, onions, and freshly ground roasted kadai spices.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 78,
    tags: ["Kadai Special"]
  },
  {
    id: "msh_3",
    name: "Mushroom Kasa",
    category: "MUSHROOM",
    menuType: "deluxe",
    description: "Slow-roasted mushrooms in an iron kadai with dark caramelized onion paste and aromatic Odia spices.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 79,
    tags: ["Odia Style Kasa"]
  },

  // ==========================================
  // 18. AAMISHA / NON-VEG
  // ==========================================
  {
    id: "am_1",
    name: "Odia Freshwater Crab Kalia",
    category: "AAMISHA / NON-VEG",
    menuType: "premium",
    description: "Fresh coastal crab cooked whole in fiery, thick mustard-garlic gravy with caramelized onions and whole spices.",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 80,
    tags: ["Seafood Specialty", "Fiery Odia"]
  },
  {
    id: "am_2",
    name: "Rohu Fish Besara with Badi",
    category: "AAMISHA / NON-VEG",
    menuType: "deluxe",
    description: "Golden fried Rohu steaks and sun-dried lentil badis simmered in stone-ground mustard paste with green chillies.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 81,
    tags: ["Heritage Fish"]
  },
  {
    id: "am_3",
    name: "Shahi Chicken Chaap",
    category: "AAMISHA / NON-VEG",
    menuType: "premium",
    description: "Slow-braised chicken whole leg cooked in royal cashew-poppy seed gravy infused with rose water, kewra, and mace.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    isVeg: false,
    isPopular: true,
    isAvailable: true,
    sortOrder: 82,
    tags: ["Nawabi Chaap", "Mughlai Gravy"]
  },

  // ==========================================
  // 19. ODISSY SPECIAL
  // ==========================================
  {
    id: "odi_1",
    name: "Chhena Poda (Royal Baked Cheese)",
    category: "ODISSY SPECIAL",
    menuType: "all",
    description: "Odisha's crowning dessert jewel—fresh homemade chhena kneaded with sugar, cardamom, and cashews, slow-baked in sal leaves until caramelized.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 83,
    tags: ["Pride of Odisha", "Caramelized", "Heritage Sweet"]
  },
  {
    id: "odi_2",
    name: "Royal Pakhala Platter",
    category: "ODISSY SPECIAL",
    menuType: "deluxe",
    description: "Traditional fermented cooling rice seasoned with curd, roasted cumin, mint, served alongside Saga Bhaja, Badi Chura, and crispy Aloo Bhaja.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 84,
    tags: ["Iconic Pakhala", "Summer Feast", "Authentic Sides"]
  },
  {
    id: "odi_3",
    name: "Chhena Jhili (Nimapada Specialty)",
    category: "ODISSY SPECIAL",
    menuType: "deluxe",
    description: "Famous Nimapada sweet made of fresh fried cottage cheese spirals gently soaked in light cardamom sugar syrup.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 85,
    tags: ["Nimapada Special", "Fresh Chhena"]
  },
  {
    id: "odi_4",
    name: "Puri Jagannath Style Khaja",
    category: "ODISSY SPECIAL",
    menuType: "all",
    description: "Layered crispy wheat pastries deep fried in ghee and dipped in clear sugar syrup, light, airy, and delicately crunchy.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 86,
    tags: ["Puri Mahaprasad", "Flaky"]
  },
  {
    id: "odi_5",
    name: "Dahi Baingan",
    category: "ODISSY SPECIAL",
    menuType: "normal",
    description: "Golden fried eggplant pieces submerged in tempered sweetened sour curd, mustard seeds, and fresh curry leaves.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 87,
    tags: ["Curd Eggplant", "Temple Flavors"]
  },

  // ==========================================
  // 20. SADDA / VEG
  // ==========================================
  {
    id: "sad_1",
    name: "Saga Bhaja with Badi Chura",
    category: "SADDA / VEG",
    menuType: "normal",
    description: "Seasonal green leafy vegetables wok-tossed with crushed garlic, green chillies, and crisp crumbled urad dal badi.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 88,
    tags: ["Healthy & Crisp", "Traditional Greens"]
  },
  {
    id: "sad_2",
    name: "Badi Chura",
    category: "SADDA / VEG",
    menuType: "normal",
    description: "Crushed sun-dried black gram dumplings mixed with raw mustard oil, chopped onions, garlic cloves, and spicy green chillies.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 89,
    tags: ["Mustard Punch", "Classic Side"]
  },
  {
    id: "sad_3",
    name: "Crispy Aloo Bhaja",
    category: "SADDA / VEG",
    menuType: "normal",
    description: "Matchstick julienned potatoes fried crisp in mustard oil with mild turmeric, salt, and slitted green chillies.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 90,
    tags: ["Matchstick Fries", "Crispy"]
  },
  {
    id: "sad_4",
    name: "Odia Santula",
    category: "SADDA / VEG",
    menuType: "normal",
    description: "Wholesome steamed medley of raw papaya, potato, string beans, and pumpkin tempered with garlic and panch phoron.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isAvailable: true,
    sortOrder: 91,
    tags: ["Zero Spice", "Digestive Delight"]
  },

  // ==========================================
  // 21. CONTINENTAL
  // ==========================================
  {
    id: "cnt_1",
    name: "Vegetable Au Gratin",
    category: "CONTINENTAL",
    menuType: "deluxe",
    description: "Fresh broccoli, baby corn, carrots, and sweet peas baked in rich béchamel white sauce under a bubbling melted mozzarella crust.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 92,
    tags: ["Cheesy Bake", "Continental"]
  },
  {
    id: "cnt_2",
    name: "Penne Pasta in Creamy Alfredo Sauce",
    category: "CONTINENTAL",
    menuType: "deluxe",
    description: "Al dente penne pasta tossed in garlic parmesan cream with sweet bell peppers, pitted olives, and fresh Italian herbs.",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 93,
    tags: ["Live Pasta", "Kids' Favorite"]
  },
  {
    id: "cnt_3",
    name: "Herb Roasted Baby Potatoes",
    category: "CONTINENTAL",
    menuType: "premium",
    description: "Crispy baby potatoes roasted with rosemary, cracked black pepper, extra virgin olive oil, and sea salt crystals.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 94,
    tags: ["Rosemary Herb", "European"]
  },

  // ==========================================
  // 22. SWEET DESSERT
  // ==========================================
  {
    id: "sw_1",
    name: "Hot Gulab Jamun with Rabdi",
    category: "SWEET DESSERT",
    menuType: "all",
    description: "Golden fried khoya dumplings soaked in fragrant rose-cardamom syrup, served hot with chilled creamy reduced milk rabdi.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 95,
    tags: ["Hot & Cold", "Crowd Pleaser", "Banquet Classic"]
  },
  {
    id: "sw_2",
    name: "Kesari Rasmalai",
    category: "SWEET DESSERT",
    menuType: "deluxe",
    description: "Delicate melt-in-mouth cottage cheese discs soaked in saffron-infused thickened milk, garnished with Iranian pistachio flakes.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 96,
    tags: ["Saffron Milk", "Royal Sweet"]
  },
  {
    id: "sw_3",
    name: "Pahala Style Hot Rasagola",
    category: "SWEET DESSERT",
    menuType: "deluxe",
    description: "Authentic caramel-tinted tender cottage cheese dumplings served steaming hot in light cardamom syrup from Pahala.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isOdiaSpecialty: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 97,
    tags: ["GI Tagged", "Pahala Heritage", "Steaming Hot"]
  },
  {
    id: "sw_4",
    name: "Rice Kheer / Payas",
    category: "SWEET DESSERT",
    menuType: "normal",
    description: "Slow-simmered fragrant Govindobhog rice cooked with whole milk, crushed green cardamoms, fried cashews, and raisins.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 98,
    tags: ["Festive Payas", "Traditional"]
  },
  {
    id: "sw_5",
    name: "Royal Shahi Tukda",
    category: "SWEET DESSERT",
    menuType: "deluxe",
    description: "Ghee-crisped bread soaked in saffron syrup, smothered with thickened rabdi, and finished with pure edible silver vark.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 99,
    tags: ["Mughlai Royalty", "Rich Rabdi"]
  },
  {
    id: "sw_6",
    name: "Kesar Pista Kulfi",
    category: "SWEET DESSERT",
    menuType: "premium",
    description: "Traditional slow-reduced frozen milk dessert scented with saffron, pistachios, and green cardamoms served on wooden sticks.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 100,
    tags: ["Matka Kulfi", "Summer Delight"]
  },

  // ==========================================
  // 23. PLATE COUNTER
  // ==========================================
  {
    id: "plt_1",
    name: "Premium Ceramic Plate & Cutlery Setup",
    category: "PLATE COUNTER",
    menuType: "all",
    description: "Sanitized bone-china dinnerware, heavy gauge stainless steel cutlery, paper napkins, and polished glass tumblers.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 101,
    tags: ["Hygiene Certified", "5-Star Setup"]
  },
  {
    id: "plt_2",
    name: "Silver-Plated Royal Thali Setup",
    category: "PLATE COUNTER",
    menuType: "premium",
    description: "Exclusive royal brass and silver-plated thalis with individual katoris, dessert bowls, and engraved water goblets.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 102,
    tags: ["Royal Presentation", "VIP Guests"]
  },

  // ==========================================
  // 24. WATER BOTTLE
  // ==========================================
  {
    id: "wb_1",
    name: "Packaged Mineral Water Counter",
    category: "WATER BOTTLE",
    menuType: "all",
    description: "FSSAI certified chilled and room-temperature 250ml & 500ml sealed mineral water bottles with sanitized disposal bins.",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 103,
    tags: ["Packaged Mineral Water", "Sanitized"]
  },
  {
    id: "wb_2",
    name: "Infused Detox Water Station",
    category: "WATER BOTTLE",
    menuType: "premium",
    description: "Artisanal glass beverage dispensers with cucumber-mint, lemon-basil, and strawberry-orange infused alkaline water.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 104,
    tags: ["Detox Station", "Glass Dispensers"]
  },

  // ==========================================
  // 25. PAAN COUNTER
  // ==========================================
  {
    id: "pan_cnt_1",
    name: "Live Banarasi Meetha Paan Counter",
    category: "PAAN COUNTER",
    menuType: "deluxe",
    description: "Tender betel leaves filled with aromatic gulkand, sweet fennel, tutti-frutti, menthol, dates, and silver foil.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    sortOrder: 105,
    tags: ["Mouth Freshener", "Traditional Banarasi"]
  },
  {
    id: "pan_cnt_2",
    name: "Live Royal Fire Paan & Chocolate Paan",
    category: "PAAN COUNTER",
    menuType: "premium",
    description: "Theatrical live flaming clove-spiced paan and Belgian dark chocolate coated paans with saffron filling.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 106,
    tags: ["Theatrical Live", "Novelty Paan", "VIP Counter"]
  },

  // ==========================================
  // 26. FRUIT DESIGN CUTTING
  // ==========================================
  {
    id: "frt_1",
    name: "Artistic Tropical Fruit Carving Display",
    category: "FRUIT DESIGN CUTTING",
    menuType: "premium",
    description: "Master fruit artisans carving wedding emblems in watermelons, pineapple birds, melon baskets, kiwi spirals, and dragon fruit roses.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isPopular: true,
    isFeatured: true,
    isAvailable: true,
    sortOrder: 107,
    tags: ["Artisanal Carving", "Decorative Display", "Centerpiece"]
  },
  {
    id: "frt_2",
    name: "Exotic Seasonal Chilled Fruit Bar",
    category: "FRUIT DESIGN CUTTING",
    menuType: "deluxe",
    description: "Chilled fresh skewers of imported seedless grapes, Washington apples, Thai guava with chaat masala, and Valencia oranges.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    isVeg: true,
    isAvailable: true,
    sortOrder: 108,
    tags: ["Chilled Fruit Bar", "Health & Freshness"]
  }
];
