import { Anthropic } from "@anthropic-ai/sdk"
import OpenAI from "openai"
import { ApiHandler } from "../"
import { ApiHandlerOptions, ModelInfo, YandexCloudModelId, yandexCloudDefaultModelId, yandexCloudModels } from "../../shared/api"
import { withRetry } from "../retry"
import { convertToOpenAiMessages } from "../transform/openai-format"
import { ApiStream } from "../transform/stream"

export class YandexCloudHandler implements ApiHandler {
	private options: ApiHandlerOptions
	private client: OpenAI

	constructor(options: ApiHandlerOptions) {
		this.options = options
		this.client = new OpenAI({
			baseURL: "https://llm.api.cloud.yandex.net/foundationModels/v1",
			apiKey: this.options.yandexcloudApiKey,
			defaultHeaders: {
				"x-folder-id": this.options.yandexcloudFolderId || "",
				"x-folder-id-type": "folder-id",
			},
		})
	}

	@withRetry()
	async *createMessage(systemPrompt: string, messages: Anthropic.Messages.MessageParam[]): ApiStream {
		const model = this.getModel()

		let openAiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
			{ role: "system", content: systemPrompt },
			...convertToOpenAiMessages(messages),
		]

		const stream = await this.client.chat.completions.create({
			model: model.id,
			messages: openAiMessages,
			temperature: 0,
			stream: true,
		})

		for await (const chunk of stream) {
			const delta = chunk.choices[0]?.delta
			if (delta?.content) {
				yield {
					type: "text",
					text: delta.content,
				}
			}
		}
	}

	getModel(): { id: YandexCloudModelId; info: ModelInfo } {
		const modelId = this.options.apiModelId
		if (modelId && modelId in yandexCloudModels) {
			const id = modelId as YandexCloudModelId
			return { id, info: yandexCloudModels[id] }
		}
		return {
			id: yandexCloudDefaultModelId,
			info: yandexCloudModels[yandexCloudDefaultModelId],
		}
	}
}
