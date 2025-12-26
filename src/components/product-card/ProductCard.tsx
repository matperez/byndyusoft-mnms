import { useState } from 'react';
import image from '../../assets/pic-1.png';
import { DatePicker } from '../date-picker';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
    image?: string;
    sku: string;
    id: string;
    name: string;
    onSave?: (quantity: number, expirationDate: Date | null) => void;
}

export function ProductCard({
    sku,
    id,
    name,
    onSave
}: ProductCardProps) {
    const [quantity, setQuantity] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);

    const handleSave = () => {
        const numQuantity = parseInt(quantity, 10);
        if (!isNaN(numQuantity) && numQuantity > 0 && onSave) {
            onSave(numQuantity, expirationDate);
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setQuantity(value);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                {image && (
                    <div className={styles.imageContainer}>
                        <img src={image} alt={name} className={styles.image} />
                    </div>
                )}
                <div className={styles.info}>
                    <div className={styles.sku}>{sku}</div>
                    <div className={styles.id}>ID {id}</div>
                    <div className={styles.name}>{name}</div>
                </div>
            </div>
            <div className={styles.separator} />
            <div className={styles.quantitySection}>
                <label className={styles.quantityLabel}>Количество</label>
                <div className={styles.quantityInputWrapper}>
                    <input
                        type="text"
                        className={styles.quantityInput}
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="0"
                    />
                    <span className={styles.quantityUnit}>шт.</span>
                </div>
            </div>
            <div className={styles.expirationDateSection}>
                <DatePicker
                    value={expirationDate}
                    onChange={setExpirationDate}
                    minDate={new Date()}
                />
            </div>
            <button
                className={styles.saveButton}
                onClick={handleSave}
                type="button"
            >
                Сохранить
            </button>
        </div>
    );
}

