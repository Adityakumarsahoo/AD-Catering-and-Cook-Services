const fs = require('fs');

const testUrls = {
  milkshake: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300',
  lassi: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300',
  chanch: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=300',
  fruitPunch: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300',
  thandai: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=300',
  falooda: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=300',
  jaljeera: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300',
  lemonColdDrink: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300',
  coldCoffee: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=300'
};

async function testAll() {
  for (const [key, url] of Object.entries(testUrls)) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(`temp_${key}.jpg`, buf);
        console.log(`Saved temp_${key}.jpg (${buf.length} bytes)`);
      } else {
        console.log(`Failed ${key}: ${res.status}`);
      }
    } catch (e) {
      console.log(`Error ${key}: ${e.message}`);
    }
  }
}

testAll();
