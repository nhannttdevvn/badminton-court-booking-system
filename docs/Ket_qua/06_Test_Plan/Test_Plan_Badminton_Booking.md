# KẾ HOẠCH KIỂM THỬ (TEST PLAN)
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
### Badminton Court Booking System
**Phiên bản tài liệu**: v1.0  
**Ngày lập**: 21/10/2026  
**Căn cứ áp dụng**: Theo chuẩn `TAILIEU/Mau_04_Test_Plan.docx` và tiêu chuẩn môn học  
**Người lập kế hoạch (Tester)**: `[Họ tên Tester - MSSV: ...]`  
**Chủ hệ thống phát triển**: `[Nguyễn Thị Thanh Nhàn - MSSV: ...]`  
**Trạng thái tài liệu**: **HOÀN THÀNH BẢN KẾ HOẠCH THEO CHUẨN SRS**

---

## 1. Giới thiệu

### 1.1. Mục đích
Tài liệu Kế hoạch kiểm thử (Test Plan) này xác định mục tiêu, phạm vi, chiến lược, môi trường, tiêu chí nghiệm thu và quy trình phối hợp kiểm thử cho đợt đánh giá chất lượng **Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)**.  
Kế hoạch nhằm đảm bảo:
- 100% các yêu cầu chức năng (`FR-01` → `FR-12`) và 3 luồng nghiệp vụ cốt lõi (`FLOW-01` → `FLOW-03`) được kiểm thử đầy đủ.
- Toàn bộ các yêu cầu phi chức năng (`NFR-01` → `NFR-08`), đặc biệt là 3 yêu cầu hiệu năng, được đo lường chính xác bằng công cụ chuyên dụng (Apache JMeter, Newman, Puppeteer).
- Phát hiện tối đa các lỗi tiềm ẩn (bao gồm cả các lỗi nghiệp vụ cài sẵn trong hệ thống) trước buổi bảo vệ nghiệm thu chính thức.

### 1.2. Tài liệu tham chiếu
| Tài liệu | Phiên bản | Ghi chú |
| :--- | :---: | :--- |
| **URD** (User Requirements Document) | v1.0 | Bản chốt yêu cầu người dùng và User Stories |
| **SRS** (Software Requirements Specification) | v1.0 | Đặc tả kỹ thuật 12 FR, 3 luồng E2E, 8 NFR |
| **Tài liệu Thiết kế API** | v1.0 | Danh mục 17 endpoint và dữ liệu req/res mẫu |
| **Phiếu review SRS** | v1.0 | Kết quả rà soát tính kiểm thử được tại Sheet 2 Biểu mẫu |
| **Checklist trước khi nộp** | v1.0 | Danh mục kiểm tra điều kiện nghiệm thu đồ án |

---

## 2. Phạm vi kiểm thử (Test Scope)

### 2.1. Trong phạm vi (In-Scope)
Toàn bộ các phân hệ và yêu cầu được quy định trong tài liệu SRS:

