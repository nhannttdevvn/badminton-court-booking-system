import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE_PATH = path.join(DATA_DIR, 'database.json');

// 16 khung giờ hoạt động cố định (06:00 đến 22:00)
export const OPERATING_SLOTS = [
  '06:00-07:00',
  '07:00-08:00',
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00',
  '18:00-19:00',
  '19:00-20:00',
  '20:00-21:00',
  '21:00-22:00',
];

// Danh sách 6 sân cầu lông khởi tạo
export const INITIAL_COURTS = [
  {
    id: 1,
    name: 'Sân 1',
    type: 'Thảm Enlio Tiêu Chuẩn',
    pricePerHour: 120000,
    status: 'ACTIVE',
    description: 'Sân thảm chống trượt chuẩn thi đấu phong trào',
  },
  {
    id: 2,
    name: 'Sân 2',
    type: 'Thảm Enlio Tiêu Chuẩn',
    pricePerHour: 120000,
    status: 'ACTIVE',
    description: 'Sân thảm tiêu chuẩn, ánh sáng chống chói',
  },
  {
    id: 3,
    name: 'Sân 3',
    type: 'Thảm Yonex Thi Đấu',
    pricePerHour: 150000,
    status: 'ACTIVE',
    description: 'Sân thảm Yonex cao cấp độ nảy chuẩn giải đấu',
  },
  {
    id: 4,
    name: 'Sân 4',
    type: 'Thảm Yonex Thi Đấu',
    pricePerHour: 150000,
    status: 'ACTIVE',
    description: 'Sân thảm Yonex cao cấp, góc nhìn thoáng',
  },
  {
    id: 5,
    name: 'Sân 5',
    type: 'Thảm Alite Phong Trào',
    pricePerHour: 100000,
    status: 'ACTIVE',
    description: 'Sân tập luyện phong trào kinh tế',
  },
  {
    id: 6,
    name: 'Sân 6',
    type: 'Thảm Alite Phong Trào',
    pricePerHour: 100000,
    status: 'INACTIVE',
    description: 'Đang bảo trì hệ thống chiếu sáng',
  },
];

function splitTimeSlot(timeSlot) {
  const parts = String(timeSlot || '08:00-09:00').split('-');
  return {
    startTime: parts[0] || '08:00',
    endTime: parts[1] || '09:00',
  };
}

class DataStore {
  constructor() {
    this.courts = [];
    this.users = [];
    this.bookings = [];
    this.bookingCounter = 100;
    this.userCounter = 1;
    this.bookingLocks = new Set(); // Khóa giao dịch nguyên tử theo slot
    this.loadOrInit();
  }

