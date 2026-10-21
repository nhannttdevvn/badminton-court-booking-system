# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS)
## HỆ THỐNG ĐẶT SÂN CẦU LÔNG (BADMINTON COURT BOOKING SYSTEM)
### Phiên bản: v2.0 (Cập nhật ngày 21/10/2026 theo phạm vi mới)
> [!NOTE]
> **LỊCH SỬ THAY ĐỔI PHẠM VI DỰ ÁN**:  
> Bản SRS v2.0 này **thay thế hoàn toàn bản SRS v1.0 cũ** (vốn đặc tả 3 vai trò Customer/Staff/Admin và 12 chức năng chức năng).  
> Theo quyết định điều chỉnh phạm vi ngày 21/10/2026:
> - Hệ thống chỉ có **MỘT (01) vai trò nghiệp vụ duy nhất: NHÂN VIÊN (Staff)**. "Người chưa đăng nhập" chỉ là trạng thái truy cập trước xác thực.
> - Hệ thống có **NĂM (05) chức năng cốt lõi**: `FR-01` (Đăng ký), `FR-02` (Đăng nhập), `FR-03` (Xem lịch đặt sân), `FR-04` (Đặt sân), `FR-05` (Hủy đặt sân).
> - Đặc tả bắt buộc yêu cầu **Giao diện thích ứng (Responsive)** trên toàn bộ 5 chức năng.
> - Các chức năng về Customer, Admin, Thanh toán, Doanh thu, Cấu hình giá, Check-in đã bị loại bỏ hoàn toàn khỏi phạm vi.

---

## 1. Giới thiệu chung

### 1.1. Mục đích tài liệu
Tài liệu Đặc tả Yêu cầu Phần mềm (SRS) này xác định chi tiết và chuẩn xác các yêu cầu chức năng, yêu cầu phi chức năng (đặc biệt là tính toàn vẹn chống đặt trùng và khả năng thích ứng responsive), ràng buộc kỹ thuật và tiêu chí nghiệm thu cho hệ thống web đặt sân cầu lông phục vụ tác nghiệp của nhân viên sân.

### 1.2. Phạm vi sản phẩm
Ứng dụng web bao gồm:
- **Backend**: Nền tảng Node.js + Express RESTful API, lưu trữ trên hệ quản trị cơ sở dữ liệu MySQL.
- **Frontend**: Ứng dụng Single Page Application (SPA) xây dựng bằng React + Vite, tương thích hoàn toàn trên cả trình duyệt máy tính và thiết bị di động.

---

## 2. Mô tả tổng thể và Phân quyền truy cập

### 2.1. Phân loại tác nhân (Actors)
* **Nhân viên (Staff)**: Tác nhân nghiệp vụ duy nhất của hệ thống. Được cấp tài khoản định danh, có toàn quyền tra cứu lịch sân, tạo đơn đặt sân cho khách và hủy lịch đặt sân khi có yêu cầu.
* **Khách truy cập chưa xác thực (Unauthenticated Visitor)**: Là **trạng thái truy cập** của người dùng trước khi đăng nhập. Người ở trạng thái này chỉ có thể xem màn hình Đăng ký tài khoản nhân viên hoặc màn hình Đăng nhập; hệ thống chặn hoàn toàn việc xem dữ liệu lịch sân bãi và tạo/hủy đơn.

### 2.2. Ma trận phân quyền truy cập (Access Control Matrix)

| Chức năng | Trạng thái Chưa đăng nhập | Vai trò Nhân viên (Đã đăng nhập) |
| :--- | :---: | :---: |
| **`FR-01`: Đăng ký tài khoản nhân viên** | Cho phép truy cập công khai | Cho phép (hoặc tự động chuyển hướng vào trang Lịch) |
| **`FR-02`: Đăng nhập** | Cho phép truy cập công khai | Đã đăng nhập (chuyển hướng vào trang Lịch) |
| **`FR-03`: Xem lịch đặt sân** | ❌ Chặn truy cập (Chuyển hướng về Login) | Toàn quyền xem theo ngày / sân |
| **`FR-04`: Đặt sân** | ❌ Chặn truy cập (Mã lỗi 401 Unauthorized) | Toàn quyền tạo đơn đặt |
| **`FR-05`: Hủy đặt sân** | ❌ Chặn truy cập (Mã lỗi 401 Unauthorized) | Toàn quyền hủy và giải phóng slot |

