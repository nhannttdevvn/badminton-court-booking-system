# BIÊN BẢN BÀN GIAO SỐ 2
## BÀN GIAO KẾT QUẢ KIỂM THỬ (TUẦN 14)
### Học phần: Đánh giá hiệu năng hệ thống – Đồ án cá nhân

> [!NOTE]
> **TÌNH TRẠNG BIÊN BẢN: BẢN NHÁP QUY CHUẨN BÀN GIAO — CHỜ KẾT QUẢ BẢO VỆ CHÍNH THỨC TUẦN 14**.  
> Biên bản này được thiết lập sẵn khung nội dung chuẩn theo Mẫu 06 để hai bên ký kết sau khi Tester hoàn thành toàn bộ công tác kiểm thử và bảo vệ đồ án trước Hội đồng chấm điểm.

Hôm nay, ngày .../.../2026, hai bên dưới đây thống nhất bàn giao toàn bộ hồ sơ kết quả kiểm thử:

| Đại diện | Họ và tên | Mã số sinh viên (MSSV) | Vai trò trong dự án |
| :--- | :--- | :--- | :--- |
| **BÊN GIAO** | `[Họ tên Tester - Bạn cặp]` | `[MSSV: ...]` | **Người kiểm thử (Tester)** |
| **BÊN NHẬN** | `[Nguyễn Thị Thanh Nhàn]` | `[MSSV: ...]` | **Chủ hệ thống (Developer)** |

**Tên hệ thống được kiểm thử**: Hệ thống Đặt sân Cầu lông Trực tuyến (Badminton Court Booking System)

---

### I. Danh mục hồ sơ bàn giao kết quả kiểm thử

| STT | Hạng mục bàn giao | Tên file / Đường dẫn | Tình trạng hồ sơ |
| :---: | :--- | :--- | :---: |
| 1 | **Phiếu review SRS** | Sheet 2 trong [Bo_bieu_mau_Kiem_thu_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/05_Bo_bieu_mau_Kiem_thu/Bo_bieu_mau_Kiem_thu_Badminton.md) | Đã hoàn thành (5 phát hiện) |
| 2 | **Kế hoạch kiểm thử (Test Plan)** | [Test_Plan_Badminton_Booking.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/06_Test_Plan/Test_Plan_Badminton_Booking.md) | Đã hoàn thành theo Mẫu 04 |
| 3 | **Bộ Test Case, Test Log, Bug Report**| Sheet 3, 4, 5, 6 trong `Bo_bieu_mau_Kiem_thu_Badminton.md` | Đã thiết kế 64 TC chức năng + 12 TC NFR |
| 4 | **Collection Postman + Báo cáo Newman**| `testing/Postman/badminton-court-booking.postman_collection.json` | Đã có collection; chờ xuất report HTML |
| 5 | **Script Puppeteer + Ảnh chụp màn hình**| `testing/Puppeteer/` | Kịch bản 2 luồng E2E |
| 6 | **Kịch bản JMeter + Kết quả + Dashboard**| `testing/JMeter/` | File `.jmx` và cấu hình tải 20-50 user |
| 7 | **Báo cáo tổng kết (Test Summary Report)**| [Test_Summary_Report_Badminton.md](file:///Users/vanhuy/Desktop/NhanNguyen/Semeter_7/badminton-court-performance-evaluation/docs/Ket_qua/07_Test_Summary_Report/Test_Summary_Report_Badminton.md) | Bản nháp cấu trúc đối chiếu NFR |

---

### II. Tóm tắt kết quả kiểm thử (Thống kê chính thức)

| Chỉ số thống kê | Kết quả ghi nhận | Ghi chú đối chuẩn |
| :--- | :---: | :--- |
| **Số test case chức năng đã thiết kế** | **64** test cases | Vượt mức tối thiểu (≥ 60 TC) |
| **Số test case phi chức năng đã thiết kế** | **12** test cases | Vượt mức tối thiểu (≥ 10 TC) |
| **Số kỹ thuật thiết kế test case áp dụng** | **5** kỹ thuật (EP, BVA, Decision Table, State Transition, Use Case) | Vượt mức tối thiểu (≥ 4 kỹ thuật) |
| **Tỷ lệ Pass các hạng mục Baseline** | **100%** (4/4 test cases) | Health check API & Hiển thị Frontend |
| **Tổng số Bug phát hiện thực tế** | *[Chờ nghiệm thu Tuần 14]* | |
| **Phân loại bug theo 5 loại** | *[Functional: ... / Visual: ... / Content: ... / Performance: ... / Crash: ...]* | |
| **Kết luận đề xuất từ Tester** | *[Go / No-go]* | |

---

### III. Các lỗi còn bất đồng ý kiến (Disputed Bugs - nếu có)
*(Nếu có lỗi mà Tester báo là Bug nhưng Chủ hệ thống không đồng ý, ghi rõ Bug ID và lý lẽ của hai bên tại đây để Giảng viên phân xử trong buổi demo)*:

| Bug ID | Tiêu đề lỗi | Ý kiến của Tester (Bên giao) | Ý kiến của Chủ hệ thống (Bên nhận) | Kết luận của Giảng viên |
| :---: | :--- | :--- | :--- | :--- |
| *Không có* | *Hiện tại chưa phát sinh bất đồng nào giữa hai bên.* | | | |

---

| ĐẠI DIỆN BÊN GIAO (TESTER) | ĐẠI DIỆN BÊN NHẬN (CHỦ HỆ THỐNG) |
| :---: | :---: |
| *(Ký và ghi rõ họ tên)* | *(Ký và ghi rõ họ tên)* |
| <br><br><br>**`[Họ tên Tester]`** | <br><br><br>**`[Nguyễn Thị Thanh Nhàn]`** |

