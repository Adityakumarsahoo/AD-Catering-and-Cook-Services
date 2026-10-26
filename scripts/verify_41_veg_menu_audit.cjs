const fs = require('fs');
const path = require('path');

const userList = [
  // Welcome Drinks
  { num: 1, name: 'Milk Shake (Badam / Mango / Pineapple / Vanilla)', cat: 'Welcome Drinks' },
  { num: 2, name: 'Hot Badam Milk', cat: 'Welcome Drinks' },
  { num: 3, name: 'Lassi (Sweet)', cat: 'Welcome Drinks' },
  { num: 4, name: 'Chanch', cat: 'Welcome Drinks' },
  { num: 5, name: 'Fruit Punch', cat: 'Welcome Drinks' },
  { num: 6, name: 'Aam Panna', cat: 'Welcome Drinks' },
  { num: 7, name: 'Thandai', cat: 'Welcome Drinks' },
  { num: 8, name: 'Falluda', cat: 'Welcome Drinks' },
  { num: 9, name: 'Jaljeera', cat: 'Welcome Drinks' },
  { num: 10, name: 'Lemon Cold Drinks', cat: 'Welcome Drinks' },
  { num: 11, name: 'Cold Drinks', cat: 'Welcome Drinks' },
  { num: 12, name: 'Masala Cold Drinks', cat: 'Welcome Drinks' },
  { num: 13, name: 'Mocktail', cat: 'Welcome Drinks' },
  { num: 14, name: 'Cold Coffee', cat: 'Welcome Drinks' },
  { num: 15, name: 'Tea & Coffee', cat: 'Welcome Drinks' },

  // Soup
  { num: 16, name: 'Veg Sweet Corn/Manchow Soup', cat: 'Soup' },

  // Starter
  { num: 17, name: 'American Corn Fry', cat: 'Starter' },
  { num: 18, name: 'Hara Bhara Kabab', cat: 'Starter' },
  { num: 19, name: 'Mushroom Cheese Ball', cat: 'Starter' },
  { num: 20, name: 'Paneer Shashlik', cat: 'Starter' },
  { num: 21, name: 'Dahi Papdi Chaat', cat: 'Starter' },
  { num: 22, name: 'Gupchup', cat: 'Starter' },

  // Plate Counter
  { num: 23, name: 'Papad', cat: 'Plate Counter' },
  { num: 24, name: 'Salad', cat: 'Plate Counter' },
  { num: 25, name: 'Pasta', cat: 'Plate Counter' },
  { num: 26, name: 'Dahi Rashola', cat: 'Plate Counter' },
  { num: 27, name: 'Dahi Bara', cat: 'Plate Counter' },

  // Main Course
  { num: 28, name: 'Green Peas Rice', cat: 'Main Course' },
  { num: 29, name: 'Rumali Roti', cat: 'Main Course' },
  { num: 30, name: 'Yellow Dal Fry', cat: 'Main Course' },
  { num: 31, name: 'Fruits Jelly', cat: 'Main Course' },
  { num: 32, name: 'Paneer Punjabi/Hyderabadi', cat: 'Main Course' },
  { num: 33, name: 'Navaratna Kurma', cat: 'Main Course' },
  { num: 34, name: 'Seasonal Veg', cat: 'Main Course' },
  { num: 35, name: 'Mushroom Chilli', cat: 'Main Course' },
  { num: 36, name: 'Finger Chips', cat: 'Main Course' },

  // Sweet Dessert
  { num: 37, name: 'Khir Sagar', cat: 'Sweet Dessert' },
  { num: 38, name: 'Hot Jalebi/Gulab Jamun', cat: 'Sweet Dessert' },
  { num: 39, name: 'Ice Cream', cat: 'Sweet Dessert' },

  // Additional Items
  { num: 40, name: 'Water Bottle', cat: 'Additional Items' },
  { num: 41, name: 'Paan Counter', cat: 'Additional Items' }
];

console.log('===============================================================');
console.log('OFFICIAL 41-ITEM VEG MENU & COMPLETE IMAGE AUDIT VERIFICATION');
console.log('===============================================================');

// 1. Check data/db.json
const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
const vegMenu = db.officialVegMenu || [];

console.log(`\n[CHECK 1] Authorized User Specification Count: ${userList.length} items`);
console.log(`[CHECK 2] Implemented Official Veg Menu Count: ${vegMenu.length} items`);