---

## 3. Đặc tả chi tiết từng chức năng chức năng (Functional Requirements)

---

### FR-01: ĐĂNG KÝ TÀI KHOẢN NHÂN VIÊN
* **1. Mục đích**: Cho phép nhân viên mới tự tạo tài khoản định danh trên hệ thống để thực hiện công tác quản lý sân.
* **2. Tác nhân**: Người dùng ở trạng thái chưa xác thực (nhân viên mới).
* **3. Tiền điều kiện**: Thiết bị có kết nối mạng tới máy chủ web; người dùng chưa đăng nhập.
* **4. Đầu vào và ràng buộc dữ liệu**:
  - `full_name` (Họ và tên): Chuỗi ký tự, từ 2 đến 50 ký tự, không chứa ký tự đặc biệt nguy hiểm.
  - `phone` (Số điện thoại): Chuỗi ký tự số, đúng định dạng số di động Việt Nam (10 chữ số, bắt đầu bằng đầu số hợp lệ `03, 05, 07, 08, 09`). Là trường duy nhất (Unique), không được trùng với tài khoản đã có.
  - `password` (Mật khẩu): Tối thiểu 6 ký tự `[Đề xuất kỹ thuật chờ xác nhận]`.
  - `confirm_password` (Xác nhận mật khẩu): Phải trùng khớp 100% với `password`.
* **5. Luồng sự kiện chính (Main Flow)**:
  1. Người dùng mở trang web và chọn "Đăng ký tài khoản nhân viên".
  2. Hệ thống hiển thị form đăng ký với các trường: Họ tên, Số điện thoại, Mật khẩu, Xác nhận mật khẩu.
  3. Người dùng nhập đầy đủ thông tin hợp lệ và bấm nút "Đăng ký".
  4. Hệ thống mã hóa mật khẩu bằng thuật toán Bcrypt, lưu thông tin tài khoản vào cơ sở dữ liệu với vai trò `STAFF`.
  5. Hệ thống hiển thị thông báo "Đăng ký thành công" và tự động chuyển hướng người dùng sang trang Đăng nhập (`FR-02`).
* **6. Luồng thay thế và Luồng ngoại lệ (Alternative & Exception Flows)**:
  - *Ngoại lệ E1 (Thiếu trường bắt buộc)*: Nếu người dùng để trống bất kỳ trường nào, hệ thống hiển thị thông báo lỗi ngay dưới trường tương ứng: `"Vui lòng nhập đầy đủ thông tin bắt buộc"`.
  - *Ngoại lệ E2 (SĐT sai định dạng)*: Nếu SĐT không đủ 10 số hoặc sai đầu số, báo lỗi: `"Số điện thoại không hợp lệ"`.
  - *Ngoại lệ E3 (SĐT đã tồn tại)*: Nếu SĐT đã có trong cơ sở dữ liệu, báo lỗi: `"Số điện thoại này đã được đăng ký tài khoản nhân viên"`.
  - *Ngoại lệ E4 (Mật khẩu xác nhận không khớp)*: Báo lỗi: `"Mật khẩu xác nhận không trùng khớp"`.
* **7. Đầu ra và Hậu điều kiện**:
  - Một bản ghi người dùng mới được tạo trong bảng `users` với vai trò `STAFF`.
  - Mật khẩu được lưu trữ dưới dạng băm Bcrypt an toàn (không lưu plaintext).
* **8. Quyền truy cập**: Công khai trước xác thực.
* **9. Tiêu chí nghiệm thu**: Đăng ký thành công với thông tin hợp lệ; chặn đứng và hiển thị lỗi chính xác cho toàn bộ 4 trường hợp ngoại lệ trên.
* **10. Nguồn và Trạng thái**:
  - Yêu cầu chức năng: `[Đã xác nhận theo phạm vi mới 21/10]`.
  - Quy tắc phê duyệt tài khoản: `[Chưa xác định — Cần xác nhận có cần duyệt bởi Quản lý hay được kích hoạt ngay]`. Hiện tạm quy ước kích hoạt ngay.
* **11. Trạng thái triển khai thực tế**: `[Theo thiết kế — Chưa có mã nguồn backend/frontend]`.

---

