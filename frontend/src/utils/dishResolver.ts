import { defaultMenuItems } from '../data/defaultMenu.js';

export interface ResolvedDish {
  id: string;
  name: string;
  displayName: string;
  category: string;
  description: string;
  image: string;
  isVeg: boolean;
  price?: number;
  serving?: string;
  tags?: string[];
  isPopular?: boolean;
  isFeatured?: boolean;
  isOdiaSpecialty?: boolean;
  packageContext?: string;
}

// Curated category fallback images (high-definition catering photography from local assets)
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'WELCOME DRINKS': '/images/dishes/Badam_Milk_Drink.jpg',
  'SOUP COUNTER': '/images/dishes/spiced-jaljeera.jpg',
  'STARTER (VEG)': '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  'STARTER (NON-VEG)': '/images/dishes/odia-mutton-kasa.jpg',
  'PLATE COUNTER': '/images/dishes/Dahibara_Aludam.jpg',
  'MAIN COURSE (VEG)': '/images/dishes/odia-dalma.jpg',
  'MAIN COURSE (NON-VEG)': '/images/dishes/odia-mutton-kasa.jpg',
  'SWEET DESERT': '/images/dishes/chhena-poda.jpg',
  'SWEET DESSERT': '/images/dishes/chhena-poda.jpg',
  'SPECIAL COUNTERS': '/images/dishes/royal-paan-counter.jpg',
  'SPECIAL INCLUSIONS': '/images/dishes/royal-paan-counter.jpg',
};

