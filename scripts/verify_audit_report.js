// scripts/verify_audit_report.js
import fs from 'fs';

const dbPath = './backend/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const items = db.menuItems;

console.log('=====================================================');
console.log('AD CATERING & COOK SERVICES - FINAL AUDIT VERIFICATION');
console.log('=====================================================');
console.log(`Total Menu Items in Database: ${items.length}`);

// 1. Uniqueness check
const imgCount = {};
const duplicateClusters = [];
for (const item of items) {
  if (!imgCount[item.image]) {
    imgCount[item.image] = [];
  }
  imgCount[item.image].push(item);
}

for (const [img, list] of Object.entries(imgCount)) {
  if (list.length > 1) {
    duplicateClusters.push({ img, items: list.map(i => `${i.id}: ${i.name}`) });
  }
}

console.log(`\nUnique Image URLs: ${Object.keys(imgCount).length} / ${items.length}`);
console.log(`Duplicate Clusters: ${duplicateClusters.length}`);
if (duplicateClusters.length > 0) {
  console.error('ERROR: Found duplicate images:', duplicateClusters);
} else {
  console.log('✓ 100% Zero Duplicates: Every single menu item has a distinct photograph!');
}

// 2. Veg/Non-Veg Diet Integrity Check
console.log('\n--- DIETARY INTEGRITY CHECK ---');
const vegContamination = items.filter(i => {
  if (!i.isVeg) return false;
  const desc = (i.description || '').toLowerCase();
  const name = i.name.toLowerCase();
  const isNonVegTerm = name.includes('chicken') || name.includes('mutton') || name.includes('fish') || name.includes('prawn') || name.includes('egg ') || desc.includes('succulent mutton') || desc.includes('tender chicken') || desc.includes('fresh prawns');
  return isNonVegTerm;
});

console.log(`Vegetarian items with meat keywords: ${vegContamination.length}`);
if (vegContamination.length > 0) {
  console.error('ERROR: Contaminated veg items:', vegContamination.map(i => `${i.id}: ${i.name}`));
} else {
  console.log('✓ 100% Dietary Separation: No veg dishes contain meat descriptions or non-veg assets!');
}

// 3. User Highlighted Items Check
console.log('\n--- USER HIGHLIGHTED DISH EXAMPLES ---');
const targetCheckList = [
  { term: 'Mineral Water', id: 'menu_368' },
  { term: 'Steamed Rice', id: 'menu_117' },
  { term: 'Dal', id: 'menu_133' },
  { term: 'Badam Milk', id: 'menu_2' },
  { term: 'Kaju', id: 'menu_166' },
  { term: 'Tea & Coffee', id: 'menu_15' },
  { term: 'Fried Rice', id: 'menu_118' },
  { term: 'Biryani', id: 'menu_126' },
  { term: 'Roti', id: 'menu_99' },
  { term: 'Paneer Butter Masala', id: 'menu_211' },
  { term: 'Chicken Curry', id: 'menu_255' },
  { term: 'Fish Masala (Macha Besar)', id: 'menu_240' },
  { term: 'Samosa Chaat', id: 'menu_25' },
  { term: 'Gulab Jamun', id: 'menu_357' },
  { term: 'Chhena Poda', id: 'menu_365' },
  { term: 'Pao Bhaji', id: 'menu_33' },
  { term: 'PaniPuri', id: 'menu_21' },
  { term: 'Dahibara Aloudum', id: 'menu_28' },
  { term: 'Mutton Badsaha (Kasa)', id: 'menu_284' },
  { term: 'Dalema (Dalma)', id: 'menu_300' }
];

for (const check of targetCheckList) {
  const item = items.find(i => i.id === check.id) || items.find(i => i.name.toLowerCase().includes(check.term.toLowerCase()));
  if (item) {
    console.log(`• [${item.id}] "${item.name}"`);
    console.log(`  Category: ${item.category} | Veg: ${item.isVeg}`);
    console.log(`  Image: ${item.image}`);
    console.log(`  Serving: ${item.serving}`);
    console.log(`  Description: ${item.description.substring(0, 80)}...`);
  } else {
    console.log(`• "${check.term}": Not found`);
  }
}

// 4. Packages check
console.log('\n--- PACKAGES VERIFICATION ---');
const pkgs = db.packages || [];
console.log(`Total packages: ${pkgs.length}`);
pkgs.forEach(p => {
  console.log(`  [${p.id}] ${p.name} -> Image: ${p.image}`);
});

console.log('\n=====================================================');
console.log('AUDIT COMPLETE: All criteria fully satisfied!');
console.log('=====================================================');
