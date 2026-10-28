TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM

(Software Requirement Specification – SRS)

HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
(BADMINTON COURT BOOKING SYSTEM)

Phiên bản 3.0

Chi tiết hoá URD: Tài liệu Yêu cầu Người sử dụng (URD) Hệ thống Đặt sân Cầu lông – Phiên bản 3.0

Người biên soạn: Nguyễn Nhân

TP. Hồ Chí Minh, tháng 10, năm 2026


| Biên soạn bởi | Kiểm thử bởi | Duyệt bởi | Phiên bản |
| --- | --- | --- | --- |
| Chủ hệ thống (BA/Dev)<br>Nguyễn Nhân | Tester độc lập (Bạn cặp)<br>Nhóm Kiểm thử Chéo | Giảng viên hướng dẫn<br>Học phần Đánh giá hiệu năng | 3.0 |
| Ngày: 24/10/2026 | Ngày: 28/10/2026 | Ngày: 28/10/2026 | Chính thức |

Mục lục

Mục lục	2

Danh mục hình ảnh, bảng biểu	3

1   Giới thiệu	4

1.1   Mục đích	4

1.2   Phạm vi	4

1.3   Từ điển thuật ngữ	4

1.4   Tài liệu tham khảo	4

1.5   Quy ước mã yêu cầu	4

2   Các yêu cầu chức năng	6

2.1   Các tác nhân	6

2.2   Các chức năng của hệ thống	6

2.3   Biểu đồ use case tổng quan	6

2.4   Biểu đồ use case phân rã	6

2.5   Quy trình nghiệp vụ	7

2.5.1   Quy trình Đặt sân và Hủy đặt sân cầu lông	7

2.6   Đặc tả các use case	7

2.6.1   UC-01..UC-03: Đăng ký, Đăng nhập và Xem lịch sân	7

2.6.2   UC-04..UC-05: Đặt sân và Hủy đặt sân cầu lông	9

2.7   Bảng mã lỗi	9

2.8   Ma trận truy vết yêu cầu	9

2.9   Câu hỏi gửi bộ phận nghiệp vụ	10

3   Các yêu cầu phi chức năng	11

3.1   Giao diện người dùng	11

3.2   Hiệu năng	11

3.3   Tính bảo mật	11

3.4   Ràng buộc	11

Danh mục hình ảnh, bảng biểu

Hình 2-1: Biểu đồ use case tổng quan	6

Hình 2-2: Biểu đồ use case phân rã	7

Hình 2-3: Biểu đồ hoạt động của quy trình	7

Hình 2-4: Giao diện màn hình SCR-01 đến SCR-05	9

Bảng 1-1: Từ điển thuật ngữ	4

Bảng 1-2: Quy ước mã yêu cầu	4

Bảng 2-1: Danh sách các tác nhân	6

Bảng 2-2: Đặc tả chức năng các Use case UC-01 đến UC-05	8

Bảng 2-3: Dữ liệu chức năng các Use case UC-01 đến UC-05	8

Bảng 2-4: Bảng mã lỗi của hệ thống	9

Bảng 2-5: Ma trận truy vết yêu cầu	10

Bảng 2-6: Danh sách câu hỏi gửi bộ phận nghiệp vụ	10

Bảng 3-1: Các yêu cầu hiệu năng	11


# 1   Giới thiệu


## 1.1   Mục đích

Tài liệu Đặc tả Yêu cầu Phần mềm (SRS) phiên bản 3.0 này chi tiết hóa Tài liệu Yêu cầu Người sử dụng (URD) Hệ thống Đặt sân Cầu lông – Phiên bản 3.0 thành các quy tắc kỹ thuật, ràng buộc kiểm tra dữ liệu biên (EP/BVA), luồng sự kiện Use Case, bảng mã lỗi và ngưỡng hiệu năng định lượng.

Tài liệu được sử dụng bởi: (1) Lập trình viên để xây dựng sản phẩm chuẩn; (2) Tester độc lập (bạn cặp) để thiết kế Test Cases chức năng, tự động hóa API/UI và kiểm thử tải JMeter; (3) Giảng viên hướng dẫn để đối chiếu nghiệm thu.


## 1.2   Phạm vi

Hệ thống bao gồm ứng dụng Web Frontend (React/Vite) và Backend RESTful API (Node.js/Express, tiền tố /api/v1) phục vụ đúng 05 nhóm chức năng: (1) Đăng ký; (2) Đăng nhập; (3) Xem sân và lịch sân; (4) Đặt sân; (5) Hủy đặt sân.

Hệ thống không mở rộng sang các chức năng thương mại ngoài phạm vi như thanh toán trực tuyến, khuyến mãi, tích điểm, phòng chat hay quản lý giải đấu.


## 1.3   Từ điển thuật ngữ


| Thuật ngữ | Giải thích |
| --- | --- |
| EP / BVA | Equivalence Partitioning (Phân vùng tương đương) và Boundary Value Analysis (Phân tích giá trị biên) theo chuẩn ISTQB CTFL v4.0.1. |
| IDOR (Broken Object Level Authorization) | Lỗ hổng bảo mật khi người dùng A truy cập hoặc hủy trái phép bản ghi đơn đặt sân thuộc sở hữu của người dùng B. |
| Race Condition (Tranh chấp đồng thời) | Tình huống từ 2 request trở lên cùng đọc trạng thái AVAILABLE của một slot trước khi bất kỳ request nào kịp ghi trạng thái CONFIRMED. |
| P90 / P95 Response Time | Thời gian phản hồi phân vị thứ 90 / 95 (90% hoặc 95% tổng số request có thời gian xử lý nhỏ hơn hoặc bằng ngưỡng này). |
| Deterministic Seed Data | Bộ dữ liệu khởi tạo cố định (6 sân, 4 tài khoản, 5 đơn đặt sân) đảm bảo kết quả kiểm thử lặp lại chính xác 100% sau mỗi lần reset. |
| Time Slot (Khung giờ cố định) | Một ca thuê sân 60 phút trong 16 khung giờ hoạt động cố định từ 06:00 đến 22:00 hàng ngày. |

