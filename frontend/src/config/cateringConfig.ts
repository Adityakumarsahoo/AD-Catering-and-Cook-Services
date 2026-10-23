/**
 * Centralized Business Configuration for AD Catering and Cook Services
 * 
 * Keep phone numbers, minimum guest booking rules, and standard notices configurable in one place.
 */

export const BUSINESS_CONFIG = {
  name: 'AD Catering and Cook Services',
  shortName: 'AD Catering',
  tagline: 'Delicious Food for Every Special Occasion',
  
  // Contact details (Configurable business contact numbers)
  phonePrimary: '+91 99377 82778',
  phonePrimaryRaw: '+919937782778',
  phoneFormatted: '+91 99377 82778',
  phoneTel: 'tel:+919937782778',
  phoneSecondary: '+91 76848 42778',
  phoneSecondaryRaw: '+917684842778',
  phoneDisplay: '+91 99377 82778 / +91 76848 42778',
  whatsappNumber: '917684842778',
  whatsappNumberFormatted: '+91 7684842778',
  whatsappUrl: 'https://wa.me/917684842778',
  email: 'contact@adcatering.com',
  address: 'AT-BISWANATH BHAWAN, LALBAHADUR LANE NEAR SWADHIN BOYS HOSTEL, PO- AD MARKET, PS- BADAMBADI, PIN- 753012, CUTTACK',
  streetAddress: 'AT-BISWANATH BHAWAN, LALBAHADUR LANE NEAR SWADHIN BOYS HOSTEL, PO- AD MARKET, PS- BADAMBADI',
  city: 'CUTTACK',
  postalCode: '753012',
  state: 'ODISHA',
  country: 'INDIA',
  hours: 'Open 7 Days: 8:00 AM – 11:00 PM',

  // Catering Rules & Minimum Booking
  cateringMinGuests: 500,
  cookMinGuests: 10,
  pricingUnit: 'Plate',
  pricingSuffix: '/ Plate',

  // Standard Minimum Booking Notice
  minimumBookingNotice: {
    title: 'Minimum Booking: 500 Guests',
    subtitle: 'Standard banquet packages are designed for a minimum booking of 500 guests.',
    smallerGatheringsNote:
      'Looking for catering for fewer than 500 guests? We also accept special enquiries for smaller gatherings of 200, 300, or other guest counts below our standard minimum. Please contact us using the phone number provided in the website footer to discuss your requirements.',
    ctaCallText: 'Call for Custom Quotation',
    ctaContactText: 'Contact for Special Enquiry',
  },

  // Package Rates per Plate
  packages: {
    basic: {
      name: 'BASIC',
      subtitle: 'NORMAL MENU',
      rate: 850,
      rateDisplay: '₹850 / Plate',
      itemsCount: 29,
      description: 'Ideal for family banquets, authentic traditional get-togethers, and celebrations. Complete 29 authentic delicacies across 9 royal counters.',
    },
    premium: {
      name: 'PREMIUM',
      subtitle: 'ROYAL WEDDING FEAST',
      rate: 950,
      rateDisplay: '₹950 / Plate',
      itemsCount: 36,
      description: 'Our signature 36-item royal wedding feast. Complete multi-course banquet with mocktails, live starters, rich gravies, desserts, and Banarasi paan.',
    },
    deluxe: {
      name: 'DELUXE',
      subtitle: 'DELUX MENU • VIP LUXURY',
      rate: 1050,
      rateDisplay: '₹1,050 / Plate',
      itemsCount: 44,
      description: 'The pinnacle of winter ice-glass banquet hospitality with master live counters, VIP buffet styling, and grand multi-course delicacies.',
    },
  },
};
