import { test, expect } from '@playwright/experimental-ct-react';
import { DatePicker } from './DatePicker';
import '../../index.css';

test.describe('DatePicker - Browser Tests', () => {
    test('должен отображать компонент с дефолтными значениями', async ({ mount }) => {
        const component = await mount(<DatePicker />);
        await expect(component.getByText('Срок годности')).toBeVisible();
        await expect(component.locator('input[placeholder="Введите дату"]')).toBeVisible();
    });

    test('должен отображать кастомный лейбл', async ({ mount }) => {
        const component = await mount(<DatePicker label="Дата доставки" />);
        await expect(component.getByText('Дата доставки')).toBeVisible();
    });

    test('должен отображать отформатированную дату', async ({ mount }) => {
        const date = new Date(2024, 0, 15); // 15 января 2024
        const component = await mount(<DatePicker value={date} />);
        await expect(component.locator('input[value="15.01.2024"]')).toBeVisible();
    });

    test('должен открывать календарь при клике на инпут', async ({ mount }) => {
        const component = await mount(<DatePicker />);
        const input = component.locator('input[placeholder="Введите дату"]');

        await input.click();

        // Ждем появления календаря
        await expect(
            component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
        ).toBeVisible({ timeout: 2000 });
    });

    test('должен открывать календарь при клике на иконку', async ({ mount }) => {
        const component = await mount(<DatePicker />);
        const iconButton = component.locator('button[aria-label="Открыть календарь"]');

        await iconButton.click();

        await expect(
            component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
        ).toBeVisible({ timeout: 2000 });
    });

    test('должен закрывать календарь при клике вне компонента', async ({ mount, page }) => {
        const component = await mount(
            <div>
                <DatePicker />
                <div data-testid="outside">Внешний элемент</div>
            </div>
        );

        const input = component.locator('input[placeholder="Введите дату"]');
        await input.click();

        // Ждем открытия календаря
        await expect(
            component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
        ).toBeVisible({ timeout: 2000 });

        // Кликаем вне компонента
        const outside = component.locator('[data-testid="outside"]');
        await outside.click();

        // Ждем закрытия календаря
        await expect(
            component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
        ).not.toBeVisible({ timeout: 2000 });
    });

    test('должен вызывать onChange при выборе даты', async ({ mount }) => {
        let selectedDate: Date | null = null;
        const handleChange = (date: Date | null) => {
            selectedDate = date;
        };

        const component = await mount(<DatePicker onChange={handleChange} />);
        const input = component.locator('input[placeholder="Введите дату"]');

        await input.click();

        // Ждем открытия календаря
        await expect(
            component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
        ).toBeVisible({ timeout: 2000 });

        // Ищем доступную дату (завтрашний день)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDate().toString();

        // Пытаемся найти кнопку с завтрашним днем
        const dayButton = component
            .locator('button')
            .filter({ hasText: tomorrowDay })
            .first();

        const isVisible = await dayButton.isVisible().catch(() => false);
        if (isVisible) {
            const isDisabled = await dayButton.getAttribute('disabled');
            if (!isDisabled) {
                await dayButton.click();

                // Ждем закрытия календаря и обновления значения
                await component.waitForTimeout(500);
                expect(selectedDate).toBeInstanceOf(Date);
            }
        }
    });

    test('должен закрывать календарь после выбора даты', async ({ mount }) => {
        const handleChange = () => {};

        const component = await mount(<DatePicker onChange={handleChange} />);
        const input = component.locator('input[placeholder="Введите дату"]');

        await input.click();

        // Ждем открытия календаря
        await expect(
            component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
        ).toBeVisible({ timeout: 2000 });

        // Ищем доступную дату
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDay = tomorrow.getDate().toString();

        const dayButton = component
            .locator('button')
            .filter({ hasText: tomorrowDay })
            .first();

        const isVisible = await dayButton.isVisible().catch(() => false);
        if (isVisible) {
            const isDisabled = await dayButton.getAttribute('disabled');
            if (!isDisabled) {
                await dayButton.click();

                // Ждем закрытия календаря
                await expect(
                    component.locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
                ).not.toBeVisible({ timeout: 2000 });
            }
        }
    });

    test('должен быть отключен, когда disabled=true', async ({ mount }) => {
        const component = await mount(<DatePicker disabled />);
        const input = component.locator('input[placeholder="Введите дату"]');
        await expect(input).toBeDisabled();
    });

    test('не должен открывать календарь при disabled=true', async ({ mount }) => {
        const component = await mount(<DatePicker disabled />);
        const input = component.locator('input[placeholder="Введите дату"]');

        await input.click({ force: true });

        // Ждем немного и проверяем, что календарь не открылся
        await component.waitForTimeout(500);
        const calendarVisible = await component
            .locator('text=/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/')
            .isVisible()
            .catch(() => false);

        expect(calendarVisible).toBe(false);
    });

    test('должен правильно форматировать дату с ведущими нулями', async ({ mount }) => {
        const date = new Date(2024, 0, 5); // 5 января 2024
        const component = await mount(<DatePicker value={date} />);
        await expect(component.locator('input[value="05.01.2024"]')).toBeVisible();
    });

    test('должен отображать пустое значение для null', async ({ mount }) => {
        const component = await mount(<DatePicker value={null} />);
        const input = component.locator('input[placeholder="Введите дату"]');
        await expect(input).toHaveValue('');
    });
});

