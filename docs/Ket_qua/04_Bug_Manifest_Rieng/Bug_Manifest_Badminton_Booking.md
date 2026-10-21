# DANH SÁCH LỖI CÀI SẴN (BUG MANIFEST)
## [TÀI LIỆU NỘP RIÊNG CHO GIẢNG VIÊN – THEO MẪU 02]
### HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN (BADMINTON COURT BOOKING SYSTEM)

> [!CAUTION]
> **BẢO MẬT HỌC THUẬT**: Tài liệu này là bí mật của Chủ hệ thống nộp riêng cho Giảng viên hướng dẫn vào Tuần 6. **TUYỆT ĐỐI KHÔNG GỬI CHO TESTER (BẠN CẶP)**. Theo quy chế học phần tại `TAILIEU/Tieu_chi_cham_diem.docx`, việc tiết lộ Bug Manifest cho Tester sẽ bị coi là gian lận (0 điểm phần liên quan).

> [!WARNING]
> **XÁC NHẬN HIỆN TRẠNG MÃ NGUỒN THEO NGUYÊN TẮC KHÔNG BỊA ĐẶT**:
> - **Hiện trạng mã nguồn thực tế**: Mã nguồn hiện tại trong `backend/` và `frontend/` mới hoàn thành tầng Baseline sạch, **CHƯA CẤY BẤT KỲ LỖI CÀI SẴN NÀO VÀO MÃ NGUỒN (0/15 lỗi trong code)**.
> - **Bản chất của tài liệu này**: Đây là **BẢN THIẾT KẾ KỊCH BẢN 15 LỖI DỰ KIẾN CẤY VÀO MÃ NGUỒN** khi lập trình các module tiếp theo.
> - **Bằng chứng video / ảnh chụp**: Hiện tại **CHƯA CÓ VIDEO HOẶC ẢNH CHỤP THỰC TẾ** do mã nguồn chưa được cấy lỗi và chưa deploy lên môi trường staging. Cột "Bằng chứng" ghi rõ trạng thái `[Chờ cấy code & ghi hình khi deploy]`.

---

## 1. Bảng tự kiểm tra số lượng lỗi (Đối chiếu Mẫu 02)

| Tiêu chí phân loại | Số lượng yêu cầu tối thiểu | Số lượng đã có trong code thực tế | Số lượng kịch bản đã thiết kế | Trạng thái đối chuẩn |
| :--- | :---: | :---: | :---: | :---: |
| **Functional (Chức năng)** | 5 | 0 | 5 | Đã thiết kế đủ 5 kịch bản (Chờ cấy code) |
| **Visual (Hiển thị)** | 3 | 0 | 3 | Đã thiết kế đủ 3 kịch bản (Chờ cấy code) |
| **Content (Nội dung / Chính tả)** | 3 | 0 | 3 | Đã thiết kế đủ 3 kịch bản (Chờ cấy code) |
| **Performance (Hiệu năng / Tải)**| 2 | 0 | 2 | Đã thiết kế đủ 2 kịch bản (Chờ cấy code) |
| **Crash (Sập ứng dụng / Treo trang)**| 2 | 0 | 2 | Đã thiết kế đủ 2 kịch bản (Chờ cấy code) |
| **TỔNG SỐ LỖI** | **15** | **0** | **15** | **ĐÃ THIẾT KẾ ĐỦ 15/15 KỊCH BẢN** |
| **Mức Critical + Major** | **3** | **0** | **4** | **ĐÃ THIẾT KẾ 4/3 KỊCH BẢN CRIT/MAJOR** |

---

## 2. Danh mục 15 kịch bản lỗi cài sẵn thiết kế theo nghiệp vụ sân cầu lông

---

### Phân nhóm 1: Kịch bản Lỗi Chức năng (Functional - 5 kịch bản)