### FR-02: ĐĂNG NHẬP HỆ THỐNG
* **1. Mục đích**: Xác thực định danh của nhân viên, thiết lập phiên làm việc an toàn và cấp quyền truy cập các tính năng nghiệp vụ.
* **2. Tác nhân**: Nhân viên sân cầu lông.
* **3. Tiền điều kiện**: Nhân viên đã có tài khoản trên hệ thống.
* **4. Đầu vào và ràng buộc dữ liệu**:
  - `phone` (Số điện thoại): Chuỗi ký tự số, bắt buộc nhập.
  - `password` (Mật khẩu): Chuỗi ký tự, bắt buộc nhập.
* **5. Luồng sự kiện chính (Main Flow)**:
  1. Nhân viên truy cập trang web, hệ thống hiển thị form Đăng nhập.
  2. Nhân viên nhập Số điện thoại và Mật khẩu, bấm nút "Đăng nhập".
  3. Hệ thống kiểm tra tài khoản, xác thực mật khẩu băm Bcrypt.
  4. Hệ thống tạo mã Token xác thực (JWT), lưu vào `localStorage`/Cookie của trình duyệt.
  5. Hệ thống chuyển hướng nhân viên vào màn hình chính "Xem lịch đặt sân" (`FR-03`) và hiển thị lời chào kèm tên nhân viên trên thanh điều hướng.
* **6. Luồng thay thế và Luồng ngoại lệ**:
  - *Ngoại lệ E1 (Thông tin đăng nhập không chính xác)*: Nếu SĐT không tồn tại hoặc mật khẩu sai, hệ thống hiển thị thông báo lỗi an toàn: `"Số điện thoại hoặc mật khẩu không chính xác"`. Không tiết lộ cụ thể trường nào sai để phòng chống tấn công dò quét.
  - *Ngoại lệ E2 (Chưa nhập dữ liệu)*: Hiển thị cảnh báo: `"Vui lòng nhập số điện thoại và mật khẩu"`.
* **7. Đầu ra và Hậu điều kiện**:
  - Trình duyệt lưu giữ Token xác thực hợp lệ.
  - Phiên làm việc của nhân viên được kích hoạt.
* **8. Quyền truy cập**: Công khai trước xác thực.
* **9. Tiêu chí nghiệm thu**: Đăng nhập thành công mở ra màn hình lịch sân; đăng nhập sai bị từ chối và hiển thị thông báo lỗi; Token hết hạn tự động yêu cầu đăng nhập lại.
* **10. Nguồn và Trạng thái**: `[Đã xác nhận theo phạm vi mới 21/10]`.
* **11. Trạng thái triển khai thực tế**: `[Theo thiết kế — Chưa có mã nguồn backend/frontend]`.

---

### FR-03: XEM LỊCH ĐẶT SÂN (TIMELINE & AVAILABILITY)
* **1. Mục đích**: Cung cấp giao diện bảng lịch trực quan thể hiện tình trạng đặt chỗ của tất cả các sân trong cụm theo từng khung giờ trong ngày, giúp nhân viên tra cứu tức thì khi khách hỏi.
* **2. Tác nhân**: Nhân viên (đã đăng nhập).
* **3. Tiền điều kiện**: Đã đăng nhập thành công với Token hợp lệ.
* **4. Đầu vào và ràng buộc dữ liệu**:
  - `date` (Ngày tra cứu): Định dạng `YYYY-MM-DD`. Mặc định khi mở trang là ngày hiện tại của hệ thống. Nhân viên có thể chọn ngày bất kỳ thông qua Date Picker.
* **5. Luồng sự kiện chính (Main Flow)**:
  1. Nhân viên mở màn hình "Lịch đặt sân".
  2. Hệ thống tải dữ liệu danh sách sân (Sân 1, Sân 2, ..., Sân N) và các khung giờ hoạt động trong ngày được chọn.
  3. Hệ thống dựng bảng ma trận lịch:
     - Hàng: Danh sách các sân.
     - Cột: Các khung giờ (06:00 - 07:00, ..., 21:00 - 22:00) `[Đề xuất kỹ thuật chờ xác nhận]`.
     - Mỗi ô giao điểm (Slot) hiển thị màu sắc tương ứng:
       + **Màu xanh lục (Available / Còn trống)**: Sân chưa có ai đặt trong khung giờ này.
       + **Màu đỏ (Booked / Đã đặt)**: Sân đã có đơn đặt trong khung giờ này (kèm tên khách hàng rút gọn).
  4. Khi nhân viên chọn một ngày khác từ bộ chọn ngày, hệ thống gửi request tải lại dữ liệu và cập nhật bảng lịch tương ứng.
