import { defaultMenuItems } from '../data/defaultMenu.js';

export interface ResolvedDish {
  id: string;
  name: string;
  displayName: string;
  category: string;
  description: string;
  image: string;
  isVeg: boolean;
  price?: number;
  serving?: string;
  tags?: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  isOdiaSpecialty?: boolean;
  packageContext?: string;
}

// Curated category fallback images (high-definition catering photography from local assets)
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'WELCOME DRINKS': '/images/DISHE/Hot Badam Milk.png',
  'WELCOME DRINK': '/images/DISHE/Hot Badam Milk.png',
  'SOUP COUNTER': '/images/DISHE/Cream of Tomato Soup.png',
  'SOUP': '/images/DISHE/Cream of Tomato Soup.png',
  'STARTER (VEG)': '/images/DISHE/Crispy Paneer.png',
  'STARTER (NON-VEG)': '/images/DISHE/Chicken Malai Tikka.png',
  'PLATE COUNTER': '/images/DISHE/Dahiwada Aloudum.png',
  'COUNTER STARTER': '/images/DISHE/PaniPuri.png',
  'MAIN COURSE (VEG)': '/images/DISHE/DALEMA.png',
  'MAIN COURSE (NON-VEG)': '/images/DISHE/MUTTON CURRY.png',
  'SWEET DESERT': '/images/DISHE/Chenna Podo.png',
  'SWEET DESSERT': '/images/DISHE/Chenna Podo.png',
  'DESERT': '/images/DISHE/Chenna Podo.png',
  'SPECIAL COUNTERS': '/images/DISHE/Dahiwada Aloudum.png',
  'SPECIAL INCLUSIONS': '/images/DISHE/Dahiwada Aloudum.png',
  'PANEER': '/images/DISHE/Paneer Butter Masala.png',
  'RICE / PULAO / BIRYANI': '/images/DISHE/CHICKEN BIRIYANI.png',
  'MUTTON': '/images/DISHE/MUTTON CURRY.png',
  'CHICKEN': '/images/DISHE/CHICKEN BIRIYANI.png',
  'FISH': '/images/DISHE/Fish Fry.png',
  'PRAWN': '/images/DISHE/Crispy Prawn.png',
  'ROTI / NAN / PURI': '/images/DISHE/Naan (Plain Butter).png',
  'EGGS TO ORDER': '/images/DISHE/Egg Chop.png',
  'ODISSI SPECIAL': '/images/DISHE/DALEMA.png',
  'DAL': '/images/DISHE/DALEMA.png',
};

