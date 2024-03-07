import styles from './style.module.css';

interface HeaderProps {
    label: string;
}

const Header: React.FC<HeaderProps> = ({ label }) => <p className={styles.header}>{label}</p>;

export default Header;
