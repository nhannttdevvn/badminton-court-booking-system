TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM

(Software Requirement Specification – SRS)

HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN (BADMINTON COURT BOOKING SYSTEM)

Phiên bản 3.0

Chi tiết hoá URD: Tài liệu Yêu cầu Người sử dụng (URD) Hệ thống Đặt sân Cầu lông – Phiên bản 3.0

Người biên soạn: Nguyễn Nhân (Chủ hệ thống / System Owner)

TP. Hồ Chí Minh, tháng 10, năm 2026


| Biên soạn bởi | Kiểm thử bởi | Duyệt bởi | Phiên bản |
| --- | --- | --- | --- |
| Chủ hệ thống (BA/Dev)<br>Nguyễn Nhân | Tester độc lập (Bạn cặp)<br>Nhóm Kiểm thử Chéo | Giảng viên hướng dẫn<br>Học phần Đánh giá hiệu năng | 3.0 |
| Ngày: 24/10/2026 | Ngày: 28/10/2026 | Ngày: 28/10/2026 | Chính thức |


# Mục lục

1   Giới thiệu

1.1   Mục đích

1.2   Phạm vi

1.3   Từ điển thuật ngữ

1.4   Tài liệu tham khảo

1.5   Quy ước mã yêu cầu

2   Các yêu cầu chức năng

2.1   Các tác nhân

2.2   Các chức năng của hệ thống

2.3   Biểu đồ use case tổng quan

2.4   Biểu đồ use case phân rã

2.5   Quy trình nghiệp vụ

2.5.1   Quy trình Đặt sân và Hủy đặt sân cầu lông

2.6   Đặc tả các use case

2.6.1   UC-01: Đăng ký tài khoản thành viên

2.6.2   UC-02: Đăng nhập hệ thống

2.6.3   UC-03: Xem danh sách sân và tra cứu lịch sân trống

2.6.4   UC-04: Đặt sân cầu lông

2.6.5   UC-05: Hủy đặt sân và Quản trị đơn đặt

2.7   Bảng mã lỗi

2.8   Ma trận truy vết yêu cầu

2.9   Câu hỏi gửi bộ phận nghiệp vụ

3   Các yêu cầu phi chức năng

3.1   Giao diện người dùng

3.2   Hiệu năng

3.3   Tính bảo mật

3.4   Ràng buộc


# Danh mục hình ảnh, bảng biểu

Hình 2-1: Biểu đồ use case tổng quan

Hình 2-2: Biểu đồ use case phân rã

Hình 2-3: Biểu đồ hoạt động của quy trình

Hình 2-4: Giao diện màn hình SCR-01 đến SCR-05

Bảng 1-1: Từ điển thuật ngữ

Bảng 1-2: Quy ước mã yêu cầu

Bảng 2-1: Danh sách các tác nhân

Bảng 2-2a..2-2e: Đặc tả chức năng các Use case UC-01 đến UC-05

Bảng 2-3a..2-3e: Dữ liệu chức năng các Use case UC-01 đến UC-05

Bảng 2-4: Bảng mã lỗi của hệ thống

Bảng 2-5: Ma trận truy vết yêu cầu

Bảng 2-6: Danh sách câu hỏi gửi bộ phận nghiệp vụ

Bảng 3-1: Các yêu cầu hiệu năng


# 1   Giới thiệu


## 1.1   Mục đích

Tài liệu Đặc tả Yêu cầu Phần mềm (SRS) phiên bản 3.0 này chi tiết hóa Tài liệu Yêu cầu Người sử dụng (URD) Hệ thống Đặt sân Cầu lông – Phiên bản 3.0 thành các quy tắc kỹ thuật, ràng buộc kiểm tra dữ liệu biên (EP/BVA), luồng sự kiện Use Case, bảng mã lỗi và ngưỡng hiệu năng định lượng. Tài liệu được sử dụng bởi: (1) Lập trình viên để xây dựng sản phẩm chuẩn; (2) Tester độc lập (bạn cặp) để thiết kế Test Cases chức năng, tự động hóa API/UI và kiểm thử tải JMeter; (3) Giảng viên để đối chiếu nghiệm thu và chấm điểm.


## 1.2   Phạm vi

Hệ thống bao gồm ứng dụng Web Frontend (React/Vite) và Backend RESTful API (Node.js/Express, tiền tố /api/v1) phục vụ đúng 05 nhóm chức năng: (1) Đăng ký; (2) Đăng nhập; (3) Xem sân và lịch sân; (4) Đặt sân; (5) Hủy đặt sân. Không mở rộng sang các chức năng thương mại ngoài phạm vi như thanh toán online, khuyến mãi, tích điểm, chat hay quản lý giải đấu.


## 1.3   Từ điển thuật ngữ


| Thuật ngữ | Giải thích |
| --- | --- |
| EP / BVA | Equivalence Partitioning (Phân vùng tương đương) và Boundary Value Analysis (Phân tích giá trị biên) theo chuẩn ISTQB CTFL v4.0.1. |
| IDOR (Broken Object Level Authorization) | Lỗ hổng bảo mật khi người dùng A truy cập hoặc hủy trái phép bản ghi đơn đặt sân thuộc sở hữu của người dùng B. |
| Race Condition (Tranh chấp đồng thời) | Tình huống từ 2 request trở lên cùng đọc trạng thái AVAILABLE của một slot trước khi bất kỳ request nào kịp ghi trạng thái CONFIRMED. |
| P90 / P95 Response Time | Thời gian phản hồi phân vị thứ 90 / 95 (90% hoặc 95% tổng số request có thời gian xử lý nhỏ hơn hoặc bằng ngưỡng này). |
| Deterministic Seed Data | Bộ dữ liệu khởi tạo cố định (6 sân, 4 tài khoản, 5 đơn đặt sân) đảm bảo kết quả kiểm thử lặp lại chính xác 100% sau mỗi lần reset. |

Bảng 1-1: Từ điển thuật ngữ


## 1.4   Tài liệu tham khảo

1. Tài liệu Yêu cầu Người sử dụng (URD) – Hệ thống Đặt sân Cầu lông Trực tuyến, Phiên bản 3.0.
2. Tài liệu Đặc tả API (Mẫu 01 – docs/03_API_DOCUMENTATION.docx) và Danh mục Tài khoản Kiểm thử (docs/04_TEST_ACCOUNTS.md).
3. ISTQB® Certified Tester Foundation Level (CTFL) Syllabus v4.0.1.


## 1.5   Quy ước mã yêu cầu


| Tiền tố | Loại yêu cầu | Ví dụ |
| --- | --- | --- |
| FR | Yêu cầu chức năng (Functional Requirement) | FR-REG-01, FR-BOOK-01, FR-CANCEL-01, FR-CANCEL-02 |
| VAL | Quy tắc kiểm tra dữ liệu nhập (Validation Rule) | VAL-REG-01..05, VAL-BOOK-01..03 |
| DIS | Điều kiện hiển thị, ẩn hoặc khoá trên giao diện (Display Rule) | DIS-COURT-01, DIS-CANCEL-01, DIS-CANCEL-02 |
| BUS | Quy tắc nghiệp vụ cốt lõi (Business Rule) | BUS-AUTH-01, BUS-BOOK-01..03, BUS-CANCEL-01..03 |
| NFR | Yêu cầu phi chức năng (Non-Functional Requirement) | NFR-PERF-01..03, NFR-UI-01..02, NFR-SEC-01..03, NFR-DATA-01 |
| ERR | Mã lỗi và thông báo chuẩn (Error Handling Rule) | ERR-REG-01, ERR-BOOK-01..02, ERR-CANCEL-01..02 |

Bảng 1-2: Quy ước mã yêu cầu


# 2   Các yêu cầu chức năng


## 2.1   Các tác nhân


| Tác nhân | Vai trò trong hệ thống |
| --- | --- |
| Guest (Khách vãng lai) | Người dùng chưa đăng nhập; được phép xem danh sách 06 sân, xem chi tiết sân, tra cứu lịch 16 khung giờ theo ngày, đăng ký tài khoản mới và đăng nhập. |
| Customer (Khách hàng thành viên) | Người dùng đã đăng nhập với role = CUSTOMER; được phép thực hiện toàn bộ quyền của Guest, đặt sân ở khung giờ trống, xem lịch sử đặt sân của chính mình và tự hủy đơn của mình trước giờ bắt đầu >= 2 giờ. |
| Admin (Chủ sân / Quản trị viên) | Người dùng đã đăng nhập với role = ADMIN; được phép xem toàn bộ danh sách đơn đặt sân của tất cả khách hàng, hủy điều phối bất kỳ đơn CONFIRMED nào và khôi phục dữ liệu kiểm thử (reset-data). |

Bảng 2-1: Danh sách các tác nhân


## 2.2   Các chức năng của hệ thống

