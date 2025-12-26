import { useState } from 'react';
import image from '../../assets/pic-1.png';
import { DatePicker } from '../date-picker';
import { QuantityInput } from '../quantity-input';
import { SaveButton } from '../save-button';
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
    const [quantity, setQuantity] = useState<number | null>(null);
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);

    const handleSave = () => {
        if (quantity !== null && quantity > 0 && onSave) {
            onSave(quantity, expirationDate);
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
            <QuantityInput
                value={quantity}
                onChange={setQuantity}
            />
            <div className={styles.expirationDateSection}>
                <DatePicker
                    value={expirationDate}
                    onChange={setExpirationDate}
                    minDate={new Date()}
                />
            </div>
            <SaveButton onClick={handleSave} />
        </div>
    );
}

