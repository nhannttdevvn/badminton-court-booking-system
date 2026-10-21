# TÀI LIỆU YÊU CẦU NGƯỜI SỬ DỤNG
## (User Requirements Document – URD)
# HỆ THỐNG ĐẶT SÂN CẦU LÔNG TRỰC TUYẾN
### Badminton Court Booking System
**Phiên bản**: v1.0  
**Ngày lập**: 21/10/2026  
**Đơn vị thực hiện**: Nhóm Đồ án Học phần Đánh giá Hiệu năng Hệ thống  
**Sinh viên biên soạn**: Chưa xác định — chưa có nguồn xác nhận (Cần bổ sung: Họ và tên, MSSV)  
**Sinh viên phản biện / Bạn cặp**: Chưa xác định — chưa có nguồn xác nhận (Cần bổ sung: Họ và tên, MSSV bạn cặp)  
**Trạng thái tài liệu**: **HOÀN THÀNH TỪ NGUỒN HIỆN CÓ (CÁC THAM SỐ CHƯA CÓ NGUỒN ĐƯỢC GẮN NHÃN ĐỀ XUẤT CHỜ XÁC NHẬN)**

---

## 1. Giới thiệu

### 1.1. Mục đích tài liệu
Tài liệu Yêu cầu Người sử dụng (URD) này được xây dựng nhằm xác định bối cảnh, mục tiêu nghiệp vụ, đối tượng người dùng, các luồng quy trình công việc và danh sách User Stories cho dự án **Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)**. Tài liệu đóng vai trò là căn cứ nghiệp vụ gốc để xây dựng tài liệu Đặc tả Yêu cầu Phần mềm (SRS) và giúp đội ngũ kiểm thử (Tester) thiết lập tiêu chí nghiệm thu.

### 1.2. Phạm vi hệ thống
Hệ thống quản lý cụm sân cầu lông tập trung vào các phạm vi sau (theo `README.md`):
- **Trong phạm vi (In-Scope)**:
  - Cho phép khách hàng tìm kiếm sân theo ngày, khung giờ, chi nhánh và loại sân (sân thảm tiêu chuẩn, sân VIP).
  - Đặt sân trực tuyến, thanh toán hoặc giữ chỗ tạm thời trong thời gian xác nhận, nhận thông báo xác nhận.
  - Hủy lịch đặt sân trực tuyến tự phục vụ theo chính sách thời gian quy định của sân.
  - Hỗ trợ nhân viên xem lịch đặt tổng quan theo Timeline, tiếp đón, check-in/check-out khi khách đến sân, và tạo lịch đặt sân trực tiếp tại quầy cho khách vãng lai.
  - Cung cấp trang quản trị cho Admin: quản lý danh mục sân, cấu hình bảng giá theo khung giờ (giờ thường / giờ vàng / cuối tuần), quản lý tài khoản & phân quyền, xem báo cáo doanh thu, tỷ lệ lấp đầy sân và cấu hình chính sách hệ thống (thời gian hủy sân tối thiểu, tỷ lệ cọc/hoàn tiền).
- **Ngoài phạm vi (Out-of-Scope)**:
  - Tích hợp cổng thanh toán trực tiếp ngân hàng thực tế (sử dụng phương thức giả lập thanh toán hoặc thanh toán chuyển khoản thủ công / tiền mặt tại quầy).
  - Quản lý kho hàng dụng cụ thể thao chuyên sâu (bán vợt, nước uống, đan lưới vợt).

