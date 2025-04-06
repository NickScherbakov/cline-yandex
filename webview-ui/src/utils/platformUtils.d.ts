export interface NavigatorUAData {
    platform: string;
    brands: {
        brand: string;
        version: string;
    }[];
}
export declare const unknown = "Unknown";
export declare const detectOS: (platform: string) => string;
export declare const detectMetaKeyChar: (platform: string) => "CMD" | "Win" | "Alt";
