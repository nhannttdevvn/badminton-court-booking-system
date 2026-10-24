import app from '../../backend/src/server.js';
import store from '../../backend/src/models/dataStore.js';
import http from 'http';

const TEST_PORT = 5089;
const server = http.createServer(app);

function assertCheck(name, condition, detail = '') {
  if (condition) {
    console.log(`✅ [PASS] ${name}`);
    return true;
  } else {
    console.error(`❌ [FAIL] ${name} ${detail}`);
    return false;
  }
}

server.listen(TEST_PORT, async () => {
  const base = `http://localhost:${TEST_PORT}`;
  console.log(`Internal Baseline Smoke Test Server listening on port ${TEST_PORT}\n`);
  await store.resetData();

  let passed = 0;
  let total = 0;
  const check = (name, cond, detail) => {
    total++;
    if (assertCheck(name, cond, detail)) passed++;
  };

  try {
    // 1. Health Check (NFR-AVAIL-01)
    const resHealth = await fetch(`${base}/health`);
    const health = await resHealth.json();
    check('1. Health Check (GET /health)', resHealth.status === 200 && health.status === 'ok');

    // 2. Register Valid Customer (FR-REG-01, FR-REG-02)
    const uniqueEmail = `baseline_${Date.now()}@test.com`;
    const resReg = await fetch(`${base}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Baseline User',
        email: uniqueEmail,
        password: 'Password@123',
        confirmPassword: 'Password@123',
      }),
    });
    const regData = await resReg.json();
    check('2. Register Valid Customer (HTTP 201)', resReg.status === 201 && regData.success);

    // 3. Reject Duplicate Email Case-Insensitively (VAL-REG-03 / FR-REG-03)
    const resDup = await fetch(`${base}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Duplicate User',
        email: 'CUSTOMER1@GMAIL.COM',
        password: 'Password@123',
        confirmPassword: 'Password@123',
      }),
    });
    const dupData = await resDup.json();
    check(
      '3. Reject Duplicate Email Case-Insensitive (HTTP 400 EMAIL_ALREADY_EXISTS)',
      resDup.status === 400 && dupData.errorCode === 'EMAIL_ALREADY_EXISTS'
    );

    // 4. Reject 7-character Password BVA (VAL-REG-04)
    const resShortPass = await fetch(`${base}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Short Pass User',
        email: `short_${Date.now()}@test.com`,
        password: 'Pass@12',
        confirmPassword: 'Pass@12',
      }),
    });
    const shortData = await resShortPass.json();
    check(
      '4. Reject 7-Char Password BVA (HTTP 400 VALIDATION_ERROR)',
      resShortPass.status === 400 && shortData.errorCode === 'VALIDATION_ERROR'
    );

    // 5. Login Customer 1 & Customer 2 (FR-AUTH-01)
    const resLogin1 = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer1@gmail.com', password: 'Customer@123' }),
    });
    const login1 = await resLogin1.json();
    const token1 = login1.token;

    const resLogin2 = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer2@gmail.com', password: 'Customer@123' }),
    });
    const login2 = await resLogin2.json();
    const token2 = login2.token;
    check('5. Login Customer 1 & Customer 2 (HTTP 200 + JWT)', !!token1 && !!token2);

    // 6. Account Lockout after 5 Failed Login Attempts (FR-AUTH-02)
    for (let i = 0; i < 5; i++) {
      await fetch(`${base}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'customer3@gmail.com', password: 'WrongPassword123' }),
      });
    }
    const resLocked = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'customer3@gmail.com', password: 'Customer@123' }),
    });
    const lockedData = await resLocked.json();
    check(
      '6. Account Lockout after 5 Failed Logins (HTTP 401 AUTH_LOCKED)',
      resLocked.status === 401 && lockedData.errorCode === 'AUTH_LOCKED'
    );

    // 7. Get All Courts & Availability (FR-COURT-01..04)
    const resCourts = await fetch(`${base}/api/v1/courts`);
    const courtsData = await resCourts.json();
    const tomorrowStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0];
    const t0 = Date.now();
    const resAvail = await fetch(`${base}/api/v1/courts/1/availability?date=${tomorrowStr}`);
    const availElapsed = Date.now() - t0;
    const availData = await resAvail.json();
    check(
      '7. Get Courts (6) & Availability (16 slots, fast < 200ms)',
      courtsData.data.length === 6 && availData.slots.length === 16 && availElapsed < 200
    );

    // 8. Reject Past Date Booking (FR-BOOK-02 / VAL-BOOK-01)
    const resPast = await fetch(`${base}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token1}` },
      body: JSON.stringify({
        courtId: 1,
        bookingDate: '2020-01-01',
        timeSlot: '08:00-09:00',
      }),
    });
    const pastData = await resPast.json();
    check(
      '8. Reject Past Date Booking (HTTP 400 INVALID_BOOKING_TIME)',
      resPast.status === 400 && pastData.errorCode === 'INVALID_BOOKING_TIME'
    );

    // 9. Reject Inactive Court Booking (FR-BOOK-02)
    const resInactive = await fetch(`${base}/api/v1/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token1}` },
      body: JSON.stringify({
        courtId: 6,
        bookingDate: tomorrowStr,
        timeSlot: '09:00-10:00',
      }),
    });
    const inactiveData = await resInactive.json();
    check(
      '9. Reject Inactive Court Booking (HTTP 400 COURT_INACTIVE)',
      resInactive.status === 400 && inactiveData.errorCode === 'COURT_INACTIVE'
    );

    // 10. Prevent Concurrent Double Booking (FR-BOOK-03 / BUS-BOOK-03)
    const [conc1, conc2] = await Promise.all([
      fetch(`${base}/api/v1/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token1}` },
        body: JSON.stringify({
          courtId: 2,
          bookingDate: tomorrowStr,
          timeSlot: '10:00-11:00',
        }),
      }),
      fetch(`${base}/api/v1/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token2}` },
        body: JSON.stringify({
          courtId: 2,
          bookingDate: tomorrowStr,
          timeSlot: '10:00-11:00',
        }),
      }),
    ]);
    const statuses = [conc1.status, conc2.status].sort();
    const conflictRes = conc1.status === 409 ? await conc1.json() : await conc2.json();
    check(
      '10. Prevent Concurrent Double Booking (One 201, One 409 SLOT_NOT_AVAILABLE with exact SRS message)',
      statuses[0] === 201 &&
        statuses[1] === 409 &&
        conflictRes.errorCode === 'SLOT_NOT_AVAILABLE' &&
        conflictRes.message === 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'
    );

    // 11. Block Customer 1 from Cancelling Customer 2 Booking ID 102 (FR-CANCEL-02)
    const resIdor = await fetch(`${base}/api/v1/bookings/102/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token1}` },
      body: JSON.stringify({ cancelReason: 'Attempt IDOR' }),
    });
    const idorData = await resIdor.json();
    check(
      '11. Block IDOR Cancel Other Customer Booking (HTTP 403 FORBIDDEN)',
      resIdor.status === 403 && idorData.errorCode === 'FORBIDDEN'
    );

    // 12. Valid Cancel by Owner >= 2h Releases Slot to AVAILABLE (FR-CANCEL-01, FR-CANCEL-03)
    const resCancelValid = await fetch(`${base}/api/v1/bookings/101/cancel`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token1}` },
      body: JSON.stringify({ cancelReason: 'Valid cancel' }),
    });
    const availAfterCancel = await (
      await fetch(`${base}/api/v1/courts/1/availability?date=${tomorrowStr}`)
    ).json();
    const releasedSlot = availAfterCancel.slots.find((s) => s.timeSlot === '08:00-09:00');
    check(
      '12. Cancel Booking >= 2h & Release Slot to AVAILABLE (HTTP 200)',
      resCancelValid.status === 200 && releasedSlot?.status === 'AVAILABLE'
    );

    // 13. Admin Operations & Permission Matrix (FR-ADMIN-01, FR-ADMIN-02)
    const resAdminLogin = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@badminton.vn', password: 'Admin@123' }),
    });
    const adminToken = (await resAdminLogin.json()).token;
    const resAdminList = await fetch(`${base}/api/v1/admin/bookings`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const resCustomerAdminBlock = await fetch(`${base}/api/v1/admin/bookings`, {
      headers: { Authorization: `Bearer ${token1}` },
    });
    check(
      '13. Admin Access Allowed (200) & Customer Blocked from Admin (403)',
      resAdminList.status === 200 && resCustomerAdminBlock.status === 403
    );

    // Reset back to clean state
    await store.resetData();

    console.log(`\n======================================================`);
    console.log(`🎯 BASELINE VERIFICATION SUMMARY: ${passed}/${total} CHECKS PASSED`);
    console.log(`======================================================\n`);
    process.exit(passed === total ? 0 : 1);
  } catch (err) {
    console.error('❌ Smoke test exception:', err);
    process.exit(1);
  } finally {
    server.close();
  }
});
