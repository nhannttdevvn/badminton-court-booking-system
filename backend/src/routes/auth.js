import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import store from '../models/dataStore.js';
import { JWT_SECRET, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/v1/auth/register (FR-REG-01, FR-REG-02, FR-REG-03)
router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Vui lòng điền đầy đủ các thông tin bắt buộc (Họ tên, Email, Mật khẩu, Xác nhận mật khẩu)',
      });
    }

    // VAL-REG-01: Full Name 2 - 50 ký tự
    const trimmedName = String(fullName).trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Họ và tên phải có độ dài từ 2 đến 50 ký tự',
      });
    }

    // VAL-REG-02: Format Email (tối đa 100 ký tự)
    const trimmedEmail = String(email).trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 100) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Địa chỉ email không đúng định dạng hoặc vượt quá 100 ký tự',
      });
    }

    // VAL-REG-04: Password 8 - 20 ký tự, ít nhất 1 hoa, 1 thường, 1 số
    if (password.length < 8 || password.length > 20) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Mật khẩu phải có độ dài từ 8 đến 20 ký tự',
      });
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUpper || !hasLower || !hasNumber) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số',
      });
    }

    // VAL-REG-05: Confirm Password trùng khớp
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Mật khẩu xác nhận không trùng khớp với mật khẩu đã nhập',
      });
    }

    // VAL-REG-03 & ERR-REG-01: Kiểm tra trùng Email không phân biệt hoa thường
    const existingUser = await store.findUserByEmail(trimmedEmail);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errorCode: 'EMAIL_ALREADY_EXISTS',
        message: 'Email này đã được đăng ký tài khoản thành viên',
      });
    }

    // BUS-REG-01: Mã hóa mật khẩu bằng Bcrypt, gán vai trò CUSTOMER
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await store.createUser({
      fullName: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      role: 'CUSTOMER',
    });

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản thành viên thành công',
      data: {
        userId: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/auth/login (FR-AUTH-01, FR-AUTH-02)
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        errorCode: 'VALIDATION_ERROR',
        message: 'Vui lòng nhập đầy đủ Email và Mật khẩu',
      });
    }

    const user = await store.findUserByEmail(email);

    // Kiểm tra khóa tài khoản tạm thời 5 phút
    if (user && user.lockedUntil) {
      const lockExpire = new Date(user.lockedUntil).getTime();
      if (Date.now() < lockExpire) {
        const remainingSec = Math.ceil((lockExpire - Date.now()) / 1000);
        return res.status(401).json({
          success: false,
          errorCode: 'AUTH_LOCKED',
          message: `Tài khoản tạm thời bị khóa do nhập sai mật khẩu 5 lần. Vui lòng thử lại sau ${remainingSec} giây`,
        });
      } else {
        await store.resetFailedLogin(email);
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        errorCode: 'AUTH_INVALID_CREDENTIALS',
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const updatedUser = await store.recordFailedLogin(email);
      if (updatedUser && updatedUser.failedAttempts >= 5) {
        return res.status(401).json({
          success: false,
          errorCode: 'AUTH_LOCKED',
          message: 'Tài khoản tạm thời bị khóa 5 phút do nhập sai mật khẩu quá 5 lần liên tiếp',
        });
      }

      return res.status(401).json({
        success: false,
        errorCode: 'AUTH_INVALID_CREDENTIALS',
        message: 'Email hoặc mật khẩu không chính xác',
      });
    }

    await store.resetFailedLogin(email);

    // BUS-AUTH-01: Cấp JWT Token thời hạn 24 giờ
    const token = jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      data: {
        userId: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/v1/auth/me
router.get('/me', authenticateToken, (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
});

export default router;
