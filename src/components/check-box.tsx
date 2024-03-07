import React from 'react';
import styles from './style.module.css';

// CheckboxProps

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

// Checkbox

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled }) => {
  return (
    <div className={styles.formGroup}>
      <div className={`${styles.checkboxContainer} ${disabled ? styles.disabled : ''}`} onClick={() => onChange(!checked)}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => { }}
          className={styles.hiddenCheckbox}
          aria-hidden="true"
        />
        <span className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
          {/* I have already added the checkmark character using CSS */}
        </span>
        {label}
      </div>
    </div>
  );
};

export default Checkbox;
