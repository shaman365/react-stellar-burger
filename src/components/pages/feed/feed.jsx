import { useNavigate } from "react-router-dom";

import styles from "./feed.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../services/user";

import OrderCard from "../../order-card/order-card";

export default function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <main className={styles.main}>
      <section className={styles.feed}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
        <ul className={`${styles.feedOrderList} custom-scroll`}>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </ul>
      </section>

      <section className={styles.stats}>
        <div className={styles.ordersBoard}>
          <div className={styles.listContainer}>
            <h3 className="text text_type_main-medium pb-">Готовы:</h3>
            <ul className={`${styles.list} custom-scroll`}>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034533</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034532</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034530</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034527</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034525</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034533</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034532</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034530</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034527</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034525</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034533</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034532</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034530</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034527</li>
              <li className={`text text_type_digits-default ${styles.statusCompleted}`}>034525</li>
              
            </ul>
          </div>
          <div className={styles.listContainer}>

            <h3 className="text text_type_main-medium">В работе:</h3>
            <ul className={`${styles.list} custom-scroll`}>
              <li className="text text_type_digits-default">034533</li>
              <li className="text text_type_digits-default">034532</li>
              <li className="text text_type_digits-default">034530</li>
            </ul>
          </div>
        </div>
        <div className={styles.statBlock}>
            <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
            <p className="text text_type_digits-large">28 752</p>
        </div>
        <div className={styles.statBlock}>
            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
            <p className="text text_type_digits-large">138</p>
        </div>
      </section>
    </main>
  );
}