Hệ thống cung cấp 05 nhóm chức năng được phân quyền chặt chẽ theo từng tác nhân:
- Nhóm 1 (Đăng ký – UC-01): Tạo mới tài khoản khách hàng (POST /api/v1/auth/register).
- Nhóm 2 (Đăng nhập & Định danh – UC-02): Xác thực nhận JWT Token (POST /api/v1/auth/login) và xem hồ sơ cá nhân (GET /api/v1/auth/me).
- Nhóm 3 (Xem sân & Lịch trống – UC-03): Xem danh sách 6 sân (GET /api/v1/courts), chi tiết sân (GET /api/v1/courts/:id) và lịch 16 khung giờ theo ngày (GET /api/v1/courts/:id/availability?date=YYYY-MM-DD).
- Nhóm 4 (Đặt sân – UC-04): Tạo đơn đặt sân mới (POST /api/v1/bookings), xem lịch sử cá nhân (GET /api/v1/bookings/me) và chi tiết đơn (GET /api/v1/bookings/:id).
- Nhóm 5 (Hủy đặt sân & Quản trị – UC-05): Khách hàng hủy đơn của mình trước >= 2 giờ (PATCH /api/v1/bookings/:id/cancel); Admin xem toàn bộ đơn (GET /api/v1/admin/bookings) và hủy điều phối (PATCH /api/v1/admin/bookings/:id/cancel).


## 2.3   Biểu đồ use case tổng quan


| BIỂU ĐỒ USE CASE TỔNG QUAN (SYSTEM USE CASE DIAGRAM) | BIỂU ĐỒ USE CASE TỔNG QUAN (SYSTEM USE CASE DIAGRAM) | BIỂU ĐỒ USE CASE TỔNG QUAN (SYSTEM USE CASE DIAGRAM) |
| --- | --- | --- |
| Tác nhân: Guest (Khách vãng lai)<br>➔ UC-01: Đăng ký tài khoản thành viên<br>➔ UC-02: Đăng nhập hệ thống<br>➔ UC-03: Xem danh sách sân & Tra cứu lịch sân trống | Tác nhân: Customer (Khách hàng)<br>➔ UC-02: Đăng nhập & Xem hồ sơ (/me)<br>➔ UC-03: Xem danh sách sân & Tra cứu lịch sân trống<br>➔ UC-04: Đặt sân cầu lông & Xem lịch sử (/me)<br>➔ UC-05: Hủy đơn đặt sân của chính mình (trước >= 2h) | Tác nhân: Admin (Quản trị viên)<br>➔ UC-02: Đăng nhập hệ thống<br>➔ UC-03: Xem danh sách sân & Lịch sân<br>➔ UC-05: Xem toàn bộ đơn hệ thống & Hủy điều phối tại quầy |

Hình 2-1: Biểu đồ use case tổng quan


## 2.4   Biểu đồ use case phân rã


| BIỂU ĐỒ USE CASE PHÂN RÃ (DECOMPOSED USE CASES) | BIỂU ĐỒ USE CASE PHÂN RÃ (DECOMPOSED USE CASES) | BIỂU ĐỒ USE CASE PHÂN RÃ (DECOMPOSED USE CASES) |
| --- | --- | --- |
| UC-03: Xem sân và lịch sân<br>  ├── <<include>> UC-03.1: Xem danh sách 6 sân (GET /courts)<br>  ├── <<include>> UC-03.2: Xem chi tiết 1 sân (GET /courts/:id)<br>  └── <<include>> UC-03.3: Tra cứu 16 slot theo ngày (GET /courts/:id/availability) | UC-04: Đặt sân cầu lông<br>  ├── <<include>> UC-04.1: Kiểm tra phiên đăng nhập JWT<br>  ├── <<include>> UC-04.2: Khóa slot & Tạo đơn CONFIRMED (POST /bookings)<br>  └── <<extend>>  UC-04.3: Xem lịch sử đặt sân của tôi (GET /bookings/me) | UC-05: Hủy đặt sân & Quản trị<br>  ├── <<extend>>  UC-05.1: Customer tự hủy đơn của mình trước >= 2h (PATCH /bookings/:id/cancel)<br>  ├── <<extend>>  UC-05.2: Admin xem toàn bộ đơn (GET /admin/bookings)<br>  └── <<extend>>  UC-05.3: Admin hủy điều phối đơn (PATCH /admin/bookings/:id/cancel) |

Hình 2-2: Biểu đồ use case phân rã


## 2.5   Quy trình nghiệp vụ


### 2.5.1   Quy trình Đặt sân và Hủy đặt sân cầu lông

Quy trình Đặt sân và Hủy đặt sân bao gồm đầy đủ cả luồng thành công và các nhánh rẽ thất bại (chưa đăng nhập, dữ liệu không hợp lệ, sân bảo trì, ngày trong quá khứ, khung giờ đã có người đặt, hủy sát giờ < 2 tiếng hoặc hủy đơn của người khác) để làm cơ sở thiết kế các trường hợp kiểm thử âm tính (Negative Test Cases).


| BIỂU ĐỒ HOẠT ĐỘNG QUY TRÌNH ĐẶT SÂN & HỦY ĐẶT SÂN (CÓ NHÁNH THẤT BẠI) | BIỂU ĐỒ HOẠT ĐỘNG QUY TRÌNH ĐẶT SÂN & HỦY ĐẶT SÂN (CÓ NHÁNH THẤT BẠI) | BIỂU ĐỒ HOẠT ĐỘNG QUY TRÌNH ĐẶT SÂN & HỦY ĐẶT SÂN (CÓ NHÁNH THẤT BẠI) |
| --- | --- | --- |
| [Bước 1: Gửi yêu cầu Đặt sân]<br>Customer chọn Sân + Ngày + Khung giờ ➔ Gửi POST /api/v1/bookings | [Nhánh Kiểm tra 1: Xác thực]<br>- Có JWT hợp lệ? ➔ Tiếp tục Bước 2<br>- Thiếu/Sai Token ➔ [THẤT BẠI: HTTP 401 UNAUTHORIZED] | [Nhánh Kiểm tra 2: Hợp lệ & Trạng thái Sân]<br>- Slot thuộc 16 ca? Ngày >= hôm nay? Sân ACTIVE?<br>- Nếu sai ➔ [THẤT BẠI: HTTP 400 VALIDATION_ERROR / INVALID_BOOKING_TIME / COURT_INACTIVE] |
| [Nhánh Kiểm tra 3: Tranh chấp & Trùng lịch]<br>- Kiểm tra khóa nguyên tử [courtId, date, slot]<br>- Nếu đã có đơn CONFIRMED ➔ [THẤT BẠI: HTTP 409 SLOT_NOT_AVAILABLE] | [Nhánh Thành Công Đặt Sân]<br>- Tạo bản ghi status = CONFIRMED<br>- Cấp mã BK-YYYYMMDD-XXXX<br>- Trả về [THÀNH CÔNG: HTTP 201 Created] | [Bước 6: Yêu cầu Hủy đơn đặt sân]<br>- Customer khác hủy đơn? ➔ [THẤT BẠI: HTTP 403 FORBIDDEN]<br>- Còn < 2h hoặc đã hủy? ➔ [THẤT BẠI: HTTP 400 CANCEL_NOT_ALLOWED]<br>- Hợp lệ (>= 2h) ➔ [THÀNH CÔNG: HTTP 200 CANCELLED] |

Hình 2-3: Biểu đồ hoạt động của quy trình


## 2.6   Đặc tả các use case


### 2.6.1   UC-01: Đăng ký tài khoản thành viên


