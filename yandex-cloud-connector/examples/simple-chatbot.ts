import { YandexCloudConnector, Message } from '../src';
import * as readline from 'readline';

// Проверка наличия переменных окружения
if (!process.env.YANDEX_CLOUD_API_KEY || !process.env.YANDEX_CLOUD_FOLDER_ID) {
  console.error('Ошибка: Не заданы переменные окружения YANDEX_CLOUD_API_KEY и YANDEX_CLOUD_FOLDER_ID');
  console.error('Пример запуска:');
  console.error('YANDEX_CLOUD_API_KEY=ваш_ключ YANDEX_CLOUD_FOLDER_ID=ваш_id ts-node simple-chatbot.ts');
  process.exit(1);
}

// Инициализация коннектора YandexCloud
const connector = new YandexCloudConnector({
  apiKey: process.env.YANDEX_CLOUD_API_KEY,
  folderId: process.env.YANDEX_CLOUD_FOLDER_ID,
  modelId: 'yandexgpt-lite', // Используем облегченную модель для быстрых ответов
  temperature: 0.7
});

// Системный промпт для настройки поведения модели
const systemPrompt = `Ты - дружелюбный и полезный ассистент. 
Ты должен отвечать на вопросы пользователя кратко и по существу. 
Если ты не знаешь ответ на вопрос, честно признайся в этом.
Отвечай преимущественно на русском языке, если вопрос задан на русском.`;

// Создаем интерфейс для чтения ввода пользователя
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// История сообщений для контекста беседы
const messageHistory: Message[] = [];

console.log('Простой чат-бот на основе YandexGPT (введите "exit" для выхода)');
console.log('-------------------------------------------------------------');

// Функция для обработки диалога
async function processUserInput(userInput: string) {
  if (userInput.toLowerCase() === 'exit') {
    console.log('До свидания!');
    rl.close();
    return;
  }

  // Добавляем сообщение пользователя в историю
  messageHistory.push({
    role: 'user',
    content: userInput
  });

  try {
    console.log('YandexGPT думает...');
    
    // Отправляем запрос к API и обрабатываем потоковый ответ
    const response = await connector.createCompletion(
      systemPrompt,
      messageHistory
    );

    let fullResponse = '';
    process.stdout.write('YandexGPT: ');
    
    // Обработка потокового ответа
    for await (const chunk of response) {
      process.stdout.write(chunk.text);
      fullResponse += chunk.text;
      
      if (chunk.isComplete) {
        console.log('\n');
      }
    }

    // Добавляем ответ помощника в историю
    messageHistory.push({
      role: 'assistant',
      content: fullResponse
    });

    // Ограничиваем историю диалога для экономии токенов
    if (messageHistory.length > 10) {
      // Удаляем самые старые сообщения, но сохраняем системное сообщение
      messageHistory.splice(0, 2); // Удаляем пару сообщений (вопрос+ответ)
    }

    // Запрашиваем следующий ввод
    rl.question('Вы: ', processUserInput);
  } catch (error) {
    console.error('Произошла ошибка:', error);
    rl.question('Вы: ', processUserInput);
  }
}

// Запускаем диалог
rl.question('Вы: ', processUserInput);