// Curated specific dish imagery using guaranteed local assets
const DISH_SPECIFIC_IMAGES: Record<string, string> = {
  // Welcome Drinks & Beverages
  'aam panna': '/images/DISHE/Aam Panna.png',
  'chanch': '/images/DISHE/Chanch.png',
  'dahi chhanch': '/images/DISHE/Chanch.png',
  'dahi chhanch / kesar milk': '/images/DISHE/Chanch.png',
  'cold coffee': '/images/DISHE/Cold Coffee.png',
  'cold drinks': '/images/DISHE/Cold Drinks.png',
  'lemon cold drinks': '/images/DISHE/Lemon Cold Drinks.png',
  'masala cold drinks': '/images/DISHE/Masala Cold Drinks.png',
  'masala drinks': '/images/DISHE/Masala Cold Drinks.png',
  'falluda': '/images/DISHE/Falluda.png',
  'falooda': '/images/DISHE/Falluda.png',
  'fruit punch': '/images/DISHE/Fruit Punch.png',
  'hot badam milk': '/images/DISHE/Hot Badam Milk.png',
  'badam kesar milk': '/images/DISHE/Hot Badam Milk.png',
  'jaljeera': '/images/DISHE/Jaljeera.png',
  'spiced jaljeera': '/images/DISHE/Jaljeera.png',
  'lassi (sweet)': '/images/DISHE/Lassi (Sweet).png',
  'sweet lassi': '/images/DISHE/Lassi (Sweet).png',
  'lassi': '/images/DISHE/Lassi (Sweet).png',
  'milk shake': '/images/DISHE/Milk Shake (Badam , Mango ,Pineapple ,Vanilla).png',
  'mocktail': '/images/DISHE/Mocktail.png',
  'fire mocktail': '/images/DISHE/Mocktail.png',
  'smoky mocktail': '/images/DISHE/Mocktail.png',
  'tea & coffee': '/images/DISHE/Tea & Coffee.png',
  'thandai': '/images/DISHE/Thandai.png',
  'kesar thandai': '/images/DISHE/Thandai.png',

  // Soups
  'cream of tomato soup': '/images/DISHE/Cream of Tomato Soup.png',
  'tomato soup': '/images/DISHE/Cream of Tomato Soup.png',
  'h / s soup': '/images/DISHE/H  S Soup (Veg. & Non Veg.).png',
  'h  s soup': '/images/DISHE/H  S Soup (Veg. & Non Veg.).png',
  'chicken h/s soup': '/images/DISHE/H  S Soup (Veg. & Non Veg.).png',
  'veg manchow soup': '/images/DISHE/H  S Soup (Veg. & Non Veg.).png',
  'hot & sour soup': '/images/DISHE/H  S Soup (Veg. & Non Veg.).png',
  's / c soup': '/images/DISHE/S  C Soup (Veg. & Non Veg.).png',
  's  c soup': '/images/DISHE/S  C Soup (Veg. & Non Veg.).png',
  'veg sweet corn soup': '/images/DISHE/S  C Soup (Veg. & Non Veg.).png',
  'sweet corn soup': '/images/DISHE/S  C Soup (Veg. & Non Veg.).png',
  'l / c soup': '/images/DISHE/L  C Soup (Veg. & Non Veg.).png',
  'l  c soup': '/images/DISHE/L  C Soup (Veg. & Non Veg.).png',
  'lemon coriender soup': '/images/DISHE/L  C Soup (Veg. & Non Veg.).png',
  'lemon coriander soup': '/images/DISHE/L  C Soup (Veg. & Non Veg.).png',
  'noodle soup': '/images/DISHE/Noodle Soup (Veg. & Non Veg.).png',

  // Chaat, Starters & Snacks
  'panipuri': '/images/DISHE/PaniPuri.png',
  'panipuri counter': '/images/DISHE/PaniPuri.png',
  'gupchup counter': '/images/DISHE/PaniPuri.png',
  'gupchup': '/images/DISHE/PaniPuri.png',
  'golgappa': '/images/DISHE/PaniPuri.png',
  'papdi chaat': '/images/DISHE/Papdi Chaat.png',
  'papudi chaat': '/images/DISHE/Papdi Chaat.png',
  'papudi chaat / aloo tiki chaat': '/images/DISHE/Papdi Chaat.png',
  'mix chaat': '/images/DISHE/Mix Chaat.png',
  'dhokla chaat': '/images/DISHE/Dhokla Chaat.png',
  'dhokla': '/images/DISHE/Dhokla Chaat.png',
  'samosa chaat': '/images/DISHE/Samosa Chaat.png',
  'aloo chaat': '/images/DISHE/Aloo Chaat.png',
  'dahi papdi': '/images/DISHE/Dahi Papdi.png',
  'dahiwada aloudum': '/images/DISHE/Dahiwada Aloudum.png',
  'dahibara aludam': '/images/DISHE/Dahiwada Aloudum.png',
  'dahibara': '/images/DISHE/Dahiwada Aloudum.png',
  'dahi vada aloo dum': '/images/DISHE/Dahiwada Aloudum.png',
  'raj kachodi': '/images/DISHE/Raj Kachodi.png',
  'raj kachori': '/images/DISHE/Raj Kachodi.png',
  'chakuli / biri kachudi': '/images/DISHE/Raj Kachodi.png',
  'gujia vada': '/images/DISHE/Gujia Vada.png',
  'mona': '/images/DISHE/Mona (Veg. & Non Veg..png',
  'mona (veg. & non veg.)': '/images/DISHE/Mona (Veg. & Non Veg..png',
  'mini pizza': '/images/DISHE/Mini Pizza.png',
  'pao bhaji': '/images/DISHE/Pao Bhaji.png',
  'pav bhaji': '/images/DISHE/Pao Bhaji.png',
  'masala mudi': '/images/DISHE/Masala Mudi.png',
  'jhal muri': '/images/DISHE/Masala Mudi.png',

  // Main Courses & Odia Heritage Specialties
  'chicken biryani': '/images/DISHE/CHICKEN BIRIYANI.png',
  'chicken biriyani': '/images/DISHE/CHICKEN BIRIYANI.png',
  'dum chicken biryani': '/images/DISHE/CHICKEN BIRIYANI.png',
  'plane dum biryani': '/images/DISHE/CHICKEN BIRIYANI.png',
  'mutton curry': '/images/DISHE/MUTTON CURRY.png',
  'mutton kasa': '/images/DISHE/MUTTON CURRY.png',
  'odia mutton kasa': '/images/DISHE/MUTTON CURRY.png',
  'mutton rogan juice': '/images/DISHE/MUTTON CURRY.png',
  'mutton rogan josh': '/images/DISHE/MUTTON CURRY.png',
  'paneer butter masala': '/images/DISHE/Paneer Butter Masala.png',
  'paneer (masala/hydrabadi)': '/images/DISHE/Paneer Butter Masala.png',
  'paneer pasinda / tikka masala': '/images/DISHE/Paneer Butter Masala.png',
  'dalema': '/images/DISHE/DALEMA.png',
  'dalma': '/images/DISHE/DALEMA.png',
  'odia dalma': '/images/DISHE/DALEMA.png',
  'authentic dalma': '/images/DISHE/DALEMA.png',
  'chingudi dalema': '/images/DISHE/DALEMA.png',
  'dal fry': '/images/DISHE/DALEMA.png',
  'dal butter fry': '/images/DISHE/DALEMA.png',
  'dal makhani': '/images/DISHE/DALEMA.png',
  'chenna podo': '/images/DISHE/Chenna Podo.png',
  'chhena poda': '/images/DISHE/Chenna Podo.png',
  'chenna poda': '/images/DISHE/Chenna Podo.png',

  // Authentic Odia & Banquet Delicacies & Specific Dishes
  'water bottle': '/images/DISHE/Cold Drinks.png',
  'paan counter': '/images/DISHE/Dahiwada Aloudum.png',
  'banarasi meetha paan': '/images/DISHE/Dahiwada Aloudum.png',
  'fruit design cutting': '/images/DISHE/Fruit Punch.png',
  'green salad': '/images/DISHE/Boiled Corn Chaat.png',
  'papad': '/images/DISHE/Biri kachodi.png',
  'pickles': '/images/DISHE/Dahiwada Aloudum.png',
  'chowmein': '/images/DISHE/Veg. Chiliese Choppsy.png',
  'egg devil': '/images/DISHE/Egg Scotch.png',
  'egg chop': '/images/DISHE/Egg Chop.png',
  'egg scotch': '/images/DISHE/Egg Scotch.png',
  'scotch egg': '/images/DISHE/Egg Scotch.png',
  'egg poach': '/images/DISHE/Egg Poach.png',
  'egg omlet': '/images/DISHE/Egg Omlet.png',
  'egg pakoda': '/images/DISHE/Egg Pakoda.png',
  'boiled egg': '/images/DISHE/Boiled Egg.png',
  'chicken pakoda': '/images/DISHE/Chicken Pokoda.png',
  'chicken pokoda': '/images/DISHE/Chicken Pokoda.png',
  'chicken (tikka / lolipop)': '/images/DISHE/Chicken (Manchurian, Dragon, Schezwan, Chilly, Lollypop).png',
  'chicken lollypop': '/images/DISHE/Chicken (Manchurian, Dragon, Schezwan, Chilly, Lollypop).png',
  'chicken kabab (malai, reshmi, hariyali)': '/images/DISHE/Assorted Kebab (Tikka Hariyali Malai).png',
  'assorted kebab (tikka/hariyali/malai)': '/images/DISHE/Assorted Kebab (Tikka Hariyali Malai).png',
  'chicken hyderabadi': '/images/DISHE/Chicken Malai Tikka.png',
  'chicken malai tikka': '/images/DISHE/Chicken Malai Tikka.png',
  'garlic chicken': '/images/DISHE/Garlic Chicken.png',
  'ginger chicken': '/images/DISHE/Ginger Chicken.png',
  'honey chicken': '/images/DISHE/Honey Chicken.png',
  'chicken ghee fry': '/images/DISHE/Chicken Ghee Fry.png',
  'chicken popcorn': '/images/DISHE/Chicken Popcorn.png',
  'crunchy chicken': '/images/DISHE/Crunchy Chicken.png',
  'tandoori chicken': '/images/DISHE/Tandoori Chicken.png',
  'tangdi kebab': '/images/DISHE/Tangdi Kebab.png',
  'chicken leg kebab': '/images/DISHE/Chicken Leg Kebab.png',
  'fish finger': '/images/DISHE/Fish Finger (Bone Less).png',
  'fish finger (bone less)': '/images/DISHE/Fish Finger (Bone Less).png',
  'fish amritsari': '/images/DISHE/Fish Amritsari (Bone Less).png',
  'fish chop': '/images/DISHE/Fish Chop (Bone Less).png',
  'fish patrapoda': '/images/DISHE/Fish Fry.png',
  'dahi fish': '/images/DISHE/Fish Fry.png',
  'fish fry': '/images/DISHE/Fish Fry.png',
  'fish masala': '/images/DISHE/Fish Fry.png',
  'fish honey balls': '/images/DISHE/Fish Honey Balls.png',
  'fried pomfret': '/images/DISHE/Fried Pomfret.png',
  'tandoori pomfret': '/images/DISHE/Tandoori Pomfret.png',
  'garlic prawn': '/images/DISHE/Hot Garlic Prawn.png',
  'hot garlic prawn': '/images/DISHE/Hot Garlic Prawn.png',
  'ginger prawn': '/images/DISHE/Ginger Prawn.png',
  'malai prawn': '/images/DISHE/Crispy Prawn.png',
  'crispy prawn': '/images/DISHE/Crispy Prawn.png',
  'fried prawn': '/images/DISHE/Fried Prawn.png',
  'barley prawn': '/images/DISHE/Barley Prawn.png',
  'tandoori prawn': '/images/DISHE/Tandoori Prawn.png',
  'prawn pokoda': '/images/DISHE/Prawn Pokoda.png',
  'prawn salt & pepper': '/images/DISHE/Prawn salt & Pepper.png',
  'prawn 65': '/images/DISHE/Prawn 65.png',
  'chhena payes': '/images/DISHE/Chenna Podo.png',
  'hot jalebi': '/images/DISHE/Chenna Podo.png',
  'ice cream': '/images/DISHE/Falluda.png',
  'rasogola': '/images/DISHE/Chenna Podo.png',
  'gulab jamun': '/images/DISHE/Chenna Podo.png',
  'kheer sagar': '/images/DISHE/Chenna Podo.png',
  'baked rasgula': '/images/DISHE/Chenna Podo.png',
  'gajar halwa': '/images/DISHE/Chenna Podo.png',
  'spout salad': '/images/DISHE/Boiled Corn Chaat.png',
  'rusian salad': '/images/DISHE/Boiled Corn Chaat.png',
  'nadia pachedi': '/images/DISHE/Dahiwada Aloudum.png',
  'dahi rasgulla': '/images/DISHE/Chenna Podo.png',
  'pasta salad': '/images/DISHE/Boiled Corn Chaat.png',
  'rice (veriety)': '/images/DISHE/Jeera rice.png',
  'rice (variety)': '/images/DISHE/Jeera rice.png',
  'plane rice': '/images/DISHE/Plane rice.png',
  'jeera rice': '/images/DISHE/Jeera rice.png',
  'rumali roti': '/images/DISHE/Rumali Roti.png',
  'rumali roti / chakuli': '/images/DISHE/Rumali Roti.png',
  'chakuli / butter naan': '/images/DISHE/Chakuli.png',
  'chakuli': '/images/DISHE/Chakuli.png',
  'naan (plain/butter)': '/images/DISHE/Naan (Plain Butter).png',
  'butter naan': '/images/DISHE/Naan (Plain Butter).png',
  'garlic naan': '/images/DISHE/Garlic Naan.png',
  'tandoori roti': '/images/DISHE/Tandoori Roti.png',
  'phulka': '/images/DISHE/Phulka.png',
  'missi roti': '/images/DISHE/Missi Roti.png',
  'thunka puri': '/images/DISHE/Thunka Puri.png',
  'biri kachodi': '/images/DISHE/Biri kachodi.png',
  'lachha paratha': '/images/DISHE/Lachha parata.png',
  'paneer paratha': '/images/DISHE/Paneer paratha.png',
  'aloo paratha': '/images/DISHE/Aloo paratha.png',
  'vegetable paratha': '/images/DISHE/Vegetable paratha.png',
  'battura': '/images/DISHE/Battura.png',
  'baby kulcha': '/images/DISHE/Baby kulcha.png',
  'masala puri': '/images/DISHE/Masala Puri.png',
  'plane puri': '/images/DISHE/Plane puri.png',
  'milky puri': '/images/DISHE/Milky puri.png',
  'palak puri': '/images/DISHE/Palak puri.png',
  'beetu puri': '/images/DISHE/Beetu puri.png',
  'moong chilla': '/images/DISHE/Moong Chilla.png',
  'khatta': '/images/DISHE/Chenna Podo.png',
  'pine apple jelly': '/images/DISHE/Chenna Podo.png',
  'paneer tikka': '/images/DISHE/Paneer Tikka.png',
  'paneer crispy': '/images/DISHE/Crispy Paneer.png',
  'crispy paneer': '/images/DISHE/Crispy Paneer.png',
  'paneer stick tikka': '/images/DISHE/Paneer Stick Tikka.png',
  'paneer kofta': '/images/DISHE/Paneer Kofta.png',
  'paneer finger': '/images/DISHE/Paneer Finger.png',
  'paneer popcorn': '/images/DISHE/Paneer Popcorn.png',
  'paneer chatpata': '/images/DISHE/Paneer Chatpata.png',
  'dragon (paneer)': '/images/DISHE/Dragon (Paneer).png',
  'paneer chilly': '/images/DISHE/Manchurian Chilly (Paneer, Mushroom, Gobi, Babycorn).png',
  'mushroom chilly': '/images/DISHE/Manchurian Chilly (Paneer, Mushroom, Gobi, Babycorn).png',
  'mix veg (navaratna/punjabi)': '/images/DISHE/DALEMA.png',
  'navaratna kurma': '/images/DISHE/DALEMA.png',
  'sijnal veg': '/images/DISHE/DALEMA.png',
  'mushroom (dopiaza/chilli)': '/images/DISHE/Chilly (Paneer, Mushroom, Gobi, Babycorn).png',
  'mushroom besar': '/images/DISHE/DALEMA.png',
  'kadai mushroom': '/images/DISHE/Chilly (Paneer, Mushroom, Gobi, Babycorn).png',
  'mushroom salt & pepper': '/images/DISHE/Chilly (Paneer, Mushroom, Gobi, Babycorn).png',
  'corn chaat': '/images/DISHE/Boiled Corn Chaat.png',
  'american corn crispy': '/images/DISHE/Crispy Masala Corn Bowl.png',
  'crispy corn': '/images/DISHE/Crispy Masala Corn Bowl.png',
  'dry chana roast': '/images/DISHE/Dry Chana Roast.png',
  'soya lollypop': '/images/DISHE/Soya Lollypop.png',
  "bread's nest": "/images/DISHE/Bread's Nest.png",
  'cheesy potato rice ball': '/images/DISHE/Cheesy Potato Rice Ball.png',
  'veg lollypop': '/images/DISHE/Veg Lollypop.png',
  'harabhara kabab': '/images/DISHE/HaraBhara Kabab.png',
  'harabara kabab / dahi kabab': '/images/DISHE/HaraBhara Kabab.png',
  'halakda': '/images/DISHE/Halakda (Veg. , Gobi, Mirchi, Paneer).png',
  'finger chips': '/images/DISHE/Finger Chips.png',
  'bread chop': '/images/DISHE/Bread Chop.png',
  'spring roll': '/images/DISHE/Veg. Spring Roll.png',
  'veg cutlet': '/images/DISHE/Veg Cutlet.png',
  'veg chilli': '/images/DISHE/Veg. Chilli.png',
  'veg china town': '/images/DISHE/Veg China Town.png',
};

