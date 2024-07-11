import { defineConfig } from 'vitest/config';
import path from "path";

export default defineConfig({
    define: {
        'import.meta.vitest': false,
    },
    test: {
        globals: true,
        setupFiles: ['vitest.setup.ts'],
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
    },
});
