import { Router } from 'express';
import { getDb } from '../db.js';

const router = Router();

// Publicly readable content endpoints (no auth required)
router.get('/homepage', (req, res) => {
  const db = getDb();
  res.json({ homepage: db.homepage });
});

router.get('/about', (req, res) => {
  const db = getDb();
  res.json({ about: db.about });
});

router.get('/navigation', (req, res) => {
  const db = getDb();
  res.json({ navigation: db.navigation });
});

router.get('/settings', (req, res) => {
  const db = getDb();
  res.json({ settings: db.settings });
});

export default router;
