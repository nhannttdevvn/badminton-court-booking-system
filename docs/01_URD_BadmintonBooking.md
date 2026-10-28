TÀI LIỆU YÊU CẦU NGƯỜI SỬ DỤNG

(User Requirements Document – URD)

HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
(BADMINTON COURT BOOKING SYSTEM)

Phiên bản 3.0

Đơn vị chủ trì: Bộ phận Quản lý Vận hành Sân Cầu lông

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

1.1   Mục đích tài liệu	4

1.2   Phạm vi và đối tượng sử dụng	4

1.3   Từ điển thuật ngữ	4

1.4   Ký hiệu sử dụng	4

1.5   Căn cứ và tài liệu tham khảo	4

2   Mô tả chung về hệ thống	5

2.1   Mô tả hệ thống hiện tại	5

2.2   Hạn chế của hệ thống hiện tại	5

2.3   Mức độ sử dụng và tăng trưởng giao dịch	5

2.4   Mục tiêu của hệ thống cần xây dựng	5

2.5   Khung cảnh dự án	5

2.6   Ngữ cảnh hệ thống	5

2.7   Hiệu quả mong đợi	6

3   Yêu cầu nghiệp vụ chi tiết	7

3.1   Sơ đồ hoạt động nghiệp vụ tương lai	7

3.2   Luồng Quản lý tài khoản và Tra cứu lịch sân	7

3.2.1   Yêu cầu thông tin (các trường dữ liệu)	7

3.2.2   Trạng thái của đối tượng	8

3.2.3   Mô tả các chức năng	8

3.2.4   Bảng mã lỗi	8

3.3   Luồng Đặt sân và Hủy đặt sân cầu lông	9

4   Yêu cầu giao diện và dữ liệu	10

5   Yêu cầu phi chức năng	10

6   Bảng tổng hợp các yêu cầu chức năng	10

Danh mục hình ảnh, bảng biểu

Hình 3-1: Sơ đồ hoạt động nghiệp vụ tương lai	7

Bảng 1-1: Từ điển thuật ngữ	4

Bảng 1-2: Các ký hiệu sử dụng trong tài liệu	4

Bảng 2-1: Mức độ sử dụng và tăng trưởng giao dịch	5

Bảng 2-2: Khung cảnh dự án	5

Bảng 2-3: Ngữ cảnh hệ thống — các hệ thống liên quan	6

Bảng 3-1: Yêu cầu thông tin của luồng nghiệp vụ	7

Bảng 3-2: Các trạng thái của đối tượng	8

Bảng 3-3: Bảng mã lỗi của luồng nghiệp vụ	8

Bảng 5-1: Các yêu cầu phi chức năng	10

Bảng 6-1: Bảng tổng hợp các yêu cầu chức năng	10


# 1   Giới thiệu


## 1.1   Mục đích tài liệu

Tài liệu Yêu cầu Người sử dụng (User Requirements Document – URD) này mô tả toàn bộ yêu cầu nghiệp vụ của Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System), bao gồm 05 nhóm chức năng cốt lõi: Đăng ký tài khoản, Đăng nhập hệ thống, Xem danh sách sân và lịch sân trống, Đặt sân cầu lông và Hủy đặt sân.

Tài liệu là căn cứ chính thức để: (1) Phân tích và xây dựng Đặc tả Yêu cầu Phần mềm (SRS v3.0); (2) Thiết kế và lập trình ứng dụng Web + RESTful API; (3) Đội ngũ Kiểm thử độc lập (Tester bạn cặp) xây dựng Test Plan, Test Cases (Manual, Postman, Puppeteer, JMeter); và (4) Nghiệm thu bàn giao sản phẩm.


## 1.2   Phạm vi và đối tượng sử dụng

Phạm vi: Hệ thống quản lý đặt lịch trực tuyến cho cụm 06 sân cầu lông (Sân 1 đến Sân 6) trong khung giờ hoạt động cố định từ 06:00 đến 22:00 hàng ngày (16 khung giờ, mỗi khung giờ 60 phút). Không bao gồm thanh toán trực tuyến, mã giảm giá/voucher, tích điểm, chat, đánh giá sân hay quản lý giải đấu.

