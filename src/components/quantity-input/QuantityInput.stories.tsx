import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuantityInput } from './QuantityInput';

const meta = {
    title: 'QuantityInput',
    component: QuantityInput,
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
} satisfies Meta<typeof QuantityInput>;

type TStory = StoryObj<typeof QuantityInput>;

export const Basic: TStory = {
    args: {
        onChange: (quantity) => {
            console.log('Количество:', quantity);
        }
    }
};

Basic.storyName = 'Базовый QuantityInput';

export const WithValue: TStory = {
    args: {
        value: 10,
        onChange: (quantity) => {
            console.log('Количество:', quantity);
        }
    }
};

WithValue.storyName = 'С начальным значением';

export const CustomLabel: TStory = {
    args: {
        label: 'Количество товара',
        unit: 'единиц',
        onChange: (quantity) => {
            console.log('Количество:', quantity);
        }
    }
};

CustomLabel.storyName = 'С кастомным лейблом и единицами';

export const Disabled: TStory = {
    args: {
        value: 5,
        disabled: true,
        onChange: (quantity) => {
            console.log('Количество:', quantity);
        }
    }
};

Disabled.storyName = 'Отключенный';

export default meta;

