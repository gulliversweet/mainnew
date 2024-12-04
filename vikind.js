const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Подключение CORS

const app = express(); // Создание объекта Express
const token = '8174173122:AAE51OAaasxy2-6XCX4JaPKVI27B6yWXbn0'; // Ваш Telegram-токен
const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json()); // Настройка body-parser

// Настройка CORS (вставляем после создания объекта app)
app.use(cors({
    origin: 'https://aquamarine-centaur-3cd890.netlify.app' // Ваш Netlify-домен
}));

// Telegram: команда /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'unknown';
    const userId = msg.from.id;

    const appUrl = 'https://aquamarine-centaur-3cd890.netlify.app'; // Netlify-домен

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Открыть приложение', web_app: { url: `${appUrl}?user_id=${userId}&username=${username}` } }]
            ]
        }
    };

    bot.sendMessage(chatId, 'Привет! Нажми на кнопку ниже, чтобы открыть приложение.', options);
});

// Эндпоинт для обработки данных от мини-приложения
app.post('/save-data', (req, res) => {
    const data = req.body;
    console.log('Получены данные от клиента:', data);
    res.status(200).send({ message: 'Данные успешно сохранены' });
});

// Запуск сервера
app.listen(process.env.PORT || 3001, () => {
    console.log(`Сервер запущен на порту ${process.env.PORT || 3001}`);
});
