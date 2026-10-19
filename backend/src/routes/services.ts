import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { ServiceItem } from '../types.js';

const router = Router();

// GET all services (optionally filter by catering or cook)
router.get('/', (req, res) => {
  const db = getDb();
  const { category } = req.query;

  let services = [...db.services];
  if (category) {
    services = services.filter(s => s.category === category);
  }

  res.json({ services });
});

// Admin: Add service
router.post('/', requireAdmin, (req, res) => {
  const db = getDb();
  const { title, description, startingPrice, category, image, features, icon } = req.body;

  if (!title || !startingPrice) {
    return res.status(400).json({ message: 'Title and starting price are required.' });
  }

  const newService: ServiceItem = {
    id: `srv_${Date.now()}`,
    title: title.trim(),
    description: (description || '').trim(),
    startingPrice: Number(startingPrice),
    category: category === 'cook' ? 'cook' : 'catering',
    image: image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    features: Array.isArray(features) ? features : (features ? [features] : []),
    icon: icon || 'Utensils',
  };

  db.services.push(newService);
  saveDatabase();
  res.status(201).json({ message: 'Service added successfully', service: newService });
});

// Admin: Update service
router.put('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.services.findIndex(s => s.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Service not found' });
  }

  const prev = db.services[idx];
  const updated: ServiceItem = {
    ...prev,
    ...req.body,
    startingPrice: req.body.startingPrice !== undefined ? Number(req.body.startingPrice) : prev.startingPrice,
  };

  db.services[idx] = updated;
  saveDatabase();
  res.json({ message: 'Service updated successfully', service: updated });
});

// Admin: Delete service
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.services.findIndex(s => s.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Service not found' });
  }

  const deleted = db.services.splice(idx, 1)[0];
  saveDatabase();
  res.json({ message: 'Service deleted successfully', service: deleted });
});

export default router;