// Curated specific dish imagery using guaranteed local assets
const DISH_SPECIFIC_IMAGES: Record<string, string> = {
  'water bottle': '/images/luxury-buffet-setup.jpg',
  'paan counter': '/images/dishes/royal-paan-counter.jpg',
  'banarasi meetha paan': '/images/dishes/royal-paan-counter.jpg',
  'fruit design cutting': '/images/royal-light-table.jpg',
  'green salad': '/images/royal-light-table.jpg',
  'dahibara': '/images/dishes/Dahibara_Aludam.jpg',
  'panipuri counter': '/images/dishes/live-panipuri.jpg',
  'gupchup counter': '/images/dishes/live-panipuri.jpg',
  'papudi chaat / aloo tiki chaat': '/images/dishes/live-panipuri.jpg',
  'chowmein': '/images/dishes/Pav_bhaji__2.jpg',
  'egg devil': '/images/dishes/Dahibara_Aludam.jpg',
  'egg chop': '/images/dishes/Dahibara_Aludam.jpg',
  'scotch egg': '/images/dishes/Dahibara_Aludam.jpg',
  'chicken pakoda': '/images/dishes/odia-mutton-kasa.jpg',
  'chicken (tikka / lolipop)': '/images/dishes/odia-mutton-kasa.jpg',
  'chicken kabab (malai, reshmi, hariyali)': '/images/dishes/odia-mutton-kasa.jpg',
  'fish finger': '/images/dishes/macha-besara.jpg',
  'fish patrapoda': '/images/dishes/macha-besara.jpg',
  'dahi fish': '/images/dishes/macha-besara.jpg',
  'fish fry': '/images/dishes/macha-besara.jpg',
  'fish masala': '/images/dishes/macha-besara.jpg',
  'garlic prawn': '/images/dishes/macha-besara.jpg',
  'malai prawn': '/images/dishes/macha-besara.jpg',
  'mutton rogan juice': '/images/dishes/odia-mutton-kasa.jpg',
  'mutton rogan josh': '/images/dishes/odia-mutton-kasa.jpg',
  'chicken hyderabadi': '/images/dishes/odia-mutton-kasa.jpg',
  'garlic chicken': '/images/dishes/odia-mutton-kasa.jpg',
  'chhena payes': '/images/dishes/chhena-poda.jpg',
  'hot jalebi': '/images/dishes/chhena-poda.jpg',
  'ice cream': '/images/dishes/chhena-poda.jpg',
  'rasogola': '/images/dishes/dahi-rashola.jpg',
  'gulab jamun': '/images/dishes/chhena-poda.jpg',
  'kheer sagar': '/images/dishes/khir-sagar.jpg',
  'baked rasgula': '/images/dishes/dahi-rashola.jpg',
  'gajar halwa': '/images/dishes/chhena-poda.jpg',
  'fire mocktail': '/images/dishes/cold-drinks-soda.jpg',
  'smoky mocktail': '/images/dishes/cold-drinks-soda.jpg',
  'masala drinks': '/images/dishes/masala-cold-drinks.jpg',
  'dahi chhanch / kesar milk': '/images/dishes/chanch-buttermilk.jpg',
  'badam kesar milk': '/images/dishes/Badam_Milk_Drink.jpg',
  'veg manchow soup': '/images/dishes/Pav_bhaji__2.jpg',
  'veg sweet corn soup': '/images/dishes/Pav_bhaji__2.jpg',
  'lemon coriender soup': '/images/dishes/spiced-jaljeera.jpg',
  'chicken h/s soup': '/images/dishes/odia-mutton-kasa.jpg',
  'papad': '/images/dishes/crispy-papad.jpg',
  'pickles': '/images/dishes/Dahibara_Aludam.jpg',
  'spout salad': '/images/royal-light-table.jpg',
  'rusian salad': '/images/royal-light-table.jpg',
  'nadia pachedi': '/images/dishes/dahi-pakhala.jpg',
  'dahi rasgulla': '/images/dishes/dahi-rashola.jpg',
  'pasta salad': '/images/royal-light-table.jpg',
  'rice (veriety)': '/images/royal-odia-feast.jpg',
  'rice (variety)': '/images/royal-odia-feast.jpg',
  'rumali roti': '/images/royal-odia-feast.jpg',
  'rumali roti / chakuli': '/images/royal-odia-feast.jpg',
  'chakuli / biri kachudi': '/images/royal-odia-feast.jpg',
  'chakuli / butter naan': '/images/royal-odia-feast.jpg',
  'dal fry': '/images/dishes/odia-dalma.jpg',
  'dal butter fry': '/images/dishes/odia-dalma.jpg',
  'dal makhani': '/images/dishes/odia-dalma.jpg',
  'khatta': '/images/dishes/chhena-poda.jpg',
  'pine apple jelly': '/images/dishes/chhena-poda.jpg',
  'paneer (masala/hydrabadi)': '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  'paneer pasinda / tikka masala': '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  'paneer tikka': '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  'paneer crispy': '/images/dishes/Malai_Paneer_Tikka__PK_007.jpg',
  'mix veg (navaratna/punjabi)': '/images/gourmet-ceramic-curry.jpg',
  'navaratna kurma': '/images/gourmet-ceramic-curry.jpg',
  'sijnal veg': '/images/gourmet-ceramic-curry.jpg',
  'mushroom (dopiaza/chilli)': '/images/dishes/chilli-mushroom.jpg',
  'mushroom besar': '/images/dishes/chilli-mushroom.jpg',
  'kadai mushroom': '/images/dishes/chilli-mushroom.jpg',
  'mushroom salt & pepper': '/images/dishes/chilli-mushroom.jpg',
  'corn chaat': '/images/dishes/Pav_bhaji__2.jpg',
  'american corn crispy': '/images/dishes/Pav_bhaji__2.jpg',
  'spring roll': '/images/dishes/Pav_bhaji__2.jpg',
  'veg cutlet': '/images/dishes/Pav_bhaji__2.jpg',
  'harabara kabab / dahi kabab': '/images/dishes/Dahibara_Aludam.jpg',
};

