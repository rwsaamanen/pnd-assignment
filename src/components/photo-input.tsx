// Bonus task: Add a photo input component.

import React, { useRef, useState } from 'react';
import styles from './style.module.css';

// PhotoInputProps

interface PhotoInputProps {
    label: string;
    handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const PhotoInput: React.FC<PhotoInputProps> = ({ label, handlePhotoChange, disabled }) => {

    // States

    const [imagePreview, setImagePreview] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');

    // Reference to the hidden file input element.

    const fileInputRef = useRef<HTMLInputElement>(null);

    // internalHandlePhotoChange
    // Handle photo change and set image preview.

    const internalHandlePhotoChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        handlePhotoChange(event);

        // Extracts first file from the event and sets the file name and image preview.

        const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : undefined;

        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFileName('');
            setImagePreview('');
        }
    };

    // handleRemoveFile

    const handleRemoveFile = (event: React.MouseEvent<HTMLButtonElement>) => {

        // Prevent event bubbling.

        event.stopPropagation();
        setFileName('');
        setImagePreview('');

        // Reset the file input value to allow re-uploading the same file if desired

        if (fileInputRef.current)
            fileInputRef.current.value = '';

    };

    return (
        <div className={styles.formGroup}>
            <label htmlFor="photo" className={styles.fileUpload}>
                <p className={styles.formHeader}>{label}</p>
                <div className={`${styles.uploadWrapper} ${disabled ? styles.disabled : ''}`}>
                    <span>{fileName || '+ Tuo kasvokuva'}</span>
                    <input type="file" id="photo" name="photo" onChange={internalHandlePhotoChange} className={styles.hiddenInput} />
                </div>
            </label>
            {imagePreview && (
                <>
                    <div className={styles.fileButtonContainer}>
                        <button className={styles.fileRemoveButton} onClick={handleRemoveFile}>
                            Poista kuva
                        </button>
                    </div>
                    <div className={styles.imagePreviewWrapper}>
                        <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                    </div>
                </>
            )}
        </div>
    );
};

export default PhotoInput;
