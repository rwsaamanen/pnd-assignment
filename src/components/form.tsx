import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { sortSongsByName } from '../lib/utils';
import { QueueItem } from '../lib/types';
import Header from './header';
import Dropdown from './dropdown';
import PhotoInput from './photo-input';
import RadioButton from './radio-button';
import Checkbox from './check-box';
import Input from './input';
import Button from './button';

import styles from './style.module.css';

// FormProps

interface FormProps {
    onAddToQueue: (item: QueueItem) => void;
}

// FormData

interface FormData {
    name: string;
    songs: { name: string; artist: string }[];
    selectedSong: string;
    key: string;
    consent: boolean;
    photo?: File;
}

// Form

const Form: React.FC<FormProps> = ({ onAddToQueue }) => {

    // States

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState(false);
    const [inputKey, setInputKey] = useState(Date.now());
    const [processing, setProcessing] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        songs: sortSongsByName([
            { name: 'Beat It', artist: 'Michael Jackson' },
            { name: 'The Show Must Go On', artist: 'Queen' },
            { name: 'Kultaa Hiuksissa', artist: 'Olavi Uusivirta' },
            { name: 'Shape of You', artist: 'Ed Sheeran' },
            { name: 'Blinding Lights', artist: 'The Weeknd' },
            { name: 'Bohemian Rhapsody', artist: 'Queen' },
            { name: 'Smells Like Teen Spirit', artist: 'Nirvana' },
            { name: 'Bad Guy', artist: 'Billie Eilish' },
            { name: 'Uptown Funk', artist: 'Mark Ronson feat. Bruno Mars' },
            { name: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee' },
            { name: 'Old Town Road', artist: 'Lil Nas X ft. Billy Ray Cyrus' },
            { name: 'Lose Yourself', artist: 'Eminem' },
            { name: 'Thinking Out Loud', artist: 'Ed Sheeran' },
            { name: 'Stairway to Heaven', artist: 'Led Zeppelin' },
            { name: 'Hotel California', artist: 'Eagles' },
            { name: 'Africa', artist: 'Toto' },
            { name: 'Rolling in the Deep', artist: 'Adele' },
        ]),
        selectedSong: '',
        key: '',
        consent: false,
        photo: undefined,
    });

    // validateForm

    const validateForm = useCallback(() => {
        const newErrors: { [key: string]: string } = {};

        // Validation checks.

        if (!formData.name)
            newErrors["name"] = "Valitse nimi tai nimimerkki";

        if (!formData.selectedSong)
            newErrors["song"] = "Valitse kappale";

        if (!formData.key)
            newErrors["key"] = "Valitse sävellaji";

        if (!formData.consent)
            newErrors["consent"] = "Hyväksy tietojen tallennus";

        setErrors(newErrors);

        // Return true if there are no errors.

        return Object.keys(newErrors).length === 0;
    }, [formData.name, formData.selectedSong, formData.key, formData.consent]);

    // handleInputChange, handlePhotoChange, handleConsentChange, handleSubmit

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setFormData({
            ...formData,
            photo: file,
        });
    };

    const handleConsentChange = (checked: boolean) => {
        setFormData({
            ...formData,
            consent: checked,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);

        // Bonus task: Add loading state to the form submission.
        // Simulate asynchronous form submission with a timeout, like an API request.

        setTimeout(() => {

            // Bonus task: Add form validation to the form submission.
            // I decided to create own validation instead react-hook-form or formik.

            const isValid = validateForm();

            if (isValid) {

                // Find the selected song from the list of songs.

                const selectedSong = formData.songs.find(song => `${song.name} - ${song.artist}` === formData.selectedSong);
                if (selectedSong && formData.key) {

                    // Call the onAddToQueue prop function, passing a new queue item object.

                    onAddToQueue({
                        name: formData.name,
                        song: selectedSong,
                        key: formData.key,
                        image: formData.photo,
                    });

                    // Clear the form fields and reset the submitted flag.

                    setFormData(prev => ({
                        ...prev,
                        name: '',
                        selectedSong: '',
                        key: '',
                        consent: false,
                        photo: undefined,
                    }));

                    // Force re-render the photo input by changing its key attribute.

                    setInputKey(Date.now());
                    setSubmitted(false);
                } else {

                    // This should never happen, because form validation prevents it.

                    console.error("Form submission error");
                }
            }

            setProcessing(false);
            setSubmitted(true);
        }, 1000);
    };

    // handleButtonClick

    const handleButtonClick = () => {
        handleSubmit({} as FormEvent<HTMLFormElement>);
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <Header label="Ilmoittautumislomake" />
                <Input
                    id="name"
                    name="name"
                    label="Nimi tai nimimerkki*"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=""
                    required
                    disabled={processing}
                />
                {submitted && errors.name && <p className={styles.error}>{errors.name}</p>}
                <PhotoInput
                    label="Kasvokuva"
                    key={inputKey}
                    handlePhotoChange={handlePhotoChange}
                    disabled={processing} />
                <Dropdown
                    label="Biisi*"
                    songs={formData.songs}
                    selected={formData.selectedSong} onSelect={(selection: string) => {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            selectedSong: selection,
                        }));
                    }} disabled={processing}
                />
                {submitted && errors.song && <p className={styles.error}>{errors.song}</p>}
                <RadioButton
                    label="Sävellaji*"
                    selectedValue={formData.key}
                    setSelectedValue={(key: string) => {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            key: key,
                        }));
                    }}
                    disabled={processing}
                />
                {submitted && errors.key && <p className={styles.error}>{errors.key}</p>}
                <Checkbox
                    label="Sallin tietojeni tallennuksen karaokejärjestelmään"
                    checked={formData.consent}
                    onChange={handleConsentChange}
                    disabled={processing}
                />
                {submitted && errors.consent && <p className={styles.error}>{errors.consent}</p>}
                <Button label='Ilmoittaudu' onClick={handleButtonClick} disabled={processing} loading={processing} />
            </form>
        </>
    );
};

export default Form;
