// scripts/build_master_catalog.js
import fs from 'fs';
import path from 'path';

const flatDishes = JSON.parse(fs.readFileSync('./scripts/flat_367_dishes.json', 'utf8'));

// 1. Direct local assets for authentic Odia specialties
const localAssets = {
  menu_2: '/images/dishes/Badam_Milk_Drink.jpg',
  menu_22: '/images/dishes/Dahibara_Aludam.jpg',
  menu_24: '/images/dishes/Pav_bhaji__2.jpg',
  menu_25: '/images/dishes/live-panipuri.jpg',
  menu_52: '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  menu_240: '/images/dishes/macha-besara.jpg',
  menu_284: '/images/dishes/odia-mutton-kasa.jpg',
  menu_295: '/images/dishes/dahi-pakhala.jpg',
  menu_300: '/images/dishes/odia-dalma.jpg',
  menu_365: '/images/dishes/chhena-poda.jpg'
};

// 2. High quality, verified Unsplash photos for dishes where Unsplash has pristine studio photography
const verifiedUnsplash = {
  menu_1: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80', // Milk Shake
  menu_3: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80', // Lassi
  menu_4: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80', // Soft Drink / Cola
  menu_5: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80', // Fruit Juice / Orange
  menu_7: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&q=80', // Hot Coffee
  menu_8: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80', // Cold Coffee
  menu_9: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=800&q=80', // Masala Tea
  menu_10: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80', // Lemon Tea
  menu_11: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80', // Green Tea
  menu_12: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', // Mocktail
  menu_14: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80', // Lemon Water
  menu_15: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80', // Mineral Water
  menu_16: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80', // Tomato Soup
  menu_17: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=800&q=80', // Veg Sweet Corn Soup
  menu_18: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80', // Veg Hot & Sour Soup
  menu_19: 'https://images.unsplash.com/photo-1616501268209-edffe01a2386?auto=format&fit=crop&w=800&q=80', // Veg Manchow Soup
  menu_20: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80', // Non Veg Soup
  menu_21: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80', // Papudi Chaat
  menu_23: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', // Samosa Chaat
  menu_27: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80', // Chhole Bhature
  menu_28: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80', // Matar Kulcha
  menu_29: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', // Idli Sambhar
  menu_30: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80', // Dosa Sambar
  menu_31: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281781?auto=format&fit=crop&w=800&q=80', // Pasta Counter
  menu_32: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80', // Chowmein
  menu_33: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80', // Veg Roll
  menu_34: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80', // Egg / Chicken Roll
  menu_332: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', // Russian Salad
  menu_333: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80', // Street Corn Pasta
  menu_334: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80', // Choice Of Pasta
  menu_335: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80', // Cheese Ball
  menu_336: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80', // Cheese Cherry Pineapple
  menu_337: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', // Saute Veg
  menu_338: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80', // Continental Roast Chicken
  menu_340: 'https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?auto=format&fit=crop&w=800&q=80', // Au Gratin
  menu_341: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80', // Rice Kheer
  menu_357: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80', // Gulab Jamun
  menu_358: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80', // Fruit Custard
  menu_366: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80', // Ice Cream
  menu_367: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80', // Kulfi
};

