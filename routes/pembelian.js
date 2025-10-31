const express = require('express');
const router = express.Router();
const pembelianModel = require('../models/pembelianModel');
const produkModel = require('../models/produkModel');

// Tampilkan daftar pembelian
router.get('/', (req, res) => {
  pembelianModel.getAllPembelian((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Gagal mengambil data pembelian');
    } else {
      res.render('pembelian', { title: 'Daftar Pembelian', pembelianList: data });
    }
  });
});

// Form tambah pembelian
router.get('/tambah', (req, res) => {
  produkModel.getAllProduk((err, produk) => {
    if (err) return res.status(500).send('Gagal mengambil produk');
    res.render('pembelian_tambah', { title: 'Tambah Pembelian', produkList: produk });
  });
});

// Proses tambah pembelian
router.post('/tambah', (req, res) => {
  const { produk_id, jumlah } = req.body;
  pembelianModel.tambahPembelian(produk_id, parseInt(jumlah), (err) => {
    if (err) {
      console.error(err);
      res.send(`<p>${err}</p><a href="/pembelian/tambah">Kembali</a>`);
    } else {
      res.redirect('/pembelian');
    }
  });
});

// Batalkan pembelian
router.post('/batal/:id', (req, res) => {
  pembelianModel.cancelPembelian(req.params.id, (err) => {
    if (err) {
      console.error(err);
      res.send(`<p>${err}</p><a href="/pembelian">Kembali</a>`);
    } else {
      res.redirect('/pembelian');
    }
  });
});

module.exports = router;
