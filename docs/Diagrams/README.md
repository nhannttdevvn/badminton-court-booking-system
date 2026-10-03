# Diagrams (Sơ đồ Kiến trúc & Thiết kế Hệ thống)

## 1. Kiến trúc Hệ thống (System Architecture)

```
[ Client: React + Vite ] 
         │ (HTTP/JSON)
         ▼
[ Server: Node.js + Express ]
         │ (mysql2 / connection pool)
         ▼
[ Database: MySQL ]
```

## 2. Luồng đặt sân (Booking Flow)

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Khách hàng
    participant FE as Frontend (React)
    participant BE as Backend (Express)
    participant DB as MySQL Database

    Customer->>FE: 1. Xem lịch & chọn sân, giờ chơi
    FE->>BE: 2. GET /api/courts/:id/slots
    BE->>DB: 3. Query các slot trống
    DB-->>BE: Trả về slot khả dụng
    BE-->>FE: Trả về danh sách slot
    Customer->>FE: 4. Nhấn "Xác nhận đặt sân"
    FE->>BE: 5. POST /api/bookings
    BE->>DB: 6. Kiểm tra & khóa slot (Transaction)
    DB-->>BE: Ghi nhận booking thành công
    BE-->>FE: 201 Created (Booking details)
    FE-->>Customer: 7. Hiển thị thông tin đặt sân thành công
```

## 3. Luồng hủy đặt sân (Cancel Flow)

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Khách hàng
    participant FE as Frontend (React)
    participant BE as Backend (Express)
    participant DB as MySQL Database

    Customer->>FE: 1. Chọn lịch đặt cần hủy
    FE->>BE: 2. POST /api/bookings/:id/cancel
    BE->>DB: 3. Kiểm tra điều kiện hủy (trước thời hạn quy định)
    BE->>DB: 4. Cập nhật status = 'CANCELLED' & giải phóng slot
    DB-->>BE: Xác nhận cập nhật
    BE-->>FE: 200 OK (Hủy thành công)
    FE-->>Customer: 5. Hiển thị thông báo hủy thành công
```
