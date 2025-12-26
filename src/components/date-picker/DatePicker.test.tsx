import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
    beforeEach(() => {
        // Мокаем window.matchMedia для медиа-запросов
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn()
            }))
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('должен отображать лейбл по умолчанию', () => {
        render(<DatePicker />);
        expect(screen.getByText('Срок годности')).toBeInTheDocument();
    });

    it('должен отображать кастомный лейбл', () => {
        render(<DatePicker label="Дата доставки" />);
        expect(screen.getByText('Дата доставки')).toBeInTheDocument();
    });

    it('должен отображать placeholder по умолчанию', () => {
        render(<DatePicker />);
        const input = screen.getByPlaceholderText('Введите дату');
        expect(input).toBeInTheDocument();
    });

    it('должен отображать кастомный placeholder', () => {
        render(<DatePicker placeholder="Выберите дату" />);
        const input = screen.getByPlaceholderText('Выберите дату');
        expect(input).toBeInTheDocument();
    });

    it('должен отображать отформатированную дату', () => {
        const date = new Date(2024, 0, 15); // 15 января 2024
        render(<DatePicker value={date} />);
        const input = screen.getByDisplayValue('15.01.2024') as HTMLInputElement;
        expect(input.value).toBe('15.01.2024');
    });

    it('должен открывать календарь при клике на инпут', async () => {
        const user = userEvent.setup();
        render(<DatePicker />);
        const input = screen.getByPlaceholderText('Введите дату');

        await user.click(input);

        await waitFor(() => {
            expect(screen.getByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).toBeInTheDocument();
        });
    });

    it('должен открывать календарь при клике на иконку', async () => {
        const user = userEvent.setup();
        render(<DatePicker />);
        const iconButton = screen.getByLabelText('Открыть календарь');

        await user.click(iconButton);

        await waitFor(() => {
            expect(screen.getByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).toBeInTheDocument();
        });
    });

    it('должен закрывать календарь при клике вне компонента', async () => {
        const user = userEvent.setup();
        render(
            <div>
                <DatePicker />
                <div data-testid="outside">Внешний элемент</div>
            </div>
        );

        const input = screen.getByPlaceholderText('Введите дату');
        await user.click(input);

        await waitFor(() => {
            expect(screen.getByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).toBeInTheDocument();
        });

        const outside = screen.getByTestId('outside');
        await user.click(outside);

        await waitFor(() => {
            expect(screen.queryByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).not.toBeInTheDocument();
        });
    });

    it('должен вызывать onChange при выборе даты', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        render(<DatePicker onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Введите дату');

        await user.click(input);

        await waitFor(() => {
            expect(screen.getByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).toBeInTheDocument();
        });

        // Ищем кнопку с завтрашним днем (обычно доступна)
        const tomorrowButton = screen.getByRole('button', {
            name: tomorrow.getDate().toString()
        });

        if (tomorrowButton && !tomorrowButton.hasAttribute('disabled')) {
            await user.click(tomorrowButton);

            await waitFor(() => {
                expect(handleChange).toHaveBeenCalled();
                const calledDate = handleChange.mock.calls[0][0];
                expect(calledDate).toBeInstanceOf(Date);
            });
        }
    });

    it('должен закрывать календарь после выбора даты', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        render(<DatePicker onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Введите дату');

        await user.click(input);

        await waitFor(() => {
            expect(screen.getByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).toBeInTheDocument();
        });

        const tomorrowButton = screen.getByRole('button', {
            name: tomorrow.getDate().toString()
        });

        if (tomorrowButton && !tomorrowButton.hasAttribute('disabled')) {
            await user.click(tomorrowButton);

            await waitFor(() => {
                expect(screen.queryByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).not.toBeInTheDocument();
            });
        }
    });

    it('должен быть отключен, когда disabled=true', () => {
        render(<DatePicker disabled />);
        const input = screen.getByPlaceholderText('Введите дату') as HTMLInputElement;
        expect(input).toBeDisabled();
    });

    it('не должен открывать календарь при disabled=true', async () => {
        const user = userEvent.setup();
        render(<DatePicker disabled />);
        const input = screen.getByPlaceholderText('Введите дату');

        await user.click(input);

        await waitFor(() => {
            expect(screen.queryByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).not.toBeInTheDocument();
        });
    });

    it('должен скрывать лейбл, если он не передан', () => {
        render(<DatePicker label="" />);
        expect(screen.queryByText('Срок годности')).not.toBeInTheDocument();
    });

    it('должен работать в неконтролируемом режиме', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        render(<DatePicker onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Введите дату');

        await user.click(input);

        await waitFor(() => {
            expect(screen.getByText(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)).toBeInTheDocument();
        });

        const tomorrowButton = screen.getByRole('button', {
            name: tomorrow.getDate().toString()
        });

        if (tomorrowButton && !tomorrowButton.hasAttribute('disabled')) {
            await user.click(tomorrowButton);

            await waitFor(() => {
                expect(handleChange).toHaveBeenCalled();
                const formattedDate = formatDate(tomorrow);
                expect(screen.getByDisplayValue(formattedDate)).toBeInTheDocument();
            });
        }
    });

    it('должен отображать пустое значение для null', () => {
        render(<DatePicker value={null} />);
        const input = screen.getByPlaceholderText('Введите дату') as HTMLInputElement;
        expect(input.value).toBe('');
    });

    it('должен правильно форматировать дату с ведущими нулями', () => {
        const date = new Date(2024, 0, 5); // 5 января 2024
        render(<DatePicker value={date} />);
        const input = screen.getByDisplayValue('05.01.2024') as HTMLInputElement;
        expect(input.value).toBe('05.01.2024');
    });
});

// Вспомогательная функция для форматирования даты
function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

