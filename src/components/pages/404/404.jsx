import { useNavigate } from "react-router-dom";

import styles from "./404.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../services/user";

export default function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <p className="text text_type_digits-large">404</p>
        <p className="text text_type_main-large mt-20">
          Ой, такой страницы нет ┐(￣ヘ￣)┌
        </p>
        <p className={`text text_type_main-large mt-20 ${styles.link}`}>вернуться на главную</p>
      </section>
    </main>
  );
}
