import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb, saveDatabase } from '../db.js';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Get current user profile
router.get('/profile', requireAuth, (req: AuthenticatedRequest, res) => {
  const { password, ...safeUser } = req.user!;
  res.json({ profile: safeUser });
});

// Update profile
router.put('/profile', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const db = getDb();
    const user = req.user!;
    const idx = db.users.findIndex(u => u.id === user.id);

    if (idx === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { name, phone, password } = req.body;
    if (name) db.users[idx].name = name.trim();
    if (phone) db.users[idx].phone = phone.trim();

    if (password && password.trim().length >= 6) {
      db.users[idx].password = await bcrypt.hash(password.trim(), 10);
    }

    db.users[idx].updatedAt = new Date().toISOString();
    saveDatabase();

    const { password: _, ...safeUpdated } = db.users[idx];
    res.json({ message: 'Profile updated successfully', profile: safeUpdated });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to update profile' });
  }
});

// Get user notifications
router.get('/notifications', requireAuth, (req: AuthenticatedRequest, res) => {
  const db = getDb();
  const user = req.user!;
  const notifs = db.notifications.filter(n => n.userId === user.id || n.userId === 'all');
  res.json({ notifications: notifs });
});

// Mark notifications as read
router.put('/notifications/read-all', requireAuth, (req: AuthenticatedRequest, res) => {
  const db = getDb();
  const user = req.user!;
  db.notifications.forEach(n => {
    if (n.userId === user.id) {
      n.read = true;
    }
  });
  saveDatabase();
  res.json({ message: 'Notifications marked as read' });
});

export default router;
