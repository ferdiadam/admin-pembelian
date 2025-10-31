const db = require('./db');

// Ambil semua produk dari tabel produk langsung
function getAllProduk(callback) {
  const query = `
    SELECT id, nama, harga, deskripsi, stok
    FROM produk
    ORDER BY id ASC
  `;
  db.all(query, [], (err, rows) => {
    callback(err, rows);
  });
}

// Tambah stok produk
function tambahStok(id, jumlah, callback) {
  const sql = 'UPDATE produk SET stok = stok + ? WHERE id = ?';
  db.run(sql, [jumlah, id], (err) => {
    callback(err);
  });
}

// Tambah produk baru
function tambahProduk(nama, harga, deskripsi, stok, callback) {
  const sql = 'INSERT INTO produk (nama, harga, deskripsi, stok) VALUES (?, ?, ?, ?)';
  db.run(sql, [nama, harga, deskripsi, stok], (err) => {
    callback(err);
  });
}

module.exports = {
  getAllProduk,
  tambahStok,
  tambahProduk
};
