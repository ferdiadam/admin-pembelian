#  Admin Pembelian Furnitur + Chatbot AI (Gemini)

Aplikasi **Admin Pembelian Furnitur** adalah sistem manajemen stok dan transaksi berbasis **Node.js (Express.js)** dengan **EJS** dan **SQLite3**, dilengkapi dengan **Chatbot AI (Gemini)** yang membantu admin dalam menjawab pertanyaan seputar produk, stok, dan pembelian.

---

##  Fitur Utama

###  Manajemen Produk
- Melihat daftar semua produk furnitur lengkap dengan harga, deskripsi, dan stok.
- Menambahkan produk baru ke dalam database.
- Menambah atau mengurangi stok produk.
- Menghapus produk dari sistem.

###  Manajemen Pembelian
- Admin dapat mencatat transaksi pembelian produk.
- Stok otomatis berkurang saat pembelian dilakukan.
- Melihat daftar pembelian dengan tanggal, jumlah, total harga, dan status transaksi.
- Fitur **batalkan pembelian**, yang otomatis mengembalikan stok produk.

###  Chatbot AI (Gemini)
- Terintegrasi langsung dengan **Google Gemini API**.
- Dapat menjawab pertanyaan seputar data toko, seperti:
  - “Apa saja meja yang tersedia?”
  - “Berapa stok kursi kantor?”
  - “Barang apa saja stoknya di bawah 10?”
  - “Berapa total nilai stok di gudang?”
- Chatbot juga bisa memberikan jawaban umum terkait administrasi pembelian furnitur.

---

##  Teknologi yang Digunakan

| Teknologi | Fungsi |
|------------|--------|
| **Node.js** | Server utama |
| **Express.js** | Framework backend |
| **EJS (Embedded JavaScript)** | Template engine untuk tampilan |
| **SQLite3** | Database lokal ringan dan cepat |
| **Google Gemini API** | Layanan AI untuk Chatbot |
| **CSS Vanilla** | Desain sederhana dan responsif |
| **JavaScript (Client-side)** | Interaksi UI dan form |

---

##  Struktur Folder

ADMIN-PEMBELIAN/
├── database/
│ ├── app.db
│ └── init.sql
│
├── models/
│ ├── db.js
│ ├── produkModel.js
│ └── pembelianModel.js
│
├── public/
│ ├── css/
│ │ ├── style.css
│ │ └── chat.css
│ └── js/
│ ├── main.js
│ └── chat.js
│
├── routes/
│ ├── index.js
│ ├── produk.js
│ ├── pembelian.js
│ └── chatbot.js
│
├── views/
│ ├── layout.ejs
│ ├── index.ejs
│ ├── produk.ejs
│ ├── produk_tambah.ejs
│ ├── produk_tambah_stok.ejs
│ ├── produk_kurangi_stok.ejs
│ ├── pembelian.ejs
│ ├── pembelian_tambah.ejs
│ └── chatbot.ejs
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md


##  Struktur Database

###  Tabel `produk`
| Kolom | Tipe | Keterangan |
|--------|------|------------|
| id | INTEGER (PK) | ID unik produk |
| nama | TEXT | Nama produk |
| harga | INTEGER | Harga satuan |
| deskripsi | TEXT | Deskripsi produk |
| stok | INTEGER | Jumlah stok tersedia |

### 🧾 Tabel `pembelian`
| Kolom | Tipe | Keterangan |
|--------|------|------------|
| id | INTEGER (PK) | ID transaksi |
| produk_id | INTEGER (FK) | ID produk yang dibeli |
| jumlah | INTEGER | Jumlah pembelian |
| total_harga | INTEGER | Total harga transaksi |
| tanggal | TIMESTAMP | Tanggal pembelian |
| status | TEXT | Status (SUKSES / DIBATALKAN) |

---

##  Cara Menjalankan Aplikasi

1. **Clone atau download project**
   ```bash
   git clone https://github.com/username/admin-pembelian.git
   cd admin-pembelian

2. **Install dependencies**
    npm install

3. **Siapkan file .env**
    GEMINI_API_KEY=ISI_DENGAN_API_KEY_KAMU
PORT=3000

4. **Inisialisasi Database**
    Jalankan perintah di folde database/:
    sqlite3 app.db < init.sql

5. **Jalankan Server**
    npm start
    atau
    node server.js

6. **Akses di Browser**
    http://localhost:3000
    
## Contoh Interaksi Chatbot

User: “Apa saja meja yang tersedia?”
AI:

🪑 Meja Makan Kayu Jati — Stok: 10
🪑 Meja Kerja Kantor — Stok: 12
🪑 Meja TV Minimalis — Stok: 14

User: “Total nilai stok di gudang?”
AI:

💰 Total nilai semua stok di gudang adalah Rp 24.300.000

User: “Barang apa stoknya di bawah 10?”
AI:

⚠️ Produk dengan stok di bawah 10 unit:

- Lemari Pakaian 3 Pintu (8 unit)

- Tempat Tidur Queen Size (7 unit)

## 🧩 Alur Kerja Sistem

1. Admin membuka dashboard utama.

2. Dapat menambah, mengubah, atau menghapus produk.

3. Melakukan transaksi pembelian dari menu pembelian.

4. Sistem otomatis mengurangi stok dan mencatat transaksi.

5. Jika pembelian dibatalkan, stok akan otomatis dikembalikan.

6. Chatbot AI dapat membantu menjawab pertanyaan tentang stok, harga, atau pembelian.

## 🧱 Catatan Developer

- Proyek ini dibuat untuk keperluan Pretest Web Developer & IT Support.

- Struktur modular dan mudah dikembangkan.

- Dapat dikembangkan lebih lanjut dengan fitur:

- Login admin

- Pencarian dan filter produk

- Integrasi API eksternal (mis. laporan atau grafik stok)

📜 Lisensi

Proyek ini bersifat open source dan dapat digunakan untuk keperluan pembelajaran atau ujian pretest teknis.