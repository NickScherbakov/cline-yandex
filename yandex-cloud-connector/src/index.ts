import { YandexCloudHandler, YandexCloudHandlerOptions } from "./api/yandexcloud"
import { Message, YandexCloudChunk, YandexCloudModelId, yandexCloudModels } from "./shared/api"

/**
 * Настройки для YandexCloudConnector
 */
export interface YandexCloudConnectorOptions {
	/** API ключ Yandex Cloud */
	apiKey: string
	/** ID каталога Yandex Cloud */
	folderId: string
	/** Идентификатор модели (по умолчанию yandexgpt) */
	modelId?: YandexCloudModelId
	/** Температура генерации (по умолчанию 0.7) */
	temperature?: number
	/** Максимальное количество токенов (по умолчанию зависит от модели) */
	maxTokens?: number
}

/**
 * Основной класс для работы с API Yandex Cloud
 */
export class YandexCloudConnector {
	private handler: YandexCloudHandler
	private defaultOptions: Partial<YandexCloudConnectorOptions>

	/**
	 * Создает экземпляр коннектора для Yandex Cloud
	 * @param options Настройки коннектора
	 */
	constructor(options: YandexCloudConnectorOptions) {
		if (!options.apiKey) {
			throw new Error("Требуется указать API ключ (apiKey)")
		}

		if (!options.folderId) {
			throw new Error("Требуется указать ID каталога (folderId)")
		}

		this.handler = new YandexCloudHandler({
			yandexcloudApiKey: options.apiKey,
			yandexcloudFolderId: options.folderId,
			apiModelId: options.modelId,
		})

		this.defaultOptions = {
			temperature: options.temperature ?? 0.7,
			maxTokens: options.maxTokens,
			modelId: options.modelId ?? "yandexgpt",
		}
	}

	/**
	 * Создает запрос к модели и возвращает ответ
	 * @param systemPrompt Системный промпт (опционально)
	 * @param messages Массив сообщений диалога
	 * @param options Дополнительные настройки
	 * @returns Promise с ответом или AsyncGenerator для потока
	 */
	async createCompletion(
		systemPrompt?: string,
		messages: Message[] = [],
		options: Partial<YandexCloudConnectorOptions> = {},
	): Promise<AsyncGenerator<YandexCloudChunk, void, unknown>> {
		const combinedOptions = {
			...this.defaultOptions,
			...options,
			stream: true,
		}

		return this.handler.createMessage(systemPrompt, messages, combinedOptions)
	}

	/**
	 * Создает запрос к модели без потоковой передачи и возвращает полный ответ
	 * @param systemPrompt Системный промпт (опционально)
	 * @param messages Массив сообщений диалога
	 * @param options Дополнительные настройки
	 * @returns Promise с полным ответом
	 */
	async createCompletionSync(
		systemPrompt?: string,
		messages: Message[] = [],
		options: Partial<YandexCloudConnectorOptions> = {},
	): Promise<string> {
		const combinedOptions = {
			...this.defaultOptions,
			...options,
			stream: false,
		}

		const response = await this.handler.createMessage(systemPrompt, messages, combinedOptions)

		// Если не указана модель, используем модель по умолчанию
		const modelId = options.modelId || this.defaultOptions.modelId || "yandexgpt"

		if (yandexCloudModels[modelId as YandexCloudModelId].streamingSupported) {
			throw new Error("Для синхронных запросов используйте createCompletion с stream: false")
		}

		return response.result.alternatives[0].message.content
	}

	/**
	 * Создает запрос для суммаризации текста
	 * @param text Текст для суммаризации
	 * @param options Дополнительные настройки
	 * @returns Promise с суммаризированным текстом
	 */
	async summarize(text: string, options: Partial<YandexCloudConnectorOptions> = {}): Promise<string> {
		const combinedOptions = {
			...this.defaultOptions,
			...options,
			modelId: "summarization",
			stream: false,
		}

		const messages: Message[] = [
			{
				role: "user",
				content: text,
			},
		]

		const response = await this.handler.createMessage(undefined, messages, combinedOptions)
		return response.result.alternatives[0].message.content
	}
}

// Экспорт типов и констант
export { YandexCloudModelId, yandexCloudModels, Message } from "./shared/api"