| Mã Use case | UC-01 | UC-01 | UC-01 |
| --- | --- | --- | --- |
| Tên Use case | Đăng ký tài khoản thành viên | Đăng ký tài khoản thành viên | Đăng ký tài khoản thành viên |
| Tác nhân | Guest (Khách vãng lai) | Guest (Khách vãng lai) | Guest (Khách vãng lai) |
| Mô tả | Cho phép khách vãng lai đăng ký mới một tài khoản khách hàng (role = CUSTOMER) bằng Họ tên, Email và Mật khẩu. | Cho phép khách vãng lai đăng ký mới một tài khoản khách hàng (role = CUSTOMER) bằng Họ tên, Email và Mật khẩu. | Cho phép khách vãng lai đăng ký mới một tài khoản khách hàng (role = CUSTOMER) bằng Họ tên, Email và Mật khẩu. |
| Sự kiện kích hoạt | Guest bấm chọn tab 'Đăng ký' trên màn hình xác thực và bấm nút 'Đăng ký ngay'. | Guest bấm chọn tab 'Đăng ký' trên màn hình xác thực và bấm nút 'Đăng ký ngay'. | Guest bấm chọn tab 'Đăng ký' trên màn hình xác thực và bấm nút 'Đăng ký ngay'. |
| Tiền điều kiện | Hệ thống đang hoạt động bình thường; người dùng chưa đăng nhập. | Hệ thống đang hoạt động bình thường; người dùng chưa đăng nhập. | Hệ thống đang hoạt động bình thường; người dùng chưa đăng nhập. |
| Luồng sự kiện chính (Thành công) | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện chính (Thành công) | 1 | Guest | Mở màn hình Đăng ký tài khoản (SCR-01). |
| Luồng sự kiện chính (Thành công) | 2 | Guest | Nhập Họ và tên (fullName), Địa chỉ Email (email), Mật khẩu (password) và Xác nhận mật khẩu (confirmPassword), sau đó bấm nút 'Đăng ký ngay'. |
| Luồng sự kiện chính (Thành công) | 3 | Hệ thống | Cắt khoảng trắng 2 đầu (trim) của fullName và email; kiểm tra các quy tắc dữ liệu VAL-REG-01 đến VAL-REG-05. |
| Luồng sự kiện chính (Thành công) | 4 | Hệ thống | Kiểm tra tính duy nhất của email trong CSDL (không phân biệt chữ hoa/thường theo VAL-REG-03). |
| Luồng sự kiện chính (Thành công) | 5 | Hệ thống | Mã hóa mật khẩu bằng thuật toán bcrypt (10 vòng salt) và lưu bản ghi người dùng mới với role = 'CUSTOMER' (FR-REG-02). |
| Luồng sự kiện chính (Thành công) | 6 | Hệ thống | Trả về mã trạng thái HTTP 201 Created kèm thông báo đăng ký thành công và thông tin cơ bản của tài khoản. |
| Luồng sự kiện thay thế | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện thay thế | 3a | Hệ thống | Nếu thiếu trường bắt buộc, hoặc fullName < 2 hay > 50 ký tự (VAL-REG-01), email sai định dạng (VAL-REG-02), password < 8 hay > 20 ký tự hoặc thiếu chữ hoa/thường/số (VAL-REG-04), hoặc confirmPassword không khớp (VAL-REG-05): Trả về HTTP 400 Bad Request kèm mã lỗi VALIDATION_ERROR. |
| Luồng sự kiện thay thế | 4a | Hệ thống | Nếu địa chỉ email đã tồn tại trong CSDL (VAL-REG-03, FR-REG-03): Từ chối tạo tài khoản và trả về HTTP 400 Bad Request kèm mã lỗi EMAIL_ALREADY_EXISTS ('Email này đã được đăng ký. Vui lòng sử dụng email khác'). |
| Hậu điều kiện | Một bản ghi User mới với role = 'CUSTOMER' được lưu vào CSDL; người dùng có thể đăng nhập ngay. | Một bản ghi User mới với role = 'CUSTOMER' được lưu vào CSDL; người dùng có thể đăng nhập ngay. | Một bản ghi User mới với role = 'CUSTOMER' được lưu vào CSDL; người dùng có thể đăng nhập ngay. |
| Quy tắc nghiệp vụ | - FR-REG-01: Tạo tài khoản mới khi dữ liệu hợp lệ (HTTP 201).<br>- FR-REG-02: Mặc định gán role = 'CUSTOMER' cho mọi tài khoản đăng ký mới.<br>- FR-REG-03 / VAL-REG-03 / ERR-REG-01: Email là duy nhất (case-insensitive); nếu trùng trả về HTTP 400 EMAIL_ALREADY_EXISTS.<br>- VAL-REG-01: fullName dài từ 2 đến 50 ký tự sau khi trim (BVA: 1, 2, 50, 51).<br>- VAL-REG-02: email đúng chuẩn định dạng và dài <= 100 ký tự.<br>- VAL-REG-04: password dài từ 8 đến 20 ký tự (BVA: 7, 8, 20, 21), có ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số.<br>- VAL-REG-05: confirmPassword phải trùng khớp hoàn toàn với password. | - FR-REG-01: Tạo tài khoản mới khi dữ liệu hợp lệ (HTTP 201).<br>- FR-REG-02: Mặc định gán role = 'CUSTOMER' cho mọi tài khoản đăng ký mới.<br>- FR-REG-03 / VAL-REG-03 / ERR-REG-01: Email là duy nhất (case-insensitive); nếu trùng trả về HTTP 400 EMAIL_ALREADY_EXISTS.<br>- VAL-REG-01: fullName dài từ 2 đến 50 ký tự sau khi trim (BVA: 1, 2, 50, 51).<br>- VAL-REG-02: email đúng chuẩn định dạng và dài <= 100 ký tự.<br>- VAL-REG-04: password dài từ 8 đến 20 ký tự (BVA: 7, 8, 20, 21), có ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số.<br>- VAL-REG-05: confirmPassword phải trùng khớp hoàn toàn với password. | - FR-REG-01: Tạo tài khoản mới khi dữ liệu hợp lệ (HTTP 201).<br>- FR-REG-02: Mặc định gán role = 'CUSTOMER' cho mọi tài khoản đăng ký mới.<br>- FR-REG-03 / VAL-REG-03 / ERR-REG-01: Email là duy nhất (case-insensitive); nếu trùng trả về HTTP 400 EMAIL_ALREADY_EXISTS.<br>- VAL-REG-01: fullName dài từ 2 đến 50 ký tự sau khi trim (BVA: 1, 2, 50, 51).<br>- VAL-REG-02: email đúng chuẩn định dạng và dài <= 100 ký tự.<br>- VAL-REG-04: password dài từ 8 đến 20 ký tự (BVA: 7, 8, 20, 21), có ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số.<br>- VAL-REG-05: confirmPassword phải trùng khớp hoàn toàn với password. |
| Yêu cầu phi chức năng | NFR-SEC-01 (Băm mật khẩu bằng bcrypt), NFR-PERF-01 (Thời gian phản hồi <= 500 ms). | NFR-SEC-01 (Băm mật khẩu bằng bcrypt), NFR-PERF-01 (Thời gian phản hồi <= 500 ms). | NFR-SEC-01 (Băm mật khẩu bằng bcrypt), NFR-PERF-01 (Thời gian phản hồi <= 500 ms). |
| Truy vết URD | URD-REG-01, URD-REG-02 | URD-REG-01, URD-REG-02 | URD-REG-01, URD-REG-02 |

Bảng 2-2a: Đặc tả chức năng Đăng ký tài khoản thành viên

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | fullName | Họ và tên khách hàng | M (Có) | Chuỗi UTF-8, độ dài 2 – 50 ký tự sau khi trim (BVA: 1, 2, 50, 51). | Nguyễn Văn An |
| 2 | email | Địa chỉ email đăng ký | M (Có) | Định dạng chuẩn email, <= 100 ký tự, chưa tồn tại trong CSDL. | nguyenvanan@gmail.com |
| 3 | password | Mật khẩu đăng nhập | M (Có) | Độ dài 8 – 20 ký tự (BVA: 7, 8, 20, 21), có >= 1 chữ hoa, >= 1 chữ thường, >= 1 chữ số. | Customer@123 |
| 4 | confirmPassword | Xác nhận lại mật khẩu | M (Có) | Trùng khớp 100% với giá trị trường password. | Customer@123 |

Bảng 2-3a: Dữ liệu chức năng Đăng ký tài khoản thành viên


### 2.6.2   UC-02: Đăng nhập hệ thống


| Mã Use case | UC-02 | UC-02 | UC-02 |
| --- | --- | --- | --- |
| Tên Use case | Đăng nhập hệ thống | Đăng nhập hệ thống | Đăng nhập hệ thống |
| Tác nhân | Guest, Customer, Admin | Guest, Customer, Admin | Guest, Customer, Admin |
| Mô tả | Xác thực người dùng bằng Email và Mật khẩu để cấp phát mã thông báo JWT phục vụ các chức năng cần đăng nhập. | Xác thực người dùng bằng Email và Mật khẩu để cấp phát mã thông báo JWT phục vụ các chức năng cần đăng nhập. | Xác thực người dùng bằng Email và Mật khẩu để cấp phát mã thông báo JWT phục vụ các chức năng cần đăng nhập. |
| Sự kiện kích hoạt | Người dùng nhập email, password tại màn hình Đăng nhập (SCR-02) và bấm nút 'Đăng nhập'. | Người dùng nhập email, password tại màn hình Đăng nhập (SCR-02) và bấm nút 'Đăng nhập'. | Người dùng nhập email, password tại màn hình Đăng nhập (SCR-02) và bấm nút 'Đăng nhập'. |
| Tiền điều kiện | Tài khoản đã tồn tại trong CSDL. | Tài khoản đã tồn tại trong CSDL. | Tài khoản đã tồn tại trong CSDL. |
| Luồng sự kiện chính (Thành công) | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện chính (Thành công) | 1 | Người dùng | Mở màn hình Đăng nhập (SCR-02), nhập email và password rồi bấm 'Đăng nhập'. |
| Luồng sự kiện chính (Thành công) | 2 | Hệ thống | Kiểm tra sự tồn tại của email (không phân biệt hoa/thường) và kiểm tra trạng thái khóa tài khoản (BUS-AUTH-01). |
| Luồng sự kiện chính (Thành công) | 3 | Hệ thống | So khớp password với chuỗi băm bcrypt trong CSDL. |
| Luồng sự kiện chính (Thành công) | 4 | Hệ thống | Đặt lại số lần đăng nhập sai (failedAttempts = 0), tạo JWT Token có thời hạn 24 giờ chứa {id, email, role, fullName}. |
| Luồng sự kiện chính (Thành công) | 5 | Hệ thống | Trả về HTTP 200 OK kèm token và đối tượng user (ẩn trường password). |
| Luồng sự kiện thay thế | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện thay thế | 2a | Hệ thống | Nếu tài khoản có failedAttempts >= 5 và đang trong thời gian khóa (BUS-AUTH-01): Trả về HTTP 423/403 kèm mã lỗi ACCOUNT_LOCKED. |
| Luồng sự kiện thay thế | 3a | Hệ thống | Nếu email không tồn tại hoặc mật khẩu không khớp (ERR-AUTH-01): Tăng failedAttempts thêm 1, trả về HTTP 401 Unauthorized kèm mã lỗi INVALID_CREDENTIALS. |
| Hậu điều kiện | Client lưu JWT Token và chuyển hướng người dùng về màn hình Danh sách sân ở trạng thái đã đăng nhập. | Client lưu JWT Token và chuyển hướng người dùng về màn hình Danh sách sân ở trạng thái đã đăng nhập. | Client lưu JWT Token và chuyển hướng người dùng về màn hình Danh sách sân ở trạng thái đã đăng nhập. |
| Quy tắc nghiệp vụ | - FR-AUTH-01: Xác thực đúng email/password trả về HTTP 200 kèm JWT Token.<br>- FR-AUTH-02: Cho phép lấy thông tin hồ sơ hiện tại qua GET /api/v1/auth/me.<br>- BUS-AUTH-01: Nhập sai mật khẩu >= 5 lần liên tiếp sẽ khóa tạm thời tài khoản (ACCOUNT_LOCKED).<br>- ERR-AUTH-01: Sai email hoặc mật khẩu trả về thông báo chung 'Email hoặc mật khẩu không chính xác' (HTTP 401). | - FR-AUTH-01: Xác thực đúng email/password trả về HTTP 200 kèm JWT Token.<br>- FR-AUTH-02: Cho phép lấy thông tin hồ sơ hiện tại qua GET /api/v1/auth/me.<br>- BUS-AUTH-01: Nhập sai mật khẩu >= 5 lần liên tiếp sẽ khóa tạm thời tài khoản (ACCOUNT_LOCKED).<br>- ERR-AUTH-01: Sai email hoặc mật khẩu trả về thông báo chung 'Email hoặc mật khẩu không chính xác' (HTTP 401). | - FR-AUTH-01: Xác thực đúng email/password trả về HTTP 200 kèm JWT Token.<br>- FR-AUTH-02: Cho phép lấy thông tin hồ sơ hiện tại qua GET /api/v1/auth/me.<br>- BUS-AUTH-01: Nhập sai mật khẩu >= 5 lần liên tiếp sẽ khóa tạm thời tài khoản (ACCOUNT_LOCKED).<br>- ERR-AUTH-01: Sai email hoặc mật khẩu trả về thông báo chung 'Email hoặc mật khẩu không chính xác' (HTTP 401). |
| Yêu cầu phi chức năng | NFR-SEC-01, NFR-SEC-02 (JWT hết hạn sau 24 giờ), NFR-PERF-01 (<= 500 ms). | NFR-SEC-01, NFR-SEC-02 (JWT hết hạn sau 24 giờ), NFR-PERF-01 (<= 500 ms). | NFR-SEC-01, NFR-SEC-02 (JWT hết hạn sau 24 giờ), NFR-PERF-01 (<= 500 ms). |
| Truy vết URD | URD-AUTH-01, URD-AUTH-02 | URD-AUTH-01, URD-AUTH-02 | URD-AUTH-01, URD-AUTH-02 |

