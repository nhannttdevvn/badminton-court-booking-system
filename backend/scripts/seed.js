import store from '../src/models/dataStore.js';
import { closeConnection } from '../src/config/db.js';

await store.resetData();
console.log('✅ Seeded deterministic test accounts, 6 courts, and sample bookings into MongoDB.');
await closeConnection();