// 3. Search query keywords customized for each dish to query Wikimedia Commons
const queryKeywords = {
  menu_6: ['Aam Panna', 'Raw mango drink'],
  menu_13: ['Jaljeera drink', 'Jaljeera'],
  menu_26: ['Aloo Tikki', 'Alu Tikki'],
  menu_35: ['Crispy fried corn', 'Corn fritters Indian'],
  menu_36: ['Sweet corn chaat', 'Boiled corn Indian'],
  menu_37: ['Crispy baby corn', 'Baby corn fry'],
  menu_38: ['Roasted chana', 'Chana masala dry'],
  menu_39: ['Soya chaap', 'Soya tikka'],
  menu_40: ['Bread basket snack', 'Potato basket chaat'],
  menu_41: ['Arancini cheese ball', 'Rice cheese ball'],
  menu_42: ['Veg lollipop', 'Vegetable lollipop'],
  menu_43: ['Hara bhara kabab', 'Veg kabab green'],
  menu_44: ['Pakora platter', 'Assorted pakoda'],
  menu_45: ['French fries', 'Finger chips'],
  menu_46: ['Vegetable cutlet', 'Veg cutlet Indian'],
  menu_47: ['Bread chop', 'Bread pakora'],
  menu_48: ['Paneer tikka skewer', 'Paneer shashlik'],
  menu_49: ['Paneer kofta', 'Paneer dumpling'],
  menu_50: ['Crispy paneer', 'Chilli paneer dry'],
  menu_51: ['Paneer fingers', 'Paneer finger fry'],
  menu_53: ['Paneer chatpata', 'Achari paneer'],
  menu_54: ['Tandoori paneer tikka', 'Paneer tikka tandoor'],
  menu_55: ['Paneer pakoda', 'Paneer pakora'],
  menu_56: ['Paneer 65', 'Paneer sixty five'],
  menu_57: ['Paneer roll', 'Kathi roll paneer'],
  menu_58: ['Paneer kurkure', 'Kurkure paneer'],
  menu_59: ['Paneer koliwada', 'Fried paneer'],
  menu_60: ['Mushroom kurkure', 'Crispy mushroom'],
  menu_61: ['Mushroom chilli dry', 'Chilli mushroom'],
  menu_62: ['Mushroom tikka', 'Grilled mushroom'],
  menu_63: ['Mushroom salt and pepper', 'Stir fry mushroom'],
  menu_64: ['Stuffed mushroom', 'Mushroom pakoda'],
  menu_65: ['Baby corn chilli', 'Chilli baby corn'],
  menu_66: ['Fish finger', 'Fried fish finger'],
  menu_67: ['Fish cutlet', 'Indian fish cutlet'],
  menu_68: ['Fish pakoda', 'Fish pakora'],
  menu_69: ['Fish fry Indian', 'Fried fish masala'],
  menu_70: ['Fish tikka', 'Tandoori fish tikka'],
  menu_71: ['Fish roll', 'Kathi roll fish'],
  menu_72: ['Fish orly', 'Batter fish'],
  menu_73: ['Fish chop', 'Bengali fish chop'],
  menu_74: ['Fish kabab', 'Fish seekh kabab'],
  menu_75: ['Fish koliwada', 'Koliwada fish'],
  menu_76: ['Fish patrapoda', 'Paturi fish'],
  menu_77: ['Fish lollypop', 'Fish lollipop'],
  menu_78: ['Prawn butterfly', 'Fried butter prawn'],
  menu_79: ['Prawn chilli dry', 'Chilli prawn'],
  menu_80: ['Prawn pakoda', 'Prawn pakora'],
  menu_81: ['Prawn golden fry', 'Crispy prawn'],
  menu_82: ['Prawn koliwada', 'Tawa prawn'],
  menu_83: ['Chicken lollipop', 'Chicken lollypop'],
  menu_84: ['Chicken pakoda', 'Chicken pakora'],
  menu_85: ['Chicken 65', 'Chicken sixty five'],
  menu_86: ['Chicken wings Indian', 'Hot wings'],
  menu_87: ['Chicken drumstick', 'Tandoori tangdi'],
  menu_88: ['Chicken cutlet', 'Minced chicken cutlet'],
  menu_89: ['Chicken popcorn', 'Crispy chicken bites'],
  menu_90: ['Chicken seekh kabab', 'Seekh kabab'],
  menu_91: ['Chicken reshmi kabab', 'Reshmi kabab'],
  menu_92: ['Chicken malai tikka', 'Malai chicken tikka'],
  menu_93: ['Chicken hariyali kabab', 'Hariyali chicken'],
  menu_94: ['Chicken banjara kabab', 'Spicy chicken tikka'],
  menu_95: ['Tandoori chicken whole', 'Tandoori chicken platter'],
  menu_96: ['Boiled egg', 'Egg boiled salt pepper'],
  menu_97: ['Omelette Indian', 'Masala omelette'],
  menu_98: ['Poached egg', 'Sunny side up egg'],
  menu_99: ['Egg bhurji', 'Indian scrambled egg'],
  menu_100: ['Egg chop', 'Egg devil Kolkata'],
  menu_101: ['Egg pakoda', 'Egg pakora'],
  menu_102: ['Tandoori roti', 'Roti tandoor'],
  menu_103: ['Butter roti', 'Tawa butter roti'],
  menu_104: ['Plain naan', 'Naan bread'],
  menu_105: ['Butter naan', 'Garlic butter naan'],
  menu_106: ['Garlic naan', 'Tandoori garlic naan'],
  menu_107: ['Laccha paratha', 'Lachha paratha tandoor'],
  menu_108: ['Rumali roti', 'Roomali roti folded'],
  menu_109: ['Missi roti', 'Besan missi roti'],
  menu_110: ['Stuffed kulcha', 'Amritsari kulcha'],
  menu_111: ['Puri Indian bread', 'Poori golden fried'],
  menu_112: ['Bhatura', 'Bhature puffed'],
  menu_113: ['Kachori', 'Khasta kachori'],
  menu_114: ['Puri sabzi', 'Luchi Bengali'],
  menu_115: ['Radhaballabhi', 'Stuffed puri'],
  menu_116: ['Methi paratha', 'Fenugreek paratha'],
  menu_117: ['Aloo paratha', 'Stuffed potato paratha'],
  menu_118: ['Gobi paratha', 'Cauliflower paratha'],
  menu_119: ['Paneer paratha', 'Stuffed paneer paratha'],
  menu_120: ['Mughlai paratha', 'Folded stuffed paratha'],
  menu_121: ['Chakuli pitha', 'Odia chakuli'],
  menu_122: ['Dosa plain', 'Sada dosa'],
  menu_123: ['Masala dosa', 'Crisp masala dosa'],
  menu_124: ['Uttapam', 'Onion uttapam'],
  menu_125: ['Steamed rice', 'Plain basmati rice bowl'],
  menu_126: ['Jeera rice', 'Cumin flavored rice'],
  menu_127: ['Ghee rice', 'Neychoru ghee rice'],
  menu_128: ['Peas pulao', 'Matar pulao rice'],
  menu_129: ['Vegetable pulao', 'Veg pulao basmati'],
  menu_130: ['Kashmiri pulao', 'Fruit nut pulao'],
  menu_131: ['Navratan pulao', 'Royal veg pulao'],
  menu_132: ['Veg biryani', 'Vegetable dum biryani'],
  menu_133: ['Paneer biryani', 'Cottage cheese biryani'],
  menu_134: ['Mushroom biryani', 'Wild mushroom rice'],
  menu_135: ['Egg biryani', 'Boiled egg biryani'],
  menu_136: ['Chicken biryani', 'Hyderabadi chicken biryani'],
  menu_137: ['Chicken dum biryani', 'Kolkata chicken biryani'],
  menu_138: ['Chicken tikka biryani', 'Tandoori chicken biryani'],
  menu_139: ['Mutton biryani', 'Awadhi mutton biryani'],
  menu_140: ['Mutton dum biryani', 'Kolkata mutton biryani'],
  menu_141: ['Fish biryani', 'Seafood biryani'],
  menu_142: ['Prawn biryani', 'Chingri biryani'],
  menu_143: ['Curd rice', 'Thayyir sadam dahi bhat'],
  menu_144: ['Lemon rice', 'Chitranna lemon rice'],
  menu_145: ['Veg fried rice', 'Indo chinese fried rice'],
  menu_146: ['Chicken fried rice', 'Wok chicken fried rice'],
  menu_147: ['Plain dal', 'Boiled toor dal'],
  menu_148: ['Dal fry', 'Yellow dal fry tadka'],
  menu_149: ['Dal butter fry', 'Butter dal fry'],
  menu_150: ['Dal makhani', 'Maa ki dal makhani'],
  menu_151: ['Dal tadka', 'Lentil tadka garlic cumin'],
  menu_152: ['Panchmel dal', 'Rajasthani dal baati dal'],
  menu_153: ['Dal bukhara', 'Black urad dal slow cooked'],
  menu_154: ['Dal maharani', 'Royal rich dal'],
  menu_155: ['Coconut dal', 'Cholar dal nolen gur'],
  menu_156: ['Gujarati khatti meethi dal', 'Sweet sour dal'],
  menu_157: ['Lemon dal', 'Nimmakaya pappu'],
  menu_158: ['Masala dal', 'Mixed spicy dal'],
  menu_159: ['Vegetable dal', 'Dal with seasonal vegetables'],
  menu_160: ['Mughlai dal meat', 'Dal gosht mutton dal'],
  menu_161: ['Tomato chutney Indian', 'Sweet tomato dates chutney'],
  menu_162: ['Dry fruit chutney', 'Kashmiri walnut apple chutney'],
  menu_163: ['Pumpkin chutney', 'Kaddu chutney'],
  menu_164: ['Kashmiri chutney', 'Mooli chutney walnut'],
  menu_165: ['Plastic chutney raw papaya', 'Papaya sweet chutney'],
  menu_166: ['Mango jelly chutney', 'Aam papad sweet pickle'],
  menu_167: ['Achari baingan', 'Eggplant pickle curry'],
  menu_168: ['Dahi baingan', 'Odia dahi baigana'],
  menu_169: ['Coconut pachadi', 'Nadia pachedi curd coconut'],
  menu_170: ['Boondi raita', 'Curd boondi raita'],
  menu_171: ['Dahi vada', 'Dahibara yogurt vada'],
  menu_172: ['Dahi pakodi', 'Besan pakodi yogurt'],
  menu_173: ['Kadhi pakora', 'Punjabi dahi kadhi'],
  menu_174: ['Green salad Indian', 'Cucumber tomato onion salad'],
  menu_175: ['Roasted papad', 'Papadum roasted'],
  menu_176: ['Mix vegetable curry', 'Mixed vegetable sabzi'],
  menu_177: ['Veg do pyaza', 'Onion rich veg curry'],
  menu_178: ['Kadai veg', 'Kadhai vegetable capsicum'],
  menu_179: ['Veg jaipuri', 'Papad topped vegetable curry'],
  menu_180: ['Veg jalfrezi', 'Stir fry bell pepper veg'],
  menu_181: ['Veg butter masala', 'Creamy butter vegetable curry'],
  menu_182: ['Navratan korma', 'White cashew veg korma'],
  menu_183: ['Veg kundan masala', 'Rich gold vegetable curry'],
  menu_184: ['Veg punjabi masala', 'Spicy punjabi sabzi'],
  menu_185: ['Veg korma rich', 'Special vegetable banquet curry'],
  menu_186: ['Veg kadambari', 'Exotic dry nut vegetable curry'],
  menu_187: ['Malai kofta', 'Vegetable kofta curry'],
  menu_188: ['Bharwan shimla mirch', 'Stuffed capsicum potato'],
  menu_189: ['Veg soya kheema', 'Vegetarian minced curry'],
  menu_190: ['Veg hariyali', 'Spinach green gravy vegetable'],
  menu_191: ['Veg nawabi', 'Mughlai veg curry'],
  menu_192: ['Hyderabadi veg kurma', 'Spicy coconut veg curry'],
  menu_193: ['Aloo gobi masala', 'Cauliflower potato gravy'],
  menu_194: ['Aloo gobi dry', 'Roasted cauliflower potato'],
  menu_195: ['Gobi mughlai', 'Creamy cauliflower korma'],
  menu_196: ['Aloo dum', 'Dum aloo gravy'],
  menu_197: ['Kashmiri dum aloo', 'Red gravy dum aloo'],
  menu_198: ['Aloo mughlai', 'Royal potato curry'],
  menu_199: ['Bharwan aloo', 'Stuffed potato curry'],
  menu_200: ['Aloo bhujia crispy', 'Crispy fried potato strips'],
  menu_201: ['Aloo potol rasa', 'Pointed gourd potato curry'],
  menu_202: ['Potol korma', 'Pointed gourd korma'],
  menu_203: ['Dahi potol', 'Yogurt parwal curry'],
  menu_204: ['Parwal methi malai', 'Creamy pointed gourd fenugreek'],
  menu_205: ['Potol jhal', 'Spicy mustard pointed gourd'],
  menu_206: ['Dahi bhindi', 'Okra cooked in seasoned yogurt'],
  menu_207: ['Bhindi masala', 'Spiced okra curry'],
  menu_208: ['Kurkuri bhindi', 'Crispy fried okra'],
  menu_209: ['Tawa sabzi', 'Mixed vegetables on tawa'],
  menu_210: ['Stir fried vegetables', 'Tawa bhaji dry'],
  menu_211: ['Besan aloo sabzi', 'Gram flour dumpling potato curry'],
  menu_212: ['Chana masala curry', 'Pindi chana chickpeas'],
  menu_213: ['Mushroom masala', 'Button mushroom curry'],
  menu_214: ['Mushroom do pyaza', 'Mushroom with double onions'],
  menu_215: ['Kadai mushroom', 'Kadhai mushroom bell pepper'],
  menu_216: ['Mushroom butter masala', 'Creamy butter mushroom curry'],
  menu_217: ['Mushroom mustard curry', 'Odia chatu besar'],
  menu_218: ['Hyderabadi mushroom', 'Spicy mint mushroom curry'],
  menu_219: ['Chilli mushroom gravy', 'Indo chinese mushroom gravy'],
  menu_220: ['Mushroom fry', 'Spicy mushroom tawa fry'],
  menu_221: ['Matar paneer', 'Green peas cottage cheese curry'],
  menu_222: ['Paneer butter masala', 'Butter paneer makhani'],
  menu_223: ['Kadai paneer', 'Kadhai paneer capsicum'],
  menu_224: ['Paneer korma', 'Shahi paneer white gravy'],
  menu_225: ['Paneer kofta curry', 'Cottage cheese dumplings in gravy'],
  menu_226: ['Paneer hyderabadi', 'Green masala paneer curry'],
  menu_227: ['Paneer punjabi', 'Dhaba style paneer masala'],
  menu_228: ['Paneer makhani', 'Velvety makhani paneer'],
  menu_229: ['Paneer bhurji gravy', 'Scrambled paneer curry'],
  menu_230: ['Paneer bhurji dry', 'Dry scrambled paneer capsicum'],
  menu_231: ['Palak paneer', 'Spinach cottage cheese curry'],
  menu_232: ['Corn paneer masala', 'Sweet corn paneer curry'],
  menu_233: ['Methi malai paneer', 'Fenugreek cream paneer curry'],
  menu_234: ['Chilli paneer gravy', 'Indo chinese chilli paneer gravy'],
  menu_235: ['Paneer finger masala', 'Paneer fingers in tomato onion gravy'],
  menu_236: ['Paneer pasanda', 'Stuffed paneer in rich gravy'],
  menu_237: ['Paneer tikka masala', 'Charred paneer tikka in butter gravy'],
  menu_238: ['Paneer takatak', 'Tawa spicy paneer masala'],
  menu_239: ['Tiranga paneer', 'Tri color layered paneer'],
  menu_241: ['Fish fry plate', 'Indian spicy fish fry'],
  menu_242: ['Steamed fish Bengali', 'Bhapa machh mustard steamed fish'],
  menu_243: ['Macher kalia', 'Bengali rohu fish kalia'],
  menu_244: ['Bengali macher jhol', 'Light fish curry potatoes'],
  menu_245: ['Dahi machha', 'Fish in seasoned yogurt curry'],
  menu_246: ['Shorshe ilish', 'Mustard fish curry hilsa rohu'],
  menu_247: ['Tawa fish fry', 'Pan fried seasoned fish fillet'],
  menu_248: ['Pomfret masala', 'Spicy pomfret fish curry'],
  menu_249: ['Tawa pomfret fry', 'Crispy whole pomfret fry'],
  menu_250: ['Crab masala Indian', 'Spicy crab roast curry'],
  menu_251: ['Chilli prawn gravy', 'Indo chinese prawn chilli'],
  menu_252: ['Prawn masala dry', 'Spicy prawn roast masala'],
  menu_253: ['Prawn do pyaza', 'Prawns cooked with caramelised onions'],
  menu_254: ['Chingri malai curry', 'Prawn coconut milk malai curry'],
  menu_255: ['Prawn curry Indian', 'Coastal prawn masala curry'],
  menu_256: ['Prawn makhani', 'Butter prawn tomato cream curry'],
  menu_257: ['Mustard prawn curry', 'Shorshe chingri mustard prawns'],
  menu_258: ['Chicken curry homestyle', 'Indian chicken curry gravy'],
  menu_259: ['Chicken masala gravy', 'Spicy chicken masala curry'],
  menu_260: ['Chicken do pyaza', 'Chicken with diced onions gravy'],
  menu_261: ['Hyderabadi chicken curry', 'Spicy coconut chicken hyderabadi'],
  menu_262: ['Butter chicken', 'Murgh makhani butter chicken'],
  menu_263: ['Chicken tikka masala', 'Grilled chicken pieces in spicy sauce'],
  menu_264: ['Chicken ghee roast', 'Mangalore chicken ghee roast'],
  menu_265: ['Shahi chicken korma', 'Royal white chicken korma'],
  menu_266: ['Mughlai chicken curry', 'Egg enriched chicken mughlai'],
  menu_267: ['Murgh musallam', 'Whole spiced roast chicken Indian'],
  menu_268: ['Hariyali chicken curry', 'Green coriander mint chicken'],
  menu_269: ['Palak chicken', 'Saag chicken spinach curry'],
  menu_270: ['Dum ka chicken', 'Slow cooked sealed chicken curry'],
  menu_271: ['Lachha chicken', 'Shredded chicken in rich butter gravy'],
  menu_272: ['Chicken leg curry', 'Tender chicken drumstick gravy'],
  menu_273: ['Tangdi kabab masala', 'Roasted chicken drumsticks in masala'],
  menu_274: ['Chicken bharta', 'Creamy shredded chicken bharta with egg'],
  menu_275: ['Chicken kassa', 'Thick dark chicken kassa gravy'],
  menu_276: ['Chicken chaap', 'Kolkata Mughlai chicken chaap'],
  menu_277: ['Cuttack chicken curry', 'Odia koli chicken kassa'],
  menu_278: ['Mutton curry Indian', 'Classic homestyle mutton goat curry'],
  menu_279: ['Mutton masala gravy', 'Spicy goat meat masala curry'],
  menu_280: ['Mutton rogan josh', 'Kashmiri rogan josh lamb curry'],
  menu_281: ['Mutton butter masala', 'Creamy mutton makhani curry'],
  menu_282: ['Mutton bhuna gosht', 'Slow roasted bhuna mutton'],
  menu_283: ['Hyderabadi mutton korma', 'Spicy hyderabadi mutton gravy'],
  menu_285: ['Mutton ghee roast', 'Mangalorean mutton ghee roast dry'],
  menu_286: ['Mutton keema masala', 'Minced goat meat keema peas'],
  menu_287: ['Chuna macha besar', 'Small fish fried in mustard paste'],
  menu_288: ['Macha munda ghanta', 'Fish head mixed vegetable curry'],
  menu_289: ['Mudhi ghanta', 'Odia fish head chana dal ghanta'],
  menu_290: ['Poi chingudi ghanta', 'Malabar spinach and prawn curry'],
  menu_291: ['Macha ambila', 'Sweet and sour Odia fish curry'],
  menu_292: ['Chingudi dalma', 'Prawn cooked with lentils and raw vegetables'],
  menu_293: ['Chingudi checha', 'Crushed roasted prawn with garlic mustard oil'],
  menu_294: ['Macha checha', 'Mashed roasted fish with green chillies mustard'],
  menu_296: ['Kanika sweet pulao', 'Odia sweet aromatic rice kanika'],
  menu_297: ['Pakhala bhata', 'Fermented water rice Odia feast'],
  menu_298: ['Boiled rice Odia', 'Usuna bhata cooked boiled rice'],
  menu_299: ['Mitha dali Puri temple', 'Sweet toor dal Puri Jagannath temple'],
  menu_301: ['Tomato khajur khatta', 'Tomato dates sweet sour chutney Odia'],
  menu_302: ['Ambula khatta', 'Dried mango sweet sour curry'],
  menu_303: ['Aam khatta', 'Raw mango sweet sour chutney'],
  menu_304: ['Ou khatta', 'Elephant apple sweet sour relish Odia'],
  menu_305: ['Kandamula khatta', 'Sweet potato sweet sour curry'],
  menu_306: ['Dahi ambula', 'Sun dried mango in seasoned curd'],
  menu_307: ['Nadia pachedi curd', 'Grated coconut in tempered yogurt'],
  menu_308: ['Dahi baigana', 'Fried eggplant in tempered seasoned curd'],
  menu_309: ['Kakharu khatta', 'Pumpkin sweet and sour relish'],
  menu_310: ['Sadda besar', 'Pure vegetarian mixed vegetables in mustard gravy'],
  menu_311: ['Mahura curry Odia', 'Temple style mixed vegetable mahura'],
  menu_312: ['Santula mix', 'Light boiled vegetable stir fry Odia'],
  menu_313: ['Chhuin aloo besar', 'Drumsticks and potato in mustard paste'],
  menu_314: ['Odia santula', 'Mild tempered boiled vegetables santula'],
  menu_315: ['Lau badi nadia besar', 'Bottle gourd badi coconut mustard curry'],
  menu_316: ['Badi besar', 'Sun dried urad dal dumplings in mustard gravy'],
  menu_317: ['Badi chura', 'Crushed fried badi with garlic and mustard oil'],
  menu_318: ['Saga muga', 'Spinach cooked with roasted yellow moong dal'],
  menu_319: ['Aloo posto', 'Potatoes cooked in rich white poppy seed paste'],
  menu_320: ['Janhi posto', 'Ridge gourd in poppy seed paste'],
  menu_321: ['Potal aloo rasa', 'Pointed gourd and potato in ginger tomato gravy'],
  menu_322: ['Saga besar', 'Green leafy vegetables cooked in mustard paste'],
  menu_323: ['Saga bhaja', 'Stir fried leafy greens with garlic and badi'],
  menu_324: ['Chhena tarkari Odia', 'Fresh cottage cheese roundels in light gravy'],
  menu_325: ['Chuin aloo bhaja', 'Stir fried drumsticks and potatoes'],
  menu_326: ['Baingan bharta roasted', 'Fire roasted mashed eggplant bharta'],
  menu_327: ['Aloo chokha', 'Spicy mashed potato aloo bharta'],
  menu_328: ['Tomato poda', 'Fire roasted charred tomato relish Odia'],
  menu_329: ['Begun bhaja', 'Crispy round pan fried eggplant slices'],
  menu_330: ['Kacha kadali bhaja', 'Pan fried raw plantain banana slices'],
  menu_331: ['Chatu besar Odia', 'Straw mushrooms cooked in mustard paste'],
  menu_339: ['Vegetable stew coconut milk', 'Kerala style vegetable stew'],
  menu_342: ['Chhena payas', 'Cottage cheese kheer payesh'],
  menu_343: ['Jhili sweet Odia', 'Nimapara jhili sweet'],
  menu_344: ['Sitabhog sweet', 'Sitabhog vermicelli cottage cheese sweet'],
  menu_345: ['Makhana kheer', 'Fox nut pudding in thickened milk'],
  menu_346: ['Seviyan kheer', 'Vermicelli payasam seviyan'],
  menu_347: ['Gajar kheer', 'Carrot payasam pudding'],
  menu_348: ['Kheer sagar Odia', 'Mini rasgullas in rabdi milk'],
  menu_349: ['Moong dal halwa', 'Rich golden halwa with ghee cashews'],
  menu_350: ['Imarti sweet', 'Crispy floral urad dal imarti in syrup'],
  menu_351: ['Shahi tukda', 'Awadhi fried bread royal rabdi sweet'],
  menu_352: ['Fruit cream dessert', 'Fresh mixed fruit salad with sweet cream'],
  menu_353: ['Hot jalebi', 'Crispy spiral golden jalebi in saffron syrup'],
  menu_354: ['White rasgulla', 'Spongy chhena rasgulla in light syrup'],
  menu_355: ['Baked rasgulla', 'Caramelised baked rasgulla in thickened rabdi'],
  menu_356: ['Baked boondi rabdi', 'Baked sweet boondi with pistachio rabdi'],
  menu_359: ['Malpua with rabdi', 'Fried sweet pancake dipped in sugar syrup'],
  menu_360: ['Rabdi dessert', 'Thick layered clotted milk rabri with pistachio'],
  menu_361: ['Rasmalai sweet', 'Soft cottage cheese discs in saffron milk'],
  menu_362: ['Kendrapara rasabali', 'Fried chhena patties in spiced thick milk'],
  menu_363: ['Rajbhog sweet', 'Large golden saffron stuffed rasgulla'],
  menu_364: ['Chhena jhilli Nimapara', 'Fried cottage cheese rolls in sweet syrup']
};

