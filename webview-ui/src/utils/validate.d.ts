import { ApiConfiguration, ModelInfo } from "@shared/api";
export declare function validateApiConfiguration(apiConfiguration?: ApiConfiguration): string | undefined;
export declare function validateModelId(apiConfiguration?: ApiConfiguration, openRouterModels?: Record<string, ModelInfo>): string | undefined;