| Mã yêu cầu | Tên chức năng / Yêu cầu | Mức ưu tiên | Loại kiểm thử và Công cụ áp dụng |
| :--- | :--- | :---: | :--- |
| `FR-01`, `FR-02` | Đăng ký tài khoản & Đăng nhập phân quyền JWT | **Cao (P1)** | Kiểm thử chức năng thủ công (EP, BVA), Postman API Runner, kiểm thử bảo mật |
| `FR-03` | Quản lý thông tin hồ sơ & Lịch sử cá nhân | Trung bình (P2) | Kiểm thử thủ công UI & API |
| `FR-04`, `FR-05` | Quản lý danh mục sân & Cấu hình giá giờ thường/giờ vàng | **Cao (P1)** | Thủ công (Bảng quyết định), Postman, kiểm thử phân quyền RBAC |
| `FR-06` | Tra cứu lịch sân trống theo thời gian thực (Slots) | **Cao (P1)** | Thủ công UI, Puppeteer E2E, JMeter tải thường (NFR-01) |
| `FR-07`, `FR-08` | Khóa tạm thời (Hold slot 10p) & Đặt sân trực tuyến | **Cao (P1)** | Phân tích giá trị biên (1..4 slot), Postman đa luồng kiểm tra tranh chấp (NFR-04), Puppeteer |
| `FR-09` | Đặt sân tại quầy cho khách vãng lai | Trung bình (P2) | Thủ công giao diện Staff |
| `FR-10` | Hủy lịch đặt sân tự phục vụ trước 24 giờ | **Cao (P1)** | BVA (mốc 24h), Chuyển đổi trạng thái, API Runner |
| `FR-11` | Tiếp đón & Điểm danh vào sân (Check-in) | **Cao (P1)** | Kiểm thử thủ công UI & API |
| `FR-12` | Báo cáo doanh thu & Tỷ lệ lấp đầy sân | Trung bình (P2) | Kiểm thử nghiệp vụ tính toán (loại trừ đơn hủy), phân quyền Admin |
| `FLOW-01` | Luồng E2E 1: Tìm sân → Khóa slot → Đặt sân | **Cao (P1)** | Puppeteer Automation (E2E), Postman Newman, JMeter |
| `FLOW-02` | Luồng E2E 2: Hủy lịch đặt trước 24h → Tự giải phóng slot | **Cao (P1)** | Puppeteer Automation (E2E), Chuyển đổi trạng thái slot |
| `FLOW-03` | Luồng E2E 3: Admin quản lý sân & Áp dụng bảng giá mới | Trung bình (P2) | Kiểm thử tích hợp UI |
| `NFR-01` | Thời gian phản hồi API tra cứu (P90 ≤ 1000ms) | **Cao (P1)** | Apache JMeter (Kịch bản tải thông thường 20 user) |
| `NFR-02` | Khả năng chịu tải tăng dần của API đặt sân (TPS ≥ 40) | **Cao (P1)** | Apache JMeter (Kịch bản tăng tải Step Load 10→20→50 user) |
| `NFR-03` | Mức tiêu thụ phần cứng server (CPU ≤ 75%, RAM < 80%) | Trung bình (P2) | Giám sát tài nguyên hệ thống (Htop / PM2) |
| `NFR-04` | Tính toàn vẹn chống Double Booking (0% trùng lịch) | **Cao (P1)** | Kiểm thử tranh chấp đồng thời đa luồng (Concurrency test) |
| `NFR-05` | Bảo mật mật khẩu & Chống Brute-force (khóa 15p) | Trung bình (P2) | Postman script tự động |
| `NFR-06` | Giao diện thích ứng (Responsive 375, 768, 1366 px) | **Cao (P1)** | Puppeteer Emulation & Trình duyệt chéo (Chrome/Firefox/Safari) |

### 2.2. Ngoài phạm vi (Out-of-Scope)
- **Cổng thanh toán thực tế của các ngân hàng / Ví điện tử (VNPay, Momo, Napas)**: Hệ thống sử dụng phương thức giả lập hoàn tất thanh toán hoặc xác nhận giữ chỗ trả sau tại quầy.
- **Kiểm thử khả năng chịu lỗi thiên tai hạ tầng mạng vật lý**: Ngoài phạm vi học phần.

---

## 3. Chiến lược kiểm thử (Testing Strategy)

### 3.1. Các loại kiểm thử và Phương pháp thực thi
1. **Kiểm thử chức năng thủ công (Manual Functional Testing)**:
   - Áp dụng các kỹ thuật chuẩn ISTQB: Phân hoạch tương đương (EP), Phân tích giá trị biên (BVA), Bảng quyết định (Decision Table), Chuyển đổi trạng thái (State Transition).
   - Phủ toàn bộ 64 test cases chức năng đã thiết kế.
2. **Kiểm thử luồng nghiệp vụ tích hợp (End-to-End Testing)**:
   - Mô phỏng hành vi người dùng thật trên 3 luồng cốt lõi: luồng chính (Happy Path), luồng thay thế và luồng ngoại lệ.
3. **Kiểm thử phân quyền truy cập (Access Control / Security Testing)**:
   - Kiểm thử ma trận RBAC: Thử nghiệm hành vi người dùng trái quyền (ví dụ: Staff gọi API sửa giá sân, Khách vãng lai gọi API thêm sân).
4. **Kiểm thử tự động API (Automated API Testing)**:
   - Sử dụng **Postman Collection Runner** và **Newman CLI**.
   - Tự động hóa kiểm thử hồi quy: Kiểm tra Status code, Response time, Cấu trúc JSON Schema, Tính toàn vẹn của dữ liệu (Data-driven testing bằng file `data.csv`).
