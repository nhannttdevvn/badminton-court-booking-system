TÀI LIỆU API

Hệ thống: Hệ thống Đặt sân Cầu lông (Badminton Court Booking System)  ·  Phiên bản: 3.0  ·  Người lập: Nguyễn Nhân  ·  Ngày: 28/10/2026


# 1. Thông tin chung


| Base URL | http://localhost:5001/api/v1 (Health check tại http://localhost:5001/health) |
| --- | --- |
| Định dạng dữ liệu | JSON, mã hoá UTF-8. Header: Content-Type: application/json |
| Cơ chế xác thực | Bearer token (JWT) trong header Authorization: Bearer <token> |
| Cách lấy token | Gọi POST /api/v1/auth/login, lấy trường "token" trong response |
| Thời hạn token | 24 giờ (1440 phút) |
| Định dạng ngày giờ | Ngày đặt sân: YYYY-MM-DD (ví dụ 2026-10-25); Khung giờ: HH:mm-HH:mm (ví dụ 08:00-09:00); Thời điểm tạo/hủy: ISO 8601 |
| Phân trang (nếu có) | Không áp dụng phân trang (trả về toàn bộ danh sách 6 sân và danh sách đơn đặt sân) |
| Link Swagger (nếu có) | Không sử dụng Swagger (đặc tả chi tiết đầy đủ tại Mục 4 bên dưới) |


# 2. Mã lỗi chung


| Mã HTTP | Ý nghĩa | Body mẫu |
| --- | --- | --- |
| 200 | Thành công | { "success": true, "data": { ... } } |
| 201 | Tạo mới thành công | { "success": true, "message": "...", "data": { "id": ... } } |
| 400 | Dữ liệu gửi lên không hợp lệ (VALIDATION_ERROR) | { "success": false, "errorCode": "VALIDATION_ERROR", "message": "..." } |
| 400 | Email đăng ký đã tồn tại (EMAIL_ALREADY_EXISTS) | { "success": false, "errorCode": "EMAIL_ALREADY_EXISTS", "message": "Email này đã được đăng ký. Vui lòng sử dụng email khác" } |
| 400 | Sân đang bảo trì (COURT_INACTIVE) hoặc Ngày đặt quá khứ (INVALID_BOOKING_TIME) hoặc Hủy sân < 2h (CANCEL_NOT_ALLOWED) | { "success": false, "errorCode": "CANCEL_NOT_ALLOWED", "message": "Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ" } |
| 401 | Chưa đăng nhập / token hết hạn (UNAUTHORIZED) hoặc Sai thông tin đăng nhập (INVALID_CREDENTIALS) | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |
| 403 | Đã đăng nhập nhưng không có quyền truy cập / hủy đơn người khác (FORBIDDEN) | { "success": false, "errorCode": "FORBIDDEN", "message": "Bạn không có quyền thực hiện thao tác này" } |
| 404 | Không tìm thấy sân hoặc đơn đặt sân (COURT_NOT_FOUND / BOOKING_NOT_FOUND) | { "success": false, "errorCode": "COURT_NOT_FOUND", "message": "Không tìm thấy thông tin sân cầu lông" } |
| 409 | Xung đột dữ liệu: Khung giờ đã được đặt (SLOT_NOT_AVAILABLE) | { "success": false, "errorCode": "SLOT_NOT_AVAILABLE", "message": "Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác" } |
| 423 | Tài khoản bị khóa tạm thời do nhập sai mật khẩu >= 5 lần (ACCOUNT_LOCKED) | { "success": false, "errorCode": "ACCOUNT_LOCKED", "message": "Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau" } |
| 500 | Lỗi máy chủ nội bộ (INTERNAL_ERROR) | { "success": false, "errorCode": "INTERNAL_ERROR", "message": "Lỗi hệ thống nội bộ máy chủ" } |


# 3. Danh sách endpoint


