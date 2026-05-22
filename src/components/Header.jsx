import menu from '../assets/images/menu.svg';
import styles from '../styles/Header.module.css';
import back from '../assets/images/back.svg';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

  return (
    <header className={styles.header}>
        <img src={back} alt="back arrow" className={styles.backIcon} onClick={() => navigate(-1)} />
      <img src={menu} alt="Menu Icon" className={styles.menuIcon} />
    </header>
  );
}