// Authentic culinary descriptions for items that may not be in defaultMenuItems
const DISH_SPECIFIC_DESCRIPTIONS: Record<string, string> = {
  'water bottle': 'Hygienically packaged and sealed chilled mineral drinking water bottles (250ml/500ml) provided to each guest dining table.',
  'paan counter': 'Freshly prepared traditional Banarasi meetha paan live counter filled with fragrant sweet gulkand, tutty fruity, saunf, and silver leaf foil.',
  'banarasi meetha paan': 'Freshly rolled Banarasi meetha paan filled with aromatic gulkand, sweet saunf, coconut flakes, and silver vark at a traditional live paan kiosk.',
  'fruit design cutting': 'Artisanal decorative carving and elegant multi-tier presentation of seasonal sweet fruits and exotic melons by master culinary carvers.',
  'green salad': 'Crisp garden-fresh salad featuring sliced English cucumbers, farm-ripe tomatoes, crunchy carrots, radishes, and lemon wedges.',
  'dahibara': 'Soft fermented urad dal dumplings soaked in spiced seasoned buttermilk, garnished with roasted cumin, sev, and fresh coriander.',
  'papad': 'Assorted crispy roasted and fried poppadums served as traditional accompaniments to the royal main course banquet.',
  'pickles': 'Handmade traditional mixed vegetable, green chilli, and spicy raw mango achaar slow-cured in mustard oil and aromatic spices.',
  'spout salad': 'Nutritious sprouted moong and black gram salad tossed with diced onions, tomatoes, green chillies, chaat masala, and fresh lemon juice.',
  'rusian salad': 'Creamy diced vegetable and potato salad tossed with pineapple chunks and chilled seasoned mayonnaise dressing.',
  'nadia pachedi': 'Traditional Odia coconut relish freshly ground with green chillies, mustard seeds, and spiced yoghurt tempering.',
  'dahi rasgulla': 'Delicate cottage cheese rasgullas steeped in sweetened chilled curd with a hint of roasted cumin and pomegranate jewels.',
  'pasta salad': 'Italian spiral fusilli pasta tossed with crisp diced bell peppers, sweet corn kernels, Italian herbs, and virgin olive oil dressing.',
  'rice (veriety)': 'Steamed fragrant Basmati rice, tempered Jeera Rice, and royal vegetable pulao options served piping hot from warming chafers.',
  'rice (variety)': 'Steamed fragrant Basmati rice, tempered Jeera Rice, and royal vegetable pulao options served piping hot from warming chafers.',
  'rumali roti': 'Handkerchief-thin delicate soft flatbread tossed and baked on an inverted tawa, served warm and buttery.',
  'rumali roti / chakuli': 'Ultra-thin soft Rumali Rotis and authentic Odia pan-fried fermented rice-lentil Chakulis served fresh from live bread counters.',
  'chakuli / biri kachudi': 'Crispy golden fried black gram Biri Kachudis and fluffy tender Odia Chakulis prepared live on griddles.',
  'chakuli / butter naan': 'Crisp tandoor-baked Butter Naan brushed with pure butter alongside authentic Odia Chakulis.',
  'dal fry': 'Yellow lentils tempered with ghee, cumin seeds, garlic slivers, green chillies, and freshly chopped tomatoes.',
  'dal butter fry': 'Rich yellow toor dal simmered and double-tempered with golden Amul butter, garlic, roasted cumin, and red chillies.',
  'dal makhani': 'Slow-simmered whole black urad dal and kidney beans cooked overnight over low heat with pure butter and rich dairy cream.',
  'khatta': 'Authentic Odia sweet-and-sour relish crafted from sweet tomatoes, dates (khajura), and seasonal sweet fruits with panch phoron tempering.',
  'pine apple jelly': 'Sweet and tangy artisanal pineapple chutney/jelly infused with delicate spices and roasted cumin.',
  'paneer (masala/hydrabadi)': 'Tender paneer cubes simmered in a spiced tomato-onion gravy or rich mint-coriander Hyderabadi sauce.',
  'paneer pasinda / tikka masala': 'Delicate stuffed paneer sandwiches or char-grilled tandoori paneer simmered in a creamy butter-masala gravy.',
  'mix veg (navaratna/punjabi)': 'Medley of fresh market garden vegetables, carrots, beans, peas, and paneer cooked in a fragrant cashew-onion gravy.',
  'mushroom (dopiaza/chilli)': 'Plump button mushrooms tossed with double-cut caramelised onions and green chillies in a spicy masala.',
  'mushroom besar': 'Fresh button mushrooms simmered in traditional Odia mustard-garlic paste (besara) with pan-fried potatoes.',
  'kadai mushroom': 'Button mushrooms and crisp bell peppers stir-cooked in a wok with freshly ground coriander-peppercorn Kadai masala.',
  'navaratna kurma': 'Imperial Mughlai nine-gem curry crafted with fresh seasonal vegetables, nuts, raisins, and cottage cheese in a velvety sauce.',
  'sijnal veg': 'Hand-selected farm-fresh seasonal vegetables gently sautéed with mild aromatic spices and fresh coriander.',
  'mutton rogan juice': 'Tender bone-in mutton slow-braised in a rich aromatic Kashmiri gravy infused with fennel, ginger, and saffron oil.',
  'mutton rogan josh': 'Tender bone-in mutton slow-braised in a rich aromatic Kashmiri gravy infused with fennel, ginger, and saffron oil.',
  'fish fry': 'Fresh river fish steaks marinated in turmeric, chilli, and carom seeds, shallow fried crisp on a flat griddle.',
  'fish masala': 'Fresh fish steaks gently simmered in a fragrant onion, tomato, and ground garam masala gravy with fresh coriander.',
  'dahi fish': 'Tender fish pieces cooked in a delicate yoghurt-based spiced gravy with mustard and green chillies.',
  'fish patrapoda': 'Traditional Odia delicacy of fresh fish fillets coated with mustard-garlic paste wrapped in banana leaves and slow-roasted on embers.',
  'chicken hyderabadi': 'Succulent chicken pieces cooked in a royal aromatic gravy flavoured with crushed spices, mint, and fried onions.',
  'garlic chicken': 'Tender boneless chicken morsels sautéed with roasted golden garlic cloves, crushed black pepper, and herbs.',
  'malai prawn': 'Sweet Chilika prawns gently cooked in a luxurious coconut milk and cashew-cream gravy with mild spices.',
  'garlic prawn': 'Juicy Chilika prawns tossed with golden garlic flakes, butter, black pepper, and fresh parsley.',
  'chicken pakoda': 'Boneless chicken cubes seasoned with ginger-garlic and gram flour, deep fried into golden crispy fritters.',
  'chicken (tikka / lolipop)': 'Spicy tandoori chicken tikka skewers and crispy chicken drumsticks served with mint chutney and onion rings.',
  'chicken kabab (malai, reshmi, hariyali)': 'Assortment of creamy Malai, soft Reshmi, and minty Hariyali chicken kebabs grilled over glowing charcoal.',
  'fish finger': 'Crumb-coated delicate white fish goujons fried golden and served with homemade tartar sauce and lemon slices.',
  'scotch egg': 'Hard-boiled egg wrapped in savory minced meat and herb breadcrumbs, fried till crunchy on the outside.',
  'egg chop': 'Boiled eggs encased in a spiced potato mash casing, crumb-coated and deep-fried to a rich golden brown.',
  'gupchup counter': 'Interactive live counter serving crisp semolina puris filled with spiced potato-chickpea mash and tangy mint-tamarind water.',
  'panipuri counter': 'Interactive live counter serving crisp semolina puris filled with spiced potato-chickpea mash and tangy mint-tamarind water.',
  'papudi chaat / aloo tiki chaat': 'Live chaat station with crisp papdis, spiced griddle-fried potato patties, sweetened yoghurt, tamarind and mint chutneys.',
  'paneer crispy': 'Cottage cheese strips dusted with seasoned cornflour, fried crisp and tossed in sweet-and-spicy Indo-Chinese sauce.',
  'spring roll': 'Golden crispy pastry rolls stuffed with shredded wok-tossed cabbage, carrots, and spring onions with sweet chilli dip.',
  'veg cutlet': 'Crispy beetroot and potato cutlets with a crunchy breadcrumb crust, served with green chutney.',
  'corn chaat': 'Steamed sweet corn kernels tossed with butter, chaat masala, lemon juice, diced onions, and fresh coriander.',
  'harabara kabab / dahi kabab': 'Patties of minced spinach, green peas, and potatoes paired with delicate melt-in-mouth spiced hung curd kebabs.',
  'american corn crispy': 'Crisp batter-fried American sweet corn kernels tossed with crushed peppercorns, scallions, and rock salt.',
  'paneer tikka': 'Succulent cubes of cottage cheese marinated in spiced hung curd with bell peppers and roasted in clay tandoor.',
  'mushroom salt & pepper': 'Fresh button mushrooms fried crisp and tossed with crushed black peppercorns, sea salt, and spring onions.',
  'chowmein': 'Wok-tossed street-style noodles loaded with shredded bell peppers, cabbage, spring onions, and savory soy-garlic seasoning.',
  'chhena payes': 'Royal Odia delicacy of fresh cottage cheese pearls simmered in condensed saffron milk and garnished with pistachios.',
  'hot jalebi': 'Crispy deep-fried spiral coils soaked in fragrant saffron-cardamom sugar syrup, served piping hot from the wok.',
  'ice cream': 'Premium dairy ice cream in assorted classic banquet flavours including Vanilla, Butterscotch, and Strawberry.',
  'rasogola': 'Iconic melt-in-mouth spongy cottage cheese balls soaked in warm light cardamom sugar syrup.',
  'gulab jamun': 'Traditional khoya dumplings fried golden brown and soaked in warm rose and cardamom scented sugar syrup.',
  'kheer sagar': 'Delicate miniature cottage cheese dumplings bathed in a sweetened, cardamom-infused saffron milk syrup.',
  'baked rasgula': 'Soft spongy rasgullas baked under rich caramelised kheer and thickened rabdi with pistachio shavings.',
  'gajar halwa': 'Slow-simmered winter red carrot halwa cooked in pure desi ghee, khoya mawa, and crowned with toasted cashews and almonds.',
  'lemon coriender soup': 'Bright, zesty clear broth flavoured with fresh lemon juice, crushed coriander leaves, and fine vegetable juliennes.',
  'chicken h/s soup': 'Fiery Indo-Chinese hot and sour soup loaded with shredded chicken, mushrooms, bamboo shoots, and egg ribbons.',
  'veg manchow soup': 'Robust dark soy broth with finely chopped vegetables and ginger, topped with a generous crown of crunchy fried noodles.',
  'veg sweet corn soup': 'Creamy and soothing sweet corn soup made with crushed golden corn kernels and tender seasonal vegetables.',
  'fire mocktail': 'Spectacular flaming citrus mocktail blended with blue curacao, layered juices, and refreshing carbonation.',
  'smoky mocktail': 'Aromatic wood-smoked mocktail infused with fresh apple juice, cinnamon bark, and mint leaves.',
  'masala drinks': 'Tangy spiced Indian coolers featuring roasted cumin, mint essence, black salt, and sparkling soda.',
  'dahi chhanch / kesar milk': 'Choice of cooling spiced buttermilk churned with rock salt, or warm saffron-almond milk.',
  'badam kesar milk': 'Rich and creamy slow-simmered dairy milk infused with crushed California almonds, pure saffron, and green cardamom.',
};

