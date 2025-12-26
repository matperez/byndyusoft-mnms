import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuantityInput } from './QuantityInput';

describe('QuantityInput', () => {
    it('должен отображать лейбл по умолчанию', () => {
        render(<QuantityInput />);
        expect(screen.getByText('Количество')).toBeInTheDocument();
    });

    it('должен отображать кастомный лейбл', () => {
        render(<QuantityInput label="Количество товара" />);
        expect(screen.getByText('Количество товара')).toBeInTheDocument();
    });

    it('должен отображать единицу измерения по умолчанию', () => {
        render(<QuantityInput />);
        expect(screen.getByText('шт.')).toBeInTheDocument();
    });

    it('должен отображать кастомную единицу измерения', () => {
        render(<QuantityInput unit="кг" />);
        expect(screen.getByText('кг')).toBeInTheDocument();
    });

    it('должен отображать placeholder по умолчанию', () => {
        render(<QuantityInput />);
        const input = screen.getByPlaceholderText('0');
        expect(input).toBeInTheDocument();
    });

    it('должен отображать кастомный placeholder', () => {
        render(<QuantityInput placeholder="Введите количество" />);
        const input = screen.getByPlaceholderText('Введите количество');
        expect(input).toBeInTheDocument();
    });

    it('должен отображать значение в контролируемом режиме', () => {
        render(<QuantityInput value={42} />);
        const input = screen.getByDisplayValue('42') as HTMLInputElement;
        expect(input.value).toBe('42');
    });

    it('должен вызывать onChange при вводе числа', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0');

        await user.type(input, '123');

        expect(handleChange).toHaveBeenCalledTimes(3);
        expect(handleChange).toHaveBeenNthCalledWith(1, 1);
        expect(handleChange).toHaveBeenNthCalledWith(2, 12);
        expect(handleChange).toHaveBeenNthCalledWith(3, 123);
    });

    it('должен вызывать onChange с null при очистке поля', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput value={42} onChange={handleChange} />);
        const input = screen.getByDisplayValue('42') as HTMLInputElement;

        await user.clear(input);

        expect(handleChange).toHaveBeenCalledWith(null);
    });

    it('не должен принимать нечисловые символы', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;

        await user.type(input, 'abc123def');

        expect(input.value).toBe('123');
        expect(handleChange).toHaveBeenLastCalledWith(123);
    });

    it('не должен принимать отрицательные числа', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;

        await user.type(input, '-123');

        expect(input.value).toBe('123');
        expect(handleChange).toHaveBeenLastCalledWith(123);
    });

    it('не должен принимать десятичные числа', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;

        await user.type(input, '12.5');

        expect(input.value).toBe('125');
        expect(handleChange).toHaveBeenLastCalledWith(125);
    });

    it('должен работать в неконтролируемом режиме', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;

        await user.type(input, '99');

        expect(input.value).toBe('99');
        expect(handleChange).toHaveBeenLastCalledWith(99);
    });

    it('должен быть отключен, когда disabled=true', () => {
        render(<QuantityInput disabled />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;
        expect(input).toBeDisabled();
    });

    it('не должен вызывать onChange при disabled=true', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput disabled onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0');

        await user.type(input, '123');

        expect(handleChange).not.toHaveBeenCalled();
    });

    it('должен скрывать лейбл, если он не передан', () => {
        render(<QuantityInput label="" />);
        expect(screen.queryByText('Количество')).not.toBeInTheDocument();
    });

    it('должен скрывать единицу измерения, если она не передана', () => {
        render(<QuantityInput unit="" />);
        expect(screen.queryByText('шт.')).not.toBeInTheDocument();
    });

    it('должен обрабатывать большое число', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(<QuantityInput onChange={handleChange} />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;

        await user.type(input, '999999');

        expect(input.value).toBe('999999');
        expect(handleChange).toHaveBeenLastCalledWith(999999);
    });

    it('должен обрабатывать значение null', () => {
        render(<QuantityInput value={null} />);
        const input = screen.getByPlaceholderText('0') as HTMLInputElement;
        expect(input.value).toBe('');
    });
});

