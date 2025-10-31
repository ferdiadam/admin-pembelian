-- Hapus tabel lama dulu agar tidak bentrok
DROP TABLE IF EXISTS produk;
DROP TABLE IF EXISTS pembelian;
DROP TABLE IF EXISTS stok;

-- Tabel produk
CREATE TABLE produk (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nama TEXT NOT NULL,
  harga INTEGER NOT NULL,
  deskripsi TEXT,
  stok INTEGER DEFAULT 0
);

-- Tabel pembelian
CREATE TABLE pembelian (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produk_id INTEGER NOT NULL,
  jumlah INTEGER NOT NULL,
  total_harga INTEGER NOT NULL,
  tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'SUKSES',
  FOREIGN KEY (produk_id) REFERENCES produk (id)
);

-- Isi data produk furnitur
INSERT INTO produk (nama, harga, deskripsi, stok) VALUES
('Meja Makan Kayu Jati', 2500000, 'Meja makan 6 kursi bahan kayu jati solid', 10),
('Kursi Tamu Minimalis', 1500000, 'Set kursi tamu 4 dudukan finishing natural', 15),
('Lemari Pakaian 3 Pintu', 3200000, 'Lemari pakaian kayu mahoni 3 pintu dengan cermin', 8),
('Tempat Tidur Queen Size', 4000000, 'Rangka tempat tidur kayu jati ukuran queen', 7),
('Rak Buku Serbaguna', 1200000, 'Rak buku tinggi 180cm dengan 5 susun', 20),
('Meja Kerja Kantor', 1800000, 'Meja kerja dengan laci dan ruang penyimpanan', 12),
('Kursi Kantor Ergonomis', 1100000, 'Kursi kantor putar dengan sandaran tinggi', 18),
('Meja TV Minimalis', 1300000, 'Meja TV panjang 160cm warna coklat tua', 14),
('Buffet Dapur Kayu', 2800000, 'Buffet dapur dengan 3 laci dan 2 pintu kaca', 9),
('Nakas Kamar Tidur', 700000, 'Nakas kecil samping tempat tidur dengan 1 laci', 25);