Đối tượng sử dụng: Chủ hệ thống (System Owner / Quản trị viên vận hành sân), Kiểm thử viên độc lập (Tester thực hiện kiểm thử chéo) và Giảng viên hướng dẫn học phần Đánh giá hiệu năng.


## 1.3   Từ điển thuật ngữ


| Thuật ngữ | Giải thích |
| --- | --- |
| Time Slot (Khung giờ cố định) | Một ca thuê sân có thời lượng đúng 60 phút. Hệ thống có 16 khung giờ cố định mỗi ngày từ 06:00 đến 22:00 (06:00-07:00, ..., 21:00-22:00). |
| Double Booking (Đặt trùng lịch) | Lỗi nghiêm trọng khi tồn tại từ 02 đơn đặt sân cùng ở trạng thái CONFIRMED cho cùng một sân (courtId), cùng ngày (bookingDate) và cùng khung giờ (timeSlot). |
| Court Status (Trạng thái sân) | Trạng thái vận hành của sân: ACTIVE (Đang hoạt động, cho phép đặt lịch) hoặc INACTIVE (Đang bảo trì, không cho phép đặt lịch). |
| Booking Status (Trạng thái đơn) | Trạng thái vòng đời của đơn đặt sân: CONFIRMED (Đã xác nhận giữ chỗ) hoặc CANCELLED (Đã hủy, khung giờ được giải phóng về AVAILABLE). |
| Cutoff Time 2 giờ (Mốc chặn hủy) | Quy định nghiệp vụ chỉ cho phép Khách hàng tự hủy đơn khi thời điểm hiện tại cách giờ bắt đầu của khung giờ đặt ít nhất 02 giờ (120 phút). |
| JWT (JSON Web Token) | Chuỗi mã thông báo xác thực định danh người dùng (Customer hoặc Admin) gửi kèm trong HTTP Header Authorization: Bearer <token>. |

Bảng 1-1: Từ điển thuật ngữ


## 1.4   Ký hiệu sử dụng


| Ký hiệu | Ý nghĩa |
| --- | --- |
| M | Mandatory — trường bắt buộc nhập |
| O | Optional — trường không bắt buộc |
| C | Conditional — bắt buộc trong điều kiện được ghi rõ |
| URD-xxx | Mã định danh yêu cầu nghiệp vụ người dùng trong tài liệu URD |

Bảng 1-2: Các ký hiệu sử dụng trong tài liệu


## 1.5   Căn cứ và tài liệu tham khảo

1. Đề cương và Bộ biểu mẫu chuẩn học phần Đánh giá hiệu năng / Kiểm thử phần mềm (Mẫu URD, Mẫu SRS, Mẫu 01–06).
2. Tài liệu ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1.
3. Quy chế vận hành đặt lịch tại cụm 06 sân cầu lông tiêu chuẩn (khung giờ mở cửa 06:00 – 22:00 hàng ngày).


# 2   Mô tả chung về hệ thống


## 2.1   Mô tả hệ thống hiện tại

Hiện nay, cơ sở 06 sân cầu lông đang tiếp nhận và quản lý lịch đặt sân hoàn toàn thủ công thông qua sổ sách giấy tại quầy kết hợp tin nhắn Zalo và điện thoại.

Khi khách hàng muốn đặt sân, khách phải nhắn tin hoặc gọi điện hỏi nhân viên xem ngày và khung giờ mong muốn còn sân trống hay không, sau đó nhân viên tra sổ giấy và ghi tay tên khách vào ô giờ tương ứng.


## 2.2   Hạn chế của hệ thống hiện tại

1. Thời gian phản hồi tra cứu lịch chậm (trung bình 5 – 10 phút/lượt hỏi): Khách hàng không thể tự xem bảng lịch trống trực tuyến 24/7.
2. Tỷ lệ đặt trùng lịch (Double Booking) cao (~8% vào khung giờ cao điểm 17:00 – 21:00): Khi nhiều khách cùng hỏi đặt một khung giờ qua điện thoại và Zalo, nhân viên ghi sổ không đồng bộ kịp dẫn đến 2 nhóm khách cùng ra sân.

