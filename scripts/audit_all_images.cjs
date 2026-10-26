const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/db.json'), 'utf8'));
const items = db.menuItems || [];

console.log(`Total Master Menu Items: ${items.length}`);

// 1. Group by image to find duplicates
const imageMap = {};
items.forEach(item => {
  if (!item.image) return;
  if (!imageMap[item.image]) imageMap[item.image] = [];
  imageMap[item.image].push({ id: item.id, name: item.name, category: item.category });
});

const duplicates = Object.entries(imageMap).filter(([img, list]) => list.length > 1);
console.log(`\nFound ${duplicates.length} image URLs shared by multiple master catalog items:`);
duplicates.forEach(([img, list]) => {
  console.log(`\nImage: ${img}`);
  list.forEach(i => console.log(`  - [${i.category}] ${i.name} (${i.id})`));
});

// 2. Check Wikimedia URLs
const wikimediaItems = items.filter(i => i.image && i.image.includes('wikimedia.org'));
console.log(`\nItems with Wikimedia URLs: ${wikimediaItems.length}`);
wikimediaItems.forEach(i => console.log(`  - [${i.category}] ${i.name}: ${i.image.slice(0, 70)}...`));

// 3. Welcome Drinks inspect
console.log('\n--- WELCOME DRINKS (Items 1 - 15) ---');
const welcomeDrinks = items.filter(i => i.category === 'WELCOME DRINK');
welcomeDrinks.forEach((i, idx) => {
  console.log(`${idx + 1}. ${i.name} (${i.id}) -> ${i.image}`);
});