Bảng 1-1: Từ điển thuật ngữ


## 1.4   Tài liệu tham khảo

1. Tài liệu Yêu cầu Người sử dụng (URD) – Hệ thống Đặt sân Cầu lông Trực tuyến, Phiên bản 3.0.
2. Tài liệu Đặc tả API (Mẫu 01 – docs/03_API_DOCUMENTATION.docx) và Danh mục Tài khoản Kiểm thử (docs/04_TEST_ACCOUNTS.md).
3. ISTQB® Certified Tester Foundation Level (CTFL) Syllabus v4.0.1.


## 1.5   Quy ước mã yêu cầu


| Tiền tố | Loại yêu cầu | Ví dụ |
| --- | --- | --- |
| FR | Yêu cầu chức năng | FR-REG-01, FR-BOOK-01, FR-CANCEL-01, FR-CANCEL-02 |
| VAL | Quy tắc kiểm tra dữ liệu nhập | VAL-REG-01..05, VAL-BOOK-01..02 |
| DIS | Điều kiện hiển thị, ẩn hoặc khoá | DIS-COURT-01, DIS-CANCEL-01, DIS-CANCEL-02 |
| BUS | Quy tắc nghiệp vụ | BUS-AUTH-01, BUS-BOOK-01..03, BUS-CANCEL-01..03 |
| NFR | Yêu cầu phi chức năng | NFR-PERF-01..03, NFR-UI-01..02, NFR-SEC-01..03, NFR-DATA-01 |
| ERR | Mã lỗi và thông báo | ERR-REG-01, ERR-BOOK-01..02, ERR-CANCEL-01..02 |

Bảng 1-2: Quy ước mã yêu cầu


# 2   Các yêu cầu chức năng


## 2.1   Các tác nhân


| Tác nhân | Vai trò trong hệ thống |
| --- | --- |
| Guest (Khách vãng lai) | Người dùng chưa đăng nhập; được phép xem danh sách 06 sân, xem chi tiết sân, tra cứu lịch 16 khung giờ theo ngày, đăng ký tài khoản mới và đăng nhập. |
| Customer (Khách hàng thành viên) | Người dùng đã đăng nhập với role = CUSTOMER; được phép thực hiện toàn bộ quyền của Guest, đặt sân ở khung giờ trống, xem lịch sử đặt sân của chính mình và tự hủy đơn của mình trước giờ bắt đầu >= 2 giờ. |
| Admin (Chủ sân / Quản trị viên) | Người dùng đã đăng nhập với role = ADMIN; được phép xem toàn bộ danh sách đơn đặt sân của tất cả khách hàng, hủy điều phối bất kỳ đơn CONFIRMED nào và khôi phục dữ liệu kiểm thử (reset-data). |

Bảng 2-1: Danh sách các tác nhân


## 2.2   Các chức năng của hệ thống

Hệ thống bao gồm 05 nhóm chức năng chính: (1) Đăng ký tài khoản thành viên (POST /api/v1/auth/register); (2) Đăng nhập hệ thống & Xác thực JWT (POST /api/v1/auth/login, GET /api/v1/auth/me); (3) Xem danh sách 06 sân và tra cứu lịch trống 16 khung giờ theo ngày (GET /api/v1/courts, GET /api/v1/courts/:id, GET /api/v1/courts/:id/availability).

(4) Đặt sân cầu lông và xem lịch sử đặt sân cá nhân (POST /api/v1/bookings, GET /api/v1/bookings/me, GET /api/v1/bookings/:id); (5) Hủy đơn đặt sân trước giờ bắt đầu >= 2 giờ đối với Customer (PATCH /api/v1/bookings/:id/cancel) và xem/hủy điều phối toàn hệ thống đối với Admin (GET /api/v1/admin/bookings, PATCH /api/v1/admin/bookings/:id/cancel).


## 2.3   Biểu đồ use case tổng quan

Hình 2-1: Biểu đồ use case tổng quan


## 2.4   Biểu đồ use case phân rã

Hình 2-2: Biểu đồ use case phân rã


## 2.5   Quy trình nghiệp vụ


### 2.5.1   Quy trình Đặt sân và Hủy đặt sân cầu lông

Khách hàng chọn sân đang hoạt động (ACTIVE), chọn ngày đặt và khung giờ còn trống (AVAILABLE) rồi gửi yêu cầu đặt sân. Hệ thống xác thực JWT, kiểm tra ngày/giờ tương lai, kiểm tra trạng thái sân và khóa nguyên tử trên slot trước khi tạo đơn CONFIRMED. Khi hủy đơn, hệ thống kiểm tra quyền sở hữu đơn và điều kiện còn >= 2 giờ trước giờ bắt đầu.

Hình 2-3: Biểu đồ hoạt động của quy trình


## 2.6   Đặc tả các use case


### 2.6.1   UC-01: Đăng ký tài khoản thành viên


