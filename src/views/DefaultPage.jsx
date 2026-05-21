import Header from "../components/Header";
import gyldendallogo from '../assets/images/gyldendal-logo.png';
import Login from "../components/Login";
import styles from '../styles/DefaultPage.module.css';
import BookSelection from "../components/BookSelection";
import { useState } from "react";

export default function DefaultPage() {
    const [selectedBook, setSelectedBook] = useState(null);

  return (
    <main className={styles.page}>
        <div className={styles.content}>
            <img src={gyldendallogo} alt="Gyldendal Logo" className={styles.logo} />

            <BookSelection selected={selectedBook} onSelect={setSelectedBook} />

            <Login selectedBook={selectedBook} />
        </div>
    </main>
  );
}