| STT | Method | Endpoint | Mô tả | Chức năng (FR) | Vai trò được phép |
| --- | --- | --- | --- | --- | --- |
| 1 | POST | /api/v1/auth/register | Đăng ký tài khoản khách hàng mới | FR-REG-01..03 | Tất cả (Guest) |
| 2 | POST | /api/v1/auth/login | Đăng nhập xác thực nhận JWT Token | FR-AUTH-01 | Tất cả |
| 3 | GET | /api/v1/auth/me | Lấy thông tin người dùng hiện tại từ Token | FR-AUTH-02 | Customer, Admin |
| 4 | GET | /api/v1/courts | Lấy danh sách toàn bộ 6 sân cầu lông | FR-COURT-01 | Tất cả |
| 5 | GET | /api/v1/courts/:id | Xem chi tiết thông tin 1 sân cầu lông | FR-COURT-02 | Tất cả |
| 6 | GET | /api/v1/courts/:id/availability | Tra cứu lịch 16 khung giờ trống/đã đặt theo ngày | FR-COURT-03..04 | Tất cả |
| 7 | POST | /api/v1/bookings | Tạo đơn đặt sân cho khung giờ còn trống | FR-BOOK-01..03 | Customer, Admin |
| 8 | GET | /api/v1/bookings/me | Xem danh sách lịch sử đặt sân của bản thân | FR-BOOK-04 | Customer, Admin |
| 9 | GET | /api/v1/bookings/:id | Xem chi tiết thông tin 1 đơn đặt sân | FR-BOOK-04 | Chủ sở hữu, Admin |
| 10 | PATCH | /api/v1/bookings/:id/cancel | Khách hàng hủy đơn đặt sân của chính mình (>= 2h) | FR-CANCEL-01..02 | Chủ sở hữu, Admin |
| 11 | GET | /api/v1/admin/bookings | Quản trị viên xem toàn bộ đơn đặt sân hệ thống | FR-ADMIN-01 | Admin |
| 12 | PATCH | /api/v1/admin/bookings/:id/cancel | Quản trị viên hủy điều phối đơn đặt sân tại quầy | FR-ADMIN-02 | Admin |
| 13 | POST | /api/v1/admin/reset-data | Khôi phục dữ liệu kiểm thử về trạng thái mặc định | CON-03 | Tất cả / Admin |
| 14 | GET | /health | Kiểm tra trạng thái sẵn sàng của máy chủ API | NFR-AVAIL-01 | Tất cả |


# 4. Đặc tả chi tiết từng endpoint


## 4.1. POST /api/v1/auth/register – Đăng ký tài khoản thành viên


| Method + URL | POST {{baseUrl}}/auth/register |
| --- | --- |
| Mô tả | Khách vãng lai tạo tài khoản thành viên mới, mặc định gán vai trò CUSTOMER. |
| Chức năng liên quan | FR-REG-01..03, VAL-REG-01..05, ERR-REG-01 |
| Vai trò được phép | Tất cả (Guest / Public) |
| Headers | Content-Type: application/json |

Request body


| Trường | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- |
| fullName | string | Có | Độ dài 2 – 50 ký tự sau khi cắt khoảng trắng (VAL-REG-01) | Họ và tên khách hàng |
| email | string | Có | Định dạng email hợp lệ, <= 100 ký tự, duy nhất không phân biệt hoa thường (VAL-REG-02, VAL-REG-03) | Địa chỉ email đăng nhập |
| password | string | Có | Độ dài 8 – 20 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số (VAL-REG-04) | Mật khẩu tài khoản |
| confirmPassword | string | Có | Trùng khớp 100% với password (VAL-REG-05) | Xác nhận lại mật khẩu |

{

"fullName": "Nguyễn Văn An",

"email": "newcustomer@gmail.com",

"password": "Customer@123",

"confirmPassword": "Customer@123"

}

Response thành công – 201 Created

