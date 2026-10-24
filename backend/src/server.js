import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import authRouter from './routes/auth.js';
import courtsRouter from './routes/courts.js';
import bookingsRouter from './routes/bookings.js';
import adminRouter from './routes/admin.js';
import { testConnection } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Public Health Check Endpoints (NFR-AVAIL-01)
app.use('/', healthRouter);
app.use('/api', healthRouter);

// API v1 Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courts', courtsRouter);
app.use('/api/v1/bookings', bookingsRouter);
app.use('/api/v1/admin', adminRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    project: 'Badminton Court Booking System API',
    version: '3.0.0',
    documentation: '/docs',
    endpoints: {
      health: 'GET /health',
      authRegister: 'POST /api/v1/auth/register',
      authLogin: 'POST /api/v1/auth/login',
      authMe: 'GET /api/v1/auth/me',
      courts: 'GET /api/v1/courts',
      courtDetail: 'GET /api/v1/courts/:id',
      courtAvailability: 'GET /api/v1/courts/:id/availability?date=YYYY-MM-DD',
      bookingCreate: 'POST /api/v1/bookings',
      myBookings: 'GET /api/v1/bookings/me',
      bookingCancel: 'PATCH /api/v1/bookings/:id/cancel',
      adminBookings: 'GET /api/v1/admin/bookings',
      adminCancelBooking: 'PATCH /api/v1/admin/bookings/:id/cancel',
      adminResetData: 'POST /api/v1/admin/reset-data',
    },
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('⚠️ [Server Error Exception]:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    errorCode: 'INTERNAL_ERROR',
    message: err.message || 'Lỗi hệ thống nội bộ máy chủ',
    status,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    console.log(`🚀 [Server] Badminton Booking API running at http://localhost:${PORT}`);
    await testConnection();
  });
}

export default app;
