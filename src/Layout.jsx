import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import styles from "./styles/Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.phoneFrame}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}