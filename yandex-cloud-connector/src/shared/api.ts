/**
 * Типы и константы для работы с API Yandex Cloud
 */

/**
 * Идентификаторы доступных моделей YandexCloud
 */
export type YandexCloudModelId = 'yandexgpt' | 'yandexgpt-lite' | 'summarization';

/**
 * Информация о доступных моделях YandexCloud
 */
export const yandexCloudModels = {
  'yandexgpt': {
    id: 'yandexgpt',
    name: 'YandexGPT',
    description: 'Полная версия YandexGPT для сложных задач и генерации кода',
    maxTokens: 8192,
    streamingSupported: true
  },
  'yandexgpt-lite': {
    id: 'yandexgpt-lite',
    name: 'YandexGPT Lite',
    description: 'Облегченная версия для быстрых ответов и диалогов',
    maxTokens: 8192,
    streamingSupported: true
  },
  'summarization': {
    id: 'summarization',
    name: 'Summarization',
    description: 'Специализированная модель для суммаризации текстов',
    maxTokens: 8192,
    streamingSupported: false
  }
};

/**
 * Настройки для запроса к YandexCloud API
 */
export interface YandexCloudRequestOptions {
  /** API ключ Yandex Cloud */
  apiKey: string;
  /** ID каталога Yandex Cloud */
  folderId: string;
  /** Идентификатор модели */
  modelId: YandexCloudModelId;
  /** Температура для генерации, от 0 до 1 */
  temperature?: number;
  /** Максимальное количество токенов в ответе */
  maxTokens?: number;
  /** Включить потоковую передачу ответа */
  stream?: boolean;
}

/**
 * Роли участников диалога
 */
export type MessageRole = 'system' | 'user' | 'assistant';

/**
 * Структура сообщения для API
 */
export interface Message {
  role: MessageRole;
  content: string;
}

/**
 * Форматы ответа API
 */
export interface YandexCloudResponse {
  result: {
    alternatives: Array<{
      message: {
        role: string;
        content: string;
      }
    }>
    usage?: {
      inputTextTokens: number;
      completionTokens: number;
      totalTokens: number;
    }
  }
}

/**
 * Формат части потокового ответа
 */
export interface YandexCloudStreamResponse {
  result: {
    alternatives: Array<{
      message: {
        role: string;
        content: string;
      },
      status: 'final' | 'in_progress'
    }>
  }
}

/**
 * Формат обработанной части ответа
 */
export interface YandexCloudChunk {
  text: string;
  isComplete: boolean;
}

/**
 * API эндпоинты Yandex Cloud
 */
export const YANDEX_CLOUD_ENDPOINTS = {
  COMPLETION: 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
  TEXT_GENERATION: 'https://llm.api.cloud.yandex.net/foundationModels/v1/textGeneration'
};