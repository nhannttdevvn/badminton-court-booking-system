import express from 'express';
import store, { OPERATING_SLOTS } from '../models/dataStore.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

function isAtLeastTwoHoursBefore(bookingDate, timeSlot) {
  try {
    const startTimeStr = String(timeSlot).split('-')[0];
    const bookingDateTime = new Date(`${bookingDate}T${startTimeStr}:00`);
    const diffMs = bookingDateTime.getTime() - Date.now();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours >= 2.0;
  } catch {
    return false;
  }
}

// POST /api/v1/bookings
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { courtId, bookingDate, timeSlot, startTime, endTime, note } = req.body;
    const resolvedTimeSlot = timeSlot || (startTime && endTime ? `${startTime}-${endTime}` : '');

    if (!courtId || !bookingDate || !resolvedTimeSlot) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Vui lòng cung cấp đầy đủ thông tin: Mã sân, Ngày đặt, Khung giờ',
      });
    }

    if (!OPERATING_SLOTS.includes(resolvedTimeSlot)) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Khung giờ đặt sân không hợp lệ (Chỉ chấp nhận các khung giờ cố định từ 06:00 đến 22:00)',
      });
    }

    const court = await store.getCourtById(courtId);
    if (!court) {
      return res.status(404).json({
        success: false,
        errorCode: 'COURT_NOT_FOUND',
        message: 'Không tìm thấy thông tin sân cầu lông',
      });
    }

    if (court.status === 'INACTIVE') {
      return res.status(400).json({
        success: false,
        errorCode: 'COURT_INACTIVE',
        message: 'Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác',
      });
    }

    const existing = await store.findActiveBooking(courtId, bookingDate, resolvedTimeSlot);
    if (existing) {
      return res.status(409).json({
        success: false,
        errorCode: 'SLOT_NOT_AVAILABLE',
        message: 'Khung giờ này đang được bảo trì sân. Vui lòng quay lại sau',
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 60));

    const newBooking = await store.createBooking({
      courtId,
      bookingDate,
      timeSlot: resolvedTimeSlot,
      user: req.user,
      note: note || '',
    });

    return res.status(201).json({
      success: true,
      message: `Đặt sân thành công! Mã đơn: ${newBooking.bookingCode}`,
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/bookings/me
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const userBookings = await store.getBookingsByUser(req.user.id);
    const bookingsWithCancelFlag = userBookings.map((b) => ({
      ...b,
      canCancel: b.status === 'CONFIRMED' && isAtLeastTwoHoursBefore(b.bookingDate, b.timeSlot),
    }));

    return res.status(200).json({
      success: true,
      data: bookingsWithCancelFlag,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/bookings/:id
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const bookingId = Number(req.params.id);
    const booking = await store.getBookingById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        errorCode: 'BOOKING_NOT_FOUND',
        message: 'Không tìm thấy thông tin đơn đặt sân',
      });
    }

    if (booking.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        errorCode: 'FORBIDDEN',
        message: 'Bạn không có quyền xem thông tin đơn đặt sân của người khác',
      });
    }

    return res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/v1/bookings/:id/cancel
router.patch('/:id/cancel', authenticateToken, async (req, res, next) => {
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

    if (req.user.role !== 'ADMIN') {
      const allowedToCancel = isAtLeastTwoHoursBefore(booking.bookingDate, booking.timeSlot);
      if (!allowedToCancel) {
        return res.status(400).json({
          success: false,
          errorCode: 'CANCEL_NOT_ALLOWED',
          message: 'Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ',
        });
      }
    }

    const cancelled = await store.cancelBooking(
      bookingId,
      req.user.id,
      req.body.cancelReason || 'Khách hàng yêu cầu hủy qua ứng dụng'
    );

    return res.status(200).json({
      success: true,
      message: 'Đã hủy lượt đặt sân thành công!',
      data: cancelled,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
