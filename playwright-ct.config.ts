import { defineConfig, devices } from '@playwright/experimental-ct-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Конфигурация Playwright для component testing
 * @see https://playwright.dev/docs/test-components
 */
export default defineConfig({
    testDir: './src',
    testMatch: /.*\.spec\.(ts|tsx)$/,
    // Указываем путь к шаблону
    // @ts-ignore
    templateDir: path.resolve(__dirname, './playwright'),
    /* Максимальное время выполнения одного теста */
    timeout: 10 * 1000,
    /* Запускать тесты в файлах параллельно */
    fullyParallel: true,
    /* Не использовать .only в CI */
    forbidOnly: !!process.env.CI,
    /* Повторять тесты при сбое в CI */
    retries: process.env.CI ? 2 : 0,
    /* Оптимизировать для CI */
    workers: process.env.CI ? 1 : undefined,
    /* Репортер для использования */
    reporter: [
        ['html'],
        ['list'],
        ...(process.env.CI ? [['github'] as const] : [])
    ],
    /* Общие настройки для всех проектов */
    use: {
        /* Собирать trace при повторе неудачного теста */
        trace: 'on-first-retry',
        /* Скриншоты при ошибках */
        screenshot: 'only-on-failure',
        /* Настройка dev server для Vite */
        ctPort: 3100,
        ctViteConfig: {
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src')
                }
            }
        }
    },

    /* Настройка проектов для основных браузеров */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        },
        /* Тестирование на мобильных устройствах */
        {
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] }
        }
    ],

});

