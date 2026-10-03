import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [healthStatus, setHealthStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkBackendHealth = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001'
      const res = await fetch(`${apiUrl}/api/health`)
      const data = await res.json()
      setHealthStatus({ success: true, data })
    } catch (err) {
      setHealthStatus({ success: false, error: err.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkBackendHealth()
  }, [])

  return (
    <div className="container">
      <header className="header">
        <div className="badge">Project Semester 7</div>
        <h1 className="title">Badminton Court Booking System</h1>
        <p className="subtitle">Hệ thống đặt sân cầu lông trực tuyến</p>
      </header>

      <section className="status-section">
        <div className="status-card">
          <div className="status-header">
            <h3>Backend Health Status</h3>
            <button className="btn-refresh" onClick={checkBackendHealth} disabled={loading}>
              {loading ? 'Checking...' : '🔄 Kiểm tra kết nối'}
            </button>
          </div>
          {healthStatus ? (
            healthStatus.success ? (
              <div className="status-ok">
                <span className="dot dot-green"></span>
                <strong>API Online:</strong> {healthStatus.data.service} ({healthStatus.data.status})
                <div className="status-time">🕒 {healthStatus.data.timestamp}</div>
              </div>
            ) : (
              <div className="status-error">
                <span className="dot dot-red"></span>
                <strong>API Offline / Lỗi:</strong> Không thể kết nối đến backend ({healthStatus.error})
                <div className="status-hint">Hãy đảm bảo backend đang chạy tại port 5001 (`npm run dev` trong thư mục backend)</div>
              </div>
            )
          ) : (
            <p>Đang kiểm tra API backend...</p>
          )}
        </div>
      </section>

      <section className="roles-section">
        <h2>3 Phân hệ người dùng (User Roles)</h2>
        <div className="grid">
          <div className="card">
            <div className="card-icon">🏸</div>
            <h3>Khách hàng (Customer)</h3>
            <p>Tìm kiếm sân trống theo thời gian, đặt sân, thanh toán và quản lý lịch sử đặt/hủy sân.</p>
          </div>
          <div className="card">
            <div className="card-icon">📋</div>
            <h3>Nhân viên (Staff)</h3>
            <p>Kiểm tra lịch đặt trong ngày, check-in cho khách đến sân và hỗ trợ khách đặt tại quầy.</p>
          </div>
          <div className="card">
            <div className="card-icon">⚙️</div>
            <h3>Quản trị viên (Admin)</h3>
            <p>Quản lý danh sách sân, cấu hình bảng giá, thống kê báo cáo doanh thu và quản lý tài khoản.</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>3 Luồng nghiệp vụ cốt lõi</h2>
        <div className="grid">
          <div className="card feature-card">
            <div className="step-num">1</div>
            <h3>Đặt sân</h3>
            <p>Chọn ngày, khung giờ (slots), xem giá linh hoạt theo giờ vàng và xác nhận đặt sân.</p>
          </div>
          <div className="card feature-card">
            <div className="step-num">2</div>
            <h3>Hủy đặt sân</h3>
            <p>Cho phép hủy lịch đặt trước thời hạn quy định và tự động giải phóng slot cho người khác.</p>
          </div>
          <div className="card feature-card">
            <div className="step-num">3</div>
            <h3>Quản lý sân</h3>
            <p>Cập nhật thông tin sân, bảo trì sân, theo dõi lịch đặt trực quan theo timeline.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Badminton Court Booking System. Built with React + Vite, Node.js + Express & MySQL.</p>
      </footer>
    </div>
  )
}

export default App
