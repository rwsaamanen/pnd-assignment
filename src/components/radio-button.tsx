import React from 'react';
import styles from './style.module.css';

// RadioButtonProps

interface RadioButtonProps {
    selectedValue: string;
    setSelectedValue: (value: string) => void;
    disabled: boolean;
    header: string;
}

// RadioButton

const RadioButton: React.FC<RadioButtonProps> = ({ selectedValue, setSelectedValue, disabled, header }) => {
    const keys = ['-2', '-1', '0', '+1', '+2'];

    // handleChange

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className={styles.formGroup}>
            <p className={styles.formHeader}>{header}</p>
            <div className={`${styles.radioButton} ${disabled ? styles.disabled : ''}`}>
                {keys.map((value) => (
                    <React.Fragment key={value}>
                        <input
                            type="radio"
                            id={`option-${value}`}
                            value={value}
                            checked={selectedValue === value}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                        <label htmlFor={`option-${value}`}>
                            {value}
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default RadioButton;
