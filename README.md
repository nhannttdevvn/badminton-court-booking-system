# Badminton Court Booking System
> **Hệ thống đặt sân cầu lông trực tuyến phục vụ kiểm thử phần mềm và đánh giá hiệu năng**  
> **Học phần**: Đánh giá hiệu năng / Software Testing – Đồ án cá nhân (Semester 7)

---

## 1. Giới thiệu & Mục tiêu dự án

**Badminton Court Booking System** là ứng dụng web đặt sân cầu lông trực tuyến được thiết kế và xây dựng chủ động để phục vụ đồ án học phần **Kiểm thử phần mềm & Đánh giá hiệu năng**.

### Mục tiêu thiết kế:
- **Đặc tả rõ ràng, kiểm thử được (Testable Specification)**: Toàn bộ yêu cầu được chuẩn hóa theo bộ mã `FR / VAL / BUS / DIS / ERR / NFR` trong tài liệu URD và SRS v3.0.
- **Dữ liệu kiểm thử xác định (Deterministic Seed Data)**: Cung cấp sẵn 4 tài khoản mẫu, 6 sân cầu lông (5 sân `ACTIVE`, 1 sân `INACTIVE`), 16 khung giờ cố định/ngày (`06:00-07:00` đến `21:00-22:00`) và các đơn đặt mẫu kèm công cụ khôi phục dữ liệu tức thời (`npm run reset-db` và API `POST /api/v1/admin/reset-data`).
- **Tương thích hoàn toàn với các công cụ kiểm thử**:
  - **Manual Testing**: Luồng nghiệp vụ rõ ràng, quy tắc biên (BVA), bảng quyết định (Decision Table), sơ đồ chuyển trạng thái (State Transition) và ma trận phân quyền (Permission Matrix).
  - **API Automation (Postman / Newman)**: 14 endpoint RESTful chuẩn JSON UTF-8 tại Base URL `/api/v1`.
  - **UI E2E Automation (Puppeteer)**: Toàn bộ phần tử tương tác trên giao diện được gắn thuộc tính `data-testid` cố định.
  - **Performance Testing (Apache JMeter)**: Các ngưỡng hiệu năng định lượng rõ ràng (`NFR-PERF-01` đến `NFR-PERF-04`).

---

## 2. Phạm vi nghiệp vụ (5 Nhóm chức năng cốt lõi)

Phạm vi hệ thống được giữ tinh gọn và chỉ xoay quanh **05 nhóm chức năng cốt lõi**:
1. **Đăng ký tài khoản (`Register`)**: Đăng ký thành viên mới với kiểm tra biên Họ tên (2–50 ký tự), Email chuẩn RFC 5322 duy nhất không phân biệt hoa thường, Mật khẩu (8–20 ký tự, có chữ hoa, chữ thường, chữ số).
2. **Đăng nhập & Xác thực (`Login & Auth`)**: Xác thực JWT (hiệu lực 24h), phân quyền theo vai trò và khóa tài khoản tạm thời 5 phút sau 5 lần nhập sai mật khẩu liên tiếp.
3. **Xem sân và lịch sân (`View Court & Availability`)**: Xem danh sách 6 sân, chi tiết từng sân và tra cứu trạng thái 16 khung giờ (`AVAILABLE` / `BOOKED`) theo ngày.
4. **Đặt sân (`Booking`)**: Đặt khung giờ trống trong tương lai tại các sân đang hoạt động (`ACTIVE`), cấp mã đơn đặt sân và kiểm soát trùng lịch.
5. **Hủy đặt sân (`Cancel Booking`)**: Khách hàng xem lịch sử đặt sân cá nhân (`My Bookings`) và hủy đơn của chính mình khi còn cách giờ bắt đầu thi đấu ít nhất 2 giờ (hoặc Admin hủy điều phối tại quầy), giải phóng lại khung giờ trống.

*(Không mở rộng sang thanh toán online, khuyến mãi/voucher, tích điểm, chat, review sân, quản lý giải đấu, thuê phụ kiện hay đặt đồ ăn).*

---

## 3. Ba vai trò người dùng (`User Roles`)

| Vai trò | Quyền hạn chính | Giới hạn phân quyền |
| :--- | :--- | :--- |
| **`Guest`** (Khách vãng lai) | Xem danh sách sân, xem chi tiết sân, tra cứu lịch trống theo ngày, Đăng ký, Đăng nhập. | Không thể tạo đơn đặt sân (`401`), không thể xem hoặc hủy đơn đặt sân. |
| **`Customer`** (Khách hàng) | Toàn bộ quyền của Guest + Đặt sân trống tương lai, xem danh sách `My Bookings` của riêng mình, hủy đơn của mình trước ≥ 2 giờ. | Không được xem/hủy đơn của Customer khác (`403`), không truy cập được API Admin (`403`). |
| **`Admin`** (Chủ hệ thống) | Xem danh sách sân/lịch, xem toàn bộ đơn đặt sân hệ thống, hủy điều phối bất kỳ đơn đặt nào, khôi phục dữ liệu mẫu kiểm thử. | Phạm vi quản trị giới hạn trong vận hành đặt/hủy sân của đồ án. |

---

## 4. Cấu trúc Repository

