const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config(); // untuk membaca API key dari .env (kalau diperlukan)

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // tambahkan agar chatbot bisa menerima JSON body
app.use(methodOverride('_method'));

// Routes
const indexRoutes = require('./routes/index');
const produkRoutes = require('./routes/produk');
const pembelianRoutes = require('./routes/pembelian');
const chatbotRoutes = require('./routes/chatbot'); // ✅ baru

// Gunakan routes
app.use('/', indexRoutes);
app.use('/produk', produkRoutes);
app.use('/pembelian', pembelianRoutes);
app.use('/chatbot', chatbotRoutes); // ✅ tambahkan ini

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log(`💬 Chatbot tersedia di http://localhost:${PORT}/chatbot`);
});
