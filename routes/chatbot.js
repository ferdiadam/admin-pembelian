const express = require('express');
const router = express.Router();
require('dotenv').config();

// Chatbot page
router.get('/', (req, res) => {
  res.render('chatbot', { title: 'Chatbot AI Sederhana' });
});

// API endpoint untuk chat
router.post('/api', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.json({ reply: 'Tolong ketik pesan terlebih dahulu.' });

  try {
    // Gunakan Ollama lokal (default, tanpa API key)
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || 'llama3.1',
        stream: false,
        messages: [{ role: 'user', content: message }]
      })
    });
    const data = await response.json();
    const reply = data?.message?.content || '(tidak ada jawaban)';
    res.json({ reply });
  } catch (err) {
    console.error('Chatbot error:', err.message);
    res.json({ reply: `Terjadi kesalahan: ${err.message}` });
  }
});

module.exports = router;
