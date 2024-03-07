import React from 'react';
import styles from './style.module.css';

// Nav

const Nav: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <a href="https://github.com/rwsaamanen/pnd-assignment" className={styles.link} target='_blank'>
                Source code
            </a>
        </nav>
    );
};

export default Nav;
