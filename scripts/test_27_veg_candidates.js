// scripts/test_27_veg_candidates.js
const testCandidates = {
  'Mocktail': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  'Veg sweet corn/manchow soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
  'American corn fry': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
  'Hara bhara kabab': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Hara_Bhara_Kabab.jpg/960px-Hara_Bhara_Kabab.jpg',
  'Mushroom cheese ball': 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80',
  'Paneer shashlik': '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  'Dahi papdi chaat': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Papri_chaat_01.jpg/960px-Papri_chaat_01.jpg',
  'Gupchup': '/images/dishes/live-panipuri.jpg',
  'Papad': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Papadam_with_chutneys.jpg/960px-Papadam_with_chutneys.jpg',
  'Salad': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  'Pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  'Dahi rashola': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Dahi_vada_-_kolkata_2015-08-01_1824.JPG/960px-Dahi_vada_-_kolkata_2015-08-01_1824.JPG',
  'Dahi bara': '/images/dishes/Dahibara_Aludam.jpg',
  'Green peas rice': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
  'Rumali roti': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
  'Yellow Dal fry': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Dal_tadka.JPG/960px-Dal_tadka.JPG',
  'Fruits jelly': 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80',
  'Paneer punjabi/hyderabadi': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
  'Navaratna kurma': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Navratan_Korma.jpg',
  'Seasonal veg': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
  'Mushroom chilli': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Mushroom_Manchurian_dry.jpg/960px-Mushroom_Manchurian_dry.jpg',
  'Finger chips': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
  'Khir sagar': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Rasgulla_With_Rabdi.jpg/960px-Rasgulla_With_Rabdi.jpg',
  'Hot jalebi/gulab jamun': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Jalebi_PK013.jpg/960px-Jalebi_PK013.jpg',
  'Ice cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
  'Water bottle': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
  'Paan counter': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Meetha_Paan.jpg/960px-Meetha_Paan.jpg'
};

async function testAll() {
  const urls = Object.values(testCandidates);
  const set = new Set(urls);
  console.log('Total items in list:', Object.keys(testCandidates).length);
  console.log('Unique URLs:', set.size);
  if (set.size !== urls.length) {
    console.error('DUPLICATES DETECTED!');
  } else {
    console.log('✓ 100% Zero duplicate URLs among 27 candidates!');
  }

  for (const [name, url] of Object.entries(testCandidates)) {
    if (url.startsWith('/')) {
      console.log(`✓ [Local Asset] ${name} -> ${url}`);
      continue;
    }
    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      console.log(`[${res.status}] ${name} -> Content-Type: ${res.headers.get('content-type')}`);
    } catch (e) {
      console.error(`FAILED: ${name} -> ${e.message}`);
    }
  }
}
testAll();
