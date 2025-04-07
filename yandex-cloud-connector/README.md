# Yandex Cloud Connector

Библиотека для интеграции с сервисами искусственного интеллекта Yandex Cloud, включая YandexGPT.

## Установка

```bash
npm install yandex-cloud-connector
```

## Начало работы

Для использования библиотеки необходим API-ключ и Folder ID от Yandex Cloud. Подробнее о получении этих данных смотрите в [руководстве по настройке](./docs/yandexcloud-guide.md).

### Пример использования

```typescript
import { YandexCloudConnector } from 'yandex-cloud-connector';

// Инициализация коннектора
const connector = new YandexCloudConnector({
  apiKey: 'ваш-api-ключ',
  folderId: 'ваш-folder-id',
  modelId: 'yandexgpt' // или другая модель: 'yandexgpt-lite', 'summarization'
});

// Создание запроса к модели
async function generateText() {
  try {
    const response = await connector.createCompletion(
      'Ты - полезный ассистент.', // системный промпт
      [{ role: 'user', content: 'Какие есть интересные места в Москве?' }]
    );
    
    // Обработка потокового ответа
    for await (const chunk of response) {
      console.log(chunk.text);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

generateText();
```

## Документация

- [Руководство по настройке](./docs/yandexcloud-guide.md)
- [Примеры промптов](./docs/yandexcloud-examples.md)
- [API Reference](./docs/api-reference.md)

## Доступные модели

- `yandexgpt` - полная версия YandexGPT для сложных задач и генерации кода
- `yandexgpt-lite` - облегченная версия для быстрых ответов
- `summarization` - специализированная модель для суммаризации текстов

## Примеры

В каталоге [examples](./examples) вы найдете примеры использования библиотеки:

1. **Simple Chatbot** - простой консольный чат-бот на основе YandexGPT
   ```bash
   # Запуск примера
   YANDEX_CLOUD_API_KEY=ваш-ключ YANDEX_CLOUD_FOLDER_ID=ваш-id ts-node examples/simple-chatbot.ts
   ```

2. **Text Summarization** - утилита для суммаризации текстовых файлов
   ```bash
   # Запуск примера
   YANDEX_CLOUD_API_KEY=ваш-ключ YANDEX_CLOUD_FOLDER_ID=ваш-id ts-node examples/text-summarization.ts path/to/text-file.txt
   ```

## Для разработчиков

### Настройка окружения

```bash
# Клонирование репозитория
git clone <репозиторий>
cd yandex-cloud-connector

# Установка зависимостей
npm install

# Сборка библиотеки
npm run build

# Запуск тестов
npm test
```

### Переменные окружения для тестирования

Для запуска интеграционных тестов с реальным API необходимо настроить переменные окружения:

```bash
export YANDEX_CLOUD_API_KEY=ваш-ключ
export YANDEX_CLOUD_FOLDER_ID=ваш-id
```

## Лицензия

MIT