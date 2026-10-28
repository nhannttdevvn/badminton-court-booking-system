TÀI LIỆU YÊU CẦU NGƯỜI SỬ DỤNG

(User Requirements Document – URD)

HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN (BADMINTON COURT BOOKING SYSTEM)

Phiên bản 3.0

Đơn vị chủ trì: Bộ phận Quản lý Vận hành Sân Cầu lông

Người biên soạn: Nguyễn Nhân (Chủ hệ thống / System Owner)

TP. Hồ Chí Minh, tháng 10, năm 2026


| Biên soạn bởi | Kiểm thử bởi | Duyệt bởi | Phiên bản |
| --- | --- | --- | --- |
| Chủ hệ thống (BA/Dev)<br>Nguyễn Nhân | Tester độc lập (Bạn cặp)<br>Nhóm Kiểm thử Chéo | Giảng viên hướng dẫn<br>Học phần Đánh giá hiệu năng | 3.0 |
| Ngày: 24/10/2026 | Ngày: 28/10/2026 | Ngày: 28/10/2026 | Chính thức |


# Mục lục

1   Giới thiệu

1.1   Mục đích tài liệu

1.2   Phạm vi và đối tượng sử dụng

1.3   Từ điển thuật ngữ

1.4   Ký hiệu sử dụng

1.5   Căn cứ và tài liệu tham khảo

2   Mô tả chung về hệ thống

2.1   Mô tả hệ thống hiện tại

2.2   Hạn chế của hệ thống hiện tại

2.3   Mức độ sử dụng và tăng trưởng giao dịch

2.4   Mục tiêu của hệ thống cần xây dựng

2.5   Khung cảnh dự án

2.6   Ngữ cảnh hệ thống

2.7   Hiệu quả mong đợi

3   Yêu cầu nghiệp vụ chi tiết

3.1   Sơ đồ hoạt động nghiệp vụ tương lai

3.2   Luồng Quản lý tài khoản và Tra cứu lịch sân (Đăng ký, Đăng nhập, Xem sân & Lịch sân)

3.3   Luồng Đặt sân và Hủy đặt sân cầu lông

4   Yêu cầu giao diện và dữ liệu

5   Yêu cầu phi chức năng

6   Bảng tổng hợp các yêu cầu chức năng


# Danh mục hình ảnh, bảng biểu

Hình 3-1: Sơ đồ hoạt động nghiệp vụ tương lai

Bảng 1-1: Từ điển thuật ngữ

Bảng 1-2: Các ký hiệu sử dụng trong tài liệu

Bảng 2-1: Mức độ sử dụng và tăng trưởng giao dịch

Bảng 2-2: Khung cảnh dự án

Bảng 2-3: Ngữ cảnh hệ thống — các hệ thống liên quan

Bảng 3-1: Yêu cầu thông tin của luồng Quản lý tài khoản và Tra cứu lịch sân

Bảng 3-2: Các trạng thái của đối tượng Tài khoản, Sân và Khung giờ

Bảng 3-3: Bảng mã lỗi của luồng Quản lý tài khoản và Tra cứu lịch sân

Bảng 3-4: Yêu cầu thông tin của luồng Đặt sân và Hủy đặt sân

Bảng 3-5: Các trạng thái của đối tượng Đơn đặt sân (Booking)

Bảng 3-6: Bảng mã lỗi của luồng Đặt sân và Hủy đặt sân

Bảng 5-1: Các yêu cầu phi chức năng

Bảng 6-1: Bảng tổng hợp các yêu cầu chức năng


# 1   Giới thiệu


## 1.1   Mục đích tài liệu

Tài liệu Yêu cầu Người sử dụng (User Requirements Document – URD) này mô tả bài toán nghiệp vụ, bối cảnh vận hành, các luồng công việc, yêu cầu thông tin, quy tắc nghiệp vụ và yêu cầu phi chức năng của Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System). Tài liệu làm căn cứ chính thức cho 04 công việc: (1) Phân tích và viết Đặc tả Yêu cầu Phần mềm (SRS v3.0); (2) Thiết kế kiến trúc và lập trình Web + RESTful API; (3) Xây dựng Test Plan, Test Cases (Manual, Postman/Newman, Puppeteer, JMeter) cho Tester kiểm thử độc lập; và (4) Nghiệm thu bàn giao sản phẩm.


## 1.2   Phạm vi và đối tượng sử dụng

Phạm vi nghiệp vụ của hệ thống được giữ tinh gọn và chỉ xoay quanh đúng 05 nhóm chức năng cốt lõi: (1) Đăng ký tài khoản; (2) Đăng nhập hệ thống; (3) Xem danh sách sân và lịch sân trống; (4) Đặt sân cầu lông; (5) Hủy đặt sân. Hệ thống KHÔNG bao gồm thanh toán trực tuyến, khuyến mãi/voucher, tích điểm, phòng chat, đánh giá/review sân, quản lý giải đấu, thuê vợt, đặt đồ ăn hay quản lý nhân sự. Đối tượng sử dụng tài liệu gồm: Chủ hệ thống (BA/Developer), Kiểm thử viên độc lập (Tester bạn cặp) và Giảng viên hướng dẫn.


## 1.3   Từ điển thuật ngữ


