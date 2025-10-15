const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Логирование IP для каждого запроса
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`Посетитель с IP: ${ip} зашёл в приложение`);
    next();
});

// Сервируем статические файлы (включая index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Основной роут — отдаём index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
