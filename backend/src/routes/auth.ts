import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb, saveDatabase } from '../db.js';
import { generateToken, requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { User } from '../types.js';

const router = Router();

// Customer Sign Up
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // Phone validation (accepts 10 digits or with +91)
    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ message: 'Please provide a valid 10-digit Indian phone number.' });
    }

    const db = getDb();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password: hashedPassword,
      role: 'user', // Enforce customer role only
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.users.push(newUser);

    // Welcome notification
    db.notifications.push({
      id: `notif_${Date.now()}`,
      userId: newUser.id,
      title: 'Welcome to AD Catering!',
      message: 'Thank you for registering. You can now plan and book exclusive catering and cook services.',
      createdAt: new Date().toISOString(),
      read: false,
    });

    saveDatabase();

    const token = generateToken(newUser);
    const { password: _, ...userSafe } = newUser;

    res.status(201).json({
      message: 'Registration successful! Welcome to AD Catering.',
      token,
      user: userSafe,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Registration failed' });
  }
});

// Customer Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const db = getDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.json({
      message: 'Login successful. Welcome back!',
      token,
      user: userSafe,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Login failed' });
  }
});

// Admin Login ONLY
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Admin email and password are required.' });
    }

    const db = getDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ message: 'Invalid administrator credentials.' });
    }

    // Role check MUST be admin
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: You do not have administrator permissions.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid administrator credentials.' });
    }

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.json({
      message: 'Admin authorization granted. Welcome back, Manager.',
      token,
      user: userSafe,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Admin login failed' });
  }
});

// Current User Info
router.get('/me', requireAuth, (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const { password: _, ...userSafe } = req.user;
  res.json({ user: userSafe });
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully.' });
});

export default router;
