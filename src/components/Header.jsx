import menu from '../assets/images/menu.svg';
import styles from '../styles/Header.module.css';

export default function Header() {

  return (
    <header className={styles.header}>
      <img src={menu} alt="Menu Icon" className={styles.menuIcon} />
    </header>
  );
}