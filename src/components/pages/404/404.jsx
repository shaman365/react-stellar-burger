import styles from "./404.module.css";
import { Link } from "react-router-dom";

export default function FeedPage() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-large mt-20">
          Ой, такой страницы нет ┐(￣ヘ￣)┌
        </p>
        <Link to="/">
        <p className={`text text_type_main-large mt-20 ${styles.link}`}>вернуться на главную</p>
        </Link>
      </section>
    </main>
  );
}
