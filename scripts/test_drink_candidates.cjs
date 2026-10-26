const fs = require('fs');

const candidates = {
  coldCoffee: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300',
  chaiTea: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300',
  lemonSoda: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300',
  fruitPunch: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300',
  mangoShake: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=300'
};

async function testCandidates() {
  for (const [key, url] of Object.entries(candidates)) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(`cand_${key}.jpg`, buf);
        console.log(`Saved cand_${key}.jpg (${buf.length} bytes)`);
      } else {
        console.log(`Failed ${key}: ${res.status}`);
      }
    } catch (e) {
      console.log(`Error ${key}: ${e.message}`);
    }
  }
}

testCandidates();
