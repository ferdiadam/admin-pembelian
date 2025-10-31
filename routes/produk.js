const express = require('express');
const router = express.Router();
const db = require('../models/db');
const produkModel = require('../models/produkModel');

//  Halaman daftar produk
router.get('/', (req, res) => {
  produkModel.getAllProduk((err, data) => {
    if (err) {
      console.error('Error saat mengambil data produk:', err.message);
      res.status(500).send('Gagal mengambil data produk');
    } else {
      res.render('produk', { title: 'Daftar Produk', produkList: data });
    }
  });
});

//  Form tambah produk baru
router.get('/tambah', (req, res) => {
  res.render('produk_tambah', { title: 'Tambah Produk Baru' });
});

//  Proses tambah produk baru
router.post('/tambah', (req, res) => {
  const { nama, harga, deskripsi, stok } = req.body;
  const sql = 'INSERT INTO produk (nama, harga, deskripsi, stok) VALUES (?, ?, ?, ?)';
  db.run(sql, [nama, harga, deskripsi, stok], (err) => {
    if (err) {
      console.error('Error saat menambah produk:', err.message);
      res.status(500).send('Gagal menambah produk');
    } else {
      console.log(`✅ Produk baru "${nama}" berhasil ditambahkan.`);
      res.redirect('/produk');
    }
  });
});

//  Form tambah stok
router.get('/tambah-stok/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM produk WHERE id = ?', [id], (err, produk) => {
    if (err) {
      console.error('Error saat mengambil data produk:', err.message);
      res.status(500).send('Gagal mengambil data produk');
    } else if (!produk) {
      res.status(404).send('Produk tidak ditemukan');
    } else {
      res.render('produk_tambah_stok', { title: 'Tambah Stok Produk', produk });
    }
  });
});

//  Proses tambah stok
router.post('/tambah-stok/:id', (req, res) => {
  const id = req.params.id;
  const { jumlah } = req.body;

  db.run('UPDATE produk SET stok = stok + ? WHERE id = ?', [jumlah, id], (err) => {
    if (err) {
      console.error('Error saat menambah stok:', err.message);
      res.status(500).send('Gagal menambah stok');
    } else {
      console.log(`📦 Stok produk ID ${id} berhasil ditambah sebanyak ${jumlah}.`);
      res.redirect('/produk');
    }
  });
});

//  Form kurangi stok
router.get('/kurangi-stok/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM produk WHERE id = ?', [id], (err, produk) => {
    if (err) {
      console.error('Error saat mengambil data produk:', err.message);
      res.status(500).send('Gagal mengambil data produk');
    } else if (!produk) {
      res.status(404).send('Produk tidak ditemukan');
    } else {
      res.render('produk_kurangi_stok', { title: 'Kurangi Stok Produk', produk });
    }
  });
});

//  Proses kurangi stok
router.post('/kurangi-stok/:id', (req, res) => {
  const id = req.params.id;
  const { jumlah } = req.body;

  db.get('SELECT stok FROM produk WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error mengambil stok:', err.message);
      return res.status(500).send('Gagal mengambil stok produk');
    }

    if (!row) {
      return res.status(404).send('Produk tidak ditemukan');
    }

    if (row.stok < jumlah) {
      console.warn(`⚠️ Tidak cukup stok untuk produk ID ${id}.`);
      return res.send(`<p>Stok tidak mencukupi untuk pengurangan ini.</p><a href="/produk">Kembali</a>`);
    }

    db.run('UPDATE produk SET stok = stok - ? WHERE id = ?', [jumlah, id], (err2) => {
      if (err2) {
        console.error('Error saat mengurangi stok:', err2.message);
        res.status(500).send('Gagal mengurangi stok');
      } else {
        console.log(`🗑️ Stok produk ID ${id} berkurang sebanyak ${jumlah}.`);
        res.redirect('/produk');
      }
    });
  });
});

//  Hapus produk
router.post('/hapus/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM produk WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error saat menghapus produk:', err.message);
      res.status(500).send('Gagal menghapus produk');
    } else {
      console.log(`🗑️ Produk dengan ID ${id} berhasil dihapus.`);
      res.redirect('/produk');
    }
  });
});

module.exports = router;
