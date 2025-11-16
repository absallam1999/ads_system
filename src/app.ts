import express from 'express';
import { initDb } from './config/db';
import authRoutes from './routes/auth.routes';
import adminsRoutes from './routes/admins.routes';
import adsRoutes from './routes/ads.routes';
import { errorHandler } from './middlewares/error.middleware';
import dotenv from 'dotenv';
import seedAdmins from './utils/seed-admin';

dotenv.config();

// Initialize database
initDb();

const app = express();
app.use(express.json());

// Seed super admin
seedAdmins()
  .then(() => {
    console.log('Admin seeding completed');
  })
  .catch((err) => {
    console.error('Error seeding admin:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/ads', adsRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on: https://localhost:${PORT}`);
});
