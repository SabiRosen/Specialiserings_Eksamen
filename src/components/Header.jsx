import menu from '../assets/images/menu.svg';
import styles from '../styles/Header.module.css';
import back from '../assets/images/back.svg';

export default function Header() {

  return (
    <header className={styles.header}>
        <img src={back} alt="back arrow" className={styles.backIcon} /> 
      <img src={menu} alt="Menu Icon" className={styles.menuIcon} />
    </header>
  );
}