* **6. Luồng thay thế và Luồng ngoại lệ**:
  - *Ngoại lệ E1 (Mất kết nối server / Lỗi mạng)*: Nếu không lấy được dữ liệu lịch, hiển thị thông báo: `"Không thể tải dữ liệu lịch sân, vui lòng thử lại"` kèm nút "Tải lại".
  - *Ngoại lệ E2 (Chưa đăng nhập)*: Chuyển hướng ngay về màn hình Đăng nhập kèm thông báo `"Vui lòng đăng nhập để tiếp tục"`.
* **7. Đầu ra và Hậu điều kiện**: Bảng lưới lịch phản ánh chính xác 100% tình trạng các slot từ cơ sở dữ liệu.
* **8. Quyền truy cập**: Bắt buộc đăng nhập với quyền Nhân viên.
* **9. Tiêu chí nghiệm thu**:
  - Hiển thị đúng tất cả các sân và khung giờ trong ngày.
  - Phân biệt rõ ràng 2 trạng thái: Xanh (Trống) và Đỏ (Đã đặt).
  - Tải lại dữ liệu chính xác khi chuyển đổi ngày.
  - Cho phép cuộn ngang trong vùng chứa lịch trên màn hình nhỏ mà không làm vỡ giao diện chung.
* **10. Nguồn và Trạng thái**:
  - Chức năng: `[Đã xác nhận theo phạm vi mới 21/10]`.
  - Khung giờ hoạt động và danh mục sân: `[Đề xuất kỹ thuật chờ xác nhận: Cụm 4-6 sân, mở cửa 06:00-22:00]`.
* **11. Trạng thái triển khai thực tế**: `[Theo thiết kế — Chưa có mã nguồn backend/frontend]`.

---

### FR-04: ĐẶT SÂN CHO KHÁCH (BOOKING CREATION)
* **1. Mục đích**: Cho phép nhân viên tạo đơn đặt sân cho khách hàng tại một hoặc nhiều khung giờ còn trống, đảm bảo tính toàn vẹn dữ liệu và cập nhật lịch tức thời.
* **2. Tác nhân**: Nhân viên (đã đăng nhập).
* **3. Tiền điều kiện**: Slot muốn đặt đang ở trạng thái Trống (Màu xanh).
* **4. Đầu vào và ràng buộc dữ liệu**:
  - `court_id` (Mã sân): Bắt buộc, phải tồn tại trong hệ thống.
  - `booking_date` (Ngày đặt): Bắt buộc, không được chọn ngày trong quá khứ.
  - `time_slots` (Danh sách khung giờ): Bắt buộc chọn ít nhất 1 slot, tối đa 4 slot `[Đề xuất kỹ thuật chờ xác nhận]`.
  - `customer_name` (Tên khách hàng): Chuỗi ký tự, từ 2 đến 50 ký tự, bắt buộc nhập.
  - `customer_phone` (Số điện thoại khách): Chuỗi ký tự số 10 chữ số, bắt buộc nhập `[Đề xuất kỹ thuật chờ xác nhận]`.
  - `note` (Ghi chú): Tùy chọn (tối đa 200 ký tự).
* **5. Luồng sự kiện chính (Main Flow)**:
  1. Trên bảng lịch, nhân viên bấm vào một hoặc nhiều ô slot còn trống (Màu xanh). Ô được chọn đổi sang màu vàng đánh dấu đang chọn.
  2. Nhân viên bấm nút "Đặt sân". Hệ thống mở modal/form nhập thông tin đặt sân.
  3. Nhân viên nhập Tên khách hàng, Số điện thoại và Ghi chú (nếu có).
  4. Nhân viên bấm nút "Xác nhận đặt sân".
  5. **Xử lý phía Backend (Cơ chế chống đặt trùng - Pessimistic Locking)**:
     - Bắt đầu một Database Transaction.
     - Thực thi câu lệnh khóa hàng kiểm tra: `SELECT * FROM bookings WHERE court_id = ? AND booking_date = ? AND time_slot = ? FOR UPDATE`.
     - Nếu slot vẫn còn trống: Tạo bản ghi mới vào bảng `bookings` với trạng thái `CONFIRMED` kèm ID của nhân viên tạo đơn. Commit Transaction.
  6. Backend trả về kết quả thành công HTTP 201 kèm mã đơn đặt (`booking_code`).
  7. **Cập nhật giao diện tức thời (Real-time Calendar Update)**:
     - Frontend nhận phản hồi thành công, lập tức đóng modal, hiển thị thông báo: `"Đặt sân thành công cho khách [Tên khách]! Mã đơn: [Mã đơn]"`.
     - Ô slot tương ứng trên bảng lịch tự động chuyển ngay từ Màu xanh (Trống) sang **Màu đỏ (Đã đặt)** mà không cần người dùng phải bấm F5 tải lại trang.
