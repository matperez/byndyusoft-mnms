import { useState } from 'react';
import styles from './QuantityInput.module.css';

export interface QuantityInputProps {
    value?: number | null;
    onChange?: (quantity: number | null) => void;
    label?: string;
    unit?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function QuantityInput({
    value: controlledValue,
    onChange,
    label = 'Количество',
    unit = 'шт.',
    placeholder = '0',
    disabled = false
}: QuantityInputProps) {
    const [internalValue, setInternalValue] = useState<string>('');

    const displayValue =
        controlledValue !== undefined && controlledValue !== null
            ? controlledValue.toString()
            : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '' || /^\d+$/.test(inputValue)) {
            const numValue =
                inputValue === '' ? null : parseInt(inputValue, 10);
            if (controlledValue === undefined) {
                setInternalValue(inputValue);
            }
            onChange?.(numValue);
        }
    };

    return (
        <div className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.input}
                    value={displayValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {unit && <span className={styles.unit}>{unit}</span>}
            </div>
        </div>
    );
}