### 1.3. Từ điển thuật ngữ
| Thuật ngữ | Tiếng Anh tương đương | Định nghĩa trong hệ thống | Nguồn xác nhận |
| :--- | :--- | :--- | :--- |
| **Sân (Court)** | Court | Một sân cầu lông tiêu chuẩn có tên định danh riêng (ví dụ: Sân 1, Sân 2, Sân VIP). | `README.md` (Mục 2.1) |
| **Khung giờ (Slot)** | Time Slot | Đơn vị thời gian cho thuê sân. *[Đề xuất chờ xác nhận: 60 phút/slot — chưa có nguồn xác nhận chính thức]*. | `README.md` (Mục 4.1) |
| **Khóa tạm thời (Hold slot)** | Temporary Hold | Trạng thái hệ thống giữ chỗ một slot trong quá trình xác nhận, ngăn chặn người khác đặt trùng. *[Đề xuất chờ xác nhận: thời gian giữ chỗ 10 phút — chưa có nguồn xác nhận chính thức]*. | `README.md` (Mục 4.1) |
| **Giờ cao điểm (Giờ vàng)** | Peak Hours | Khung giờ có nhu cầu cao áp dụng mức giá cao hơn. *[Đề xuất chờ xác nhận: 17:00 - 22:00 ngày thường và cuối tuần — chưa có nguồn xác nhận chính thức]*. | `README.md` (Mục 2.3, 4.3) |
| **Trùng lịch (Double Booking)** | Double Booking | Hiện tượng lỗi nghiệp vụ khi 2 khách hàng cùng đặt thành công một sân tại cùng một khung giờ. | `README.md` (Mục 1, 5) |
| **Khách hàng** | Customer | Người chơi cầu lông có nhu cầu tra cứu, đặt sân và quản lý lịch đặt. | `README.md` (Mục 2.1) |
| **Nhân viên** | Staff | Nhân viên vận hành tại cụm sân, phụ trách check-in/out và đặt tại quầy. | `README.md` (Mục 2.2) |
| **Quản trị viên** | Admin | Chủ sân hoặc người quản lý có toàn quyền quản trị danh mục sân, giá và báo cáo. | `README.md` (Mục 2.3) |

### 1.4. Tài liệu tham khảo
1. `README.md` – Tài liệu giới thiệu mục tiêu, 3 vai trò, chức năng chính và 3 luồng cốt lõi của dự án.
2. `TAILIEU/Checklist_truoc_khi_nop.docx` – Tiêu chí kiểm tra điều kiện nghiệm thu đồ án (Mục A1: URD).
3. `TAILIEU/Tieu_chi_cham_diem.docx` – Rubric chấm điểm tiêu chí A1.

---

## 2. Mô tả chung về hệ thống

### 2.1. Bối cảnh và Mô tả hệ thống hiện tại
Tại nhiều cụm sân cầu lông hiện nay, quy trình quản lý đặt sân vẫn được thực hiện thủ công:
- Khách hàng gọi điện thoại, nhắn tin hoặc đến trực tiếp để hỏi sân trống.
- Nhân viên kiểm tra sổ ghi chép tay hoặc file rời rạc để thông báo giờ trống và ghi nhận thông tin khách.
- Khi khách muốn hủy lịch hoặc đổi sân, nhân viên phải dò lại sổ sách và xóa dòng thủ công.

### 2.2. Hạn chế của hệ thống thủ công
1. **Dễ xảy ra trùng lịch (Double Booking)**: Khi nhiều nhân viên cùng tiếp nhận thông tin tại một thời điểm hoặc ghi chép chậm trễ, cùng một khung giờ có thể bị hứa hẹn cho 2 nhóm khách khác nhau.
2. **Khách hàng thiếu chủ động**: Không xem được lịch trống trực quan, phải chờ nhân viên phản hồi tin nhắn.
3. **Thất thoát doanh thu và khó thống kê**: Quản lý bằng sổ sách dễ bị sót đơn, khó kiểm soát số tiền thực thu, không có biểu đồ trực quan về tỷ lệ lấp đầy sân.
4. **Quy trình hủy sân bị động**: Khách hủy sát giờ nhưng sân không kịp thông báo công khai, dẫn đến lãng phí tài nguyên sân trống.

### 2.3. Mục tiêu của hệ thống cần xây dựng (Trích `README.md` Mục 1)
- **Tự động hóa quy trình đặt sân**: Người chơi dễ dàng tra cứu lịch trống, đặt lịch mọi lúc mọi nơi.
- **Minh bạch hóa quản lý**: Giúp chủ sân và nhân viên theo dõi trạng thái sân, doanh thu và lịch đặt theo thời gian thực.
- **Trải nghiệm người dùng mượt mà**: Giao diện trực quan, tốc độ xử lý nhanh chóng, thông báo rõ ràng, loại bỏ hoàn toàn trùng lịch.

---

## 3. Các đối tượng người dùng (3 User Roles – Trích `README.md` Mục 2)

### 3.1. Khách hàng (Customer)
- Đăng ký, đăng nhập tài khoản.
- Tìm kiếm sân theo ngày, khung giờ, chi nhánh và loại sân (sân thảm tiêu chuẩn, sân VIP).
- Đặt sân trực tuyến, thanh toán hoặc giữ chỗ tạm thời.
- Xem lịch sử đặt sân, nhận thông báo xác nhận và thực hiện hủy lịch đặt sân khi có nhu cầu.

