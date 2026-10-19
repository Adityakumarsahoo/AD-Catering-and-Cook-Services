import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { CateringPackage } from '../types.js';

const router = Router();

// GET all packages
router.get('/', (req, res) => {
  const db = getDb();
  res.json({ packages: db.packages });
});

// Admin: Add package
router.post('/', requireAdmin, (req, res) => {
  const db = getDb();
  const {
    name,
    pricePerPerson,
    description,
    startersCount,
    mainCourseCount,
    dessertCount,
    drinksCount,
    staffIncluded,
    decorationOption,
    features,
    popular,
  } = req.body;

  if (!name || !pricePerPerson) {
    return res.status(400).json({ message: 'Package name and price per person are required.' });
  }

  const newPackage: CateringPackage = {
    id: `pkg_${Date.now()}`,
    name: name.trim().toUpperCase(),
    pricePerPerson: Number(pricePerPerson),
    description: (description || '').trim(),
    startersCount: Number(startersCount || 2),
    mainCourseCount: Number(mainCourseCount || 4),
    dessertCount: Number(dessertCount || 1),
    drinksCount: Number(drinksCount || 1),
    staffIncluded: Boolean(staffIncluded),
    decorationOption: Boolean(decorationOption),
    features: Array.isArray(features) ? features : [],
    popular: Boolean(popular),
  };

  db.packages.push(newPackage);
  saveDatabase();
  res.status(201).json({ message: 'Package created successfully', package: newPackage });
});

// Admin: Update package
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.packages.findIndex(p => p.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Package not found' });
  }

  const prev = db.packages[idx];
  const updated: CateringPackage = {
    ...prev,
    ...req.body,
    pricePerPerson: req.body.pricePerPerson !== undefined ? Number(req.body.pricePerPerson) : prev.pricePerPerson,
  };

  db.packages[idx] = updated;
  saveDatabase();
  res.json({ message: 'Package updated successfully', package: updated });
});

// Admin: Delete package
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.packages.findIndex(p => p.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Package not found' });
  }

  const deleted = db.packages.splice(idx, 1)[0];
  saveDatabase();
  res.json({ message: 'Package deleted successfully', package: deleted });
});

export default router;