* **6. Luồng thay thế và Luồng ngoại lệ**:
  - *Ngoại lệ E1 (Tranh chấp đặt trùng - Double Booking Concurrency)*:
    - Nếu trong lúc nhân viên đang điền form, một nhân viên khác đã đặt thành công slot đó trước:
    - Transaction backend phát hiện slot đã bị chiếm, Rollback Transaction và trả về mã lỗi HTTP 409 Conflict: `"Khung giờ này vừa có người đặt thành công. Vui lòng chọn khung giờ khác!"`.
    - Frontend hiển thị cảnh báo đỏ nổi bật, tự động làm mới trạng thái ô slot đó thành Màu đỏ để nhân viên thấy rõ.
  - *Ngoại lệ E2 (Thiếu thông tin bắt buộc)*: Nếu chưa nhập tên khách hoặc SĐT, form hiển thị cảnh báo viền đỏ và ngăn bấm gửi.
  - *Ngoại lệ E3 (Chọn slot quá khứ)*: Nếu nhân viên chọn ngày/giờ đã trôi qua, hệ thống chặn với thông báo: `"Không thể đặt sân cho khung giờ trong quá khứ"`.
* **7. Đầu ra và Hậu điều kiện**:
  - Bản ghi đơn đặt được lưu chắc chắn trong cơ sở dữ liệu.
  - Slot được đánh dấu Đã đặt, ngăn chặn 100% mọi yêu cầu đặt trùng tiếp theo.
  - Bảng lịch hiển thị slot màu đỏ.
* **8. Quyền truy cập**: Bắt buộc quyền Nhân viên.
* **9. Tiêu chí nghiệm thu**:
  - Tạo đơn đặt thành công khi nhập đủ thông tin.
  - Lịch sân tự động chuyển màu đỏ ngay sau khi tạo đơn.
  - **Chống trùng lịch tuyệt đối**: Chạy đồng thời 2 request đặt cùng 1 slot thì đúng 1 request thành công (201) và 1 request bị chặn (409).
* **10. Nguồn và Trạng thái**:
  - Chức năng: `[Đã xác nhận theo phạm vi mới 21/10]`.
  - Các trường thông tin khách: `[Đề xuất kỹ thuật chờ xác nhận]`.
* **11. Trạng thái triển khai thực tế**: `[Theo thiết kế — Chưa có mã nguồn backend/frontend]`.

---

### FR-05: HỦY ĐẶT SÂN (BOOKING CANCELLATION)
* **1. Mục đích**: Cho phép nhân viên hủy một lượt đặt sân khi khách hàng báo hủy, đồng thời giải phóng ngay lập tức khung giờ đó thành slot trống trên lịch cho khách khác.
* **2. Tác nhân**: Nhân viên (đã đăng nhập).
* **3. Tiền điều kiện**: Lượt đặt sân đang ở trạng thái hiệu lực (`CONFIRMED`).
* **4. Đầu vào và ràng buộc dữ liệu**:
  - `booking_id` (Mã đơn đặt sân): Bắt buộc, phải tồn tại trong hệ thống.
  - `cancel_reason` (Lý do hủy): Chuỗi ký tự, tùy chọn `[Đề xuất kỹ thuật chờ xác nhận]`.
