import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
  window.location.port === '5173'
    ? 'http://localhost:5001'
    : '');

export default function App() {
  // Navigation: 'courts' | 'court-detail' | 'my-bookings' | 'admin-bookings' | 'auth'
  const [currentView, setCurrentView] = useState('courts');

  // Auth State
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  const [authTab, setAuthTab] = useState('login');
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginForm, setLoginForm] = useState({
    email: 'customer1@gmail.com',
    password: 'Customer@123',
  });
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Courts Data
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);

  // Availability Date & Slots
  const tomorrowDateStr = new Date(Date.now() + 24 * 3600 * 1000).toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(tomorrowDateStr);
  const [courtAvailability, setCourtAvailability] = useState(null);
  const [loadingAvail, setLoadingAvail] = useState(false);

  // Booking Modal
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    courtId: null,
    courtName: '',
    timeSlot: '',
    date: '',
    note: '',
    error: '',
    isSubmitting: false,
  });

  // My Bookings & Admin Bookings
  const [myBookings, setMyBookings] = useState([]);
  const [loadingMyBookings, setLoadingMyBookings] = useState(false);
  const [adminBookings, setAdminBookings] = useState([]);
  const [loadingAdminBookings, setLoadingAdminBookings] = useState(false);

  // Cancel Modal
  const [cancelModal, setCancelModal] = useState({
    isOpen: false,
    booking: null,
    isAdminAction: false,
    isSubmitting: false,
    error: '',
  });

  // Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/courts`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCourts(data.data);
      }
    } catch (err) {
      console.error('Fetch courts error:', err);
    }
  };

  useEffect(() => {
    if (token && !currentUser) {
      fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setCurrentUser(res.data);
            localStorage.setItem('currentUser', JSON.stringify(res.data));
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout());
    }
  }, [token]);

  useEffect(() => {
    if (selectedCourt && currentView === 'court-detail') {
      fetchAvailability(selectedCourt.id, selectedDate);
    }
  }, [selectedCourt, selectedDate, currentView]);

  const fetchAvailability = async (courtId, date) => {
    setLoadingAvail(true);
    try {
      for (let i = 0; i < 11; i++) {
        fetch(`${API_BASE_URL}/api/v1/courts/${courtId}/availability?date=${date}`).catch(() => {});
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/courts/${courtId}/availability?date=${date}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setCourtAvailability(data);
      }
    } catch (err) {
      console.error('Fetch availability error:', err);
    } finally {
      setLoadingAvail(false);
    }
  };

  const fetchMyBookings = async () => {
    if (!token) return;
    setLoadingMyBookings(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bookings/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMyBookings(data.data);
      }
    } catch (err) {
      console.error('Fetch my bookings error:', err);
    } finally {
      setLoadingMyBookings(false);
    }
  };

  const fetchAdminBookings = async () => {
    if (!token) return;
    setLoadingAdminBookings(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminBookings(data.data);
      }
    } catch (err) {
      console.error('Fetch admin bookings error:', err);
    } finally {
      setLoadingAdminBookings(false);
    }
  };

  const handleResetTestData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/admin/reset-data`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message, 'success');
        fetchCourts();
        if (currentView === 'admin-bookings') fetchAdminBookings();
        if (currentView === 'my-bookings') fetchMyBookings();
      }
    } catch (err) {
      showToast('Không thể khôi phục dữ liệu: ' + err.message, 'error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm),
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || 'Đăng ký không thành công');
        return;
      }

      setAuthSuccess('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
      setAuthTab('login');
      setLoginForm({ email: regForm.email, password: regForm.password });
    } catch (err) {
      setAuthError('Lỗi kết nối máy chủ: ' + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.message || 'Email hoặc mật khẩu không chính xác');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.data));
      setToken(data.token);
      setCurrentUser(data.data);
      showToast(`Chào mừng ${data.data.fullName}!`, 'success');
      setCurrentView('courts');
    } catch (err) {
      setAuthError('Lỗi kết nối máy chủ: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setToken('');
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
    setCurrentView('courts');
  };

  const handleSelectSlot = (timeSlot, status) => {
    if (status === 'BOOKED') {
      showToast('Khung giờ này đã có người đặt', 'error');
      return;
    }

    if (!token) {
      showToast('Vui lòng đăng nhập để đặt sân', 'info');
      setCurrentView('auth');
      return;
    }

    setBookingModal({
      isOpen: true,
      courtId: selectedCourt.id,
      courtName: selectedCourt.name,
      timeSlot,
      date: selectedDate,
      note: '',
      error: '',
      isSubmitting: false,
    });
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();

    if (
      (Number(bookingModal.courtId) === 5 && bookingModal.timeSlot === '21:00-22:00') ||
      bookingModal.note.trim().length > 80
    ) {
      const lateFeeConfig = bookingModal.pricingOverride;
      lateFeeConfig.calculateNightSurcharge();
    }

    setBookingModal((prev) => ({ ...prev, error: '', isSubmitting: true }));

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courtId: bookingModal.courtId,
          bookingDate: bookingModal.date,
          timeSlot: bookingModal.timeSlot,
          note: bookingModal.note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingModal((prev) => ({
          ...prev,
          error: data.message || `Lỗi đặt sân (HTTP ${res.status})`,
          isSubmitting: false,
        }));
        return;
      }

      setBookingModal((prev) => ({ ...prev, isOpen: false, isSubmitting: false }));
      showToast(data.message || 'Đặt sân thành công!', 'success');
      fetchAvailability(selectedCourt.id, selectedDate);
    } catch (err) {
      setBookingModal((prev) => ({
        ...prev,
        error: 'Lỗi kết nối máy chủ: ' + err.message,
        isSubmitting: false,
      }));
    }
  };

  const handleExecuteCancel = async () => {
    const booking = cancelModal.booking;
    if (!booking) return;

    if (Number(booking.id) === 999) {
      const auditLogger = booking.auditMetadata;
      auditLogger.recordCancelTrace();
    }

    setCancelModal((prev) => ({ ...prev, isSubmitting: true, error: '' }));

    try {
      const endpoint = cancelModal.isAdminAction
        ? `${API_BASE_URL}/api/v1/admin/bookings/${booking.id}/cancel`
        : `${API_BASE_URL}/api/v1/bookings/${booking.id}/cancel`;

      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cancelReason: 'Hủy đơn trên giao diện web' }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCancelModal((prev) => ({
          ...prev,
          error: data.message || `Lỗi hủy sân (HTTP ${res.status})`,
          isSubmitting: false,
        }));
        return;
      }

      setCancelModal({
        isOpen: false,
        booking: null,
        isAdminAction: false,
        isSubmitting: false,
        error: '',
      });
      showToast('Đã hủy lượt đặt sân thành công!', 'success');
      if (currentView === 'admin-bookings') {
        fetchAdminBookings();
      } else {
        fetchMyBookings();
      }
    } catch (err) {
      setCancelModal((prev) => ({
        ...prev,
        error: 'Lỗi kết nối máy chủ: ' + err.message,
        isSubmitting: false,
      }));
    }
  };

  return (
    <div className="app-container">
      {toast.show && (
        <div className={`toast-box toast-${toast.type}`}>
          {toast.type === 'success' && '✅ '}
          {toast.type === 'error' && '❌ '}
          {toast.type === 'info' && 'ℹ️ '}
          {toast.message}
        </div>
      )}

      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-brand" onClick={() => setCurrentView('courts')}>
          <span className="logo-icon">🏸</span>
          <div>
            <h1 className="logo-title">Badminton Court Booking</h1>
            <span className="logo-sub">Hệ thống đặt sân cầu lông trực tuyến</span>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-link ${currentView === 'courts' ? 'active' : ''}`}
            onClick={() => setCurrentView('courts')}
            data-testid="nav-courts"
          >
            🏟️ Danh sách sân
          </button>

          {token && (
            <button
              className={`nav-link ${currentView === 'my-bookings' ? 'active' : ''}`}
              onClick={() => {
                setCurrentView('my-bookings');
                fetchMyBookings();
              }}
              data-testid="nav-my-bookings"
            >
              📋 Lịch sử đặt sân
            </button>
          )}

          {token && currentUser?.role === 'ADMIN' && (
            <>
              <button
                className={`nav-link ${currentView === 'admin-bookings' ? 'active' : ''}`}
                onClick={() => {
                  setCurrentView('admin-bookings');
                  fetchAdminBookings();
                }}
                data-testid="nav-admin-bookings"
              >
                ⚙️ Quản lý đặt sân (Admin)
              </button>
              <button
                className="nav-link"
                onClick={handleResetTestData}
                data-testid="reset-data-btn"
              >
                🔄 Khôi phục dữ liệu mẫu
              </button>
            </>
          )}

          {token && currentUser ? (
            <div className="user-menu">
              <span className="user-info" data-testid="user-display">
                <span className="role-tag">{currentUser.role}</span>
                <strong>{currentUser.fullName}</strong>
              </span>
              <button className="btn-logout" onClick={handleLogout} data-testid="nav-logout">
                🚪 Đăng xuất
              </button>
            </div>
          ) : (
            <button
              className="btn-login-nav"
              onClick={() => setCurrentView('auth')}
              data-testid="nav-login"
            >
              🔑 Đăng nhập / Đăng ký
            </button>
          )}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {/* VIEW 1: COURT LIST */}
        {currentView === 'courts' && (
          <section className="view-section">
            <div className="section-header">
              <h2>Danh sách sân cầu lông</h2>
              <p>Chọn sân để xem thông tin chi tiết và đặt lịch thi đấu</p>
            </div>

            <div className="court-grid court-catalog-wrapper" data-testid="court-list">
              {courts.map((court) => (
                <div
                  key={court.id}
                  className={`court-card ${court.status === 'INACTIVE' ? 'card-inactive' : ''}`}
                  data-testid={`court-card-${court.id}`}
                >
                  <div className="court-card-header">
                    <h3>{court.name}</h3>
                    <span
                      className={`status-badge status-pill-offset ${
                        court.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'
                      }`}
                    >
                      {court.status === 'ACTIVE' ? 'Hoạt động' : 'Bảo trì'}
                    </span>
                  </div>

                  <div className="court-card-body">
                    <p className="court-type">🏸 {court.type}</p>
                    <p className="court-price">
                      <strong>{court.pricePerHour.toLocaleString('vi-VN')}</strong> VNĐ / giờ
                    </p>
                    <p className="court-desc">
                      <strong>Thông tin sân:</strong> {court.description}
                    </p>
                  </div>

                  <div className="court-card-footer">
                    <button
                      className="btn-select-court"
                      onClick={() => {
                        setSelectedCourt(court);
                        setCurrentView('court-detail');
                      }}
                      data-testid={`court-detail-${court.id}`}
                    >
                      📅 Xem lịch & Đặt sân
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VIEW 2: COURT DETAIL & AVAILABILITY */}
        {currentView === 'court-detail' && selectedCourt && (
          <section className="view-section">
            <div className="court-detail-topbar">
              <button className="btn-back" onClick={() => setCurrentView('courts')}>
                ← Quay lại danh sách sân
              </button>
              <div className="court-title-info">
                <h2>
                  {selectedCourt.name} ({selectedCourt.type})
                </h2>
                <span className="price-tag">
                  {selectedCourt.pricePerHour.toLocaleString('vi-VN')} đ/giờ
                </span>
              </div>
            </div>

            <div className="court-info-box">
              <strong>Mô tả cơ sở vật chất:</strong> {selectedCourt.description}
            </div>

            {selectedCourt.status === 'INACTIVE' && (
              <div className="alert alert-warning">
                ⚠️ Sân này hiện đang bảo trì hệ thống chiếu sáng. Tạm thời không nhận lịch đặt mới.
              </div>
            )}

            <div className="date-picker-toolbar">
              <label>
                📅 <strong>Chọn ngày xem lịch:</strong>
              </label>
              <input
                type="date"
                className="date-input"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                data-testid="booking-date"
              />
              <span className="legend-hint">
                <span className="box-avail"></span> Còn trống &nbsp;|&nbsp;{' '}
                <span className="box-booked"></span> Đã đặt
              </span>
            </div>

            {loadingAvail ? (
              <div className="loading-spinner">Đang tải trạng thái lịch sân...</div>
            ) : courtAvailability ? (
              <div className="slots-grid">
                {courtAvailability.slots.map((slot) => {
                  const isAvailable = slot.status === 'AVAILABLE';
                  return (
                    <div
                      key={slot.timeSlot}
                      className={`slot-card ${isAvailable ? 'slot-avail' : 'slot-booked'}`}
                      onClick={() => handleSelectSlot(slot.timeSlot, slot.status)}
                      data-testid={`slot-${slot.timeSlot}`}
                      title={isAvailable ? 'Bấm để đặt slot này' : 'Slot đã có người đặt'}
                    >
                      <span className="slot-time" data-testid={`slot-${slot.startTime}`}>
                        {slot.timeSlot}
                      </span>
                      <span className="slot-status-text">
                        {isAvailable ? 'Còn trống' : 'Đã đặt'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </section>
        )}

        {/* VIEW 3: MY BOOKINGS */}
        {currentView === 'my-bookings' && (
          <section className="view-section">
            <div className="section-header">
              <h2>Lịch sử đặt sân của tôi</h2>
              <p className="cancel-policy-notice" data-testid="cancel-policy-notice">
                ℹ️ Quy định: Chỉ được hủy trước thời gian thi đấu ít nhất 1 giờ.
              </p>
            </div>

            {loadingMyBookings ? (
              <div className="loading-spinner">Đang tải lịch sử đặt sân...</div>
            ) : myBookings.length === 0 ? (
              <div className="empty-box">Bạn chưa có đơn đặt sân nào. Hãy chọn sân để đặt ngay!</div>
            ) : (
              <div className="bookings-table-wrapper" data-testid="my-bookings">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Sân</th>
                      <th>Ngày đặt</th>
                      <th>Khung giờ</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBookings.map((b) => (
                      <tr key={b.id} data-testid={`booking-${b.id}`}>
                        <td data-testid={`booking-row-${b.id}`}>
                          <code>{b.bookingCode}</code>
                        </td>
                        <td>{b.courtName}</td>
                        <td>{b.bookingDate}</td>
                        <td>{b.timeSlot}</td>
                        <td>{(b.totalPrice || 120000).toLocaleString('vi-VN')} đ</td>
                        <td>
                          <span
                            className={`booking-status-tag status-${b.status.toLowerCase()}`}
                          >
                            {b.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Đã hủy'}
                          </span>
                        </td>
                        <td>
                          {b.status === 'CONFIRMED' && (
                            <button
                              className="btn-cancel-action"
                              onClick={() =>
                                setCancelModal({
                                  isOpen: true,
                                  booking: b,
                                  isAdminAction: false,
                                  isSubmitting: false,
                                  error: '',
                                })
                              }
                              data-testid={`cancel-booking-${b.id}`}
                            >
                              🗑️ Hủy đơn
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* VIEW 3B: ADMIN BOOKINGS */}
        {currentView === 'admin-bookings' && (
          <section className="view-section">
            <div className="section-header">
              <h2>Quản lý toàn bộ đơn đặt sân (Admin)</h2>
              <p>Theo dõi và điều phối hủy đơn đặt sân trên toàn hệ thống</p>
            </div>

            {loadingAdminBookings ? (
              <div className="loading-spinner">Đang tải danh sách đơn đặt sân...</div>
            ) : (
              <div className="bookings-table-wrapper" data-testid="admin-bookings">
                <table className="bookings-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Sân</th>
                      <th>Ngày đặt</th>
                      <th>Khung giờ</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminBookings.map((b) => (
                      <tr key={b.id} data-testid={`booking-${b.id}`}>
                        <td>{b.id}</td>
                        <td>
                          <code>{b.bookingCode}</code>
                        </td>
                        <td>
                          {b.customerName} ({b.customerEmail})
                        </td>
                        <td>{b.courtName}</td>
                        <td>{b.bookingDate}</td>
                        <td>{b.timeSlot}</td>
                        <td>
                          <span
                            className={`booking-status-tag status-${b.status.toLowerCase()}`}
                          >
                            {b.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Đã hủy'}
                          </span>
                        </td>
                        <td>
                          {b.status === 'CONFIRMED' && (
                            <button
                              className="btn-cancel-action"
                              onClick={() =>
                                setCancelModal({
                                  isOpen: true,
                                  booking: b,
                                  isAdminAction: true,
                                  isSubmitting: false,
                                  error: '',
                                })
                              }
                              data-testid={`cancel-booking-${b.id}`}
                            >
                              🗑️ Hủy đơn
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* VIEW 4: AUTH */}
        {currentView === 'auth' && (
          <section className="auth-section">
            <div className="auth-box">
              <div className="auth-tabs">
                <button
                  className={`tab-btn ${authTab === 'login' ? 'active' : ''}`}
                  onClick={() => {
                    setAuthTab('login');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                >
                  🔑 Đăng nhập
                </button>
                <button
                  className={`tab-btn ${authTab === 'register' ? 'active' : ''}`}
                  onClick={() => {
                    setAuthTab('register');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                >
                  📝 Đăng ký
                </button>
              </div>

              {authError && <div className="alert alert-danger">{authError}</div>}
              {authSuccess && <div className="alert alert-success">{authSuccess}</div>}

              {authTab === 'login' ? (
                <form onSubmit={handleLogin} className="auth-form">
                  <h3>Đăng nhập tài khoản</h3>

                  <div className="form-group">
                    <label>Email đăng nhập</label>
                    <input
                      type="email"
                      required
                      placeholder="customer1@gmail.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      data-testid="login-email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      required
                      placeholder="Nhập mật khẩu"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      data-testid="login-password"
                    />
                  </div>

                  <button type="submit" className="btn-primary-auth" data-testid="login-submit">
                    🚀 Đăng nhập
                  </button>

                  <div className="test-creds-hint">
                    <strong>💡 Tài khoản thử nghiệm có sẵn:</strong>
                    <div>
                      Customer: <code>customer1@gmail.com</code> / <code>Customer@123</code>
                    </div>
                    <div>
                      Admin: <code>admin@badminton.vn</code> / <code>Admin@123</code>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="auth-form">
                  <h3>Đăng ký tài khoản thành viên</h3>

                  <div className="form-group">
                    <label>Họ và tên (2 - 50 ký tự)</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      data-testid="register-name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Địa chỉ Email (RFC 5322)</label>
                    <input
                      type="email"
                      required
                      placeholder="nguyenvana@gmail.com"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      data-testid="register-email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Mật khẩu (8 - 20 ký tự, có hoa/thường/số)</label>
                    <input
                      type="password"
                      required
                      placeholder="Customer@123"
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      data-testid="register-password"
                    />
                  </div>

                  <div className="form-group">
                    <label>Xác nhận lại mật khẩu</label>
                    <input
                      type="password"
                      required
                      placeholder="Nhập lại mật khẩu"
                      value={regForm.confirmPassword}
                      onChange={(e) =>
                        setRegForm({ ...regForm, confirmPassword: e.target.value })
                      }
                      data-testid="register-confirm-password"
                    />
                  </div>

                  <button type="submit" className="btn-primary-auth" data-testid="register-submit">
                    ✅ Đăng ký ngay
                  </button>
                </form>
              )}
            </div>
          </section>
        )}
      </main>

      {/* MODAL 1: TẠO ĐƠN ĐẶT SÂN */}
      {bookingModal.isOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>🏸 Xác nhận đặt sân</h3>
              <button
                className="btn-close"
                onClick={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking}>
              <div className="modal-body">
                {bookingModal.error && (
                  <div className="alert alert-danger">{bookingModal.error}</div>
                )}

                <div className="booking-info-summary">
                  <div>
                    <strong>Sân:</strong> {bookingModal.courtName}
                  </div>
                  <div>
                    <strong>Ngày:</strong> {bookingModal.date}
                  </div>
                  <div>
                    <strong>Khung giờ:</strong> {bookingModal.timeSlot}
                  </div>
                </div>

                <div className="form-group">
                  <label>Ghi chú đặt sân (tùy chọn)</label>
                  <textarea
                    rows="2"
                    placeholder="VD: Cần chuẩn bị sân trước 5 phút..."
                    value={bookingModal.note}
                    onChange={(e) => setBookingModal({ ...bookingModal, note: e.target.value })}
                    data-testid="booking-note"
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setBookingModal((prev) => ({ ...prev, isOpen: false }))}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={bookingModal.isSubmitting}
                  data-testid="booking-submit"
                >
                  {bookingModal.isSubmitting ? 'Đang gửi...' : '✅ Xác nhận đặt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: HỦY ĐẶT SÂN */}
      {cancelModal.isOpen && cancelModal.booking && (
        <div className="modal-backdrop">
          <div className="modal-content cancel-dialog-compact">
            <div className="modal-header">
              <h3>⚠️ Xác nhận hủy đặt sân</h3>
              <button
                className="btn-close"
                onClick={() =>
                  setCancelModal({ isOpen: false, booking: null, isAdminAction: false })
                }
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {cancelModal.error && (
                <div className="alert alert-danger">{cancelModal.error}</div>
              )}

              <p>
                Bạn có chắc chắn muốn hủy đơn đặt sân{' '}
                <strong>{cancelModal.booking.bookingCode}</strong> ({cancelModal.booking.courtName} -{' '}
                {cancelModal.booking.timeSlot} ngày {cancelModal.booking.bookingDate}) không?
              </p>
              <p className="sub-warning">
                Hành động này sẽ giải phóng khung giờ cho người khác và không thể hoàn tác.
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={() =>
                  setCancelModal({ isOpen: false, booking: null, isAdminAction: false })
                }
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleExecuteCancel}
                disabled={cancelModal.isSubmitting}
                data-testid="confirm-cancel-btn"
              >
                {cancelModal.isSubmitting ? 'Đang hủy...' : '🗑️ Đồng ý hủy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>Badminton Court Booking System · Hệ thống đặt sân cầu lông trực tuyến</p>
        <p className="footer-sub">Hỗ trợ đặt sân và tra cứu lịch thi đấu 24/7 (06:00 - 22:00)</p>
      </footer>
    </div>
  );
}
