import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { ContactMessage } from '../types.js';

const router = Router();

// POST contact message
router.post('/', (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone, and message are required.' });
    }

    const db = getDb();
    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: name.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
    };

    db.contactMessages.unshift(newMsg);

    // Notify admin
    db.notifications.push({
      id: `notif_msg_${Date.now()}`,
      userId: 'usr_admin_1',
      title: 'New Contact Inquiry',
      message: `${name} sent a message: "${subject || 'General'}"`,
      createdAt: new Date().toISOString(),
      read: false,
    });

    saveDatabase();

    res.status(201).json({
      message: 'Thank you for reaching out! Our team will get back to you shortly.',
      contactMessage: newMsg,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to submit inquiry' });
  }
});

export default router;
