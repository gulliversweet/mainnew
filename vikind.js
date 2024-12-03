const TelegramBot = require('node-telegram-bot-api');

// Замените на ваш токен
const token = '8174173122:AAE51OAaasxy2-6XCX4JaPKVI27B6yWXbn0'; 
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const appUrl = `https://aquamarine-centaur-3cd890.netlify.app`; // URL приложения

    // Создание кнопки
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Открыть приложение", web_app: { url: appUrl } }
                ]
            ]
        }
    };

    // Отправка сообщения с кнопкой
    bot.sendMessage(chatId, "Привет! Нажми на кнопку ниже, чтобы открыть приложение.", options);
});
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const app = express();
const token = '8174173122:AAE51OAaasxy2-6XCX4JaPKVI27B6yWXbn0'; 
const bot = new TelegramBot(token, { polling: true });

app.use(bodyParser.json());

// Логика Telegram-бота
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'unknown';
    const userId = msg.from.id;

    const appUrl = `const appUrl = `https://aquamarine-centaur-3cd890.netlify.app?user_id=${userId}&username=${username}`;

    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Открыть приложение", web_app: { url: appUrl } }]
            ]
        }
    };

    bot.sendMessage(chatId, "Привет! Нажми на кнопку ниже, чтобы открыть приложение.", options);
});

// Эндпоинт для получения данных
app.post('/save-data', (req, res) => {
    const { miniApp, mau, cost, timestamp, userId, username } = req.body;

    const log = {
        miniApp,
        mau,
        cost,
        timestamp,
        userId,
        username
    };

    // Сохраняем данные в файл
    fs.appendFileSync('data.json', JSON.stringify(log) + '\n', 'utf8');
    console.log('Получены данные:', log);

    res.status(200).send({ message: 'Данные успешно сохранены' });
});

// Запуск сервера
app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен!');
});
