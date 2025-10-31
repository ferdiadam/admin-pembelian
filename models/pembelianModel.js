const db = require('./db');

// Ambil semua pembelian
function getAllPembelian(callback) {
  const sql = `
    SELECT pb.id, p.nama AS produk, pb.jumlah, pb.total_harga, pb.tanggal, pb.status
    FROM pembelian pb
    JOIN produk p ON pb.produk_id = p.id
    ORDER BY pb.id DESC
  `;
  db.all(sql, [], (err, rows) => callback(err, rows));
}

// Tambah pembelian baru
function tambahPembelian(produk_id, jumlah, callback) {
  db.get('SELECT harga, stok FROM produk WHERE id = ?', [produk_id], (err, produk) => {
    if (err) return callback('Gagal mengambil data produk');
    if (!produk) return callback('Produk tidak ditemukan');

    const { harga, stok } = produk;

    if (stok < jumlah) return callback('Stok tidak mencukupi');

    const total = harga * jumlah;

    // Kurangi stok produk
    db.run('UPDATE produk SET stok = stok - ? WHERE id = ?', [jumlah, produk_id], (err2) => {
      if (err2) return callback('Gagal memperbarui stok');

      // Tambahkan pembelian
      db.run(
        `INSERT INTO pembelian (produk_id, jumlah, total_harga, status)
         VALUES (?, ?, ?, 'SUKSES')`,
        [produk_id, jumlah, total],
        (err3) => callback(err3)
      );
    });
  });
}

// Batalkan pembelian dan kembalikan stok
function cancelPembelian(id, callback) {
  db.get('SELECT produk_id, jumlah, status FROM pembelian WHERE id = ?', [id], (err, pembelian) => {
    if (err || !pembelian) return callback('Data pembelian tidak ditemukan');
    if (pembelian.status === 'BATAL') return callback('Pembelian sudah dibatalkan');

    db.run('UPDATE pembelian SET status = ? WHERE id = ?', ['BATAL', id], (err2) => {
      if (err2) return callback('Gagal mengubah status');

      db.run('UPDATE produk SET stok = stok + ? WHERE id = ?', [pembelian.jumlah, pembelian.produk_id], (err3) => {
        if (err3) return callback('Gagal mengembalikan stok');
        callback(null);
      });
    });
  });
}

module.exports = {
  getAllPembelian,
  tambahPembelian,
  cancelPembelian
};