| Mã Use case | UC-01 |
| --- | --- |
| Tên Use case | Đăng ký tài khoản thành viên |
| Tác nhân | Guest (Khách vãng lai) |
| Mô tả | Cho phép khách vãng lai đăng ký mới một tài khoản khách hàng (role = CUSTOMER) bằng Họ tên, Email và Mật khẩu. |
| Sự kiện kích hoạt | Guest chọn tab 'Đăng ký' trên màn hình xác thực và bấm nút 'Đăng ký ngay'. |
| Tiền điều kiện | Hệ thống đang hoạt động bình thường; người dùng chưa đăng nhập. |
| Luồng sự kiện chính (Thành công) | 1 / Guest / Mở màn hình Đăng ký tài khoản (SCR-01).<br>2 / Guest / Nhập Họ và tên (fullName), Địa chỉ Email (email), Mật khẩu (password) và Xác nhận mật khẩu (confirmPassword), sau đó bấm 'Đăng ký ngay'.<br>3 / Hệ thống / Cắt khoảng trắng 2 đầu (trim) của fullName và email; kiểm tra các quy tắc dữ liệu VAL-REG-01 đến VAL-REG-05.<br>4 / Hệ thống / Kiểm tra tính duy nhất của email trong CSDL (không phân biệt chữ hoa/thường theo VAL-REG-03).<br>5 / Hệ thống / Mã hóa mật khẩu bằng bcrypt (10 vòng salt) và lưu bản ghi người dùng mới với role = 'CUSTOMER' (FR-REG-02).<br>6 / Hệ thống / Trả về HTTP 201 Created kèm thông báo đăng ký thành công. |
| Luồng sự kiện thay thế | 3a / Hệ thống / Nếu thiếu trường bắt buộc, fullName ngoài khoảng 2–50 ký tự (VAL-REG-01), email sai định dạng (VAL-REG-02), password < 8 hoặc > 20 ký tự hoặc thiếu chữ hoa/thường/số (VAL-REG-04), hoặc confirmPassword không khớp (VAL-REG-05): Trả về HTTP 400 VALIDATION_ERROR.<br>4a / Hệ thống / Nếu địa chỉ email đã tồn tại trong CSDL (VAL-REG-03, FR-REG-03): Từ chối tạo tài khoản và trả về HTTP 400 EMAIL_ALREADY_EXISTS. |
| Hậu điều kiện | Một bản ghi User mới với role = 'CUSTOMER' được lưu vào CSDL. |
| Quy tắc nghiệp vụ | FR-REG-01 (Tạo tài khoản mới HTTP 201); FR-REG-02 (Gán role = CUSTOMER); FR-REG-03 / VAL-REG-03 / ERR-REG-01 (Email duy nhất case-insensitive, nếu trùng trả về HTTP 400 EMAIL_ALREADY_EXISTS); VAL-REG-01 (fullName 2–50 ký tự, BVA: 1, 2, 50, 51); VAL-REG-02 (email hợp lệ <= 100 ký tự); VAL-REG-04 (password 8–20 ký tự, BVA: 7, 8, 20, 21, có chữ hoa, thường, số); VAL-REG-05 (confirmPassword khớp password). |
| Yêu cầu phi chức năng | NFR-SEC-01 (Băm mật khẩu bằng bcrypt), NFR-PERF-01 (Thời gian phản hồi <= 500 ms). |
| Truy vết URD | URD-REG-01, URD-REG-02 |

Bảng 2-2a: Đặc tả chức năng Đăng ký tài khoản thành viên

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | fullName | Họ và tên khách hàng | Có (M) | Chuỗi UTF-8, độ dài 2 – 50 ký tự sau khi trim (BVA: 1, 2, 50, 51) | Nguyễn Văn An |
| 2 | email | Địa chỉ email đăng ký | Có (M) | Định dạng chuẩn email, <= 100 ký tự, chưa tồn tại trong CSDL | nguyenvanan@gmail.com |
| 3 | password | Mật khẩu đăng nhập | Có (M) | Độ dài 8 – 20 ký tự (BVA: 7, 8, 20, 21), có >= 1 chữ hoa, >= 1 chữ thường, >= 1 chữ số | Customer@123 |
| 4 | confirmPassword | Xác nhận lại mật khẩu | Có (M) | Trùng khớp 100% với giá trị trường password | Customer@123 |

Bảng 2-3a: Dữ liệu chức năng Đăng ký tài khoản thành viên


### 2.6.2   UC-02: Đăng nhập hệ thống


| Mã Use case | UC-02 |
| --- | --- |
| Tên Use case | Đăng nhập hệ thống |
| Tác nhân | Guest, Customer, Admin |
| Mô tả | Xác thực người dùng bằng Email và Mật khẩu để cấp phát mã thông báo JWT phục vụ các chức năng bảo mật. |
| Sự kiện kích hoạt | Người dùng nhập email, password tại màn hình Đăng nhập (SCR-02) và bấm nút 'Đăng nhập'. |
| Tiền điều kiện | Tài khoản đã tồn tại trong CSDL. |
| Luồng sự kiện chính (Thành công) | 1 / Người dùng / Mở màn hình Đăng nhập (SCR-02), nhập email và password rồi bấm 'Đăng nhập'.<br>2 / Hệ thống / Kiểm tra sự tồn tại của email và trạng thái khóa tài khoản (BUS-AUTH-01).<br>3 / Hệ thống / Đối chiếu password với chuỗi băm bcrypt trong CSDL.<br>4 / Hệ thống / Đặt lại failedAttempts = 0, cấp phát JWT Token có hạn 24 giờ và trả về HTTP 200 OK. |
| Luồng sự kiện thay thế | 2a / Hệ thống / Nếu tài khoản có failedAttempts >= 5 và đang bị khóa tạm thời (BUS-AUTH-01): Trả về HTTP 423/403 kèm mã lỗi ACCOUNT_LOCKED.<br>3a / Hệ thống / Nếu email không tồn tại hoặc mật khẩu sai (ERR-AUTH-01): Tăng failedAttempts thêm 1 và trả về HTTP 401 INVALID_CREDENTIALS. |
| Hậu điều kiện | Client lưu JWT Token và chuyển sang trạng thái đã đăng nhập. |
| Quy tắc nghiệp vụ | FR-AUTH-01 (Đăng nhập trả về JWT Token); FR-AUTH-02 (Lấy thông tin user hiện tại qua GET /api/v1/auth/me); BUS-AUTH-01 (Khóa tạm thời khi nhập sai mật khẩu >= 5 lần liên tiếp); ERR-AUTH-01 (Trả về thông báo chung 'Email hoặc mật khẩu không chính xác'). |
| Yêu cầu phi chức năng | NFR-SEC-01, NFR-SEC-02 (JWT có hạn 24 giờ), NFR-PERF-01 (<= 500 ms). |
| Truy vết URD | URD-AUTH-01, URD-AUTH-02 |

