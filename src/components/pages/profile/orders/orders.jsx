import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import styles from "./orders.module.css";
import OrderCard from "../../../order-card/order-card";

export default function Orders() {
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  const getHistoryData = (state) => state.historyData;

  const { orders } = useSelector(getHistoryData);

  useEffect(() => {
    dispatch({
      type: "HISTORY_WS_CONNECTION_START",
      payload: `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem("accessToken").split("Bearer ")[1]
        }`,
    });

    return () => {
      dispatch({ type: "HISTORY_ORDERS_WS_CONNECTION_STOP" });
    }

  }, []);

  return (
    <>
      {location === "/profile/orders" && (
        <ul className={`${styles.orderList} custom-scroll`}>
          {orders.length > 0 &&
            orders.map((order) => <OrderCard key={order._id} order={order} />)}
          {
            orders.length === 0 &&
            <li className={`${styles.noOrdersText} text text_type_main-large`}>Список заказов пуст</li>
          }
        </ul>
      )}
      <Outlet />
    </>
  );
}