#### 1. `SEED-01`
- **Loại lỗi**: Functional
- **Mức nghiêm trọng**: **Major**
- **Chức năng / Luồng liên quan**: `FR-10` / `FLOW-02` (Hủy đặt sân tự phục vụ)
- **Vị trí dự kiến**: Giao diện Lịch sử đặt sân; API `POST /api/bookings/:id/cancel`
- **Yêu cầu SRS bị vi phạm**: `FR-10` quy định: *"Chỉ cho phép khách hàng hủy đơn đặt sân trước giờ bắt đầu chơi tối thiểu 24 giờ. Nếu dưới 24 giờ, hệ thống bắt buộc chặn hủy và báo lỗi ERR_CANCEL_TOO_LATE"*.
- **Mô tả kịch bản lỗi cấy**: Logic kiểm tra thời gian sử dụng toán tử sai (dùng `<` thay vì `>=` hoặc so sánh nhầm đơn vị), khiến hệ thống vẫn cho phép khách hàng hủy thành công đơn đặt sân khi thời gian bắt đầu chỉ còn 2 giờ.
- **Các bước tái hiện dự kiến**:
  1. Đăng nhập tài khoản khách hàng.
  2. Tạo đơn đặt sân bắt đầu sau 2 tiếng nữa.
  3. Mở mục Lịch sử đặt sân, bấm "Hủy đơn" và bấm xác nhận.
- **Kết quả mong đợi (theo SRS)**: Báo lỗi `400 Bad Request`: "Không thể hủy sân trước giờ chơi dưới 24 giờ".
- **Kết quả thực tế dự kiến khi cấy lỗi**: Trả về `200 OK`, đơn bị hủy và giải phóng slot.
- **Bằng chứng**: `Chưa có — chờ cấy code và ghi hình thực tế khi deploy`
- **File dự kiến chứa lỗi**: `backend/src/controllers/bookingController.js` (Hàm `cancelBooking`)
- **Ghi chú**: Lỗi logic thời gian nghiệp vụ.

#### 2. `SEED-02`
- **Loại lỗi**: Functional
- **Mức nghiêm trọng**: **Critical**
- **Chức năng / Luồng liên quan**: `FR-07`, `FR-08` / `FLOW-01` (Khóa slot & Đặt sân)
- **Vị trí dự kiến**: API `POST /api/bookings/hold` và `POST /api/bookings/confirm`
- **Yêu cầu SRS bị vi phạm**: `NFR-04` & `FR-07` quy định: *"Tỷ lệ xảy ra trùng lịch (Double Booking) = đúng 0%. Cơ chế khóa slot phải đảm bảo khi 2 user cùng đặt 1 slot, chỉ 1 người thành công, người còn lại nhận lỗi 409 Conflict"*.
- **Mô tả kịch bản lỗi cấy**: Bỏ qua mệnh đề `FOR UPDATE` trong câu truy vấn MySQL hoặc không dùng Database Transaction, dẫn đến hiện tượng Race Condition: hai người dùng đặt cùng một khung giờ tại cùng thời điểm đều được tạo đơn `CONFIRMED`.
- **Các bước tái hiện dự kiến**:
  1. Mở 2 phiên gửi đồng thời 2 request đặt cùng 1 slot sân tại cùng 1 thời điểm.
- **Kết quả mong đợi (theo SRS)**: 1 request thành công 201, 1 request nhận 409 Conflict.
- **Kết quả thực tế dự kiến khi cấy lỗi**: Cả 2 request đều nhận 201 Created, gây trùng lịch.
- **Bằng chứng**: `Chưa có — chờ cấy code và ghi hình thực tế khi deploy`
- **File dự kiến chứa lỗi**: `backend/src/services/bookingService.js` (Hàm `holdSlotTransaction`)
- **Ghi chú**: Lỗi nghiêm trọng về toàn vẹn dữ liệu.

