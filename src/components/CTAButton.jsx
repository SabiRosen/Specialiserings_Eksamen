import styles from "../styles/CTAButton.module.css";

export default function CTAButton({ label, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
}