Bảng 2-2b: Đặc tả chức năng Đăng nhập hệ thống

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | email | Email tài khoản | M (Có) | Chuỗi email không rỗng, khớp với tài khoản đã đăng ký. | customer1@gmail.com |
| 2 | password | Mật khẩu đăng nhập | M (Có) | Chuỗi mật khẩu không rỗng, khớp với mã băm bcrypt. | Customer@123 |

Bảng 2-3b: Dữ liệu chức năng Đăng nhập hệ thống


### 2.6.3   UC-03: Xem danh sách sân và tra cứu lịch sân trống


| Mã Use case | UC-03 | UC-03 | UC-03 |
| --- | --- | --- | --- |
| Tên Use case | Xem danh sách sân và tra cứu lịch sân trống | Xem danh sách sân và tra cứu lịch sân trống | Xem danh sách sân và tra cứu lịch sân trống |
| Tác nhân | Guest, Customer, Admin | Guest, Customer, Admin | Guest, Customer, Admin |
| Mô tả | Cho phép người dùng xem toàn bộ 06 sân cầu lông, thông tin chi tiết từng sân và bảng trạng thái 16 khung giờ trong ngày. | Cho phép người dùng xem toàn bộ 06 sân cầu lông, thông tin chi tiết từng sân và bảng trạng thái 16 khung giờ trong ngày. | Cho phép người dùng xem toàn bộ 06 sân cầu lông, thông tin chi tiết từng sân và bảng trạng thái 16 khung giờ trong ngày. |
| Sự kiện kích hoạt | Người dùng mở trang chủ Danh sách sân (SCR-03) hoặc chọn một sân và ngày để xem lịch trống. | Người dùng mở trang chủ Danh sách sân (SCR-03) hoặc chọn một sân và ngày để xem lịch trống. | Người dùng mở trang chủ Danh sách sân (SCR-03) hoặc chọn một sân và ngày để xem lịch trống. |
| Tiền điều kiện | Dữ liệu 06 sân cầu lông đã được khởi tạo trong hệ thống. | Dữ liệu 06 sân cầu lông đã được khởi tạo trong hệ thống. | Dữ liệu 06 sân cầu lông đã được khởi tạo trong hệ thống. |
| Luồng sự kiện chính (Thành công) | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện chính (Thành công) | 1 | Người dùng | Truy cập màn hình Danh sách sân (SCR-03); trình duyệt gọi GET /api/v1/courts. |
| Luồng sự kiện chính (Thành công) | 2 | Hệ thống | Trả về danh sách 06 sân cầu lông kèm id, name, type, pricePerHour, status (ACTIVE/INACTIVE) và description (FR-COURT-01). |
| Luồng sự kiện chính (Thành công) | 3 | Người dùng | Bấm nút 'Xem lịch & Đặt sân' tại một sân và chọn ngày cần tra cứu (date = YYYY-MM-DD). |
| Luồng sự kiện chính (Thành công) | 4 | Hệ thống | Truy vấn các đơn đặt sân có trạng thái CONFIRMED của sân đó trong ngày được chọn và ánh xạ lên 16 khung giờ chuẩn từ 06:00 đến 22:00 (FR-COURT-03, FR-COURT-04). |
| Luồng sự kiện chính (Thành công) | 5 | Hệ thống | Trả về HTTP 200 OK gồm thông tin sân và mảng 16 phần tử slots với trạng thái AVAILABLE hoặc BOOKED. |
| Luồng sự kiện thay thế | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện thay thế | 3a | Hệ thống | Nếu mã sân courtId không tồn tại (ví dụ courtId = 99): Trả về HTTP 404 Not Found kèm mã lỗi COURT_NOT_FOUND. |
| Hậu điều kiện | Giao diện hiển thị trực quan 16 khung giờ; các khung giờ AVAILABLE cho phép bấm chọn đặt sân (nếu sân ACTIVE). | Giao diện hiển thị trực quan 16 khung giờ; các khung giờ AVAILABLE cho phép bấm chọn đặt sân (nếu sân ACTIVE). | Giao diện hiển thị trực quan 16 khung giờ; các khung giờ AVAILABLE cho phép bấm chọn đặt sân (nếu sân ACTIVE). |
| Quy tắc nghiệp vụ | - FR-COURT-01: Hiển thị đầy đủ danh sách 06 sân cầu lông.<br>- FR-COURT-02: Hiển thị thông tin chi tiết của một sân theo ID.<br>- FR-COURT-03 / FR-COURT-04: Trả về đúng 16 khung giờ cố định (06:00-07:00 đến 21:00-22:00); slot nào có đơn CONFIRMED thì hiển thị BOOKED, ngược lại hiển thị AVAILABLE.<br>- DIS-COURT-01: Sân có status = INACTIVE hiển thị badge 'Bảo trì' và vô hiệu hóa thao tác đặt sân. | - FR-COURT-01: Hiển thị đầy đủ danh sách 06 sân cầu lông.<br>- FR-COURT-02: Hiển thị thông tin chi tiết của một sân theo ID.<br>- FR-COURT-03 / FR-COURT-04: Trả về đúng 16 khung giờ cố định (06:00-07:00 đến 21:00-22:00); slot nào có đơn CONFIRMED thì hiển thị BOOKED, ngược lại hiển thị AVAILABLE.<br>- DIS-COURT-01: Sân có status = INACTIVE hiển thị badge 'Bảo trì' và vô hiệu hóa thao tác đặt sân. | - FR-COURT-01: Hiển thị đầy đủ danh sách 06 sân cầu lông.<br>- FR-COURT-02: Hiển thị thông tin chi tiết của một sân theo ID.<br>- FR-COURT-03 / FR-COURT-04: Trả về đúng 16 khung giờ cố định (06:00-07:00 đến 21:00-22:00); slot nào có đơn CONFIRMED thì hiển thị BOOKED, ngược lại hiển thị AVAILABLE.<br>- DIS-COURT-01: Sân có status = INACTIVE hiển thị badge 'Bảo trì' và vô hiệu hóa thao tác đặt sân. |
| Yêu cầu phi chức năng | NFR-PERF-02 (Thời gian phản hồi P90 của API availability <= 1.000 ms với 100 người dùng đồng thời), NFR-UI-01 (Không cuộn ngang toàn trang ở 360px, 768px, 1440px). | NFR-PERF-02 (Thời gian phản hồi P90 của API availability <= 1.000 ms với 100 người dùng đồng thời), NFR-UI-01 (Không cuộn ngang toàn trang ở 360px, 768px, 1440px). | NFR-PERF-02 (Thời gian phản hồi P90 của API availability <= 1.000 ms với 100 người dùng đồng thời), NFR-UI-01 (Không cuộn ngang toàn trang ở 360px, 768px, 1440px). |
| Truy vết URD | URD-COURT-01, URD-COURT-02 | URD-COURT-01, URD-COURT-02 | URD-COURT-01, URD-COURT-02 |

