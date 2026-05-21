import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import styles from "../styles/Intro.module.css";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Velkommen til hulelignelsen</h1>
        <p className={styles.text}>
          Er skyggerne på væggen virkeligheden? Eller findes der mere end hvad der er lige foran os?
        </p>
      </div>
      <div className={styles.button}>
        <CTAButton label="Start rejsen" onClick={() => navigate("/story")} />
      </div>
    </div>
  );
}