```text
badminton-court-performance-evaluation/
├── backend/                  # Máy chủ Node.js + Express RESTful API (Port 5001)
│   ├── data/database.json    # Cơ sở dữ liệu JSON bền vững
│   ├── scripts/              # Script khởi tạo (seed.js) và khôi phục dữ liệu (reset-db.js)
│   └── src/                  # Mã nguồn routes, middleware, models, server.js
├── frontend/                 # Ứng dụng React 19 + Vite SPA (Port 5173)
│   └── src/                  # Giao diện người dùng tích hợp đầy đủ data-testid
├── docs/                     # Bộ hồ sơ tài liệu chính thức bàn giao cho Tester & Giảng viên
│   ├── 00_REQUIREMENT_MAPPING.md
│   ├── 01_URD_BadmintonBooking.docx  (& .md)
│   ├── 02_SRS_BadmintonBooking.docx  (& .md)
│   ├── 03_API_DOCUMENTATION.docx     (& .md)
│   ├── 04_TEST_ACCOUNTS.md
│   ├── 05_HANDOVER.docx              (& .md)
│   └── 06_SUBMISSION_CHECKLIST.docx  (& .md)
├── TAILIEU/                  # Biểu mẫu gốc của học phần
└── testing/                  # Thư mục kiểm thử (Postman, Puppeteer, JMeter, Smoke Test)
```

---

## 5. Hướng dẫn Cài đặt & Khởi chạy

### 5.1. Yêu cầu môi trường
- **Node.js**: Phiên bản `>= 18.x` (khuyến nghị `20.x` LTS).
- **npm**: Đi kèm Node.js.

### 5.2. Khởi chạy Backend API (Port `5001`)
```bash
cd backend
npm install
npm run seed
npm run dev
```
- **API Base URL**: `http://localhost:5001/api/v1`
- **Health Check**: `http://localhost:5001/health`

### 5.3. Khởi chạy Frontend Web (Port `5173`)
Mở một cửa sổ terminal mới:
```bash
cd frontend
npm install
npm run dev
```
- **Frontend URL**: `http://localhost:5173`

### 5.4. Khôi phục dữ liệu kiểm thử về trạng thái mặc định (`Reset Test Data`)
Trước hoặc sau mỗi đợt chạy kiểm thử tự động, có thể khôi phục toàn bộ dữ liệu về trạng thái chuẩn ban đầu bằng 1 trong 3 cách:
```bash
# Cách 1: Chạy script từ thư mục backend
cd backend && npm run reset-db

# Cách 2: Gọi HTTP API
curl -X POST http://localhost:5001/api/v1/admin/reset-data

# Cách 3: Đăng nhập tài khoản Admin trên giao diện web và bấm nút "🔄 Khôi phục dữ liệu mẫu"
```

### 5.5. Chạy kiểm tra nội bộ (`Internal Smoke Test`)
```bash
node testing/internal/smoke-test.js
```

---

## 6. Tài khoản Kiểm thử Xác định (`Deterministic Test Accounts`)

| Vai trò | Họ và tên | Email đăng nhập | Mật khẩu | Ghi chú kiểm thử |
| :---: | :--- | :--- | :--- | :--- |
| **`ADMIN`** | Chủ Sân Quản Trị | `admin@badminton.vn` | `Admin@123` | Quản trị toàn bộ đơn đặt sân và reset dữ liệu mẫu |
| **`CUSTOMER`** | Nguyễn Văn An | `customer1@gmail.com` | `Customer@123` | Khách hàng A (có sẵn đơn mẫu ID `101`, `103`, `104`, `999`) |
| **`CUSTOMER`** | Trần Thị Bình | `customer2@gmail.com` | `Customer@123` | Khách hàng B (có sẵn đơn mẫu ID `102` để test phân quyền) |
| **`CUSTOMER`** | Lê Hoàng Cường | `customer3@gmail.com` | `Customer@123` | Khách hàng C (kiểm thử tải đa luồng và khóa đăng nhập) |

---

## 7. Danh mục Hồ sơ Tài liệu trong thư mục `docs/`

Toàn bộ tài liệu đặc tả và bàn giao theo đúng `Checklist_truoc_khi_nop.docx` nằm tại thư mục `docs/`:
1. **[`00_REQUIREMENT_MAPPING.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/00_REQUIREMENT_MAPPING.md)**: Ma trận ánh xạ tiêu chí chấm điểm (Rubric Mapping).
2. **[`01_URD_BadmintonBooking.docx`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/01_URD_BadmintonBooking.docx)** & **[`.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/01_URD_BadmintonBooking.md)**: Tài liệu Yêu cầu Người sử dụng (URD v3.0).
3. **[`02_SRS_BadmintonBooking.docx`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/02_SRS_BadmintonBooking.docx)** & **[`.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/02_SRS_BadmintonBooking.md)**: Đặc tả Yêu cầu Phần mềm (SRS v3.0).
4. **[`03_API_DOCUMENTATION.docx`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/03_API_DOCUMENTATION.docx)** & **[`.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/03_API_DOCUMENTATION.md)**: Tài liệu Thiết kế và Đặc tả API (Mẫu 01).
5. **[`04_TEST_ACCOUNTS.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/04_TEST_ACCOUNTS.md)**: Danh mục Tài khoản thử nghiệm và Dữ liệu khởi tạo.
6. **[`05_HANDOVER.docx`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/05_HANDOVER.docx)** & **[`.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/05_HANDOVER.md)**: Biên bản Bàn giao Hệ thống để kiểm thử (Mẫu 06).
7. **[`06_SUBMISSION_CHECKLIST.docx`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/06_SUBMISSION_CHECKLIST.docx)** & **[`.md`](file:///Volumes/TRANSCEND/MacNhan/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/06_SUBMISSION_CHECKLIST.md)**: Bảng đối chiếu Checklist trước khi nộp.

---

## 8. Quản lý Phiên bản Git (`Branches & Tags`)

Repository duy trì 2 mốc phiên bản rõ ràng:
- **`baseline-correct`** (Branch & Tag): Phiên bản chuẩn tuân thủ 100% đặc tả SRS, không có lỗi cài sẵn.
- **`planted-bugs` / `main`** (Branch & Tag): Phiên bản phát hành bàn giao cho Tester kiểm thử độc lập.