Bảng 2-2c: Đặc tả chức năng Xem sân và lịch sân trống

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | id (Path param) | Mã định danh sân cầu lông | M (Có) | Số nguyên dương từ 1 đến 6. | 1 |
| 2 | date (Query param) | Ngày cần xem lịch trống | O (Không) | Chuỗi ngày định dạng YYYY-MM-DD. | 2026-10-25 |

Bảng 2-3c: Dữ liệu chức năng Xem sân và lịch sân trống


### 2.6.4   UC-04: Đặt sân cầu lông


| Mã Use case | UC-04 | UC-04 | UC-04 |
| --- | --- | --- | --- |
| Tên Use case | Đặt sân cầu lông | Đặt sân cầu lông | Đặt sân cầu lông |
| Tác nhân | Customer (Khách hàng đã đăng nhập), Admin | Customer (Khách hàng đã đăng nhập), Admin | Customer (Khách hàng đã đăng nhập), Admin |
| Mô tả | Cho phép khách hàng đã đăng nhập đặt một khung giờ đang AVAILABLE trên sân ACTIVE cho ngày/giờ trong tương lai. | Cho phép khách hàng đã đăng nhập đặt một khung giờ đang AVAILABLE trên sân ACTIVE cho ngày/giờ trong tương lai. | Cho phép khách hàng đã đăng nhập đặt một khung giờ đang AVAILABLE trên sân ACTIVE cho ngày/giờ trong tương lai. |
| Sự kiện kích hoạt | Khách hàng bấm vào một khung giờ 'Còn trống' trên lịch sân, nhập ghi chú (nếu có) và bấm 'Xác nhận đặt'. | Khách hàng bấm vào một khung giờ 'Còn trống' trên lịch sân, nhập ghi chú (nếu có) và bấm 'Xác nhận đặt'. | Khách hàng bấm vào một khung giờ 'Còn trống' trên lịch sân, nhập ghi chú (nếu có) và bấm 'Xác nhận đặt'. |
| Tiền điều kiện | Khách hàng đã đăng nhập hợp lệ (có Bearer Token); sân được chọn đang ACTIVE. | Khách hàng đã đăng nhập hợp lệ (có Bearer Token); sân được chọn đang ACTIVE. | Khách hàng đã đăng nhập hợp lệ (có Bearer Token); sân được chọn đang ACTIVE. |
| Luồng sự kiện chính (Thành công) | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện chính (Thành công) | 1 | Customer | Trên màn hình Chi tiết lịch sân (SCR-04), chọn ngày đặt (bookingDate) và bấm vào một khung giờ (timeSlot) đang có trạng thái AVAILABLE. |
| Luồng sự kiện chính (Thành công) | 2 | Customer | Nhập ghi chú tùy chọn (note) trong hộp thoại xác nhận và bấm nút 'Xác nhận đặt'. |
| Luồng sự kiện chính (Thành công) | 3 | Hệ thống | Xác thực JWT Token; kiểm tra đầy đủ các trường bắt buộc courtId, bookingDate, timeSlot và kiểm tra timeSlot thuộc 16 khung giờ chuẩn (VAL-BOOK-02). |
| Luồng sự kiện chính (Thành công) | 4 | Hệ thống | Kiểm tra ngày và giờ bắt đầu của slot phải nằm trong tương lai so với thời điểm hiện tại (VAL-BOOK-01, FR-BOOK-02). |
| Luồng sự kiện chính (Thành công) | 5 | Hệ thống | Kiểm tra sân tồn tại và có trạng thái status = 'ACTIVE' (BUS-BOOK-01). |
| Luồng sự kiện chính (Thành công) | 6 | Hệ thống | Thiết lập khóa nguyên tử trên bộ ba [courtId, bookingDate, timeSlot] và kiểm tra chưa có đơn CONFIRMED nào trùng (BUS-BOOK-03, FR-BOOK-03). |
| Luồng sự kiện chính (Thành công) | 7 | Hệ thống | Tạo đơn đặt sân mới với status = 'CONFIRMED', sinh mã bookingCode (BK-YYYYMMDD-XXXX), gán totalPrice = pricePerHour của sân và trả về HTTP 201 Created (FR-BOOK-01). |
| Luồng sự kiện thay thế | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện thay thế | 3a | Hệ thống | Nếu thiếu courtId/bookingDate/timeSlot hoặc timeSlot không nằm trong 16 khung giờ chuẩn: Trả về HTTP 400 Bad Request kèm mã lỗi VALIDATION_ERROR. |
| Luồng sự kiện thay thế | 4a | Hệ thống | Nếu bookingDate hoặc khung giờ đặt nằm trong quá khứ (VAL-BOOK-01): Trả về HTTP 400 Bad Request kèm mã lỗi INVALID_BOOKING_TIME ('Không thể đặt sân cho ngày hoặc khung giờ trong quá khứ'). |
| Luồng sự kiện thay thế | 5a | Hệ thống | Nếu sân có trạng thái INACTIVE (BUS-BOOK-01, ERR-BOOK-01): Trả về HTTP 400 Bad Request kèm mã lỗi COURT_INACTIVE. |
| Luồng sự kiện thay thế | 6a | Hệ thống | Nếu khung giờ đã có đơn CONFIRMED hoặc bị request đồng thời khác khóa trước (BUS-BOOK-03, ERR-BOOK-02): Trả về HTTP 409 Conflict kèm mã lỗi SLOT_NOT_AVAILABLE và thông báo chuẩn 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'. |
| Hậu điều kiện | Bản ghi Booking mới ở trạng thái CONFIRMED được lưu vào CSDL; khung giờ tương ứng trên lịch sân chuyển sang trạng thái BOOKED. | Bản ghi Booking mới ở trạng thái CONFIRMED được lưu vào CSDL; khung giờ tương ứng trên lịch sân chuyển sang trạng thái BOOKED. | Bản ghi Booking mới ở trạng thái CONFIRMED được lưu vào CSDL; khung giờ tương ứng trên lịch sân chuyển sang trạng thái BOOKED. |
| Quy tắc nghiệp vụ | - FR-BOOK-01: Cho phép đặt mọi slot AVAILABLE hợp lệ (bao gồm cả Sân 5 khung 21:00-22:00 và ghi chú dài hợp lệ) mà không gây lỗi giao diện.<br>- FR-BOOK-02 / VAL-BOOK-01: Ngày và giờ bắt đầu phải ở tương lai; chặn đặt ngày quá khứ bằng HTTP 400 INVALID_BOOKING_TIME.<br>- FR-BOOK-03 / BUS-BOOK-03: Không được tồn tại 2 đơn CONFIRMED cho cùng [courtId, bookingDate, timeSlot] ngay cả khi gửi đồng thời.<br>- FR-BOOK-04: Cho phép xem danh sách đơn của chính mình qua GET /api/v1/bookings/me.<br>- BUS-BOOK-01 / ERR-BOOK-01: Chặn đặt sân INACTIVE với mã lỗi COURT_INACTIVE.<br>- ERR-BOOK-02: Khi slot đã có người đặt, bắt buộc hiển thị đúng thông báo: 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'. | - FR-BOOK-01: Cho phép đặt mọi slot AVAILABLE hợp lệ (bao gồm cả Sân 5 khung 21:00-22:00 và ghi chú dài hợp lệ) mà không gây lỗi giao diện.<br>- FR-BOOK-02 / VAL-BOOK-01: Ngày và giờ bắt đầu phải ở tương lai; chặn đặt ngày quá khứ bằng HTTP 400 INVALID_BOOKING_TIME.<br>- FR-BOOK-03 / BUS-BOOK-03: Không được tồn tại 2 đơn CONFIRMED cho cùng [courtId, bookingDate, timeSlot] ngay cả khi gửi đồng thời.<br>- FR-BOOK-04: Cho phép xem danh sách đơn của chính mình qua GET /api/v1/bookings/me.<br>- BUS-BOOK-01 / ERR-BOOK-01: Chặn đặt sân INACTIVE với mã lỗi COURT_INACTIVE.<br>- ERR-BOOK-02: Khi slot đã có người đặt, bắt buộc hiển thị đúng thông báo: 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'. | - FR-BOOK-01: Cho phép đặt mọi slot AVAILABLE hợp lệ (bao gồm cả Sân 5 khung 21:00-22:00 và ghi chú dài hợp lệ) mà không gây lỗi giao diện.<br>- FR-BOOK-02 / VAL-BOOK-01: Ngày và giờ bắt đầu phải ở tương lai; chặn đặt ngày quá khứ bằng HTTP 400 INVALID_BOOKING_TIME.<br>- FR-BOOK-03 / BUS-BOOK-03: Không được tồn tại 2 đơn CONFIRMED cho cùng [courtId, bookingDate, timeSlot] ngay cả khi gửi đồng thời.<br>- FR-BOOK-04: Cho phép xem danh sách đơn của chính mình qua GET /api/v1/bookings/me.<br>- BUS-BOOK-01 / ERR-BOOK-01: Chặn đặt sân INACTIVE với mã lỗi COURT_INACTIVE.<br>- ERR-BOOK-02: Khi slot đã có người đặt, bắt buộc hiển thị đúng thông báo: 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'. |
| Yêu cầu phi chức năng | NFR-DATA-01 (Đảm bảo tính nguyên tử chống Race Condition), NFR-PERF-03 (P95 <= 1.500 ms ở tải 100 người dùng đồng thời). | NFR-DATA-01 (Đảm bảo tính nguyên tử chống Race Condition), NFR-PERF-03 (P95 <= 1.500 ms ở tải 100 người dùng đồng thời). | NFR-DATA-01 (Đảm bảo tính nguyên tử chống Race Condition), NFR-PERF-03 (P95 <= 1.500 ms ở tải 100 người dùng đồng thời). |
| Truy vết URD | URD-BOOK-01, URD-BOOK-02, URD-BOOK-03 | URD-BOOK-01, URD-BOOK-02, URD-BOOK-03 | URD-BOOK-01, URD-BOOK-02, URD-BOOK-03 |

