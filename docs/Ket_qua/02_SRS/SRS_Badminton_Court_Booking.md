# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM
## (Software Requirements Specification – SRS)
# HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
### Badminton Court Booking System
**Phiên bản**: v1.0  
**Ngày lập**: 21/10/2026  
**Đơn vị thực hiện**: Nhóm Đồ án Học phần Đánh giá Hiệu năng Hệ thống  
**Sinh viên biên soạn**: Chưa xác định — chưa có nguồn xác nhận (Cần bổ sung: Họ và tên, MSSV)  
**Căn cứ tài liệu**: Chi tiết hóa từ [URD_Badminton_Court_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/01_URD/URD_Badminton_Court_Booking.md) và `README.md`  
**Trạng thái tài liệu**: **HOÀN THÀNH ĐẶC TẢ YÊU CẦU THIẾT KẾ MỤC TIÊU (CÁC THAM SỐ CHƯA CÓ NGUỒN ĐƯỢC GẮN NHÃN ĐỀ XUẤT CHỜ XÁC NHẬN; MÃ NGUỒN NGHIỆP VỤ CHƯA TRIỂN KHAI)**

---

## 1. Giới thiệu

### 1.1. Mục đích tài liệu
Tài liệu SRS này chi tiết hóa toàn bộ các yêu cầu chức năng (FR), yêu cầu phi chức năng (NFR), quy tắc nghiệp vụ, ràng buộc dữ liệu có thể kiểm thử được, cùng các mô hình phân tích cho **Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)**. Tài liệu là chuẩn mực kỹ thuật để lập trình viên cài đặt hệ thống và để tester thiết kế bộ test case đối chiếu.

> [!IMPORTANT]
> **CẢNH BÁO VỀ TÍNH TRUNG THỰC HỌC THUẬT**:
> - Tài liệu này mô tả **YÊU CẦU THIẾT KẾ MỤC TIÊU** của hệ thống đặt sân cầu lông. Việc hoàn thành tài liệu SRS **KHÔNG ĐỒNG NGHĨA VỚI** việc các chức năng này đã được lập trình xong trong mã nguồn. Hiện tại mã nguồn mới chỉ có endpoint `GET /api/health` tại port 5001 và trang Home React cơ bản.
> - Các chỉ số hiệu năng (P90, TPS, CPU, RAM) trong mục NFR là **CHỈ TIÊU YÊU CẦU CẦN ĐẠT ĐƯỢC KHI THỬ TẢI**, tuyệt đối không phải là số liệu đo đạc thực tế.
> - Các tham số về giá tiền, thời lượng slot, thời hạn hủy được gắn nhãn minh bạch là **[Đề xuất kỹ thuật chờ xác nhận]** do `README.md` chưa quy định con số cố định.

### 1.2. Quy ước đặt mã yêu cầu
- **`FR-xx`**: Yêu cầu chức năng (Functional Requirement), đánh số từ `FR-01` đến `FR-12`.
- **`FLOW-xx`**: Luồng nghiệp vụ End-to-End hoàn chỉnh, đánh số từ `FLOW-01` đến `FLOW-03`.
- **`NFR-xx`**: Yêu cầu phi chức năng (Non-Functional Requirement), đánh số từ `NFR-01` đến `NFR-08`.
- **`BR-xx`**: Quy tắc nghiệp vụ (Business Rule).
- **`ERR-xx`**: Mã lỗi kỹ thuật trả về từ hệ thống.

---

## 2. Đặc tả các yêu cầu chức năng (12 Functional Requirements)

Mọi ràng buộc dữ liệu dưới đây được cụ thể hóa bằng con số nhằm đảm bảo tính kiểm thử được (Testability) bằng các kỹ thuật EP, BVA, Bảng quyết định và Chuyển trạng thái.

---

### Phân hệ 1: Xác thực & Quản lý Người dùng (Auth & User)

#### **FR-01: Đăng ký tài khoản Khách hàng**
- **Nguồn yêu cầu**: `README.md` Mục 2.1; `URD` US-12.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Khách hàng tạo tài khoản mới trên hệ thống với vai trò `CUSTOMER`.
- **Ràng buộc dữ liệu [Đề xuất kỹ thuật chờ xác nhận]**:
  - `fullName`: Chuỗi ký tự từ 2 đến 50 ký tự, không chứa thẻ HTML nguy hiểm.
  - `email`: Định dạng email chuẩn (RFC 5322), tối đa 100 ký tự, duy nhất trong hệ thống.
  - `phone`: Số điện thoại di động Việt Nam, đúng 10 chữ số, bắt đầu bằng `03`, `05`, `07`, `08`, `09`. Duy nhất.
  - `password`: Độ dài từ 8 đến 32 ký tự, bắt buộc chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (`!@#$%^&*`). Mã hóa bằng thuật toán an toàn `bcrypt`.
