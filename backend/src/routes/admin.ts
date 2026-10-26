import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { getDb, saveDatabase } from '../db.js';
import { requireAdmin, AuthenticatedRequest } from '../middleware/auth.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = Router();

// Protect ALL admin routes with requireAdmin middleware
router.use(requireAdmin);

// Admin dashboard analytics & stats
router.get('/dashboard', (req: AuthenticatedRequest, res) => {
  const db = getDb();

  const totalCustomers = db.users.filter(u => u.role === 'user').length;
  const totalBookings = db.bookings.length;
  const pendingBookings = db.bookings.filter(b => b.status === 'Pending').length;
  const confirmedBookings = db.bookings.filter(b => b.status === 'Confirmed').length;
  const inProgressBookings = db.bookings.filter(b => b.status === 'In Progress').length;
  const completedEvents = db.bookings.filter(b => b.status === 'Completed').length;
  const cancelledBookings = db.bookings.filter(b => b.status === 'Cancelled').length;

  const totalRevenue = db.bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'In Progress' || b.status === 'Completed')
    .reduce((sum, b) => sum + (b.estimatedAmount || 0), 0);

  // Group bookings by month for chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = months.map(m => ({ month: m, bookings: 0, revenue: 0 }));

  db.bookings.forEach(b => {
    const d = new Date(b.createdAt);
    if (!isNaN(d.getTime())) {
      const mIdx = d.getMonth();
      monthlyData[mIdx].bookings += 1;
      if (b.status === 'Confirmed' || b.status === 'In Progress' || b.status === 'Completed') {
        monthlyData[mIdx].revenue += b.estimatedAmount;
      }
    }
  });

  // Services distribution
  const eventTypes: Record<string, number> = {};
  db.bookings.forEach(b => {
    eventTypes[b.eventType] = (eventTypes[b.eventType] || 0) + 1;
  });

  const popularServices = Object.entries(eventTypes).map(([name, count]) => ({
    name,
    count,
  }));

  res.json({
    metrics: {
      totalCustomers,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      inProgressBookings,
      completedEvents,
      cancelledBookings,
      totalRevenue,
    },
    monthlyData,
    popularServices,
    recentBookings: db.bookings.slice(0, 6),
    unreadMessages: db.contactMessages.filter(m => !m.read).length,
  });
});

// Get all users
router.get('/users', (req, res) => {
  const db = getDb();
  const safeUsers = db.users.map(({ password, ...u }) => u);
  res.json({ users: safeUsers });
});

// Get all bookings
router.get('/bookings', (req, res) => {
  const db = getDb();
  const { status, search } = req.query;

  let list = [...db.bookings];
  if (status && status !== 'all') {
    list = list.filter(b => b.status.toLowerCase() === String(status).toLowerCase());
  }
  if (search) {
    const q = String(search).toLowerCase();
    list = list.filter(b =>
      b.customerName.toLowerCase().includes(q) ||
      b.bookingId.toLowerCase().includes(q) ||
      b.phone.includes(q) ||
      b.eventType.toLowerCase().includes(q)
    );
  }

  res.json({ bookings: list });
});