Bảng 2-2b: Đặc tả chức năng Đăng nhập hệ thống

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | email | Địa chỉ email đăng nhập | Có (M) | Chuỗi email không rỗng, khớp tài khoản đã đăng ký | customer1@gmail.com |
| 2 | password | Mật khẩu đăng nhập | Có (M) | Chuỗi mật khẩu không rỗng, khớp mã băm bcrypt | Customer@123 |

Bảng 2-3b: Dữ liệu chức năng Đăng nhập hệ thống


### 2.6.3   UC-03: Xem danh sách sân và tra cứu lịch sân trống


| Mã Use case | UC-03 |
| --- | --- |
| Tên Use case | Xem danh sách sân và tra cứu lịch sân trống |
| Tác nhân | Guest, Customer, Admin |
| Mô tả | Hiển thị danh sách 06 sân cầu lông, thông tin chi tiết sân và trạng thái AVAILABLE / BOOKED của 16 khung giờ cố định theo ngày. |
| Sự kiện kích hoạt | Người dùng truy cập màn hình Danh sách sân (SCR-03) hoặc chọn sân và ngày để xem lịch trống. |
| Tiền điều kiện | Dữ liệu 06 sân cầu lông đã được khởi tạo. |
| Luồng sự kiện chính (Thành công) | 1 / Người dùng / Truy cập trang Danh sách sân (SCR-03); trình duyệt gọi GET /api/v1/courts.<br>2 / Hệ thống / Trả về danh sách 06 sân cầu lông kèm loại thảm, giá thuê/giờ và trạng thái ACTIVE/INACTIVE (FR-COURT-01).<br>3 / Người dùng / Bấm 'Xem lịch & Đặt sân' tại một sân và chọn ngày cần tra cứu (date = YYYY-MM-DD).<br>4 / Hệ thống / Truy vấn các đơn CONFIRMED của sân đó trong ngày được chọn và ánh xạ lên 16 khung giờ cố định 06:00–22:00 (FR-COURT-03, FR-COURT-04).<br>5 / Hệ thống / Trả về HTTP 200 OK gồm thông tin sân và danh sách 16 khung giờ (AVAILABLE / BOOKED). |
| Luồng sự kiện thay thế | 3a / Hệ thống / Nếu mã sân courtId không tồn tại: Trả về HTTP 404 Not Found kèm mã lỗi COURT_NOT_FOUND. |
| Hậu điều kiện | Giao diện hiển thị trực quan trạng thái 16 khung giờ trong ngày. |
| Quy tắc nghiệp vụ | FR-COURT-01 (Hiển thị đủ 6 sân); FR-COURT-02 (Xem chi tiết 1 sân); FR-COURT-03 / FR-COURT-04 (Trả về đúng 16 khung giờ cố định 06:00-07:00 đến 21:00-22:00 với trạng thái AVAILABLE hoặc BOOKED); DIS-COURT-01 (Sân INACTIVE hiển thị rõ trạng thái Bảo trì). |
| Yêu cầu phi chức năng | NFR-PERF-02 (P90 của API availability <= 1.000 ms với 100 người dùng đồng thời), NFR-UI-01 (Không cuộn ngang toàn trang ở 360px, 768px, 1440px). |
| Truy vết URD | URD-COURT-01, URD-COURT-02 |

Bảng 2-2c: Đặc tả chức năng Xem danh sách sân và tra cứu lịch sân trống

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | id (Path param) | Mã định danh sân cầu lông | Có (M) | Số nguyên dương từ 1 đến 6 | 1 |
| 2 | date (Query param) | Ngày cần tra cứu lịch | Không (O) | Định dạng YYYY-MM-DD (mặc định là ngày hiện tại) | 2026-10-25 |

Bảng 2-3c: Dữ liệu chức năng Xem danh sách sân và tra cứu lịch sân trống


### 2.6.4   UC-04: Đặt sân cầu lông


