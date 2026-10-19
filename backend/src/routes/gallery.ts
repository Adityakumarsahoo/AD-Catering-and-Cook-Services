import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { GalleryItem } from '../types.js';

const router = Router();

// GET gallery items with optional category filter
router.get('/', (req, res) => {
  const db = getDb();
  const { category } = req.query;

  let items = [...db.gallery];
  if (category && category !== 'ALL') {
    items = items.filter(g => g.category.toLowerCase() === String(category).toLowerCase());
  }

  res.json({ gallery: items });
});

// Admin: Add gallery photo
router.post('/', requireAdmin, (req, res) => {
  const db = getDb();
  const { title, category, image, description } = req.body;

  if (!title || !image) {
    return res.status(400).json({ message: 'Title and image URL are required.' });
  }

  const newItem: GalleryItem = {
    id: `gal_${Date.now()}`,
    title: title.trim(),
    category: category || 'Events',
    image: image.trim(),
    description: (description || '').trim(),
  };

  db.gallery.unshift(newItem);
  saveDatabase();
  res.status(201).json({ message: 'Gallery item added', galleryItem: newItem });
});

// Admin: Delete gallery photo
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.gallery.findIndex(g => g.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }

  const deleted = db.gallery.splice(idx, 1)[0];
  saveDatabase();
  res.json({ message: 'Gallery item removed', galleryItem: deleted });
});

export default router;