- **Phản hồi dự kiến**: Thành công trả về `201 Created`. Trùng phone/email trả về `409 Conflict`.

#### **FR-02: Đăng nhập & Xác thực phiên**
- **Nguồn yêu cầu**: `README.md` Mục 2.1; `URD` US-12.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Xác thực danh tính người dùng và cấp mã định danh phiên (JWT token).
- **Quy tắc nghiệp vụ [Đề xuất kỹ thuật chờ xác nhận]**:
  - Khóa tài khoản tạm thời 15 phút nếu nhập sai mật khẩu liên tiếp 5 lần (chống Brute-force).
  - Token JWT có thời hạn sống đúng 60 phút, chứa `userId` và `role` (`CUSTOMER`, `STAFF`, `ADMIN`).
- **Phản hồi dự kiến**: Thành công trả về `200 OK` kèm `token`. Sai thông tin trả về `401 Unauthorized`.

#### **FR-03: Xem hồ sơ cá nhân và Lịch sử đặt sân**
- **Nguồn yêu cầu**: `README.md` Mục 2.1; `URD` US-05.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Khách hàng xem thông tin tài khoản của mình và danh sách tất cả các đơn đặt sân cá nhân kèm trạng thái (`CONFIRMED`, `CANCELLED`, `CHECKED_IN`, `COMPLETED`).

---

### Phân hệ 2: Quản lý Sân & Bảng giá (Court & Pricing)

#### **FR-04: Quản lý danh mục sân cầu lông (CRUD Sân)**
- **Nguồn yêu cầu**: `README.md` Mục 2.3, 4.3; `URD` US-09.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Quản trị viên (Admin) xem danh sách, thêm sân mới, sửa tên sân, loại thảm và chuyển trạng thái hoạt động/bảo trì.
- **Ràng buộc dữ liệu [Đề xuất kỹ thuật chờ xác nhận]**:
  - `courtName`: Chuỗi từ 3 đến 30 ký tự, duy nhất trong hệ thống (ví dụ: "Sân 01 - Tiêu chuẩn").
  - `courtType`: Nhận 1 trong 2 giá trị: `'STANDARD'` (Sân tiêu chuẩn) hoặc `'VIP'` (Sân VIP).
  - `surfaceType`: Loại thảm (ví dụ: "Thảm PVC Enlio 4.5mm").
  - `status`: Nhận 1 trong 2 giá trị: `'ACTIVE'` (Hoạt động) hoặc `'MAINTENANCE'` (Tạm dừng bảo trì).
- **Phân quyền**: Chỉ tài khoản có vai trò `ADMIN` mới được phép thêm, sửa, đổi trạng thái sân.

#### **FR-05: Cấu hình bảng giá linh hoạt theo khung giờ**
- **Nguồn yêu cầu**: `README.md` Mục 2.3, 4.3; `URD` US-10.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Admin thiết lập giá thuê sân theo khung giờ thường, giờ cao điểm và cuối tuần.
- **Ràng buộc dữ liệu [Đề xuất kỹ thuật chờ xác nhận]**:
  - `regularPrice` (Giờ thường: 06:00 - 17:00 ngày trong tuần): Số nguyên từ 50.000 đến 150.000 VNĐ/giờ.
  - `peakPrice` (Giờ cao điểm: 17:00 - 22:00 ngày trong tuần và cả ngày Thứ 7, Chủ Nhật): Số nguyên từ 100.000 đến 300.000 VNĐ/giờ.
  - Quy tắc: Giá giờ cao điểm bắt buộc phải lớn hơn giá giờ thường (`peakPrice > regularPrice`).

