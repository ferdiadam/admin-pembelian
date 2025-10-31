const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Lokasi database
const dbPath = path.join(__dirname, '../database/app.db');

// Buat koneksi database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Gagal konek ke database:', err.message);
  } else {
    console.log('Terhubung ke database SQLite.');
  }
});

module.exports = db;
