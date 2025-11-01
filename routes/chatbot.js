const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

// Koneksi ke SQLite
const db = new sqlite3.Database("./database/app.db", (err) => {
  if (err) console.error("Gagal konek ke database:", err.message);
  else console.log("✅ Terhubung ke database SQLite (app.db).");
});

// Halaman chatbot
router.get("/", (req, res) => {
  res.render("chatbot", { title: "Chatbot Admin Pembelian Furnitur" });
});

// Fungsi pencarian produk — sekarang lebih pintar
function findProdukInMessage(text) {
  return new Promise((resolve, reject) => {
    const keyword = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // hapus tanda baca
      .split(" ")
      .filter((w) => w.length > 2)[0]; // ambil kata kunci utama

    if (!keyword) return resolve([]);

    db.all(
      "SELECT * FROM produk WHERE LOWER(nama) LIKE ? OR LOWER(deskripsi) LIKE ?",
      [`%${keyword}%`, `%${keyword}%`],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}

// Endpoint chatbot
router.post("/api", async (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "")
    return res.json({ reply: "Silakan ketik pesan terlebih dahulu." });

  try {
    // 1️⃣ Cari produk di database
    const produkDitemukan = await findProdukInMessage(message);

    if (produkDitemukan.length > 0) {
      // Jika lebih dari satu produk ditemukan
      if (produkDitemukan.length > 1) {
        const daftarProduk = produkDitemukan
          .map(
            (p) =>
              `• ${p.nama} — Rp ${p.harga.toLocaleString()} (Stok: ${p.stok})`
          )
          .join("\n");
        const jawaban = `🪵 Berikut beberapa produk yang sesuai dengan permintaan kamu:\n\n${daftarProduk}\n\nSilakan sebutkan nama produk yang ingin kamu lihat lebih detail.`;
        return res.json({ reply: jawaban });
      }

      // Jika hanya satu produk ditemukan
      const p = produkDitemukan[0];
      const jawaban = `
📦 **Produk:** ${p.nama}
📦 **Stok:** ${p.stok} unit
💰 **Harga:** Rp ${p.harga.toLocaleString()}
📝 **Deskripsi:** ${p.deskripsi}
      `.trim();
      return res.json({ reply: jawaban });
    }

    // 2️⃣ Jika tidak ditemukan di DB, teruskan ke Gemini
    const systemPrompt = `
Kamu adalah asisten AI untuk sistem administrasi pembelian furnitur.
Jawab pertanyaan hanya seputar stok, produk, harga, atau pembelian.
Jika pertanyaan terkait data produk tetapi tidak ditemukan, beri tahu dengan sopan bahwa data tidak tersedia.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "model",
              parts: [{ text: systemPrompt }],
            },
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.json({ reply: `⚠️ ${data.error.message}` });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "(AI tidak memberikan jawaban)";
    res.json({ reply });
  } catch (err) {
    console.error("Chatbot Error:", err.message);
    res.json({ reply: `Terjadi kesalahan: ${err.message}` });
  }
});

module.exports = router;
