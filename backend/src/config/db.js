import 'dotenv/config';
import { MongoClient } from 'mongodb';

const DB_NAME = process.env.MONGODB_DB_NAME || 'badminton_booking_db';

// Tái sử dụng kết nối giữa các lần gọi serverless (Vercel) để không mở kết nối mới mỗi request
const globalCache = globalThis.__badmintonMongo || (globalThis.__badmintonMongo = { client: null, promise: null });

export async function getDb() {
  if (globalCache.client) {
    return globalCache.client.db(DB_NAME);
  }

  if (!globalCache.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('Thiếu biến môi trường MONGODB_URI (chuỗi kết nối MongoDB Atlas)');
    }
    globalCache.promise = new MongoClient(uri, { maxPoolSize: 10 })
      .connect()
      .then((client) => {
        globalCache.client = client;
        return client;
      })
      .catch((error) => {
        globalCache.promise = null;
        throw error;
      });
  }

  const client = await globalCache.promise;
  return client.db(DB_NAME);
}

export async function closeConnection() {
  if (globalCache.client) {
    await globalCache.client.close();
  }
  globalCache.client = null;
  globalCache.promise = null;
}

export async function testConnection() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    console.log(`✅ [Database] MongoDB connected successfully (database: ${DB_NAME}).`);
    return true;
  } catch (error) {
    console.error('❌ [Database] MongoDB connection failed:', error.message);
    return false;
  }
}

export default getDb;