/**
 * Determines whether a food item is vegetarian based on its name and category
 */
export function isDishVegetarian(name: string, category: string): boolean {
  const n = name.toLowerCase();
  const c = category.toUpperCase();

  if (c.includes('NON-VEG') || c.includes('AAMISHA') || c.includes('CHICKEN') || c.includes('MUTTON') || c.includes('FISH') || c.includes('PRAWN') || c.includes('EGG')) {
    // Check if specifically marked veg
    if (n.includes('veg ') || n.includes('paneer') || n.includes('mushroom')) {
      return true;
    }
    return false;
  }

  // Non-veg keywords
  const nonVegKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'egg', 'devil', 'scotchegg', 'scotch egg', 'non-veg', 'non veg'];
  for (const kw of nonVegKeywords) {
    if (n.includes(kw)) {
      // Exceptions like "Eggless"
      if (!n.includes('eggless') && !n.includes('veg & non veg')) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Normalizes dish name for lookup
 */
function normalizeName(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\/\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves a raw item string (from package categories) into a rich dish object
 */
export function resolveFoodItem(
  rawName: string,
  categoryName: string,
  menuItemsList: any[] = defaultMenuItems,
  packageContextName?: string
): ResolvedDish {
  const normRaw = normalizeName(rawName);
  const isVeg = isDishVegetarian(rawName, categoryName);

  // 1. Try finding exact or partial match in loaded menu items
  let matchedItem: any = null;

  if (Array.isArray(menuItemsList) && menuItemsList.length > 0) {
    // Exact match
    matchedItem = menuItemsList.find(
      (m) => m.name && m.name.toLowerCase() === rawName.toLowerCase()
    );

    // Substring match
    if (!matchedItem) {
      matchedItem = menuItemsList.find((m) => {
        if (!m.name) return false;
        const normM = normalizeName(m.name);
        return normM.includes(normRaw) || normRaw.includes(normM);
      });
    }

    // Split match for slashes (e.g. "Dahi Chhanch / Kesar Milk")
    if (!matchedItem && (rawName.includes('/') || rawName.includes('&'))) {
      const parts = rawName.split(/[\/\&]/).map((p) => p.trim());
      for (const part of parts) {
        const normP = normalizeName(part);
        matchedItem = menuItemsList.find((m) => {
          if (!m.name) return false;
          const normM = normalizeName(m.name);
          return normM.includes(normP) || normP.includes(normM);
        });
        if (matchedItem) break;
      }
    }

    // Key token match
    if (!matchedItem) {
      const tokens = normRaw.split(' ').filter((t) => t.length > 3);
      for (const tok of tokens) {
        matchedItem = menuItemsList.find((m) => {
          if (!m.name) return false;
          return normalizeName(m.name).includes(tok);
        });
        if (matchedItem) break;
      }
    }
  }

  // 2. Determine Best Image
  let image = '';
  // Check dish specific image map
  for (const [key, imgUrl] of Object.entries(DISH_SPECIFIC_IMAGES)) {
    if (normRaw.includes(key) || key.includes(normRaw)) {
      image = imgUrl;
      break;
    }
  }

  if (!image && matchedItem?.image) {
    image = matchedItem.image;
  }

  if (!image) {
    const catUpper = categoryName.toUpperCase();
    image =
      CATEGORY_FALLBACK_IMAGES[catUpper] ||
      (isVeg
        ? '/images/DISHE/DALEMA.png'
        : '/images/DISHE/MUTTON CURRY.png');
  }

  // 3. Determine Best Description
  let description = '';
  for (const [key, desc] of Object.entries(DISH_SPECIFIC_DESCRIPTIONS)) {
    if (normRaw.includes(key) || key.includes(normRaw)) {
      description = desc;
      break;
    }
  }

  if (!description && matchedItem?.description) {
    description = matchedItem.description;
  }

  if (!description) {
    description = isVeg
      ? `Authentic vegetarian ${categoryName.toLowerCase()} delicacy crafted with farm-fresh ingredients, pure desi ghee, and royal spices for live event banquets.`
      : `Signature gourmet ${categoryName.toLowerCase()} delicacy freshly prepared with premium ingredients, aromatic herbs, and traditional spices.`;
  }

  const safeRaw = normRaw.replace(/[^a-z0-9]/g, '_');
  const safeCat = categoryName.replace(/[^a-z0-9]/gi, '_');
  const uniqueId = matchedItem?.id
    ? `${matchedItem.id}_${safeCat}_${safeRaw}`
    : `pkg_dish_${safeCat}_${safeRaw}`;

  return {
    id: uniqueId,
    name: matchedItem?.name || rawName,
    displayName: rawName,
    category: categoryName || matchedItem?.category || 'Catering Selection',
    description,
    image,
    isVeg: matchedItem ? Boolean(matchedItem.isVeg) : isVeg,
    price: matchedItem?.price,
    serving: matchedItem?.serving || 'Freshly prepared at live banquet counters',
    tags: matchedItem?.tags || [categoryName, isVeg ? 'Pure Veg' : 'Non-Veg', 'Banquet Selection'],
    isPopular: matchedItem?.isPopular ?? false,
    isFeatured: matchedItem?.isFeatured ?? false,
    isOdiaSpecialty: matchedItem?.isOdiaSpecialty ?? (normRaw.includes('odia') || normRaw.includes('dahibara') || normRaw.includes('chhena') || normRaw.includes('chakuli') || normRaw.includes('besar')),
    packageContext: packageContextName,
  };
}