#### 3. `SEED-03`
- **Loại lỗi**: Functional
- **Mức nghiêm trọng**: Minor
- **Chức năng / Luồng liên quan**: `FR-08` (Ràng buộc số lượng slot)
- **Vị trí dự kiến**: API `POST /api/bookings/confirm`
- **Yêu cầu SRS bị vi phạm**: `FR-08` quy định: *"Một khách hàng chỉ được phép chọn đặt từ 1 đến tối đa 4 slot trong cùng một ngày"*.
- **Mô tả kịch bản lỗi cấy**: Bỏ sót kiểm tra điều kiện mảng `slotIds.length <= 4` ở backend, cho phép khách gửi request đặt 5 slot liên tiếp trong ngày vẫn tạo đơn thành công.
- **Các bước tái hiện dự kiến**:
  1. Gửi request body chứa mảng 5 `slotIds` liên tiếp trong ngày.
- **Kết quả mong đợi (theo SRS)**: Báo lỗi 400 validation: "Không được đặt quá 4 slot trong một ngày".
- **Kết quả thực tế dự kiến khi cấy lỗi**: Hệ thống tạo đơn thành công cho cả 5 khung giờ.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình Postman`
- **File dự kiến chứa lỗi**: `backend/src/validators/bookingValidator.js`
- **Ghi chú**: Lỗi vi phạm phân tích giá trị biên (BVA).

#### 4. `SEED-04`
- **Loại lỗi**: Functional
- **Mức nghiêm trọng**: Minor
- **Chức năng / Luồng liên quan**: `FR-05` (Bảng quyết định tính giá tiền)
- **Vị trí dự kiến**: API `POST /api/bookings/calculate-price`
- **Yêu cầu SRS bị vi phạm**: Bảng quyết định `SRS 4.1` quy định: *"Toàn bộ ngày Thứ 7 và Chủ Nhật (cuối tuần) đều phải áp dụng Giá giờ cao điểm, kể cả khung giờ buổi sáng"*.
- **Mô tả kịch bản lỗi cấy**: Hàm kiểm tra cuối tuần chỉ kiểm tra Thứ 7 (`dayOfWeek === 6`), bỏ sót Chủ Nhật (`dayOfWeek === 0`), khiến khung giờ sáng Chủ Nhật bị tính nhầm thành giá giờ thường.
- **Các bước tái hiện dự kiến**:
  1. Chọn ngày Chủ Nhật, chọn slot 08:00 - 09:00 sáng.
  2. Kiểm tra tổng tiền hiển thị.
- **Kết quả mong đợi (theo SRS)**: Áp dụng giá giờ cao điểm (ví dụ 140.000 VNĐ).
- **Kết quả thực tế dự kiến khi cấy lỗi**: Áp dụng nhầm giá giờ thường (ví dụ 80.000 VNĐ).
- **Bằng chứng**: `Chưa có — chờ cấy code và ghi hình thực tế`
- **File dự kiến chứa lỗi**: `backend/src/utils/pricingCalculator.js`
- **Ghi chú**: Lỗi logic bảng quyết định.

#### 5. `SEED-05`
- **Loại lỗi**: Functional
- **Mức nghiêm trọng**: **Major**
- **Chức năng / Luồng liên quan**: `FR-02`, Ma trận phân quyền RBAC
- **Vị trí dự kiến**: API `PUT /api/courts/:courtId` (Cập nhật thông tin và giá sân)
- **Yêu cầu SRS bị vi phạm**: Ma trận phân quyền `SRS 4.2` quy định: *"Chỉ tài khoản ADMIN mới có quyền sửa đổi thông tin sân và bảng giá. Tài khoản STAFF gọi API này bắt buộc phải bị chặn với mã lỗi 403 Forbidden"*.
- **Mô tả kịch bản lỗi cấy**: Middleware phân quyền viết điều kiện lỏng lẻo `if (user.role === 'ADMIN' || user.role === 'STAFF')`, khiến tài khoản Staff vẫn có thể gửi request đổi giá sân thành công.
- **Các bước tái hiện dự kiến**:
  1. Đăng nhập tài khoản Staff, lấy token.
  2. Gửi request `PUT /api/courts/CRT-01` sửa giá sân.
- **Kết quả mong đợi (theo SRS)**: Trả về `403 Forbidden`.
- **Kết quả thực tế dự kiến khi cấy lỗi**: Trả về `200 OK`, giá sân bị thay đổi.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình Postman`
- **File dự kiến chứa lỗi**: `backend/src/middlewares/authMiddleware.js`
- **Ghi chú**: Lỗi ma trận phân quyền RBAC.