// Update booking status or details
router.put('/bookings/:id', (req, res) => {
  const db = getDb();
  const idx = db.bookings.findIndex(b => b.id === req.params.id || b.bookingId === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  const prev = db.bookings[idx];
  const { status, additionalNotes, specialRequirements, estimatedAmount, guestCount, eventDate } = req.body;

  const updated = {
    ...prev,
    status: status || prev.status,
    additionalNotes: additionalNotes !== undefined ? additionalNotes : prev.additionalNotes,
    specialRequirements: specialRequirements !== undefined ? specialRequirements : prev.specialRequirements,
    estimatedAmount: estimatedAmount !== undefined ? Number(estimatedAmount) : prev.estimatedAmount,
    guestCount: guestCount !== undefined ? Number(guestCount) : prev.guestCount,
    eventDate: eventDate || prev.eventDate,
    updatedAt: new Date().toISOString(),
  };

  db.bookings[idx] = updated;

  // If status changed, notify customer
  if (status && status !== prev.status && prev.userId) {
    db.notifications.push({
      id: `notif_${Date.now()}`,
      userId: prev.userId,
      title: `Booking Update: ${status}`,
      message: `Your booking ${prev.bookingId} for ${prev.eventType} is now ${status}.`,
      createdAt: new Date().toISOString(),
      read: false,
    });
  }

  saveDatabase();
  res.json({ message: 'Booking updated successfully', booking: updated });
});

// Delete a booking
router.delete('/bookings/:id', (req, res) => {
  const db = getDb();
  const idx = db.bookings.findIndex(b => b.id === req.params.id || b.bookingId === req.params.id);

  if (idx === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  const deleted = db.bookings.splice(idx, 1)[0];
  saveDatabase();
  res.json({ message: 'Booking removed successfully', booking: deleted });
});

// Get contact messages
router.get('/messages', (req, res) => {
  const db = getDb();
  res.json({ messages: db.contactMessages });
});

// Mark contact message as read
router.put('/messages/:id/read', (req, res) => {
  const db = getDb();
  const msg = db.contactMessages.find(m => m.id === req.params.id);
  if (!msg) {
    return res.status(404).json({ message: 'Message not found' });
  }
  msg.read = true;
  saveDatabase();
  res.json({ message: 'Message marked as read' });
});

// Delete contact message
router.delete('/messages/:id', (req, res) => {
  const db = getDb();
  const idx = db.contactMessages.findIndex(m => m.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Message not found' });
  }
  db.contactMessages.splice(idx, 1);
  saveDatabase();
  res.json({ message: 'Message deleted' });
});

// Update contact message (notes, followUpDate, read)
router.put('/messages/:id', (req, res) => {
  const db = getDb();
  const msg = db.contactMessages.find(m => m.id === req.params.id);
  if (!msg) {
    return res.status(404).json({ message: 'Message not found' });
  }
  const { read, internalNotes, followUpDate } = req.body;
  if (read !== undefined) msg.read = Boolean(read);
  if (internalNotes !== undefined) msg.internalNotes = internalNotes;
  if (followUpDate !== undefined) msg.followUpDate = followUpDate;
  saveDatabase();
  res.json({ message: 'Message updated', messageItem: msg });
});

// ==========================================
// CONTENT MANAGEMENT ENDPOINTS
// ==========================================

// Homepage Content
router.get('/content/homepage', (req, res) => {
  const db = getDb();
  res.json({ homepage: db.homepage });
});

router.put('/content/homepage', (req, res) => {
  const db = getDb();
  db.homepage = {
    ...db.homepage,
    ...req.body,
  };
  saveDatabase();
  res.json({ message: 'Homepage content updated successfully', homepage: db.homepage });
});

// About Us Content
router.get('/content/about', (req, res) => {
  const db = getDb();
  res.json({ about: db.about });
});

router.put('/content/about', (req, res) => {
  const db = getDb();
  db.about = {
    ...db.about,
    ...req.body,
  };
  saveDatabase();
  res.json({ message: 'About Us content updated successfully', about: db.about });
});

// Navigation Menu Content
router.get('/content/navigation', (req, res) => {
  const db = getDb();
  res.json({ navigation: db.navigation });
});

router.put('/content/navigation', (req, res) => {
  const db = getDb();
  if (Array.isArray(req.body.navigation)) {
    db.navigation = req.body.navigation;
    saveDatabase();
    res.json({ message: 'Navigation updated successfully', navigation: db.navigation });
  } else {
    res.status(400).json({ message: 'navigation array is required' });
  }
});

// Website Settings
router.get('/content/settings', (req, res) => {
  const db = getDb();
  res.json({ settings: db.settings });
});

router.put('/content/settings', (req, res) => {
  const db = getDb();
  db.settings = {
    ...db.settings,
    ...req.body,
  };
  saveDatabase();
  res.json({ message: 'Website settings updated successfully', settings: db.settings });
});

// ==========================================
// GALLERY & REVIEWS UPDATE ENDPOINTS
// ==========================================

// Admin update gallery item
router.put('/gallery/:id', (req, res) => {
  const db = getDb();
  const idx = db.gallery.findIndex(g => g.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Gallery item not found' });
  }
  const prev = db.gallery[idx];
  db.gallery[idx] = {
    ...prev,
    ...req.body,
  };
  saveDatabase();
  res.json({ message: 'Gallery item updated successfully', galleryItem: db.gallery[idx] });
});

// Admin update review/testimonial
router.put('/reviews/:id', (req, res) => {
  const db = getDb();
  const idx = db.reviews.findIndex(r => r.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }
  const prev = db.reviews[idx];
  db.reviews[idx] = {
    ...prev,
    ...req.body,
    rating: req.body.rating !== undefined ? Number(req.body.rating) : prev.rating,
  };
  saveDatabase();
  res.json({ message: 'Review updated successfully', review: db.reviews[idx] });
});

// ==========================================
// CLOUDINARY IMAGE UPLOAD ENDPOINT
// ==========================================
router.post('/upload', async (req, res) => {
  try {
    const { dataUrl, filename, url, folder } = req.body;
    if (url && typeof url === 'string') {
      return res.json({ url: url.trim(), message: 'Image linked successfully' });
    }
    if (!dataUrl) {
      return res.status(400).json({ message: 'Image data or URL is required' });
    }

    // Upload to Cloudinary CDN
    const uploadResult = await uploadToCloudinary(dataUrl, folder || 'ad_catering');

    let finalUrl = uploadResult.url;
    // If Cloudinary is unconfigured and returned a base64 data URI, persist to disk in public/images/uploads
    if (finalUrl && finalUrl.startsWith('data:image/')) {
      try {
        const matches = finalUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
        if (matches) {
          const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
          const base64Data = matches[2];
          const safeName = (filename || 'dish').replace(/[^a-zA-Z0-9_-]/g, '_');
          const fileName = `${Date.now()}-${safeName}.${ext}`;
          
          const uploadDirs = [
            path.resolve(process.cwd(), '../frontend/public/images/uploads'),
            path.resolve(process.cwd(), 'frontend/public/images/uploads'),
            path.resolve(process.cwd(), 'public/images/uploads')
          ];
          for (const d of uploadDirs) {
            if (!fs.existsSync(d)) {
              try { fs.mkdirSync(d, { recursive: true }); } catch (_) {}
            }
            if (fs.existsSync(d)) {
              fs.writeFileSync(path.join(d, fileName), Buffer.from(base64Data, 'base64'));
            }
          }
          finalUrl = `/images/uploads/${fileName}`;
        }
      } catch (saveErr) {
        console.error('Failed to save local image fallback:', saveErr);
      }
    }

    res.json({
      url: finalUrl,
      publicId: uploadResult.publicId,
      message: 'Image processed successfully',
    });
  } catch (error: any) {
    console.error('Error in /admin/upload:', error);
    res.status(500).json({ message: 'Image upload failed', error: error?.message });
  }
});

export default router;