| Mã Use case | UC-04 |
| --- | --- |
| Tên Use case | Đặt sân cầu lông |
| Tác nhân | Customer (Khách hàng đã đăng nhập), Admin |
| Mô tả | Cho phép khách hàng đã đăng nhập đặt một khung giờ đang AVAILABLE trên sân ACTIVE cho ngày/giờ trong tương lai. |
| Sự kiện kích hoạt | Khách hàng chọn một khung giờ 'Còn trống', nhập ghi chú (nếu có) và bấm 'Xác nhận đặt'. |
| Tiền điều kiện | Khách hàng đã đăng nhập hợp lệ; sân được chọn đang ACTIVE. |
| Luồng sự kiện chính (Thành công) | 1 / Customer / Trên màn hình Chi tiết lịch sân (SCR-04), chọn ngày đặt (bookingDate) và bấm vào một khung giờ (timeSlot) đang AVAILABLE.<br>2 / Customer / Nhập ghi chú tùy chọn (note) trong hộp thoại xác nhận và bấm nút 'Xác nhận đặt'.<br>3 / Hệ thống / Xác thực JWT Token; kiểm tra courtId, bookingDate, timeSlot thuộc 16 khung giờ chuẩn (VAL-BOOK-02).<br>4 / Hệ thống / Kiểm tra ngày và giờ bắt đầu của slot nằm trong tương lai so với hiện tại (VAL-BOOK-01, FR-BOOK-02).<br>5 / Hệ thống / Kiểm tra sân tồn tại và có status = 'ACTIVE' (BUS-BOOK-01).<br>6 / Hệ thống / Khóa nguyên tử bộ ba [courtId, bookingDate, timeSlot] và kiểm tra chưa có đơn CONFIRMED trùng (BUS-BOOK-03, FR-BOOK-03).<br>7 / Hệ thống / Tạo đơn status = 'CONFIRMED', cấp mã BK-YYYYMMDD-XXXX và trả về HTTP 201 Created (FR-BOOK-01). |
| Luồng sự kiện thay thế | 3a / Hệ thống / Nếu thiếu trường bắt buộc hoặc timeSlot ngoài 16 khung giờ chuẩn: Trả về HTTP 400 VALIDATION_ERROR.<br>4a / Hệ thống / Nếu bookingDate hoặc khung giờ đặt nằm trong quá khứ (VAL-BOOK-01): Trả về HTTP 400 INVALID_BOOKING_TIME.<br>5a / Hệ thống / Nếu sân có trạng thái INACTIVE (BUS-BOOK-01, ERR-BOOK-01): Trả về HTTP 400 COURT_INACTIVE.<br>6a / Hệ thống / Nếu khung giờ đã có đơn CONFIRMED hoặc bị giao dịch đồng thời khác đặt trước (BUS-BOOK-03, ERR-BOOK-02): Trả về HTTP 409 SLOT_NOT_AVAILABLE kèm message chuẩn 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'. |
| Hậu điều kiện | Đơn đặt sân mới ở trạng thái CONFIRMED được lưu vào CSDL; khung giờ chuyển sang BOOKED. |
| Quy tắc nghiệp vụ | FR-BOOK-01 (Đặt thành công mọi slot AVAILABLE hợp lệ kể cả Sân 5 khung 21:00-22:00 và ghi chú > 80 ký tự); FR-BOOK-02 / VAL-BOOK-01 (Chặn đặt ngày quá khứ bằng HTTP 400 INVALID_BOOKING_TIME); FR-BOOK-03 / BUS-BOOK-03 (Chống Double Booking khi gửi đồng thời); FR-BOOK-04 (Xem lịch sử đặt sân tại GET /api/v1/bookings/me); BUS-BOOK-01 / ERR-BOOK-01 (Chặn đặt sân INACTIVE); ERR-BOOK-02 (Message chuẩn khi trùng slot: 'Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác'). |
| Yêu cầu phi chức năng | NFR-DATA-01 (Khóa nguyên tử chống Race Condition), NFR-PERF-03 (P95 <= 1.500 ms ở tải 100 người dùng đồng thời). |
| Truy vết URD | URD-BOOK-01, URD-BOOK-02, URD-BOOK-03 |

Bảng 2-2d: Đặc tả chức năng Đặt sân cầu lông

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | courtId | Mã định danh sân cầu lông | Có (M) | Số nguyên 1..5 (các sân có status = ACTIVE) | 1 |
| 2 | bookingDate | Ngày đặt sân | Có (M) | Định dạng YYYY-MM-DD, ngày >= ngày hiện tại | 2026-10-25 |
| 3 | timeSlot | Khung giờ thuê sân (60 phút) | Có (M) | Thuộc tập 16 khung giờ chuẩn từ 06:00-07:00 đến 21:00-22:00 | 09:00-10:00 |
| 4 | note | Ghi chú kèm theo đơn đặt | Không (O) | Chuỗi văn bản UTF-8, độ dài 0 – 200 ký tự | Chuẩn bị sân trước 5 phút |

Bảng 2-3d: Dữ liệu chức năng Đặt sân cầu lông


### 2.6.5   UC-05: Hủy đặt sân và Quản trị đơn đặt