---

### Phân nhóm 2: Kịch bản Lỗi Hiển thị (Visual - 3 kịch bản)

#### 6. `SEED-06`
- **Loại lỗi**: Visual
- **Mức nghiêm trọng**: Minor
- **Chức năng / Luồng liên quan**: `FR-06` (Lưới Timeline trên di động)
- **Vị trí dự kiến**: Màn hình Đặt sân trên thiết bị di động (375×812 px)
- **Yêu cầu SRS bị vi phạm**: `NFR-06` quy định: *"Giao diện phải thích ứng chuẩn xác trên độ phân giải điện thoại 375×812 px, bảng lịch sân không bị tràn viền (Horizontal Overflow)"*.
- **Mô tả kịch bản lỗi cấy**: Lưới Timeline bị cố định chiều rộng `min-width: 900px` nhưng thiếu `overflow-x: auto`, khiến trên màn hình iPhone, các khung giờ chiều tối bị đẩy ra ngoài mép màn hình và không cuộn được.
- **Các bước tái hiện dự kiến**: Mở Chrome DevTools giả lập 375×812 px, mở bảng lịch sân.
- **Kết quả mong đợi (theo SRS)**: Bảng lịch co giãn vừa vặn hoặc có thanh cuộn ngang mượt mà.
- **Kết quả thực tế dự kiến khi cấy lỗi**: Bị tràn viền, mất các khung giờ từ 15h-22h.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình DevTools`
- **File dự kiến chứa lỗi**: `frontend/src/components/TimelineGrid.css`

#### 7. `SEED-07`
- **Loại lỗi**: Visual
- **Mức nghiêm trọng**: Trivial
- **Chức năng / Luồng liên quan**: `FR-06` (Màu sắc trạng thái slot)
- **Vị trí dự kiến**: Màu sắc trạng thái slot trên giao diện
- **Yêu cầu SRS bị vi phạm**: `FR-06` quy định: *"Slot đã đặt (Booked) phải hiển thị màu ĐỎ rõ ràng để người dùng biết không thể chọn"*.
- **Mô tả kịch bản lỗi cấy**: Class CSS `.slot-booked` bị gán nhầm mã màu xám nhạt trùng với màu nền bảng `#f1f5f9`, khiến ô nhìn như biến mất khỏi bảng.
- **Các bước tái hiện dự kiến**: Mở bảng lịch xem ô slot đã có người đặt.
- **Kết quả mong đợi (theo SRS)**: Ô hiển thị màu đỏ rõ ràng kèm chữ "Đã đặt".
- **Kết quả thực tế dự kiến khi cấy lỗi**: Ô bị chìm vào màu nền trắng xám.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình`
- **File dự kiến chứa lỗi**: `frontend/src/components/SlotCard.css`

#### 8. `SEED-08`
- **Loại lỗi**: Visual
- **Mức nghiêm trọng**: Minor
- **Chức năng / Luồng liên quan**: `FR-08` (Modal Popup xác nhận đặt sân)
- **Vị trí dự kiến**: Hộp thoại popup xác nhận đơn đặt
- **Yêu cầu SRS bị vi phạm**: `NFR-06` (Trải nghiệm người dùng giao diện)
- **Mô tả kịch bản lỗi cấy**: Thuộc tính `z-index` của Modal bị đặt thấp hơn thanh Header (`z-index: 10` so với `z-index: 100`), khiến nút "Đóng [X]" bị thanh menu che khuất hoàn toàn.
- **Các bước tái hiện dự kiến**: Bấm nút "Đặt sân" để mở popup, thử click nút đóng.
- **Kết quả mong đợi (theo SRS)**: Popup nằm đè lên trên tất cả thành phần và bấm đóng bình thường.
- **Kết quả thực tế dự kiến khi cấy lỗi**: Nút đóng bị thanh menu che, không click được.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình`
- **File dự kiến chứa lỗi**: `frontend/src/components/BookingModal.css`