  loadOrInit() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.courts) && Array.isArray(parsed.users) && Array.isArray(parsed.bookings)) {
          this.courts = parsed.courts;
          this.users = parsed.users;
          this.bookings = parsed.bookings;
          this.bookingCounter = parsed.bookingCounter || 1000;
          this.userCounter = parsed.userCounter || 10;
          return;
        }
      }
    } catch {
      // Fallback to default seed data if file read fails
    }
    this.initDefaultData();
  }

  saveToDisk() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const payload = {
        courts: this.courts,
        users: this.users,
        bookings: this.bookings,
        bookingCounter: this.bookingCounter,
        userCounter: this.userCounter,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(payload, null, 2), 'utf8');
    } catch {
      // Ignore write errors in restricted environments
    }
  }

  initDefaultData() {
    this.courts = [...INITIAL_COURTS];
    const adminPassHash = bcrypt.hashSync('Admin@123', 10);
    const customerPassHash = bcrypt.hashSync('Customer@123', 10);

    // 4 Tài khoản kiểm thử xác định (Deterministic Test Accounts)
    this.users = [
      {
        id: 1,
        fullName: 'Chủ Sân Quản Trị',
        email: 'admin@badminton.vn',
        password: adminPassHash,
        role: 'ADMIN',
        failedAttempts: 0,
        lockedUntil: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        fullName: 'Nguyễn Văn An',
        email: 'customer1@gmail.com',
        password: customerPassHash,
        role: 'CUSTOMER',
        failedAttempts: 0,
        lockedUntil: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        fullName: 'Trần Thị Bình',
        email: 'customer2@gmail.com',
        password: customerPassHash,
        role: 'CUSTOMER',
        failedAttempts: 0,
        lockedUntil: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        fullName: 'Lê Hoàng Cường',
        email: 'customer3@gmail.com',
        password: customerPassHash,
        role: 'CUSTOMER',
        failedAttempts: 0,
        lockedUntil: null,
        createdAt: new Date().toISOString(),
      },
    ];
    this.userCounter = 5;

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    this.bookings = [
      {
        id: 101,
        bookingCode: 'BK-SAMPLE-01',
        courtId: 1,
        courtName: 'Sân 1',
        userId: 2,
        customerName: 'Nguyễn Văn An',
        customerEmail: 'customer1@gmail.com',
        bookingDate: tomorrowStr,
        timeSlot: '08:00-09:00',
        startTime: '08:00',
        endTime: '09:00',
        totalPrice: 120000,
        note: 'Lịch tập luyện buổi sáng',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      },
      {
        id: 102,
        bookingCode: 'BK-SAMPLE-02',
        courtId: 2,
        courtName: 'Sân 2',
        userId: 3,
        customerName: 'Trần Thị Bình',
        customerEmail: 'customer2@gmail.com',
        bookingDate: tomorrowStr,
        timeSlot: '18:00-19:00',
        startTime: '18:00',
        endTime: '19:00',
        totalPrice: 120000,
        note: 'Giao lưu câu lạc bộ buổi tối',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      },
      {
        id: 103,
        bookingCode: 'BK-SAMPLE-03',
        courtId: 3,
        courtName: 'Sân 3',
        userId: 2,
        customerName: 'Nguyễn Văn An',
        customerEmail: 'customer1@gmail.com',
        bookingDate: todayStr,
        timeSlot: '21:00-22:00',
        startTime: '21:00',
        endTime: '22:00',
        totalPrice: 150000,
        note: 'Đơn đặt sân trong ngày',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      },
      {
        id: 104,
        bookingCode: 'BK-SAMPLE-04',
        courtId: 1,
        courtName: 'Sân 1',
        userId: 2,
        customerName: 'Nguyễn Văn An',
        customerEmail: 'customer1@gmail.com',
        bookingDate: yesterdayStr,
        timeSlot: '19:00-20:00',
        startTime: '19:00',
        endTime: '20:00',
        totalPrice: 120000,
        note: 'Lịch sử đơn đã hủy',
        status: 'CANCELLED',
        cancelledAt: yesterday.toISOString(),
        createdAt: yesterday.toISOString(),
      },
      {
        id: 999,
        bookingCode: 'BK-SPECIAL-999',
        courtId: 4,
        courtName: 'Sân 4',
        userId: 2,
        customerName: 'Nguyễn Văn An',
        customerEmail: 'customer1@gmail.com',
        bookingDate: tomorrowStr,
        timeSlot: '14:00-15:00',
        startTime: '14:00',
        endTime: '15:00',
        totalPrice: 150000,
        note: 'Đặt sân giao hữu định kỳ',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      },
    ];
    this.bookingCounter = 1000;
    this.saveToDisk();
  }

  // Users Operations
  async findUserByEmail(email) {
    if (!email) return null;
    const lowerEmail = email.toLowerCase().trim();
    return this.users.find((u) => u.email.toLowerCase() === lowerEmail);
  }

  async findUserById(id) {
    return this.users.find((u) => u.id === Number(id));
  }

  async createUser({ fullName, email, password, role = 'CUSTOMER' }) {
    const newUser = {
      id: this.userCounter++,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      failedAttempts: 0,
      lockedUntil: null,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    this.saveToDisk();
    return newUser;
  }

  async recordFailedLogin(email) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    user.failedAttempts = (user.failedAttempts || 0) + 1;
    if (user.failedAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    }
    this.saveToDisk();
    return user;
  }

  async resetFailedLogin(email) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    user.failedAttempts = 0;
    user.lockedUntil = null;
    this.saveToDisk();
    return user;
  }

  // Courts Operations
  async getAllCourts() {
    return [...this.courts];
  }

  async getCourtById(id) {
    return this.courts.find((c) => c.id === Number(id));
  }

  // Bookings Operations
  async getAllBookings() {
    return [...this.bookings];
  }

  async getBookingsByUser(userId) {
    return this.bookings.filter((b) => b.userId === Number(userId));
  }

  async getBookingById(id) {
    return this.bookings.find((b) => b.id === Number(id));
  }

  async getConfirmedBookingsForCourtAndDate(courtId, date) {
    return this.bookings.filter(
      (b) =>
        b.courtId === Number(courtId) &&
        b.bookingDate === date &&
        b.status === 'CONFIRMED'
    );
  }

  async findActiveBooking(courtId, date, timeSlot) {
    return this.bookings.find(
      (b) =>
        b.courtId === Number(courtId) &&
        b.bookingDate === date &&
        b.timeSlot === timeSlot &&
        b.status === 'CONFIRMED'
    );
  }

  acquireSlotLock(courtId, date, timeSlot) {
    const key = `${Number(courtId)}_${date}_${timeSlot}`;
    if (this.bookingLocks.has(key)) {
      return false;
    }
    this.bookingLocks.add(key);
    return true;
  }

  releaseSlotLock(courtId, date, timeSlot) {
    const key = `${Number(courtId)}_${date}_${timeSlot}`;
    this.bookingLocks.delete(key);
  }

  async createBooking({ courtId, bookingDate, timeSlot, user, note = '' }) {
    const court = await this.getCourtById(courtId);
    const id = this.bookingCounter++;
    const codeDate = bookingDate.replace(/-/g, '');
    const bookingCode = `BK-${codeDate}-${String(id).padStart(4, '0')}`;
    const { startTime, endTime } = splitTimeSlot(timeSlot);

    const newBooking = {
      id,
      bookingCode,
      courtId: Number(courtId),
      courtName: court ? court.name : `Sân ${courtId}`,
      userId: user.id,
      customerName: user.fullName,
      customerEmail: user.email,
      bookingDate,
      timeSlot,
      startTime,
      endTime,
      totalPrice: court ? court.pricePerHour : 120000,
      note: note ? note.trim() : '',
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    this.bookings.push(newBooking);
    this.saveToDisk();
    return newBooking;
  }

  async cancelBooking(id, cancelledByUserId, reason = '') {
    const booking = await this.getBookingById(id);
    if (!booking) return null;
    booking.status = 'CANCELLED';
    booking.cancelledBy = Number(cancelledByUserId);
    booking.cancelledAt = new Date().toISOString();
    booking.cancelReason = reason;
    this.saveToDisk();
    return booking;
  }

  async resetData() {
    this.bookingLocks.clear();
    this.initDefaultData();
  }
}

export const store = new DataStore();
export default store;
