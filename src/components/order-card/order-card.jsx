import { useMemo } from "react"
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIngredientById } from "../../utils/utils";
import { Link } from "react-router-dom";
import { getIngredientsDataFromStore } from "../../utils/utils";

export default function OrderCard({ order }) {
  const location = useLocation();

  const { ingredients } = useSelector(getIngredientsDataFromStore);

  const ingredientList = useMemo(() => order.ingredients.map((item) =>
    getIngredientById(ingredients, item), [order.ingredients])
  );

  const orderPrice = ingredientList.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  let url;

  if (location.pathname === "/feed") {
    url = `/feed/${order.number}`;
  }
  if (location.pathname === "/profile/orders") {
    url = `/profile/orders/${order.number}`;
  }

  const orderStatus = () => {
    return order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'n/a';
  }

  return (
    <Link to={url} state={{ background: location }}>
      <section className={styles.container}>
        <div className={styles.title}>
          <span className="text text_type_main-default">{`#${order.number}`}</span>
          <span className="text text_type_main-small text_color_inactive">
            {<FormattedDate date={new Date(order.createdAt)} />}
          </span>
        </div>
        <div className={styles.info}>
          <p className={`text text_type_main-medium ${styles.burgerName}`}>
            {order.name}
          </p>
          {location.pathname === "/profile/orders" && (
            <p className={`${styles.status} text text_type_main-default ${order.status === 'pending' ? styles.statusPending : ''}}`}>
              {orderStatus()}
            </p>
          )}
        </div>
        <div className={styles.componentsAndPrice}>
          <ul className={styles.ingredientList}>
            {ingredientList.map((item, index) => {
              if (index <= 4) {
                const zIndex = 6 - index;
                return (
                  <li
                    className={styles.ingredient}
                    key={index}
                    style={{ zIndex: zIndex }}
                  >
                    <img
                      src={item.image_mobile}
                      width="115"
                      height="54"
                      alt="Изображение ингредиента"
                    />
                  </li>
                );
              }
              return null;
            })}
            {ingredientList.length > 5 && (
              <>
                <li className={styles.ingredient} style={{ zIndex: 1 }}>
                  <img
                    src={`${ingredientList[5].image_mobile}`}
                    style={{ opacity: 0.7 }}
                    width="115"
                    height="54"
                    alt="Изображение ингредиента"
                  />
                </li>

                <li>
                  <p className={`${styles.counter} text text_type_main-default`}>
                    {`+${ingredientList.length - 5}`}
                  </p>
                </li>
              </>
            )}
          </ul>
          <div className={styles.priceContainer}>
            <div className={`text text_type_digits-default ${styles.price}`}>
              {orderPrice}
            </div>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    </Link>
  );
}
