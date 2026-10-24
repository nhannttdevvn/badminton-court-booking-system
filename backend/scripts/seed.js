import store from '../src/models/dataStore.js';

await store.resetData();
console.log('✅ Seeded deterministic test accounts, 6 courts, and sample bookings into backend/data/database.json.');

