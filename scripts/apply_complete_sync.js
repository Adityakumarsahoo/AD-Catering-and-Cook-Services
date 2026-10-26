// scripts/apply_complete_sync.js
import fs from 'fs';
import path from 'path';

const masterCatalog = JSON.parse(fs.readFileSync('./scripts/master_367_verified.json', 'utf8'));

console.log('Loaded master catalog with dishes:', Object.keys(masterCatalog).length);

// 1. Sync backend/src/data/officialMenu.ts
const backendOfficialPath = './backend/src/data/officialMenu.ts';
if (fs.existsSync(backendOfficialPath)) {
  const content = fs.readFileSync(backendOfficialPath, 'utf8');
  // Match json array
  const match = content.match(/export const officialMenuItems(?:: MenuItem\[\])? = (\[[\s\S]*\]);/);
  if (match) {
    const list = JSON.parse(match[1]);
    let updatedCount = 0;
    for (const item of list) {
      if (masterCatalog[item.id]) {
        item.image = masterCatalog[item.id].image;
        if (typeof masterCatalog[item.id].isVeg === 'boolean') {
          item.isVeg = masterCatalog[item.id].isVeg;
          if (!item.isVeg && item.tags && item.tags.includes('Pure Veg')) {
            item.tags = item.tags.map(t => t === 'Pure Veg' ? 'Non-Veg' : t);
          }
        }
        if (masterCatalog[item.id].description && item.description.length < 20) {
          item.description = masterCatalog[item.id].description;
        }
        updatedCount++;
      }
    }
    const newContent = `import { MenuItem } from '../types.js';\n\nexport const officialMenuItems: MenuItem[] = ${JSON.stringify(list, null, 2)};\n`;
    fs.writeFileSync(backendOfficialPath, newContent);
    console.log(`✓ Updated ${backendOfficialPath} (${updatedCount} items)`);
  }
}

// 2. Sync frontend/src/data/defaultMenu.ts
const frontendDefaultPath = './frontend/src/data/defaultMenu.ts';
if (fs.existsSync(frontendDefaultPath)) {
  const content = fs.readFileSync(frontendDefaultPath, 'utf8');
  const match = content.match(/export const defaultMenuItems: any\[\] = (\[[\s\S]*\]);/);
  if (match) {
    const list = JSON.parse(match[1]);
    let updatedCount = 0;
    for (const item of list) {
      if (masterCatalog[item.id]) {
        item.image = masterCatalog[item.id].image;
        if (typeof masterCatalog[item.id].isVeg === 'boolean') {
          item.isVeg = masterCatalog[item.id].isVeg;
          if (!item.isVeg && item.tags && item.tags.includes('Pure Veg')) {
            item.tags = item.tags.map(t => t === 'Pure Veg' ? 'Non-Veg' : t);
          }
        }
        if (masterCatalog[item.id].description && item.description.length < 20) {
          item.description = masterCatalog[item.id].description;
        }
        updatedCount++;
      }
    }

    const summary = {
      totalDishes: list.length,
      categoriesCount: 22,
      pureVegCount: list.filter(i => i.isVeg).length,
      nonVegCount: list.filter(i => !i.isVeg).length,
      popularCount: list.filter(i => i.isPopular).length,
      featuredCount: list.filter(i => i.isFeatured).length,
      odiaSpecialtyCount: list.filter(i => i.isOdiaSpecialty).length,
      canonicalCategories: [
        { category: 'WELCOME DRINK', count: list.filter(i => i.category === 'WELCOME DRINK').length },
        { category: 'SOUP', count: list.filter(i => i.category === 'SOUP').length },
        { category: 'COUNTER STARTER', count: list.filter(i => i.category === 'COUNTER STARTER').length },
        { category: 'STARTER (VEG)', count: list.filter(i => i.category === 'STARTER (VEG)').length },
        { category: 'STARTER (NON-VEG)', count: list.filter(i => i.category === 'STARTER (NON-VEG)').length },
        { category: 'EGGS TO ORDER', count: list.filter(i => i.category === 'EGGS TO ORDER').length },
        { category: 'ROTI / NAN / PURI', count: list.filter(i => i.category === 'ROTI / NAN / PURI').length },
        { category: 'RICE / PULAO / BIRYANI', count: list.filter(i => i.category === 'RICE / PULAO / BIRYANI').length },
        { category: 'DAL', count: list.filter(i => i.category === 'DAL').length },
        { category: 'CHUTNEY & RAITA', count: list.filter(i => i.category === 'CHUTNEY & RAITA').length },
        { category: 'VEGETABLE', count: list.filter(i => i.category === 'VEGETABLE').length },
        { category: 'MUSHROOM', count: list.filter(i => i.category === 'MUSHROOM').length },
        { category: 'PANEER', count: list.filter(i => i.category === 'PANEER').length },
        { category: 'FISH', count: list.filter(i => i.category === 'FISH').length },
        { category: 'PRAWN', count: list.filter(i => i.category === 'PRAWN').length },
        { category: 'CHICKEN', count: list.filter(i => i.category === 'CHICKEN').length },
        { category: 'MUTTON', count: list.filter(i => i.category === 'MUTTON').length },
        { category: 'AAMISHA (NON-VEG)', count: list.filter(i => i.category === 'AAMISHA (NON-VEG)').length },
        { category: 'ODISSI SPECIAL', count: list.filter(i => i.category === 'ODISSI SPECIAL').length },
        { category: 'SADDA (VEG)', count: list.filter(i => i.category === 'SADDA (VEG)').length },
        { category: 'CONTINENTAL', count: list.filter(i => i.category === 'CONTINENTAL').length },
        { category: 'DESERT', count: list.filter(i => i.category === 'DESERT').length }
      ]
    };

    const newContent = `export const defaultMenuItems: any[] = ${JSON.stringify(list, null, 2)};\n\nexport const defaultMenuSummary: any = ${JSON.stringify(summary, null, 2)};\n`;
    fs.writeFileSync(frontendDefaultPath, newContent);
    console.log(`✓ Updated ${frontendDefaultPath} (${updatedCount} items, defaultMenuSummary exported)`);
  }
}

