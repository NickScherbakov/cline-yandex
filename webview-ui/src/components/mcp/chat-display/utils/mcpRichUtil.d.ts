export declare const safeCreateUrl: (url: string) => URL | null;
export declare const isUrl: (str: string) => boolean;
export declare const getSafeHostname: (url: string) => string;
export declare const isLocalhostUrl: (url: string) => boolean;
export declare const normalizeRelativeUrl: (relativeUrl: string, baseUrl: string) => string;
export declare const formatUrlForOpening: (url: string) => string;
export declare const checkIfImageUrl: (url: string) => Promise<boolean>;
