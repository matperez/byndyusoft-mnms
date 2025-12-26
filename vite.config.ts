import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    base: process.env.GITHUB_PAGES === 'true' ? '/byndyusoft-mnms/' : '/',
    plugins: [react(), svgr()]
});