| Thuật ngữ | Giải thích |
| --- | --- |
| Time Slot (Khung giờ cố định) | Một ca thuê sân có thời lượng cố định đúng 60 phút. Hệ thống vận hành 16 khung giờ mỗi ngày từ 06:00 đến 22:00 (06:00-07:00, ..., 21:00-22:00). |
| Double Booking (Đặt trùng lịch) | Lỗi nghiêm trọng khi tồn tại từ 02 đơn đặt sân cùng ở trạng thái CONFIRMED cho cùng một sân (courtId), cùng một ngày (bookingDate) và cùng một khung giờ (timeSlot). |
| Court Status (Trạng thái sân) | Trạng thái vận hành của sân cầu lông: ACTIVE (Đang hoạt động, cho phép đặt lịch) hoặc INACTIVE (Đang bảo trì, không cho phép đặt lịch). |
| Booking Status (Trạng thái đơn) | Trạng thái vòng đời của đơn đặt sân: CONFIRMED (Đã xác nhận giữ chỗ) hoặc CANCELLED (Đã hủy, khung giờ được giải phóng về AVAILABLE). |
| Cutoff Time 2 giờ (Mốc chặn hủy) | Quy định nghiệp vụ chỉ cho phép Khách hàng tự hủy đơn khi thời điểm hiện tại cách giờ bắt đầu của khung giờ đặt ít nhất 2 giờ (120 phút). |
| JWT (JSON Web Token) | Chuỗi mã thông báo xác thực định danh người dùng (Customer hoặc Admin) gửi kèm trong HTTP Header Authorization: Bearer <token>. |

Bảng 1-1: Từ điển thuật ngữ


## 1.4   Ký hiệu sử dụng


| Ký hiệu | Ý nghĩa |
| --- | --- |
| M | Mandatory — trường bắt buộc nhập |
| O | Optional — trường không bắt buộc |
| C | Conditional — bắt buộc trong điều kiện được ghi rõ |
| URD-xxx | Mã định danh yêu cầu người sử dụng trong tài liệu URD |

Bảng 1-2: Các ký hiệu sử dụng trong tài liệu


## 1.5   Căn cứ và tài liệu tham khảo

1. Đề cương và Bộ biểu mẫu chuẩn học phần Đánh giá hiệu năng / Kiểm thử phần mềm (Mẫu URD, Mẫu SRS, Mẫu 01–06).
2. Tài liệu ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1 (Kỹ thuật EP, BVA, Decision Table, State Transition).
3. Quy chế vận hành thực tế tại Cụm 06 sân cầu lông tiêu chuẩn (giờ mở cửa 06:00 – 22:00 hàng ngày).


# 2   Mô tả chung về hệ thống


## 2.1   Mô tả hệ thống hiện tại

Hiện nay, cụm 06 sân cầu lông đang quản lý lịch đặt sân hoàn toàn thủ công bằng sổ giấy tại quầy kết hợp tiếp nhận tin nhắn qua Zalo và cuộc gọi điện thoại. Khi người chơi muốn đặt sân, họ phải gọi điện hỏi nhân viên trực quầy xem ngày mai khung giờ mong muốn còn sân trống hay không, sau đó nhân viên dùng bút ghi tên khách vào ô tương ứng trên bảng lịch giấy.


## 2.2   Hạn chế của hệ thống hiện tại

1. Mất thời gian tra cứu lịch (trung bình 5–10 phút/lượt hỏi): Khách hàng không tự xem được bảng lịch trống trực tuyến 24/7.
2. Tỷ lệ đặt trùng lịch (Double Booking) cao (~8% vào khung giờ cao điểm 17:00–21:00): Khi 2 nhân viên cùng nhận tin nhắn Zalo hoặc 2 khách gọi cùng lúc, sổ giấy không cập nhật kịp dẫn đến 2 nhóm khách cùng ra sân.
3. Thất thoát công suất sân (~15% số ca bị bỏ trống do hủy sát giờ): Khách hủy lịch qua tin nhắn nhưng nhân viên quên gạch sổ, khiến khách khác hỏi lại bị báo hết sân.
4. Không kiểm soát được quy định hủy trước 2 giờ và không lưu vết được người tạo/người hủy đơn.


## 2.3   Mức độ sử dụng và tăng trưởng giao dịch


| Chỉ tiêu thống kê | Số liệu thực tế và dự kiến (Project-defined requirement) |
| --- | --- |
| Số giao dịch hiện tại | Trung bình 60 – 96 lượt đặt sân/ngày (6 sân × 16 khung giờ/ngày) và khoảng 400 – 600 lượt xem lịch trống/ngày. |
| Tăng trưởng dự kiến | Tăng 35%/năm; đạt ~1.500 lượt tra cứu lịch/ngày và ~120 giao dịch đặt/hủy mỗi ngày vào mùa giải phong trào. |
| Cao điểm | Khung giờ 17:00 – 21:00 hàng ngày và sáng Thứ Bảy, Chủ Nhật (chiếm 70% tổng lưu lượng truy cập trong ngày). |
| Số người dùng đồng thời tối đa | 100 người dùng đồng thời (Concurrent Users) cùng xem lịch và đặt sân; tải chịu đựng cực đại (Spike/Stress) lên tới 200 người dùng đồng thời. |

