import bcrypt from 'bcryptjs';
import { getDb } from '../config/db.js';

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

function buildDefaultData() {
  const courts = INITIAL_COURTS.map((court) => ({ ...court }));
  const adminPassHash = bcrypt.hashSync('Admin@123', 10);
  const customerPassHash = bcrypt.hashSync('Customer@123', 10);

  // 4 Tài khoản kiểm thử xác định (Deterministic Test Accounts)
  const users = [
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

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const bookings = [
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
  // Mã kế tiếp: user = 5, booking = 1000 (giữ nguyên như bản lưu file JSON trước đây)
  return { courts, users, bookings, nextUserId: 5, nextBookingId: 1000 };
}


const HIDE_ID = { projection: { _id: 0 } };

class DataStore {
  constructor() {
    this.bookingLocks = new Set(); // Khóa giao dịch nguyên tử theo slot
    this.readyPromise = null;
  }

  // Kết nối MongoDB, tạo index và nạp dữ liệu mẫu ở lần chạy đầu tiên (database rỗng)
  async ready() {
    if (!this.readyPromise) {
      this.readyPromise = (async () => {
        const db = await getDb();
        this.db = db;
        this.courts = db.collection('courts');
        this.users = db.collection('users');
        this.bookings = db.collection('bookings');
        this.counters = db.collection('counters');

        await Promise.all([
          this.courts.createIndex({ id: 1 }, { unique: true }),
          this.users.createIndex({ id: 1 }, { unique: true }),
          this.users.createIndex({ email: 1 }),
          this.bookings.createIndex({ id: 1 }, { unique: true }),
          this.bookings.createIndex({ userId: 1 }),
          this.bookings.createIndex({ courtId: 1, bookingDate: 1, status: 1 }),
        ]);

        const initialized = await this.counters.findOne({ _id: 'bookingId' });
        if (!initialized) {
          await this.seedDefaultData();
        }
      })().catch((error) => {
        this.readyPromise = null;
        throw error;
      });
    }
    return this.readyPromise;
  }

  async seedDefaultData() {
    const { courts, users, bookings, nextUserId, nextBookingId } = buildDefaultData();
    await Promise.all([
      this.courts.deleteMany({}),
      this.users.deleteMany({}),
      this.bookings.deleteMany({}),
      this.counters.deleteMany({}),
    ]);
    await this.courts.insertMany(courts);
    await this.users.insertMany(users);
    await this.bookings.insertMany(bookings);
    await this.counters.insertMany([
      { _id: 'userId', seq: nextUserId - 1 },
      { _id: 'bookingId', seq: nextBookingId - 1 },
    ]);
  }

  async nextId(name) {
    const counter = await this.counters.findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    return counter.seq;
  }

  // Users Operations
  async findUserByEmail(email) {
    if (!email) return null;
    await this.ready();
    const lowerEmail = email.toLowerCase().trim();
    return this.users.findOne({ email: lowerEmail }, { ...HIDE_ID, sort: { id: 1 } });
  }

  async findUserById(id) {
    await this.ready();
    return this.users.findOne({ id: Number(id) }, HIDE_ID);
  }

  async createUser({ fullName, email, password, role = 'CUSTOMER' }) {
    await this.ready();
    const newUser = {
      id: await this.nextId('userId'),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      failedAttempts: 0,
      lockedUntil: null,
      createdAt: new Date().toISOString(),
    };
    await this.users.insertOne({ ...newUser });
    return newUser;
  }

  async recordFailedLogin(email) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    const failedAttempts = (user.failedAttempts || 0) + 1;
    const update = { failedAttempts };
    if (failedAttempts >= 5) {
      update.lockedUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    }
    await this.users.updateOne({ id: user.id }, { $set: update });
    return { ...user, ...update };
  }

  async resetFailedLogin(email) {
    const user = await this.findUserByEmail(email);
    if (!user) return null;
    const update = { failedAttempts: 0, lockedUntil: null };
    await this.users.updateOne({ id: user.id }, { $set: update });
    return { ...user, ...update };
  }

  // Courts Operations
  async getAllCourts() {
    await this.ready();
    return this.courts.find({}, HIDE_ID).sort({ id: 1 }).toArray();
  }

  async getCourtById(id) {
    await this.ready();
    return this.courts.findOne({ id: Number(id) }, HIDE_ID);
  }

  // Bookings Operations
  async getAllBookings() {
    await this.ready();
    return this.bookings.find({}, HIDE_ID).sort({ id: 1 }).toArray();
  }

  async getBookingsByUser(userId) {
    await this.ready();
    return this.bookings.find({ userId: Number(userId) }, HIDE_ID).sort({ id: 1 }).toArray();
  }

  async getBookingById(id) {
    await this.ready();
    return this.bookings.findOne({ id: Number(id) }, HIDE_ID);
  }

  async getConfirmedBookingsForCourtAndDate(courtId, date) {
    await this.ready();
    return this.bookings
      .find({ courtId: Number(courtId), bookingDate: date }, HIDE_ID)
      .sort({ id: 1 })
      .toArray();
  }

  async findActiveBooking(courtId, date, timeSlot) {
    await this.ready();
    return this.bookings.findOne(
      { courtId: Number(courtId), bookingDate: date, timeSlot, status: 'CONFIRMED' },
      { ...HIDE_ID, sort: { id: 1 } }
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
    const id = await this.nextId('bookingId');
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
    await this.bookings.insertOne({ ...newBooking });
    return newBooking;
  }

  async cancelBooking(id, cancelledByUserId, reason = '') {
    await this.ready();
    return this.bookings.findOneAndUpdate(
      { id: Number(id) },
      {
        $set: {
          status: 'CANCELLED',
          cancelledBy: Number(cancelledByUserId),
          cancelledAt: new Date().toISOString(),
          cancelReason: reason,
        },
      },
      { ...HIDE_ID, returnDocument: 'after' }
    );
  }

  async resetData() {
    await this.ready();
    this.bookingLocks.clear();
    await this.seedDefaultData();
  }
}

export const store = new DataStore();
export default store;