---

### Phân nhóm 3: Kịch bản Lỗi Nội dung (Content - 3 kịch bản)

#### 9. `SEED-09`
- **Loại lỗi**: Content
- **Mức nghiêm trọng**: Trivial
- **Chức năng / Luồng liên quan**: `FR-08` (Định dạng tiền tệ trên hóa đơn)
- **Vị trí dự kiến**: Chi tiết đơn đặt sân
- **Yêu cầu SRS bị vi phạm**: `SRS 1.3` quy định: *"Đơn vị tiền tệ phải hiển thị đúng chuẩn Việt Nam Đồng (VNĐ hoặc đ)"*.
- **Mô tả kịch bản lỗi cấy**: Dùng hàm format với tiền tệ `$`, hiển thị tổng tiền là `$140000` thay vì `140.000 VNĐ`.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình`
- **File dự kiến chứa lỗi**: `frontend/src/utils/formatCurrency.js`

#### 10. `SEED-10`
- **Loại lỗi**: Content
- **Mức nghiêm trọng**: Trivial
- **Chức năng / Luồng liên quan**: `FR-10` (Chính sách hủy sân)
- **Vị trí dự kiến**: Thông báo điều kiện hủy sân trên modal hủy
- **Yêu cầu SRS bị vi phạm**: `FR-10` quy định thời hạn hủy sân tối thiểu.
- **Mô tả kịch bản lỗi cấy**: Nội dung ghi sai chính tả và sai con số: *"Quý khách chỉ được hũy sân chước 12 tiếng"*. Sai 2 từ chính tả tiếng Việt ("hũy", "chước") và sai con số nghiệp vụ.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình`
- **File dự kiến chứa lỗi**: `frontend/src/components/CancelModal.jsx`

#### 11. `SEED-11`
- **Loại lỗi**: Content
- **Mức nghiêm trọng**: Trivial
- **Chức năng / Luồng liên quan**: `FR-01` (Thông báo validation form)
- **Vị trí dự kiến**: Form đăng ký tài khoản
- **Yêu cầu SRS bị vi phạm**: `FR-01` quy định ràng buộc độ dài mật khẩu.
- **Mô tả kịch bản lỗi cấy**: Thông báo tiếng Anh sai ngữ pháp hiển thị lẫn vào giao diện tiếng Việt: *"Password must length between 8 and 32 characters"*.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình`
- **File dự kiến chứa lỗi**: `frontend/src/validators/registerSchema.js`

---

### Phân nhóm 4: Kịch bản Lỗi Hiệu năng (Performance - 2 kịch bản)

#### 12. `SEED-12`
- **Loại lỗi**: Performance
- **Mức nghiêm trọng**: **Major**
- **Chức năng / Luồng liên quan**: `FR-06` / `NFR-01` (API Tra cứu lịch sân trống)
- **Vị trí dự kiến**: API `GET /api/slots/availability`
- **Yêu cầu SRS bị vi phạm**: `NFR-01` quy định: *"Thời gian phản hồi P90 của API tra cứu lịch sân trống phải ≤ 1000 ms với tải 20 người dùng đồng thời"*.
- **Mô tả kịch bản lỗi cấy**: Viết vòng lặp truy vấn cơ sở dữ liệu N+1 queries kết hợp đoạn delay `await new Promise(r => setTimeout(r, 2500))` khi tải tăng, khiến P90 khi chạy JMeter 20 thread bị kéo dài lên 3500ms – 4000ms.
- **Bằng chứng**: `Chưa có — chờ cấy code và trích xuất HTML Dashboard JMeter khi đo thực tế`
- **File dự kiến chứa lỗi**: `backend/src/services/slotService.js` (Hàm `getAvailability`)

#### 13. `SEED-13`
- **Loại lỗi**: Performance
- **Mức nghiêm trọng**: Minor
- **Chức năng / Luồng liên quan**: `FR-04` (Trang chủ & Danh sách sân)
- **Vị trí dự kiến**: Tải ảnh sân trên trang chủ Frontend
- **Yêu cầu SRS bị vi phạm**: `NFR-01` (Thời gian tải trang web)
- **Mô tả kịch bản lỗi cấy**: Tải ảnh sân kích thước thô chưa nén (file PNG 4K nặng 10MB/ảnh) khiến dung lượng trang chủ vượt 50MB và tải mất trên 8 giây trên mạng di động.
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh Network tab`
- **File dự kiến chứa lỗi**: `frontend/src/assets/courts/`

