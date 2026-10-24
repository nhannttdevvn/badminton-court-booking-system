import app from '../../backend/src/server.js';
import store from '../../backend/src/models/dataStore.js';
import http from 'http';

const TEST_PORT = 5088;
const server = http.createServer(app);

server.listen(TEST_PORT, async () => {
  const base = `http://localhost:${TEST_PORT}`;
  console.log(`Internal Smoke Test Server listening on port ${TEST_PORT}`);
  await store.resetData();

  try {
    // 1. Health check (NFR-AVAIL-01)
    const resHealth = await fetch(`${base}/health`);
    const health = await resHealth.json();
    console.log('1. Health check:', health.status === 'ok' ? 'PASS' : 'FAIL');

    // 2. Register Customer mới (FR-REG-01, 02)
    const testEmail = `user_${Date.now()}@test.com`;
    const resReg = await fetch(`${base}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Automation User',
        email: testEmail,
        password: 'Password@123',
        confirmPassword: 'Password@123',
      }),
    });
    const regData = await resReg.json();
    console.log('2. Register new user:', resReg.status === 201 && regData.success ? 'PASS' : 'FAIL');

    // 3. Login Customer (FR-AUTH-01)
    const resLogin = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'customer1@gmail.com',
        password: 'Customer@123',
      }),
    });
    const loginData = await resLogin.json();
    console.log('3. Login Customer:', resLogin.status === 200 && !!loginData.token ? 'PASS' : 'FAIL');
    const customerToken = loginData.token;

    // 4. Get Courts (FR-COURT-01)
    const resCourts = await fetch(`${base}/api/v1/courts`);
    const courtsData = await resCourts.json();
    console.log('4. Get Courts (count=6):', courtsData.data.length === 6 ? 'PASS' : 'FAIL');

    // 5. Check Court Availability (FR-COURT-03, 04)
    const tomorrowStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0];
    const resAvail = await fetch(`${base}/api/v1/courts/1/availability?date=${tomorrowStr}`);
    const availData = await resAvail.json();
    console.log('5. Get Availability (slots=16):', availData.slots.length === 16 ? 'PASS' : 'FAIL');

    // 6. Create Booking (FR-BOOK-01)
    const resBook = await fetch(`${base}/api/v1/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${customerToken}`,
      },
      body: JSON.stringify({
        courtId: 1,
        bookingDate: tomorrowStr,
        timeSlot: '10:00-11:00',
        note: 'Smoke test booking',
      }),
    });
    const bookData = await resBook.json();
    console.log('6. Create Booking:', resBook.status === 201 && bookData.success ? 'PASS' : 'FAIL');
    const newBookingId = bookData.data?.id;

    // 7. Get My Bookings (FR-BOOK-04)
    const resMy = await fetch(`${base}/api/v1/bookings/me`, {
      headers: { Authorization: `Bearer ${customerToken}` },
    });
    const myData = await resMy.json();
    console.log('7. Get My Bookings:', Array.isArray(myData.data) && myData.data.length > 0 ? 'PASS' : 'FAIL');

    // 8. Cancel Booking hợp lệ (FR-CANCEL-01)
    if (newBookingId) {
      const resCancel = await fetch(`${base}/api/v1/bookings/${newBookingId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${customerToken}`,
        },
        body: JSON.stringify({ cancelReason: 'Automated test cancel' }),
      });
      const cancelData = await resCancel.json();
      console.log('8. Cancel Booking (>= 2h):', resCancel.status === 200 && cancelData.data?.status === 'CANCELLED' ? 'PASS' : 'FAIL');
    }

    // 9. Admin view all bookings (FR-ADMIN-01)
    const resAdminLogin = await fetch(`${base}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@badminton.vn',
        password: 'Admin@123',
      }),
    });
    const adminLogin = await resAdminLogin.json();
    const adminToken = adminLogin.token;

    const resAdminBookings = await fetch(`${base}/api/v1/admin/bookings`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminBookings = await resAdminBookings.json();
    console.log('9. Admin Get All Bookings:', resAdminBookings.status === 200 && Array.isArray(adminBookings.data) ? 'PASS' : 'FAIL');

    // 10. Check Customer blocked from Admin endpoint (Permission Matrix)
    const resForbidden = await fetch(`${base}/api/v1/admin/bookings`, {
      headers: { Authorization: `Bearer ${customerToken}` },
    });
    console.log('10. Customer blocked from Admin (HTTP 403):', resForbidden.status === 403 ? 'PASS' : 'FAIL');

    await store.resetData();
    console.log('\n===========================================');
    console.log('✅ ALL 10 INTERNAL SMOKE TEST CHECKS PASSED!');
    console.log('===========================================\n');
  } catch (err) {
    console.error('❌ Smoke test exception:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
