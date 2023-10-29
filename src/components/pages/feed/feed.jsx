import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./feed.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrderCard from "../../order-card/order-card";

export default function FeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const { orders, total, totalToday } = useSelector((state) => state.feedData);

  useEffect(() => {
    dispatch({
      type: "FEED_WS_CONNECTION_START",
      payload: "wss://norma.nomoreparties.space/orders/all",
    });    
  }, []);

  return (
    <main className={styles.main}>
      {location === "/feed" && (
        <>
          <section className={styles.feed}>
            <h1 className="text text_type_main-large">Лента заказов</h1>
            <ul className={`${styles.feedOrderList} custom-scroll`}>
              {orders.length > 0 &&
                orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
            </ul>
          </section>

          <section className={styles.stats}>
            <div className={styles.ordersBoard}>
              <div className={styles.listContainer}>
                <h3 className="text text_type_main-medium">Готовы:</h3>
                <ul className={`${styles.list} custom-scroll`}>
                  {orders.map((order) => {
                    if (order.status === "done") {
                      return (
                        <li
                          key={order._id}
                          className={`text text_type_digits-default ${styles.statusCompleted}`}
                        >
                          {order.number}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className={styles.listContainer}>
                <h3 className="text text_type_main-medium">В работе:</h3>
                <ul className={`${styles.list} custom-scroll`}>
                  {orders.map((order) => {
                    if (order.status !== "done") {
                      return (
                        <li
                          key={order._id}
                          className="text text_type_digits-default"
                        >
                          {order.number}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.statBlock}>
              <h3 className="text text_type_main-medium">
                Выполнено за все время:
              </h3>
              <p className="text text_type_digits-large">
                {total && total.toLocaleString(undefined, { minimumFractionDigits: 0 })}
              </p>
            </div>
            <div className={styles.statBlock}>
              <h3 className="text text_type_main-medium">
                Выполнено за сегодня:
              </h3>
              <p className="text text_type_digits-large">{totalToday}</p>
            </div>
          </section>
        </>
      )}    
      <Outlet/>  
    </main>
  );
}
