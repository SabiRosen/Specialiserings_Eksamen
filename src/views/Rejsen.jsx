import { useNavigate } from "react-router-dom";
import styles from "../styles/Rejsen.module.css";

const levels = [
  { id: 1, state: "completed", position: { top: "12%", left: "20%" } },
  { id: 2, state: "completed", position: { top: "28%", left: "68%" } },
  { id: 3, state: "current",   position: { top: "52%", left: "38%" } },
  { id: 4, state: "locked",    position: { top: "72%", left: "16%" } },
  { id: 5, state: "locked",    position: { top: "88%", left: "62%" } },
];

function LevelNode({ level }) {
  const navigate = useNavigate();

  function handleClick() {
    if (level.state === "current") navigate("/intro");
  }

  return (
    <div
      className={`${styles.node} ${styles[level.state]}`}
      style={level.position}
      onClick={handleClick}
    >
      {level.state === "completed" && <span>✓</span>}
      {level.state === "current" && <span>▶</span>}
      {level.state === "locked" && <span>🔒</span>}
    </div>
  );
}

export default function Rejsen() {
  return (
    <div className={styles.page}>

      <div className={styles.infoBar}>
        <h1 className={styles.title}>Sofies Verden</h1>
        <div className={styles.xp}>
          <span>XP</span>
          <span className={styles.star}>★</span>
        </div>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressLabels}>
          <span>2/8</span>
          <span>Titel: Opdagelsesrejsende</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: "25%" }} />
        </div>
      </div>

      <div className={styles.map}>
        <div className={styles.cavePlaceholder} />

        <svg className={styles.path} viewBox="0 0 360 600" preserveAspectRatio="none">
        <path
            d="M 70 60 C 80 120, 260 140, 250 210 C 240 280, 80 300, 130 390 C 155 430, 80 480, 90 540 C 95 570, 220 580, 240 620"
            stroke="#5a8fa8"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
        />
        </svg>

        {levels.map((level) => (
          <LevelNode key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}