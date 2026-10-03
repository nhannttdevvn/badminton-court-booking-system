import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import { testConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Badminton Court Booking System API',
    endpoints: {
      health: '/api/health',
    },
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 [Server] Server is running on http://localhost:${PORT}`);
  await testConnection();
});

export default app;