Bảng 2-1: Mức độ sử dụng và tăng trưởng giao dịch


## 2.4   Mục tiêu của hệ thống cần xây dựng

1. Cung cấp cổng thông tin Web trực tuyến cho phép người dùng tra cứu danh sách 06 sân và trạng thái 16 khung giờ (06:00–22:00) theo ngày với thời gian phản hồi nhanh (P90 <= 1.000 ms ở mức tải 100 người dùng đồng thời).
2. Tự động hóa quy trình Đăng ký, Đăng nhập, Đặt sân và Hủy đặt sân với cơ chế kiểm tra dữ liệu đầu vào chặt chẽ.
3. Ngăn chặn 100% lỗi đặt trùng sân (Zero Double Booking) ngay cả khi nhiều khách hàng bấm đặt cùng một khung giờ tại cùng một mili-giây.
4. Thực thi tự động quy tắc chỉ cho phép Khách hàng hủy đơn trước giờ bắt đầu tối thiểu 02 giờ, đồng thời giải phóng tức thì khung giờ vừa hủy về trạng thái Còn trống (AVAILABLE).


## 2.5   Khung cảnh dự án


| Giai đoạn | Thời gian | Nội dung chính |
| --- | --- | --- |
| Giai đoạn 1: Phân tích & Đặc tả | Tuần 1 – Tuần 2 | Khảo sát nghiệp vụ sân cầu lông, biên soạn tài liệu URD v3.0, SRS v3.0 và Tài liệu đặc tả API (Mẫu 01). |
| Giai đoạn 2: Xây dựng Baseline & Dữ liệu mẫu | Tuần 3 – Tuần 4 | Phát triển Backend Express API, Frontend React/Vite, thiết lập dữ liệu mẫu cố định (6 sân, 4 tài khoản, 5 đơn mẫu) và kiểm thử nội bộ (Smoke Test) trên nhánh baseline-correct. |
| Giai đoạn 3: Cài đặt Planted Bugs & Bàn giao | Tuần 5 | Cài đặt 15 lỗi có kiểm soát trên nhánh planted-bugs, lập Bug Manifest (Mẫu 02), đóng gói Biên bản bàn giao số 1 (Mẫu 06) để chuyển giao cho Tester độc lập. |
| Giai đoạn 4: Kiểm thử độc lập & Đánh giá hiệu năng | Tuần 6 – Tuần 8 | Tester thực hiện Manual Test, Postman/Newman, Puppeteer UI Test và JMeter Load Test (50/100/200 users), lập báo cáo kiểm thử tổng hợp. |

Bảng 2-2: Khung cảnh dự án


## 2.6   Ngữ cảnh hệ thống


