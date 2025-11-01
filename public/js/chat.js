const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

function addMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.classList.add('msg', sender);
  msg.textContent = text;
  msg.style.padding = '8px';
  msg.style.margin = '6px 0';
  msg.style.borderRadius = '8px';
  msg.style.background = sender === 'user' ? '#e6f3ff' : '#f1f1f1';
  msg.style.textAlign = sender === 'user' ? 'right' : 'left';
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';

  const resp = await fetch('/chatbot/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });

  const data = await resp.json();
  addMessage(data.reply || '(tidak ada jawaban)', 'bot');
});