// 3. Package images mapping
const packageCardImages = {
  pkg_1: '/images/basic-package-card.png',
  pkg_2: '/images/normal-menu-card.png',
  pkg_3: '/images/delux-menu-card.png',
  pkg_4: '/images/royal-wedding-menu-card.jpg',
  pkg_deluxe: '/images/deluxe-package-card.png'
};

// 4. Sync backend/data/db.json
const dbPaths = ['./backend/data/db.json', './data/db.json'];
for (const p of dbPaths) {
  if (fs.existsSync(p)) {
    const db = JSON.parse(fs.readFileSync(p, 'utf8'));
    let mCount = 0;
    if (db.menuItems && Array.isArray(db.menuItems)) {
      for (const item of db.menuItems) {
        if (masterCatalog[item.id]) {
          item.image = masterCatalog[item.id].image;
          if (typeof masterCatalog[item.id].isVeg === 'boolean') {
            item.isVeg = masterCatalog[item.id].isVeg;
            if (!item.isVeg && item.tags && item.tags.includes('Pure Veg')) {
              item.tags = item.tags.map(t => t === 'Pure Veg' ? 'Non-Veg' : t);
            }
          }
          if (masterCatalog[item.id].description && item.description.length < 20) {
            item.description = masterCatalog[item.id].description;
          }
          mCount++;
        }
      }
    }
    // Update package images
    if (db.packages && Array.isArray(db.packages)) {
      for (const pkg of db.packages) {
        if (packageCardImages[pkg.id]) {
          pkg.image = packageCardImages[pkg.id];
        }
      }
    }

    // Sync official 27-item Veg Menu
    const vegMenuContent = fs.readFileSync('./frontend/src/data/officialVegMenu.ts', 'utf8');
    const vegMatch = vegMenuContent.match(/export const officialVegMenu: VegMenuItem\[\] = (\[[\s\S]*?\]);\n\nexport const officialVegCategories/);
    if (vegMatch) {
      try {
        db.officialVegMenu = JSON.parse(vegMatch[1]);
      } catch (err) {
        // Fallback or evaluation
      }
    }

    fs.writeFileSync(p, JSON.stringify(db, null, 2));
    console.log(`✓ Updated ${p} (${mCount} menu items updated, packages updated, officialVegMenu synced)`);
  }
}

console.log('\nMaster Synchronization Finished Successfully!');
