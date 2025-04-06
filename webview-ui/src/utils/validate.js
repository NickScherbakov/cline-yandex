"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateApiConfiguration = validateApiConfiguration;
exports.validateModelId = validateModelId;
var api_1 = require("@shared/api");
function validateApiConfiguration(apiConfiguration) {
    if (apiConfiguration) {
        switch (apiConfiguration.apiProvider) {
            case "anthropic":
                if (!apiConfiguration.apiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "bedrock":
                if (!apiConfiguration.awsRegion) {
                    return "You must choose a region to use with AWS Bedrock.";
                }
                break;
            case "openrouter":
                if (!apiConfiguration.openRouterApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "vertex":
                if (!apiConfiguration.vertexProjectId || !apiConfiguration.vertexRegion) {
                    return "You must provide a valid Google Cloud Project ID and Region.";
                }
                break;
            case "gemini":
                if (!apiConfiguration.geminiApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "openai-native":
                if (!apiConfiguration.openAiNativeApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "deepseek":
                if (!apiConfiguration.deepSeekApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "xai":
                if (!apiConfiguration.xaiApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "qwen":
                if (!apiConfiguration.qwenApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "doubao":
                if (!apiConfiguration.doubaoApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "mistral":
                if (!apiConfiguration.mistralApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "cline":
                if (!apiConfiguration.clineApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "openai":
                if (!apiConfiguration.openAiBaseUrl || !apiConfiguration.openAiApiKey || !apiConfiguration.openAiModelId) {
                    return "You must provide a valid base URL, API key, and model ID.";
                }
                break;
            case "requesty":
                if (!apiConfiguration.requestyApiKey || !apiConfiguration.requestyModelId) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "together":
                if (!apiConfiguration.togetherApiKey || !apiConfiguration.togetherModelId) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "ollama":
                if (!apiConfiguration.ollamaModelId) {
                    return "You must provide a valid model ID.";
                }
                break;
            case "lmstudio":
                if (!apiConfiguration.lmStudioModelId) {
                    return "You must provide a valid model ID.";
                }
                break;
            case "vscode-lm":
                if (!apiConfiguration.vsCodeLmModelSelector) {
                    return "You must provide a valid model selector.";
                }
                break;
            case "asksage":
                if (!apiConfiguration.asksageApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
            case "sambanova":
                if (!apiConfiguration.sambanovaApiKey) {
                    return "You must provide a valid API key or choose a different provider.";
                }
                break;
        }
    }
    return undefined;
}
function validateModelId(apiConfiguration, openRouterModels) {
    if (apiConfiguration) {
        switch (apiConfiguration.apiProvider) {
            case "openrouter":
            case "cline":
                var modelId = apiConfiguration.openRouterModelId || api_1.openRouterDefaultModelId; // in case the user hasn't changed the model id, it will be undefined by default
                if (!modelId) {
                    return "You must provide a model ID.";
                }
                if (openRouterModels && !Object.keys(openRouterModels).includes(modelId)) {
                    // even if the model list endpoint failed, extensionstatecontext will always have the default model info
                    return "The model ID you provided is not available. Please choose a different model.";
                }
                break;
        }
    }
    return undefined;
}