// Authentic culinary descriptions for items that may not be in defaultMenuItems
const DISH_SPECIFIC_DESCRIPTIONS: Record<string, string> = {
  'water bottle': 'Hygienically packaged and sealed chilled mineral drinking water bottles (250ml/500ml) provided to each guest dining table.',
  'paan counter': 'Freshly prepared traditional Banarasi meetha paan live counter filled with fragrant sweet gulkand, tutty fruity, saunf, and silver leaf foil.',
  'banarasi meetha paan': 'Freshly rolled Banarasi meetha paan filled with aromatic gulkand, sweet saunf, coconut flakes, and silver vark at a traditional live paan kiosk.',
  'fruit design cutting': 'Artisanal decorative carving and elegant multi-tier presentation of seasonal sweet fruits and exotic melons by master culinary carvers.',
  'green salad': 'Crisp garden-fresh salad featuring sliced English cucumbers, farm-ripe tomatoes, crunchy carrots, radishes, and lemon wedges.',
  'dahibara': 'Soft fermented urad dal dumplings soaked in spiced seasoned buttermilk, garnished with roasted cumin, sev, and fresh coriander.',
  'papad': 'Assorted crispy roasted and fried poppadums served as traditional accompaniments to the royal main course banquet.',
  'pickles': 'Handmade traditional mixed vegetable, green chilli, and spicy raw mango achaar slow-cured in mustard oil and aromatic spices.',
  'spout salad': 'Nutritious sprouted moong and black gram salad tossed with diced onions, tomatoes, green chillies, chaat masala, and fresh lemon juice.',
  'rusian salad': 'Creamy diced vegetable and potato salad tossed with pineapple chunks and chilled seasoned mayonnaise dressing.',
  'nadia pachedi': 'Traditional Odia coconut relish freshly ground with green chillies, mustard seeds, and spiced yoghurt tempering.',
  'dahi rasgulla': 'Delicate cottage cheese rasgullas steeped in sweetened chilled curd with a hint of roasted cumin and pomegranate jewels.',
  'pasta salad': 'Italian spiral fusilli pasta tossed with crisp diced bell peppers, sweet corn kernels, Italian herbs, and virgin olive oil dressing.',
  'rice (veriety)': 'Steamed fragrant Basmati rice, tempered Jeera Rice, and royal vegetable pulao options served piping hot from warming chafers.',
  'rice (variety)': 'Steamed fragrant Basmati rice, tempered Jeera Rice, and royal vegetable pulao options served piping hot from warming chafers.',
  'rumali roti': 'Handkerchief-thin delicate soft flatbread tossed and baked on an inverted tawa, served warm and buttery.',
  'rumali roti / chakuli': 'Ultra-thin soft Rumali Rotis and authentic Odia pan-fried fermented rice-lentil Chakulis served fresh from live bread counters.',
  'chakuli / biri kachudi': 'Crispy golden fried black gram Biri Kachudis and fluffy tender Odia Chakulis prepared live on griddles.',
  'chakuli / butter naan': 'Crisp tandoor-baked Butter Naan brushed with pure butter alongside authentic Odia Chakulis.',
  'dal fry': 'Yellow lentils tempered with ghee, cumin seeds, garlic slivers, green chillies, and freshly chopped tomatoes.',
  'dal butter fry': 'Rich yellow toor dal simmered and double-tempered with golden Amul butter, garlic, roasted cumin, and red chillies.',
  'dal makhani': 'Slow-simmered whole black urad dal and kidney beans cooked overnight over low heat with pure butter and rich dairy cream.',
  'khatta': 'Authentic Odia sweet-and-sour relish crafted from sweet tomatoes, dates (khajura), and seasonal sweet fruits with panch phoron tempering.',
  'pine apple jelly': 'Sweet and tangy artisanal pineapple chutney/jelly infused with delicate spices and roasted cumin.',
  'paneer (masala/hydrabadi)': 'Tender paneer cubes simmered in a spiced tomato-onion gravy or rich mint-coriander Hyderabadi sauce.',
  'paneer pasinda / tikka masala': 'Delicate stuffed paneer sandwiches or char-grilled tandoori paneer simmered in a creamy butter-masala gravy.',
  'mix veg (navaratna/punjabi)': 'Medley of fresh market garden vegetables, carrots, beans, peas, and paneer cooked in a fragrant cashew-onion gravy.',
  'mushroom (dopiaza/chilli)': 'Plump button mushrooms tossed with double-cut caramelised onions and green chillies in a spicy masala.',
  'mushroom besar': 'Fresh button mushrooms simmered in traditional Odia mustard-garlic paste (besara) with pan-fried potatoes.',
  'kadai mushroom': 'Button mushrooms and crisp bell peppers stir-cooked in a wok with freshly ground coriander-peppercorn Kadai masala.',
  'navaratna kurma': 'Imperial Mughlai nine-gem curry crafted with fresh seasonal vegetables, nuts, raisins, and cottage cheese in a velvety sauce.',
  'sijnal veg': 'Hand-selected farm-fresh seasonal vegetables gently sautéed with mild aromatic spices and fresh coriander.',
  'mutton rogan juice': 'Tender bone-in mutton slow-braised in a rich aromatic Kashmiri gravy infused with fennel, ginger, and saffron oil.',
  'mutton rogan josh': 'Tender bone-in mutton slow-braised in a rich aromatic Kashmiri gravy infused with fennel, ginger, and saffron oil.',
  'fish fry': 'Fresh river fish steaks marinated in turmeric, chilli, and carom seeds, shallow fried crisp on a flat griddle.',
  'fish masala': 'Fresh fish steaks gently simmered in a fragrant onion, tomato, and ground garam masala gravy with fresh coriander.',
  'dahi fish': 'Tender fish pieces cooked in a delicate yoghurt-based spiced gravy with mustard and green chillies.',
  'fish patrapoda': 'Traditional Odia delicacy of fresh fish fillets coated with mustard-garlic paste wrapped in banana leaves and slow-roasted on embers.',
  'chicken hyderabadi': 'Succulent chicken pieces cooked in a royal aromatic gravy flavoured with crushed spices, mint, and fried onions.',
  'garlic chicken': 'Tender boneless chicken morsels sautéed with roasted golden garlic cloves, crushed black pepper, and herbs.',
  'malai prawn': 'Sweet Chilika prawns gently cooked in a luxurious coconut milk and cashew-cream gravy with mild spices.',
  'garlic prawn': 'Juicy Chilika prawns tossed with golden garlic flakes, butter, black pepper, and fresh parsley.',
  'chicken pakoda': 'Boneless chicken cubes seasoned with ginger-garlic and gram flour, deep fried into golden crispy fritters.',
  'chicken (tikka / lolipop)': 'Spicy tandoori chicken tikka skewers and crispy chicken drumsticks served with mint chutney and onion rings.',
  'chicken kabab (malai, reshmi, hariyali)': 'Assortment of creamy Malai, soft Reshmi, and minty Hariyali chicken kebabs grilled over glowing charcoal.',
  'fish finger': 'Crumb-coated delicate white fish goujons fried golden and served with homemade tartar sauce and lemon slices.',
  'scotch egg': 'Hard-boiled egg wrapped in savory minced meat and herb breadcrumbs, fried till crunchy on the outside.',
  'egg chop': 'Boiled eggs encased in a spiced potato mash casing, crumb-coated and deep-fried to a rich golden brown.',
  'gupchup counter': 'Interactive live counter serving crisp semolina puris filled with spiced potato-chickpea mash and tangy mint-tamarind water.',
  'panipuri counter': 'Interactive live counter serving crisp semolina puris filled with spiced potato-chickpea mash and tangy mint-tamarind water.',
  'papudi chaat / aloo tiki chaat': 'Live chaat station with crisp papdis, spiced griddle-fried potato patties, sweetened yoghurt, tamarind and mint chutneys.',
  'paneer crispy': 'Cottage cheese strips dusted with seasoned cornflour, fried crisp and tossed in sweet-and-spicy Indo-Chinese sauce.',
  'spring roll': 'Golden crispy pastry rolls stuffed with shredded wok-tossed cabbage, carrots, and spring onions with sweet chilli dip.',
  'veg cutlet': 'Crispy beetroot and potato cutlets with a crunchy breadcrumb crust, served with green chutney.',
  'corn chaat': 'Steamed sweet corn kernels tossed with butter, chaat masala, lemon juice, diced onions, and fresh coriander.',
  'harabara kabab / dahi kabab': 'Patties of minced spinach, green peas, and potatoes paired with delicate melt-in-mouth spiced hung curd kebabs.',
  'american corn crispy': 'Crisp batter-fried American sweet corn kernels tossed with crushed peppercorns, scallions, and rock salt.',
  'paneer tikka': 'Succulent cubes of cottage cheese marinated in spiced hung curd with bell peppers and roasted in clay tandoor.',
  'mushroom salt & pepper': 'Fresh button mushrooms fried crisp and tossed with crushed black peppercorns, sea salt, and spring onions.',
  'chowmein': 'Wok-tossed street-style noodles loaded with shredded bell peppers, cabbage, spring onions, and savory soy-garlic seasoning.',
  'chhena payes': 'Royal Odia delicacy of fresh cottage cheese pearls simmered in condensed saffron milk and garnished with pistachios.',
  'hot jalebi': 'Crispy deep-fried spiral coils soaked in fragrant saffron-cardamom sugar syrup, served piping hot from the wok.',
  'ice cream': 'Premium dairy ice cream in assorted classic banquet flavours including Vanilla, Butterscotch, and Strawberry.',
  'rasogola': 'Iconic melt-in-mouth spongy cottage cheese balls soaked in warm light cardamom sugar syrup.',
  'gulab jamun': 'Traditional khoya dumplings fried golden brown and soaked in warm rose and cardamom scented sugar syrup.',
  'kheer sagar': 'Delicate miniature cottage cheese dumplings bathed in a sweetened, cardamom-infused saffron milk syrup.',
  'baked rasgula': 'Soft spongy rasgullas baked under rich caramelised kheer and thickened rabdi with pistachio shavings.',
  'gajar halwa': 'Slow-simmered winter red carrot halwa cooked in pure desi ghee, khoya mawa, and crowned with toasted cashews and almonds.',
  'lemon coriender soup': 'Bright, zesty clear broth flavoured with fresh lemon juice, crushed coriander leaves, and fine vegetable juliennes.',
  'chicken h/s soup': 'Fiery Indo-Chinese hot and sour soup loaded with shredded chicken, mushrooms, bamboo shoots, and egg ribbons.',
  'veg manchow soup': 'Robust dark soy broth with finely chopped vegetables and ginger, topped with a generous crown of crunchy fried noodles.',
  'veg sweet corn soup': 'Creamy and soothing sweet corn soup made with crushed golden corn kernels and tender seasonal vegetables.',
  'fire mocktail': 'Spectacular flaming citrus mocktail blended with blue curacao, layered juices, and refreshing carbonation.',
  'smoky mocktail': 'Aromatic wood-smoked mocktail infused with fresh apple juice, cinnamon bark, and mint leaves.',
  'masala drinks': 'Tangy spiced Indian coolers featuring roasted cumin, mint essence, black salt, and sparkling soda.',
  'dahi chhanch / kesar milk': 'Choice of cooling spiced buttermilk churned with rock salt, or warm saffron-almond milk.',
  'badam kesar milk': 'Rich and creamy slow-simmered dairy milk infused with crushed California almonds, pure saffron, and green cardamom.',
};

