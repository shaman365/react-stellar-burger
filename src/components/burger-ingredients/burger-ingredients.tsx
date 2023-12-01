import { useMemo, useRef, useState } from "react";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import Ingredient from '../ingredient/ingredient';
import { getIngredientsDetailsFromStore } from "../../utils/utils"
import { useAppSelector } from "../../types/hooks";
import { TIngredient } from "../../types/types";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");

  const bunRef = useRef<HTMLParagraphElement>(null);
  const sauceRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLParagraphElement>(null);
  const ingredientsContainer = useRef<HTMLDivElement>(null);

  const data = useAppSelector(getIngredientsDetailsFromStore);

  const bunList = useMemo(
    () => data && data.filter((item: TIngredient) => item.type === "bun"),
    [data]
  ) as TIngredient[];

  const mainList = useMemo(
    () => data && data.filter((item: TIngredient) => item.type === "main"),
    [data]
  ) as TIngredient[];

  const sauceList = useMemo(
    () => data && data.filter((item: TIngredient) => item.type === "sauce"),
    [data]
  ) as TIngredient[];

  const handleScroll = () => {
    const containerScroll = ingredientsContainer.current ? ingredientsContainer.current.getBoundingClientRect().top : 0;
    const bunScroll = bunRef.current ? bunRef.current.getBoundingClientRect().top - containerScroll : 0;
    const sauceScroll = sauceRef.current ? sauceRef.current.getBoundingClientRect().top - containerScroll : 0;
    const mainScroll = mainRef.current ? mainRef.current.getBoundingClientRect().top - containerScroll : 0;
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
            bunRef.current?.scrollIntoView({
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
            sauceRef.current?.scrollIntoView({
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
            mainRef.current?.scrollIntoView({
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
            bunList?.map(item => (<Ingredient ingredientData={item} key={item._id} />))
          }
        </ul>
        <p className="text text_type_main-medium mb-6" ref={sauceRef}>
          Соусы
        </p>
        <ul className={`${styles.ingredients} ml-4`}>
          {
            sauceList?.map(item => (<Ingredient ingredientData={item} key={item._id} />))
          }
        </ul>
        <p className="text text_type_main-medium mb-6" ref={mainRef}>
          Начинка
        </p>
        <ul className={`${styles.ingredients} ml-4`}>
          {
            mainList?.map(item => (<Ingredient ingredientData={item} key={item._id} />))
          }
        </ul>
      </div>
    </section >
  );
};

export default BurgerIngredients;
