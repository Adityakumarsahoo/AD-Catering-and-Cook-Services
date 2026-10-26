import fs from 'fs';

const db = JSON.parse(fs.readFileSync('backend/data/db.json', 'utf8'));
const items = db.menuItems;

const exportData = items.map(item => ({
  id: item.id,
  name: item.name,
  category: item.category,
  isVeg: item.isVeg,
  currentImage: item.image
}));

fs.writeFileSync('scripts/dishes_flat_list.json', JSON.stringify(exportData, null, 2), 'utf8');
console.log(`Exported ${exportData.length} dishes to scripts/dishes_flat_list.json`);
