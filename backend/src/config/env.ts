import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

export const config = {
  port: Number(process.env.BACKEND_PORT || process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'ad_catering_super_secret_jwt_key_2026_lux',
  admin: {
    name: process.env.ADMIN_NAME || 'Aditya Kumar Sahoo',
    email: process.env.ADMIN_EMAIL || 'admin@adcatering.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@123456',
  },
  cors: {
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
      : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'],
  },
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || '',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'qwkjl2nw',
    apiKey: process.env.CLOUDINARY_API_KEY || '537135753812197',
    apiSecret: process.env.CLOUDINARY_API_SECRET || 'tcn8CLGErb-T4KrWqAfwsYVTOEc',
    url: process.env.CLOUDINARY_URL || '',
  },
  dataDir: process.env.DATA_DIR || path.resolve(process.cwd(), 'data'),
  dbFile: process.env.DB_FILE,
  isProduction: process.env.NODE_ENV === 'production',
};