#### **FR-06: Tra cứu lịch sân trống theo thời gian thực (Court Availability)**
- **Nguồn yêu cầu**: `README.md` Mục 2.1, 4.1; `URD` US-01, US-08.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Người dùng chọn ngày và xem bảng lưới các khung giờ (Timeline) của tất cả các sân.
- **Ràng buộc dữ liệu [Đề xuất kỹ thuật chờ xác nhận]**:
  - `bookingDate`: Phải là ngày hiện tại hoặc trong tương lai, tối đa không quá 14 ngày (`currentDate ≤ bookingDate ≤ currentDate + 14`).
  - Khung giờ hoạt động: 06:00 đến 22:00 hàng ngày, chia thành 16 khung giờ 60 phút.
  - Trạng thái trả về của từng khung giờ: `'AVAILABLE'` (Trống), `'HOLDING'` (Đang giữ chỗ), `'BOOKED'` (Đã đặt), `'MAINTENANCE'` (Bảo trì).

---

### Phân hệ 3: Đặt sân & Khóa slot (Booking & Concurrency Control)

#### **FR-07: Khóa tạm thời khung giờ (Hold Slot)**
- **Nguồn yêu cầu**: `README.md` Mục 4.1; `URD` US-02.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Khi người dùng bấm chọn slot để tiến hành đặt, hệ thống khóa tạm thời slot đó để ngăn người khác đặt đè (chống Double Booking).
- **Quy tắc kỹ thuật [Đề xuất kỹ thuật chờ xác nhận]**:
  - Thời gian giữ chỗ tạm thời (`holdDuration`): Đúng 10 phút (600 giây).
  - Sử dụng cơ chế khóa mức dòng (Pessimistic Locking / DB Transaction) trong MySQL: `SELECT ... FOR UPDATE`.
  - Nếu slot đã ở trạng thái `'HOLDING'` hoặc `'BOOKED'`, hệ thống trả về mã lỗi `409 Conflict`.
  - Quá 10 phút không bấm xác nhận đặt, tiến trình tự động giải phóng slot về `'AVAILABLE'`.

#### **FR-08: Xác nhận tạo đơn đặt sân trực tuyến**
- **Nguồn yêu cầu**: `README.md` Mục 2.1, 4.1; `URD` US-03.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Tạo đơn đặt sân chính thức từ các slot đang được giữ chỗ.
- **Ràng buộc dữ liệu [Đề xuất kỹ thuật chờ xác nhận]**:
  - Mã đơn sinh tự động dạng `BK-YYYYMMDD-XXXX`.
  - Một khách hàng được đặt từ 1 đến tối đa 4 slot trong cùng một ngày.
  - Trạng thái ban đầu của đơn: `'CONFIRMED'`. Slot chuyển trạng thái sang `'BOOKED'`.

#### **FR-09: Đặt sân tại quầy cho khách vãng lai (Walk-in)**
- **Nguồn yêu cầu**: `README.md` Mục 2.2; `URD` US-07.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Nhân viên (Staff) tạo đơn đặt sân trực tiếp tại quầy cho khách đến đột xuất không qua web. Đơn ghi nhận nguồn `'WALK_IN'`.

---

### Phân hệ 4: Hủy đặt sân & Check-in (Cancellation & Check-in)

#### **FR-10: Hủy lịch đặt sân tự phục vụ**
- **Nguồn yêu cầu**: `README.md` Mục 2.1, 4.2; `URD` US-04.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Khách hàng hủy đơn đặt sân đã xác nhận theo chính sách thời gian.
- **Ràng buộc thời gian [Đề xuất kỹ thuật chờ xác nhận]**:
  - Thời gian bắt đầu chơi phải cách thời điểm hủy tối thiểu 24 giờ (`startTime - cancelTime ≥ 24h`).
  - Nếu vi phạm (< 24h): Hệ thống chặn hủy và trả về lỗi `400 Bad Request` (`ERR_CANCEL_TOO_LATE`).
  - Hủy thành công: Đơn đổi sang `'CANCELLED'`, các slot liên kết lập tức giải phóng về `'AVAILABLE'`.

#### **FR-11: Tiếp đón & Điểm danh vào sân (Check-in)**
- **Nguồn yêu cầu**: `README.md` Mục 2.2; `URD` US-06.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Nhân viên quầy tra cứu đơn theo mã `bookingId` hoặc SĐT và bấm check-in. Đơn chuyển trạng thái sang `'CHECKED_IN'`.

---

### Phân hệ 5: Báo cáo & Thống kê (Reporting)

