# API Reference

Полная документация API для библиотеки `yandex-cloud-connector`.

## YandexCloudConnector

Основной класс для взаимодействия с API Yandex Cloud.

### Конструктор

```typescript
constructor(options: YandexCloudConnectorOptions)
```

Создает новый экземпляр коннектора для работы с API Yandex Cloud.

#### Параметры

- **options** (`YandexCloudConnectorOptions`) - объект настроек коннектора:
  - **apiKey** (`string`) - API-ключ сервисного аккаунта Yandex Cloud.
  - **folderId** (`string`) - Идентификатор каталога Yandex Cloud.
  - **modelId?** (`YandexCloudModelId`) - Идентификатор модели. По умолчанию `'yandexgpt'`.
  - **temperature?** (`number`) - Температура генерации (значение от 0 до 1). По умолчанию `0.7`.
  - **maxTokens?** (`number`) - Максимальное количество токенов в ответе. Значение зависит от модели.

#### Примеры использования

```typescript
// Минимальная конфигурация
const connector = new YandexCloudConnector({
  apiKey: 'your-api-key',
  folderId: 'your-folder-id'
});

// Расширенная конфигурация
const connector = new YandexCloudConnector({
  apiKey: 'your-api-key',
  folderId: 'your-folder-id',
  modelId: 'yandexgpt-lite',
  temperature: 0.5,
  maxTokens: 4000
});
```

### Методы

#### createCompletion

```typescript
async createCompletion(
  systemPrompt?: string,
  messages: Message[] = [],
  options: Partial<YandexCloudConnectorOptions> = {}
): Promise<AsyncGenerator<YandexCloudChunk, void, unknown>>
```

Создает запрос к модели и возвращает асинхронный генератор для потокового получения ответа.

##### Параметры

- **systemPrompt?** (`string`) - Системный промпт, определяющий поведение модели.
- **messages** (`Message[]`) - Массив сообщений с историей диалога.
- **options** (`Partial<YandexCloudConnectorOptions>`) - Дополнительные настройки запроса:
  - **modelId?** (`YandexCloudModelId`) - Идентификатор модели для этого запроса.
  - **temperature?** (`number`) - Температура генерации для этого запроса.
  - **maxTokens?** (`number`) - Максимальное количество токенов для этого запроса.

##### Возвращаемое значение

- **AsyncGenerator<YandexCloudChunk>** - Асинхронный генератор, возвращающий части ответа в формате:
  - **text** (`string`) - Текстовая часть ответа.
  - **isComplete** (`boolean`) - Флаг, указывающий, является ли эта часть последней.

##### Примеры использования

```typescript
// Потоковый вывод ответа
const response = await connector.createCompletion(
  'Ты - полезный ассистент.',
  [{ role: 'user', content: 'Расскажи про Москву' }]
);

for await (const chunk of response) {
  console.log(chunk.text); // Вывод частей ответа по мере их получения
  
  if (chunk.isComplete) {
    console.log('Ответ завершен');
  }
}
```

#### createCompletionSync

```typescript
async createCompletionSync(
  systemPrompt?: string,
  messages: Message[] = [],
  options: Partial<YandexCloudConnectorOptions> = {}
): Promise<string>
```

Создает синхронный запрос к модели и возвращает полный ответ одной строкой.

##### Параметры

Те же параметры, что и у `createCompletion`.

##### Возвращаемое значение

- **string** - Полный ответ модели.

##### Примеры использования

```typescript
// Получение полного ответа сразу
const fullResponse = await connector.createCompletionSync(
  'Ты - полезный ассистент.',
  [{ role: 'user', content: 'Расскажи про Москву' }]
);

console.log(fullResponse);
```

#### summarize

```typescript
async summarize(
  text: string,
  options: Partial<YandexCloudConnectorOptions> = {}
): Promise<string>
```

Создает запрос для суммаризации текста, используя модель `summarization`.

##### Параметры

- **text** (`string`) - Текст для суммаризации.
- **options** (`Partial<YandexCloudConnectorOptions>`) - Дополнительные настройки запроса (аналогично предыдущим методам).

##### Возвращаемое значение

- **string** - Суммаризированный текст.

##### Примеры использования

```typescript
// Суммаризация длинного текста
const longText = `
  Длинная статья или документ, который нужно суммаризировать...
  (много текста)
`;

const summary = await connector.summarize(longText);
console.log(summary);
```

## Типы

### Message

```typescript
interface Message {
  role: MessageRole;
  content: string;
}
```

Представляет сообщение в диалоге с моделью.

- **role** (`MessageRole`) - Роль отправителя сообщения (`'system'`, `'user'` или `'assistant'`).
- **content** (`string`) - Содержимое сообщения.

### YandexCloudModelId

```typescript
type YandexCloudModelId = 'yandexgpt' | 'yandexgpt-lite' | 'summarization';
```

Идентификаторы доступных моделей YandexCloud.

### YandexCloudChunk

```typescript
interface YandexCloudChunk {
  text: string;
  isComplete: boolean;
}
```

Представляет часть потокового ответа модели.
- **text** (`string`) - Текст части ответа.
- **isComplete** (`boolean`) - Флаг завершения ответа.

## Константы

### yandexCloudModels

```typescript
const yandexCloudModels: Record<YandexCloudModelId, {
  id: YandexCloudModelId;
  name: string;
  description: string;
  maxTokens: number;
  streamingSupported: boolean;
}>
```

Содержит информацию о доступных моделях YandexCloud.

## Обработка ошибок

Библиотека использует стандартные исключения JavaScript/TypeScript для обработки ошибок.

### Типичные ошибки

- **Отсутствие необходимых параметров при инициализации**:
  ```
  Требуется указать API ключ (apiKey)
  Требуется указать ID каталога (folderId)
  ```

- **Ошибки API YandexCloud**:
  ```
  Ошибка API YandexCloud: {сообщение об ошибке}
  ```

- **Ошибки моделей**:
  ```
  Неподдерживаемая модель: {идентификатор модели}
  Модель {идентификатор модели} не поддерживает потоковую передачу
  ```

### Пример обработки ошибок

```typescript
try {
  const response = await connector.createCompletion(
    'Системный промпт',
    [{ role: 'user', content: 'Вопрос пользователя' }]
  );
  
  // Обработка ответа...
  
} catch (error) {
  console.error('Произошла ошибка:', error.message);
  
  if (error.message.includes('API YandexCloud')) {
    // Обработка ошибок API
  } else if (error.message.includes('не поддерживает')) {
    // Обработка ошибок конфигурации
  } else {
    // Обработка других ошибок
  }
}
```