{

"success": true,

"message": "Đăng ký tài khoản thành viên thành công",

"user": {

"id": 5,

"fullName": "Nguyễn Văn An",

"email": "newcustomer@gmail.com",

"role": "CUSTOMER"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 400 | Vi phạm độ dài họ tên (1, 51), mật khẩu (7, 21) hoặc confirmPassword không khớp | { "success": false, "errorCode": "VALIDATION_ERROR", "message": "Mật khẩu phải từ 8 đến 20 ký tự, bao gồm chữ hoa, chữ thường và chữ số" } |
| 400 | Email đã tồn tại trong CSDL (VAL-REG-03) | { "success": false, "errorCode": "EMAIL_ALREADY_EXISTS", "message": "Email này đã được đăng ký. Vui lòng sử dụng email khác" } |


## 4.2. POST /api/v1/auth/login – Đăng nhập hệ thống


| Method + URL | POST {{baseUrl}}/auth/login |
| --- | --- |
| Mô tả | Xác thực email và mật khẩu để cấp phát JWT Token có thời hạn 24 giờ. |
| Chức năng liên quan | FR-AUTH-01, BUS-AUTH-01, ERR-AUTH-01 |
| Vai trò được phép | Tất cả (Guest, Customer, Admin) |
| Headers | Content-Type: application/json |

Request body


| Trường | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- |
| email | string | Có | Email hợp lệ đã đăng ký | Địa chỉ email đăng nhập |
| password | string | Có | Mật khẩu khớp với tài khoản | Mật khẩu đăng nhập |

{

"email": "customer1@gmail.com",

"password": "Customer@123"

}

Response thành công – 200 OK

{

"success": true,

"message": "Đăng nhập thành công",

"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

"user": {

"id": 2,

"fullName": "Nguyễn Văn An",

"email": "customer1@gmail.com",

"role": "CUSTOMER"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 400 | Bỏ trống email hoặc password | { "success": false, "errorCode": "VALIDATION_ERROR", "message": "Vui lòng nhập đầy đủ email và mật khẩu" } |
| 401 | Email không tồn tại hoặc mật khẩu sai (số lần sai < 5) | { "success": false, "errorCode": "INVALID_CREDENTIALS", "message": "Email hoặc mật khẩu không chính xác" } |
| 423 | Nhập sai mật khẩu liên tiếp >= 5 lần (BUS-AUTH-01) | { "success": false, "errorCode": "ACCOUNT_LOCKED", "message": "Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau" } |


## 4.3. GET /api/v1/auth/me – Lấy thông tin phiên đăng nhập hiện tại


| Method + URL | GET {{baseUrl}}/auth/me |
| --- | --- |
| Mô tả | Trả về thông tin cá nhân của người dùng tương ứng với JWT Token đang sử dụng. |
| Chức năng liên quan | FR-AUTH-02 |
| Vai trò được phép | Customer, Admin. Khách vãng lai → 401 |
| Headers | Authorization: Bearer <token> |

Response thành công – 200 OK

{

"success": true,

"user": {

"id": 2,

"fullName": "Nguyễn Văn An",

"email": "customer1@gmail.com",

"role": "CUSTOMER"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 401 | Không gửi kèm Bearer Token hoặc Token không hợp lệ | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |


## 4.4. GET /api/v1/courts – Lấy danh sách sân cầu lông


| Method + URL | GET {{baseUrl}}/courts |
| --- | --- |
| Mô tả | Trả về danh sách toàn bộ 6 sân cầu lông kèm loại thảm, giá thuê/giờ và trạng thái (ACTIVE / INACTIVE). |
| Chức năng liên quan | FR-COURT-01, DIS-COURT-01 |
| Vai trò được phép | Tất cả (Public) |
| Headers | Không yêu cầu |

Response thành công – 200 OK

{

"success": true,

"data": [

{

"id": 1,

"name": "Sân 1",

"type": "Thảm Enlio Tiêu Chuẩn",

"pricePerHour": 120000,

"status": "ACTIVE",

"description": "Sân thảm chống trượt chuẩn thi đấu phong trào"

},

{

"id": 6,

"name": "Sân 6",

"type": "Thảm Alite Phong Trào",

"pricePerHour": 100000,

"status": "INACTIVE",

"description": "Đang bảo trì hệ thống chiếu sáng"

}

]

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 500 | Lỗi máy chủ nội bộ | { "success": false, "errorCode": "INTERNAL_ERROR", "message": "Lỗi hệ thống nội bộ máy chủ" } |


## 4.5. GET /api/v1/courts/:id – Xem chi tiết thông tin sân


| Method + URL | GET {{baseUrl}}/courts/:id |
| --- | --- |
| Mô tả | Trả về thông tin chi tiết của một sân cầu lông theo mã định danh id. |
| Chức năng liên quan | FR-COURT-02 |
| Vai trò được phép | Tất cả (Public) |
| Headers | Không yêu cầu |

Tham số path / query (nếu có)


| Tên | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- | --- |
| id | path | integer | Có | Số nguyên từ 1 đến 6 | Mã định danh sân cầu lông |

Response thành công – 200 OK

{

"success": true,

"data": {

"id": 1,

"name": "Sân 1",

"type": "Thảm Enlio Tiêu Chuẩn",

"pricePerHour": 120000,

"status": "ACTIVE",

"description": "Sân thảm chống trượt chuẩn thi đấu phong trào"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 404 | Mã sân không tồn tại trong hệ thống (ví dụ id = 99) | { "success": false, "errorCode": "COURT_NOT_FOUND", "message": "Không tìm thấy thông tin sân cầu lông" } |


## 4.6. GET /api/v1/courts/:id/availability – Tra cứu lịch sân trống theo ngày


| Method + URL | GET {{baseUrl}}/courts/:id/availability?date=YYYY-MM-DD |
| --- | --- |
| Mô tả | Trả về trạng thái AVAILABLE / BOOKED của đủ 16 khung giờ cố định (06:00-07:00 đến 21:00-22:00) theo sân và ngày. |
| Chức năng liên quan | FR-COURT-03, FR-COURT-04, NFR-PERF-02 |
| Vai trò được phép | Tất cả (Public) |
| Headers | Không yêu cầu |

Tham số path / query (nếu có)


| Tên | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- | --- |
| id | path | integer | Có | Số nguyên từ 1 đến 6 | Mã định danh sân cầu lông |
| date | query | string (date) | Không | Định dạng YYYY-MM-DD (mặc định ngày hiện tại) | Ngày cần tra cứu lịch sân |

Response thành công – 200 OK

{

"success": true,

"courtId": 1,

"courtName": "Sân 1",

"courtStatus": "ACTIVE",

"pricePerHour": 120000,

"date": "2026-10-25",

"slots": [

{

"timeSlot": "06:00-07:00",

"startTime": "06:00",

"endTime": "07:00",

"status": "AVAILABLE",

"bookingId": null

},

{

"timeSlot": "08:00-09:00",

"startTime": "08:00",

"endTime": "09:00",

"status": "BOOKED",

"bookingId": 101,

"bookingCode": "BK-SAMPLE-01"

}

]

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 404 | Mã sân không tồn tại | { "success": false, "errorCode": "COURT_NOT_FOUND", "message": "Không tìm thấy thông tin sân cầu lông" } |


## 4.7. POST /api/v1/bookings – Tạo đơn đặt sân


| Method + URL | POST {{baseUrl}}/bookings |
| --- | --- |
| Mô tả | Khách hàng đã đăng nhập tạo đơn đặt sân mới cho một khung giờ đang AVAILABLE; đơn tạo thành công ở trạng thái CONFIRMED. |
| Chức năng liên quan | FR-BOOK-01..03, VAL-BOOK-01..02, BUS-BOOK-01..03, ERR-BOOK-01..02 |
| Vai trò được phép | Customer, Admin. Khách vãng lai → 401 |
| Headers | Authorization: Bearer <token>  Content-Type: application/json |

Request body


| Trường | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- |
| courtId | integer | Có | Sân phải tồn tại và có status = ACTIVE (BUS-BOOK-01) | Mã định danh sân cầu lông |
| bookingDate | date (YYYY-MM-DD) | Có | Ngày và giờ bắt đầu phải ở tương lai >= hiện tại (VAL-BOOK-01) | Ngày đặt thi đấu |
| timeSlot | string | Có | Thuộc 1 trong 16 khung giờ cố định 06:00-07:00 .. 21:00-22:00 (VAL-BOOK-02) | Khung giờ thi đấu 60 phút |
| note | string | Không | Chuỗi văn bản ghi chú tùy chọn (tối đa 200 ký tự) | Ghi chú kèm theo đơn đặt |

{

"courtId": 1,

"bookingDate": "2026-10-25",

"timeSlot": "09:00-10:00",

"note": "Chuẩn bị sân trước 5 phút"

}

Response thành công – 201 Created

{

"success": true,

"message": "Đặt sân thành công! Mã đơn: BK-20261025-1000",

"data": {

"id": 1000,

"bookingCode": "BK-20261025-1000",

"courtId": 1,

"courtName": "Sân 1",

"userId": 2,

"bookingDate": "2026-10-25",

"timeSlot": "09:00-10:00",

"totalPrice": 120000,

"status": "CONFIRMED"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 400 | Thiếu trường bắt buộc hoặc timeSlot ngoài 16 khung giờ chuẩn | { "success": false, "errorCode": "VALIDATION_ERROR", "message": "Khung giờ đặt sân không hợp lệ" } |
| 400 | Đặt sân cho ngày hoặc khung giờ trong quá khứ (VAL-BOOK-01) | { "success": false, "errorCode": "INVALID_BOOKING_TIME", "message": "Không thể đặt sân cho ngày hoặc khung giờ trong quá khứ" } |
| 400 | Đặt vào sân đang tạm ngừng hoạt động INACTIVE (Sân 6) | { "success": false, "errorCode": "COURT_INACTIVE", "message": "Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác" } |
| 401 | Không gửi token hoặc token hết hạn | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |
| 409 | Khung giờ đã có đơn CONFIRMED hoặc bị giao dịch đồng thời khác đặt trước (BUS-BOOK-03, ERR-BOOK-02) | { "success": false, "errorCode": "SLOT_NOT_AVAILABLE", "message": "Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác" } |


## 4.8. GET /api/v1/bookings/me – Xem lịch sử đặt sân của chính mình


| Method + URL | GET {{baseUrl}}/bookings/me |
| --- | --- |
| Mô tả | Trả về danh sách các đơn đặt sân thuộc về người dùng đang đăng nhập kèm cờ canCancel. |
| Chức năng liên quan | FR-BOOK-04 |
| Vai trò được phép | Customer, Admin. Khách vãng lai → 401 |
| Headers | Authorization: Bearer <token> |

Response thành công – 200 OK

{

"success": true,

"data": [

{

"id": 101,

"bookingCode": "BK-SAMPLE-01",

"courtId": 1,

"courtName": "Sân 1",

"bookingDate": "2026-10-25",

"timeSlot": "08:00-09:00",

"status": "CONFIRMED",

"canCancel": true

}

]

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 401 | Không gửi token hoặc token không hợp lệ | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |


## 4.9. GET /api/v1/bookings/:id – Xem chi tiết 1 đơn đặt sân


| Method + URL | GET {{baseUrl}}/bookings/:id |
| --- | --- |
| Mô tả | Trả về thông tin chi tiết của một đơn đặt sân theo mã id. |
| Chức năng liên quan | FR-BOOK-04 |
| Vai trò được phép | Chủ sở hữu đơn (Customer) hoặc Admin. Customer khác → 403 |
| Headers | Authorization: Bearer <token> |

Tham số path / query (nếu có)


| Tên | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- | --- |
| id | path | integer | Có | Mã đơn đặt sân tồn tại trong hệ thống | ID đơn đặt sân |

Response thành công – 200 OK

{

"success": true,

"data": {

"id": 101,

"bookingCode": "BK-SAMPLE-01",

"courtId": 1,

"userId": 2,

"bookingDate": "2026-10-25",

"timeSlot": "08:00-09:00",

"status": "CONFIRMED"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 401 | Chưa đăng nhập | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |
| 403 | Customer A xem đơn đặt sân thuộc về Customer B | { "success": false, "errorCode": "FORBIDDEN", "message": "Bạn không có quyền xem thông tin đơn đặt sân của người khác" } |
| 404 | Không tìm thấy mã đơn đặt sân | { "success": false, "errorCode": "BOOKING_NOT_FOUND", "message": "Không tìm thấy thông tin đơn đặt sân" } |


## 4.10. PATCH /api/v1/bookings/:id/cancel – Khách hàng hủy đơn đặt sân


| Method + URL | PATCH {{baseUrl}}/bookings/:id/cancel |
| --- | --- |
| Mô tả | Khách hàng hủy đơn đặt sân CONFIRMED của chính mình khi thời gian còn lại trước giờ bắt đầu >= 2 giờ. |
| Chức năng liên quan | FR-CANCEL-01, FR-CANCEL-02, BUS-CANCEL-01..03, ERR-CANCEL-01..02 |
| Vai trò được phép | Chủ sở hữu đơn (Customer) hoặc Admin. Khách vãng lai → 401; Customer khác → 403 |
| Headers | Authorization: Bearer <token>  Content-Type: application/json |

Tham số path / query (nếu có)


| Tên | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- | --- |
| id | path | integer | Có | Đơn phải tồn tại, thuộc sở hữu của người gọi và đang CONFIRMED | ID đơn đặt sân cần hủy |

Request body


| Trường | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- |
| cancelReason | string | Không | Chuỗi văn bản tối đa 200 ký tự | Lý do hủy đơn đặt sân |

{

"cancelReason": "Bận việc đột xuất"

}

Response thành công – 200 OK

{

"success": true,

"message": "Đã hủy lượt đặt sân thành công!",

"data": {

"id": 101,

"bookingCode": "BK-SAMPLE-01",

"status": "CANCELLED",

"cancelledBy": 2,

"cancelReason": "Bận việc đột xuất"

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 400 | Thời gian còn lại trước giờ bắt đầu < 2 giờ (BUS-CANCEL-01) hoặc đơn đã CANCELLED (BUS-CANCEL-02) | { "success": false, "errorCode": "CANCEL_NOT_ALLOWED", "message": "Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ" } |
| 401 | Không gửi token hoặc token không hợp lệ | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |
| 403 | Customer cố tình hủy đơn đặt sân của Customer khác (FR-CANCEL-02) | { "success": false, "errorCode": "FORBIDDEN", "message": "Bạn không có quyền hủy đơn đặt sân của người khác" } |
| 404 | Mã đơn đặt sân không tồn tại | { "success": false, "errorCode": "BOOKING_NOT_FOUND", "message": "Không tìm thấy đơn đặt sân trên hệ thống" } |


## 4.11. GET /api/v1/admin/bookings – Admin xem toàn bộ đơn đặt sân


| Method + URL | GET {{baseUrl}}/admin/bookings |
| --- | --- |
| Mô tả | Quản trị viên lấy danh sách toàn bộ đơn đặt sân của tất cả khách hàng trên hệ thống. |
| Chức năng liên quan | FR-ADMIN-01 |
| Vai trò được phép | Admin. Khách vãng lai → 401; Customer → 403 |
| Headers | Authorization: Bearer <adminToken> |

Response thành công – 200 OK

{

"success": true,

"count": 5,

"data": [

{

"id": 101,

"bookingCode": "BK-SAMPLE-01",

"courtId": 1,

"customerEmail": "customer1@gmail.com",

"bookingDate": "2026-10-25",

"timeSlot": "08:00-09:00",

"status": "CONFIRMED"

}

]

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 401 | Chưa đăng nhập | { "success": false, "errorCode": "UNAUTHORIZED", "message": "Vui lòng đăng nhập để tiếp tục" } |
| 403 | Tài khoản vai trò CUSTOMER gọi API quản trị | { "success": false, "errorCode": "FORBIDDEN", "message": "Bạn không có quyền truy cập chức năng quản trị" } |


## 4.12. PATCH /api/v1/admin/bookings/:id/cancel – Admin hủy điều phối đơn đặt sân


| Method + URL | PATCH {{baseUrl}}/admin/bookings/:id/cancel |
| --- | --- |
| Mô tả | Quản trị viên hủy điều phối bất kỳ đơn đặt sân nào đang ở trạng thái CONFIRMED. |
| Chức năng liên quan | FR-ADMIN-02 |
| Vai trò được phép | Admin. Khách vãng lai → 401; Customer → 403 |
| Headers | Authorization: Bearer <adminToken>  Content-Type: application/json |

Tham số path / query (nếu có)


| Tên | Vị trí | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- | --- |
| id | path | integer | Có | Mã đơn đặt sân đang ở trạng thái CONFIRMED | ID đơn đặt sân cần hủy |

Request body


| Trường | Kiểu | Bắt buộc | Ràng buộc | Mô tả |
| --- | --- | --- | --- | --- |
| cancelReason | string | Không | Chuỗi văn bản tối đa 200 ký tự | Lý do Admin hủy điều phối tại quầy |

{

"cancelReason": "Admin hủy điều phối tại quầy"

}

Response thành công – 200 OK

{

"success": true,

"message": "Admin đã hủy đơn đặt sân thành công!",

"data": {

"id": 102,

"bookingCode": "BK-SAMPLE-02",

"status": "CANCELLED",

"cancelledBy": 1

}

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 400 | Đơn đặt sân đã ở trạng thái CANCELLED trước đó | { "success": false, "errorCode": "CANCEL_NOT_ALLOWED", "message": "Đơn đặt sân này đã được hủy trước đó" } |
| 403 | Tài khoản CUSTOMER gọi API này | { "success": false, "errorCode": "FORBIDDEN", "message": "Bạn không có quyền truy cập chức năng quản trị" } |
| 404 | Không tìm thấy đơn đặt sân | { "success": false, "errorCode": "BOOKING_NOT_FOUND", "message": "Không tìm thấy đơn đặt sân trên hệ thống" } |


## 4.13. POST /api/v1/admin/reset-data – Khôi phục dữ liệu kiểm thử về mặc định


| Method + URL | POST {{baseUrl}}/admin/reset-data |
| --- | --- |
| Mô tả | Đưa toàn bộ dữ liệu (6 sân, 4 tài khoản, 5 đơn đặt mẫu) về trạng thái chuẩn ban đầu để chạy lại các bộ kiểm thử tự động. |
| Chức năng liên quan | CON-03 (Hỗ trợ kiểm thử lặp lại deterministic) |
| Vai trò được phép | Tất cả / Admin |
| Headers | Content-Type: application/json |

Response thành công – 200 OK

{

"success": true,

"message": "Đã khôi phục toàn bộ dữ liệu kiểm thử về trạng thái chuẩn ban đầu"

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 500 | Lỗi ghi tệp dữ liệu | { "success": false, "errorCode": "INTERNAL_ERROR", "message": "Lỗi hệ thống nội bộ máy chủ" } |


## 4.14. GET /health – Kiểm tra trạng thái sẵn sàng máy chủ


| Method + URL | GET http://localhost:5001/health |
| --- | --- |
| Mô tả | Kiểm tra trạng thái hoạt động của máy chủ Backend API. |
| Chức năng liên quan | NFR-AVAIL-01 |
| Vai trò được phép | Tất cả (Public) |
| Headers | Không yêu cầu |

Response thành công – 200 OK

{

"status": "ok",

"service": "Badminton Court Booking System API",

"uptime": 125.4,

"timestamp": "2026-10-24T14:15:00.000Z"

}

Response lỗi


| Mã HTTP | Trường hợp | Body mẫu |
| --- | --- | --- |
| 500 | Máy chủ ngừng phản hồi | { "status": "error" } |


# 5. Tài khoản dùng để gọi API


| Vai trò | Tên đăng nhập | Mật khẩu | Ghi chú |
| --- | --- | --- | --- |
| Quản trị viên (ADMIN) | admin@badminton.vn | Admin@123 | Toàn quyền quản trị, xem toàn bộ đơn và hủy điều phối |
| Thành viên (CUSTOMER) | customer1@gmail.com | Customer@123 | Khách hàng A (có sẵn booking mẫu ID 101, 103, 104, 999) |
| Thành viên (CUSTOMER) | customer2@gmail.com | Customer@123 | Khách hàng B (có sẵn booking mẫu ID 102) |
| Thành viên (CUSTOMER) | customer3@gmail.com | Customer@123 | Khách hàng C (dự phòng kiểm thử tải và khóa tài khoản) |
