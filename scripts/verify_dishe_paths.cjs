const fs = require('fs');
const path = require('path');

const disheDir = path.join(__dirname, '../frontend/public/images/DISHE');
const disheFiles = fs.readdirSync(disheDir);
console.log('Total files in DISHE directory:', disheFiles.length);

const disheSet = new Set(disheFiles);

function checkMatches(label, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let total = 0;
  let broken = 0;
  // Match "/images/DISHE/..." or '/images/DISHE/...' with matching quotes
  const regex = /(["'])(\/images\/DISHE\/.*?)\1/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    total++;
    const fullImg = match[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
    const fn = fullImg.replace('/images/DISHE/', '');
    if (!disheSet.has(fn)) {
      console.log(`[${label}] BROKEN DISHE PATH: "${fn}" (from "${match[0]}")`);
      broken++;
    }
  }
  console.log(`[${label}] Total DISHE refs: ${total}, Broken: ${broken}`);
  return { total, broken };
}

checkMatches('defaultMenu.ts', path.join(__dirname, '../frontend/src/data/defaultMenu.ts'));
checkMatches('officialVegMenu.ts', path.join(__dirname, '../frontend/src/data/officialVegMenu.ts'));
checkMatches('dishResolver.ts', path.join(__dirname, '../frontend/src/utils/dishResolver.ts'));
checkMatches('menuCategories.ts', path.join(__dirname, '../frontend/src/data/menuCategories.ts'));
checkMatches('BanquetPackagesSection.tsx', path.join(__dirname, '../frontend/src/components/BanquetPackagesSection.tsx'));
checkMatches('backend/officialMenu.ts', path.join(__dirname, '../backend/src/data/officialMenu.ts'));
checkMatches('backend/officialVegMenu.ts', path.join(__dirname, '../backend/src/data/officialVegMenu.ts'));
checkMatches('backend/db.json', path.join(__dirname, '../backend/data/db.json'));

console.log('\nAll DISHE paths check completed successfully.');
