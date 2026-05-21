import { useLocation, useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import styles from "../styles/Results.module.css";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const points = state?.points ?? 0;
  const nextRoute = state?.nextRoute ?? "/rejsen";
  const nextState = state?.nextState ?? null;

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Tillykke!</h1>
        <p className={styles.subtitle}>Du har optjent</p>
        <div className={styles.trophy}>🏆</div>
        <p className={styles.points}>+{points}</p>
        <p className={styles.label}>visdomspoint</p>
      </div>
      <div className={styles.button}>
        <CTAButton label="Fortsæt" onClick={() => navigate(nextRoute, { state: nextState })} />
      </div>
    </div>
  );
}