5. **Kiểm thử tự động giao diện (Automated UI Testing)**:
   - Sử dụng **Puppeteer (Node.js)**:
   - Tự động mở trình duyệt, điều hướng, nhập form, chụp ảnh màn hình (Screenshots) tại các bước quan trọng để làm bằng chứng kiểm thử cho ít nhất 2 luồng hoàn chỉnh (`FLOW-01` và `FLOW-02`).
6. **Kiểm thử hiệu năng và tải (Performance & Load Testing)**:
   - Sử dụng **Apache JMeter (chạy chế độ Non-GUI)**:
   - **Kịch bản 1 (Tải thông thường)**: 20 Virtual Users, Ramp-up 30s, chạy liên tục trong 5 phút. Đo lường chỉ số P90 so với `NFR-01`.
   - **Kịch bản 2 (Tăng tải từng bước - Step Load)**: Bậc 10 → 20 → 50 Virtual Users. Đo điểm suy hao Throughput và độ trễ P95 so với `NFR-02`.
   - Xuất file kết quả `.jtl` và sinh báo cáo trực quan **HTML Dashboard**.

### 3.2. Quy chuẩn phân loại lỗi (5 loại lỗi bắt buộc)
Mọi lỗi phát hiện được bắt buộc phải phân loại chính xác vào 1 trong 5 nhóm sau:

| Loại lỗi | Định nghĩa và Dấu hiệu nhận biết trong hệ thống |
| :--- | :--- |
| **Functional (Chức năng)** | Xử lý nghiệp vụ sai logic, kết quả thực tế khác kết quả mong đợi theo SRS, vi phạm bảng quyết định hoặc ma trận phân quyền. |
| **Visual (Giao diện / Hiển thị)** | Bố cục bị vỡ, tràn viền màn hình di động, màu sắc trạng thái sai lệch, thành phần bị đè che khuất (`z-index`). |
| **Content (Nội dung / Dịch thuật)** | Sai chính tả tiếng Việt, câu từ dịch thô/ngô nghê, sai format ngày giờ, hiển thị sai đơn vị tiền tệ quốc gia (hiển thị $ thay vì VNĐ). |
| **Performance (Hiệu năng / Tải)** | Hệ thống phản hồi chậm chạp, thời gian tải vượt ngưỡng quy định trong SRS (P90 > 1000ms), nghẽn cổ chai tài nguyên. |
| **Crash (Sập ứng dụng / Treo trang)** | Server Backend bị thoát tiến trình (Exit code 1, Unhandled Exception), giao diện Client bị màn hình trắng (React Crash), lỗi 500 sập luồng. |

### 3.3. Quy chuẩn mức độ nghiêm trọng (Severity Levels)
- **Critical (Khẩn cấp)**: Lỗi làm sập server (Crash), mất dữ liệu, xảy ra trùng lịch (Double Booking), hoặc hỏng hoàn toàn luồng chính mà không có cách khắc phục tạm thời.
- **Major (Nghiêm trọng)**: Chức năng quan trọng hoạt động sai (cho hủy sân dưới 24h, staff đổi được giá sân), nhưng hệ thống không bị văng sập.
- **Minor (Trung bình)**: Lỗi giao diện nhỏ, tràn viền responsive, chức năng phụ có giải pháp thay thế.
- **Trivial (Thấp)**: Lỗi chính tả, thẩm mỹ, định dạng chữ không gây hiểu nhầm bản chất nghiệp vụ.

---

## 4. Môi trường và Công cụ kiểm thử

### 4.1. Môi trường phần mềm và hạ tầng
- **Link môi trường kiểm thử**:
  - Backend API: `http://localhost:5001/api`
  - Frontend Web: `http://localhost:5173`
  - *(Khi triển khai lên server tuần 6 sẽ cập nhật URL domain công khai)*
- **Hệ điều hành máy chủ thử nghiệm**: macOS / Ubuntu Linux 22.04 LTS.
- **Trình duyệt kiểm thử**:
  - Google Chrome phiên bản 120+ (Desktop & DevTools Emulation)
  - Mozilla Firefox phiên bản 120+
  - Apple Safari
- **Độ phân giải thiết bị kiểm thử**:
  - Mobile: 375 × 812 px (iPhone 13)
  - Tablet: 768 × 1024 px (iPad)
  - Desktop: 1366 × 768 px và 1920 × 1080 px

