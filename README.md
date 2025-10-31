#  Admin Pembelian – Sistem Manajemen Produk & Transaksi

Aplikasi **Admin Pembelian** adalah sistem sederhana berbasis **Node.js (Express.js)** dengan tampilan **EJS (Embedded JavaScript)** dan database **SQLite3**, yang dirancang untuk membantu admin toko dalam mengelola data **produk**, **stok**, serta **pembelian**.

---

##  Fitur Utama

###  Manajemen Produk
- Menampilkan daftar seluruh produk furnitur beserta harga, deskripsi, dan stok.
- Menambahkan produk baru ke dalam database.
- Menambah stok produk yang sudah ada.
- Mengurangi stok produk.
- Menghapus produk dari sistem.

###  Manajemen Pembelian
- Melakukan input pembelian produk oleh admin.
- Otomatis mengurangi stok produk saat pembelian dilakukan.
- Menampilkan daftar transaksi pembelian lengkap dengan tanggal, jumlah, total harga, dan status.
- Fitur **batalkan pembelian**, yang mengembalikan stok secara otomatis.

###  Teknologi yang Digunakan
| Teknologi | Fungsi |
|------------|--------|
| **Node.js** | Server utama |
| **Express.js** | Framework backend |
| **EJS** | Template engine untuk tampilan dinamis |
| **SQLite3** | Database lokal (ringan dan cepat) |
| **CSS Vanilla** | Desain sederhana dan responsif |
| **JavaScript (Client)** | Interaksi tambahan di sisi pengguna |

---

##  Struktur Folder

ADMIN-PEMBELIAN/
├── database/
│ ├── app.db
│ └── init.sql
│
├── models/
│ ├── db.js
│ ├── pembelianModel.js
│ └── produkModel.js
│
├── public/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── main.js
│
├── routes/
│ ├── index.js
│ ├── pembelian.js
│ └── produk.js
│
├── views/
│ ├── layout.ejs
│ ├── index.ejs
│ ├── pembelian.ejs
│ ├── pembelian_tambah.ejs
│ ├── produk.ejs
│ ├── produk_tambah.ejs
│ ├── produk_tambah_stok.ejs
│ └── produk_kurangi_stok.ejs
│
├── package.json
├── package-lock.json
├── server.js
└── README.md


##  Cara Menjalankan Aplikasi 
1. Clone atau download project
git clone https://github.com/username/admin-pembelian.git
cd admin-pembelian

2. Install dependencies
npm install

3. Inisialisasi Database
Aplikasi menggunakan file SQL untuk membuat struktur tabel dan data awal.
Jalankan perintah ini di folder database/:
sqlite3 app.db < init.sql

4. Jalankan server
npm start

Atau langsung:
node server.js

5. Akses aplikasi di browser
http://localhost:3000

## Struktur Database
Tabel produk
Kolom	Tipe	Keterangan
id	INTEGER (PK)	ID unik produk
nama	TEXT	Nama produk
harga	INTEGER	Harga satuan
deskripsi	TEXT	Deskripsi produk
stok	INTEGER	Jumlah stok tersedia

Tabel pembelian
Kolom	Tipe	Keterangan
id	INTEGER (PK)	ID transaksi
produk_id	INTEGER (FK)	ID produk yang dibeli
jumlah	INTEGER	Jumlah pembelian
total_harga	INTEGER	Total harga transaksi
tanggal	TIMESTAMP	Tanggal transaksi
status	TEXT	Status (SUKSES / DIBATALKAN)

## Alur Kerja Sistem
1. Admin login ke dashboard utama.

2. Admin dapat membuka halaman Daftar Produk.

3. Admin bisa:
### Tambah produk baru.
### Tambah stok produk lama.
### Kurangi stok jika barang rusak / keluar gudang.
### Hapus produk.

4. Pada menu Pembelian, admin bisa melakukan transaksi pembelian.

5. Sistem otomatis:
### Mengurangi stok dari tabel produk.
### Mencatat transaksi ke tabel pembelian.

6. Jika pembelian dibatalkan, stok produk akan dikembalikan otomatis.

## Tampilan Antarmuka (UI)
Tampilan sederhana dan mudah digunakan:
1. Dashboard menampilkan menu utama.
2. Halaman Produk untuk melihat dan mengelola stok.
3. Halaman Pembelian untuk mencatat transaksi.
4.  Desain responsif dengan kombinasi warna abu-abu, biru, dan hijau lembut.

## Developer Notes
1. Proyek ini dirancang untuk keperluan Pre-Interview Test for Web Developer & IT Support.
2. Struktur modular memudahkan pengembangan fitur baru.
3. Bisa dikembangkan lebih lanjut dengan:
### Login admin
### Riwayat stok keluar/masuk
### Pencarian & filter produk

## Lisensi
Proyek ini bersifat open source dan dapat digunakan untuk Pre-Interview Test for Web Developer & IT Suppor dan pengembangan pribadi.