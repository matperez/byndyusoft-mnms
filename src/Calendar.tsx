import { useState, useRef, useEffect } from 'react';
import styles from './Calendar.module.css';

export interface CalendarProps {
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    onClose?: () => void;
}

const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
];

export function Calendar({
    value,
    onChange,
    minDate,
    maxDate,
    onClose
}: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(() => {
        const date = value || new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    });

    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                onClose?.();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDateDisabled = (date: Date): boolean => {
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);

        if (minDate) {
            const minDateOnly = new Date(minDate);
            minDateOnly.setHours(0, 0, 0, 0);
            if (dateOnly < minDateOnly) {
                return true;
            }
        } else {
            // По умолчанию блокируем прошедшие даты
            if (dateOnly < today) {
                return true;
            }
        }

        if (maxDate) {
            const maxDateOnly = new Date(maxDate);
            maxDateOnly.setHours(0, 0, 0, 0);
            if (dateOnly > maxDateOnly) {
                return true;
            }
        }

        return false;
    };

    const isDateSelected = (date: Date): boolean => {
        if (!value) {
            return false;
        }
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        const valueOnly = new Date(value);
        valueOnly.setHours(0, 0, 0, 0);
        return dateOnly.getTime() === valueOnly.getTime();
    };

    const handleDateClick = (date: Date) => {
        if (isDateDisabled(date)) {
            return;
        }
        onChange?.(date);
        onClose?.();
    };

    const handlePrevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    };

    const handleNextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    };

    const getDaysInMonth = (date: Date): Date[] => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // Получаем день недели первого дня месяца (0 = воскресенье, нужно преобразовать)
        let firstDayOfWeek = firstDay.getDay();
        // Преобразуем: воскресенье (0) -> 6, понедельник (1) -> 0, и т.д.
        firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

        const days: Date[] = [];

        // Добавляем дни предыдущего месяца для заполнения первой недели
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            days.push(new Date(year, month - 1, prevMonth.getDate() - i));
        }

        // Добавляем дни текущего месяца
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        // Добавляем дни следующего месяца для заполнения последней недели
        const remainingDays = 42 - days.length; // 6 недель * 7 дней = 42
        for (let day = 1; day <= remainingDays; day++) {
            days.push(new Date(year, month + 1, day));
        }

        return days;
    };

    const days = getDaysInMonth(currentMonth);
    const currentMonthYear = currentMonth.getMonth();
    const currentYear = currentMonth.getFullYear();

    return (
        <div ref={calendarRef} className={styles.calendar}>
            <div className={styles.header}>
                <button
                    type="button"
                    className={styles.navButton}
                    onClick={handlePrevMonth}
                    aria-label="Предыдущий месяц"
                >
                    ‹
                </button>
                <div className={styles.monthYear}>
                    {MONTHS[currentMonthYear]} {currentYear}
                </div>
                <button
                    type="button"
                    className={styles.navButton}
                    onClick={handleNextMonth}
                    aria-label="Следующий месяц"
                >
                    ›
                </button>
            </div>
            <div className={styles.weekdays}>
                {DAYS_OF_WEEK.map((day) => (
                    <div key={day} className={styles.weekday}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles.days}>
                {days.map((day, index) => {
                    const isCurrentMonth =
                        day.getMonth() === currentMonthYear;
                    const isDisabled = isDateDisabled(day);
                    const isSelected = isDateSelected(day);

                    return (
                        <button
                            key={`${day.getTime()}-${index}`}
                            type="button"
                            className={`${styles.day} ${
                                !isCurrentMonth ? styles.otherMonth : ''
                            } ${isDisabled ? styles.disabled : ''} ${
                                isSelected ? styles.selected : ''
                            }`}
                            onClick={() => handleDateClick(day)}
                            disabled={isDisabled}
                        >
                            {day.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