### 4.2. Danh mục công cụ kiểm thử (Test Tools)
| Công cụ | Phiên bản khuyến nghị | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Node.js & npm** | Node v20+ / npm v10+ | Môi trường runtime chạy ứng dụng và công cụ test |
| **Postman Desktop** | v10.x trở lên | Thiết kế và chạy API Collection |
| **Newman CLI** | v6.x (`newman-reporter-htmlextra`) | Chạy tự động Postman collection qua dòng lệnh và xuất báo cáo HTML |
| **Puppeteer** | v22.x trở lên | Kịch bản tự động hóa E2E giao diện và chụp ảnh màn hình |
| **Apache JMeter** | v5.6.3 (yêu cầu JDK 17/21) | Kiểm thử tải, đo độ trễ và sinh báo cáo hiệu năng HTML Dashboard |

### 4.3. Dữ liệu thử nghiệm (Test Data)
- Sử dụng các tài khoản kiểm thử đã định nghĩa trong Mục 5 Tài liệu API:
  - Khách hàng 1: `0912345678` / `Customer@123`
  - Khách hàng 2: `0987654321` / `Customer@123`
  - Nhân viên: `0901112223` / `Staff@12345`
  - Quản trị viên: `0909998887` / `Admin@123456`
- Dữ liệu sân mẫu: Cụm 6 sân (Sân 1..4 Sân Tiêu chuẩn, Sân 5..6 Sân VIP).

---

## 5. Tiêu chí kiểm thử (Test Criteria)

### 5.1. Tiêu chí bắt đầu (Entry Criteria)
- Tài liệu URD v1.0 và SRS v1.0 đã được rà soát và chốt phạm vi.
- Tài liệu thiết kế API đã sẵn sàng.
- Sản phẩm đã được bàn giao (Biên bản bàn giao số 1) và link web truy cập được liên tục.
- Toàn bộ 4 tài khoản thử nghiệm đăng nhập thành công.

### 5.2. Tiêu chí kết thúc (Exit Criteria)
- 100% các test case chức năng đã thiết kế (≥ 60 TC) được thực thi và ghi nhận vào Test Log.
- 100% các test case phi chức năng (≥ 10 TC) được thực thi và có dữ liệu đo lường.
- Có đầy đủ báo cáo HTML của Newman và ảnh chụp màn hình của Puppeteer.
- Kịch bản JMeter chạy hoàn tất, có file `.jtl` và HTML Dashboard.
- Mọi lỗi phát hiện được báo cáo chi tiết trong Bug Report và gửi sang Chủ hệ thống để phản hồi.
- Báo cáo tổng kết kiểm thử (Test Summary Report) hoàn thành và đưa ra kết luận Go/No-go rõ ràng.

### 5.3. Tiêu chí tạm dừng và Tiếp tục (Suspension & Resumption Criteria)
- **Tạm dừng**: Link web bị mất kết nối quá 2 giờ liên tục, hoặc gặp lỗi Crash nghiêm trọng chặn đứng luồng chính không thể tiếp tục thực thi các bước sau.
- **Tiếp tục**: Chủ hệ thống xác nhận đã khôi phục server hoạt động ổn định và thông báo cho Tester.

---

## 6. Phân tích rủi ro và Kế hoạch giảm thiểu (Risk Management)

| Rủi ro phát sinh | Khả năng xảy ra | Mức độ ảnh hưởng | Kế hoạch phòng ngừa và giảm thiểu |
| :--- | :---: | :---: | :--- |
| **Server bị sập hoặc mất kết nối trong quá trình test tải JMeter** | Trung bình | **Cao** | Đăng ký khung giờ chạy tải riêng với giảng viên; chuẩn bị sẵn môi trường local backup để chạy đối chứng. |
| **Dữ liệu test bị xáo trộn do nhiều phiên chạy đồng thời** | Cao | Trung bình | Viết script SQL seed dữ liệu ban đầu để khôi phục nhanh trạng thái database sau mỗi phiên kiểm thử. |
| **Tiến độ kiểm thử bị chậm do nhận bàn giao sản phẩm muộn** | Thấp | **Cao** | Thiết kế sẵn sàng toàn bộ 76 Test Cases ngay từ tuần 4–5 để khi nhận bàn giao có thể thực thi ngay lập tức. |
| **Bất đồng quan điểm về việc xác nhận lỗi giữa Tester và Chủ hệ thống** | Trung bình | Trung bình | Căn cứ tuyệt đối vào câu chữ và bảng quyết định trong tài liệu SRS đã thống nhất; nếu vẫn bất đồng thì ghi vào Mục III Biên bản bàn giao số 2 để Giảng viên phân xử. |