Bảng 2-2d: Đặc tả chức năng Đặt sân cầu lông

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | courtId | Mã định danh sân cầu lông | M (Có) | Số nguyên 1..5 (các sân có status = ACTIVE). | 1 |
| 2 | bookingDate | Ngày đặt sân | M (Có) | Định dạng YYYY-MM-DD, ngày >= ngày hiện tại. | 2026-10-25 |
| 3 | timeSlot | Khung giờ thuê sân (60 phút) | M (Có) | Thuộc tập 16 khung giờ chuẩn từ 06:00-07:00 đến 21:00-22:00. | 09:00-10:00 |
| 4 | note | Ghi chú kèm theo đơn đặt | O (Không) | Chuỗi văn bản UTF-8, độ dài 0 – 200 ký tự. | Chuẩn bị sân trước 5 phút |

Bảng 2-3d: Dữ liệu chức năng Đặt sân cầu lông


### 2.6.5   UC-05: Hủy đặt sân và Quản trị đơn đặt


| Mã Use case | UC-05 | UC-05 | UC-05 |
| --- | --- | --- | --- |
| Tên Use case | Hủy đặt sân và Quản trị đơn đặt | Hủy đặt sân và Quản trị đơn đặt | Hủy đặt sân và Quản trị đơn đặt |
| Tác nhân | Customer, Admin | Customer, Admin | Customer, Admin |
| Mô tả | Cho phép Customer tự hủy đơn đặt sân CONFIRMED của chính mình khi còn ít nhất 02 giờ trước giờ bắt đầu; cho phép Admin xem toàn bộ đơn và hủy điều phối. | Cho phép Customer tự hủy đơn đặt sân CONFIRMED của chính mình khi còn ít nhất 02 giờ trước giờ bắt đầu; cho phép Admin xem toàn bộ đơn và hủy điều phối. | Cho phép Customer tự hủy đơn đặt sân CONFIRMED của chính mình khi còn ít nhất 02 giờ trước giờ bắt đầu; cho phép Admin xem toàn bộ đơn và hủy điều phối. |
| Sự kiện kích hoạt | Customer hoặc Admin bấm nút 'Hủy đơn' tại màn hình Lịch sử đặt sân (SCR-05) và bấm 'Đồng ý hủy' trên hộp thoại xác nhận. | Customer hoặc Admin bấm nút 'Hủy đơn' tại màn hình Lịch sử đặt sân (SCR-05) và bấm 'Đồng ý hủy' trên hộp thoại xác nhận. | Customer hoặc Admin bấm nút 'Hủy đơn' tại màn hình Lịch sử đặt sân (SCR-05) và bấm 'Đồng ý hủy' trên hộp thoại xác nhận. |
| Tiền điều kiện | Người dùng đã đăng nhập; đơn đặt sân tồn tại và đang ở trạng thái CONFIRMED. | Người dùng đã đăng nhập; đơn đặt sân tồn tại và đang ở trạng thái CONFIRMED. | Người dùng đã đăng nhập; đơn đặt sân tồn tại và đang ở trạng thái CONFIRMED. |
| Luồng sự kiện chính (Thành công) | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện chính (Thành công) | 1 | Customer / Admin | Mở màn hình Lịch sử đặt sân (SCR-05A cho Customer hoặc SCR-05B cho Admin). |
| Luồng sự kiện chính (Thành công) | 2 | Hệ thống | Hiển thị dòng thông báo quy định chuẩn: 'Quy định: Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ' (DIS-CANCEL-02) và danh sách các đơn đặt sân. |
| Luồng sự kiện chính (Thành công) | 3 | Customer / Admin | Bấm nút 'Hủy đơn' trên một đơn đang CONFIRMED, sau đó bấm nút 'Đồng ý hủy' trong hộp thoại xác nhận. |
| Luồng sự kiện chính (Thành công) | 4 | Hệ thống | Kiểm tra sự tồn tại của đơn đặt sân và kiểm tra trạng thái đơn đang là CONFIRMED (BUS-CANCEL-02). |
| Luồng sự kiện chính (Thành công) | 5 | Hệ thống | Nếu tác nhân là Customer: Kiểm tra quyền sở hữu (booking.userId === req.user.id theo FR-CANCEL-02) và kiểm tra thời gian còn lại trước giờ bắt đầu >= 2.0 giờ (BUS-CANCEL-01, FR-CANCEL-01). |
| Luồng sự kiện chính (Thành công) | 6 | Hệ thống | Cập nhật trạng thái đơn sang status = 'CANCELLED', ghi nhận cancelledBy, cancelledAt, giải phóng khung giờ về AVAILABLE (BUS-CANCEL-03) và trả về HTTP 200 OK. |
| Luồng sự kiện thay thế | STT | Thực hiện bởi | Hành động |
| Luồng sự kiện thay thế | 4a | Hệ thống | Nếu mã đơn không tồn tại: Trả về HTTP 404 Not Found kèm mã lỗi BOOKING_NOT_FOUND. |
| Luồng sự kiện thay thế | 4b | Hệ thống | Nếu đơn đã ở trạng thái CANCELLED trước đó (BUS-CANCEL-02): Trả về HTTP 400 Bad Request kèm mã lỗi CANCEL_NOT_ALLOWED. |
| Luồng sự kiện thay thế | 5a | Hệ thống | Nếu Customer A cố tình gửi yêu cầu hủy đơn thuộc sở hữu của Customer B (FR-CANCEL-02): Từ chối ngay và trả về HTTP 403 Forbidden kèm mã lỗi FORBIDDEN. |
| Luồng sự kiện thay thế | 5b | Hệ thống | Nếu thời gian từ hiện tại đến giờ bắt đầu slot < 2 giờ (120 phút) đối với Customer (BUS-CANCEL-01, ERR-CANCEL-01): Trả về HTTP 400 Bad Request kèm mã lỗi CANCEL_NOT_ALLOWED. |
| Hậu điều kiện | Đơn đặt sân chuyển sang trạng thái CANCELLED; khung giờ trên lịch sân lập tức trở lại trạng thái AVAILABLE để người khác có thể đặt. | Đơn đặt sân chuyển sang trạng thái CANCELLED; khung giờ trên lịch sân lập tức trở lại trạng thái AVAILABLE để người khác có thể đặt. | Đơn đặt sân chuyển sang trạng thái CANCELLED; khung giờ trên lịch sân lập tức trở lại trạng thái AVAILABLE để người khác có thể đặt. |
| Quy tắc nghiệp vụ | - FR-CANCEL-01 / BUS-CANCEL-01: Customer được phép hủy mọi đơn CONFIRMED của mình (bao gồm cả đơn định kỳ ID 999) khi còn >= 2 giờ trước giờ bắt đầu; chặn hủy nếu còn < 2 giờ.<br>- FR-CANCEL-02: Chặn tuyệt đối hành vi Customer hủy đơn của Customer khác bằng HTTP 403 FORBIDDEN.<br>- BUS-CANCEL-02: Không cho phép hủy lại đơn đã CANCELLED.<br>- BUS-CANCEL-03: Hủy đơn thành công phải giải phóng slot về AVAILABLE ngay lập tức.<br>- DIS-CANCEL-02: Giao diện bắt buộc hiển thị đúng dòng chữ: 'Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ'.<br>- FR-ADMIN-01 / FR-ADMIN-02: Admin được quyền xem toàn bộ đơn và hủy điều phối bất kỳ đơn CONFIRMED nào. | - FR-CANCEL-01 / BUS-CANCEL-01: Customer được phép hủy mọi đơn CONFIRMED của mình (bao gồm cả đơn định kỳ ID 999) khi còn >= 2 giờ trước giờ bắt đầu; chặn hủy nếu còn < 2 giờ.<br>- FR-CANCEL-02: Chặn tuyệt đối hành vi Customer hủy đơn của Customer khác bằng HTTP 403 FORBIDDEN.<br>- BUS-CANCEL-02: Không cho phép hủy lại đơn đã CANCELLED.<br>- BUS-CANCEL-03: Hủy đơn thành công phải giải phóng slot về AVAILABLE ngay lập tức.<br>- DIS-CANCEL-02: Giao diện bắt buộc hiển thị đúng dòng chữ: 'Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ'.<br>- FR-ADMIN-01 / FR-ADMIN-02: Admin được quyền xem toàn bộ đơn và hủy điều phối bất kỳ đơn CONFIRMED nào. | - FR-CANCEL-01 / BUS-CANCEL-01: Customer được phép hủy mọi đơn CONFIRMED của mình (bao gồm cả đơn định kỳ ID 999) khi còn >= 2 giờ trước giờ bắt đầu; chặn hủy nếu còn < 2 giờ.<br>- FR-CANCEL-02: Chặn tuyệt đối hành vi Customer hủy đơn của Customer khác bằng HTTP 403 FORBIDDEN.<br>- BUS-CANCEL-02: Không cho phép hủy lại đơn đã CANCELLED.<br>- BUS-CANCEL-03: Hủy đơn thành công phải giải phóng slot về AVAILABLE ngay lập tức.<br>- DIS-CANCEL-02: Giao diện bắt buộc hiển thị đúng dòng chữ: 'Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ'.<br>- FR-ADMIN-01 / FR-ADMIN-02: Admin được quyền xem toàn bộ đơn và hủy điều phối bất kỳ đơn CONFIRMED nào. |
| Yêu cầu phi chức năng | NFR-UI-01 (Hộp thoại xác nhận hủy phải hiển thị đầy đủ nút 'Đồng ý hủy' ở màn hình 360px, không bị cắt khuất), NFR-SEC-03 (Chống lỗ hổng IDOR). | NFR-UI-01 (Hộp thoại xác nhận hủy phải hiển thị đầy đủ nút 'Đồng ý hủy' ở màn hình 360px, không bị cắt khuất), NFR-SEC-03 (Chống lỗ hổng IDOR). | NFR-UI-01 (Hộp thoại xác nhận hủy phải hiển thị đầy đủ nút 'Đồng ý hủy' ở màn hình 360px, không bị cắt khuất), NFR-SEC-03 (Chống lỗ hổng IDOR). |
| Truy vết URD | URD-CANCEL-01, URD-CANCEL-02, URD-CANCEL-03 | URD-CANCEL-01, URD-CANCEL-02, URD-CANCEL-03 | URD-CANCEL-01, URD-CANCEL-02, URD-CANCEL-03 |