3. Lãng phí công suất sân (~15% ca bị bỏ trống do hủy sát giờ): Khách báo hủy qua tin nhắn nhưng sổ giấy chưa gạch kịp khiến khách khác hỏi bị báo hết sân.
4. Không kiểm soát tự động được quy định hủy trước 02 giờ và khó đối soát lịch sử người đặt / người hủy.


## 2.3   Mức độ sử dụng và tăng trưởng giao dịch


| Số giao dịch hiện tại | Trung bình 60 – 96 lượt đặt sân/ngày (6 sân × 16 khung giờ/ngày) và 400 – 600 lượt xem lịch trống/ngày. |
| --- | --- |
| Tăng trưởng dự kiến | Tăng 35%/năm; dự kiến đạt ~1.500 lượt tra cứu lịch/ngày và ~120 giao dịch đặt/hủy mỗi ngày. |
| Cao điểm | Khung giờ 17:00 – 21:00 hàng ngày và cuối tuần Thứ Bảy, Chủ Nhật (chiếm 70% lưu lượng trong ngày). |
| Số người dùng đồng thời tối đa | 100 người dùng đồng thời (Concurrent Users) ở mức tải cao điểm; tải cực đại (Stress) 200 người dùng đồng thời. |

Bảng 2-1: Mức độ sử dụng và tăng trưởng giao dịch


## 2.4   Mục tiêu của hệ thống cần xây dựng

1. Xây dựng hệ thống Web cho phép khách hàng xem danh sách 06 sân và tra cứu lịch trống 16 khung giờ theo ngày với thời gian phản hồi P90 <= 1.000 ms ở mức tải 100 người dùng đồng thời.
2. Chuẩn hóa quy trình Đăng ký, Đăng nhập, Đặt sân và Hủy đặt sân trực tuyến 24/7.

3. Loại bỏ 100% tình trạng đặt trùng lịch (Zero Double Booking) bằng cơ chế khóa nguyên tử khi xử lý các yêu cầu đặt sân đồng thời.
4. Thực thi tự động quy tắc chỉ cho phép Khách hàng hủy đơn trước giờ bắt đầu tối thiểu 02 giờ và giải phóng tức thì khung giờ vừa hủy về trạng thái AVAILABLE.


## 2.5   Khung cảnh dự án


| Giai đoạn | Thời gian | Nội dung chính |
| --- | --- | --- |
| Giai đoạn 1: Phân tích & Đặc tả | Tuần 1 – Tuần 2 | Khảo sát nghiệp vụ đặt sân cầu lông, hoàn thiện tài liệu URD v3.0, SRS v3.0 và Tài liệu API (Mẫu 01). |
| Giai đoạn 2: Xây dựng Baseline | Tuần 3 – Tuần 4 | Phát triển Backend Express API, Frontend React/Vite, khởi tạo dữ liệu mẫu cố định (6 sân, 4 tài khoản, 5 đơn mẫu) trên nhánh baseline-correct. |
| Giai đoạn 3: Cài đặt Lỗi & Bàn giao | Tuần 5 | Cài đặt 15 lỗi có kiểm soát trên nhánh planted-bugs, lập Bug Manifest (Mẫu 02) và Biên bản bàn giao số 1 (Mẫu 06). |
| Giai đoạn 4: Kiểm thử & Đánh giá hiệu năng | Tuần 6 – Tuần 8 | Thực hiện Manual Test, Postman/Newman, Puppeteer UI Test và JMeter Load Test (50/100/200 users). |

Bảng 2-2: Khung cảnh dự án


## 2.6   Ngữ cảnh hệ thống


