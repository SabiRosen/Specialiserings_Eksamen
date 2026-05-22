import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import styles from "../styles/Stats.module.css";

export default function Stats() {
  const navigate = useNavigate();
  const totalPoints = parseInt(localStorage.getItem("totalPoints") || 0);
  const userName = localStorage.getItem("userName") || "Elev";

  // Calculate correct answers based on max possible points
  // Max points: quiz1 (9) + quiz2 (9) + minigame1 (9) + minigame2 (9) = 36
  const maxPoints = 36;
  const correctAnswers = Math.round((totalPoints / maxPoints) * 8);

  function handleHome() {
    localStorage.removeItem("totalPoints");
    navigate("/");
  }

  return (
    <div className={styles.page}>

      {/* Image placeholder */}
      <div className={styles.imagePlaceholder} />

      {/* Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.title}>Du kom ud af hulen!</h1>
        <p className={styles.subtitle}>Du tænker nu som Platon</p>
      </div>

      {/* Stat cards */}
      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={styles.cardValue}>+{totalPoints}</span>
          <span className={styles.cardLabel}>XP</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardValue}>{correctAnswers}/8</span>
          <span className={styles.cardLabel}>Rigtige</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardValue}>#8</span>
          <span className={styles.cardLabel}>Klassen</span>
        </div>
      </div>

      {/* Quote */}
      <div className={styles.quote}>
        <p className={styles.quoteText}>
          Platons pointe: Det vi ser med øjnene er kun skygger af den sande virkelighed bag tingene
        </p>
      </div>

      {/* Home button */}
      <div className={styles.button}>
        <CTAButton label="Hjem" onClick={handleHome} />
      </div>

    </div>
  );
}