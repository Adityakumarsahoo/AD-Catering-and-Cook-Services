import fs from 'fs';

const db = JSON.parse(fs.readFileSync('backend/data/db.json', 'utf8'));
const items = db.menuItems;

const urlMap = {};
items.forEach(it => {
  if (!urlMap[it.image]) urlMap[it.image] = [];
  urlMap[it.image].push(it.name);
});

const sorted = Object.entries(urlMap)
  .filter(([url, list]) => list.length > 1)
  .sort((a,b) => b[1].length - a[1].length);

let report = `Total duplicated URLs: ${sorted.length}\n`;
sorted.forEach(([url, list]) => {
  report += `\nURL (count ${list.length}): ${url}\nDishes: ${list.join(', ')}\n`;
});

fs.writeFileSync('scripts/duplicates_report.txt', report, 'utf8');
console.log('Saved report. Duplicated URLs count:', sorted.length);