/**
 * Determines whether a food item is vegetarian based on its name and category
 */
export function isDishVegetarian(name: string, category: string): boolean {
  const n = name.toLowerCase();
  const c = category.toUpperCase();

  if (c.includes('NON-VEG') || c.includes('AAMISHA') || c.includes('CHICKEN') || c.includes('MUTTON') || c.includes('FISH') || c.includes('PRAWN') || c.includes('EGG')) {
    // Check if specifically marked veg
    if (n.includes('veg ') || n.includes('paneer') || n.includes('mushroom')) {
      return true;
    }
    return false;
  }

  // Non-veg keywords
  const nonVegKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'egg', 'devil', 'scotchegg', 'scotch egg', 'non-veg', 'non veg'];
  for (const kw of nonVegKeywords) {
    if (n.includes(kw)) {
      // Exceptions like "Eggless"
      if (!n.includes('eggless') && !n.includes('veg & non veg')) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Normalizes dish name for lookup
 */
function normalizeName(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\/\(\)]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves a raw item string (from package categories) into a rich dish object
 */
export function resolveFoodItem(
  rawName: string,
  categoryName: string,
  menuItemsList: any[] = defaultMenuItems,
  packageContextName?: string
): ResolvedDish {
  const normRaw = normalizeName(rawName);
  const isVeg = isDishVegetarian(rawName, categoryName);

  // 1. Try finding exact or partial match in loaded menu items
  let matchedItem: any = null;

  if (Array.isArray(menuItemsList) && menuItemsList.length > 0) {
    // Exact match
    matchedItem = menuItemsList.find(
      (m) => m.name && m.name.toLowerCase() === rawName.toLowerCase()
    );

    // Substring match
    if (!matchedItem) {
      matchedItem = menuItemsList.find((m) => {
        if (!m.name) return false;
        const normM = normalizeName(m.name);
        return normM.includes(normRaw) || normRaw.includes(normM);
      });
    }

    // Split match for slashes (e.g. "Dahi Chhanch / Kesar Milk")
    if (!matchedItem && (rawName.includes('/') || rawName.includes('&'))) {
      const parts = rawName.split(/[\/\&]/).map((p) => p.trim());
      for (const part of parts) {
        const normP = normalizeName(part);
        matchedItem = menuItemsList.find((m) => {
          if (!m.name) return false;
          const normM = normalizeName(m.name);
          return normM.includes(normP) || normP.includes(normM);
        });
        if (matchedItem) break;
      }
    }

    // Key token match
    if (!matchedItem) {
      const tokens = normRaw.split(' ').filter((t) => t.length > 3);
      for (const tok of tokens) {
        matchedItem = menuItemsList.find((m) => {
          if (!m.name) return false;
          return normalizeName(m.name).includes(tok);
        });
        if (matchedItem) break;
      }
    }
  }

  // 2. Determine Best Image
  let image = '';
  // Check dish specific image map
  for (const [key, imgUrl] of Object.entries(DISH_SPECIFIC_IMAGES)) {
    if (normRaw.includes(key) || key.includes(normRaw)) {
      image = imgUrl;
      break;
    }
  }

  if (!image && matchedItem?.image) {
    image = matchedItem.image;
  }

  if (!image) {
    const catUpper = categoryName.toUpperCase();
    image =
      CATEGORY_FALLBACK_IMAGES[catUpper] ||
      (isVeg
        ? '/images/gourmet-ceramic-curry.jpg'
        : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
  }

  // 3. Determine Best Description
  let description = '';
  for (const [key, desc] of Object.entries(DISH_SPECIFIC_DESCRIPTIONS)) {
    if (normRaw.includes(key) || key.includes(normRaw)) {
      description = desc;
      break;
    }
  }

  if (!description && matchedItem?.description) {
    description = matchedItem.description;
  }

  if (!description) {
    description = isVeg
      ? `Authentic vegetarian ${categoryName.toLowerCase()} delicacy crafted with farm-fresh ingredients, pure desi ghee, and royal spices for live event banquets.`
      : `Signature gourmet ${categoryName.toLowerCase()} delicacy freshly prepared with premium ingredients, aromatic herbs, and traditional spices.`;
  }

  const safeRaw = normRaw.replace(/[^a-z0-9]/g, '_');
  const safeCat = categoryName.replace(/[^a-z0-9]/gi, '_');
  const uniqueId = matchedItem?.id
    ? `${matchedItem.id}_${safeCat}_${safeRaw}`
    : `pkg_dish_${safeCat}_${safeRaw}`;

  return {
    id: uniqueId,
    name: matchedItem?.name || rawName,
    displayName: rawName,
    category: categoryName || matchedItem?.category || 'Catering Selection',
    description,
    image,
    isVeg: matchedItem ? Boolean(matchedItem.isVeg) : isVeg,
    price: matchedItem?.price,
    serving: matchedItem?.serving || 'Freshly prepared at live banquet counters',
    tags: matchedItem?.tags || [categoryName, isVeg ? 'Pure Veg' : 'Non-Veg', 'Banquet Selection'],
    isPopular: matchedItem?.isPopular ?? false,
    isFeatured: matchedItem?.isFeatured ?? false,
    isOdiaSpecialty: matchedItem?.isOdiaSpecialty ?? (normRaw.includes('odia') || normRaw.includes('dahibara') || normRaw.includes('chhena') || normRaw.includes('chakuli') || normRaw.includes('besar')),
    packageContext: packageContextName,
  };
}
