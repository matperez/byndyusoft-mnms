import styles from './SaveButton.module.css';

export interface SaveButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export function SaveButton({
    onClick,
    disabled = false,
    children = 'Сохранить'
}: SaveButtonProps) {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={disabled}
            type="button"
        >
            {children}
        </button>
    );
}