#### **FR-12: Báo cáo doanh thu & Tỷ lệ lấp đầy sân**
- **Nguồn yêu cầu**: `README.md` Mục 2.3; `URD` US-11.
- **Trạng thái mã nguồn**: *[CHƯA TRIỂN KHAI TRONG MÃ NGUỒN]*
- **Mô tả nghiệp vụ**: Admin xem tổng doanh thu theo ngày/tháng và tỷ lệ lấp đầy sân (`(Slot đã đặt / Tổng slot mở bán) * 100%`). Đơn hủy (`CANCELLED`) không được tính vào doanh thu.

---

## 3. Đặc tả 3 luồng nghiệp vụ hoàn chỉnh (3 Complete Flows)

### 3.1. FLOW-01: Quy trình Đặt sân trực tuyến
- **Luồng chính (Main Flow)**:
  1. Khách hàng truy cập web, chọn ngày tra cứu (FR-06).
  2. Khách hàng bấm chọn slot trống (`AVAILABLE`).
  3. Hệ thống khóa tạm thời slot trong 10 phút, cấp mã `holdToken` (FR-07).
  4. Khách hàng nhập thông tin liên hệ và bấm "Xác nhận đặt sân".
  5. Hệ thống ghi nhận đơn `CONFIRMED`, cập nhật slot thành `BOOKED`, cấp mã đơn (FR-08).
- **Luồng thay thế (Alternative Flow - Quá hạn giữ chỗ)**:
  - Khách hàng giữ slot nhưng không bấm xác nhận trong 10 phút. Hết 10 phút, slot tự động giải phóng về `AVAILABLE`. Khách bấm xác nhận sau đó sẽ nhận thông báo lỗi hết hạn phiên giữ chỗ.
- **Luồng ngoại lệ (Exception Flow - Trùng lịch đồng thời / Race Condition)**:
  - 2 khách hàng cùng bấm chọn 1 slot tại cùng 1 thời điểm. Nhờ transaction khóa mức dòng, khách hàng thứ nhất giữ chỗ thành công (200 OK), khách hàng thứ hai nhận mã lỗi `409 Conflict` kèm thông báo "Khung giờ này vừa có người giữ chỗ".

### 3.2. FLOW-02: Quy trình Hủy đặt sân tự phục vụ
- **Luồng chính (Main Flow - Hủy hợp lệ trước ≥ 24 giờ)**:
  1. Khách hàng mở mục Lịch sử đặt sân, chọn đơn đang ở trạng thái `CONFIRMED` (FR-03).
  2. Khách hàng bấm "Hủy đơn" và xác nhận lý do hủy.
  3. Hệ thống kiểm tra: Giờ bắt đầu chơi còn cách hiện tại ≥ 24 giờ (FR-10).
  4. Hệ thống cập nhật đơn sang `CANCELLED`, chuyển các slot liên quan về `AVAILABLE`.
  5. Khách hàng nhận thông báo hủy thành công.
- **Luồng ngoại lệ 1 (Hủy sát giờ < 24 giờ)**:
  - Khách hàng bấm hủy khi giờ chơi chỉ còn dưới 24 giờ. Hệ thống chặn lại, trả về mã lỗi 400 và thông báo liên hệ hotline hỗ trợ.
- **Luồng ngoại lệ 2 (Hủy đơn đã hủy hoặc đã check-in)**:
  - Đơn không ở trạng thái `CONFIRMED`. Hệ thống từ chối với lỗi `409 Conflict`.

### 3.3. FLOW-03: Quy trình Quản lý sân và Cấu hình bảng giá
- **Luồng chính (Main Flow - Thêm sân và áp dụng giá mới)**:
  1. Admin đăng nhập, mở trang Quản lý sân (FR-04).
  2. Admin thêm sân mới và thiết lập giá giờ thường, giá giờ cao điểm (FR-05).
  3. Hệ thống kiểm tra: Giá cao điểm > Giá thường.
  4. Hệ thống lưu sân mới và mở slot cho các ngày tới. Khách hàng có thể tra cứu và đặt sân mới ngay lập tức.
- **Luồng thay thế (Chuyển sân sang bảo trì)**:
  - Admin chuyển sân sang `MAINTENANCE`. Hệ thống khóa toàn bộ slot trống của sân đó trong thời gian bảo trì, khách không chọn được.
- **Luồng ngoại lệ (Cấu hình giá phi logic)**:
  - Admin nhập giá giờ cao điểm nhỏ hơn giá giờ thường. Hệ thống chặn lại với lỗi validation và yêu cầu nhập lại.

