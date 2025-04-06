import { YandexCloudHandler } from "./yandexcloud"
import { YandexCloudModelId, yandexCloudDefaultModelId, yandexCloudModels } from "../../shared/api"
import OpenAI from "openai"
import { Anthropic } from "@anthropic-ai/sdk"

// Mock OpenAI
jest.mock("openai")

describe("YandexCloudHandler", () => {
	let handler: YandexCloudHandler
	let mockOpenAI: jest.Mocked<OpenAI>
	let mockCreate: jest.Mock

	beforeEach(() => {
		mockCreate = jest.fn()
		// Mock the OpenAI constructor and chat.completions.create method
		;(OpenAI as unknown as jest.Mock).mockImplementation(() => ({
			chat: {
				completions: {
					create: mockCreate,
				},
			},
		}))

		handler = new YandexCloudHandler({
			yandexcloudApiKey: "test-api-key",
			yandexcloudFolderId: "test-folder-id",
		})

		mockOpenAI = new OpenAI() as jest.Mocked<OpenAI>
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	describe("constructor", () => {
		it("should initialize with the correct configuration", () => {
			expect(OpenAI).toHaveBeenCalledWith({
				baseURL: "https://llm.api.cloud.yandex.net/foundationModels/v1",
				apiKey: "test-api-key",
				defaultHeaders: {
					"x-folder-id": "test-folder-id",
					"x-folder-id-type": "folder-id",
				},
			})
		})

		it("should handle empty folder ID", () => {
			handler = new YandexCloudHandler({
				yandexcloudApiKey: "test-api-key",
			})

			expect(OpenAI).toHaveBeenCalledWith({
				baseURL: "https://llm.api.cloud.yandex.net/foundationModels/v1",
				apiKey: "test-api-key",
				defaultHeaders: {
					"x-folder-id": "",
					"x-folder-id-type": "folder-id",
				},
			})
		})
	})

	describe("getModel", () => {
		it("should return the default model when no model ID is provided", () => {
			const result = handler.getModel()
			expect(result.id).toBe(yandexCloudDefaultModelId)
			expect(result.info).toBe(yandexCloudModels[yandexCloudDefaultModelId])
		})

		it("should return the specified model when a valid model ID is provided", () => {
			const modelId: YandexCloudModelId = "yandexgpt-lite"
			handler = new YandexCloudHandler({
				yandexcloudApiKey: "test-api-key",
				yandexcloudFolderId: "test-folder-id",
				apiModelId: modelId,
			})

			const result = handler.getModel()
			expect(result.id).toBe(modelId)
			expect(result.info).toBe(yandexCloudModels[modelId])
		})

		it("should return the default model when an invalid model ID is provided", () => {
			handler = new YandexCloudHandler({
				yandexcloudApiKey: "test-api-key",
				yandexcloudFolderId: "test-folder-id",
				apiModelId: "invalid-model-id",
			})

			const result = handler.getModel()
			expect(result.id).toBe(yandexCloudDefaultModelId)
			expect(result.info).toBe(yandexCloudModels[yandexCloudDefaultModelId])
		})
	})

	describe("createMessage", () => {
		it("should make a request to YandexCloud API with correct parameters", async () => {
			const systemPrompt = "You are a helpful assistant."
			const messages: Anthropic.Messages.MessageParam[] = [{ role: "user", content: "Hello, who are you?" }]

			// Mock the stream response
			const mockAsyncGenerator = async function* () {
				yield { choices: [{ delta: { content: "I am" } }] }
				yield { choices: [{ delta: { content: " YandexGPT" } }] }
				yield { choices: [{ delta: { content: ", your AI assistant." } }] }
			}

			mockCreate.mockReturnValue(mockAsyncGenerator())

			const result = handler.createMessage(systemPrompt, messages)
			const iterator = result[Symbol.asyncIterator]()

			// Collect the yielded values
			const chunks = []
			let chunk = await iterator.next()
			while (!chunk.done) {
				chunks.push(chunk.value)
				chunk = await iterator.next()
			}

			// Verify API was called with correct parameters
			expect(mockCreate).toHaveBeenCalledWith({
				model: yandexCloudDefaultModelId,
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: "Hello, who are you?" },
				],
				temperature: 0,
				stream: true,
			})

			// Verify yielded chunks
			expect(chunks).toEqual([
				{ type: "text", text: "I am" },
				{ type: "text", text: " YandexGPT" },
				{ type: "text", text: ", your AI assistant." },
			])
		})
	})
})