const NON_VEG_WORDS = ['chicken', 'mutton', 'beef', 'pork', 'fish', 'prawn', 'shrimp', 'crab', 'lamb', 'meat', 'egg', 'machha', 'chingudi'];

async function searchCommons(query) {
  try {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(query + ' filetype:bitmap') + '&gsrlimit=6&prop=imageinfo&iiprop=url|size&iiurlwidth=800&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': 'ADCateringWebsite/1.0 (contact@adcatering.com)' } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages).map(p => ({
      title: p.title || '',
      url: p.imageinfo && p.imageinfo[0] ? (p.imageinfo[0].thumburl || p.imageinfo[0].url) : null
    })).filter(x => x.url);
  } catch (err) {
    return [];
  }
}

async function resolveAll() {
  console.log('Resolving accurate images for all 367 dishes...');
  const usedUrls = new Set();
  const masterCatalog = {};

  // First pass: assign local assets & verified Unsplash
  for (const dish of flatDishes) {
    const id = dish.id;
    if (localAssets[id]) {
      const url = localAssets[id];
      masterCatalog[id] = { ...dish, image: url };
      usedUrls.add(url);
    } else if (verifiedUnsplash[id]) {
      const url = verifiedUnsplash[id];
      masterCatalog[id] = { ...dish, image: url };
      usedUrls.add(url);
    }
  }

  console.log(`Initial direct assignments: ${Object.keys(masterCatalog).length}`);

  // Second pass: query-based items
  let queryCount = 0;
  for (const dish of flatDishes) {
    const id = dish.id;
    if (masterCatalog[id]) continue; // already assigned

    const queries = queryKeywords[id] || [dish.name, dish.name + ' Indian food'];
    let selectedUrl = null;

    for (const q of queries) {
      const candidates = await searchCommons(q);
      for (const cand of candidates) {
        const titleLower = cand.title.toLowerCase();
        const urlLower = cand.url.toLowerCase();

        // Diet check: if veg, avoid non-veg words
        if (dish.isVeg) {
          const hasNonVeg = NON_VEG_WORDS.some(w => titleLower.includes(w) || urlLower.includes(w));
          if (hasNonVeg) continue;
        }

        // Avoid SVG or icons or maps
        if (titleLower.includes('map') || titleLower.includes('icon') || titleLower.includes('logo') || titleLower.includes('diagram')) {
          continue;
        }

        // Uniqueness check
        if (!usedUrls.has(cand.url)) {
          selectedUrl = cand.url;
          usedUrls.add(selectedUrl);
          break;
        }
      }
      if (selectedUrl) break;
    }

    // Fallback if Wikimedia had no unique match
    if (!selectedUrl) {
      console.warn(`[WARN] No unique candidate for ${id}: ${dish.name}. Using category query...`);
      const catCandidates = await searchCommons(dish.category + ' dish food');
      for (const cand of catCandidates) {
        if (!usedUrls.has(cand.url)) {
          if (dish.isVeg && NON_VEG_WORDS.some(w => cand.title.toLowerCase().includes(w))) continue;
          selectedUrl = cand.url;
          usedUrls.add(selectedUrl);
          break;
        }
      }
    }

    masterCatalog[id] = {
      ...dish,
      image: selectedUrl || '/images/royal-odia-feast.jpg'
    };
    queryCount++;
    if (queryCount % 25 === 0 || queryCount === flatDishes.length) {
      console.log(`Processed ${queryCount} / ${flatDishes.length - 50} query items...`);
    }
  }

  // Verification of results
  const items = Object.values(masterCatalog);
  console.log(`\n================ RESULT SUMMARY ================`);
  console.log(`Total items resolved: ${items.length} / 367`);
  const finalUrls = new Set(items.map(i => i.image));
  console.log(`Total unique image URLs: ${finalUrls.size}`);
  
  const dupes = {};
  items.forEach(i => {
    dupes[i.image] = (dupes[i.image] || 0) + 1;
  });
  const dupeList = Object.entries(dupes).filter(([_, c]) => c > 1);
  console.log(`Duplicate URLs count: ${dupeList.length}`);
  if (dupeList.length > 0) {
    console.error('Duplicates detected:', dupeList);
  }

  // Save to master_367_verified.json
  fs.writeFileSync('./scripts/master_367_verified.json', JSON.stringify(masterCatalog, null, 2));
  console.log('Saved master catalog to ./scripts/master_367_verified.json');
}

resolveAll().catch(console.error);
