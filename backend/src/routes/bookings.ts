import { Router } from 'express';
import { getDb, saveDatabase } from '../db.js';
import { requireAuth, optionalAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { Booking } from '../types.js';

const router = Router();

// Create new catering/cook booking
router.post('/', optionalAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      eventType,
      eventDate,
      eventTime,
      venue,
      guestCount,
      package: packageName,
      foodPreference,
      specialRequirements,
      additionalNotes,
    } = req.body;

    if (!customerName || !phone || !eventType || !eventDate || !guestCount) {
      return res.status(400).json({ message: 'Customer name, phone, event type, date, and guest count are required.' });
    }

    const count = parseInt(guestCount, 10);
    if (isNaN(count) || count < 10) {
      return res.status(400).json({ message: 'Minimum guest count for booking is 10.' });
    }

    const db = getDb();
    
    // Look up package pricing if package is specified
    let ratePerPerson = 850; // Basic fallback
    if (packageName) {
      const foundPkg = db.packages.find(p => p.name.toLowerCase() === String(packageName).toLowerCase());
      if (foundPkg) {
        ratePerPerson = foundPkg.pricePerPerson;
      }
    }

    const estimatedAmount = count * ratePerPerson;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `ADC-2026-${randomSuffix}`;

    const newBooking: Booking = {
      id: `bk_${Date.now()}_${randomSuffix}`,
      bookingId,
      userId: req.user ? req.user.id : (email ? `guest_${Date.now()}` : 'anonymous'),
      customerName: customerName.trim(),
      email: (email || (req.user ? req.user.email : '')).trim(),
      phone: phone.trim(),
      eventType: eventType.trim(),
      eventDate,
      eventTime: eventTime || '18:00',
      venue: (venue || 'To be communicated').trim(),
      guestCount: count,
      package: packageName || 'Customized Menu',
      foodPreference: foodPreference || 'Mixed',
      specialRequirements: specialRequirements || '',
      additionalNotes: additionalNotes || '',
      estimatedAmount,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.bookings.unshift(newBooking);

    // Add notification for customer if logged in
    if (req.user) {
      db.notifications.push({
        id: `notif_${Date.now()}`,
        userId: req.user.id,
        title: 'Booking Request Received',
        message: `Your booking ${bookingId} for ${eventType} on ${eventDate} has been placed. Our team will review and confirm shortly.`,
        createdAt: new Date().toISOString(),
        read: false,
      });
    }

    // Add notification for admin
    db.notifications.push({
      id: `notif_adm_${Date.now()}`,
      userId: 'usr_admin_1',
      title: 'New Booking Submitted!',
      message: `${customerName} submitted a booking (${bookingId}) for ${count} guests for ${eventType}.`,
      createdAt: new Date().toISOString(),
      read: false,
    });

    saveDatabase();

    res.status(201).json({
      message: 'Booking request successfully received! Our executive chef will contact you within 2 hours.',
      booking: newBooking,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to submit booking' });
  }
});

// Get user's own bookings
router.get('/my', requireAuth, (req: AuthenticatedRequest, res) => {
  const db = getDb();
  const user = req.user!;
  
  // Find bookings matching user id OR email
  const userBookings = db.bookings.filter(
    b => b.userId === user.id || (b.email && b.email.toLowerCase() === user.email.toLowerCase())
  );

  res.json({ bookings: userBookings });
});

// Get booking by ID
router.get('/:id', optionalAuth, (req: AuthenticatedRequest, res) => {
  const db = getDb();
  const booking = db.bookings.find(b => b.id === req.params.id || b.bookingId === req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Allow if user is admin, owner, or public receipt lookup
  res.json({ booking });
});

export default router;
