import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'badminton_booking_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig);

export async function testConnection() {
  try {
    if (process.env.USE_EXTERNAL_MYSQL === 'true') {
      const connection = await pool.getConnection();
      console.log('✅ [Database] MySQL connected successfully.');
      connection.release();
      return true;
    }
    console.log('✅ [Database] Persistent Data Store (backend/data/database.json) initialized.');
    return true;
  } catch (error) {
    console.log('ℹ️ [Database] Using local persistent Data Store (backend/data/database.json).');
    return false;
  }
}

export default pool;
