import axios, { AxiosRequestConfig } from 'axios';
import {
  Message,
  YANDEX_CLOUD_ENDPOINTS,
  YandexCloudModelId,
  YandexCloudRequestOptions,
  YandexCloudResponse,
  YandexCloudStreamResponse,
  yandexCloudModels
} from '../shared/api';

/**
 * Интерфейс для настроек YandexCloudHandler
 */
export interface YandexCloudHandlerOptions {
  /** API ключ Yandex Cloud */
  yandexcloudApiKey: string;
  /** ID каталога Yandex Cloud */
  yandexcloudFolderId: string;
  /** Идентификатор модели (по умолчанию yandexgpt) */
  apiModelId?: YandexCloudModelId;
}

/**
 * Класс для обработки запросов к API YandexCloud
 */
export class YandexCloudHandler {
  private apiKey: string;
  private folderId: string;
  private defaultModelId: YandexCloudModelId;

  /**
   * Создает экземпляр обработчика YandexCloud
   * @param options Настройки для YandexCloud
   */
  constructor(options: YandexCloudHandlerOptions) {
    this.apiKey = options.yandexcloudApiKey;
    this.folderId = options.yandexcloudFolderId;
    this.defaultModelId = options.apiModelId || 'yandexgpt';
  }

  /**
   * Форматирует сообщения для API YandexCloud
   * @param systemPrompt Системный промпт
   * @param messages Массив сообщений
   * @returns Отформатированные сообщения для API
   */
  private formatMessages(systemPrompt: string | undefined, messages: Message[]): Message[] {
    const formattedMessages: Message[] = [];

    // Добавляем системное сообщение, если оно есть
    if (systemPrompt) {
      formattedMessages.push({
        role: 'system',
        content: systemPrompt
      });
    }

    // Добавляем остальные сообщения
    formattedMessages.push(...messages);

    return formattedMessages;
  }

  /**
   * Создает запрос к API YandexCloud
   * @param systemPrompt Системный промпт
   * @param messages Массив сообщений
   * @param options Дополнительные настройки запроса
   * @returns Promise с ответом API или объект для работы с потоком
   */
  async createMessage(
    systemPrompt: string | undefined,
    messages: Message[],
    options: Partial<YandexCloudRequestOptions> = {}
  ) {
    const modelId = options.modelId || this.defaultModelId;
    const model = yandexCloudModels[modelId];
    
    if (!model) {
      throw new Error(`Неподдерживаемая модель: ${modelId}`);
    }

    const formattedMessages = this.formatMessages(systemPrompt, messages);

    const requestOptions: YandexCloudRequestOptions = {
      apiKey: this.apiKey,
      folderId: this.folderId,
      modelId: modelId,
      temperature: options.temperature || 0.7,
      maxTokens: options.maxTokens || model.maxTokens,
      stream: options.stream || false
    };

    if (requestOptions.stream && !model.streamingSupported) {
      throw new Error(`Модель ${modelId} не поддерживает потоковую передачу`);
    }

    if (requestOptions.stream) {
      return this.createStreamingRequest(formattedMessages, requestOptions);
    } else {
      return this.createStandardRequest(formattedMessages, requestOptions);
    }
  }

  /**
   * Создает стандартный (не потоковый) запрос к API
   * @param messages Отформатированные сообщения
   * @param options Настройки запроса
   * @returns Promise с ответом API
   */
  private async createStandardRequest(
    messages: Message[],
    options: YandexCloudRequestOptions
  ): Promise<YandexCloudResponse> {
    const endpoint = options.modelId === 'summarization'
      ? YANDEX_CLOUD_ENDPOINTS.TEXT_GENERATION
      : YANDEX_CLOUD_ENDPOINTS.COMPLETION;

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${options.apiKey}`,
        'x-folder-id': options.folderId
      }
    };

    const requestData = {
      modelUri: `yandexgpt://${options.modelId}`,
      messages: messages,
      generationOptions: {
        temperature: options.temperature,
        maxTokens: options.maxTokens
      }
    };

    try {
      const response = await axios.post(
        endpoint,
        requestData,
        config
      );
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Ошибка API YandexCloud: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }

  /**
   * Создает потоковый запрос к API
   * @param messages Отформатированные сообщения
   * @param options Настройки запроса
   * @returns Асинхронный итератор для работы с потоком частей ответа
   */
  private async *createStreamingRequest(
    messages: Message[],
    options: YandexCloudRequestOptions
  ): AsyncGenerator<{ text: string; isComplete: boolean }> {
    const endpoint = YANDEX_CLOUD_ENDPOINTS.COMPLETION;
    
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${options.apiKey}`,
        'x-folder-id': options.folderId,
        'Accept': 'text/event-stream'
      },
      responseType: 'stream'
    };

    const requestData = {
      modelUri: `yandexgpt://${options.modelId}`,
      messages: messages,
      generationOptions: {
        temperature: options.temperature,
        maxTokens: options.maxTokens,
        stream: true
      }
    };

    try {
      const response = await axios.post(
        endpoint,
        requestData,
        config
      );

      let buffer = '';
      let isFirstChunk = true;
      let previousContent = '';

      // Обрабатываем каждую часть потока
      for await (const chunk of response.data) {
        buffer += chunk.toString();

        // Обработка строк в буфере
        let eolIndex;
        while ((eolIndex = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, eolIndex).trim();
          buffer = buffer.slice(eolIndex + 1);

          if (line.startsWith('data: ')) {
            const jsonData = line.slice(6);
            if (jsonData === '[DONE]') {
              yield { text: '', isComplete: true };
              return;
            }

            try {
              const parsedData = JSON.parse(jsonData) as YandexCloudStreamResponse;
              const alternative = parsedData.result.alternatives[0];
              
              if (alternative) {
                const newContent = alternative.message.content;
                
                // Для первой части отдаем полное содержимое
                if (isFirstChunk) {
                  previousContent = newContent;
                  isFirstChunk = false;
                  yield { text: newContent, isComplete: false };
                } else {
                  // Для последующих частей отдаем только инкремент (дельту)
                  const deltaContent = newContent.slice(previousContent.length);
                  previousContent = newContent;
                  
                  yield { 
                    text: deltaContent, 
                    isComplete: alternative.status === 'final'
                  };
                }
              }
            } catch (e) {
              console.error('Ошибка парсинга потока:', e);
            }
          }
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Ошибка потокового API YandexCloud: ${
            error.response?.data?.message || error.message
          }`
        );
      }
      throw error;
    }
  }
}