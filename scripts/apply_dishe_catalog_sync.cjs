const fs = require('fs');
const path = require('path');
const { findDisheImageForDish, disheFiles } = require('./build_complete_dishe_catalog.cjs');

console.log('=== APPLYING COMPLETE DISHE CATALOG SYNC ACROSS ENTIRE PROJECT ===');

// 1. Verify all 130 DISHE files exist on disk
const disheDir = path.join(__dirname, '../frontend/public/images/DISHE');
disheFiles.forEach(f => {
  const full = path.join(disheDir, f);
  if (!fs.existsSync(full)) {
    console.error(`FATAL: File does not exist: ${full}`);
    process.exit(1);
  }
});
console.log(`✓ All ${disheFiles.length} DISHE images verified physically on disk.`);

// 2. Load defaultMenuItems
const defaultMenuPath = path.join(__dirname, '../frontend/src/data/defaultMenu.ts');
let defaultMenuContent = fs.readFileSync(defaultMenuPath, 'utf8');
const { defaultMenuItems } = require('../frontend/src/data/defaultMenu.ts');

let defaultMenuUpdatedCount = 0;
const updatedDefaultMenuItems = defaultMenuItems.map(item => {
  const match = findDisheImageForDish(item.name, item.category);
  if (match && item.image !== match) {
    defaultMenuUpdatedCount++;
    return { ...item, image: match };
  }
  return item;
});
console.log(`Updated ${defaultMenuUpdatedCount} dishes in defaultMenuItems to point to /images/DISHE/...`);

// Write updated defaultMenu.ts
const newDefaultMenuContent = `// frontend/src/data/defaultMenu.ts
// Comprehensive Master Menu Catalog: 367 items across 22 categories
// Updated with verified high-resolution DISHE photography

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  menuType: 'veg' | 'non-veg' | 'all';
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  isAvailable?: boolean;
  sortOrder?: number;
  tags?: string[];
  isOdiaSpecialty?: boolean;
  serving?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultMenuItems: MenuItem[] = ${JSON.stringify(updatedDefaultMenuItems, null, 2)};

export const defaultMenuSummary = {
  totalItems: ${updatedDefaultMenuItems.length},
  vegCount: ${updatedDefaultMenuItems.filter(i => i.isVeg).length},
  nonVegCount: ${updatedDefaultMenuItems.filter(i => !i.isVeg).length},
  categoriesCount: 22,
};
`;

fs.writeFileSync(defaultMenuPath, newDefaultMenuContent, 'utf8');
console.log('✓ Successfully wrote frontend/src/data/defaultMenu.ts');

// Also update backend/src/data/officialMenu.ts if it exists
const backendOfficialMenuPath = path.join(__dirname, '../backend/src/data/officialMenu.ts');
if (fs.existsSync(backendOfficialMenuPath)) {
  const backendContent = `// backend/src/data/officialMenu.ts
// Comprehensive Master Menu Catalog: 367 items across 22 categories
// Synchronized with frontend DISHE assets

export const officialMenuItems = ${JSON.stringify(updatedDefaultMenuItems, null, 2)};
`;
  fs.writeFileSync(backendOfficialMenuPath, backendContent, 'utf8');
  console.log('✓ Successfully wrote backend/src/data/officialMenu.ts');
}

// 3. Update backend/data/db.json and data/db.json
['../backend/data/db.json', '../data/db.json'].forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    const db = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    
    // Update menuItems
    if (Array.isArray(db.menuItems)) {
      db.menuItems = db.menuItems.map(item => {
        const match = findDisheImageForDish(item.name, item.category);
        if (match) {
          return { ...item, image: match };
        }
        return item;
      });
    }

    // Update officialVegMenu
    if (Array.isArray(db.officialVegMenu)) {
      db.officialVegMenu = db.officialVegMenu.map(item => {
        const match = findDisheImageForDish(item.name, item.category);
        if (match) {
          return { ...item, image: match };
        }
        return item;
      });
    }

    fs.writeFileSync(fullPath, JSON.stringify(db, null, 2), 'utf8');
    console.log(`✓ Successfully updated ${relPath}`);
  }
});

// 4. Update frontend/src/data/officialVegMenu.ts and backend/src/data/officialVegMenu.ts
const vegMenuFiles = [
  '../frontend/src/data/officialVegMenu.ts',
  '../backend/src/data/officialVegMenu.ts',
];

vegMenuFiles.forEach(relPath => {
  const fullPath = path.join(__dirname, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace unsplash and outdated local URLs with DISHE images
    content = content.replace(
      /image:\s*['"]https:\/\/images\.unsplash\.com\/photo-1544025162-d76694265947\?[^'"]*['"]/g,
      "image: '/images/DISHE/Crispy Masala Corn Bowl.png'"
    );
    content = content.replace(
      /image:\s*['"]\/images\/dishes\/Malai_Paneer_Tikka__PK_007\.jpg['"]/g,
      "image: '/images/DISHE/HaraBhara Kabab.png'"
    );
    content = content.replace(
      /image:\s*['"]\/images\/dishes\/chilli-mushroom\.jpg['"]/g,
      "image: '/images/DISHE/Chilly (Paneer, Mushroom, Gobi, Babycorn).png'"
    );
    content = content.replace(
      /image:\s*['"]\/images\/royal-odia-feast\.jpg['"]/g,
      "image: '/images/DISHE/Rumali Roti.png'"
    );
    content = content.replace(
      /image:\s*['"]\/images\/dishes\/Pav_bhaji__2\.jpg['"]/g,
      "image: '/images/DISHE/Finger Chips.png'"
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Successfully synchronized ${relPath}`);
  }
});

console.log('=== DATA SYNC COMPLETED SUCCESSFULLY ===');
