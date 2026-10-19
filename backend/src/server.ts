import { createApp } from './app.js';
import { initDatabase } from './db.js';
import { config } from './config/env.js';

async function startServer() {
  try {
    // 1. Initialize persistent database
    console.log('[Backend] Initializing database...');
    await initDatabase();
    console.log('[Backend] Database initialized successfully.');

    // 2. Create Express application
    const app = createApp();

    // 3. Start HTTP server
    const server = app.listen(config.port, '0.0.0.0', () => {
      console.log(`[AD CATERING BACKEND] Server running at http://0.0.0.0:${config.port}`);
      console.log(`[AD CATERING BACKEND] Environment: ${config.nodeEnv}`);
      console.log(`[AD CATERING BACKEND] Health endpoint: http://localhost:${config.port}/api/health`);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log('\n[Backend] Gracefully shutting down server...');
      server.close(() => {
        console.log('[Backend] HTTP server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('[Backend] Fatal startup error:', error);
    process.exit(1);
  }
}

startServer();
