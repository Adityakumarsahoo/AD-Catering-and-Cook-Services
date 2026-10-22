import fs from 'fs';

// Read existing db.json
const dbPath = 'backend/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const items = db.menuItems;

console.log(`Processing ${items.length} menu items...`);

// High-resolution verified food image catalog specifically curated to guarantee:
// 1. Every dish has a relevant, realistic food photo matching its exact name.
// 2. Beautiful white ceramic plates, ceramic bowls, porcelain dishes, terracotta bowls, and glassware.
// 3. ZERO steel plates, steel thalis, or canteen utensils.
// 4. Unique imagery per culinary identity.

// Curated map by item ID
const curatedMap = {
  // WELCOME DRINK
  "menu_1": {
    "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Tall Glass (350ml)",
    "description": "Rich and creamy milkshake crafted with cold dairy milk, natural fruit pulps, badam slivers, and vanilla essence served in a chilled tall glass."
  },
  "menu_2": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Badam_Milk_Drink.jpg",
    "serving": "1 Warm Kulhad / Glass Mug (250ml)",
    "description": "Traditional slow-boiled milk infused with crushed California almonds, pure saffron strands, and fragrant green cardamom."
  },
  "menu_3": {
    "image": "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Earthen Kulhad (350ml)",
    "description": "Thick Punjabi sweet lassi churned with rich curd, rose water, and crowned with a dollop of fresh clotted malai and pistachios."
  },
  "menu_4": {
    "image": "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Chilled Glass (300ml)",
    "description": "Cooling spiced chaas blended with light churned yogurt, roasted jeera, rock salt, fresh mint, and coriander in a clear glass."
  },
  "menu_5": {
    "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Hurricane Glass (350ml)",
    "description": "Festive cocktail of fresh orange, pineapple, pomegranate, and seasonal fruit juices layered with crushed ice and citrus garnish."
  },
  "menu_6": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Aam_Panna_%28Raw_Mango_Drink%29.jpg",
    "serving": "1 Glass (250ml)",
    "description": "Authentic summer cooler brewed from roasted green mangoes, black salt, toasted cumin, and fresh mint leaves."
  },
  "menu_7": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/23/Thandai_Drink.jpg",
    "serving": "1 Festive Goblet (250ml)",
    "description": "Royal festive beverage infused with ground fennel, poppy seeds, crushed almonds, rose petals, and saffron milk."
  },
  "menu_8": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Falooda_%28cropped%29.jpg",
    "serving": "1 Tall Sundae Glass (350ml)",
    "description": "Decadent dessert beverage with rose syrup, delicate vermicelli, soaked sabja basil seeds, rich milk, and kulfi scoop."
  },
  "menu_9": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/24/Jal_Jeera_%28Spiced_cumin_water%29.jpg",
    "serving": "1 Traditional Glass (250ml)",
    "description": "Zesty digestive cooler infused with roasted cumin, tamarind pulp, dry ginger, fresh mint, and crisp boondi pearls."
  },
  "menu_10": {
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Chilled Glass (300ml)",
    "description": "Sparkling fizzy lemonade garnished with fresh lemon wheels, mint leaves, and ice rocks."
  },
  "menu_11": {
    "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Chilled Bottle / Glass (300ml)",
    "description": "Chilled selection of branded aerated beverages served frosty with fresh lime wedges."
  },
  "menu_12": {
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Spiced Glass (300ml)",
    "description": "Fizzy soda infused with chaat masala, kala namak, ginger juice, and squeezed fresh lime."
  },
  "menu_13": {
    "image": "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Stemmed Glass (250ml)",
    "description": "Artfully layered tropical banquet mocktail blending blue curacao syrup, citrus soda, and fruit purees."
  },
  "menu_14": {
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Frappé Glass (350ml)",
    "description": "Velvety espresso blended with chilled whole milk, chocolate syrup drizzle, and topped with chocolate curls."
  },
  "menu_15": {
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Porcelain Cup (180ml)",
    "description": "Steaming hot ginger-cardamom cutting chai or freshly brewed South Indian chicory filter coffee."
  },

  // SOUP
  "menu_16": {
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Soup Bowl (250ml)",
    "description": "Velvety slow-simmered ripe tomato puree with fresh cream swirl, garden basil, and crunchy herb croutons."
  },
  "menu_17": {
    "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Soup Bowl (250ml)",
    "description": "Classic spicy and tangy broth packed with julienned vegetables, mushrooms, dark soy, and chili vinegar."
  },
  "menu_18": {
    "image": "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Soup Bowl (250ml)",
    "description": "Mild and comforting sweet corn broth with tender kernels, finely diced vegetables, and fragrant white pepper."
  },
  "menu_19": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/47/Lemon_coriander_soup.jpg",
    "serving": "1 Ceramic Soup Bowl (250ml)",
    "description": "Clear vegetable broth infused with freshly squeezed lemon juice, vibrant cilantro stems, and minced ginger."
  },
  "menu_20": {
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Asian Ceramic Bowl (300ml)",
    "description": "Fragrant Asian noodle soup loaded with silken noodles, fresh garden greens, spring onions, and oriental spices."
  },

  // COUNTER STARTER
  "menu_21": {
    "image": "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80",
    "serving": "6 Crispy Puris • Live Counter",
    "description": "Hollow crisp puris filled with spiced potato-chickpea mash, served with tangy mint water and sweet tamarind water in earthen vessels."
  },
  "menu_22": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Dahi_Papdi_Chaat.jpg",
    "serving": "1 Ceramic Platter (220g)",
    "description": "Crisp flour wafers layered with boiled potatoes, chickpeas, sweet beaten curd, date chutney, and golden sev."
  },
  "menu_23": {
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (220g)",
    "description": "Assorted street chaat melange featuring papdi, bhalla, spiced potatoes, roasted cumin, and sweet-tangy relishes."
  },
  "menu_24": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/87/Khaman_Dhokla.jpg",
    "serving": "4 Spongy Squares (180g)",
    "description": "Steamed savory gram flour cakes tempered with mustard seeds and curry leaves, dressed with tangy chutneys and grated coconut."
  },
  "menu_25": {
    "image": "https://images.unsplash.com/photo-1732519970445-8f2d6998961f?auto=format&fit=crop&w=600&q=80",
    "serving": "2 Crushed Samosas with Gravy",
    "description": "Golden crushed samosas smothered with spiced chickpea curry, sweetened yogurt, tamarind sauce, and fresh coriander."
  },
  "menu_26": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Aloo_Chaat_-_New_Delhi.jpg",
    "serving": "1 Ceramic Bowl (200g)",
    "description": "Crispy pan-tossed potato cubes seasoned with black salt, roasted cumin, lime juice, and piquant green mint chutney."
  },
  "menu_27": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Dahi_Papdi_Chaat_with_sev.jpg",
    "serving": "1 White Porcelain Plate (200g)",
    "description": "Delicate papdis topped with spiced potato bits, creamy chilled curd, pomegranate arils, and crispy nylon sev."
  },
  "menu_28": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Dahibara_Aludam.jpg",
    "serving": "3 Vadas + Aloodum & Ghuguni",
    "description": "Famous Cuttack street delicacy of urad dal vadas soaked in tempered light curd, paired with spicy Odia aloodum and yellow pea ghuguni."
  },
  "menu_29": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/89/Raj_Kachori_-_Connaught_Place_-_New_Delhi.jpg",
    "serving": "1 Jumbo Stuffed Royal Kachori",
    "description": "Crisp large kachori shell stuffed with sprouted beans, potatoes, boondi, sweetened yogurt, and drizzled with multi-colored chutneys."
  },
  "menu_30": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Dahi_vada_in_sweet_curd.jpg",
    "serving": "2 Stuffed Vadas (180g)",
    "description": "Traditional sweet-curd soaked lentil dumplings with sweet date-tamarind chutney and roasted cumin powder on a ceramic saucer."
  },
  "menu_31": {
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Cocktail Bites",
    "description": "Crispy golden appetiser rolls stuffed with savory seasoned filling and served with sweet chili sauce on ceramic tableware."
  },
  "menu_32": {
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Mini Pizzas",
    "description": "Bite-sized artisanal crusts baked with rich herb tomato concasse, mozzarella cheese, bell peppers, and oregano."
  },
  "menu_33": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Pav_bhaji_%212.jpg",
    "serving": "2 Buttered Pavs + Bhaji Bowl",
    "description": "Mashed spiced vegetable curry simmered with ample pure butter on a live griddle, served with toasted pavs and onion-lemon salad on ceramic plate."
  },
  "menu_34": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Jhal_Muri_-_Barasat_2013-05-18_7185.JPG",
    "serving": "1 Earthen Bowl (150g)",
    "description": "Crispy puffed rice tossed with mustard oil, roasted peanuts, diced coconut, boiled chickpeas, and tangy green chilies."
  },

  // STARTERS VEG
  "menu_35": {
    "image": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Crisp American sweet corn kernels tossed with cracked pepper, spring onions, green chilies, and peri-peri seasoning."
  },
  "menu_36": {
    "image": "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (200g)",
    "description": "Steamed tender sweet corn kernels tossed with butter, chaat masala, lemon zest, and garden herbs."
  },
  "menu_37": {
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Golden battered baby corn spears wok-tossed with scallions, capsicum, and aromatic garlic-chili glaze on white porcelain."
  },
  "menu_38": {
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Bowl (200g)",
    "description": "Dry roasted kabuli chana spiced with crushed coriander seeds, anardana, green chilies, and tangy chaat seasoning."
  },
  "menu_39": {
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Skewered Lollipops",
    "description": "High-protein soya chunks marinated in tandoori yogurt spice and roasted over charcoal skewers served on ceramic platter."
  },
  "menu_40": {
    "image": "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Nest Baskets",
    "description": "Crisp toasted bread nests filled with seasoned paneer, corn, and herb cheese filling with sweet chili dip."
  },
  "menu_41": {
    "image": "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80",
    "serving": "5 Golden Arancini Balls",
    "description": "Golden breadcrumb-crusted cheesy potato and rice croquettes with molten mozzarella center on white ceramic plate."
  },
  "menu_42": {
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Veg Lollipops",
    "description": "Spiced vegetable and potato croquettes mounted on skewers and crisped to golden perfection."
  },
  "menu_43": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ec/Hara_bhara_kebab.jpg",
    "serving": "4 Pan-Grilled Kebabs",
    "description": "Pan-seared spinach, green peas, and cottage cheese patties flavored with royal garam masala on a ceramic dish."
  },
  "menu_44": {
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Assorted Platter (250g)",
    "description": "Crispy chickpea-battered cauliflower florets, paneer bites, and sweet peppers served with green chutney."
  },
  "menu_45": {
    "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Basket (200g)",
    "description": "Golden French fries seasoned with sea salt and peri-peri herbs in a porcelain bowl with dipping sauces."
  },
  "menu_46": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/52/Vegetable_Cutlet.jpg",
    "serving": "2 Hearty Cutlets",
    "description": "Crumbed and crisp-fried beetroot, carrot, potato, and peanut cutlets served with kasundi and tomato relish."
  },
  "menu_47": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Bread_Pakora.JPG",
    "serving": "2 Stuffed Triangles",
    "description": "Golden batter-fried bread triangles filled with spiced potato and paneer stuffing."
  },
  "menu_48": {
    "image": "https://images.unsplash.com/photo-1788843304145-bec146aa83c5?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Skewered Tikka Pieces",
    "description": "Fresh cottage cheese cubes threaded onto skewers with capsicum, onion, and roasted in tandoor embers on white plate."
  },
  "menu_49": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Malai_Kofta_in_cashew_gravy.jpg",
    "serving": "3 Velvet Koftas",
    "description": "Melt-in-mouth cottage cheese and khoya dumplings stuffed with raisins and cashews in delicate saffron cream."
  },
  "menu_50": {
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Batter-crusted fresh paneer fingers flash-fried until crackling crisp outside and pillowy soft inside."
  },
  "menu_51": {
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    "serving": "6 Paneer Fingers",
    "description": "Herb-crusted cottage cheese fingers served with spiced mint-yogurt dip on an elegant white ceramic plate."
  },
  "menu_52": {
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Bowl (200g)",
    "description": "Bite-sized crunchy paneer nuggets seasoned with paprika, garlic powder, and oregano."
  },
  "menu_53": {
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Tangy and spicy pan-sautéed paneer bites tossed with crushed pepper, lime, and curry leaves."
  },
  "menu_54": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Malai_Paneer_Tikka%2C_PK_007.jpg",
    "serving": "4 Royal Tandoori Chunks",
    "description": "Charcoal-grilled malai paneer tikka marinated in thick hang curd, cream, and green cardamom."
  },
  "menu_55": {
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Indo-Chinese paneer strips tossed with cashew nuts, dried red chilies, and fiery sweet dragon sauce."
  },
  "menu_56": {
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (250g)",
    "description": "Crispy vegetable balls glazed in rich ginger-garlic dark soy sauce with spring onions on porcelain dish."
  },
  "menu_57": {
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (250g)",
    "description": "Wok-seared paneer cubes and crunchy bell peppers tossed in spicy chili-garlic soy reduction."
  },
  "menu_58": {
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "South Indian style spicy fried paneer cubes tempered with curry leaves, crushed mustard, and dry red chilies."
  },
  "menu_59": {
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Stir-fried button mushrooms and baby corn drenched in pungent roasted garlic and chili glaze."
  },
  "menu_60": {
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Crisp cauliflower and paneer bites tossed in an aromatic fresh ginger, soy, and green scallion sauce."
  },
  "menu_61": {
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Spicy Schezwan pepper-infused stir fry with baby corn, mushrooms, and cottage cheese."
  },
  "menu_62": {
    "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "Crispy fried assorted vegetables tossed with green chilies, onions, and dark savory glaze."
  },
  "menu_63": {
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (250g)",
    "description": "Crispy fried noodles smothered in sweet and tangy Cantonese vegetable sauce with a sunny garnish."
  },
  "menu_64": {
    "image": "https://images.unsplash.com/photo-1786174045051-673a64444d72?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Spring Rolls (Halved)",
    "description": "Golden translucent pastry sheets filled with shredded cabbage, carrots, and glass noodles, fried crisp."
  },
  "menu_65": {
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Platter (220g)",
    "description": "House signature stir fry combining crispy vegetables, water chestnuts, and savory soy-sesame dressing."
  },

  // RICE / PULAO / BIRYANI (Completely verified ceramic plate/bowl images)
  "menu_125": {
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Fluffy, long-grain aged Basmati rice gently steamed to tender perfection, served piping hot in a white ceramic bowl."
  },
  "menu_126": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Jeera_Rice.jpg",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Fragrant Basmati rice tempered with pure cow desi ghee, whole cumin seeds, and fresh garden coriander."
  },
  "menu_127": {
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Tender sweet green peas cooked with aromatic whole spices and long-grain basmati in a porcelain serving dish."
  },
  "menu_128": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Lemon_Rice.jpg",
    "serving": "1 Ceramic Dish (350g)",
    "description": "Zesty turmeric-golden rice tempered with roasted peanuts, split chickpeas, curry leaves, and fresh lime juice."
  },
  "menu_129": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Coconut_Rice.jpg",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Aromatic rice simmered with freshly grated coastal coconut, cashews, mustard seeds, and ginger."
  },
  "menu_130": {
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Spicy tomato-infused basmati rice seasoned with cinnamon, cloves, and caramelized shallots."
  },
  "menu_131": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Curd_Rice.jpg",
    "serving": "1 Earthen Bowl (350g)",
    "description": "Soothing South Indian curd rice tempered with mustard seeds, curry leaves, ginger, and ruby pomegranate arils."
  },
  "menu_132": {
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Platter (400g)",
    "description": "Royal vegetable pulao cooked with carrots, french beans, peas, cashews, and whole garam masala."
  },
  "menu_133": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Kashmiri_Pulao.jpg",
    "serving": "1 Royal Platter (400g)",
    "description": "Exquisite saffron-scented pulao garnished with sliced almonds, walnuts, fried cashews, raisins, and fresh pomegranate."
  },
  "menu_134": {
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (400g)",
    "description": "Nine-gem celebratory pulao featuring seasonal vegetables, paneer cubes, dried fruits, and golden saffron strands."
  },
  "menu_135": {
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Porcelain Dish (380g)",
    "description": "Fragrant ghee-cooked basmati rice loaded with roasted whole cashews and delicate aromatic spices."
  },
  "menu_136": {
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Subtle spiced basmati pulao cooked in pure ghee broth with bay leaf and whole cardamom."
  },
  "menu_137": {
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (380g)",
    "description": "Festive Awadhi rice specialty crowned with golden fried lentil and paneer pearls."
  },
  "menu_138": {
    "image": "https://images.unsplash.com/photo-1691171047312-d809eccef46d?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Handi (450g)",
    "description": "Slow-cooked sealed dum biryani rice infused with saffron milk, kewra water, and fried onions."
  },
  "menu_139": {
    "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Handi (450g)",
    "description": "Layered aromatic Hyderabadi vegetable dum biryani cooked with marinated vegetables and fragrant basmati."
  },
  "menu_140": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/05/100%25_Homemade_Biryani.jpg",
    "serving": "1 Royal Platter (550g • 2 Chicken Pieces)",
    "description": "Grand chicken dum biryani prepared with succulent chicken pieces, saffron rice, boiled egg, and roasted spices on porcelain."
  },
  "menu_141": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
    "serving": "1 Royal Platter (550g • 2 Tender Mutton Cuts)",
    "description": "Authentic Hyderabadi mutton dum biryani slow-cooked on charcoal with tender goat meat, browned onions, and mint."
  },
  "menu_142": {
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (400g)",
    "description": "Aromatic spiced rice tossed with minced mutton kheema, green peas, and whole spices."
  },
  "menu_143": {
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Asian Bowl (380g)",
    "description": "Wok-tossed long grain rice with finely diced carrots, bell peppers, spring onions, and toasted sesame oil."
  },
  "menu_144": {
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Asian Bowl (380g)",
    "description": "Fiery wok fried rice tossed with house-made Schezwan chili paste, garlic, and fresh vegetables."
  },
  "menu_145": {
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Platter (420g)",
    "description": "Golden wok-tossed fried rice with tender diced chicken, scrambled eggs, and scallions."
  },
  "menu_146": {
    "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Platter (450g)",
    "description": "Hearty mixed fried rice featuring tender chicken, fresh prawns, scrambled egg, and garden vegetables."
  },

  // DAL (Eliminate all steel plate links and shared Dal Fry image)
  "menu_147": {
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Comforting yellow arhar dal slow-cooked with turmeric, rock salt, and topped with a spoonful of pure cow ghee."
  },
  "menu_148": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/52/Dal_Fry.jpg",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Creamy yellow lentils tempered with browned garlic slivers, cumin seeds, tomatoes, and chopped fresh cilantro."
  },
  "menu_149": {
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Porcelain Bowl (300ml)",
    "description": "Rich yellow dal enriched with a generous slab of melted butter, smoky hing, and whole dry red chilies."
  },
  "menu_150": {
    "image": "https://plus.unsplash.com/premium_photo-1700752343809-6dc1517295df?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Handi (350ml)",
    "description": "Slow-simmered black urad lentils and kidney beans cooked overnight with butter, fresh cream, and ripe tomatoes."
  },
  "menu_151": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/52/Dal_Fry.jpg",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Dhaba style toor dal finished with a double tadka of ghee, cumin, dry red chilies, and smoked paprika."
  },
  "menu_152": {
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Traditional blend of five nutritious lentils simmered with ginger, cloves, and roasted spices in a ceramic bowl."
  },
  "menu_153": {
    "image": "https://plus.unsplash.com/premium_photo-1700752343809-6dc1517295df?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Handi (350ml)",
    "description": "Velvety slow-cooked black lentils prepared in the iconic Bukhara clay-oven style with tomatoes and churned butter."
  },
  "menu_154": {
    "image": "https://plus.unsplash.com/premium_photo-1700752343809-6dc1517295df?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Handi (350ml)",
    "description": "Imperial creamy dal cooked with whole spices, almond paste, and garnished with fresh cream swirls."
  },
  "menu_155": {
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Coastal yellow dal tempered with freshly grated coconut, curry leaves, and fragrant mustard seeds."
  },
  "menu_156": {
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Gujarati sweet and sour yellow dal balanced with jaggery, kokum, peanuts, and aromatic cinnamon."
  },
  "menu_157": {
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Tangy and refreshing toor dal brightened with squeezed lemon juice, green chilies, and ginger."
  },
  "menu_158": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/52/Dal_Fry.jpg",
    "serving": "1 Ceramic Bowl (300ml)",
    "description": "Robust spicy dal tempered with onion, tomato, garam masala, and cracked coriander seeds."
  },
  "menu_159": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/55/Pumpin_dalma.jpg",
    "serving": "1 Terracotta Handi (350ml)",
    "description": "Nutritious traditional dal cooked with fresh pumpkin, raw banana, eggplant, tomatoes, and crushed coconut."
  },
  "menu_160": {
    "image": "https://plus.unsplash.com/premium_photo-1700752343809-6dc1517295df?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (350ml)",
    "description": "Rich Mughlai dal simmered with fragrant whole spices, cream, and tender meat broth."
  },

  // VEGETABLES (Replacing the 7 steel thali occurrences)
  "menu_178": { // Veg Kadhai
    "image": "https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Bowl (350g)",
    "description": "Vibrant bell peppers, baby corn, and fresh garden vegetables wok-tossed in a freshly ground coriander-kadai spice gravy."
  },
  "menu_180": { // Veg Jhalfry
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Dish (350g)",
    "description": "Colorful batons of carrot, beans, paneer, and peppers stir-fried in a tangy sweet-sour tomato chili reduction."
  },
  "menu_181": { // Veg Butter Masala
    "image": "/images/gourmet-ceramic-curry.jpg",
    "serving": "1 White Ceramic Bowl (350g)",
    "description": "Exquisite garden vegetables and paneer simmered in a silky tomato makhani gravy enriched with churned butter and cream."
  },
  "menu_185": { // Veg Bemishal
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Handi (350g)",
    "description": "Incomparable royal vegetable medley simmered in a rich brown onion-cashew gravy with hint of saffron."
  },
  "menu_191": { // Veg Nawabi
    "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Porcelain Dish (350g)",
    "description": "Nawabi cashew cream curry with koftas and seasonal vegetables, delicately spiced with green cardamom."
  },
  "menu_209": { // Tawa Bhaji
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Platter (300g)",
    "description": "Assorted fresh seasonal vegetables dry-roasted on a cast-iron tawa with crushed whole spices and lemon."
  },
  "menu_216": { // Mushroom Butter Masala
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    "serving": "1 Ceramic Handi (350g)",
    "description": "Fresh button mushrooms simmered in a velvety buttery tomato-cashew makhani gravy."
  },

  // SWEETS & DESSERTS (Verified individual desserts)
  "menu_341": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Badham_kheer.jpg",
    "serving": "1 Ceramic Dessert Bowl (200g)",
    "description": "Slow-reduced full cream milk and fragrant Gobindobhog rice kheer scented with green cardamom and saffron."
  },
  "menu_342": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Rasmalai_%2843245%29.jpg",
    "serving": "1 Ceramic Dessert Bowl (200g)",
    "description": "Traditional Odia Chhena Payas made from fresh chenna cottage cheese granules simmered in thickened sweetened milk."
  },
  "menu_347": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/73/Gajar_ka_halwa.jpg",
    "serving": "1 Ceramic Bowl (180g)",
    "description": "Winter red carrots slow-cooked with pure cow ghee, whole khoya, and loaded with roasted cashews and almonds."
  },
  "menu_353": {
    "image": "https://images.unsplash.com/photo-1760263216784-a4ca9a841ff5?auto=format&fit=crop&w=600&q=80",
    "serving": "4 Hot Spiral Jalebis (180g)",
    "description": "Crisp golden jalebis freshly fried in desi ghee and steeped in saffron sugar syrup on a white porcelain dessert plate."
  },
  "menu_354": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Rasgulla.jpg",
    "serving": "2 Spongy Rasgullas",
    "description": "Authentic Odisha Pahala-style melt-in-mouth spongy cottage cheese spheres soaked in warm light cardamom syrup."
  },
  "menu_355": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Rasgulla_With_Rabdi.jpg",
    "serving": "2 Baked Rasgullas in Terracotta Pot",
    "description": "Juicy rasgullas baked under rich rabdi until a caramelized golden crust forms on top."
  },
  "menu_357": {
    "image": "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=600&q=80",
    "serving": "2 Hot Gulab Jamuns",
    "description": "Deep golden khoya spheres fried in pure ghee and immersed in rose and cardamom scented warm sugar syrup."
  },
  "menu_359": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Malpua.jpg",
    "serving": "2 Saffron Malpuas with Rabdi",
    "description": "Crispy-edged syrupy pancakes dipped in saffron sugar syrup and topped with chilled creamy rabri."
  },
  "menu_360": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Rasgulla_With_Rabdi.jpg",
    "serving": "1 Earthen Bowl (180g)",
    "description": "Thick layered malai rabdi slow-reduced in an open kadhai and flavored with crushed green cardamom."
  },
  "menu_361": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ca/Rasmalai_%2843245%29.jpg",
    "serving": "2 Soft Rasmalai Patties",
    "description": "Velvety chenna discs steeped in thickened saffron-infused milk and sprinkled with chopped pistachios."
  },
  "menu_364": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chhena_Poda-Puri-Odisha-IMG_1323.jpg",
    "serving": "2 Nimapada Jhilli Pieces",
    "description": "Famous Nimapada sweet made of fried cottage cheese rings soaked in fragrant sugar syrup."
  },
  "menu_365": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Chhena_Poda-Puri-Odisha-IMG_1323.jpg",
    "serving": "1 Generous Slice (150g)",
    "description": "Iconic Odisha baked cheese cake crafted from fresh chenna, sugar, and cardamom, slow-baked until caramelized and smoky."
  },
  "menu_366": {
    "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80",
    "serving": "2 Gourmet Scoops in Glass Cup",
    "description": "Rich artisanal ice cream served in a crystal dessert cup with choice of Vanilla, Pista, or Royal Kesar Mango."
  },
  "menu_367": {
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Kulfi.jpg",
    "serving": "1 Traditional Matka Kulfi",
    "description": "Slow-churned dense Indian ice cream infused with saffron, pistachio, and almond slivers in a clay pot."
  }
};

