import { useState, useRef, useEffect } from 'react';
import { Calendar } from '../calendar';
import CalendarIcon from '../../assets/bx-calendar.svg?react';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
    label?: string;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    placeholder?: string;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
}

export function DatePicker({
    label = 'Срок годности',
    value: controlledValue,
    onChange,
    placeholder = 'Введите дату',
    minDate,
    maxDate,
    disabled = false
}: DatePickerProps) {
    const [internalValue, setInternalValue] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Используем контролируемое значение, если оно передано, иначе внутреннее состояние
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen]);

    const formatDate = (date: Date | null): string => {
        if (!date) {
            return '';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(true);
            inputRef.current?.focus();
        }
    };

    const handleCalendarChange = (date: Date | null) => {
        // Если компонент неконтролируемый, обновляем внутреннее состояние
        if (controlledValue === undefined) {
            setInternalValue(date);
        }
        // Вызываем onChange для контролируемого режима
        onChange?.(date);
        setIsOpen(false);
    };

    const handleCalendarClose = () => {
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className={styles.container}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    value={formatDate(value)}
                    placeholder={placeholder}
                    readOnly
                    disabled={disabled}
                    onClick={handleInputClick}
                    onFocus={handleInputClick}
                />
                <button
                    type="button"
                    className={styles.iconButton}
                    onClick={handleInputClick}
                    disabled={disabled}
                    aria-label="Открыть календарь"
                >
                    <CalendarIcon className={styles.icon} />
                </button>
            </div>
            {isOpen && (
                <div className={styles.calendarWrapper}>
                    <Calendar
                        value={value}
                        onChange={handleCalendarChange}
                        minDate={minDate}
                        maxDate={maxDate}
                        onClose={handleCalendarClose}
                    />
                </div>
            )}
        </div>
    );
}

