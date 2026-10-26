// scripts/sync_veg_menu_to_db.js
import fs from 'fs';
import { officialVegMenu } from '../frontend/src/data/officialVegMenu.js';

console.log('Loaded officialVegMenu items:', officialVegMenu.length);

const dbPaths = ['./backend/data/db.json', './data/db.json'];
for (const p of dbPaths) {
  if (fs.existsSync(p)) {
    const db = JSON.parse(fs.readFileSync(p, 'utf8'));
    db.officialVegMenu = officialVegMenu;
    fs.writeFileSync(p, JSON.stringify(db, null, 2), 'utf8');
    console.log(`✓ Saved ${officialVegMenu.length} officialVegMenu items to ${p}`);
  }
}
