import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta = {
    title: 'DatePicker',
    component: DatePicker,
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
} satisfies Meta<typeof DatePicker>;

type TStory = StoryObj<typeof DatePicker>;

export const Basic: TStory = {
    args: {
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        }
    }
};

Basic.storyName = 'Базовый DatePicker';

export const WithValue: TStory = {
    args: {
        value: new Date(2026, 2, 15),
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        }
    }
};

WithValue.storyName = 'С начальным значением';

export const WithMinDate: TStory = {
    args: {
        minDate: new Date(),
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        }
    }
};

WithMinDate.storyName = 'С минимальной датой (сегодня)';

export const Disabled: TStory = {
    args: {
        value: new Date(2026, 2, 15),
        disabled: true,
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        }
    }
};

Disabled.storyName = 'Отключенный';

export const CustomLabel: TStory = {
    args: {
        label: 'Дата доставки',
        placeholder: 'Выберите дату',
        onChange: (date) => {
            console.log('Выбрана дата:', date);
        }
    }
};

CustomLabel.storyName = 'С кастомным лейблом';

export default meta;

