const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

// Fungsi untuk menambahkan pesan ke jendela chat
function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.classList.add('msg', sender);
  msg.innerHTML = `<b>${sender === 'user' ? 'Anda' : 'Gemini'}:</b> ${text}`;
  msg.style.margin = '8px 0';
  msg.style.padding = '10px 14px';
  msg.style.borderRadius = '10px';
  msg.style.maxWidth = '80%';
  msg.style.wordWrap = 'break-word';
  msg.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
  msg.style.backgroundColor = sender === 'user' ? '#d9eafc' : '#f3f3f3';
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Event saat form dikirim
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, 'user');
  input.value = '';

  try {
    const resp = await fetch('/chatbot/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }) // hanya kirim pesan
    });

    const data = await resp.json();
    addMessage(data.reply || '(tidak ada jawaban)', 'bot');
  } catch (err) {
    addMessage(`⚠️ Terjadi kesalahan: ${err.message}`, 'bot');
  }
});
