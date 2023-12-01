import { useEffect, useState } from "react";
import styles from "./order-id.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../types/hooks";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
import {
  getIngrediensCountWithIndexes,
  isEmptyObj,
  getIngredientById,
} from "../../utils/utils";
import { getIngredientsDataFromStore } from "../../utils/utils";
import { TIngredient, TOrder } from "../../types/types";

export default function OrderId() {
  const { number } = useParams();

  const { ingredients }: { ingredients: TIngredient[] } = useAppSelector(getIngredientsDataFromStore);

  const [order, setOrder] = useState<{ data: TOrder | null, error: boolean }>({
    data: null,
    error: false,
  });

  useEffect(() => {
    if (number)
      api.getOrder(number).then((res) => {
        setOrder({ ...order, data: res.orders[0] });
      });
  }, []);

  let ingredientList: TIngredient[] = [], orderPrice: number = 0;

  if (order.data) {
    ingredientList = order.data.ingredients.map((item) =>
      getIngredientById(ingredients, item)
    );
    orderPrice = ingredientList.reduce((sum, item) => {
      return sum + (item ? item.price : 0);
    }, 0);
  }

  const orderStatus = () => {
    return order.data?.status === "done"
      ? "Выполнен"
      : order.data?.status === "pending"
        ? "Готовится"
        : order.data?.status === "created"
          ? "Создан"
          : "n/a";
  };

  return (
    <section className={styles.section}>
      <p className={`${styles.orderNumber} text text_type_digits-default`}>
        {`#${order.data?.number}`}
      </p>
      <p className={`${styles.orderTitle} text text_type_main-medium`}>
        {order.data?.name}
      </p>
      <p
        className={`${styles.orderStatus
          } text text_type_main-default text_color_inactive ${order.data?.status === "done" ? styles.statusDone : ""
          }`}
      >
        {orderStatus()}
      </p>
      <p className={`${styles.orderStructure} text text_type_main-medium`}>
        Состав:
      </p>
      <ul className={`${styles.ingredients} custom-scroll`}>
        {ingredientList &&
          ingredientList.map((item, index, array) => {
            const { count, indexes } = getIngrediensCountWithIndexes(
              item,
              array
            );
            if (count > 1 && index === indexes[0]) {
              return (
                <li className={styles.ingredient} key={index}>
                  <div
                    className={styles.ingredientImage}
                    style={{ backgroundImage: `url(${item?.image_mobile})` }}
                  ></div>
                  <p
                    className={`${styles.ingredientTitle} text text_type_main-default`}
                  >
                    {item?.name}
                  </p>
                  <div className={styles.ingredientPrice}>
                    <p className="text text_type_digits-default">
                      {`${count}x${item?.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              );
            }
            if (count > 1 && index !== indexes[0]) {
              return null;
            }
            return (
              <li className={styles.ingredient} key={index}>
                <div
                  className={styles.ingredientImage}
                  style={{ backgroundImage: `url(${item?.image_mobile})` }}
                ></div>
                <p
                  className={`${styles.ingredientTitle} text text_type_main-default`}
                >
                  {item?.name}
                </p>
                <div className={styles.ingredientPrice}>
                  <p className="text text_type_digits-default">
                    {`${count}x${item?.price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
      </ul>
      <div className={styles.summary}>
        {
          order.data && 
          <FormattedDate
            date={new Date(order.data.createdAt)}
            className="text text_type_main-default text_color_inactive"
          />
        }
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}
