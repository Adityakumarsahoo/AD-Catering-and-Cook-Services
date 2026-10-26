// backend/src/data/officialVegMenu.ts

export interface OfficialVegItem {
  id: string;
  orderNumber: number;
  name: string;
  category: string;
  categoryNumber: number;
  categoryHeading: string;
  description: string;
  image: string;
  isVeg: boolean;
  serving: string;
  tags: string[];
  price?: number;
  isPopular?: boolean;
  isFeatured?: boolean;
}

export const officialVegMenu: OfficialVegItem[] = [
  {
    "id": "veg_1",
    "orderNumber": 1,
    "name": "Milk Shake (Badam / Mango / Pineapple / Vanilla)",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Rich and velvety chilled gourmet milkshake blended with premium dairy cream and authentic Badam, Mango, Pineapple, or Madagascar Vanilla, served in a tall glass with crushed nuts.",
    "image": "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Tall Glass (300ml)",
    "tags": [
      "Velvety Milkshake",
      "Almonds & Fruit",
      "Kids & Family Favorite"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_2",
    "orderNumber": 2,
    "name": "Hot Badam Milk",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Traditional comforting hot milk slow-simmered with crushed California almonds, aromatic Kashmiri saffron strands, green cardamom, and pure honey, served piping warm in gold-rimmed glassware.",
    "image": "/images/dishes/Badam_Milk_Drink.jpg",
    "isVeg": true,
    "serving": "1 Warm Glass (250ml)",
    "tags": [
      "Kashmiri Saffron",
      "Warm & Restorative",
      "Royal Indian Comfort"
    ],
    "isFeatured": true
  },
  {
    "id": "veg_3",
    "orderNumber": 3,
    "name": "Lassi (Sweet)",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Thick, creamy, slow-churned Punjabi sweet curd lassi served in an authentic earthen terracotta kulhad, crowned with a rich layer of fresh malai clotted cream, slivered pistachios, and saffron.",
    "image": "/images/dishes/sweet-lassi.jpg",
    "isVeg": true,
    "serving": "1 Terracotta Kulhad (350ml)",
    "tags": [
      "Thick Malai Clotted Cream",
      "Hand-Churned Curd",
      "Traditional Kulhad"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_4",
    "orderNumber": 4,
    "name": "Chanch",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Refreshing traditional Indian spiced chaas (buttermilk) slow-churned with roasted cumin powder (bhuna jeera), pink rock salt, fresh mint leaves, green chilies, and fragrant coriander garnish.",
    "image": "/images/dishes/chanch-buttermilk.jpg",
    "isVeg": true,
    "serving": "1 Clay Glass (300ml)",
    "tags": [
      "Bhuna Jeera Tadka",
      "Digestive Cooler",
      "Traditional Buttermilk"
    ]
  },
  {
    "id": "veg_5",
    "orderNumber": 5,
    "name": "Fruit Punch",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Vibrant, celebratory blend of freshly pressed mango, sweet pineapple, orange, and pomegranate juices layered over crushed mountain ice with fresh citrus wheels and garden mint.",
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Chilled Highball Glass (300ml)",
    "tags": [
      "Tropical Blend",
      "Real Fruit Nectar",
      "Celebration Punch"
    ],
    "isPopular": true
  },
  {
    "id": "veg_6",
    "orderNumber": 6,
    "name": "Aam Panna",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Authentic royal summer cooler crafted from fire-roasted raw green mangoes, organic jaggery, black salt, and freshly roasted cumin, served ice-cold with fresh mint sprigs.",
    "image": "/images/dishes/aam-panna.jpg",
    "isVeg": true,
    "serving": "1 Chilled Tumbler (300ml)",
    "tags": [
      "Raw Green Mango",
      "Tangy & Refreshing",
      "Summer Heritage Special"
    ],
    "isFeatured": true
  },
  {
    "id": "veg_7",
    "orderNumber": 7,
    "name": "Thandai",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Opulent festive royal thandai cold milk drink infused with ground almonds, cashews, fennel seeds, melon seeds, green cardamom, and steeped saffron, adorned with fragrant dried rose petals.",
    "image": "/images/dishes/kesar-thandai.jpg",
    "isVeg": true,
    "serving": "1 Crystal Glass (300ml)",
    "tags": [
      "Royal Saffron Thandai",
      "Nut & Seed Infusion",
      "Festive Delicacy"
    ],
    "isFeatured": true
  },
  {
    "id": "veg_8",
    "orderNumber": 8,
    "name": "Falluda",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Decadent multi-layered royal Indian dessert beverage featuring aromatic Damask rose syrup, soaked cooling sabja (basil) seeds, delicate falooda sev noodles, chilled milk, and a scoop of rich kulfi ice cream.",
    "image": "/images/dishes/royal-falooda.jpg",
    "isVeg": true,
    "serving": "1 Sundae Parfait Glass (350ml)",
    "tags": [
      "Royal Rose Syrup",
      "Falooda Sev & Sabja",
      "Kulfi Ice Cream Crown"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_9",
    "orderNumber": 9,
    "name": "Jaljeera",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Crisp, invigorating northern Indian cooler made with freshly muddled mint, coriander, roasted cumin seeds, black pepper, dry mango powder, and crispy golden boondi droplets floating on top.",
    "image": "/images/dishes/spiced-jaljeera.jpg",
    "isVeg": true,
    "serving": "1 Frosted Glass (300ml)",
    "tags": [
      "Crispy Boondi Garnish",
      "Zesty Mint & Cumin",
      "Digestive Appetizer"
    ]
  },
  {
    "id": "veg_10",
    "orderNumber": 10,
    "name": "Lemon Cold Drinks",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Chilled sparkling fresh lemon soda prepared with freshly squeezed farm lemons, rock salt, crushed ice, and effervescent bubbles, garnished with fresh mint and citrus wheels.",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Tall Sparkler Glass (300ml)",
    "tags": [
      "Fresh Farm Lemon",
      "Sparkling Fizz",
      "Zesty & Crisp"
    ]
  },
  {
    "id": "veg_11",
    "orderNumber": 11,
    "name": "Cold Drinks",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Chilled premium carbonated soft drinks and sparkling colas served ice-cold in crystal glassware with clear ice cubes, condensation, and lime wedge.",
    "image": "/images/dishes/cold-drinks-soda.jpg",
    "isVeg": true,
    "serving": "1 Chilled Glass (300ml)",
    "tags": [
      "Ice-Cold Fizz",
      "Banquet Standard",
      "Refreshing Bubbles"
    ]
  },
  {
    "id": "veg_12",
    "orderNumber": 12,
    "name": "Masala Cold Drinks",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Spiced Indian banquet street-style cold soda with carbonated cola spiced with black salt, chaat masala, roasted cumin, and fresh lemon juice with a spice-dusted rim.",
    "image": "/images/dishes/masala-cold-drinks.jpg",
    "isVeg": true,
    "serving": "1 Spice-Rimmed Highball (300ml)",
    "tags": [
      "Desi Masala Fizz",
      "Chaat Spiced Rim",
      "Tangy & Effervescent"
    ]
  },
  {
    "id": "veg_13",
    "orderNumber": 13,
    "name": "Mocktail",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Exotic handcrafted non-alcoholic signature mocktail crafted with tropical fruit nectars, blue curaçao / grenadine layers, citrus zest, and botanical garnishes.",
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Signature Cocktail Glass (300ml)",
    "tags": [
      "Signature Mocktail",
      "Handcrafted Layers",
      "Zero Alcohol"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_14",
    "orderNumber": 14,
    "name": "Cold Coffee",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Creamy, frothy iced coffee blended with freshly brewed dark roasted espresso beans, chilled full-cream milk, and sugar, served with a silky coffee crema swirl in a frosted glass.",
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Tall Frosted Glass (300ml)",
    "tags": [
      "Dark Roast Espresso",
      "Creamy Coffee Froth",
      "Chilled Pick-Me-Up"
    ],
    "isPopular": true
  },
  {
    "id": "veg_15",
    "orderNumber": 15,
    "name": "Tea & Coffee",
    "category": "Welcome Drinks",
    "categoryNumber": 1,
    "categoryHeading": "1. Welcome Drinks",
    "description": "Live continuous hot beverage station serving authentic ginger-cardamom Indian masala chai alongside aromatic freshly brewed South Indian filter coffee in warm porcelain mugs.",
    "image": "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "Continuous Hot Beverage Counter",
    "tags": [
      "Live Chai Station",
      "Filter Coffee & Masala Chai",
      "Piping Hot Service"
    ]
  },
  {
    "id": "veg_16",
    "orderNumber": 16,
    "name": "Veg Sweet Corn/Manchow Soup",
    "category": "Soup",
    "categoryNumber": 2,
    "categoryHeading": "2. Soup",
    "description": "Comforting, velvety Indo-Chinese vegetable soup loaded with golden sweet corn kernels, finely minced garden vegetables, and aromatic white pepper garnished with crispy noodles.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Steaming Ceramic Bowl (250ml)",
    "tags": [
      "Comfort Classic",
      "Velvety Broth",
      "Crispy Noodles"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_17",
    "orderNumber": 17,
    "name": "American Corn Fry",
    "category": "Starter",
    "categoryNumber": 3,
    "categoryHeading": "3. Starter",
    "description": "Golden crispy fried American sweet corn tossed in fragrant chaat spices, fresh green chilies, coriander, and freshly squeezed lime juice.",
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Appetizer Platter (200g)",
    "tags": [
      "Golden Crunch",
      "Sweet & Spicy",
      "Kids & Adults Favorite"
    ],
    "isPopular": true
  },
  {
    "id": "veg_18",
    "orderNumber": 18,
    "name": "Hara Bhara Kabab",
    "category": "Starter",
    "categoryNumber": 3,
    "categoryHeading": "3. Starter",
    "description": "Pan-seared spinach, green pea, and cottage cheese patties infused with roasted cumin, ginger, and garam masala, garnished with whole cashew nuts.",
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "4 Succulent Kababs",
    "tags": [
      "Iron-Rich Spinach",
      "Cashew Crown",
      "Mint Chutney Dip"
    ],
    "isFeatured": true
  },
  {
    "id": "veg_19",
    "orderNumber": 19,
    "name": "Mushroom Cheese Ball",
    "category": "Starter",
    "categoryNumber": 3,
    "categoryHeading": "3. Starter",
    "description": "Crispy panko-breaded golden croquettes stuffed with finely minced button mushrooms, gooey mozzarella, and processed cheese with herbs.",
    "image": "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "4 Golden Melt-in-Mouth Balls",
    "tags": [
      "Gooey Melted Cheese",
      "Crisp Panko Crust",
      "Cocktail Star"
    ],
    "isPopular": true
  },
  {
    "id": "veg_20",
    "orderNumber": 20,
    "name": "Paneer Shashlik",
    "category": "Starter",
    "categoryNumber": 3,
    "categoryHeading": "3. Starter",
    "description": "Succulent malai paneer cubes, crunchy tricolor bell peppers, and sweet onions skewered and grilled in a clay tandoor with aromatic yellow mustard and curd marinade.",
    "image": "/images/dishes/Malai_Paneer_Tikka__PK_007.jpg",
    "isVeg": true,
    "serving": "2 Grilled Skewers (4 Skewered Cubes)",
    "tags": [
      "Tandoori Char",
      "Malai Cottage Cheese",
      "Smoky Aromas"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_21",
    "orderNumber": 21,
    "name": "Dahi Papdi Chaat",
    "category": "Starter",
    "categoryNumber": 3,
    "categoryHeading": "3. Starter",
    "description": "Crispy fried wheat flour papdis crowned with spiced boiled potatoes, soft chickpeas, whipped sweetened curd, tangy tamarind chutney, and spicy mint-coriander salsa with nylon sev.",
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Chaat Platter (6 Crisp Papdis)",
    "tags": [
      "Sweet & Tangy",
      "Whipped Yogurt",
      "Nylon Sev Crunch"
    ],
    "isPopular": true
  },
  {
    "id": "veg_22",
    "orderNumber": 22,
    "name": "Gupchup",
    "category": "Starter",
    "categoryNumber": 3,
    "categoryHeading": "3. Starter",
    "description": "Live interactive panipuri counter with paper-thin crisp semolina puris filled with warm spiced potato-black chickpea masala, dipped in ice-chilled spicy mint-coriander and sweet tamarind waters.",
    "image": "/images/dishes/live-panipuri.jpg",
    "isVeg": true,
    "serving": "Live Counter Service (6 Puris Per Serving)",
    "tags": [
      "Live Counter Star",
      "Icy Spicy Mint Water",
      "Crisp Semolina Puris"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_23",
    "orderNumber": 23,
    "name": "Papad",
    "category": "Plate Counter",
    "categoryNumber": 4,
    "categoryHeading": "4. Plate Counter",
    "description": "Assortment of roasted and golden-fried Indian spiced urad dal papads, rice papadums, and sabudana crisps served with mint chutney and mixed pickles.",
    "image": "/images/dishes/crispy-papad.jpg",
    "isVeg": true,
    "serving": "1 Basket (Mixed Roasted & Fried)",
    "tags": [
      "Crunchy Accompaniment",
      "Urad Dal Spiced",
      "Banquet Staple"
    ]
  },
  {
    "id": "veg_24",
    "orderNumber": 24,
    "name": "Salad",
    "category": "Plate Counter",
    "categoryNumber": 4,
    "categoryHeading": "4. Plate Counter",
    "description": "Garden-fresh crunchy salad platter of chilled English cucumbers, vine-ripened tomatoes, sweet carrots, red onions, beetroot curls, and lemon wedges.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Plate (150g)",
    "tags": [
      "Farm Fresh Greens",
      "Hydrating & Crisp",
      "Lemon-Pepper Dressing"
    ]
  },
  {
    "id": "veg_25",
    "orderNumber": 25,
    "name": "Pasta",
    "category": "Plate Counter",
    "categoryNumber": 4,
    "categoryHeading": "4. Plate Counter",
    "description": "Al dente Italian penne pasta tossed in a velvety herb tomato-cream sauce with crunchy bell peppers, sweet corn, black olives, and Italian parmesan cheese.",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Pasta Bowl (200g)",
    "tags": [
      "Italian Fusion",
      "Al Dente Penne",
      "Creamy Tomato Herbs"
    ]
  },
  {
    "id": "veg_26",
    "orderNumber": 26,
    "name": "Dahi Rashola",
    "category": "Plate Counter",
    "categoryNumber": 4,
    "categoryHeading": "4. Plate Counter",
    "description": "Tender cottage cheese rasgulla dumplings bathed in smooth, seasoned curd tempered with mustard seeds, curry leaves, roasted cumin, and black rock salt.",
    "image": "/images/dishes/dahi-rashola.jpg",
    "isVeg": true,
    "serving": "2 Soft Dumplings in Seasoned Curd",
    "tags": [
      "Regional Heritage",
      "Sweet & Savory Curd",
      "Tempered Mustard"
    ]
  },
  {
    "id": "veg_27",
    "orderNumber": 27,
    "name": "Dahi Bara",
    "category": "Plate Counter",
    "categoryNumber": 4,
    "categoryHeading": "4. Plate Counter",
    "description": "Traditional Odisha-style golden fried urad dal vadas soaked in spiced light curd, served with spicy aloo dum gravy, ghugni peas, and sev garnish.",
    "image": "/images/dishes/Dahibara_Aludam.jpg",
    "isVeg": true,
    "serving": "2 Soft Vadas with Aloo Dum & Ghugni",
    "tags": [
      "Odisha Pride",
      "Soaked Urad Bara",
      "Spicy Aloo Dum Pairing"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_28",
    "orderNumber": 28,
    "name": "Green Peas Rice",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Fragrant long-grain aged Basmati rice delicately steamed with sweet tender green peas, whole cloves, star anise, cinnamon quills, and desi cow ghee.",
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Handi Portion (250g)",
    "tags": [
      "Aged Basmati Rice",
      "Desi Ghee Aroma",
      "Whole Spices"
    ]
  },
  {
    "id": "veg_29",
    "orderNumber": 29,
    "name": "Rumali Roti",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Handkerchief-thin, ultra-soft wheat flatbread expertly tossed and cooked on an inverted hot iron tawa, served warm and folded.",
    "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "2 Soft Folded Rotis",
    "tags": [
      "Paper Thin",
      "Piped Hot",
      "Melt in Mouth"
    ]
  },
  {
    "id": "veg_30",
    "orderNumber": 30,
    "name": "Yellow Dal Fry",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Slow-simmered yellow toor and moong lentils tempered with pure cow ghee, whole cumin seeds, garlic slivers, green chilies, and fresh coriander.",
    "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Handi Bowl (300ml)",
    "tags": [
      "Desi Ghee Tadka",
      "Comfort Classic",
      "Protein Rich"
    ]
  },
  {
    "id": "veg_31",
    "orderNumber": 31,
    "name": "Fruits Jelly",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Glistening chilled fruit jelly layered with colorful real fruit pieces, offering a light, refreshing sweet palate-cleanser.",
    "image": "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Dessert Cup (150g)",
    "tags": [
      "Chilled Sweet",
      "Real Fruit",
      "Palate Cleanser"
    ]
  },
  {
    "id": "veg_32",
    "orderNumber": 32,
    "name": "Paneer Punjabi/Hyderabadi",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Velvety malai cottage cheese cubes simmered in a royal, rich tomato-cashew makhani gravy enriched with butter, roasted spices, and kasuri methi.",
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Ceramic Handi (350g)",
    "tags": [
      "Royal Makhani",
      "Rich Cashew Cream",
      "Banquet Star"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_33",
    "orderNumber": 33,
    "name": "Navaratna Kurma",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Nine culinary jewels of tender seasonal vegetables, fruits, dry nuts, and cottage cheese simmered in a royal mild aromatic cashew cream kurma.",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Royal Handi (350g)",
    "tags": [
      "Nine Jewels",
      "Mughal Luxury",
      "Dry Fruits & Nuts"
    ],
    "isFeatured": true
  },
  {
    "id": "veg_34",
    "orderNumber": 34,
    "name": "Seasonal Veg",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Farm-fresh seasonal cauliflower florets, green peas, carrots, and french beans dry-roasted with aromatic whole cumin, ginger, and turmeric.",
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Handi Bowl (300g)",
    "tags": [
      "Farm Fresh",
      "Seasonal Bounty",
      "Mild Spices"
    ]
  },
  {
    "id": "veg_35",
    "orderNumber": 35,
    "name": "Mushroom Chilli",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Crispy button mushrooms wok-tossed with crunchy tricolor bell peppers, onions, green chilies, and savory dark soy glaze.",
    "image": "/images/dishes/chilli-mushroom.jpg",
    "isVeg": true,
    "serving": "1 Sizzling Wok Plate (250g)",
    "tags": [
      "Indo-Chinese",
      "Hot & Savory",
      "Wok Tossed"
    ],
    "isPopular": true
  },
  {
    "id": "veg_36",
    "orderNumber": 36,
    "name": "Finger Chips",
    "category": "Main Course",
    "categoryNumber": 5,
    "categoryHeading": "5. Main Course",
    "description": "Crispy golden potato fingers fried to perfection, lightly tossed in pink Himalayan rock salt and fine herbs.",
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "1 Golden Basket (200g)",
    "tags": [
      "Crispy Golden",
      "Kids Favorite",
      "Hot & Fresh"
    ]
  },
  {
    "id": "veg_37",
    "orderNumber": 37,
    "name": "Khir Sagar",
    "category": "Sweet Dessert",
    "categoryNumber": 6,
    "categoryHeading": "6. Sweet Dessert",
    "description": "Renowned Odisha sweet specialty of miniature soft cottage cheese dumplings poached in rich, cardamom-infused thickened saffron rabdi milk with pistachios.",
    "image": "/images/dishes/khir-sagar.jpg",
    "isVeg": true,
    "serving": "2 Soft Dumplings in Saffron Rabdi",
    "tags": [
      "Royal Odia Sweet",
      "Saffron Rabdi",
      "Pistachio Garnish"
    ],
    "isFeatured": true
  },
  {
    "id": "veg_38",
    "orderNumber": 38,
    "name": "Hot Jalebi/Gulab Jamun",
    "category": "Sweet Dessert",
    "categoryNumber": 6,
    "categoryHeading": "6. Sweet Dessert",
    "description": "Decadent hot Indian banquet dessert featuring crisp golden saffron jalebis fried live in pure desi ghee alongside warm melt-in-mouth khoya gulab jamuns.",
    "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "Warm Dessert Platter",
    "tags": [
      "Live Jalebi Counter",
      "Pure Desi Ghee",
      "Warm & Syrupy"
    ],
    "isPopular": true,
    "isFeatured": true
  },
  {
    "id": "veg_39",
    "orderNumber": 39,
    "name": "Ice Cream",
    "category": "Sweet Dessert",
    "categoryNumber": 6,
    "categoryHeading": "6. Sweet Dessert",
    "description": "Silky, rich artisanal ice cream scoops in premium vanilla and strawberry flavors, served in crystal dessert bowls with roasted almond flakes.",
    "image": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "2 Gourmet Scoops",
    "tags": [
      "Chilled Cream",
      "Banquet Classic",
      "Almond Topping"
    ]
  },
  {
    "id": "veg_40",
    "orderNumber": 40,
    "name": "Water Bottle",
    "category": "Additional Items",
    "categoryNumber": 7,
    "categoryHeading": "7. Additional Items",
    "description": "Hygienically packaged and sealed, crystal-clear purified natural drinking mineral water bottles supplied for every banquet table.",
    "image": "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
    "isVeg": true,
    "serving": "Continuous Banquet Service",
    "tags": [
      "Purified & Sealed",
      "Continuous Service",
      "Hygienic"
    ]
  },
  {
    "id": "veg_41",
    "orderNumber": 41,
    "name": "Paan Counter",
    "category": "Additional Items",
    "categoryNumber": 7,
    "categoryHeading": "7. Additional Items",
    "description": "Luxury royal meetha paan counter stall with fresh Magahi betel leaves, gulkand rose jam, silver vark foil, sweet saunf fennel, and digestive spices.",
    "image": "/images/dishes/royal-paan-counter.jpg",
    "isVeg": true,
    "serving": "Live Royal Paan Lounge",
    "tags": [
      "Live Paan Lounge",
      "Digestive Heritage",
      "Silver Vark"
    ],
    "isFeatured": true
  }
];