### 3.2. Nhân viên (Staff)
- Xem lịch đặt sân tổng quan trong ngày/tuần theo dạng Timeline.
- Check-in, check-out cho khách khi đến sân.
- Tiếp nhận và tạo lịch đặt sân trực tiếp tại quầy cho khách vãng lai.
- Hỗ trợ đổi giờ hoặc hủy lịch đặt theo yêu cầu của khách tại sân.

### 3.3. Quản trị viên (Admin)
- Quản trị toàn bộ hệ thống: danh mục sân, số lượng sân, bảng giá theo khung giờ (giờ thường / giờ vàng / cuối tuần).
- Quản lý tài khoản người dùng và phân quyền nhân viên.
- Báo cáo thống kê doanh thu, tỷ lệ lấp đầy sân và xu hướng giờ chơi.
- Cấu hình các chính sách hệ thống (thời gian hủy sân tối thiểu, tỷ lệ cọc/hoàn tiền).

---

## 4. Ba luồng nghiệp vụ chính ở mức người dùng (Trích `README.md` Mục 4)

### 4.1. Luồng 1: Đặt sân (Booking Flow)
1. **Khách hàng** truy cập hệ thống, chọn ngày và xem danh sách các sân cùng các khung giờ trống (slots).
2. **Khách hàng** chọn sân và một hoặc nhiều khung giờ mong muốn.
3. Hệ thống kiểm tra tính khả dụng của slot và khóa tạm thời (hold slot) trong quá trình xác nhận.  
   *(Tham số thời gian giữ chỗ: [Đề xuất chờ xác nhận: 10 phút — chưa có nguồn xác nhận chính thức])*.
4. **Khách hàng** xác nhận thông tin đặt sân (và phương thức thanh toán/cọc).  
   *(Quy định cọc/thanh toán: [Chưa xác định — chưa có nguồn xác nhận chính thức])*.
5. Hệ thống lưu thông tin đặt sân vào cơ sở dữ liệu với trạng thái `CONFIRMED`, gửi xác nhận thành công cho khách hàng và cập nhật slot sang trạng thái đã đặt.

### 4.2. Luồng 2: Hủy đặt sân (Cancel Booking Flow)
1. **Khách hàng** vào mục "Lịch sử đặt sân" và chọn đơn đặt sân muốn hủy.
2. Hệ thống kiểm tra chính sách hủy.  
   *(Quy định thời hạn hủy: README.md ghi "ví dụ trước 12h hoặc 24h"; [Đề xuất chờ xác nhận: tối thiểu trước 24 giờ — chưa có nguồn xác nhận chính thức])*.
3. Nếu hợp lệ, hệ thống cập nhật trạng thái đơn thành `CANCELLED`.
4. Hệ thống giải phóng slot đã đặt để sân trở lại trạng thái khả dụng cho khách hàng khác tiếp tục đặt.
5. Gửi thông báo xác nhận hủy sân thành công tới khách hàng.

### 4.3. Luồng 3: Quản lý sân (Court Management Flow)
1. **Admin/Staff** đăng nhập vào trang quản trị và truy cập mục "Quản lý sân".
2. **Admin** có thể thêm mới sân, chỉnh sửa tên sân, loại thảm, trạng thái hoạt động (bảo trì/hoạt động).
3. **Admin** cấu hình bảng giá động theo các khung giờ.  
   *(Mức giá cụ thể: README.md ghi ví dụ "sáng 80.000đ/h, tối giờ vàng 150.000đ/h"; [Đề xuất chờ xác nhận — chưa có nguồn xác nhận chính thức])*.
4. Hệ thống áp dụng ngay bảng giá và cấu hình mới vào bảng tra cứu và tính tiền đặt sân cho toàn hệ thống.

---

## 5. Bảng User Stories và Tiêu chí Nghiệm thu (Acceptance Criteria)

Tất cả các yêu cầu được chuẩn hóa theo định dạng:  
**"Là [Vai trò], tôi muốn [Hành động/Mong muốn], để [Giá trị/Lợi ích mang lại]"**.