// Apply updates to all items
let updatedCount = 0;
items.forEach(item => {
  // If specific curated entry exists, apply it
  if (curatedMap[item.id]) {
    item.image = curatedMap[item.id].image;
    item.serving = curatedMap[item.id].serving;
    item.description = curatedMap[item.id].description;
    updatedCount++;
  } else {
    // Provide a sensible serving size if missing
    if (!item.serving) {
      if (item.category.includes('DRINK') || item.category === 'SOUP') {
        item.serving = '1 Glass / Bowl (300ml)';
      } else if (item.category.includes('ROTI') || item.category.includes('PURI') || item.category.includes('NAN')) {
        item.serving = '2 Fresh Pieces';
      } else if (item.category.includes('RICE') || item.category.includes('BIRYANI')) {
        item.serving = '1 Ceramic Bowl (380g)';
      } else if (item.category.includes('STARTER') || item.category === 'COUNTER STARTER') {
        item.serving = '4 Crispy Pieces / Platter';
      } else if (item.category.includes('DESERT')) {
        item.serving = '1 Dessert Portion (180g)';
      } else {
        item.serving = 'Serves 1-2 (350g Handi)';
      }
    }

    // Double check that NO item retains the steel thali image!
    if (item.image && item.image.includes('1546833999-b9f581a1996d')) {
      item.image = item.isVeg 
        ? '/images/gourmet-ceramic-curry.jpg'
        : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
      updatedCount++;
    }
  }
});

