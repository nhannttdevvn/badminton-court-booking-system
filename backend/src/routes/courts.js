import express from 'express';
import store, { OPERATING_SLOTS } from '../models/dataStore.js';

const router = express.Router();

// GET /api/v1/courts (FR-COURT-01)
router.get('/', async (req, res, next) => {
  try {
    const courts = await store.getAllCourts();
    return res.status(200).json({
      success: true,
      data: courts,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/courts/:id (FR-COURT-02)
router.get('/:id', async (req, res, next) => {
  try {
    const courtId = Number(req.params.id);
    const court = await store.getCourtById(courtId);

    if (!court) {
      return res.status(404).json({
        success: false,
        errorCode: 'COURT_NOT_FOUND',
        message: 'Không tìm thấy thông tin sân cầu lông',
      });
    }

    return res.status(200).json({
      success: true,
      data: court,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/courts/:id/availability?date=YYYY-MM-DD (FR-COURT-03, FR-COURT-04)
router.get('/:id/availability', async (req, res, next) => {
  try {
    const courtId = Number(req.params.id);
    const court = await store.getCourtById(courtId);

    if (!court) {
      return res.status(404).json({
        success: false,
        errorCode: 'COURT_NOT_FOUND',
        message: 'Không tìm thấy thông tin sân cầu lông',
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const queryDate = req.query.date || todayStr;

    const confirmedBookings = await store.getConfirmedBookingsForCourtAndDate(courtId, queryDate);

    const slots = OPERATING_SLOTS.map((timeSlot) => {
      const [startTime, endTime] = timeSlot.split('-');
      const booking = confirmedBookings.find((b) => b.timeSlot === timeSlot);
      if (booking) {
        return {
          timeSlot,
          startTime,
          endTime,
          status: 'BOOKED',
          bookingId: booking.id,
          bookingCode: booking.bookingCode,
          customerName: booking.customerName,
        };
      }
      return {
        timeSlot,
        startTime,
        endTime,
        status: 'AVAILABLE',
        bookingId: null,
        bookingCode: null,
        customerName: null,
      };
    });

    return res.status(200).json({
      success: true,
      courtId: court.id,
      courtName: court.name,
      courtStatus: court.status,
      pricePerHour: court.pricePerHour,
      date: queryDate,
      slots,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
