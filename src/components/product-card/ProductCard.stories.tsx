import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './ProductCard';
import productImage from '../../assets/image 1.png';

const meta = {
    title: 'ProductCard',
    component: ProductCard,
    parameters: {
        backgrounds: {
            default: 'light'
        }
    }
} satisfies Meta<typeof ProductCard>;

type TStory = StoryObj<typeof ProductCard>;

export const Basic: TStory = {
    args: {
        image: productImage,
        sku: 'ШК 327600060 0152',
        id: '34233465',
        name: 'УШМ Makita GA9020, 2200 Вт, 230 мм',
        onSave: (quantity, expirationDate) => {
            console.log('Сохранено количество:', quantity);
            console.log('Срок годности:', expirationDate);
        }
    }
};

Basic.storyName = 'Карточка товара';

export const WithoutImage: TStory = {
    args: {
        sku: 'ШК 123456789 0123',
        id: '12345678',
        name: 'Название товара без изображения',
        onSave: (quantity, expirationDate) => {
            console.log('Сохранено количество:', quantity);
            console.log('Срок годности:', expirationDate);
        }
    }
};

WithoutImage.storyName = 'Без изображения';

export default meta;

