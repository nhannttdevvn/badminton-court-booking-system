import store from '../src/models/dataStore.js';
import { closeConnection } from '../src/config/db.js';

await store.resetData();
console.log('🔄 Reset database back to initial deterministic state.');
await closeConnection();
