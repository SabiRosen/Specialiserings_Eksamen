import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTAButton from "./CTAButton";
import styles from '../styles/Login.module.css';

export default function Login({ selectedBook }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  function handleStart() {
    if (name.trim() === "" || code.trim() === "" || !selectedBook) return;
    localStorage.setItem("userName", name);
    localStorage.setItem("classCode", code);
    navigate("/rejsen");
  }

  return (
    <div className={styles.login}>
      <input
        type="text"
        placeholder="Skriv din klassekode..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={styles.input}
      />
      <input
        type="text"
        placeholder="Skriv dit navn..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <CTAButton label="Start" onClick={handleStart} />
    </div>
  );
}