---

### Phân nhóm 5: Kịch bản Lỗi Sập ứng dụng (Crash - 2 kịch bản)

#### 14. `SEED-14`
- **Loại lỗi**: Crash
- **Mức nghiêm trọng**: **Critical**
- **Chức năng / Luồng liên quan**: `FR-08` / `NFR-08` (Tạo đơn đặt sân)
- **Vị trí dự kiến**: Backend Express Server; API `POST /api/bookings/confirm`
- **Yêu cầu SRS bị vi phạm**: `NFR-08` quy định: *"Hệ thống phải bắt toàn bộ ngoại lệ, không để xảy ra hiện tượng sập server (Unhandled Exception Crash)"*.
- **Mô tả kịch bản lỗi cấy**: Truy cập thuộc tính của biến `null` mà không dùng try/catch, gây `TypeError: Cannot read properties of undefined` làm văng thoát tiến trình Node.js (Exit code 1), sập toàn bộ backend.
- **Bằng chứng**: `Chưa có — chờ cấy code và lưu file console log crash khi chạy thực tế`
- **File dự kiến chứa lỗi**: `backend/src/controllers/bookingController.js`

#### 15. `SEED-15`
- **Loại lỗi**: Crash
- **Mức nghiêm trọng**: **Major**
- **Chức năng / Luồng liên quan**: `FR-03` / `US-05` (Trang Lịch sử đơn đặt sân)
- **Vị trí dự kiến**: Frontend React; Màn hình Lịch sử đơn
- **Yêu cầu SRS bị vi phạm**: `NFR-06` (Tính ổn định của giao diện người dùng)
- **Mô tả kịch bản lỗi cấy**: Gọi `.map()` trên mảng `timeSlots` bị `null` mà không kiểm tra, không có React Error Boundary, gây sập trắng toàn bộ màn hình React (White Screen Crash).
- **Bằng chứng**: `Chưa có — chờ cấy code và chụp ảnh màn hình Console lỗi đỏ`
- **File dự kiến chứa lỗi**: `frontend/src/pages/MyBookings.jsx`

---

## 3. Hướng dẫn lưu trữ và Bảo mật
1. Tài liệu này được lưu trữ trong thư mục riêng `docs/Ket_qua/04_Bug_Manifest_Rieng/`, **hoàn toàn tách biệt khỏi gói tài liệu bàn giao cho Tester**.
2. Lập trình viên sẽ sử dụng kịch bản này để cấy lỗi vào mã nguồn sau khi hoàn thành phần core business logic.
3. Khi triển khai lên server tuần 6, lập trình viên sẽ ghi hình video minh chứng mở lại được các lỗi này để nộp riêng cho Giảng viên.
