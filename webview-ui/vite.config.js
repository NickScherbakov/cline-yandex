"use strict";
/// <reference types="vitest/config" />
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var vite_2 = require("@tailwindcss/vite");
var plugin_react_swc_1 = require("@vitejs/plugin-react-swc");
var path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_react_swc_1.default)(), (0, vite_2.default)()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/setupTests.ts"],
        coverage: {
            provider: "v8",
            reportOnFailure: true,
        },
    },
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]",
            },
        },
        chunkSizeWarningLimit: 100000,
    },
    server: {
        port: 25463,
        hmr: {
            host: "localhost",
            protocol: "ws",
        },
        cors: {
            origin: "*",
            methods: "*",
            allowedHeaders: "*",
        },
    },
    define: {
        "process.env": {
            NODE_ENV: JSON.stringify(process.env.IS_DEV ? "development" : "production"),
            IS_DEV: JSON.stringify(process.env.IS_DEV),
        },
    },
    resolve: {
        alias: {
            "@": (0, path_1.resolve)(__dirname, "./src"),
            "@components": (0, path_1.resolve)(__dirname, "./src/components"),
            "@context": (0, path_1.resolve)(__dirname, "./src/context"),
            "@shared": (0, path_1.resolve)(__dirname, "../src/shared"),
            "@utils": (0, path_1.resolve)(__dirname, "./src/utils"),
        },
    },
});