Bảng 2-2e: Đặc tả chức năng Hủy đặt sân và Quản trị đơn đặt

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | id (Path param) | Mã định danh đơn đặt sân cần hủy | M (Có) | Số nguyên dương, đơn tồn tại và đang ở trạng thái CONFIRMED. | 101 |
| 2 | cancelReason | Lý do hủy đơn đặt sân | O (Không) | Chuỗi văn bản UTF-8, độ dài 0 – 200 ký tự. | Thay đổi lịch thi đấu cá nhân |

Bảng 2-3e: Dữ liệu chức năng Hủy đặt sân và Quản trị đơn đặt


| SƠ ĐỒ BỐ CỤC GIAO DIỆN MÀN HÌNH (SCR-01 ĐẾN SCR-05) | SƠ ĐỒ BỐ CỤC GIAO DIỆN MÀN HÌNH (SCR-01 ĐẾN SCR-05) |
| --- | --- |
| [SCR-01 & SCR-02: Màn hình Đăng ký / Đăng nhập]<br>- Thanh chuyển đổi Tab: Đăng nhập | Đăng ký<br>- Ô nhập: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu<br>- Hộp chọn nhanh 3 tài khoản mẫu (Customer 1, 2, Admin)<br>- Vùng hiển thị thông báo lỗi (alert-danger) | [SCR-03: Màn hình Danh sách 6 Sân cầu lông]<br>- Lưới thẻ sân (Court Cards 1..6) co giãn tự động (1 cột ở 360px)<br>- Mỗi thẻ gồm: Tên sân, Badge trạng thái (Hoạt động / Bảo trì), Loại thảm, Giá thuê/giờ, Nhãn 'Thông tin sân:'<br>- Nút bấm: '📅 Xem lịch & Đặt sân' |
| [SCR-04: Màn hình Chi tiết lịch sân & Modal Đặt sân]<br>- Hộp thông tin sân ('Thông tin sân:') & Bộ chọn ngày (Date Picker)<br>- Lưới 16 khung giờ (06:00-07:00 .. 21:00-22:00)<br>- Modal Xác nhận đặt sân: Tóm tắt Sân/Ngày/Giờ, Ô nhập Ghi chú, Nút '✅ Xác nhận đặt' | [SCR-05: Màn hình Lịch sử đặt sân & Modal Hủy đơn]<br>- Banner quy định: 'ℹ️ Quy định: Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ.'<br>- Danh sách đơn đặt sân kèm trạng thái & nút '🗑️ Hủy đơn'<br>- Modal Xác nhận hủy: Hiển thị đầy đủ nút 'Đóng' và '🗑️ Đồng ý hủy' trên mọi kích thước màn hình |

Hình 2-4: Giao diện màn hình SCR-01 đến SCR-05


## 2.7   Bảng mã lỗi


| Mã lỗi | Trường hợp phát sinh | Thông báo hiển thị cho người dùng |
| --- | --- | --- |
| VALIDATION_ERROR (HTTP 400) | Thiếu trường bắt buộc; họ tên ngoài khoảng 2–50 ký tự; email sai định dạng; mật khẩu < 8 hoặc > 20 ký tự, thiếu chữ hoa/thường/số; xác nhận mật khẩu không khớp; hoặc khung giờ không thuộc 16 slot chuẩn. | Dữ liệu đầu vào không hợp lệ (nêu rõ trường vi phạm) |
| EMAIL_ALREADY_EXISTS (HTTP 400) | Đăng ký tài khoản mới với địa chỉ email đã tồn tại trong hệ thống (VAL-REG-03, ERR-REG-01). | Email này đã được đăng ký. Vui lòng sử dụng email khác |
| INVALID_CREDENTIALS (HTTP 401) | Đăng nhập sai email hoặc sai mật khẩu khi số lần thất bại liên tiếp < 5 (ERR-AUTH-01). | Email hoặc mật khẩu không chính xác |
| ACCOUNT_LOCKED (HTTP 423/403) | Đăng nhập vào tài khoản đang bị khóa tạm thời do nhập sai mật khẩu >= 5 lần liên tiếp (BUS-AUTH-01). | Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau |
| UNAUTHORIZED (HTTP 401) | Gọi API yêu cầu xác thực nhưng không gửi kèm Bearer Token hoặc Token không hợp lệ / hết hạn. | Vui lòng đăng nhập để tiếp tục thực hiện chức năng này |
| FORBIDDEN (HTTP 403) | Customer cố tình xem hoặc hủy đơn đặt sân của Customer khác (FR-CANCEL-02) hoặc gọi API của Admin. | Bạn không có quyền thực hiện thao tác này |
| COURT_NOT_FOUND (HTTP 404) | Truy vấn thông tin sân hoặc lịch sân với courtId không tồn tại. | Không tìm thấy thông tin sân cầu lông |
| COURT_INACTIVE (HTTP 400) | Gửi yêu cầu đặt sân đối với sân đang có trạng thái INACTIVE (BUS-BOOK-01, ERR-BOOK-01). | Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác |
| INVALID_BOOKING_TIME (HTTP 400) | Đặt sân cho ngày trong quá khứ hoặc khung giờ đã qua (VAL-BOOK-01). | Không thể đặt sân cho ngày hoặc khung giờ trong quá khứ |
| SLOT_NOT_AVAILABLE (HTTP 409) | Đặt vào khung giờ đã có đơn CONFIRMED hoặc bị giao dịch đồng thời khác đặt trước (BUS-BOOK-03, ERR-BOOK-02). | Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác |
| BOOKING_NOT_FOUND (HTTP 404) | Xem hoặc hủy mã đơn đặt sân (bookingId) không tồn tại trong CSDL. | Không tìm thấy đơn đặt sân trên hệ thống |
| CANCEL_NOT_ALLOWED (HTTP 400) | Customer hủy đơn khi thời gian còn lại trước giờ bắt đầu < 2 giờ, hoặc hủy đơn đã ở trạng thái CANCELLED (BUS-CANCEL-01, BUS-CANCEL-02, ERR-CANCEL-01). | Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ |

Bảng 2-4: Bảng mã lỗi của hệ thống


## 2.8   Ma trận truy vết yêu cầu


