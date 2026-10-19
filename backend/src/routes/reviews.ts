import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { requireAdmin, optionalAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { ReviewItem } from '../types.js';

const router = Router();

// GET all customer reviews
router.get('/', (req, res) => {
  const db = getDb();
  res.json({ reviews: db.reviews });
});

// POST new customer review
router.post('/', optionalAuth, (req: AuthenticatedRequest, res) => {
  const db = getDb();
  const { customerName, rating, comment, eventType, photo } = req.body;

  const name = req.user ? req.user.name : (customerName || 'Happy Customer');
  if (!comment || !rating) {
    return res.status(400).json({ message: 'Rating and review comment are required.' });
  }

  const newReview: ReviewItem = {
    id: `rev_${Date.now()}`,
    customerName: name.trim(),
    rating: Math.min(5, Math.max(1, Number(rating))),
    comment: comment.trim(),
    eventType: eventType || 'Catering Event',
    photo: photo || (req.user ? `https://api.dicebear.com/7.x/micah/svg?seed=${name}` : undefined),
    date: new Date().toISOString().split('T')[0],
  };

  db.reviews.unshift(newReview);
  saveDatabase();

  res.status(201).json({ message: 'Thank you for your kind review!', review: newReview });
});

// Admin: Delete review
router.delete('/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const idx = db.reviews.findIndex(r => r.id === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }

  const deleted = db.reviews.splice(idx, 1)[0];
  saveDatabase();
  res.json({ message: 'Review deleted', review: deleted });
});

export default router;
