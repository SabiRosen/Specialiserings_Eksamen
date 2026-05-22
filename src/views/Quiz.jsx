import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { questions1 } from "../data/questions";
import CTAButton from "../components/CTAButton";
import styles from "../styles/Quiz.module.css";

export default function Quiz() {
  const { state } = useLocation();
  const questions = state?.questions ?? questions1;
  const nextRoute = state?.nextRoute ?? "/minigame1";

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const question = questions[current];
  const isLast = current === questions.length - 1;

  function handleSelect(option) {
    if (selected) return;
    setSelected(option);
    if (option === question.correct) {
      setScore(prev => prev + 3);
    }
  }

  function handleNext() {
    if (!selected) return;
    if (isLast) {
      const newScore = selected === question.correct ? score + 3 : score;
      const total = parseInt(localStorage.getItem("totalPoints") || 0) + newScore;
      localStorage.setItem("totalPoints", total);
      navigate("/results", { state: { points: newScore, nextRoute } });
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  }

  function getOptionClass(option) {
    if (!selected) return styles.option;
    if (option === question.correct) return `${styles.option} ${styles.correct}`;
    if (option === selected) return `${styles.option} ${styles.wrong}`;
    return styles.option;
  }

  return (
    <div className={styles.page}>
      <div className={styles.progressBar}>
        <span className={styles.progressText}>{current + 1} / {questions.length}</span>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className={styles.content}>
        <h2 className={styles.question}>{question.question}</h2>
        <div className={styles.options}>
          {question.options.map((option) => (
            <button
              key={option}
              className={getOptionClass(option)}
              onClick={() => handleSelect(option)}
            >
              {option}
              {selected && option === question.correct && <span className={styles.icon}>✓</span>}
              {selected && option === selected && option !== question.correct && <span className={styles.icon}>✗</span>}
            </button>
          ))}
        </div>
        <div className={styles.karakter}>
          <span>🔥</span>
          <span className={styles.karakterLabel}>Karakter</span>
        </div>
      </div>

      <div className={styles.button}>
        <CTAButton label={isLast ? "Se resultat" : "Næste"} onClick={handleNext} disabled={!selected} />
      </div>
    </div>
  );
}