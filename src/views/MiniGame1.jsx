import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/MiniGame1.module.css";
import caveWall from "../assets/images/cave_wall_shadows.jpg";
import { questions2 } from "../data/questions";

const shadows = [
    { id: "person", emoji: "🚶", label: "Person", top: "62%", left: "84%" },
    { id: "horse",  emoji: "🐴", label: "Hest",   top: "25%", left: "83%" },
    { id: "flame",  emoji: "🔥", label: "Flamme", top: "24%", left: "22%" },
];

function calculatePoints(secondsLeft, foundCount) {
    if (foundCount === 0) return 0;
    if (secondsLeft > 60) return 9;
    if (secondsLeft > 30) return 6;
    return 3;
}

export default function MiniGame1() {
    const [found, setFound] = useState([]);
    const [timeLeft, setTimeLeft] = useState(90);
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (finished) return;
    if (timeLeft === 0) {
      handleFinish(0, found.length);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

  // Check if all found
  useEffect(() => {
    if (found.length === shadows.length && !finished) {
      handleFinish(timeLeft, found.length);
    }
  }, [found]);

  function handleFinish(secondsLeft, foundCount) {
    setFinished(true);
    const points = calculatePoints(secondsLeft, foundCount);
    const total = parseInt(localStorage.getItem("totalPoints") || 0) + points;
    localStorage.setItem("totalPoints", total);
    setTimeout(() => {
      navigate("/results", { 
        state: { 
            points, 
            nextRoute: "/story",
            nextState: { 
                startIndex: 4, 
                nextRoute: "/quiz",
                nextState: { questions: questions2, nextRoute: "/minigame2" }
             }
         } 
        });
    }, 600);
  }

  function handleShadowClick(id) {
    if (found.includes(id) || finished) return;
    setFound([...found, id]);
  }

  const progressPercent = (found.length / shadows.length) * 100;

  return (
    <div className={styles.page}>

      {/* Progress bar */}
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Find skyggerne på væggen</h2>
        <p className={styles.timer}>Tid: {timeLeft} sek</p>
      </div>

      {/* Cave wall with hotspots */}
      <div className={styles.imageWrapper}>
        <img src={caveWall} alt="Cave wall" className={styles.image} />
        <span className={styles.magnifier}>🔍</span>

        {shadows.map((shadow) => (
          <button
            key={shadow.id}
            className={`${styles.hotspot} ${found.includes(shadow.id) ? styles.found : ""}`}
            style={{ top: shadow.top, left: shadow.left }}
            onClick={() => handleShadowClick(shadow.id)}
          >
            {found.includes(shadow.id) && <span className={styles.foundMark}>✓</span>}
          </button>
        ))}
      </div>

      {/* Object icons to find */}
      <div className={styles.objectsBar}>
        {shadows.map((shadow) => (
          <div
            key={shadow.id}
            className={`${styles.objectCard} ${found.includes(shadow.id) ? styles.objectFound : ""}`}
          >
            <span className={styles.objectEmoji}>{shadow.emoji}</span>
          </div>
        ))}
      </div>

    </div>
  );
}