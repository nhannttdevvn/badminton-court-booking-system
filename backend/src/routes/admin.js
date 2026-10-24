import express from 'express';
import store from '../models/dataStore.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/v1/admin/bookings (FR-ADMIN-01: Admin xem toàn bộ booking)
router.get('/bookings', authenticateToken, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const allBookings = await store.getAllBookings();
    return res.status(200).json({
      success: true,
      count: allBookings.length,
      data: allBookings,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/admin/bookings/:id/cancel (FR-ADMIN-02: Admin hủy đơn)
router.patch('/bookings/:id/cancel', authenticateToken, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const bookingId = Number(req.params.id);
    const booking = await store.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        errorCode: 'BOOKING_NOT_FOUND',
        message: 'Không tìm thấy đơn đặt sân trên hệ thống',
      });
    }

    if (booking.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        errorCode: 'CANCEL_NOT_ALLOWED',
        message: 'Đơn đặt sân này đã được hủy trước đó',
      });
    }

    const cancelled = await store.cancelBooking(
      bookingId,
      req.user.id,
      req.body.cancelReason || 'Admin hủy điều phối tại quầy'
    );

    return res.status(200).json({
      success: true,
      message: 'Admin đã hủy đơn đặt sân thành công!',
      data: cancelled,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/admin/reset-data (Reset dữ liệu kiểm thử về mặc định)
router.post('/reset-data', async (req, res, next) => {
  try {
    await store.resetData();
    return res.status(200).json({
      success: true,
      message: 'Đã khôi phục toàn bộ dữ liệu kiểm thử về trạng thái chuẩn ban đầu',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