* **5. Luồng sự kiện chính (Main Flow)**:
  1. Trên bảng lịch, nhân viên bấm vào một ô slot đã đặt (Màu đỏ).
  2. Hệ thống hiển thị hộp thoại (Modal) chi tiết đơn đặt: Tên khách, SĐT, Sân, Khung giờ, Nhân viên đã tạo.
  3. Nhân viên bấm nút "Hủy đặt sân".
  4. Hệ thống hiển thị popup cảnh báo xác nhận: `"Bạn có chắc chắn muốn hủy lượt đặt sân này không? Hành động này sẽ mở lại khung giờ cho khách khác."` với 2 nút: "Xác nhận hủy" và "Đóng".
  5. Nhân viên bấm "Xác nhận hủy".
  6. Backend nhận request, cập nhật trạng thái đơn đặt trong cơ sở dữ liệu thành `CANCELLED`, ghi nhận thời gian hủy và ID nhân viên thực hiện hủy.
  7. **Cập nhật giao diện tức thời (Real-time Slot Release)**:
     - Frontend nhận phản hồi thành công (HTTP 200), hiển thị thông báo: `"Đã hủy lượt đặt sân thành công!"`.
     - Đóng modal chi tiết, ô slot trên bảng lịch lập tức đổi màu từ **Màu đỏ (Đã đặt)** trở lại thành **Màu xanh lục (Còn trống)** ngay lập tức mà không cần reload trang.
* **6. Luồng thay thế và Luồng ngoại lệ**:
  - *Luồng thay thế A1 (Nhân viên đổi ý không hủy)*: Tại bước 4, nhân viên bấm "Đóng" hoặc click ra ngoài modal, hệ thống đóng popup và giữ nguyên vẹn đơn đặt sân.
  - *Ngoại lệ E1 (Đơn đặt đã bị hủy trước đó)*: Nếu đơn đặt đã bị hủy bởi nhân viên khác trong ca, hệ thống báo lỗi HTTP 400: `"Đơn đặt sân này đã được hủy trước đó"`, đồng thời cập nhật lại bảng lịch.
  - *Ngoại lệ E2 (Đơn đặt không tồn tại)*: Báo lỗi HTTP 404 Not Found.
* **7. Đầu ra và Hậu điều kiện**:
  - Trạng thái đơn chuyển sang `CANCELLED`.
  - Khung giờ được giải phóng hoàn toàn, sẵn sàng tiếp nhận lượt đặt mới.
  - Bảng lịch hiển thị slot màu xanh.
* **8. Quyền truy cập**: Bắt buộc quyền Nhân viên.
* **9. Tiêu chí nghiệm thu**:
  - Luôn có hộp thoại xác nhận trước khi hủy.
  - Hủy thành công giải phóng slot sang màu xanh tức thì.
  - Cho phép người khác đặt lại ngay vào slot vừa được giải phóng.
* **10. Nguồn và Trạng thái**:
  - Chức năng: `[Đã xác nhận theo phạm vi mới 21/10]`.
  - Điều kiện thời hạn hủy (hủy trước bao lâu): `[Chưa xác định — Cần xác nhận quy chế vận hành sân]`. Tạm thời cho phép hủy linh hoạt mọi lúc.
* **11. Trạng thái triển khai thực tế**: `[Theo thiết kế — Chưa có mã nguồn backend/frontend]`.

---

## 4. Yêu cầu Phi chức năng Bắt buộc: Giao diện Thích ứng (Responsive Design)

### 4.1. Nguyên tắc thiết kế Responsive cốt lõi
Hệ thống phải vận hành trơn tru và trực quan trên mọi kích thước màn hình, đặc biệt là khi nhân viên sử dụng điện thoại thông minh (Smartphones) để kiểm tra sân hoặc máy tính bảng/máy tính để bàn tại quầy lễ tân:

1. **Bảo toàn nội dung và thông tin quan trọng**:
   - Khi co giãn màn hình, không có bất kỳ thành phần nội dung nào bị đè chồng lấn (`overlap`), không bị chữ tràn ra ngoài vùng chứa (`text overflow`), và không bị mất các thông tin nhận diện (tên sân, khung giờ, trạng thái).
2. **Khả năng sử dụng của Form và Nút bấm**:
   - Mọi form nhập liệu (Đăng ký, Đăng nhập, Đặt sân), nhãn (labels), thông báo lỗi và nút thao tác chính/phụ luôn nằm trong tầm nhìn, có kích thước chạm tối thiểu 44x44px trên di động và dễ thao tác bằng ngón tay.
3. **Chống vỡ bố cục và cuộn ngang toàn trang (No Full-Page Horizontal Scroll)**:
   - Toàn trang web tuyệt đối không phát sinh thanh cuộn ngang ngoài ý muốn do phần tử bị cố định chiều rộng quá mức.
