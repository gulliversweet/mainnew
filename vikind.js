const TelegramBot = require('node-telegram-bot-api');

// Замените на ваш токен
const token = '8174173122:AAE51OAaasxy2-6XCX4JaPKVI27B6yWXbn0'; 
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const languageCode = msg.from.language_code || `user_${userId}`; // Получаем язык пользователя
    const appUrl = `https://aquamarine-centaur-3cd890.netlify.app?language_code=${languageCode}`; // Добавляем language_code в URL

    // Создание кнопки
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Открыть приложение", web_app: { url: appUrl } }
                ]
            ]
        }
    }

    // Отправка сообщения с кнопкой
    bot.sendMessage(chatId, "Привет! Нажми на кнопку ниже, чтобы открыть приложение.", options);
});


