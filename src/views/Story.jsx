import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import { slides } from "../data/storyslides";
import styles from "../styles/Story.module.css";

export default function Story() {
  const { state } = useLocation();
  const startIndex = state?.startIndex ?? 0;
  const nextRoute = state?.nextRoute ?? "/quiz";
  const nextState = state?.nextState ?? null;

  const [current, setCurrent] = useState(startIndex);
  const navigate = useNavigate();
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  function handleNext() {
    if (isLast) {
      navigate(nextRoute, { state: nextState});
    } else {
      setCurrent(current + 1);
    }
  }

  const total = slides.length - startIndex;
  const currentProgress = current - startIndex + 1;

  return (
    <div className={styles.page}>
      <div className={styles.progressBar}>
        <span className={styles.progressText}>{currentProgress} / {total}</span>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${(currentProgress / total) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.content}>
        <img src={slide.image} alt={`Slide ${slide.id}`} className={styles.image} />
        <p className={styles.text}>{slide.text}</p>
      </div>

      <div className={styles.button}>
        <CTAButton
          label={isLast ? "Fortsæt" : "Næste"}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}