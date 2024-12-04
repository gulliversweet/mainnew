// netlify/functions/save-data.js

const mongoose = require('mongoose');

// Строка подключения к MongoDB (здесь ваша строка подключения)
const mongoURI = "mongodb+srv://bits12my:<katsG#&.fh*?3j5>@cluster0.pld4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Создание схемы данных
const DataSchema = new mongoose.Schema({
    miniApp: String,
    mau: String,
    cost: String,
    timestamp: String
});

const Data = mongoose.model('Data', DataSchema);

exports.handler = async function(event, context) {
    // Подключаемся к базе данных
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    const data = JSON.parse(event.body);  // Получаем данные из запроса

    try {
        // Сохраняем данные в MongoDB
        const newData = new Data(data);
        await newData.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Данные успешно сохранены в MongoDB' })
        };
    } catch (error) {
        console.error('Ошибка при сохранении данных в MongoDB:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Ошибка при сохранении данных в MongoDB' })
        };
    }
};
