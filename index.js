const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

// ✅ URL bạn muốn gọi mỗi phút
const TARGET_URL = 'https://api-call-elearning.onrender.com';

// 📅 Tạo cron job chạy mỗi 1 phút
cron.schedule('* * * * *', async () => {
  try {
    const response = await axios.get(TARGET_URL);
    console.log(`[${new Date().toISOString()}] Called ${TARGET_URL}, status: ${response.status}`);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error calling ${TARGET_URL}:`, error.message);
  }
});

app.get('/', (req, res) => {
  res.send('API Caller is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