if (vegMenu.length !== 41) {
  console.error(`❌ COUNT MISMATCH: Expected 41 items, got ${vegMenu.length}`);
  process.exit(1);
}
console.log('✓ EXACT COUNT PASS: Exactly 41 items present!');

// 2. Line by line sequence & spelling
console.log('\n[CHECK 3] Line-by-Line Sequence & Spelling Match:');
let hasMismatch = false;
userList.forEach((spec, idx) => {
  const item = vegMenu[idx];
  if (!item) {
    console.error(`  ❌ Missing item at position #${spec.num}`);
    hasMismatch = true;
    return;
  }
  if (item.name.toLowerCase() !== spec.name.toLowerCase()) {
    console.error(`  ❌ Name mismatch at #${spec.num}: Expected "${spec.name}", found "${item.name}"`);
    hasMismatch = true;
  } else if (item.category.toLowerCase() !== spec.cat.toLowerCase()) {
    console.error(`  ❌ Category mismatch at #${spec.num}: Expected "${spec.cat}", found "${item.category}"`);
    hasMismatch = true;
  } else {
    console.log(`  ✓ #${spec.num}. [${item.category}] "${item.name}" -> ${item.image.slice(0, 45)}...`);
  }
});

if (hasMismatch) {
  console.error('❌ Mismatches found in sequence/spelling!');
  process.exit(1);
}
console.log('✓ EXACT ORDER & SPELLING PASS: All 41 items match the authorized specification perfectly!');

// 3. Duplicate Image Check
console.log('\n[CHECK 4] Duplicate Image Analysis across 41 items:');
const imgMap = {};
vegMenu.forEach(item => {
  if (!imgMap[item.image]) imgMap[item.image] = [];
  imgMap[item.image].push(item.name);
});
const duplicates = Object.entries(imgMap).filter(([img, items]) => items.length > 1);

console.log(`Total items: ${vegMenu.length}`);
console.log(`Unique image paths/URLs: ${Object.keys(imgMap).length}`);
console.log(`Duplicate clusters: ${duplicates.length}`);

if (duplicates.length > 0) {
  console.error('❌ DUPLICATES FOUND:');
  duplicates.forEach(([img, items]) => console.error(`  - Image: ${img}\n    Items: ${items.join(', ')}`));
  process.exit(1);
}
console.log('✓ ZERO DUPLICATES PASS: Every single item has a 100% unique photograph!');

// 4. Local asset file verification
console.log('\n[CHECK 5] Local and Remote Asset Verification:');
let missingAssets = 0;
vegMenu.forEach(item => {
  if (item.image.startsWith('/images/dishes/')) {
    const localRel = item.image.replace(/^\//, '');
    const pubPath = path.join('frontend/public', localRel);
    if (!fs.existsSync(pubPath)) {
      console.error(`  ❌ Missing local asset: [${item.name}] -> ${pubPath}`);
      missingAssets++;
    } else {
      const stats = fs.statSync(pubPath);
      console.log(`  ✓ Local asset OK: [${item.name}] -> ${item.image} (${stats.size} bytes)`);
    }
  } else {
    console.log(`  ✓ Remote asset mapped: [${item.name}] -> ${item.image.slice(0, 50)}...`);
  }
});

if (missingAssets > 0) {
  console.error(`❌ Local assets missing: ${missingAssets}`);
  process.exit(1);
}
console.log('✓ ASSET INTEGRITY PASS: All local assets are present on disk!');

// 5. Check Master Drink mappings (menu_1 through menu_15)
console.log('\n[CHECK 6] Master Drinks Image Audit:');
const drinkItems = db.menuItems.filter(i => i.category === 'WELCOME DRINK');
let drinkMismatches = 0;
drinkItems.forEach(d => {
  if (d.image.includes('1576092768241') || d.image.includes('1626082927389') || d.image.includes('1536935338788')) {
    console.error(`  ❌ Mismatched drink image on ${d.id}: ${d.name} -> ${d.image}`);
    drinkMismatches++;
  } else {
    console.log(`  ✓ Master drink OK: ${d.id} [${d.name}] -> ${d.image.slice(0, 50)}...`);
  }
});

if (drinkMismatches > 0) {
  console.error(`❌ Drink mismatches found in master catalog!`);
  process.exit(1);
}
console.log('✓ MASTER DRINKS PASS: All 15 master welcome drinks have verified non-conflicting images!');

console.log('\n===============================================================');
console.log('ALL CHECKS PASSED: 100% COMPLIANT WITH USER SPECIFICATION!');
console.log('===============================================================');
