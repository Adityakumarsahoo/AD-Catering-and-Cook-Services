const fs = require('fs');
const path = require('path');

const disheDir = path.join(__dirname, '../frontend/public/images/DISHE');
const disheFiles = fs.readdirSync(disheDir).sort();

// Create a fast lookup map of lower-case name to exact filename
const disheFileMap = new Map();
disheFiles.forEach(f => {
  disheFileMap.set(f.toLowerCase(), f);
});

// Load menu items
const { defaultMenuItems } = require('../frontend/src/data/defaultMenu.ts');
const { officialVegMenu } = require('../frontend/src/data/officialVegMenu.ts');
const dbPath = path.join(__dirname, '../backend/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('Total DISHE files available:', disheFiles.length);

// Rule-based matcher for any dish name
function findDisheImageForDish(name, category = '') {
  const n = name.trim().toLowerCase();
  const c = category.trim().toUpperCase();

  // 1. Direct name match to a file
  // e.g. "Aam Panna" -> "Aam Panna.png"
  const directPng = n + '.png';
  if (disheFileMap.has(directPng)) {
    return '/images/DISHE/' + disheFileMap.get(directPng);
  }

  // 2. Specific exact mappings
  // Welcome Drinks
  if (n === 'milk shake (badam / mango / pineapple / vanilla)' || n.includes('milk shake') || n.includes('milkshake')) {
    return '/images/DISHE/Milk Shake (Badam , Mango ,Pineapple ,Vanilla).png';
  }
  if (n === 'hot badam milk' || n === 'badam milk' || n.includes('badam kesar milk') || n === 'kesar milk') {
    return '/images/DISHE/Hot Badam Milk.png';
  }
  if (n === 'lassi (sweet)' || n === 'sweet lassi' || n === 'lassi') {
    return '/images/DISHE/Lassi (Sweet).png';
  }
  if (n === 'chanch' || n === 'dahi chhanch' || n.includes('dahi chhanch')) {
    return '/images/DISHE/Chanch.png';
  }
  if (n === 'fruit punch') return '/images/DISHE/Fruit Punch.png';
  if (n === 'aam panna') return '/images/DISHE/Aam Panna.png';
  if (n === 'thandai' || n.includes('thandai')) return '/images/DISHE/Thandai.png';
  if (n === 'falluda' || n.includes('falooda') || n === 'faluda') return '/images/DISHE/Falluda.png';
  if (n === 'jaljeera' || n.includes('jaljeera')) return '/images/DISHE/Jaljeera.png';
  if (n === 'lemon cold drinks' || n === 'lemon cold drink') return '/images/DISHE/Lemon Cold Drinks.png';
  if (n === 'cold drinks' || n === 'cold drink') return '/images/DISHE/Cold Drinks.png';
  if (n === 'masala cold drinks' || n === 'masala cold drink' || n === 'masala drinks') return '/images/DISHE/Masala Cold Drinks.png';
  if (n === 'mocktail' || n.includes('mocktail')) return '/images/DISHE/Mocktail.png';
  if (n === 'cold coffee') return '/images/DISHE/Cold Coffee.png';
  if (n === 'tea & coffee' || n === 'tea' || n === 'coffee') return '/images/DISHE/Tea & Coffee.png';

  // Soups
  if (n === 'cream of tomato soup' || n === 'tomato soup') return '/images/DISHE/Cream of Tomato Soup.png';
  if (n.includes('h / s') || n.includes('h  s') || n.includes('hot & sour') || n.includes('hot and sour') || n.includes('manchow')) {
    return '/images/DISHE/H  S Soup (Veg. & Non Veg.).png';
  }
  if (n.includes('s / c') || n.includes('s  c') || n.includes('sweet corn')) {
    return '/images/DISHE/S  C Soup (Veg. & Non Veg.).png';
  }
  if (n.includes('l / c') || n.includes('l  c') || (n.includes('lemon') && (n.includes('coriander') || n.includes('coriender')))) {
    return '/images/DISHE/L  C Soup (Veg. & Non Veg.).png';
  }
  if (n.includes('noodle soup')) return '/images/DISHE/Noodle Soup (Veg. & Non Veg.).png';

  // Counter Starters & Chaats
  if (n === 'panipuri' || n.includes('panipuri') || n === 'gupchup' || n.includes('gupchup') || n === 'golgappa') {
    return '/images/DISHE/PaniPuri.png';
  }
  if (n === 'papdi chaat' || n.includes('papudi') || n.includes('papdi')) return '/images/DISHE/Papdi Chaat.png';
  if (n === 'mix chaat' || n.includes('mix chaat')) return '/images/DISHE/Mix Chaat.png';
  if (n === 'dhokla chaat' || n.includes('dhokla')) return '/images/DISHE/Dhokla Chaat.png';
  if (n === 'samosa chaat' || n.includes('samosa chaat')) return '/images/DISHE/Samosa Chaat.png';
  if (n === 'aloo chaat' || n.includes('aloo chaat')) return '/images/DISHE/Aloo Chaat.png';
  if (n === 'dahi papdi' || n.includes('dahi papdi')) return '/images/DISHE/Dahi Papdi.png';
  if (n === 'dahiwada aloudum' || n.includes('dahiwada') || n.includes('dahibara') || n.includes('dahi vada') || n.includes('dahi bara')) {
    return '/images/DISHE/Dahiwada Aloudum.png';
  }
  if (n === 'raj kachodi' || n.includes('raj kachori') || n.includes('raj kachodi')) return '/images/DISHE/Raj Kachodi.png';
  if (n === 'gujia vada' || n.includes('gujia vada')) return '/images/DISHE/Gujia Vada.png';
  if (n.includes('mona')) return '/images/DISHE/Mona (Veg. & Non Veg..png';
  if (n === 'mini pizza' || n.includes('pizza')) return '/images/DISHE/Mini Pizza.png';
  if (n === 'pao bhaji' || n.includes('pav bhaji') || n.includes('pao bhaji')) return '/images/DISHE/Pao Bhaji.png';
  if (n === 'masala mudi' || n.includes('mudi') || n.includes('jhal muri')) return '/images/DISHE/Masala Mudi.png';

  // Starters (Veg)
  if (n === 'crispy corn' || n === 'american corn fry' || n.includes('american corn')) return '/images/DISHE/Crispy Masala Corn Bowl.png';
  if (n === 'boiled corn chaat' || n.includes('corn chaat')) return '/images/DISHE/Boiled Corn Chaat.png';
  if (n === 'dry chana roast') return '/images/DISHE/Dry Chana Roast.png';
  if (n === 'soya lollypop' || n === 'soya lollipop') return '/images/DISHE/Soya Lollypop.png';
  if (n === "bread's nest" || n === 'breads nest' || n === 'bread nest') return "/images/DISHE/Bread's Nest.png";
  if (n === 'cheesy potato rice ball' || n === 'mushroom cheese ball' || n.includes('cheese ball')) return '/images/DISHE/Cheesy Potato Rice Ball.png';
  if (n === 'veg lollypop' || n === 'veg lollipop') return '/images/DISHE/Veg Lollypop.png';
  if (n === 'harabhara kabab' || n === 'hara bhara kabab' || n.includes('harabara kabab') || n.includes('dahi kabab')) return '/images/DISHE/HaraBhara Kabab.png';
  if (n.includes('halakda')) return '/images/DISHE/Halakda (Veg. , Gobi, Mirchi, Paneer).png';
  if (n === 'finger chips' || n === 'french fries' || n.includes('finger chips')) return '/images/DISHE/Finger Chips.png';
  if (n === 'veg cutlet' || n.includes('cutlet')) return '/images/DISHE/Veg Cutlet.png';
  if (n === 'bread chop') return '/images/DISHE/Bread Chop.png';
  if (n === 'paneer stick tikka' || n === 'paneer shashlik') return '/images/DISHE/Paneer Stick Tikka.png';
  if (n === 'paneer kofta') return '/images/DISHE/Paneer Kofta.png';
  if (n === 'crispy paneer' || n === 'paneer crispy') return '/images/DISHE/Crispy Paneer.png';
  if (n === 'paneer finger') return '/images/DISHE/Paneer Finger.png';
  if (n === 'paneer popcorn') return '/images/DISHE/Paneer Popcorn.png';
  if (n === 'paneer chatpata') return '/images/DISHE/Paneer Chatpata.png';
  if (n === 'paneer tikka' || n.includes('paneer tikka')) return '/images/DISHE/Paneer Tikka.png';
  if (n === 'dragon (paneer)' || n.includes('dragon paneer')) return '/images/DISHE/Dragon (Paneer).png';
  if (n === 'paneer chilly' || n === 'mushroom chilly') return '/images/DISHE/Manchurian Chilly (Paneer, Mushroom, Gobi, Babycorn).png';
  if (n.includes('manchurian') && c.includes('VEG') && !n.includes('chicken')) return '/images/DISHE/Manchurian (Paneer, Mushroom, Babycorn, Gobi).png';
  if (n.includes('chilly') && c.includes('VEG') && !n.includes('chicken')) return '/images/DISHE/Chilly (Paneer, Mushroom, Gobi, Babycorn).png';
  if (n.includes('65') && c.includes('VEG') && !n.includes('prawn') && !n.includes('chicken')) return '/images/DISHE/65 (Paneer, Mushroom, Babycorn, Gobi).png';
  if (n.includes('hot garlic') && c.includes('VEG') && !n.includes('prawn')) return '/images/DISHE/Hot Garlic (Paneer, Mushroom, Babycorn, Gobi).png';
  if (n.includes('ginger') && c.includes('VEG') && !n.includes('prawn') && !n.includes('chicken')) return '/images/DISHE/Ginger (Paneer, Mushroom, Babycorn, Gobi).png';
  if (n.includes('schezwan') && c.includes('VEG') && !n.includes('rice') && !n.includes('chicken')) return '/images/DISHE/Schezwan (Paneer, Mushroom, Babycorn, Gobi).png';
  if (n === 'veg. chilli' || n === 'veg chilli') return '/images/DISHE/Veg. Chilli.png';
  if (n.includes('chiliese choppsy')) return '/images/DISHE/Veg. Chiliese Choppsy.png';
  if (n.includes('spring roll')) return '/images/DISHE/Veg. Spring Roll.png';
  if (n === 'veg china town') return '/images/DISHE/Veg China Town.png';

  // Starters (Non-Veg)
  if (n === 'fish finger (bone less)' || n === 'fish finger' || n.includes('fish finger')) return '/images/DISHE/Fish Finger (Bone Less).png';
  if (n === 'fish amritsari (bone less)' || n.includes('fish amritsari')) return '/images/DISHE/Fish Amritsari (Bone Less).png';
  if (n === 'fish chop (bone less)' || n.includes('fish chop')) return '/images/DISHE/Fish Chop (Bone Less).png';
  if (n === 'fish fry' || n.includes('fish fry')) return '/images/DISHE/Fish Fry.png';
  if (n === 'tandoori pomfret') return '/images/DISHE/Tandoori Pomfret.png';
  if (n === 'fried pomfret' || n.includes('pomfret')) return '/images/DISHE/Fried Pomfret.png';
  if (n === 'fish honey balls' || n.includes('honey ball')) return '/images/DISHE/Fish Honey Balls.png';
  if (n === 'prawn pokoda' || n.includes('prawn pakoda')) return '/images/DISHE/Prawn Pokoda.png';
  if (n === 'fried prawn') return '/images/DISHE/Fried Prawn.png';
  if (n === 'crispy prawn' || n.includes('prawn crispy')) return '/images/DISHE/Crispy Prawn.png';
  if (n === 'barley prawn') return '/images/DISHE/Barley Prawn.png';
  if (n === 'tandoori prawn') return '/images/DISHE/Tandoori Prawn.png';
  if (n === 'prawn salt & pepper') return '/images/DISHE/Prawn salt & Pepper.png';
  if (n === 'hot garlic prawn') return '/images/DISHE/Hot Garlic Prawn.png';
  if (n === 'ginger prawn') return '/images/DISHE/Ginger Prawn.png';
  if (n === 'prawn 65') return '/images/DISHE/Prawn 65.png';
  if (n === 'crunchi chicken' || n === 'crunchy chicken') return '/images/DISHE/Crunchy Chicken.png';
  if (n === 'chicken pokoda' || n.includes('chicken pakoda') || n.includes('chicken pokoda')) return '/images/DISHE/Chicken Pokoda.png';
  if (n === 'chicken popcorn') return '/images/DISHE/Chicken Popcorn.png';
  if (n === 'chicken ghee fry') return '/images/DISHE/Chicken Ghee Fry.png';
  if (n === 'honey chicken') return '/images/DISHE/Honey Chicken.png';
  if (n.includes('lollypop') && n.includes('chicken')) return '/images/DISHE/Chicken (Manchurian, Dragon, Schezwan, Chilly, Lollypop).png';
  if (n === 'chicken (manchurian/dragon/schezwan/chilly/lollypop)' || n.includes('chicken (tikka / lolipop)')) {
    return '/images/DISHE/Chicken (Manchurian, Dragon, Schezwan, Chilly, Lollypop).png';
  }
  if (n === 'tandoori chicken') return '/images/DISHE/Tandoori Chicken.png';
  if (n === 'chicken malai tikka' || n.includes('malai tikka')) return '/images/DISHE/Chicken Malai Tikka.png';
  if (n === 'assorted kebab (tikka/hariyali/malai)' || n.includes('assorted kebab') || n.includes('chicken kabab')) {
    return '/images/DISHE/Assorted Kebab (Tikka Hariyali Malai).png';
  }
  if (n === 'tangdi kebab') return '/images/DISHE/Tangdi Kebab.png';
  if (n === 'chicken leg kebab') return '/images/DISHE/Chicken Leg Kebab.png';
  if (n === 'garlic chicken') return '/images/DISHE/Garlic Chicken.png';
  if (n === 'ginger chicken') return '/images/DISHE/Ginger Chicken.png';

  // Eggs to Order
  if (n === 'boiled egg') return '/images/DISHE/Boiled Egg.png';
  if (n === 'egg poach') return '/images/DISHE/Egg Poach.png';
  if (n === 'egg omlet' || n.includes('omelette') || n.includes('omlet')) return '/images/DISHE/Egg Omlet.png';
  if (n === 'egg scotch' || n.includes('scotch egg') || n.includes('egg devil')) return '/images/DISHE/Egg Scotch.png';
  if (n === 'egg chop') return '/images/DISHE/Egg Chop.png';
  if (n === 'egg pakoda') return '/images/DISHE/Egg Pakoda.png';

  // Roti, Naan & Puri
  if (n === 'naan (plain/butter)' || n === 'butter naan' || n === 'plain naan' || n === 'naan') return '/images/DISHE/Naan (Plain Butter).png';
  if (n === 'garlic naan') return '/images/DISHE/Garlic Naan.png';
  if (n === 'tandoori roti') return '/images/DISHE/Tandoori Roti.png';
  if (n === 'phulka') return '/images/DISHE/Phulka.png';
  if (n === 'rumali roti' || n.includes('rumali roti')) return '/images/DISHE/Rumali Roti.png';
  if (n === 'missi roti') return '/images/DISHE/Missi Roti.png';
  if (n === 'thunka puri') return '/images/DISHE/Thunka Puri.png';
  if (n === 'chakuli' || n.includes('chakuli')) return '/images/DISHE/Chakuli.png';
  if (n === 'moong chilla') return '/images/DISHE/Moong Chilla.png';
  if (n === 'masala puri') return '/images/DISHE/Masala Puri.png';
  if (n === 'plane puri' || n === 'puri') return '/images/DISHE/Plane puri.png';
  if (n === 'pan puri') return '/images/DISHE/pan puri.png';
  if (n === 'milky puri') return '/images/DISHE/Milky puri.png';
  if (n === 'palak puri') return '/images/DISHE/Palak puri.png';
  if (n === 'beetu puri') return '/images/DISHE/Beetu puri.png';
  if (n === 'biri kachodi' || n.includes('biri kachodi') || n.includes('biri kachudi')) return '/images/DISHE/Biri kachodi.png';
  if (n === 'plane paratha' || n === 'paratha') return '/images/DISHE/Plane paratha.png';
  if (n === 'lachha paratha' || n.includes('lachha')) return '/images/DISHE/Lachha parata.png';
  if (n === 'paneer paratha') return '/images/DISHE/Paneer paratha.png';
  if (n === 'aloo paratha') return '/images/DISHE/Aloo paratha.png';
  if (n === 'vegetable paratha' || n === 'veg paratha') return '/images/DISHE/Vegetable paratha.png';
  if (n === 'battura' || n === 'bhatura') return '/images/DISHE/Battura.png';
  if (n === 'baby kulcha' || n.includes('kulcha')) return '/images/DISHE/Baby kulcha.png';

  // Rice / Pulao / Biryani
  if (n === 'plane rice' || n === 'steamed rice') return '/images/DISHE/Plane rice.png';
  if (n === 'jeera rice' || n.includes('jeera rice')) return '/images/DISHE/Jeera rice.png';
  if (n === 'chicken biryani' || n.includes('chicken biryani') || n.includes('chicken biriyani')) {
    return '/images/DISHE/CHICKEN BIRIYANI.png';
  }

  // Odia Curries & Specialties
  if (n === 'dalema' || n === 'dalma' || n === 'odia dalma' || n === 'temple dalma' || n === 'authentic dalma') {
    return '/images/DISHE/DALEMA.png';
  }
  if (n === 'paneer butter masala' || n.includes('paneer (masala/hydrabadi)') || n.includes('paneer pasinda')) {
    return '/images/DISHE/Paneer Butter Masala.png';
  }
  if (n === 'mutton curry' || n === 'odia mutton kasa' || n.includes('mutton rogan juice') || n.includes('mutton rogan josh')) {
    return '/images/DISHE/MUTTON CURRY.png';
  }
  if (n === 'chenna podo' || n === 'chhena poda' || n.includes('chenna poda') || n.includes('chhena podo')) {
    return '/images/DISHE/Chenna Podo.png';
  }

  return null;
}

// Test against all 367 dishes
let newlyMatched = 0;
let alreadyMatched = 0;
let unmatched = 0;
const usedDisheFilesSet = new Set();
const dishToImageMap = [];

defaultMenuItems.forEach(d => {
  const match = findDisheImageForDish(d.name, d.category);
  if (match) {
    usedDisheFilesSet.add(match.replace('/images/DISHE/', ''));
    dishToImageMap.push({ id: d.id, name: d.name, cat: d.category, img: match });
    if (d.image.startsWith('/images/DISHE/')) {
      alreadyMatched++;
    } else {
      newlyMatched++;
    }
  } else {
    unmatched++;
  }
});

console.log(`\nResults across all 367 defaultMenuItems:`);
console.log(`  Already using /images/DISHE/: ${alreadyMatched}`);
console.log(`  Newly matched to /images/DISHE/: ${newlyMatched}`);
console.log(`  Total matched to /images/DISHE/: ${alreadyMatched + newlyMatched} / 367`);
console.log(`  DISHE files matched to at least one dish: ${usedDisheFilesSet.size} / ${disheFiles.length}`);

const unusedFiles = disheFiles.filter(f => !usedDisheFilesSet.has(f));
console.log(`  Unused DISHE files count: ${unusedFiles.length}`);
if (unusedFiles.length > 0) {
  console.log('  Unused DISHE files:', unusedFiles);
}

module.exports = { findDisheImageForDish, disheFiles };

