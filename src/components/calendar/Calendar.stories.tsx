import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Calendar } from './Calendar';

const CalendarWrapper = (args: Parameters<typeof Calendar>[0]) => {
    const [value, setValue] = useState<Date | null>(args.value || null);
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div style={{ padding: '20px', position: 'relative' }}>
            {isOpen && (
                <Calendar
                    {...args}
                    value={value}
                    onChange={(date) => {
                        setValue(date);
                        args.onChange?.(date);
                    }}
                    onClose={() => {
                        setIsOpen(false);
                        args.onClose?.();
                    }}
                />
            )}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Открыть календарь
                </button>
            )}
            {value && (
                <div style={{ marginTop: '16px', fontSize: '14px' }}>
                    Выбранная дата:{' '}
                    {value.toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </div>
            )}
        </div>
    );
};

const meta = {
    title: 'Calendar',
    component: CalendarWrapper,
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
} satisfies Meta<typeof CalendarWrapper>;

type TStory = StoryObj<typeof CalendarWrapper>;

export const Basic: TStory = {
    args: {
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        },
        onClose: () => {
            console.log('Календарь закрыт');
        }
    }
};

Basic.storyName = 'Базовый календарь';

export const WithInitialValue: TStory = {
    args: {
        value: new Date(2026, 2, 15),
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        },
        onClose: () => {
            console.log('Календарь закрыт');
        }
    }
};

WithInitialValue.storyName = 'С начальным значением';

export const WithMinDate: TStory = {
    args: {
        minDate: new Date(),
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        },
        onClose: () => {
            console.log('Календарь закрыт');
        }
    }
};

WithMinDate.storyName = 'С минимальной датой (сегодня)';

export const WithDateRange: TStory = {
    args: {
        minDate: new Date(),
        maxDate: new Date(2026, 11, 31),
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        },
        onClose: () => {
            console.log('Календарь закрыт');
        }
    }
};

WithDateRange.storyName = 'С диапазоном дат';

export default meta;

