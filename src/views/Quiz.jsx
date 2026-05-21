import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import CTAButton from "../components/CTAButton";
import styles from "../styles/Quiz.module.css";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const question = questions[current];
  const isLast = current === questions.length - 1;
  const [score, setScore] = useState(0);

  function handleSelect(option) {
    if (selected) return; // lock after selecting
    setSelected(option);
    if (option === question.correct) {
        const newScore = score + 3;
        setScore(newScore);
        localStorage.setItem("quizScore", newScore);
    }
  }

  function handleNext() {
    if (!selected) return;
    if (isLast) {
        const total = parseInt(localStorage.getItem("totalPoints") || 0) + score;
        localStorage.setItem("totalPoints", total);
        navigate("/results", { state: { points: score, nextRoute: "/minigame1" } });
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

      {/* Progress */}
      <div className={styles.progressBar}>
        <span className={styles.progressText}>{current + 1} / {questions.length}</span>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className={styles.content}>
        <h2 className={styles.question}>{question.question}</h2>

        {/* Options */}
        <div className={styles.options}>
          {question.options.map((option) => (
            <button
              key={option}
              className={getOptionClass(option)}
              onClick={() => handleSelect(option)}
            >
              {option}
              {selected && option === question.correct && (
                <span className={styles.icon}>✓</span>
              )}
              {selected && option === selected && option !== question.correct && (
                <span className={styles.icon}>✗</span>
              )}
            </button>
          ))}
        </div>

        {/* Karakter placeholder */}
        <div className={styles.karakter}>
          <span>🔥</span>
          <span className={styles.karakterLabel}>Karakter</span>
        </div>
      </div>

      {/* Button */}
      <div className={styles.button}>
        <CTAButton
          label={isLast ? "Se resultat" : "Næste"}
          onClick={handleNext}
          disabled={!selected}
        />
      </div>

    </div>
  );
}