4. **Cơ chế hiển thị Lưới lịch (Timeline Table Responsive)**:
   - Trên màn hình nhỏ (Mobile/Tablet), bảng ma trận lịch nhiều cột được phép có thanh cuộn ngang **riêng biệt bên trong vùng chứa bảng lịch (Container-level Horizontal Scroll)**. Cột đầu tiên (Tên sân) hoặc hàng tiêu đề (Khung giờ) phải giữ được khả năng nhận diện trực quan để nhân viên không bị nhầm lẫn giữa các sân.
5. **Hộp thoại / Modal thân thiện**:
   - Các modal (Đặt sân, Hủy sân) không được vượt quá kích thước vùng nhìn (`max-width: 90vw`, `max-height: 90vh`). Nếu nội dung form dài, nội dung bên trong modal phải tự động cuộn dọc, nút "Xác nhận" và "Đóng" luôn nhìn thấy rõ ràng.
6. **Bảo toàn trạng thái khi xoay màn hình (State Preservation)**:
   - Khi người dùng xoay ngang/dọc thiết bị hoặc thay đổi kích thước cửa sổ trình duyệt, hệ thống **không được làm mất** dữ liệu đang nhập dở trong form hoặc các ô slot đang được chọn trên lịch.

### 4.2. Bộ kích thước Viewport kiểm thử đề xuất
*(Gắn nhãn: `[Bộ kích thước đề xuất kỹ thuật chờ xác nhận]`)*:

| Kích thước Viewport (Width × Height) | Đại diện thiết bị | Chế độ | Hành vi giao diện mong đợi |
| :---: | :--- | :---: | :--- |
| **320 × 568 px** | Mobile màn hình rất nhỏ (iPhone SE cũ) | Dọc (Portrait) | Bố cục 1 cột dọc; form đăng ký/đăng nhập căn giữa 100% chiều rộng; bảng lịch cuộn ngang nội bộ; nút bấm hiển thị rõ ràng. |
| **375 × 812 px** | Mobile tiêu chuẩn (iPhone 12/13/14) | Dọc (Portrait) | Form nhập liệu thoáng đãng; thanh điều hướng thu gọn dạng menu burger hoặc header tinh gọn; bảng lịch cuộn ngang mượt mà. |
| **768 × 1024 px** | Máy tính bảng (iPad Portrait) | Dọc (Portrait) | Lưới lịch mở rộng hiển thị được 4-5 khung giờ cùng lúc; modal đặt sân hiển thị dạng popup ở trung tâm màn hình. |
| **1024 × 768 px** | Máy tính bảng xoay ngang / Laptop nhỏ | Ngang (Landscape)| Lưới lịch hiển thị đầy đủ hơn; thanh điều hướng dàn ngang; toàn bộ bảng lịch hiển thị gọn gàng. |
| **1366 × 768 px** | Màn hình máy tính để bàn quầy lễ tân | Ngang (Landscape)| Bảng lịch hiển thị trọn vẹn toàn bộ các sân và tất cả các khung giờ từ 06:00 đến 22:00 trên một màn hình mà không cần cuộn ngang. |

---

## 5. Yêu cầu Phi chức năng khác (NFRs)

* **`NFR-01`: Tính toàn vẹn chống đặt trùng (Zero Double Booking)**:
  - Hệ thống sử dụng cơ chế Transaction và Pessimistic Locking (`SELECT ... FOR UPDATE` hoặc Unique Constraint trên cặp `[court_id, booking_date, time_slot]`) trong MySQL để đảm bảo 0% khả năng xảy ra 2 đơn đặt trùng lặp trên cùng 1 slot.
* **`NFR-02`: Hiệu năng thời gian phản hồi (Response Time)**:
  - Thời gian phản hồi của API tra cứu lịch sân trống `P90 ≤ 1000 ms` với điều kiện vận hành chuẩn `[Đề xuất kỹ thuật chờ xác nhận]`.
* **`NFR-03`: An toàn bảo mật xác thực (Authentication Security)**:
  - Mật khẩu nhân viên bắt buộc băm bằng Bcrypt với salt rounds ≥ 10.
  - Giao tiếp API sử dụng Token Bearer JWT; chặn toàn bộ request trái phép vào các endpoint nghiệp vụ bằng middleware kiểm tra Token.