---

## 4. Các mô hình thiết kế nghiệp vụ

### 4.1. Bảng quyết định tính giá tiền thuê sân (Pricing Decision Table)
| Điều kiện (Conditions) | R1 | R2 | R3 | R4 |
| :--- | :---: | :---: | :---: | :---: |
| Ngày chơi là Thứ 2 – Thứ 6? | Có (Y) | Có (Y) | Không (N) | Không (N) |
| Khung giờ từ 06:00 – 17:00? | Có (Y) | Không (N) | Có (Y) | Không (N) |
| Khung giờ từ 17:00 – 22:00? | Không (N) | Có (Y) | Không (N) | Có (Y) |
| Ngày chơi là Thứ 7 hoặc Chủ Nhật?| Không (N) | Không (N) | Có (Y) | Có (Y) |
| **Hành động áp dụng (Actions)** | | | | |
| Áp dụng Giá giờ thường (`regularPrice`) | **X** | | | |
| Áp dụng Giá giờ cao điểm (`peakPrice`) | | **X** | **X** | **X** |

### 4.2. Ma trận phân quyền RBAC (Role-Based Access Control)
| Chức năng / Hành động | Khách vãng lai (Guest) | Khách hàng (Customer) | Nhân viên (Staff) | Quản trị viên (Admin) |
| :--- | :---: | :---: | :---: | :---: |
| Xem trang chủ & Health check API | Cho phép | Cho phép | Cho phép | Cho phép |
| Tra cứu lịch sân trống (Availability) | Cho phép | Cho phép | Cho phép | Cho phép |
| Đăng ký & Đăng nhập tài khoản | Cho phép | Cho phép | Cho phép | Cho phép |
| Khóa slot tạm thời (Hold slot) | Không (401) | Cho phép | Cho phép | Cho phép |
| Xác nhận đặt sân trực tuyến | Không (401) | Cho phép | Cho phép | Cho phép |
| Xem lịch sử đặt sân của bản thân | Không (401) | Cho phép | Cho phép | Cho phép |
| Hủy đơn đặt sân của bản thân (≥ 24h) | Không (401) | Cho phép | Cho phép | Cho phép |
| Check-in khách vào sân | Không (403) | Không (403) | Cho phép | Cho phép |
| Đặt sân tại quầy cho khách vãng lai | Không (403) | Không (403) | Cho phép | Cho phép |
| Thêm/Sửa/Đổi trạng thái sân | Không (403) | Không (403) | Không (403) | Cho phép |
| Cấu hình bảng giá hệ thống | Không (403) | Không (403) | Không (403) | Cho phép |
| Xem báo cáo doanh thu & tỷ lệ lấp đầy | Không (403) | Không (403) | Không (403) | Cho phép |

---

## 5. Các yêu cầu phi chức năng (8 Non-Functional Requirements)

> [!NOTE]
> Các con số dưới đây là **CHỈ TIÊU KỸ THUẬT ĐỀ XUẤT CẦN ĐẠT THEO RUBRIC HỌC PHẦN**, hoàn toàn không phải là số liệu đo đạc thực tế của hệ thống hiện tại.

