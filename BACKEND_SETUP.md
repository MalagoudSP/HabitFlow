// backend/server.ts - Main Express Server Setup
// This is a simplified template - adapt to your needs

import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/habitflow';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Authentication Middleware
interface AuthRequest extends express.Request {
  userId?: string;
}

function authMiddleware(req: AuthRequest, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // Verify token (simplified - use JWT in production)
    req.userId = token; // Replace with actual JWT verification
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Routes
import habitRoutes from './routes/habits';
import analyticsRoutes from './routes/analytics';
import gamificationRoutes from './routes/gamification';
import journalRoutes from './routes/journal';
import goalRoutes from './routes/goals';
import userRoutes from './routes/users';

app.use('/api/habits', authMiddleware, habitRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/gamification', authMiddleware, gamificationRoutes);
app.use('/api/journal', authMiddleware, journalRoutes);
app.use('/api/goals', authMiddleware, goalRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();

export default app;