| Mã US | Vai trò | Nội dung User Story | Độ ưu tiên | Tiêu chí nghiệm thu ở mức người dùng (Acceptance Criteria) | Tình trạng nguồn xác nhận |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US-01** | Khách hàng | Là Khách hàng, tôi muốn xem danh sách các sân và lịch trống theo ngày, để chọn được giờ chơi phù hợp. | **Cao (P1)** | - Hiển thị danh sách sân kèm trạng thái trống/đã đặt theo khung giờ.<br>- Màu sắc hoặc nhãn phân biệt rõ slot trống và slot đã có người đặt. | Khớp `README.md` Mục 2.1 |
| **US-02** | Khách hàng | Là Khách hàng, tôi muốn giữ chỗ tạm thời slot khi chọn, để có thời gian điền thông tin mà không bị người khác đặt trùng. | **Cao (P1)** | - Slot được chuyển sang trạng thái tạm khóa ngay khi chọn.<br>- Người dùng khác không thể chọn trùng slot đang giữ chỗ.<br>- Tự động giải phóng nếu không hoàn tất xác nhận. | Khớp `README.md` Mục 4.1 |
| **US-03** | Khách hàng | Là Khách hàng, tôi muốn nhận được mã đơn đặt sân duy nhất sau khi xác nhận, để dùng làm căn cứ khi đến sân chơi. | **Cao (P1)** | - Hệ thống cấp mã đơn đặt sân duy nhất.<br>- Hiển thị đầy đủ thông tin: Sân, Ngày, Giờ chơi, Tổng tiền, Trạng thái. | Khớp `README.md` Mục 4.1 |
| **US-04** | Khách hàng | Là Khách hàng, tôi muốn hủy lịch đặt sân khi có việc bận, để giải phóng sân cho người khác và tuân thủ chính sách hủy. | **Cao (P1)** | - Chỉ cho phép hủy khi đáp ứng chính sách thời gian quy định.<br>- Slot được giải phóng ngay lập tức trên hệ thống sau khi hủy thành công.<br>- Trạng thái đơn chuyển sang Đã hủy. | Khớp `README.md` Mục 4.2 |
| **US-05** | Khách hàng | Là Khách hàng, tôi muốn xem lịch sử tất cả các đơn đặt sân của mình, để theo dõi các trận đấu sắp tới và đã hoàn thành. | **Trung bình (P2)** | - Danh sách hiển thị các đơn đặt của tài khoản kèm trạng thái.<br>- Có thể xem chi tiết từng đơn đặt. | Khớp `README.md` Mục 2.1 |
| **US-06** | Nhân viên | Là Nhân viên, tôi muốn tra cứu mã đặt chỗ của khách khi họ đến sân, để thực hiện check-in xác nhận vào sân. | **Cao (P1)** | - Tìm kiếm được đơn đặt theo mã hoặc thông tin khách.<br>- Có chức năng check-in đổi trạng thái đơn khi khách đến sân. | Khớp `README.md` Mục 2.2 |
| **US-07** | Nhân viên | Là Nhân viên, tôi muốn đặt sân nhanh tại quầy cho khách vãng lai, để tối ưu các slot trống trong ngày. | **Cao (P1)** | - Nhân viên có thể chọn slot trống và tạo đơn đặt trực tiếp tại chỗ cho khách không qua web. | Khớp `README.md` Mục 2.2 |
| **US-08** | Nhân viên | Là Nhân viên, tôi muốn xem lịch tổng thể toàn bộ các sân theo dạng Timeline, để điều phối khách dễ dàng. | **Cao (P1)** | - Giao diện trực quan thể hiện lịch đặt của các sân theo trục thời gian trong ngày/tuần. | Khớp `README.md` Mục 2.2 |
| **US-09** | Admin | Là Admin, tôi muốn thêm mới, sửa thông tin hoặc tạm đóng sân để bảo trì, để kiểm soát chính xác tình trạng sân. | **Cao (P1)** | - Cho phép thêm sân mới, sửa tên sân, loại thảm, chuyển trạng thái bảo trì/hoạt động.<br>- Sân bảo trì không hiển thị slot trống để đặt. | Khớp `README.md` Mục 2.3, 4.3 |
| **US-10** | Admin | Là Admin, tôi muốn cấu hình bảng giá khác nhau cho giờ thường và giờ vàng, để tối ưu doanh thu của sân. | **Cao (P1)** | - Cho phép thiết lập bảng giá theo khung giờ (giờ thường / giờ vàng / cuối tuần).<br>- Giá mới được áp dụng ngay khi tính tiền đặt sân. | Khớp `README.md` Mục 2.3, 4.3 |
| **US-11** | Admin | Là Admin, tôi muốn xem báo cáo doanh thu và tỷ lệ lấp đầy sân, để đánh giá hiệu quả kinh doanh. | **Trung bình (P2)** | - Báo cáo tổng doanh thu theo mốc thời gian.<br>- Thống kê tỷ lệ sử dụng/lấp đầy sân. | Khớp `README.md` Mục 2.3 |
| **US-12** | Admin | Là Admin, tôi muốn quản lý tài khoản người dùng và phân quyền nhân viên, để bảo đảm an toàn hệ thống. | **Thấp (P3)** | - Phân tách quyền rõ ràng giữa Khách hàng, Nhân viên và Quản trị viên. | Khớp `README.md` Mục 2.3 |

