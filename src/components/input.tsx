import React from 'react';
import styles from './style.module.css';

// InputProps

interface InputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}

// Input

const Input: React.FC<InputProps> = ({ id, name, label, value, onChange, placeholder, required = false, disabled }) => {
    return (
        <div className={styles.formGroup}>
            <p className={styles.formHeader}>{label}</p>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`${styles.formHeader} ${disabled ? styles.disabled : ''}`}
                disabled={disabled}
            />
        </div>
    );
};

export default Input;
