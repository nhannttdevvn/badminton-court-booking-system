import jwt from 'jsonwebtoken';
import store from '../models/dataStore.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'badminton_court_evaluation_jwt_secret_key_2026';

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      errorCode: 'UNAUTHORIZED',
      message: 'Vui lòng đăng nhập để tiếp tục',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await store.findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        errorCode: 'UNAUTHORIZED',
        message: 'Tài khoản không tồn tại hoặc đã bị khóa',
      });
    }

    req.user = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      errorCode: 'UNAUTHORIZED',
      message: 'Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại',
      error: error.message,
    });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        errorCode: 'UNAUTHORIZED',
        message: 'Vui lòng đăng nhập để tiếp tục',
      });
    }
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        errorCode: 'FORBIDDEN',
        message: 'Bạn không có quyền thực hiện thao tác này',
      });
    }
    next();
  };
}

export default authenticateToken;