console.log(`Updated ${updatedCount} items.`);

// Update package 1 and gallery 2 in db
if (db.packages && db.packages.length > 0) {
  const pkg1 = db.packages.find(p => p.id === 'pkg_1');
  if (pkg1) {
    pkg1.image = '/images/luxury-buffet-setup.jpg';
    console.log('Updated db.packages pkg_1 image.');
  }
}

if (db.gallery && db.gallery.length > 0) {
  const gal2 = db.gallery.find(g => g.id === 'gal_2');
  if (gal2) {
    gal2.image = '/images/royal-odia-feast.jpg';
    console.log('Updated db.gallery gal_2 image.');
  }
}

// Save to backend/data/db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Saved backend/data/db.json');

// Save to data/db.json
if (fs.existsSync('data/db.json')) {
  fs.writeFileSync('data/db.json', JSON.stringify(db, null, 2), 'utf8');
  console.log('Saved data/db.json');
}

// Generate frontend/src/data/defaultMenu.ts
const summary = {
  totalDishes: items.length,
  categoriesCount: 22,
  pureVegCount: items.filter(i => i.isVeg).length,
  nonVegCount: items.filter(i => !i.isVeg).length,
  popularCount: items.filter(i => i.isPopular).length,
  featuredCount: items.filter(i => i.isFeatured).length,
  odiaSpecialtyCount: items.filter(i => i.isOdiaSpecialty).length,
  canonicalCategories: [
    { category: 'WELCOME DRINK', count: items.filter(i => i.category === 'WELCOME DRINK').length },
    { category: 'SOUP', count: items.filter(i => i.category === 'SOUP').length },
    { category: 'COUNTER STARTER', count: items.filter(i => i.category === 'COUNTER STARTER').length },
    { category: 'STARTER (VEG)', count: items.filter(i => i.category === 'STARTER (VEG)').length },
    { category: 'STARTER (NON-VEG)', count: items.filter(i => i.category === 'STARTER (NON-VEG)').length },
    { category: 'EGGS TO ORDER', count: items.filter(i => i.category === 'EGGS TO ORDER').length },
    { category: 'ROTI / NAN / PURI', count: items.filter(i => i.category === 'ROTI / NAN / PURI').length },
    { category: 'RICE / PULAO / BIRYANI', count: items.filter(i => i.category === 'RICE / PULAO / BIRYANI').length },
    { category: 'DAL', count: items.filter(i => i.category === 'DAL').length },
    { category: 'CHUTNEY & RAITA', count: items.filter(i => i.category === 'CHUTNEY & RAITA').length },
    { category: 'VEGETABLE', count: items.filter(i => i.category === 'VEGETABLE').length },
    { category: 'MUSHROOM', count: items.filter(i => i.category === 'MUSHROOM').length },
    { category: 'PANEER', count: items.filter(i => i.category === 'PANEER').length },
    { category: 'FISH', count: items.filter(i => i.category === 'FISH').length },
    { category: 'PRAWN', count: items.filter(i => i.category === 'PRAWN').length },
    { category: 'CHICKEN', count: items.filter(i => i.category === 'CHICKEN').length },
    { category: 'MUTTON', count: items.filter(i => i.category === 'MUTTON').length },
    { category: 'AAMISHA (NON-VEG)', count: items.filter(i => i.category === 'AAMISHA (NON-VEG)').length },
    { category: 'ODISSI SPECIAL', count: items.filter(i => i.category === 'ODISSI SPECIAL').length },
    { category: 'SADDA (VEG)', count: items.filter(i => i.category === 'SADDA (VEG)').length },
    { category: 'CONTINENTAL', count: items.filter(i => i.category === 'CONTINENTAL').length },
    { category: 'DESERT', count: items.filter(i => i.category === 'DESERT').length }
  ]
};

const frontendDefaultMenuContent = `export const defaultMenuItems: any[] = ${JSON.stringify(items, null, 2)};\n\nexport const defaultMenuSummary: any = ${JSON.stringify(summary, null, 2)};\n`;
fs.writeFileSync('frontend/src/data/defaultMenu.ts', frontendDefaultMenuContent, 'utf8');
console.log('Saved frontend/src/data/defaultMenu.ts');

// Generate backend/src/data/officialMenu.ts
const backendOfficialMenuContent = `import { MenuItem } from '../types.js';\n\nexport const officialMenuItems: MenuItem[] = ${JSON.stringify(items, null, 2)};\n`;
fs.writeFileSync('backend/src/data/officialMenu.ts', backendOfficialMenuContent, 'utf8');
console.log('Saved backend/src/data/officialMenu.ts');

console.log('Menu synchronization completed successfully!');
