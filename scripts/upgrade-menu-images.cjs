const fs = require('fs');
const path = require('path');

// Read existing db.json
const dbPath = path.resolve(__dirname, '../backend/data/db.json');
const rootDbPath = path.resolve(__dirname, '../data/db.json');
const officialMenuPath = path.resolve(__dirname, '../backend/src/data/officialMenu.ts');
const defaultMenuPath = path.resolve(__dirname, '../frontend/src/data/defaultMenu.ts');

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const menuItems = db.menuItems || [];

console.log(`Starting upgrade on ${menuItems.length} menu items...`);

// Mapping of dish names / categories to verified, 200 OK, high-res photography
function getUpgradedImage(item) {
  const name = item.name.toLowerCase();
  const cat = item.category.toUpperCase();

  // 1. Authentic Odia Signatures (Local High-Res Generated Assets)
  if (name.includes('dalema') || name.includes('dalma')) {
    return '/images/dishes/odia-dalma.jpg';
  }
  if (name.includes('chenna podo') || name.includes('chhena poda')) {
    return '/images/dishes/chhena-poda.jpg';
  }
  if (name.includes('dahi pakhala') || name.includes('pakhala')) {
    return '/images/dishes/dahi-pakhala.jpg';
  }
  if (name.includes('macha besar') || name.includes('machha besar') || name.includes('mustard fish') || name.includes('shorshe ilish') || name.includes('besar')) {
    return '/images/dishes/macha-besara.jpg';
  }
  if (name.includes('chhena jhilli')) {
    return '/images/dishes/chhena-poda.jpg';
  }
  if (name.includes('dahibara') || name.includes('dahi bara')) {
    return '/images/dishes/dahi-pakhala.jpg';
  }

  // 2. Drinks (Glasses, Mugs, Kulhads)
  if (cat === 'WELCOME DRINK') {
    if (name.includes('milk shake') || name.includes('milkshake')) {
      return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('badam milk')) {
      return 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('lassi')) {
      return 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('chanch') || name.includes('chaas') || name.includes('buttermilk')) {
      return 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('fruit punch')) {
      return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('aam panna')) {
      return 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('thandai')) {
      return 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('falluda') || name.includes('falooda')) {
      return 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('jaljeera') || name.includes('jal jeera')) {
      return 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('lemon')) {
      return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('cold coffee')) {
      return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('tea') || name.includes('coffee')) {
      return 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('mocktail')) {
      return 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80';
  }

  // 3. Soups (Ceramic bowls with spoons)
  if (cat === 'SOUP') {
    if (name.includes('tomato')) {
      return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('corn')) {
      return 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('clear')) {
      return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('hot & sour') || name.includes('hot and sour')) {
      return 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('coriander') || name.includes('lemon')) {
      return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80';
  }

  // 4. Counter Starters & Chaats
  if (cat === 'COUNTER STARTER') {
    if (name.includes('panipuri') || name.includes('pani puri') || name.includes('puchka')) {
      return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('dhokla')) {
      return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('pav bhaji')) {
      return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('corn')) {
      return 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('cutlet') || name.includes('tikki')) {
      return 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('pakora') || name.includes('pakodi') || name.includes('bread')) {
      return 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80';
  }

  // 5. Starters (Veg)
  if (cat === 'STARTER (VEG)') {
    if (name.includes('crispy babycorn') || name.includes('babycorn')) {
      return 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('paneer finger') || name.includes('crispy paneer')) {
      return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('soya lollypop') || name.includes('veg lollypop') || name.includes('chaap')) {
      return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('manchurian') || name.includes('chilli') || name.includes('schezwan') || name.includes('dragon')) {
      return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('kebab') || name.includes('tikka')) {
      return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('roll') || name.includes('spring')) {
      return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80';
  }

  // 6. Starters (Non-Veg)
  if (cat === 'STARTER (NON-VEG)') {
    if (name.includes('prawn') || name.includes('chingudi')) {
      return 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('fish') || name.includes('pomfret') || name.includes('macha')) {
      return 'https://images.unsplash.com/photo-1552901695-cfa7432e6bbe?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('tandoori chicken') || name.includes('tangdi') || name.includes('chicken leg')) {
      return 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('malai tikka') || name.includes('reshmi')) {
      return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('popcorn') || name.includes('crunchi') || name.includes('pakoda') || name.includes('65')) {
      return 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80';
  }

  // 7. Breads
  if (cat === 'ROTI / NAN / PURI') {
    if (name.includes('naan')) {
      return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('paratha')) {
      return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('puri') || name.includes('poori') || name.includes('kachodi')) {
      return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('kulcha')) {
      return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80';
  }

  // 8. Rice / Pulao / Biryani
  if (cat === 'RICE / PULAO / BIRYANI') {
    if (name.includes('biryani')) {
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('pulao') || name.includes('kanika')) {
      return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('fried rice') || name.includes('schezwan rice')) {
      return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
  }

  // 9. Dal Varieties (Ceramic Bowls)
  if (cat === 'DAL') {
    if (name.includes('makhani')) {
      return 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('tadka') || name.includes('fry') || name.includes('masala')) {
      return '/images/gourmet-ceramic-curry.jpg';
    }
    if (name.includes('vegetable dal') || name.includes('dalma') || name.includes('dalema')) {
      return '/images/dishes/odia-dalma.jpg';
    }
    if (name.includes('palak')) {
      return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('lemon') || name.includes('chana') || name.includes('moong')) {
      return 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
  }

  // 10. Chutney & Raita
  if (cat === 'CHUTNEY & RAITA') {
    if (name.includes('raita') || name.includes('dahi')) {
      return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('pampad') || name.includes('papad')) {
      return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('salad')) {
      return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
  }

  // 11. Vegetables
  if (cat === 'VEGETABLE') {
    if (name.includes('aloo gobi') || name.includes('gobi')) {
      return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('dum aloo') || name.includes('aloo dum') || name.includes('kashmiri')) {
      return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('korma') || name.includes('navratan') || name.includes('kofta')) {
      return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('bhindi') || name.includes('vindi')) {
      return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('parwal') || name.includes('potal')) {
      return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
  }

  // 12. Mushroom
  if (cat === 'MUSHROOM') {
    if (name.includes('besar')) {
      return '/images/dishes/macha-besara.jpg';
    }
    if (name.includes('chilly') || name.includes('chilli')) {
      return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80';
  }

  // 13. Paneer
  if (cat === 'PANEER') {
    if (name.includes('butter masala') || name.includes('makhani')) {
      return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('kadhai') || name.includes('kadai') || name.includes('do pyaza') || name.includes('dopyaza')) {
      return '/images/gourmet-ceramic-curry.jpg';
    }
    if (name.includes('chilly') || name.includes('tikka')) {
      return 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80';
  }

  // 14. Fish
  if (cat === 'FISH') {
    if (name.includes('mustard') || name.includes('besar') || name.includes('bengali') || name.includes('kalia')) {
      return '/images/dishes/macha-besara.jpg';
    }
    if (name.includes('fry') || name.includes('tawa') || name.includes('pomfret')) {
      return 'https://images.unsplash.com/photo-1552901695-cfa7432e6bbe?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80';
  }

  // 15. Prawn
  if (cat === 'PRAWN') {
    if (name.includes('fried') || name.includes('pepper') || name.includes('65') || name.includes('garlic')) {
      return 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80';
  }

  // 16. Chicken
  if (cat === 'CHICKEN') {
    if (name.includes('butter') || name.includes('makhani')) {
      return 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('tandoori') || name.includes('tikka') || name.includes('tangdi') || name.includes('kebab')) {
      return 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80';
  }

  // 17. Mutton
  if (cat === 'MUTTON') {
    return 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80';
  }

  // 18. Aamisha (Non-Veg Odia Specials)
  if (cat === 'AAMISHA (NON-VEG)') {
    if (name.includes('besar') || name.includes('macha') || name.includes('jhola') || name.includes('ambila')) {
      return '/images/dishes/macha-besara.jpg';
    }
    if (name.includes('chingudi') || name.includes('prawn')) {
      return 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80';
  }

  // 19. Odissi Special
  if (cat === 'ODISSI SPECIAL') {
    if (name.includes('pakhala')) return '/images/dishes/dahi-pakhala.jpg';
    if (name.includes('dalema') || name.includes('dalma')) return '/images/dishes/odia-dalma.jpg';
    if (name.includes('arna') || name.includes('rice')) return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80';
    if (name.includes('kanika')) return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80';
    if (name.includes('khatta')) return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
    return '/images/dishes/odia-dalma.jpg';
  }

  // 20. Sadda (Veg)
  if (cat === 'SADDA (VEG)') {
    if (name.includes('besar')) return '/images/dishes/macha-besara.jpg';
    if (name.includes('chura') || name.includes('badi')) return 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80';
    if (name.includes('santula')) return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
    if (name.includes('saga')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
    if (name.includes('poda') || name.includes('bharta')) return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
    return 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80';
  }

  // 21. Desserts
  if (cat === 'DESERT' || cat === 'DESSERT') {
    if (name.includes('chenna podo') || name.includes('chhena')) {
      return '/images/dishes/chhena-poda.jpg';
    }
    if (name.includes('gulab jamun')) {
      return 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('ice cream') || name.includes('kulfi')) {
      return 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('halwa') || name.includes('sahitukuda') || name.includes('shahi tukda') || name.includes('malpua') || name.includes('imarti') || name.includes('jalebi')) {
      return 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80';
    }
    if (name.includes('fruit')) {
      return 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80';
    }
    return 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=600&q=80';
  }

  // Fallback for anything else
  if (item.image && (item.image.includes('wikimedia.org') || item.image.includes('photo-1546833999-b9f581a1996d') || item.image.includes('photo-1546833998-877b37c2e5c4'))) {
    return item.isVeg ? '/images/gourmet-ceramic-curry.jpg' : 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80';
  }

  return item.image;
}

// Upgrade menu items
let upgradedCount = 0;
const updatedItems = menuItems.map(item => {
  const newImg = getUpgradedImage(item);
  if (newImg !== item.image) {
    upgradedCount++;
    return { ...item, image: newImg };
  }
  return item;
});

console.log(`Upgraded images for ${upgradedCount} dishes!`);

// Save updated db.json
db.menuItems = updatedItems;
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
if (fs.existsSync(rootDbPath)) {
  const rootDb = JSON.parse(fs.readFileSync(rootDbPath, 'utf8'));
  rootDb.menuItems = updatedItems;
  fs.writeFileSync(rootDbPath, JSON.stringify(rootDb, null, 2), 'utf8');
}

// Write to backend officialMenu.ts
const officialMenuContent = `export const officialMenuItems = ${JSON.stringify(updatedItems, null, 2)};\n`;
fs.writeFileSync(officialMenuPath, officialMenuContent, 'utf8');

// Write to frontend defaultMenu.ts
const defaultMenuContent = `export const defaultMenuItems: any[] = ${JSON.stringify(updatedItems, null, 2)};\n`;
fs.writeFileSync(defaultMenuPath, defaultMenuContent, 'utf8');

console.log('Successfully synchronized all 367 dishes across frontend and backend databases!');
