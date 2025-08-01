const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = 4000;

// ✅ 2 URL bạn muốn gọi mỗi phút
const TARGET_URL_1 = 'https://sushilaw.io.vn';
const TARGET_URL_2 = 'https://api-call-elearning.onrender.com'; // ← sửa thành URL thứ 2 bạn muốn gọi

// 📅 Tạo cron job chạy mỗi 1 phút
cron.schedule('* * * * *', async () => {
  console.log(`[${new Date().toISOString()}] Running cron job...`);

  try {
    const [res1, res2] = await Promise.all([
      axios.get(TARGET_URL_1),
      axios.get(TARGET_URL_2)
    ]);

    console.log(`✅ Called ${TARGET_URL_1}, status: ${res1.status}`);
    console.log(`✅ Called ${TARGET_URL_2}, status: ${res2.status}`);
  } catch (error) {
    console.error(`❌ Error during API calls: ${error.message}`);
  }
});

app.get('/', (req, res) => {
  res.send('API Caller is running and calling 2 URLs every minute!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