| Hệ thống liên quan | Chiều kết nối | Nội dung trao đổi |
| --- | --- | --- |
| Trình duyệt Web Người dùng (React/Vite SPA) | Hai chiều (HTTP/JSON) | Gửi yêu cầu Đăng ký, Đăng nhập, Tra cứu lịch, Đặt sân, Hủy sân và nhận dữ liệu JSON hiển thị lên giao diện. |
| Dịch vụ Xác thực JWT (Auth Middleware) | Nội bộ (Hai chiều) | Cấp phát mã JWT khi đăng nhập thành công; giải mã và kiểm tra phân quyền (CUSTOMER / ADMIN) trên từng request bảo mật. |
| Cơ sở dữ liệu (Persistent Data Store / MySQL) | Hai chiều (Read/Write) | Lưu trữ bền vững danh sách 6 sân (courts), tài khoản (users), đơn đặt sân (bookings) và khóa giao dịch chống đặt trùng slot. |
| Công cụ Kiểm thử Tự động (Postman, Puppeteer, JMeter) | Hai chiều (HTTP/UI) | Gọi trực tiếp RESTful API (/api/v1/*, /health) và tương tác DOM qua thuộc tính data-testid để xác minh chức năng & hiệu năng. |

Bảng 2-3: Ngữ cảnh hệ thống — các hệ thống liên quan


## 2.7   Hiệu quả mong đợi

1. Giảm thời gian tra cứu và đặt sân của khách hàng từ 5–10 phút xuống dưới 30 giây.
2. Giảm tỷ lệ đặt trùng lịch (Double Booking) từ 8% xuống 0% nhờ khóa giao dịch nguyên tử tại máy chủ.
3. Tối ưu hóa tỷ lệ lấp đầy sân nhờ giải phóng tự động khung giờ ngay khi đơn đặt bị hủy trước 2 giờ.
4. Cung cấp môi trường chuẩn hóa 100% deterministic phục vụ đánh giá hiệu năng và kiểm thử phần mềm tự động.


# 3   Yêu cầu nghiệp vụ chi tiết


## 3.1   Sơ đồ hoạt động nghiệp vụ tương lai


| SƠ ĐỒ HOẠT ĐỘNG NGHIỆP VỤ TƯƠNG LAI – HỆ THỐNG ĐẶT SÂN CẦU LÔNG | SƠ ĐỒ HOẠT ĐỘNG NGHIỆP VỤ TƯƠNG LAI – HỆ THỐNG ĐẶT SÂN CẦU LÔNG | SƠ ĐỒ HOẠT ĐỘNG NGHIỆP VỤ TƯƠNG LAI – HỆ THỐNG ĐẶT SÂN CẦU LÔNG |
| --- | --- | --- |
| Bước 1 (Guest/Customer):<br>Truy cập Web -> Xem danh sách 6 sân & Chọn ngày xem bảng 16 khung giờ (06:00-22:00) | ➔ Bước 2 (Guest/Customer):<br>Đăng ký tài khoản mới hoặc Đăng nhập nhận JWT Token (Khóa 15 phút nếu sai mật khẩu 5 lần) | ➔ Bước 3 (Customer):<br>Chọn Sân ACTIVE + Ngày (>= hôm nay) + Khung giờ AVAILABLE -> Gửi yêu cầu Đặt sân |
| Bước 4 (Hệ thống kiểm tra):<br>- Sân ACTIVE? Ngày hợp lệ?<br>- Slot còn AVAILABLE?<br>- Khóa nguyên tử chống trùng | ➔ Nhánh Thành Công (HTTP 201):<br>Tạo đơn CONFIRMED, cấp mã BK-YYYYMMDD-XXXX, chuyển slot sang BOOKED | ➔ Nhánh Thất Bại (HTTP 400/409):<br>Từ chối nếu Sân INACTIVE, Ngày quá khứ, hoặc Slot đã có người đặt (SLOT_NOT_AVAILABLE) |
| Bước 5 (Customer / Admin):<br>Xem Lịch sử đặt sân -> Gửi yêu cầu Hủy đơn đặt sân đang CONFIRMED | ➔ Nhánh Hủy Hợp Lệ (HTTP 200):<br>Customer hủy trước giờ chơi >= 2 giờ (hoặc Admin hủy điều phối) -> Đơn chuyển sang CANCELLED, slot về AVAILABLE | ➔ Nhánh Từ Chối Hủy (HTTP 400/403):<br>Customer hủy khi còn < 2 giờ (CANCEL_NOT_ALLOWED) hoặc cố tình hủy đơn của người khác (FORBIDDEN) |

Hình 3-1: Sơ đồ hoạt động nghiệp vụ tương lai


## 3.2   Luồng Quản lý tài khoản và Tra cứu lịch sân (Đăng ký, Đăng nhập, Xem sân & Lịch sân)


### 3.2.1   Yêu cầu thông tin (các trường dữ liệu)


| TT | Tên trường (VIE) | Tên trường (ENG) | Định dạng | Bắt buộc | Ghi chú / quy tắc kiểm tra |
| --- | --- | --- | --- | --- | --- |
| 1 | Họ và tên | fullName | String (UTF-8) | M | Độ dài từ 2 đến 50 ký tự sau khi cắt khoảng trắng 2 đầu (trim). Không chứa ký tự điều khiển. Nếu < 2 hoặc > 50 ký tự -> báo lỗi VALIDATION_ERROR. |
| 2 | Địa chỉ Email | email | String (Email) | M | Định dạng chuẩn 로컬@domain, độ dài <= 100 ký tự, không phân biệt hoa thường (case-insensitive). Khi đăng ký phải là duy nhất trong hệ thống; nếu trùng báo lỗi EMAIL_ALREADY_EXISTS. |
| 3 | Mật khẩu | password | String (Password) | M | Độ dài từ 8 đến 20 ký tự (BVA: 7, 8, 20, 21), bắt buộc chứa ít nhất 01 chữ hoa (A-Z), 01 chữ thường (a-z) và 01 chữ số (0-9). |
| 4 | Xác nhận mật khẩu | confirmPassword | String (Password) | M | Bắt buộc trùng khớp hoàn toàn (100% có phân biệt hoa thường) với trường password khi đăng ký. |
| 5 | Mã định danh sân | courtId | Integer | M | Số nguyên dương thuộc danh sách sân hiện có (1..6). Nếu không tồn tại trả về HTTP 404 COURT_NOT_FOUND. |
| 6 | Ngày tra cứu lịch | date | String (YYYY-MM-DD) | O | Định dạng ngày ISO YYYY-MM-DD. Nếu bỏ trống, hệ thống mặc định lấy ngày hiện tại của máy chủ. |

Bảng 3-1: Yêu cầu thông tin của luồng Quản lý tài khoản và Tra cứu lịch sân


### 3.2.2   Trạng thái của đối tượng


| Trạng thái | Mô tả và điều kiện chuyển trạng thái |
| --- | --- |
| Tài khoản: ACTIVE (Hoạt động) | Trạng thái mặc định ngay sau khi đăng ký thành công hoặc khi đăng nhập đúng mật khẩu (failedAttempts < 5). |
| Tài khoản: LOCKED (Tạm khóa) | Chuyển từ ACTIVE sang LOCKED khi người dùng nhập sai mật khẩu liên tiếp từ 05 lần trở lên. Tự động mở khóa sau 15 phút. |
| Sân cầu lông: ACTIVE (Hoạt động) | Sân đủ điều kiện tiêu chuẩn (Sân 1, 2, 3, 4, 5), cho phép khách hàng xem lịch và đặt chỗ. |
| Sân cầu lông: INACTIVE (Bảo trì) | Sân đang tạm ngưng hoạt động để bảo trì (Sân 6), chỉ cho phép xem thông tin nhưng chặn mọi yêu cầu đặt sân. |
| Khung giờ: AVAILABLE (Còn trống) | Khung giờ trong ngày chưa có đơn CONFIRMED nào, hoặc đơn đặt trước đó đã chuyển sang trạng thái CANCELLED. |
| Khung giờ: BOOKED (Đã đặt) | Khung giờ đã có một đơn đặt sân ở trạng thái CONFIRMED gắn với sân và ngày tương ứng. |

Bảng 3-2: Các trạng thái của đối tượng Tài khoản, Sân và Khung giờ


### 3.2.3   Mô tả các chức năng

Chức năng 1: Đăng ký tài khoản thành viên (URD-REG-01, URD-REG-02)
- Mô tả: Cho phép khách vãng lai (Guest) tạo tài khoản khách hàng mới bằng Họ tên, Email và Mật khẩu để sử dụng dịch vụ đặt sân.
- Luồng xử lý: Người dùng mở màn hình Đăng ký -> Nhập fullName, email, password, confirmPassword -> Bấm 'Đăng ký ngay' -> Hệ thống kiểm tra hợp lệ dữ liệu, kiểm tra trùng email, mã hóa mật khẩu bằng bcrypt và lưu tài khoản mới với vai trò mặc định là CUSTOMER.
- Quy tắc nghiệp vụ: (1) Họ tên từ 2–50 ký tự; (2) Email đúng định dạng và chưa từng tồn tại trong hệ thống (không phân biệt hoa thường); (3) Mật khẩu dài từ 8–20 ký tự, có đủ chữ hoa, chữ thường, chữ số và khớp với xác nhận mật khẩu; (4) Mọi tài khoản đăng ký qua cổng public đều gán role = CUSTOMER.

Chức năng 2: Đăng nhập hệ thống (URD-AUTH-01, URD-AUTH-02)
- Mô tả: Xác thực thông tin định danh của Khách hàng và Quản trị viên để cấp phát phiên làm việc bằng JWT Token.
- Luồng xử lý: Người dùng nhập email và password -> Bấm 'Đăng nhập' -> Hệ thống kiểm tra trạng thái khóa tài khoản -> Đối chiếu mật khẩu bcrypt -> Nếu đúng, reset bộ đếm lỗi về 0 và trả về JWT Token kèm thông tin user; nếu sai, tăng bộ đếm failedAttempts.
- Quy tắc nghiệp vụ: (1) Nếu nhập sai mật khẩu 05 lần liên tiếp, tài khoản bị tạm khóa (ACCOUNT_LOCKED) không cho đăng nhập; (2) Mật khẩu không bao giờ được trả về trong gói tin JSON phản hồi.

Chức năng 3: Xem danh sách sân và tra cứu lịch sân trống (URD-COURT-01, URD-COURT-02)
- Mô tả: Công khai danh sách 06 sân cầu lông và bảng trạng thái 16 khung giờ trong ngày (06:00–22:00) cho cả khách vãng lai và thành viên.
- Luồng xử lý: Người dùng truy cập trang chủ để xem 06 thẻ sân (tên sân, loại mặt thảm, giá thuê/giờ, trạng thái ACTIVE/INACTIVE) -> Bấm chọn một sân và chọn ngày cần xem -> Hệ thống đối chiếu các đơn CONFIRMED trong ngày và trả về danh sách đủ 16 khung giờ cố định kèm trạng thái AVAILABLE hoặc BOOKED.
- Quy tắc nghiệp vụ: (1) Luôn hiển thị cố định 16 khung giờ mỗi ngày từ 06:00 đến 22:00 (mỗi ca 60 phút); (2) Sân có trạng thái INACTIVE vẫn hiển thị trong danh sách nhưng phải gắn nhãn 'Bảo trì' rõ ràng.


### 3.2.4   Bảng mã lỗi


| TT | Mã lỗi | Trường hợp phát sinh | Thông báo hiển thị cho người dùng |
| --- | --- | --- | --- |
| 1 | VALIDATION_ERROR | Bỏ trống trường bắt buộc, họ tên ngoài khoảng 2–50 ký tự, email sai định dạng, hoặc mật khẩu < 8 hay > 20 ký tự, thiếu chữ hoa/thường/số, confirmPassword không khớp. | Dữ liệu đầu vào không hợp lệ (chi tiết trường vi phạm) |
| 2 | EMAIL_ALREADY_EXISTS | Đăng ký tài khoản mới bằng địa chỉ email đã tồn tại trong cơ sở dữ liệu. | Email này đã được đăng ký. Vui lòng sử dụng email khác |
| 3 | INVALID_CREDENTIALS | Đăng nhập với email không tồn tại hoặc mật khẩu không chính xác (khi số lần sai < 5). | Email hoặc mật khẩu không chính xác |
| 4 | ACCOUNT_LOCKED | Đăng nhập vào tài khoản đang bị tạm khóa do nhập sai mật khẩu >= 5 lần liên tiếp. | Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau |
| 5 | COURT_NOT_FOUND | Truy vấn chi tiết sân hoặc lịch sân với mã courtId không tồn tại trong hệ thống. | Không tìm thấy thông tin sân cầu lông |

Bảng 3-3: Bảng mã lỗi của luồng Quản lý tài khoản và Tra cứu lịch sân


## 3.3   Luồng Đặt sân và Hủy đặt sân cầu lông


### 3.3.1   Yêu cầu thông tin (các trường dữ liệu)


| TT | Tên trường (VIE) | Tên trường (ENG) | Định dạng | Bắt buộc | Ghi chú / quy tắc kiểm tra |
| --- | --- | --- | --- | --- | --- |
| 1 | Mã sân đặt | courtId | Integer | M | Số nguyên từ 1 đến 6. Sân được chọn bắt buộc phải có trạng thái ACTIVE (Sân 6 đang INACTIVE sẽ bị chặn với lỗi COURT_INACTIVE). |
| 2 | Ngày đặt sân | bookingDate | String (YYYY-MM-DD) | M | Định dạng YYYY-MM-DD. Ngày và giờ bắt đầu của ca đặt bắt buộc phải nằm trong tương lai so với thời điểm hiện tại. Nếu đặt ngày quá khứ -> báo lỗi INVALID_BOOKING_TIME. |
| 3 | Khung giờ đặt | timeSlot | String (HH:mm-HH:mm) | M | Phải thuộc đúng 1 trong 16 khung giờ chuẩn từ 06:00-07:00 đến 21:00-22:00. Khung giờ phải đang ở trạng thái AVAILABLE. |
| 4 | Ghi chú đặt sân | note | String (UTF-8) | O | Ghi chú tùy chọn của khách hàng khi đặt sân (độ dài tối đa 200 ký tự). |
| 5 | Mã đơn đặt sân | bookingId | Integer | C | Bắt buộc truyền trên URL khi thực hiện xem chi tiết đơn hoặc gửi yêu cầu hủy đơn đặt sân. |
| 6 | Lý do hủy sân | cancelReason | String (UTF-8) | O | Lý do khách hàng hoặc Admin hủy đơn đặt sân (tối đa 200 ký tự). |

Bảng 3-4: Yêu cầu thông tin của luồng Đặt sân và Hủy đặt sân


### 3.3.2   Trạng thái của đối tượng


| Trạng thái | Mô tả và điều kiện chuyển trạng thái |
| --- | --- |
| Đơn đặt sân: CONFIRMED (Đã xác nhận) | Trạng thái khởi tạo ngay sau khi khách hàng đặt thành công một khung giờ đang AVAILABLE trên sân ACTIVE. Khung giờ tương ứng chuyển sang BOOKED. |
| Đơn đặt sân: CANCELLED (Đã hủy) | Chuyển từ CONFIRMED sang CANCELLED khi Khách hàng chủ sở hữu hủy trước giờ bắt đầu >= 2 giờ, hoặc khi Admin hủy điều phối. Đơn đã CANCELLED là trạng thái kết thúc, không thể hủy lại lần thứ 2 và không thể khôi phục thành CONFIRMED. |

Bảng 3-5: Các trạng thái của đối tượng Đơn đặt sân (Booking)


### 3.3.3   Mô tả các chức năng

Chức năng 4: Đặt sân cầu lông và Xem lịch sử đặt sân (URD-BOOK-01, URD-BOOK-02, URD-BOOK-03)
- Mô tả: Cho phép Khách hàng đã đăng nhập đặt giữ chỗ một khung giờ còn trống và theo dõi danh sách các đơn đặt sân của mình.
- Luồng xử lý: Khách hàng chọn sân ACTIVE, chọn ngày và bấm vào khung giờ AVAILABLE -> Điền ghi chú (nếu có) và bấm 'Xác nhận đặt' -> Hệ thống kiểm tra JWT Token, kiểm tra ngày/giờ tương lai, kiểm tra trạng thái sân ACTIVE, thiết lập khóa nguyên tử trên tổ hợp [courtId, bookingDate, timeSlot], tạo bản ghi CONFIRMED kèm mã đơn BK-YYYYMMDD-XXXX và tính tiền theo đơn giá 1 giờ của sân.
- Quy tắc nghiệp vụ: (1) Không cho phép đặt sân vào ngày/khung giờ đã qua trong quá khứ (INVALID_BOOKING_TIME); (2) Không cho phép đặt sân đang bảo trì INACTIVE (COURT_INACTIVE); (3) Tại mọi thời điểm, chỉ duy nhất 01 đơn CONFIRMED được tồn tại cho cùng [courtId, bookingDate, timeSlot] — nếu 2 người đặt cùng lúc thì chỉ 1 người thành công (HTTP 201), người còn lại nhận lỗi HTTP 409 SLOT_NOT_AVAILABLE.

Chức năng 5: Hủy đặt sân và Quản trị lịch đặt (URD-CANCEL-01, URD-CANCEL-02, URD-CANCEL-03)
- Mô tả: Cho phép Khách hàng tự hủy đơn đặt sân của mình trước giờ thi đấu tối thiểu 02 giờ, hoặc cho phép Admin xem toàn bộ đơn hệ thống và hủy điều phối.
- Luồng xử lý: Khách hàng mở màn hình 'Lịch sử đặt sân' -> Chọn một đơn đang CONFIRMED -> Bấm 'Hủy đơn' và xác nhận trong hộp thoại -> Hệ thống kiểm tra quyền sở hữu đơn (userId của đơn phải trùng với userId đang đăng nhập), kiểm tra thời gian còn lại trước giờ bắt đầu >= 2 giờ -> Chuyển trạng thái đơn sang CANCELLED và giải phóng khung giờ về AVAILABLE.
- Quy tắc nghiệp vụ: (1) Khách hàng chỉ được hủy đơn của chính mình; nếu cố tình gọi API hủy đơn của người khác phải chặn bằng lỗi HTTP 403 FORBIDDEN; (2) Khách hàng chỉ được hủy khi thời gian hiện tại cách giờ bắt đầu của slot >= 2 giờ (120 phút); nếu < 2 giờ phải chặn bằng lỗi HTTP 400 CANCEL_NOT_ALLOWED; (3) Admin có quyền xem toàn bộ đơn và hủy bất kỳ đơn CONFIRMED nào để điều phối sân; (4) Không cho phép hủy lại một đơn đã ở trạng thái CANCELLED.


### 3.3.4   Bảng mã lỗi


| TT | Mã lỗi | Trường hợp phát sinh | Thông báo hiển thị cho người dùng |
| --- | --- | --- | --- |
| 1 | UNAUTHORIZED | Người dùng chưa đăng nhập hoặc gửi JWT Token không hợp lệ / hết hạn khi gọi API Đặt sân, Xem lịch sử hoặc Hủy sân. | Vui lòng đăng nhập để tiếp tục thực hiện chức năng này |
| 2 | FORBIDDEN | Khách hàng (CUSTOMER) cố tình xem/hủy đơn đặt sân của khách hàng khác hoặc truy cập API dành riêng cho Admin. | Bạn không có quyền thực hiện thao tác này |
| 3 | INVALID_BOOKING_TIME | Khách hàng chọn ngày đặt sân trong quá khứ hoặc khung giờ đã trôi qua so với thời điểm hiện tại. | Không thể đặt sân cho ngày hoặc khung giờ trong quá khứ |
| 4 | COURT_INACTIVE | Khách hàng gửi yêu cầu đặt sân đối với sân đang tạm ngưng hoạt động để bảo trì (status = INACTIVE). | Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác |
| 5 | SLOT_NOT_AVAILABLE | Khung giờ được chọn đã có đơn đặt CONFIRMED của người khác hoặc bị chiếm bởi giao dịch đồng thời trước đó. | Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác |
| 6 | BOOKING_NOT_FOUND | Truy vấn hoặc yêu cầu hủy một mã đơn đặt sân (bookingId) không tồn tại trong hệ thống. | Không tìm thấy đơn đặt sân trên hệ thống |
| 7 | CANCEL_NOT_ALLOWED | Khách hàng yêu cầu hủy đơn khi thời gian còn lại trước giờ bắt đầu < 2 giờ, hoặc đơn đặt sân đó đã ở trạng thái CANCELLED. | Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ |

Bảng 3-6: Bảng mã lỗi của luồng Đặt sân và Hủy đặt sân


# 4   Yêu cầu giao diện và dữ liệu

1. Yêu cầu giao diện người dùng (UI/UX):
- Ngôn ngữ hiển thị: Tiếng Việt thống nhất, rõ ràng trên toàn bộ 05 màn hình (Đăng ký, Đăng nhập, Danh sách sân, Chi tiết lịch sân & Đặt sân, Lịch sử đặt sân & Quản trị).
- Tính thích ứng (Responsive Design): Giao diện chính và các hộp thoại modal phải hiển thị đầy đủ nội dung, nút bấm và không được phát sinh thanh cuộn ngang toàn trang ngoài ý muốn tại 03 độ phân giải tiêu chuẩn: Mobile (360px), Tablet (768px) và Desktop (1440px).
- Hỗ trợ Kiểm thử Tự động (Automation-ready): Tất cả các ô nhập liệu, nút bấm, thông báo lỗi và dòng dữ liệu phải gắn thuộc tính định danh ổn định data-testid.

2. Yêu cầu dữ liệu khởi tạo cố định (Deterministic Seed Data):
- Danh sách 06 sân cầu lông: Sân 1 & Sân 2 (Thảm Enlio Tiêu Chuẩn – 120.000đ/giờ – ACTIVE); Sân 3 & Sân 4 (Thảm Yonex Thi Đấu – 150.000đ/giờ – ACTIVE); Sân 5 (Thảm Alite Phong Trào – 100.000đ/giờ – ACTIVE); Sân 6 (Thảm Alite Phong Trào – 100.000đ/giờ – INACTIVE).
- Danh sách 04 tài khoản kiểm thử: 01 Admin (admin@badminton.vn / Admin@123) và 03 Customer (customer1@gmail.com, customer2@gmail.com, customer3@gmail.com / mật khẩu chung Customer@123).
- Danh sách 05 đơn đặt sân mẫu: BK-SAMPLE-01 (ID 101), BK-SAMPLE-02 (ID 102), BK-SAMPLE-03 (ID 103), BK-SAMPLE-04 (ID 104 - đã hủy), BK-SPECIAL-999 (ID 999).


# 5   Yêu cầu phi chức năng


| Nhóm yêu cầu | Nội dung |
| --- | --- |
| Hiệu năng | 1. Thời gian phản hồi trung bình của các API nghiệp vụ thông thường đạt <= 500 ms ở điều kiện tải chuẩn 50 người dùng đồng thời.<br>2. Ở mức tải cao điểm 100 người dùng đồng thời (Concurrent Users), thời gian phản hồi phân vị 90 (P90) của API tra cứu lịch sân trống (GET /api/v1/courts/{id}/availability) phải đạt <= 1.000 ms (1 giây) và các API Đặt/Hủy sân đạt P95 <= 1.500 ms.<br>3. Tỷ lệ lỗi hệ thống (HTTP 5xx) dưới tải 100 người dùng đồng thời phải bằng 0%. |
| Khả dụng | Hệ thống hoạt động liên tục 24/7 phục vụ tra cứu và đặt lịch, cung cấp endpoint kiểm tra sức khỏe máy chủ (GET /health) phản hồi HTTP 200 OK trong vòng < 200 ms. |
| Bảo mật | 1. Mật khẩu người dùng bắt buộc băm một chiều bằng thuật toán bcrypt (salt rounds = 10), tuyệt đối không lưu hoặc trả về dạng rõ (plaintext).<br>2. Xác thực API bằng JWT Bearer Token và kiểm soát phân quyền chặt chẽ ở cấp độ bản ghi (chống lỗ hổng IDOR khi xem/hủy đơn đặt sân).<br>3. Tạm khóa tài khoản khi đăng nhập sai mật khẩu từ 05 lần liên tiếp. |
| Tương thích | Hoạt động ổn định trên các trình duyệt hiện đại (Google Chrome, Microsoft Edge, Firefox, Safari) và hiển thị chuẩn bố cục ở 3 kích thước khung nhìn 360px, 768px, 1440px. |
| Sao lưu | Dữ liệu được lưu trữ bền vững vào tệp cơ sở dữ liệu (database.json / MySQL) ngay sau mỗi giao dịch tạo hoặc hủy đơn, kèm cơ chế khôi phục nhanh toàn bộ dữ liệu gốc qua API POST /api/v1/admin/reset-data. |

Bảng 5-1: Các yêu cầu phi chức năng


# 6   Bảng tổng hợp các yêu cầu chức năng


| Mã YC | Tên yêu cầu | Mô tả ngắn | Ưu tiên |
| --- | --- | --- | --- |
| URD-REG-01 | Đăng ký tài khoản khách hàng mới | Cho phép khách vãng lai đăng ký tài khoản mới với Họ tên, Email, Mật khẩu và Xác nhận mật khẩu hợp lệ. | Cao (High) |
| URD-REG-02 | Kiểm tra trùng lặp Email đăng ký | Từ chối đăng ký và thông báo lỗi nếu địa chỉ Email đã tồn tại trong hệ thống. | Cao (High) |
| URD-AUTH-01 | Đăng nhập hệ thống bằng Email & Mật khẩu | Xác thực thông tin đăng nhập của Customer/Admin và cấp phát mã JWT Token. | Cao (High) |
| URD-AUTH-02 | Bảo vệ tài khoản khi đăng nhập sai nhiều lần | Tự động khóa tạm thời tài khoản nếu người dùng nhập sai mật khẩu liên tiếp từ 05 lần trở lên. | Trung bình (Medium) |
| URD-COURT-01 | Xem danh sách sân và chi tiết sân cầu lông | Hiển thị danh sách 06 sân cầu lông kèm loại thảm, giá thuê/giờ và trạng thái hoạt động (ACTIVE/INACTIVE). | Cao (High) |
| URD-COURT-02 | Tra cứu lịch sân trống theo ngày (16 khung giờ) | Hiển thị trạng thái AVAILABLE / BOOKED của 16 khung giờ cố định (06:00–22:00) theo sân và ngày được chọn. | Cao (High) |
| URD-BOOK-01 | Đặt sân cầu lông theo khung giờ trống | Cho phép Customer đã đăng nhập đặt một khung giờ AVAILABLE trên sân ACTIVE cho ngày/giờ trong tương lai. | Cao (High) |
| URD-BOOK-02 | Chống đặt trùng lịch (Zero Double Booking) | Bảo đảm tại mọi thời điểm chỉ có tối đa 01 đơn CONFIRMED cho cùng một sân, cùng ngày và cùng khung giờ. | Cao (High) |
| URD-BOOK-03 | Xem lịch sử đặt sân cá nhân | Cho phép Customer xem danh sách và trạng thái các đơn đặt sân của chính mình. | Trung bình (Medium) |
| URD-CANCEL-01 | Khách hàng hủy đơn đặt sân hợp lệ (trước >= 2 giờ) | Cho phép Customer hủy đơn CONFIRMED của chính mình khi thời gian còn lại trước giờ bắt đầu >= 2 giờ. | Cao (High) |
| URD-CANCEL-02 | Chặn hủy đơn sát giờ (< 2 giờ) hoặc hủy đơn người khác | Từ chối yêu cầu hủy nếu còn < 2 giờ trước giờ chơi hoặc nếu Customer cố tình hủy đơn của người khác. | Cao (High) |
| URD-CANCEL-03 | Quản trị viên xem toàn bộ đơn và hủy điều phối | Cho phép Admin xem toàn bộ danh sách đặt sân của hệ thống và hủy đơn điều phối tại quầy. | Trung bình (Medium) |

Bảng 6-1: Bảng tổng hợp các yêu cầu chức năng
