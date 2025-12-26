import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        react(),
        svgr({
            svgrOptions: {
                exportType: 'default'
            }
        })
    ],
    test: {
        include: ['**/*.{test,tests}.{ts,tsx,js,jsx}'],
        passWithNoTests: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        globals: true
    }
});
