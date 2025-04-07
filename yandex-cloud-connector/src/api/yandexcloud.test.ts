import { YandexCloudHandler } from './yandexcloud';
import axios from 'axios';
import { Message } from '../shared/api';

// Мокаем axios для тестов
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('YandexCloudHandler', () => {
  const mockOptions = {
    yandexcloudApiKey: 'test-api-key',
    yandexcloudFolderId: 'test-folder-id',
    apiModelId: 'yandexgpt' as const
  };

  const mockMessages: Message[] = [
    { role: 'user', content: 'Привет, мир!' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createMessage', () => {
    it('должен корректно формировать запрос к API', async () => {
      // Подготавливаем мок-ответ
      const mockResponse = {
        data: {
          result: {
            alternatives: [
              {
                message: {
                  role: 'assistant',
                  content: 'Привет! Чем я могу помочь?'
                }
              }
            ]
          }
        }
      };

      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const handler = new YandexCloudHandler(mockOptions);
      const response = await handler.createMessage('Ты - ассистент', mockMessages);

      // Проверяем, что запрос к API был сформирован корректно
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
        expect.objectContaining({
          modelUri: 'yandexgpt://yandexgpt',
          messages: expect.arrayContaining([
            { role: 'system', content: 'Ты - ассистент' },
            { role: 'user', content: 'Привет, мир!' }
          ]),
          generationOptions: expect.objectContaining({
            temperature: expect.any(Number),
            maxTokens: expect.any(Number)
          })
        }),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Api-Key test-api-key',
            'x-folder-id': 'test-folder-id'
          })
        })
      );

      // Проверяем, что ответ обработан корректно
      expect(response).toEqual(mockResponse.data);
    });

    it('должен выбросить ошибку при указании неподдерживаемой модели', async () => {
      const handler = new YandexCloudHandler(mockOptions);
      await expect(
        handler.createMessage('Ты - ассистент', mockMessages, { 
          modelId: 'non-existent-model' as any
        })
      ).rejects.toThrow('Неподдерживаемая модель');
    });

    it('должен выбросить ошибку при попытке потоковой передачи для неподдерживающей модели', async () => {
      const handler = new YandexCloudHandler({
        ...mockOptions,
        apiModelId: 'summarization' as const
      });

      await expect(
        handler.createMessage('Ты - ассистент', mockMessages, { stream: true })
      ).rejects.toThrow('не поддерживает потоковую передачу');
    });

    it('должен обрабатывать ошибки API корректно', async () => {
      mockedAxios.post.mockRejectedValueOnce({
        isAxiosError: true,
        response: {
          data: {
            message: 'Ошибка авторизации'
          }
        }
      });

      const handler = new YandexCloudHandler(mockOptions);
      await expect(
        handler.createMessage('Ты - ассистент', mockMessages)
      ).rejects.toThrow('Ошибка API YandexCloud: Ошибка авторизации');
    });
  });
});