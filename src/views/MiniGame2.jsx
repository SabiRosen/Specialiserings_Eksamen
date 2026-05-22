import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import styles from "../styles/MiniGame2.module.css";

const rounds = [
  {
    id: 1,
    answer: "Et træ",
    options: ["Et træ", "En raket", "En bjørn"],
  },
  {
    id: 2,
    answer: "En fugl",
    options: ["En fugl", "En sommerfugl", "Et blad"],
  },
  {
    id: 3,
    answer: "En sten",
    options: ["En sten", "Et jordegern", "En busk"],
  },
];

const MAX_TRIES = 3;

// blur levels per wrong attempt: 3 tries = very blurry, 2 = medium, 1 = slight, 0 = clear
const blurLevels = [12, 7, 3, 0];

export default function MiniGame2() {
  const [roundIndex, setRoundIndex] = useState(0);
  const [triesLeft, setTriesLeft] = useState(MAX_TRIES);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [roundDone, setRoundDone] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  const round = rounds[roundIndex];
  const correctlyAnswered = roundDone && triesLeft > 0;
  const blur = correctlyAnswered ? 0 : blurLevels[MAX_TRIES - triesLeft];
  const isLastRound = roundIndex === rounds.length - 1;

  function handleGuess(option) {
    if (roundDone) return;

    if (option === round.answer) {
      const points = triesLeft;
      setTotalScore(prev => prev + points);
      setRoundDone(true);
    } else {
      const newTries = triesLeft - 1;
      setWrongAnswers([...wrongAnswers, option]);
      setTriesLeft(newTries);
      if (newTries === 0) {
        setRoundDone(true);
      }
    }
  }

  function handleNext() {
    if (isLastRound) {
      const total = parseInt(localStorage.getItem("totalPoints") || 0) + totalScore;
      localStorage.setItem("totalPoints", total);
      navigate("/results", { state: { points: totalScore, nextRoute: "/stats" } });
    } else {
        setTransitioning(true);
        setTimeout(() => {
          setRoundIndex(roundIndex + 1);
          setTriesLeft(MAX_TRIES);
          setWrongAnswers([]);
          setRoundDone(false);
          setTransitioning(false);
        }, 300);
      }
  }

  function getOptionClass(option) {
    if (!roundDone && !wrongAnswers.includes(option)) return styles.option;
    if (option === round.answer && roundDone) return `${styles.option} ${styles.correct}`;
    if (wrongAnswers.includes(option)) return `${styles.option} ${styles.wrong}`;
    return styles.option;
  }

  function getIcon(option) {
    if (option === round.answer && roundDone) return "✓";
    if (wrongAnswers.includes(option)) return "✗";
    return null;
  }

  return (
    <div className={styles.page}>

      {/* Progress bar */}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${((roundIndex + 1) / rounds.length) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Du er kommet ud af hulen, men dine øjne kan ikke tåle lyset endnu. Hvad tror du, at du ser?
        </h2>
      </div>

      {/* Blurry image placeholder */}
      <div className={styles.imageWrapper}>
        <div
          className={styles.imagePlaceholder}
          style={{ 
            filter: transitioning ? "blur(12px)" : `blur(${blur}px)`,
            opacity: transitioning ? 0 : 1,
            transition: "filter 0.6s ease, opacity 0.3s ease"}}
        >
          <span className={styles.placeholderEmoji}>
            {roundIndex === 0 && "🌳"}
            {roundIndex === 1 && "🐦"}
            {roundIndex === 2 && "🪨"}
          </span>
        </div>
      </div>

      {/* Tries indicator */}
      <div className={styles.tries}>
        {Array.from({ length: MAX_TRIES }).map((_, i) => (
          <div
            key={i}
            className={`${styles.tryDot} ${i >= triesLeft ? styles.tryUsed : ""}`}
          />
        ))}
      </div>

      {/* Answer options */}
      <div className={styles.options}>
        {round.options.map((option) => (
          <button
            key={option}
            className={getOptionClass(option)}
            onClick={() => handleGuess(option)}
            disabled={wrongAnswers.includes(option) || roundDone}
          >
            {option}
            {getIcon(option) && (
              <span className={styles.icon}>{getIcon(option)}</span>
            )}
          </button>
        ))}
      </div>

      {/* Next button — only shows when round is done */}
      {roundDone && (
        <div className={styles.button}>
          <CTAButton
            label={isLastRound ? "Se resultat" : "Næste"}
            onClick={handleNext}
          />
        </div>
      )}

    </div>
  );
}