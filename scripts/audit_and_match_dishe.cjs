const fs = require('fs');
const path = require('path');

// 1. Load all DISHE files
const disheDir = path.join(__dirname, '../frontend/public/images/DISHE');
const disheFiles = fs.readdirSync(disheDir).sort();
console.log(`Found ${disheFiles.length} files in frontend/public/images/DISHE`);

// 2. Load defaultMenuItems
const { defaultMenuItems } = require('../frontend/src/data/defaultMenu.ts');
console.log(`Found ${defaultMenuItems.length} dishes in defaultMenuItems`);

// 3. Load officialVegMenu
const { officialVegMenu } = require('../frontend/src/data/officialVegMenu.ts');
console.log(`Found ${officialVegMenu.length} dishes in officialVegMenu`);

// 4. Load db.json
const dbPath = path.join(__dirname, '../backend/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
console.log(`Found ${db.menuItems.length} dishes in backend/data/db.json menuItems`);
console.log(`Found ${db.officialVegMenu.length} dishes in backend/data/db.json officialVegMenu`);

// 5. Let's check how many dishes in defaultMenuItems currently use /images/DISHE/ vs other paths
let disheCount = 0;
let dishesFolderCount = 0;
let externalCount = 0;
let otherCount = 0;

defaultMenuItems.forEach(d => {
  if (d.image.startsWith('/images/DISHE/')) disheCount++;
  else if (d.image.startsWith('/images/dishes/')) dishesFolderCount++;
  else if (d.image.startsWith('http')) externalCount++;
  else otherCount++;
});

console.log('\n--- Current Image Path Breakdown in defaultMenuItems ---');
console.log(`  /images/DISHE/: ${disheCount}`);
console.log(`  /images/dishes/: ${dishesFolderCount}`);
console.log(`  http/external: ${externalCount}`);
console.log(`  other local: ${otherCount}`);

// 6. Detailed Match Analysis for all 130 DISHE files
console.log('\n--- Matching all 130 DISHE files to dishes in defaultMenuItems ---');

const fileMatches = [];

disheFiles.forEach(file => {
  const cleanName = file.replace('.png', '');
  
  // Normalized tokens from filename
  // E.g. "Chicken Malai Tikka" -> ["chicken", "malai", "tikka"]
  // "65 (Paneer, Mushroom, Babycorn, Gobi)" -> group
  const lowerFile = cleanName.toLowerCase();

  // Find matches in defaultMenuItems
  const candidates = defaultMenuItems.filter(d => {
    const dLower = d.name.toLowerCase();
    
    // Direct exact or includes
    if (dLower === lowerFile) return true;
    
    // Special filename patterns:
    if (file === 'CHICKEN BIRIYANI.png') {
      return dLower.includes('chicken') && (dLower.includes('biryani') || dLower.includes('biriyani'));
    }
    if (file === 'MUTTON CURRY.png') {
      return dLower === 'mutton curry' || dLower === 'odia mutton kasa' || dLower === 'mutton rogan josh' || dLower === 'mutton rogan juice';
    }
    if (file === 'DALEMA.png') {
      return dLower === 'dalma' || dLower === 'odia dalma' || dLower === 'dalema' || dLower === 'temple dalma';
    }
    if (file === 'Chenna Podo.png') {
      return dLower.includes('chhena poda') || dLower.includes('chenna poda') || dLower.includes('chhena podo');
    }
    if (file === 'Dahiwada Aloudum.png') {
      return dLower.includes('dahibara') || dLower.includes('dahi vada') || dLower.includes('dahiwada');
    }
    if (file === 'Lachha parata.png') {
      return dLower.includes('lachha paratha') || dLower.includes('lachha parata');
    }
    if (file === 'Naan (Plain Butter).png') {
      return dLower === 'butter naan' || dLower === 'plain naan' || dLower.includes('naan');
    }
    if (file === 'H  S Soup (Veg. & Non Veg.).png') {
      return dLower.includes('hot & sour') || dLower.includes('hot and sour') || dLower.includes('h/s soup') || dLower.includes('manchow');
    }
    if (file === 'L  C Soup (Veg. & Non Veg.).png') {
      return dLower.includes('lemon') && (dLower.includes('coriander') || dLower.includes('coriender'));
    }
    if (file === 'S  C Soup (Veg. & Non Veg.).png') {
      return dLower.includes('sweet corn');
    }
    if (file === 'Noodle Soup (Veg. & Non Veg.).png') {
      return dLower.includes('noodle soup');
    }
    if (file === 'Milk Shake (Badam , Mango ,Pineapple ,Vanilla).png') {
      return dLower.includes('milk shake') || dLower.includes('milkshake');
    }
    if (file === 'Assorted Kebab (Tikka Hariyali Malai).png') {
      return dLower.includes('assorted kebab') || dLower.includes('hariyali kabab') || dLower.includes('reshmi kabab');
    }
    if (file === 'Chicken (Manchurian, Dragon, Schezwan, Chilly, Lollypop).png') {
      return dLower.includes('chicken lollipop') || dLower.includes('chicken lollypop') || dLower.includes('chicken dragon') || dLower.includes('chicken schezwan');
    }
    if (file === 'Chilly (Paneer, Mushroom, Gobi, Babycorn).png') {
      return dLower === 'chilli paneer' || dLower === 'chilli mushroom' || dLower === 'chilli baby corn' || dLower === 'chilli gobi';
    }
    if (file === '65 (Paneer, Mushroom, Babycorn, Gobi).png') {
      return dLower === 'paneer 65' || dLower === 'mushroom 65' || dLower === 'baby corn 65' || dLower === 'gobi 65';
    }
    if (file === 'Manchurian (Paneer, Mushroom, Babycorn, Gobi).png') {
      return dLower === 'veg manchurian' || dLower === 'paneer manchurian' || dLower === 'gobi manchurian';
    }
    if (file === 'Schezwan (Paneer, Mushroom, Babycorn, Gobi).png') {
      return dLower === 'schezwan paneer' || dLower.includes('schezwan');
    }
    if (file === 'Hot Garlic (Paneer, Mushroom, Babycorn, Gobi).png') {
      return dLower.includes('hot garlic');
    }
    if (file === 'Ginger (Paneer, Mushroom, Babycorn, Gobi).png') {
      return dLower.includes('ginger paneer') || dLower.includes('ginger mushroom');
    }
    if (file === 'Halakda (Veg. , Gobi, Mirchi, Paneer).png') {
      return dLower.includes('mirchi pakoda') || dLower.includes('halkada') || dLower.includes('halakda');
    }
    if (file === 'Crispy Masala Corn Bowl.png') {
      return dLower.includes('american corn') || dLower.includes('crispy corn');
    }
    if (file === 'Crunchy Chicken.png') {
      return dLower.includes('crunchy chicken') || dLower.includes('crispy chicken');
    }
    if (file === 'Mona (Veg. & Non Veg..png') {
      return dLower.includes('mona');
    }
    if (file === 'pan puri.png' || file === 'PaniPuri.png') {
      return dLower.includes('panipuri') || dLower.includes('gupchup') || dLower.includes('golgappa');
    }

    // Normalized word match
    const words = lowerFile.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2);
    if (words.length > 0 && words.every(w => dLower.includes(w))) {
      return true;
    }

    return false;
  });

  fileMatches.push({
    file,
    count: candidates.length,
    dishes: candidates.map(c => ({ id: c.id, name: c.name, cat: c.category, currImg: c.image }))
  });
});

console.log('\n--- MATCH SUMMARY ---');
const matchedFiles = fileMatches.filter(m => m.count > 0);
const unmatchedFiles = fileMatches.filter(m => m.count === 0);
console.log(`Matched DISHE files: ${matchedFiles.length} / ${disheFiles.length}`);
console.log(`Unmatched DISHE files: ${unmatchedFiles.length} / ${disheFiles.length}`);

if (unmatchedFiles.length > 0) {
  console.log('\nUnmatched DISHE files:');
  unmatchedFiles.forEach(u => console.log(`  - ${u.file}`));
}

console.log('\nSample Matched files with their matched dishes:');
matchedFiles.slice(0, 30).forEach(m => {
  console.log(`\n📷 ${m.file} (Matches ${m.count} dishes):`);
  m.dishes.forEach(d => console.log(`   -> [${d.id}] "${d.name}" (${d.cat})`));
});

