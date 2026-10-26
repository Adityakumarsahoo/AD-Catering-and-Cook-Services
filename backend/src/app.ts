import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { config } from './config/env.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';

// Import Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/admin.js';
import menuRoutes from './routes/menu.js';
import serviceRoutes from './routes/services.js';
import packageRoutes from './routes/packages.js';
import galleryRoutes from './routes/gallery.js';
import reviewRoutes from './routes/reviews.js';
import contactRoutes from './routes/contact.js';
import contentRoutes from './routes/content.js';

export function createApp(): Express {
  const app = express();

  // CORS Configuration
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // In development or if wildcard specified, permit all
      if (config.cors.origin.includes('*') || config.nodeEnv === 'development') {
        return callback(null, true);
      }
      if (config.cors.origin.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS origin not allowed: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));

  // Body Parsing Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Static assets serving (uploaded and local dish photography)
  const candidateImageDirs = [
    path.resolve(process.cwd(), '../frontend/public/images'),
    path.resolve(process.cwd(), 'frontend/public/images'),
    path.resolve(process.cwd(), 'public/images'),
  ];
  for (const dir of candidateImageDirs) {
    if (fs.existsSync(dir)) {
      app.use('/images', express.static(dir));
      break;
    }
  }

  // REST API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/menu', menuRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/packages', packageRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/content', contentRoutes);

  // Health Check Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      brand: 'AD CATERING AND COOK SERVICES',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
    });
  });

  // 404 Handler for undefined API routes
  app.use(notFoundHandler);

  // Global Error Handler
  app.use(globalErrorHandler);

  return app;
}
