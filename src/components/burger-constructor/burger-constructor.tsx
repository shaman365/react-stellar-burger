import { useMemo } from "react";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { addBun, addIngredient } from "../../services/burger";
import { getOrderData } from "../../services/order";
import { useDrop } from "react-dnd"
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, TIngredient } from "../../types/types"

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const burgerData = useAppSelector((state: RootState) => state.burgerData);

  const [, drop] = useDrop(() => ({
    accept: 'ingredient',
    drop: (item: TIngredient) => {
      item.type === 'bun' ? dispatch(addBun(item)) : dispatch(addIngredient(item));
    }
  }))

  const ingredientList = useMemo(() => burgerData.ingredients, [burgerData]);
  const bun = useMemo(() => burgerData.bun, [burgerData]);

  const price = useMemo(() => {
    let ingredientCost = 0;
    let bunCost = 0;
    ingredientCost = ingredientList
      ? ingredientList.reduce((sum: number, item: TIngredient) => {
        return sum + item.price;
      }, 0)
      : 0;
    bunCost = bun.length > 0 ? bun[0].price * 2 : 0;

    return ingredientCost + bunCost;
  }, [ingredientList, bun]);

    const handleSetOrder = () => {
    const allIngredients: TIngredient[] = [...bun, ...ingredientList]  

    if (allIngredients.length >= 1) {
      navigate('/order', { state: { background: location } })
      dispatch(getOrderData(allIngredients))
    }
  };

  return (
    <section className={`${styles.section} mt-25`} ref={drop}>
      <div className={`${styles.constructor}`}>
        {
          bun.length > 0 && (
            <ConstructorElement
              type="top"
              text={bun[0].name + ' ' + '(верх)'}
              price={bun[0].price}
              thumbnail={bun[0].image}
              isLocked
              extraClass='ml-8 mr-2'
            />
          )
        }
        <ul className={`${styles.ingredients} custom-scroll`}>
          {
            ingredientList.map((item: TIngredient) => (<BurgerIngredient ingredientData={item} key={item.key} />))
          }
        </ul>
        {
          bun.length > 0 && (
            <ConstructorElement
              type="bottom"
              text={bun[0].name + ' ' + '(низ)'}
              price={bun[0].price}
              thumbnail={bun[0].image}
              isLocked
              extraClass='ml-8 mr-2'
            />
          )
        }
      </div>
      <div className={`${styles.order} mt-10`}>
        <div className={styles.price}>
          <p className="text text_type_digits-default">
            {price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleSetOrder}
          disabled={!bun.length}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