| Hệ thống liên quan | Chiều kết nối | Nội dung trao đổi |
| --- | --- | --- |
| Trình duyệt Web Người dùng (React/Vite SPA) | Hai chiều (HTTP/JSON) | Gửi yêu cầu Đăng ký, Đăng nhập, Xem lịch, Đặt sân, Hủy sân và nhận phản hồi JSON hiển thị lên giao diện. |
| Dịch vụ Xác thực JWT (Auth Middleware) | Nội bộ (Hai chiều) | Cấp phát JWT Token khi đăng nhập; xác thực và kiểm tra phân quyền (CUSTOMER / ADMIN) trên từng request. |
| Cơ sở dữ liệu (Persistent Data Store / MySQL) | Hai chiều (Read/Write) | Lưu trữ bền vững danh sách 6 sân (courts), tài khoản (users), đơn đặt sân (bookings) và khóa chống đặt trùng slot. |
| Công cụ Kiểm thử (Postman, Puppeteer, JMeter) | Hai chiều (HTTP/UI) | Gọi trực tiếp RESTful API (/api/v1/*, /health) và tương tác DOM qua data-testid để kiểm thử chức năng và hiệu năng. |

Bảng 2-3: Ngữ cảnh hệ thống — các hệ thống liên quan


## 2.7   Hiệu quả mong đợi

1. Rút ngắn thời gian tra cứu và đặt sân từ 5 – 10 phút xuống dưới 30 giây/giao dịch.
2. Giảm tỷ lệ đặt trùng lịch (Double Booking) từ 8% xuống 0%.
3. Tự động mở lại khung giờ vừa hủy ngay lập tức giúp tăng hiệu suất khai thác sân thêm 15%.


# 3   Yêu cầu nghiệp vụ chi tiết


## 3.1   Sơ đồ hoạt động nghiệp vụ tương lai

Hình 3-1: Sơ đồ hoạt động nghiệp vụ tương lai


## 3.2   Luồng Quản lý tài khoản và Tra cứu lịch sân


### 3.2.1   Yêu cầu thông tin (các trường dữ liệu)


| TT | Tên trường (VIE) | Tên trường (ENG) | Định dạng | Bắt buộc | Ghi chú / quy tắc kiểm tra |
| --- | --- | --- | --- | --- | --- |
| 1 | Họ và tên | fullName | String (UTF-8) | M | Độ dài từ 2 đến 50 ký tự sau khi cắt khoảng trắng 2 đầu (trim). Nếu < 2 hoặc > 50 ký tự báo lỗi VALIDATION_ERROR. |
| 2 | Địa chỉ Email | email | String (Email) | M | Định dạng chuẩn email, <= 100 ký tự, không phân biệt hoa thường. Phải là duy nhất khi đăng ký; nếu trùng báo lỗi EMAIL_ALREADY_EXISTS. |
| 3 | Mật khẩu | password | String (Password) | M | Độ dài từ 8 đến 20 ký tự (BVA: 7, 8, 20, 21), bắt buộc chứa ít nhất 01 chữ hoa, 01 chữ thường và 01 chữ số. |
| 4 | Xác nhận mật khẩu | confirmPassword | String (Password) | M | Bắt buộc trùng khớp hoàn toàn (100% có phân biệt hoa thường) với trường password. |
| 5 | Mã định danh sân | courtId | Integer | M | Số nguyên dương từ 1 đến 6. Nếu không tồn tại trả về HTTP 404 COURT_NOT_FOUND. |
| 6 | Ngày tra cứu lịch | date | String (YYYY-MM-DD) | O | Định dạng ngày ISO YYYY-MM-DD. Nếu bỏ trống mặc định lấy ngày hiện tại. |

Bảng 3-1: Yêu cầu thông tin của luồng Quản lý tài khoản và Tra cứu lịch sân


### 3.2.2   Trạng thái của đối tượng


| Trạng thái | Mô tả và điều kiện chuyển trạng thái |
| --- | --- |
| Tài khoản: ACTIVE (Hoạt động) | Trạng thái mặc định sau khi đăng ký thành công hoặc khi đăng nhập đúng mật khẩu (failedAttempts < 5). |
| Tài khoản: LOCKED (Tạm khóa) | Chuyển từ ACTIVE sang LOCKED khi người dùng nhập sai mật khẩu liên tiếp từ 05 lần trở lên. |
| Sân cầu lông: ACTIVE (Hoạt động) | Sân đủ điều kiện tiêu chuẩn (Sân 1, 2, 3, 4, 5), cho phép khách hàng xem lịch và đặt chỗ. |
| Sân cầu lông: INACTIVE (Bảo trì) | Sân đang tạm ngưng để bảo trì (Sân 6), chỉ cho phép xem thông tin nhưng chặn mọi yêu cầu đặt sân. |
| Khung giờ: AVAILABLE (Còn trống) | Khung giờ trong ngày chưa có đơn CONFIRMED nào, hoặc đơn đặt trước đó đã chuyển sang trạng thái CANCELLED. |
| Khung giờ: BOOKED (Đã đặt) | Khung giờ đã có một đơn đặt sân ở trạng thái CONFIRMED gắn với sân và ngày tương ứng. |

Bảng 3-2: Các trạng thái của đối tượng Tài khoản, Sân và Khung giờ


### 3.2.3   Mô tả các chức năng

Chức năng 1: Đăng ký và Đăng nhập tài khoản thành viên (URD-REG-01..02, URD-AUTH-01..02)

Mô tả: Cho phép khách vãng lai tạo tài khoản mới (role = CUSTOMER) và đăng nhập xác thực nhận JWT Token.

Luồng xử lý: Người dùng nhập fullName, email, password, confirmPassword để đăng ký (HTTP 201) -> Sau đó nhập email, password để đăng nhập nhận JWT Token có hạn 24 giờ (HTTP 200).

Quy tắc nghiệp vụ: Email đăng ký phải duy nhất (case-insensitive); mật khẩu dài 8–20 ký tự gồm chữ hoa, chữ thường, chữ số; nhập sai mật khẩu liên tiếp >= 5 lần sẽ bị khóa tạm thời (ACCOUNT_LOCKED).

Chức năng 2: Xem danh sách sân và Tra cứu lịch sân trống (URD-COURT-01, URD-COURT-02)

Mô tả: Công khai danh sách 06 sân cầu lông và bảng trạng thái 16 khung giờ cố định (06:00–22:00) theo ngày.

Luồng xử lý: Người dùng mở trang Danh sách sân xem 06 sân -> Chọn 1 sân và chọn ngày cần xem -> Hệ thống đối chiếu các đơn CONFIRMED trong ngày và trả về 16 khung giờ kèm trạng thái AVAILABLE hoặc BOOKED.

Quy tắc nghiệp vụ: Luôn hiển thị cố định đủ 16 khung giờ (mỗi ca 60 phút từ 06:00 đến 22:00); sân có trạng thái INACTIVE (Sân 6) phải hiển thị rõ nhãn 'Bảo trì'.


### 3.2.4   Bảng mã lỗi


| TT | Mã lỗi | Trường hợp phát sinh | Thông báo hiển thị cho người dùng |
| --- | --- | --- | --- |
| 1 | VALIDATION_ERROR | Bỏ trống trường bắt buộc, họ tên ngoài khoảng 2–50 ký tự, email sai định dạng, mật khẩu < 8 hoặc > 20 ký tự, thiếu chữ hoa/thường/số, hoặc confirmPassword không khớp. | Dữ liệu đầu vào không hợp lệ (nêu rõ trường vi phạm) |
| 2 | EMAIL_ALREADY_EXISTS | Đăng ký tài khoản mới bằng địa chỉ email đã tồn tại trong cơ sở dữ liệu. | Email này đã được đăng ký. Vui lòng sử dụng email khác |
| 3 | INVALID_CREDENTIALS | Đăng nhập với email không tồn tại hoặc mật khẩu không chính xác (khi số lần sai < 5). | Email hoặc mật khẩu không chính xác |
| 4 | ACCOUNT_LOCKED | Đăng nhập vào tài khoản đang bị tạm khóa do nhập sai mật khẩu >= 5 lần liên tiếp. | Tài khoản đã bị tạm khóa do nhập sai mật khẩu quá 5 lần. Vui lòng thử lại sau |
| 5 | COURT_NOT_FOUND | Truy vấn chi tiết sân hoặc lịch sân với mã courtId không tồn tại trong hệ thống. | Không tìm thấy thông tin sân cầu lông |

Bảng 3-3: Bảng mã lỗi của luồng Quản lý tài khoản và Tra cứu lịch sân


## 3.3   Luồng Đặt sân và Hủy đặt sân cầu lông


### 3.3.1   Yêu cầu thông tin (các trường dữ liệu)


| TT | Tên trường (VIE) | Tên trường (ENG) | Định dạng | Bắt buộc | Ghi chú / quy tắc kiểm tra |
| --- | --- | --- | --- | --- | --- |
| 1 | Mã sân đặt | courtId | Integer | M | Số nguyên từ 1 đến 6. Sân được chọn bắt buộc phải có trạng thái ACTIVE (nếu INACTIVE báo lỗi COURT_INACTIVE). |
| 2 | Ngày đặt sân | bookingDate | String (YYYY-MM-DD) | M | Định dạng YYYY-MM-DD. Ngày và giờ bắt đầu phải nằm trong tương lai so với hiện tại (nếu ngày quá khứ báo lỗi INVALID_BOOKING_TIME). |
| 3 | Khung giờ đặt | timeSlot | String (HH:mm-HH:mm) | M | Thuộc đúng 1 trong 16 khung giờ chuẩn từ 06:00-07:00 đến 21:00-22:00 và đang ở trạng thái AVAILABLE. |
| 4 | Ghi chú đặt sân | note | String (UTF-8) | O | Ghi chú tùy chọn của khách hàng khi đặt sân (độ dài tối đa 200 ký tự). |
| 5 | Mã đơn đặt sân | bookingId | Integer | C | Bắt buộc truyền trên URL khi xem chi tiết đơn hoặc gửi yêu cầu hủy đơn đặt sân. |
| 6 | Lý do hủy sân | cancelReason | String (UTF-8) | O | Lý do khách hàng hoặc Admin hủy đơn đặt sân (tối đa 200 ký tự). |

Bảng 3-4: Yêu cầu thông tin của luồng Đặt sân và Hủy đặt sân


### 3.3.2   Trạng thái của đối tượng


| Trạng thái | Mô tả và điều kiện chuyển trạng thái |
| --- | --- |
| Đơn đặt sân: CONFIRMED (Đã xác nhận) | Trạng thái khởi tạo ngay sau khi khách hàng đặt thành công một khung giờ AVAILABLE trên sân ACTIVE. Khung giờ tương ứng chuyển sang BOOKED. |
| Đơn đặt sân: CANCELLED (Đã hủy) | Chuyển từ CONFIRMED sang CANCELLED khi Khách hàng chủ sở hữu hủy trước giờ bắt đầu >= 2 giờ, hoặc khi Admin hủy điều phối. Đơn đã CANCELLED không thể hủy lại lần thứ 2. |

Bảng 3-5: Các trạng thái của đối tượng Đơn đặt sân (Booking)


### 3.3.3   Mô tả các chức năng

Chức năng 1: Đặt sân cầu lông và Xem lịch sử đặt sân (URD-BOOK-01..03)

Mô tả: Cho phép Khách hàng đã đăng nhập đặt giữ chỗ một khung giờ còn trống và xem danh sách lịch sử đặt sân cá nhân.

Luồng xử lý: Khách hàng chọn sân ACTIVE, chọn ngày và khung giờ AVAILABLE -> Nhập ghi chú và bấm 'Xác nhận đặt' -> Hệ thống kiểm tra ngày tương lai, khóa nguyên tử [courtId, bookingDate, timeSlot], tạo đơn CONFIRMED kèm mã BK-YYYYMMDD-XXXX (HTTP 201).

Quy tắc nghiệp vụ: Chặn đặt ngày quá khứ (INVALID_BOOKING_TIME) và sân bảo trì (COURT_INACTIVE); chống đặt trùng lịch tuyệt đối (Zero Double Booking) — nếu 2 request đặt cùng lúc vào 1 slot thì chỉ 1 thành công (201), request còn lại nhận HTTP 409 SLOT_NOT_AVAILABLE.

Chức năng 2: Hủy đặt sân và Quản trị lịch đặt (URD-CANCEL-01..03)

Mô tả: Cho phép Khách hàng tự hủy đơn của mình trước giờ thi đấu tối thiểu 02 giờ; cho phép Admin xem toàn bộ đơn hệ thống và hủy điều phối.

Luồng xử lý: Khách hàng mở 'Lịch sử đặt sân' -> Chọn đơn CONFIRMED -> Bấm 'Hủy đơn' và 'Đồng ý hủy' -> Hệ thống kiểm tra quyền sở hữu và thời gian còn lại >= 2 giờ -> Chuyển đơn sang CANCELLED và giải phóng slot về AVAILABLE (HTTP 200).

Quy tắc nghiệp vụ: Khách hàng chỉ được hủy đơn của chính mình (nếu hủy đơn người khác trả về HTTP 403 FORBIDDEN) và phải hủy trước giờ bắt đầu >= 2 giờ (nếu < 2 giờ trả về HTTP 400 CANCEL_NOT_ALLOWED); Admin được quyền xem và hủy điều phối mọi đơn CONFIRMED.


### 3.3.4   Bảng mã lỗi


| TT | Mã lỗi | Trường hợp phát sinh | Thông báo hiển thị cho người dùng |
| --- | --- | --- | --- |
| 1 | UNAUTHORIZED | Chưa đăng nhập hoặc JWT Token không hợp lệ / hết hạn khi gọi API Đặt sân, Xem lịch sử hoặc Hủy sân. | Vui lòng đăng nhập để tiếp tục |
| 2 | FORBIDDEN | Customer cố tình xem/hủy đơn đặt sân của Customer khác hoặc truy cập API dành riêng cho Admin. | Bạn không có quyền thực hiện thao tác này |
| 3 | INVALID_BOOKING_TIME | Khách hàng chọn ngày đặt sân trong quá khứ hoặc khung giờ đã qua. | Không thể đặt sân cho ngày hoặc khung giờ trong quá khứ |
| 4 | COURT_INACTIVE | Khách hàng gửi yêu cầu đặt sân đối với sân đang bảo trì (status = INACTIVE). | Sân này đang tạm ngừng hoạt động để bảo trì. Vui lòng chọn sân khác |
| 5 | SLOT_NOT_AVAILABLE | Khung giờ được chọn đã có đơn đặt CONFIRMED hoặc bị giao dịch đồng thời khác đặt trước. | Khung giờ này đã được đặt. Vui lòng chọn khung giờ khác |
| 6 | BOOKING_NOT_FOUND | Truy vấn hoặc yêu cầu hủy một mã đơn đặt sân (bookingId) không tồn tại. | Không tìm thấy đơn đặt sân trên hệ thống |
| 7 | CANCEL_NOT_ALLOWED | Customer yêu cầu hủy đơn khi thời gian còn lại trước giờ bắt đầu < 2 giờ, hoặc đơn đã ở trạng thái CANCELLED. | Không thể hủy sân. Chỉ được hủy trước thời gian bắt đầu ít nhất 2 giờ |

Bảng 3-6: Bảng mã lỗi của luồng Đặt sân và Hủy đặt sân


# 4   Yêu cầu giao diện và dữ liệu

1. Yêu cầu giao diện người dùng (UI/UX): Giao diện tiếng Việt thống nhất trên 05 màn hình (Đăng ký, Đăng nhập, Danh sách sân, Chi tiết lịch sân & Đặt sân, Lịch sử đặt sân & Quản trị). Đảm bảo hiển thị thích ứng (Responsive) không phát sinh thanh cuộn ngang toàn trang ngoài ý muốn và không che khuất nút bấm tại 03 kích thước màn hình tiêu chuẩn: 360px (Mobile), 768px (Tablet) và 1440px (Desktop). Toàn bộ phần tử tương tác gắn thuộc tính data-testid.

2. Yêu cầu dữ liệu khởi tạo cố định (Deterministic Seed Data): Hệ thống khởi tạo sẵn 06 sân cầu lông (Sân 1..5 ACTIVE, Sân 6 INACTIVE), 04 tài khoản kiểm thử (admin@badminton.vn / Admin@123 và customer1..3@gmail.com / Customer@123) cùng 05 đơn đặt sân mẫu (ID 101, 102, 103, 104, 999), hỗ trợ khôi phục tức thì qua API POST /api/v1/admin/reset-data.


# 5   Yêu cầu phi chức năng


| Nhóm yêu cầu | Nội dung |
| --- | --- |
| Hiệu năng | Thời gian phản hồi trung bình đạt <= 500 ms ở tải 50 người dùng đồng thời. Ở mức tải 100 người dùng đồng thời, API tra cứu lịch sân trống (GET /api/v1/courts/{id}/availability) đạt P90 <= 1.000 ms và các API Đặt/Hủy sân đạt P95 <= 1.500 ms; tỷ lệ lỗi HTTP 5xx bằng 0%. |
| Khả dụng | Hệ thống phục vụ tra cứu và đặt sân 24/7; cung cấp endpoint GET /health phản hồi HTTP 200 OK trong vòng < 200 ms. |
| Bảo mật | Mật khẩu băm một chiều bằng bcrypt (salt rounds = 10); xác thực bằng JWT Bearer Token; kiểm soát phân quyền cấp độ bản ghi chống lỗ hổng IDOR; khóa tài khoản khi nhập sai mật khẩu >= 5 lần. |
| Tương thích | Tương thích các trình duyệt Chrome, Edge, Firefox, Safari và hiển thị chuẩn ở độ rộng 360px, 768px, 1440px. |
| Sao lưu | Lưu trữ bền vững ngay sau mỗi giao dịch tạo/hủy đơn vào tệp cơ sở dữ liệu (database.json / MySQL) và hỗ trợ khôi phục dữ liệu gốc qua POST /api/v1/admin/reset-data. |

Bảng 5-1: Các yêu cầu phi chức năng


# 6   Bảng tổng hợp các yêu cầu chức năng


| Mã YC | Tên yêu cầu | Mô tả ngắn | Ưu tiên |
| --- | --- | --- | --- |
| URD-REG-01 | Đăng ký tài khoản khách hàng mới | Cho phép khách vãng lai đăng ký tài khoản mới với Họ tên, Email, Mật khẩu và Xác nhận mật khẩu hợp lệ. | Cao |
| URD-REG-02 | Kiểm tra trùng lặp Email đăng ký | Từ chối đăng ký và báo lỗi EMAIL_ALREADY_EXISTS nếu địa chỉ Email đã tồn tại trong hệ thống. | Cao |
| URD-AUTH-01 | Đăng nhập hệ thống bằng Email & Mật khẩu | Xác thực thông tin đăng nhập của Customer/Admin và cấp phát mã JWT Token. | Cao |
| URD-AUTH-02 | Khóa tạm thời khi đăng nhập sai nhiều lần | Tự động khóa tạm thời tài khoản nếu nhập sai mật khẩu liên tiếp từ 05 lần trở lên. | Trung bình |
| URD-COURT-01 | Xem danh sách sân và chi tiết sân cầu lông | Hiển thị danh sách 06 sân cầu lông kèm loại thảm, giá thuê/giờ và trạng thái hoạt động (ACTIVE/INACTIVE). | Cao |
| URD-COURT-02 | Tra cứu lịch sân trống theo ngày (16 khung giờ) | Hiển thị trạng thái AVAILABLE / BOOKED của 16 khung giờ cố định (06:00–22:00) theo sân và ngày. | Cao |
| URD-BOOK-01 | Đặt sân cầu lông theo khung giờ trống | Cho phép Customer đã đăng nhập đặt một khung giờ AVAILABLE trên sân ACTIVE cho ngày/giờ trong tương lai. | Cao |
| URD-BOOK-02 | Chống đặt trùng lịch (Zero Double Booking) | Đảm bảo tại mọi thời điểm chỉ có tối đa 01 đơn CONFIRMED cho cùng một sân, cùng ngày và cùng khung giờ. | Cao |
| URD-BOOK-03 | Xem lịch sử đặt sân cá nhân | Cho phép Customer xem danh sách và trạng thái các đơn đặt sân của chính mình. | Trung bình |
| URD-CANCEL-01 | Khách hàng hủy đơn đặt sân hợp lệ (trước >= 2 giờ) | Cho phép Customer hủy đơn CONFIRMED của chính mình khi thời gian còn lại trước giờ bắt đầu >= 2 giờ. | Cao |
| URD-CANCEL-02 | Chặn hủy đơn sát giờ (< 2 giờ) hoặc hủy đơn người khác | Từ chối yêu cầu hủy nếu còn < 2 giờ trước giờ chơi hoặc nếu Customer cố tình hủy đơn của người khác. | Cao |
| URD-CANCEL-03 | Quản trị viên xem toàn bộ đơn và hủy điều phối | Cho phép Admin xem toàn bộ danh sách đặt sân của hệ thống và hủy đơn điều phối tại quầy. | Trung bình |

Bảng 6-1: Bảng tổng hợp các yêu cầu chức năng