| Mã Use case | UC-05 |
| --- | --- |
| Tên Use case | Hủy đặt sân và Quản trị đơn đặt |
| Tác nhân | Customer, Admin |
| Mô tả | Cho phép Customer tự hủy đơn CONFIRMED của chính mình khi còn >= 02 giờ trước giờ bắt đầu; cho phép Admin xem toàn bộ đơn và hủy điều phối. |
| Sự kiện kích hoạt | Customer hoặc Admin bấm nút 'Hủy đơn' tại màn hình Lịch sử đặt sân (SCR-05) và bấm 'Đồng ý hủy'. |
| Tiền điều kiện | Người dùng đã đăng nhập; đơn đặt sân tồn tại và đang ở trạng thái CONFIRMED. |
| Luồng sự kiện chính (Thành công) | 1 / Customer / Admin / Mở màn hình Lịch sử đặt sân (SCR-05).<br>2 / Hệ thống / Hiển thị thông báo quy định chuẩn: 'Quy định: Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ' (DIS-CANCEL-02) và danh sách đơn.<br>3 / Customer / Admin / Bấm nút 'Hủy đơn' trên một đơn đang CONFIRMED và bấm 'Đồng ý hủy' trong hộp thoại xác nhận.<br>4 / Hệ thống / Kiểm tra đơn tồn tại và đang ở trạng thái CONFIRMED (BUS-CANCEL-02).<br>5 / Hệ thống / Nếu tác nhân là Customer: Kiểm tra quyền sở hữu (booking.userId === req.user.id theo FR-CANCEL-02) và kiểm tra thời gian còn lại trước giờ bắt đầu >= 2.0 giờ (BUS-CANCEL-01, FR-CANCEL-01).<br>6 / Hệ thống / Chuyển trạng thái đơn sang CANCELLED, giải phóng khung giờ về AVAILABLE (BUS-CANCEL-03) và trả về HTTP 200 OK. |
| Luồng sự kiện thay thế | 4a / Hệ thống / Nếu mã đơn không tồn tại: Trả về HTTP 404 BOOKING_NOT_FOUND.<br>4b / Hệ thống / Nếu đơn đã ở trạng thái CANCELLED trước đó (BUS-CANCEL-02): Trả về HTTP 400 CANCEL_NOT_ALLOWED.<br>5a / Hệ thống / Nếu Customer A cố tình hủy đơn của Customer B (FR-CANCEL-02): Từ chối ngay bằng HTTP 403 FORBIDDEN.<br>5b / Hệ thống / Nếu thời gian còn lại trước giờ bắt đầu < 2 giờ đối với Customer (BUS-CANCEL-01, ERR-CANCEL-01): Trả về HTTP 400 CANCEL_NOT_ALLOWED. |
| Hậu điều kiện | Đơn đặt sân chuyển sang trạng thái CANCELLED; khung giờ trên lịch sân lập tức trở lại AVAILABLE. |
| Quy tắc nghiệp vụ | FR-CANCEL-01 / BUS-CANCEL-01 (Customer hủy mọi đơn CONFIRMED của mình kể cả đơn mẫu ID 999 khi còn >= 2 giờ trước giờ chơi; chặn nếu < 2 giờ); FR-CANCEL-02 (Chặn Customer hủy đơn của người khác bằng HTTP 403 FORBIDDEN); BUS-CANCEL-02 (Không hủy lại đơn đã CANCELLED); BUS-CANCEL-03 (Giải phóng slot về AVAILABLE ngay khi hủy); DIS-CANCEL-02 (Hiển thị đúng 'Chỉ được hủy trước thời gian thi đấu ít nhất 2 giờ'); FR-ADMIN-01..02 (Admin xem toàn bộ đơn và hủy điều phối). |
| Yêu cầu phi chức năng | NFR-UI-01 (Hộp thoại xác nhận hủy hiển thị đầy đủ nút 'Đồng ý hủy' ở màn hình 360px), NFR-SEC-03 (Chống lỗ hổng IDOR). |
| Truy vết URD | URD-CANCEL-01, URD-CANCEL-02, URD-CANCEL-03 |

Bảng 2-2e: Đặc tả chức năng Hủy đặt sân và Quản trị đơn đặt

* Dữ liệu đầu vào gồm các trường dữ liệu sau:


| STT | Trường dữ liệu | Mô tả | Bắt buộc? | Điều kiện hợp lệ | Ví dụ |
| --- | --- | --- | --- | --- | --- |
| 1 | id (Path param) | Mã định danh đơn đặt sân cần hủy | Có (M) | Số nguyên dương, đơn tồn tại và đang CONFIRMED | 101 |
| 2 | cancelReason | Lý do hủy đơn đặt sân | Không (O) | Chuỗi văn bản UTF-8, độ dài 0 – 200 ký tự | Bận việc đột xuất |

Bảng 2-3e: Dữ liệu chức năng Hủy đặt sân và Quản trị đơn đặt

Hình 2-4: Giao diện màn hình SCR-01 đến SCR-05


## 2.7   Bảng mã lỗi


| Mã lỗi | Trường hợp phát sinh | Thông báo hiển thị cho người dùng |
| --- | --- | --- |
| VALIDATION_ERROR (HTTP 400) | Thiếu trường bắt buộc; họ tên ngoài khoảng 2–50 ký tự; email sai định dạng; mật khẩu < 8 hoặc > 20 ký tự, thiếu chữ hoa/thường/số; xác nhận mật khẩu không khớp; hoặc khung giờ ngoài 16 slot chuẩn. | Dữ liệu đầu vào không hợp lệ (nêu rõ trường vi phạm) |
| EMAIL_ALREADY_EXISTS (HTTP 400) | Đăng ký tài khoản mới với địa chỉ email đã tồn tại trong hệ thống (VAL-REG-03, ERR-REG-01). | Email này đã được đăng ký. Vui lòng sử dụng email khác |
| INVALID_CREDENTIALS (HTTP 401) | Đăng nhập sai email hoặc sai mật khẩu khi số lần thất bại liên tiếp < 5 (ERR-AUTH-01). | Email hoặc mật khẩu không chính xác |
| ACCOUNT_LOCKED (HTTP 423) | Đăng nhập vào tài khoản đang bị khóa tạm thời do nhập sai mật khẩu >= 5 lần liên tiếp (BUS-AUTH-01). | Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau |
| UNAUTHORIZED (HTTP 401) | Gọi API yêu cầu xác thực nhưng không gửi kèm Bearer Token hoặc Token không hợp lệ / hết hạn. | Vui lòng đăng nhập để tiếp tục |
| FORBIDDEN (HTTP 403) | Customer cố tình xem hoặc hủy đơn đặt sân của Customer khác (FR-CANCEL-02) hoặc gọi API của Admin. | Bạn không có quyền thực hiện thao tác này |
| COURT_NOT_FOUND (HTTP 404) | Truy vấn thông tin sân hoặc lịch sân với courtId không tồn tại. | Không tìm thấy thông tin sân cầu lông |
| COURT_INACTIVE (HTTP 400) | Gửi yêu cầu đặt sân đối với sân đang có trạng thái INACTIVE (BUS-BOOK-01, ERR-BOOK-01). | Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác |
| INVALID_BOOKING_TIME (HTTP 400) | Đặt sân cho ngày trong quá khứ hoặc khung giờ đã qua (VAL-BOOK-01). | Không thể đặt sân cho ngày hoặc khung giờ trong quá khứ |
| SLOT_NOT_AVAILABLE (HTTP 409) | Đặt vào khung giờ đã có đơn CONFIRMED hoặc bị giao dịch đồng thời khác đặt trước (BUS-BOOK-03, ERR-BOOK-02). | Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác |
| BOOKING_NOT_FOUND (HTTP 404) | Xem hoặc hủy mã đơn đặt sân (bookingId) không tồn tại trong CSDL. | Không tìm thấy đơn đặt sân trên hệ thống |
| CANCEL_NOT_ALLOWED (HTTP 400) | Customer hủy đơn khi thời gian còn lại trước giờ bắt đầu < 2 giờ, hoặc hủy đơn đã ở trạng thái CANCELLED (BUS-CANCEL-01, BUS-CANCEL-02, ERR-CANCEL-01). | Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ |

Bảng 2-4: Bảng mã lỗi của hệ thống


## 2.8   Ma trận truy vết yêu cầu


| Mã URD | Mã yêu cầu SRS | Màn hình | Gợi ý điểm kiểm thử |
| --- | --- | --- | --- |
| URD-REG-01 | FR-REG-01, FR-REG-02, VAL-REG-01, VAL-REG-02, VAL-REG-04, VAL-REG-05 | SCR-01 (Đăng ký) | Kiểm thử biên (BVA) độ dài họ tên (1, 2, 50, 51) và độ dài mật khẩu (7, 8, 20, 21 ký tự); mật khẩu 7 ký tự phải bị chặn bằng HTTP 400. |
| URD-REG-02 | FR-REG-03, VAL-REG-03, ERR-REG-01 | SCR-01 (Đăng ký) | Đăng ký lại bằng email đã tồn tại (customer1@gmail.com cả chữ thường và chữ hoa) -> kỳ vọng trả về HTTP 400 EMAIL_ALREADY_EXISTS. |
| URD-AUTH-01 | FR-AUTH-01, FR-AUTH-02, ERR-AUTH-01 | SCR-02 (Đăng nhập) | Đăng nhập đúng/sai mật khẩu; kiểm tra JWT trả về và gọi GET /api/v1/auth/me. |
| URD-AUTH-02 | BUS-AUTH-01 | SCR-02 (Đăng nhập) | Nhập sai mật khẩu liên tiếp 5 lần -> kiểm tra tài khoản bị khóa tạm thời (ACCOUNT_LOCKED). |
| URD-COURT-01 | FR-COURT-01, FR-COURT-02, DIS-COURT-01, NFR-UI-01 | SCR-03 (Danh sách sân) | Kiểm tra hiển thị đủ 6 sân (Sân 6 gắn nhãn Bảo trì); kiểm tra responsive tại viewport 360px không xuất hiện thanh cuộn ngang. |
| URD-COURT-02 | FR-COURT-03, FR-COURT-04, NFR-PERF-02 | SCR-04 (Chi tiết lịch sân) | Kiểm tra trả về đủ 16 slot (06:00-22:00); đo thời gian phản hồi P90 của API availability <= 1.000 ms bằng Postman/JMeter. |
| URD-BOOK-01 | FR-BOOK-01, FR-BOOK-02, VAL-BOOK-01, VAL-BOOK-02, BUS-BOOK-01, ERR-BOOK-01 | SCR-04 (Đặt sân) | Đặt slot hợp lệ ở mọi sân ACTIVE (kể cả Sân 5 khung 21:00-22:00 và ghi chú > 80 ký tự); đặt ngày quá khứ phải bị chặn HTTP 400 INVALID_BOOKING_TIME; đặt Sân 6 bị chặn HTTP 400. |
| URD-BOOK-02 | FR-BOOK-03, BUS-BOOK-03, ERR-BOOK-02, NFR-DATA-01 | SCR-04 (Đặt sân) | Gửi đồng thời >= 2 request vào cùng 1 slot -> chỉ 1 thành công (201), còn lại nhận HTTP 409 kèm đúng message chuẩn ERR-BOOK-02. |
| URD-BOOK-03 | FR-BOOK-04 | SCR-05A (Lịch sử đặt sân) | Kiểm tra danh sách đơn đặt sân của Customer đang đăng nhập tại GET /api/v1/bookings/me. |
| URD-CANCEL-01 | FR-CANCEL-01, BUS-CANCEL-01, BUS-CANCEL-03, DIS-CANCEL-02, NFR-UI-01 | SCR-05A (Lịch sử đặt sân) | Kiểm tra thông báo hiển thị đúng 'ít nhất 2 giờ'; modal hủy ở màn hình 360px không bị che nút xác nhận; hủy mọi đơn hợp lệ (kể cả đơn mẫu ID 999) không bị crash. |
| URD-CANCEL-02 | FR-CANCEL-02, BUS-CANCEL-02, ERR-CANCEL-01, ERR-CANCEL-02 | SCR-05A (Lịch sử đặt sân) | Dùng token của Customer 1 gọi PATCH /api/v1/bookings/102/cancel (đơn của Customer 2) -> kỳ vọng bị chặn bằng HTTP 403 FORBIDDEN; hủy đơn < 2h bị chặn HTTP 400. |
| URD-CANCEL-03 | FR-ADMIN-01, FR-ADMIN-02 | SCR-05B (Quản trị đặt sân) | Kiểm tra Admin xem toàn bộ đơn hệ thống và hủy điều phối thành công; Customer gọi API Admin phải bị chặn HTTP 403. |

Bảng 2-5: Ma trận truy vết yêu cầu


## 2.9   Câu hỏi gửi bộ phận nghiệp vụ