| Mã NFR | Phân nhóm | Mô tả yêu cầu kỹ thuật | Con số chỉ tiêu đề xuất cần đạt | Phương pháp đo kiểm dự kiến |
| :--- | :--- | :--- | :--- | :--- |
| **NFR-01** | **Hiệu năng** | Thời gian phản hồi của API tra cứu lịch sân trống ở tải thường. | **P90 ≤ 1000 ms**, tỷ lệ lỗi < 0.5% với 20 người dùng đồng thời trong 5 phút. | Apache JMeter (Kịch bản tải thường). |
| **NFR-02** | **Hiệu năng** | Khả năng chịu tải tăng dần của API đặt sân tại giờ cao điểm. | Throughput **≥ 40 req/s**, **P95 ≤ 2500 ms** khi tăng tải từ 10 → 20 → 50 thread. | Apache JMeter (Kịch bản Step Load). |
| **NFR-03** | **Hiệu năng** | Mức tiêu thụ tài nguyên máy chủ server khi chịu tải đỉnh. | CPU sử dụng trung bình **≤ 75%**, RAM tiêu thụ **< 80%** (không rò rỉ bộ nhớ). | Htop, PM2 monitor. |
| **NFR-04** | **Toàn vẹn** | Đảm bảo tính toàn vẹn dữ liệu khi xảy ra tranh chấp đặt sân. | Tỷ lệ xảy ra trùng lịch (Double Booking) = **đúng 0%**. 10 user tranh 1 slot chỉ 1 người thành công. | Postman Collection Runner đa luồng. |
| **NFR-05** | **Bảo mật** | Bảo vệ tài khoản và chống tấn công dò quét mật khẩu (Brute-force). | Mật khẩu mã hóa `bcrypt` (salt rounds = 10); Tự động khóa **15 phút** nếu nhập sai mật khẩu **5 lần** liên tiếp. | Kịch bản Postman tự động kiểm thử âm. |
| **NFR-06** | **Tương thích** | Giao diện thích ứng trên đa màn hình và trình duyệt phổ biến. | Hiển thị chuẩn trên độ phân giải Mobile: **375×812 px**, Tablet: **768×1024 px**, Laptop: **1366×768 px**. Tương thích Chrome, Firefox, Safari. | Puppeteer Automation & DevTools Emulation. |
| **NFR-07** | **Sẵn sàng** | Tính sẵn sàng liên tục của dịch vụ phục vụ đợt đánh giá tuần 6 đến 14. | Uptime đạt tối thiểu **99.0%**; không mất kết nối quá 48 giờ liên tục. | Cron ping health check tự động. |
| **NFR-08** | **Phục hồi** | Thời gian tự phục hồi của Backend khi tiến trình bị tắt đột ngột (Crash). | Thời gian tự khởi động lại dịch vụ (Recovery Time) **≤ 5 giây**. | Script kill -9 giả lập và đo thời gian sống lại. |

---

## 6. Ma trận truy vết từ URD sang SRS (Traceability Matrix)

| Mã yêu cầu URD | Mã yêu cầu SRS | Tên chức năng chi tiết trong SRS | Luồng nghiệp vụ | Mã NFR liên quan |
| :--- | :--- | :--- | :---: | :--- |
| `US-12` | `FR-01`, `FR-02`| Đăng ký, đăng nhập & phân quyền người dùng | - | `NFR-05` |
| `US-05` | `FR-03` | Xem hồ sơ cá nhân và lịch sử đơn đặt sân | `FLOW-02` | `NFR-01` |
| `US-09` | `FR-04` | Quản lý danh mục sân (Thêm/Sửa/Bảo trì) | `FLOW-03` | `NFR-01` |
| `US-10` | `FR-05` | Cấu hình bảng giá theo khung giờ | `FLOW-03` | `NFR-01` |
| `US-01`, `US-08`| `FR-06` | Tra cứu lịch sân trống theo thời gian thực | `FLOW-01` | `NFR-01`, `NFR-06` |
| `US-02` | `FR-07` | Khóa tạm thời khung giờ (Hold slot 10 phút) | `FLOW-01` | `NFR-02`, `NFR-04` |
| `US-03` | `FR-08` | Xác nhận tạo đơn đặt sân trực tuyến | `FLOW-01` | `NFR-02`, `NFR-04` |
| `US-07` | `FR-09` | Đặt sân tại quầy cho khách vãng lai | `FLOW-01` | `NFR-01` |
| `US-04` | `FR-10` | Hủy lịch đặt sân tự phục vụ trước 24 giờ | `FLOW-02` | `NFR-01`, `NFR-04` |
| `US-06` | `FR-11` | Tiếp đón & Điểm danh vào sân (Check-in) | `FLOW-01` | `NFR-01` |
| `US-11` | `FR-12` | Báo cáo doanh thu & Tỷ lệ lấp đầy sân | - | `NFR-01` |

---

## 7. Kết luận nghiệm thu tài liệu SRS
- Tài liệu SRS v1.0 đã chi tiết hóa toàn diện từ URD v1.0 và `README.md`.
- Đáp ứng đầy đủ các tiêu chuẩn tối thiểu của Rubric A2 (12 chức năng, 3 luồng E2E có ngoại lệ, 8 NFR đo được, bảng quyết định giá, ma trận phân quyền RBAC và truy vết về URD).
- Phân định rõ ràng giữa yêu cầu thiết kế mục tiêu và hiện trạng mã nguồn thực tế; các tham số chưa có nguồn xác nhận đều được gắn nhãn minh bạch.
