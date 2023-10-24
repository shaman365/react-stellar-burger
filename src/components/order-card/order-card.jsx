import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";

export default function OrderCard() {
  const ingredientList = [
    {
      _id: "643d69a5c3f7b9001cfa093c",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0941",
      name: "Биокотлета из марсианской Магнолии",
      type: "main",
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa093e",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0942",
      name: "Соус Spicy-X",
      type: "sauce",
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: "https://code.s3.yandex.net/react/code/sauce-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa093f",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa0943",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
    {
      _id: "643d69a5c3f7b9001cfa093f",
      name: "Мясо бессмертных моллюсков Protostomia",
      type: "main",
      proteins: 433,
      fat: 244,
      carbohydrates: 33,
      calories: 420,
      price: 1337,
      image: "https://code.s3.yandex.net/react/code/meat-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
      __v: 0,
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <span className="text text_type_main-default">#034535</span>
        <span className="text text_type_main-small text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <div className={styles.info}>
        <p className={`text text_type_main-medium ${styles.burgerName}`}>
          Death Star Starship Main бургер
        </p>
        <p className={`text text_type_main-default ${styles.status}`}>Создан</p>
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
            <li className={styles.ingredient} style={{ zIndex: 1 }}>
              <img
                src={`${ingredientList[5].image_mobile}`}
                style={{ opacity: .7 }}
                width="115"
                height="54"
                alt="Изображение ингредиента"
              />
            </li>
          )}
          <li>
            <p
              className={`${styles.counter} text text_type_main-default`}
            >
              {`+${ingredientList.length - 5}`}
            </p>
          </li>
        </ul>
        <div className={styles.priceContainer}>
          <div className={`text text_type_digits-default ${styles.price}`}>
            480
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </section>
  );
}
