import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import DropDownArrow from '../assets/down-arrow.png';
import styles from './style.module.css';

// Song

interface Song {
  name: string;
  artist: string;
}

// DropdownProps

interface DropdownProps {
  label: string;
  songs: Song[];
  selected: string;
  onSelect: (selection: string) => void;
  disabled?: boolean;
}

// Dropdown

const Dropdown: React.FC<DropdownProps> = ({ label, songs, selected, onSelect, disabled }) => {

  // States

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside.

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    // Bind the event listener.

    document.addEventListener("mousedown", handleClickOutside);
    return () => {

      // Unbind the event listener on clean up.

      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset search query when dropdown is shown.

  useEffect(() => {

    if (showDropdown)
      setSearchQuery('');

  }, [showDropdown]);

  // handleSearchChange, filteredSongs, handleDropdownClick

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filters songs based on name or artist.

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery)
  );

  // handleDropdownClick

  const handleDropdownClick = () => {
    
    if (!disabled) 
      setShowDropdown(!showDropdown);
    
  };

  return (
    <div className={styles.formGroup}>
      <div className={styles.dropdown} ref={dropdownRef}>
        <p className={styles.formHeader}>{label}</p>
        <div className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`} ref={dropdownRef}>
          <div
            className={styles.dropdownButton}
            onClick={handleDropdownClick}
          >
            {selected || "Valitse alta"}
            <img
              src={DropDownArrow}
              alt="arrow"
              width={30}
              height={30}
              className={`${styles.dropdownArrow} ${showDropdown ? styles.dropdownArrowRotate : ''}`}
            />
          </div>
          {showDropdown && (
            <div className={styles.dropdownContent}>
              <input
                type="text"
                placeholder="Etsi kappale tai artisti..."
                onChange={handleSearchChange}
                className={styles.dropdownSearch}
              />
              {filteredSongs.length > 0 ? (
                filteredSongs.map((song, index) => (
                  <div key={index} className={styles.dropdownItem} onClick={() => { onSelect(`${song.name} - ${song.artist}`); setShowDropdown(false); }}>
                    <div className={styles.dropdownSongName}>{song.name}</div>
                    <div className={styles.dropdownArtistName}>{song.artist}</div>
                  </div>
                ))
              ) : (
                <div className={styles.dropdownItem}>Kappaletta ei löydy</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
