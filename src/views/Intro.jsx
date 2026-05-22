import { useNavigate } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import styles from "../styles/Intro.module.css";
import { questions1 } from "../data/questions";
import introForside from "../assets/images/intro-forside.jpg";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
        <img src={introForside} alt="Intro Forside" className={styles.backgroundImage} />
        <div className={styles.content}>
            <h1 className={styles.title}>Velkommen til hulelignelsen</h1>
            <p className={styles.text}>
            Er skyggerne på væggen virkeligheden? Eller findes der mere end hvad der er lige foran os?
            </p>
        </div>
        <div className={styles.button}>
            <CTAButton label="Start rejsen" onClick={() => navigate("/story", { state: { startIndex: 0, nextRoute: "/quiz", nextState: { questions: questions1, nextRoute: "/minigame1" } } })} />
        </div>
    </div>
  );
}