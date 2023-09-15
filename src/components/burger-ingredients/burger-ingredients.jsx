import { useMemo, useRef, useState } from "react";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import Ingredient from '../ingredient/ingredient';


const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const ingredientsContainer = useRef();

  const data = useSelector((state) => state.ingredientsData.ingredients);

  const bunList = useMemo(
    () => data && data.filter((item) => item.type === "bun"),
    [data]
  );
  const mainList = useMemo(
    () => data && data.filter((item) => item.type === "main"),
    [data]
  );
  const sauceList = useMemo(
    () => data && data.filter((item) => item.type === "sauce"),
    [data]
  );

  const handleScroll = () => {
    const containerScroll = ingredientsContainer.current.getBoundingClientRect().top
    const bunScroll = bunRef.current.getBoundingClientRect().top - containerScroll
    const sauceScroll = sauceRef.current.getBoundingClientRect().top - containerScroll
    const mainScroll = mainRef.current.getBoundingClientRect().top - containerScroll
    const maxOffset = -30
    if (bunScroll <= 0 && bunScroll > maxOffset) {
      setCurrent("bun");
    }
    else if (sauceScroll <= 0 && sauceScroll > maxOffset) {
      setCurrent("sauce");
    }
    else if (mainScroll <= 0 && mainScroll > maxOffset) {
      setCurrent("main");
    }
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>

      <nav className={styles.nav}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => {
            setCurrent("bun");
            bunRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => {
            setCurrent("sauce");
            sauceRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => {
            setCurrent("main");
            mainRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          Начинки
        </Tab>
      </nav>

      <div className={`${styles.constructor} mt-10 custom-scroll`} ref={ingredientsContainer} onScroll={handleScroll}>
        <p className="text text_type_main-medium mb-6" ref={bunRef}>
          Булки
        </p>
        <ul className={`${styles.ingredients} ml-4`}>
          {
            bunList.map(item => (<Ingredient ingredientData={item} key={item._id} />))
          }
        </ul>
        <p className="text text_type_main-medium mb-6" ref={sauceRef}>
          Соусы
        </p>
        <ul className={`${styles.ingredients} ml-4`}>
          {
            sauceList.map(item => (<Ingredient ingredientData={item} key={item._id} />))
          }
        </ul>
        <p className="text text_type_main-medium mb-6" ref={mainRef}>
          Начинка
        </p>
        <ul className={`${styles.ingredients} ml-4`}>
          {
            mainList.map(item => (<Ingredient ingredientData={item} key={item._id} />))
          }
        </ul>
      </div>
    </section >
  );
};

export default BurgerIngredients;
