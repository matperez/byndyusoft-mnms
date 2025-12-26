import type { Meta, StoryObj } from '@storybook/react-vite';
import { SaveButton } from './SaveButton';

const meta = {
    title: 'SaveButton',
    component: SaveButton,
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
} satisfies Meta<typeof SaveButton>;

type TStory = StoryObj<typeof SaveButton>;

export const Basic: TStory = {
    args: {
        onClick: () => {
            console.log('Кнопка нажата');
        }
    }
};

Basic.storyName = 'Базовая кнопка';

export const Disabled: TStory = {
    args: {
        disabled: true,
        onClick: () => {
            console.log('Кнопка нажата');
        }
    }
};

Disabled.storyName = 'Отключенная';

export const CustomText: TStory = {
    args: {
        children: 'Отправить',
        onClick: () => {
            console.log('Кнопка нажата');
        }
    }
};

CustomText.storyName = 'С кастомным текстом';

export default meta;