| Mã URD | Mã yêu cầu SRS | Màn hình | Gợi ý điểm kiểm thử |
| --- | --- | --- | --- |
| URD-REG-01 | FR-REG-01, FR-REG-02, VAL-REG-01, VAL-REG-02, VAL-REG-04, VAL-REG-05 | SCR-01 (Đăng ký) | Kiểm thử biên (BVA) độ dài họ tên (1, 2, 50, 51) và độ dài mật khẩu (7, 8, 20, 21 ký tự); xác nhận mật khẩu7 ký tự phải bị chặn bằng HTTP 400. |
| URD-REG-02 | FR-REG-03, VAL-REG-03, ERR-REG-01 | SCR-01 (Đăng ký) | Đăng ký lại bằng email đã có sẵn (customer1@gmail.com cả chữ thường và chữ hoa) -> kỳ vọng trả về HTTP 400 EMAIL_ALREADY_EXISTS. |
| URD-AUTH-01 | FR-AUTH-01, FR-AUTH-02, ERR-AUTH-01 | SCR-02 (Đăng nhập) | Đăng nhập đúng/sai mật khẩu; kiểm tra JWT trả về và gọi GET /api/v1/auth/me. |
| URD-AUTH-02 | BUS-AUTH-01 | SCR-02 (Đăng nhập) | Nhập sai mật khẩu liên tiếp 5 lần -> kiểm tra lần thứ 5/6 bị khóa tài khoản (ACCOUNT_LOCKED). |
| URD-COURT-01 | FR-COURT-01, FR-COURT-02, DIS-COURT-01, NFR-UI-01 | SCR-03 (Danh sách sân) | Kiểm tra hiển thị đủ 6 sân (Sân 6 gắn nhãn Bảo trì); kiểm tra responsive tại viewport 360px không xuất hiện thanh cuộn ngang. |
| URD-COURT-02 | FR-COURT-03, FR-COURT-04, NFR-PERF-02 | SCR-04 (Chi tiết lịch sân) | Kiểm tra trả về đủ 16 slot (06:00-22:00); đo thời gian phản hồi P90 của API availability <= 1.000 ms bằng Postman/JMeter. |
| URD-BOOK-01 | FR-BOOK-01, FR-BOOK-02, VAL-BOOK-01, VAL-BOOK-02, BUS-BOOK-01, ERR-BOOK-01 | SCR-04 (Đặt sân) | Đặt slot hợp lệ ở mọi sân ACTIVE (kể cả Sân 5 khung 21:00-22:00 và ghi chú > 80 ký tự); đặt ngày quá khứ phải bị chặn HTTP 400 INVALID_BOOKING_TIME; đặt Sân 6 (INACTIVE) bị chặn HTTP 400. |
| URD-BOOK-02 | FR-BOOK-03, BUS-BOOK-03, ERR-BOOK-02, NFR-DATA-01 | SCR-04 (Đặt sân) | Dùng JMeter Synchronizing Timer hoặc Promise.all gửi đồng thời >= 2 request vào cùng 1 slot -> chỉ 1 thành công (201), còn lại nhận HTTP 409 kèm đúng message chuẩn ERR-BOOK-02. |
| URD-BOOK-03 | FR-BOOK-04 | SCR-05A (Lịch sử đặt sân) | Kiểm tra danh sách đơn đặt sân của Customer đang đăng nhập tại GET /api/v1/bookings/me. |
| URD-CANCEL-01 | FR-CANCEL-01, BUS-CANCEL-01, BUS-CANCEL-03, DIS-CANCEL-02, NFR-UI-01 | SCR-05A (Lịch sử đặt sân) | Kiểm tra dòng thông báo hiển thị đúng 'ít nhất 2 giờ'; kiểm tra modal hủy ở màn hình 360px không bị che nút xác nhận; hủy mọi đơn hợp lệ (kể cả đơn mẫu ID 999) không bị crash. |
| URD-CANCEL-02 | FR-CANCEL-02, BUS-CANCEL-02, ERR-CANCEL-01, ERR-CANCEL-02 | SCR-05A (Lịch sử đặt sân) | Dùng token của Customer 1 gọi PATCH /api/v1/bookings/102/cancel (đơn của Customer 2) -> kỳ vọng bị chặn bằng HTTP 403 FORBIDDEN; hủy đơn cách giờ chơi < 2h bị chặn HTTP 400. |
| URD-CANCEL-03 | FR-ADMIN-01, FR-ADMIN-02 | SCR-05B (Quản trị đặt sân) | Kiểm tra Admin xem toàn bộ đơn hệ thống và hủy điều phối thành công; Customer gọi API Admin phải bị chặn HTTP 403. |

Bảng 2-5: Ma trận truy vết yêu cầu


## 2.9   Câu hỏi gửi bộ phận nghiệp vụ


| TT | Câu hỏi | Người trả lời | Câu trả lời / ngày |
| --- | --- | --- | --- |
| 1 | Khách hàng có được phép đặt một khung giờ kéo dài lẻ phút (ví dụ 08:15-09:15) hoặc gộp nhiều giờ trong 1 request không? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Không. Mỗi đơn đặt sân chỉ áp dụng cho đúng 01 khung giờ cố định 60 phút trong 16 khung giờ chuẩn từ 06:00 đến 22:00 (24/10/2026). |
| 2 | Mốc thời gian cho phép khách hàng tự hủy đơn trước giờ bắt đầu là 1 giờ hay 2 giờ? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Bắt buộc từ đủ 02 giờ (120 phút) trở lên trước giờ bắt đầu khung giờ thi đấu. Cả logic Backend và thông báo trên UI đều phải thống nhất là 2 giờ (24/10/2026). |
| 3 | Khi khách hàng hủy đơn đặt sân thành công, khung giờ đó có cần chờ Admin duyệt mới mở lại không? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Không cần duyệt. Ngay khi đơn chuyển sang CANCELLED, khung giờ phải lập tức chuyển về trạng thái AVAILABLE để khách khác đặt được ngay (24/10/2026). |
| 4 | Quản trị viên (Admin) hủy điều phối đơn đặt sân tại quầy có bị giới hạn bởi quy tắc trước 2 giờ không? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Không. Admin được phép hủy bất kỳ đơn CONFIRMED nào để xử lý sự cố vận hành tại sân (24/10/2026). |

Bảng 2-6: Danh sách câu hỏi gửi bộ phận nghiệp vụ


# 3   Các yêu cầu phi chức năng


## 3.1   Giao diện người dùng

- NFR-UI-01 (Responsive Layout): Toàn bộ các màn hình chính (Danh sách sân, Chi tiết lịch sân, Đặt sân, Lịch sử đặt sân) và các hộp thoại xác nhận (Modal) phải hiển thị trọn vẹn nội dung và nút bấm, tuyệt đối không phát sinh thanh cuộn ngang toàn trang ngoài ý muốn hoặc cắt khuất nút bấm tại 03 độ rộng màn hình tiêu chuẩn: 360px (Mobile), 768px (Tablet) và 1440px (Desktop).
- NFR-UI-02 (Testability Attributes): Toàn bộ các phần tử tương tác trên giao diện phải gắn thuộc tính định danh ổn định data-testid và sử dụng nhãn thuật ngữ tiếng Việt nhất quán giữa các màn hình.


## 3.2   Hiệu năng


| Mã | Nội dung yêu cầu |
| --- | --- |
| NFR-PERF-01 | Ở mức tải thông thường (50 người dùng ảo đồng thời), thời gian phản hồi trung bình (Average Response Time) của toàn bộ các API phải đạt <= 500 ms. |
| NFR-PERF-02 | Ở mức tải cao điểm (100 người dùng ảo đồng thời trong 60 giây), thời gian phản hồi phân vị 90 (P90) của API tra cứu lịch sân trống (GET /api/v1/courts/{id}/availability) phải đạt <= 1.000 ms (1 giây). |
| NFR-PERF-03 | Ở mức tải cao điểm (100 người dùng ảo đồng thời), thời gian phản hồi phân vị 95 (P95) của các API giao dịch Đặt sân (POST /api/v1/bookings) và Hủy sân (PATCH /api/v1/bookings/{id}/cancel) phải đạt <= 1.500 ms. |
| NFR-AVAIL-01 | Endpoint kiểm tra sức khỏe hệ thống (GET /health) phải phản hồi HTTP 200 OK kèm JSON {"status": "ok"} trong thời gian < 200 ms; tỷ lệ lỗi máy chủ (HTTP 5xx) dưới mức tải 100 người dùng đồng thời phải bằng 0%. |
| NFR-DATA-01 | Đảm bảo tính toàn vẹn dữ liệu nguyên tử (Atomicity & Isolation): Khi có 50 – 100 request gửi đồng thời vào cùng một khung giờ trống của cùng một sân, hệ thống chỉ cho phép đúng 01 request thành công (HTTP 201) và từ chối toàn bộ các request còn lại bằng HTTP 409 Conflict. |

Bảng 3-1: Các yêu cầu hiệu năng


## 3.3   Tính bảo mật

- NFR-SEC-01 (Mã hóa mật khẩu): Mật khẩu người dùng bắt buộc phải được băm bằng thuật toán bcrypt (cost factor = 10) trước khi lưu trữ; không bao giờ xuất hiện trường password trong bất kỳ API response nào.
- NFR-SEC-02 (Xác thực JWT): Các API Đặt sân, Xem lịch sử, Hủy sân và Quản trị bắt buộc xác thực qua HTTP Header Authorization: Bearer <JWT_TOKEN>.
- NFR-SEC-03 (Kiểm soát phân quyền cấp độ đối tượng – Chống IDOR): Mọi thao tác xem chi tiết hoặc hủy đơn đặt sân của vai trò CUSTOMER bắt buộc kiểm tra booking.userId === req.user.id; nếu vi phạm phải trả về HTTP 403 FORBIDDEN.


## 3.4   Ràng buộc

- CON-01 (Giới hạn phạm vi nghiệp vụ): Chỉ xây dựng đúng 05 nhóm chức năng (Đăng ký, Đăng nhập, Xem sân & lịch sân, Đặt sân, Hủy đặt sân); không tích hợp cổng thanh toán, khuyến mãi hay các tính năng thương mại ngoài phạm vi.
- CON-02 (Khung giờ cố định): Hệ thống cố định 16 khung giờ 60 phút mỗi ngày từ 06:00 đến 22:00.
- CON-03 (Tính xác định của dữ liệu kiểm thử): Cung cấp cơ chế nạp lại dữ liệu mẫu chuẩn (POST /api/v1/admin/reset-data) để đảm bảo mọi kịch bản kiểm thử tự động chạy lặp lại nhiều lần đều cho kết quả nhất quán.
