import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { MenuItem } from '../types.js';

const router = Router();

// GET menu summary statistics
router.get('/summary', (req, res) => {
  const db = getDb();
  const items = db.menuItems || [];

  const normalCount = items.filter(i => i.menuType === 'normal' || i.menuType === 'all' || !i.menuType).length;
  const deluxeCount = items.filter(i => i.menuType === 'deluxe' || i.menuType === 'all' || !i.menuType).length;
  const premiumCount = items.filter(i => i.menuType === 'premium' || i.menuType === 'all' || !i.menuType).length;
  const odiaCount = items.filter(i => i.isOdiaSpecialty || i.category.toLowerCase().includes('odia') || i.category.toLowerCase().includes('odissy')).length;
  const vegCount = items.filter(i => i.isVeg).length;
  const nonVegCount = items.filter(i => !i.isVeg).length;

  const categoriesSet = new Set(items.map(i => i.category));

  res.json({
    totalDishes: items.length,
    normalCount,
    deluxeCount,
    premiumCount,
    odiaCount,
    vegCount,
    nonVegCount,
    totalCategories: categoriesSet.size,
    categories: Array.from(categoriesSet),
  });
});

// GET all menu items with category, menuType, dietary, and search filters
router.get('/', (req, res) => {
  const db = getDb();
  const { category, type, menuType, search, featured, popular } = req.query;

  let items = [...(db.menuItems || [])];

  // Filter by menu package tier (normal, deluxe, premium)
  if (menuType && menuType !== 'ALL') {
    const mt = String(menuType).toLowerCase();
    items = items.filter(i => {
      const itemTier = (i.menuType || 'all').toLowerCase();
      if (itemTier === 'all') return true;
      if (mt === 'normal') return itemTier === 'normal';
      if (mt === 'deluxe') return itemTier === 'deluxe' || itemTier === 'normal';
      if (mt === 'premium') return true; // Premium has access to all tier items
      return itemTier === mt;
    });
  }

  // Filter by category
  if (category && category !== 'ALL') {
    const catUpper = String(category).toUpperCase();
    if (catUpper === 'ODIA' || catUpper === 'ODISHA' || catUpper === 'ODISSY SPECIAL') {
      items = items.filter(i => i.isOdiaSpecialty || i.category.toLowerCase().includes('odia') || i.category.toLowerCase().includes('odissy'));
    } else if (catUpper === 'STARTERS' || catUpper === 'STARTER') {
      items = items.filter(i => i.category.toLowerCase().includes('starter'));
    } else if (catUpper === 'DESSERTS' || catUpper === 'SWEET DESSERT') {
      items = items.filter(i => i.category.toLowerCase().includes('dessert') || i.category.toLowerCase().includes('sweet'));
    } else if (catUpper === 'DRINKS' || catUpper === 'WELCOME DRINKS') {
      items = items.filter(i => i.category.toLowerCase().includes('drink') || i.category.toLowerCase().includes('cooler'));
    } else if (catUpper === 'NON-VEG' || catUpper === 'AAMISHA') {
      items = items.filter(i => !i.isVeg);
    } else if (catUpper === 'VEG' || catUpper === 'SADDA') {
      items = items.filter(i => i.isVeg);
    } else {
      items = items.filter(i => i.category.toLowerCase() === String(category).toLowerCase());
    }
  }

  // Filter by dietary (VEG vs NON-VEG)
  if (type === 'VEG') {
    items = items.filter(i => i.isVeg);
  } else if (type === 'NON-VEG') {
    items = items.filter(i => !i.isVeg);
  }

  // Filter by featured / popular
  if (featured === 'true') {
    items = items.filter(i => i.isFeatured);
  }
  if (popular === 'true') {
    items = items.filter(i => i.isPopular);
  }

  // Search by keyword
  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      (i.description && i.description.toLowerCase().includes(q)) ||
      i.category.toLowerCase().includes(q) ||
      (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  res.json({ menuItems: items });
});

// Admin: Add new menu item
router.post('/', requireAdmin, (req, res) => {
  const db = getDb();
  const {
    name,
    category,
    menuType,
    description,
    price,
    image,
    isVeg,
    isPopular,
    isFeatured,
    isAvailable,
    sortOrder,
    tags,
    isOdiaSpecialty,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ message: 'Name and category are required.' });
  }

  const newItem: MenuItem = {
    id: `menu_${Date.now()}`,
    name: name.trim(),
    category: category.trim(),
    menuType: (menuType || 'all').toLowerCase() as any,
    description: (description || '').trim(),
    price: price !== undefined && price !== '' ? Number(price) : undefined,
    image: image || '/images/gourmet-ceramic-curry.jpg',
    isVeg: Boolean(isVeg),
    isPopular: Boolean(isPopular),
    isFeatured: Boolean(isFeatured),
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
    sortOrder: sortOrder !== undefined ? Number(sortOrder) : 0,
    tags: Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
    isOdiaSpecialty: Boolean(isOdiaSpecialty),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.menuItems.push(newItem);
  saveDatabase();
  res.status(201).json({ message: 'Menu item created successfully', menuItem: newItem });
});

// Admin: Update menu item
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.menuItems.findIndex(i => i.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const prev = db.menuItems[idx];
  const updated: MenuItem = {
    ...prev,
    ...req.body,
    price: req.body.price !== undefined && req.body.price !== '' ? Number(req.body.price) : prev.price,
    isVeg: req.body.isVeg !== undefined ? Boolean(req.body.isVeg) : prev.isVeg,
    isPopular: req.body.isPopular !== undefined ? Boolean(req.body.isPopular) : prev.isPopular,
    isFeatured: req.body.isFeatured !== undefined ? Boolean(req.body.isFeatured) : prev.isFeatured,
    isAvailable: req.body.isAvailable !== undefined ? Boolean(req.body.isAvailable) : prev.isAvailable,
    isOdiaSpecialty: req.body.isOdiaSpecialty !== undefined ? Boolean(req.body.isOdiaSpecialty) : prev.isOdiaSpecialty,
    menuType: req.body.menuType ? req.body.menuType.toLowerCase() : prev.menuType,
    updatedAt: new Date().toISOString(),
  };

  db.menuItems[idx] = updated;
  saveDatabase();
  res.json({ message: 'Menu item updated successfully', menuItem: updated });
});

// Admin: Delete menu item
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.menuItems.findIndex(i => i.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const deleted = db.menuItems.splice(idx, 1)[0];
  saveDatabase();
  res.json({ message: 'Menu item deleted successfully', menuItem: deleted });
});

export default router;