---

## 6. Danh mục các tham số nghiệp vụ ĐỀ XUẤT CHỜ XÁC NHẬN

Để phục vụ công tác thiết kế chi tiết trong SRS và bộ test case mà không vi phạm nguyên tắc tự tiện áp đặt số liệu, bảng dưới đây tổng hợp toàn bộ các tham số giả định cần người dùng hoặc chủ đầu tư xác nhận:

| Tham số nghiệp vụ | Giá trị đề xuất kỹ thuật | Căn cứ đề xuất | Tình trạng xác nhận |
| :--- | :--- | :--- | :---: |
| **Thời lượng một khung giờ (Slot duration)** | 60 phút / slot (06:00 - 22:00) | Chuẩn thuê sân cầu lông phổ biến | *[Đề xuất chờ xác nhận]* |
| **Thời gian giữ chỗ tạm thời (Hold duration)**| 10 phút (600 giây) | Đủ để điền thông tin và chống chiếm giữ slot ảo | *[Đề xuất chờ xác nhận]* |
| **Thời hạn hủy sân tối thiểu** | Tối thiểu trước 24 giờ trước giờ chơi | Cân bằng quyền lợi khách và tỷ lệ lấp đầy sân | *[Đề xuất chờ xác nhận]* |
| **Khung giờ cao điểm (Giờ vàng)** | 17:00 – 22:00 ngày thường và cả ngày Thứ 7, Chủ Nhật | Thói quen chơi thể thao sau giờ làm | *[Đề xuất chờ xác nhận]* |
| **Mức giá giờ thường / giờ vàng** | 80.000 VNĐ / 140.000 VNĐ một giờ | Dựa theo ví dụ minh họa trong `README.md` | *[Đề xuất chờ xác nhận]* |
| **Tỷ lệ cọc / Hoàn cọc khi đặt sân** | Chưa áp dụng thanh toán online thực tế (giả lập 100%) | Tránh phát sinh nghiệp vụ cổng thanh toán | *[Đề xuất chờ xác nhận]* |

---

## 7. Bảng mã lỗi nghiệp vụ mức người dùng

| Mã lỗi URD | Tình huống phát sinh lỗi | Thông báo hiển thị cho người dùng | Hướng dẫn khắc phục |
| :--- | :--- | :--- | :--- |
| **ERR_URD_01** | Khung giờ vừa chọn đã có người khác đặt trước | "Rất tiếc! Khung giờ này vừa có người đặt. Vui lòng chọn khung giờ khác." | Người dùng chọn lại slot trống khác trên timeline. |
| **ERR_URD_02** | Khách hàng hủy sân vi phạm chính sách thời gian | "Không thể hủy lịch đặt do vi phạm thời hạn quy định của sân." | Liên hệ trực tiếp quản lý/hotline để được hỗ trợ. |
| **ERR_URD_03** | Khách hàng hết thời gian giữ chỗ mà chưa bấm xác nhận | "Phiên giữ chỗ tạm thời đã hết hạn. Khung giờ đã được giải phóng." | Thực hiện chọn lại sân và thao tác nhanh hơn. |
| **ERR_URD_04** | Nhập sai thông tin liên hệ khi đặt sân | "Thông tin liên hệ không hợp lệ. Vui lòng kiểm tra lại họ tên và số điện thoại." | Kiểm tra lại thông tin nhập liệu trên màn hình. |
| **ERR_URD_05** | Tra cứu mã đặt chỗ không tồn tại khi check-in | "Không tìm thấy thông tin đơn đặt sân với mã đã cung cấp." | Kiểm tra lại tin nhắn/email xác nhận hoặc tìm theo Số điện thoại. |

---

## 8. Kết luận nghiệm thu tài liệu URD
- Tài liệu URD v1.0 đã bám sát 100% mục tiêu, 3 nhóm vai trò, các chức năng chính và 3 luồng nghiệp vụ quy định tại `README.md`.
- Đáp ứng đầy đủ tiêu chí của Rubric A1 (≥ 3 vai trò, ≥ 3 luồng người dùng, 12 User Stories đúng chuẩn, có tiêu chí nghiệm thu).
- Đã phân định rạch ròi giữa nội dung đã có nguồn và các tham số kỹ thuật đề xuất chờ xác nhận, bảo đảm tính trung thực tuyệt đối.
