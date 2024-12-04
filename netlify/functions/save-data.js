// netlify/functions/save-data.js

exports.handler = async function(event, context) {
    try {
        // Получаем данные из тела запроса
        const data = JSON.parse(event.body);
        console.log('Полученные данные:', data); // Логируем полученные данные

        // Здесь вы можете добавить код для сохранения данных
        // Например, сохранить в файл (для теста) или в базу данных

        // Ответ на клиента
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Данные успешно сохранены' })
        };
    } catch (error) {
        // Обработка ошибок
        console.error('Ошибка при сохранении данных:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Ошибка при сохранении данных' })
        };
    }
};
