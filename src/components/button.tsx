import React from 'react';
import styles from './style.module.css';

// ButtonProps

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
}

// Button

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, loading = false }) => {
    return (
        <div className={styles.formGroup}>
            <button
                className={`${styles.button} ${disabled ? styles.disabled : ''}`}
                onClick={onClick}
                disabled={disabled || loading}
            >
                {loading ? (
                    <div className={styles.loader} />
                ) : (
                    label
                )}
            </button>
        </div>
    );
};

export default Button;