| TT | Câu hỏi | Người trả lời | Câu trả lời / ngày |
| --- | --- | --- | --- |
| 1 | Khách hàng có được phép đặt khung giờ lẻ phút (ví dụ 08:15-09:15) hoặc gộp nhiều giờ trong 1 request không? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Không. Mỗi đơn đặt sân chỉ áp dụng cho đúng 01 khung giờ cố định 60 phút trong 16 khung giờ chuẩn từ 06:00 đến 22:00 (24/10/2026). |
| 2 | Mốc thời gian cho phép khách hàng tự hủy đơn trước giờ bắt đầu là 1 giờ hay 2 giờ? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Bắt buộc từ đủ 02 giờ (120 phút) trở lên trước giờ bắt đầu khung giờ thi đấu. Cả logic Backend và thông báo trên UI đều phải thống nhất là 2 giờ (24/10/2026). |
| 3 | Khi khách hàng hủy đơn đặt sân thành công, khung giờ đó có cần chờ Admin duyệt mới mở lại không? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Không cần duyệt. Ngay khi đơn chuyển sang CANCELLED, khung giờ phải lập tức chuyển về trạng thái AVAILABLE để khách khác đặt được ngay (24/10/2026). |
| 4 | Quản trị viên (Admin) hủy điều phối đơn đặt sân tại quầy có bị giới hạn bởi quy tắc trước 2 giờ không? | Chủ hệ thống (Bộ phận Nghiệp vụ) | Không. Admin được phép hủy bất kỳ đơn CONFIRMED nào để xử lý sự cố vận hành tại sân (24/10/2026). |

Bảng 2-6: Danh sách câu hỏi gửi bộ phận nghiệp vụ


# 3   Các yêu cầu phi chức năng


## 3.1   Giao diện người dùng

1. NFR-UI-01 (Responsive Layout): Toàn bộ các màn hình chính (Danh sách sân, Chi tiết lịch sân, Đặt sân, Lịch sử đặt sân) và các hộp thoại xác nhận (Modal) phải hiển thị trọn vẹn nội dung và nút bấm, không phát sinh thanh cuộn ngang toàn trang ngoài ý muốn hoặc cắt khuất nút bấm tại 03 độ rộng màn hình tiêu chuẩn: 360px, 768px và 1440px.
2. NFR-UI-02 (Testability & Consistency): Toàn bộ các phần tử tương tác gắn thuộc tính định danh ổn định data-testid và sử dụng nhãn thuật ngữ tiếng Việt nhất quán.


## 3.2   Hiệu năng


| Mã | Nội dung yêu cầu |
| --- | --- |
| NFR-PERF-01 | Ở mức tải thông thường (50 người dùng ảo đồng thời), thời gian phản hồi trung bình (Average Response Time) của toàn bộ các API phải đạt <= 500 ms. |
| NFR-PERF-02 | Ở mức tải cao điểm (100 người dùng ảo đồng thời trong 60 giây), thời gian phản hồi phân vị 90 (P90) của API tra cứu lịch sân trống (GET /api/v1/courts/{id}/availability) phải đạt <= 1.000 ms (1 giây). |
| NFR-PERF-03 | Ở mức tải cao điểm (100 người dùng ảo đồng thời), thời gian phản hồi phân vị 95 (P95) của các API giao dịch Đặt sân (POST /api/v1/bookings) và Hủy sân (PATCH /api/v1/bookings/{id}/cancel) phải đạt <= 1.500 ms. |
| NFR-AVAIL-01 | Endpoint kiểm tra sức khỏe hệ thống (GET /health) phải phản hồi HTTP 200 OK kèm JSON {"status": "ok"} trong thời gian < 200 ms; tỷ lệ lỗi máy chủ (HTTP 5xx) dưới mức tải 100 người dùng đồng thời bằng 0%. |
| NFR-DATA-01 | Đảm bảo tính toàn vẹn dữ liệu nguyên tử (Atomicity & Isolation): Khi có 50 – 100 request gửi đồng thời vào cùng một khung giờ trống của cùng một sân, hệ thống chỉ cho phép đúng 01 request thành công (HTTP 201) và từ chối toàn bộ các request còn lại bằng HTTP 409 Conflict. |

Bảng 3-1: Các yêu cầu hiệu năng


## 3.3   Tính bảo mật

1. NFR-SEC-01 (Mã hóa mật khẩu): Mật khẩu người dùng bắt buộc băm bằng thuật toán bcrypt (cost factor = 10); không bao giờ trả về trường password trong API response.
2. NFR-SEC-02 (Xác thực JWT): Các API Đặt sân, Xem lịch sử, Hủy sân và Quản trị bắt buộc xác thực qua HTTP Header Authorization: Bearer <JWT_TOKEN>.
3. NFR-SEC-03 (Chống lỗ hổng IDOR): Mọi thao tác xem chi tiết hoặc hủy đơn đặt sân của vai trò CUSTOMER bắt buộc kiểm tra booking.userId === req.user.id; nếu vi phạm phải trả về HTTP 403 FORBIDDEN.


## 3.4   Ràng buộc

1. CON-01 (Giới hạn phạm vi nghiệp vụ): Chỉ xây dựng đúng 05 nhóm chức năng (Đăng ký, Đăng nhập, Xem sân & lịch sân, Đặt sân, Hủy đặt sân).
2. CON-02 (Khung giờ cố định): Hệ thống vận hành cố định 16 khung giờ 60 phút mỗi ngày từ 06:00 đến 22:00.
3. CON-03 (Tính xác định của dữ liệu kiểm thử): Cung cấp API POST /api/v1/admin/reset-data để khôi phục dữ liệu mẫu chuẩn trước mỗi lần chạy kiểm thử tự động.
