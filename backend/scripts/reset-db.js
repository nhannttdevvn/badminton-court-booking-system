import store from '../src/models/dataStore.js';

await store.resetData();
console.log('🔄 Reset database back to initial deterministic state.');
