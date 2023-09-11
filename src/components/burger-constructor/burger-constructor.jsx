import { useMemo, useContext } from "react";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { BurgerContext, OrderDispatchContext, BurgerDispatchContext } from "../../services/appContext";
import api from "../../utils/api";

const BurgerConstructor = ({ onOpenModal }) => {
  const burgerData = useContext(BurgerContext);

  const burgerDataDispatch = useContext(BurgerDispatchContext);
  const orderDataDispatch = useContext(OrderDispatchContext);

  const ingredientList = useMemo(() => burgerData.ingredients, [burgerData]);

  const bun = useMemo(() => burgerData.bun, [burgerData]);

  const price = useMemo(() => {
    let ingredientCost = 0;
    let bunCost = 0;
    ingredientCost = ingredientList
      ? ingredientList.reduce((sum, item) => {
        return sum + item.price;
      }, 0)
      : 0;
    bunCost = bun ? bun.price * 2 : 0;
    return ingredientCost + bunCost;
  }, [ingredientList, bun]);

  const handleSetOrder = () => {
    const ingredientIdList = getingredientIdList([bun, ...ingredientList]);
    if (ingredientIdList.length > 0) {
      api
        .setOrder(ingredientIdList)
        .then((res) => {
          orderDataDispatch({
            type: "addOrder",
            payload: res,
          });
        })
        .then((res) => {
          onOpenModal("order");
        })
        .then(_ => {
          burgerDataDispatch({ type: "clearIngredients" })
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getingredientIdList = (array) => {
    return array.reduce((total, item) => {
      return [...total, item._id];
    }, []);
  };

  return (
    <section className={styles.section}>
      {bun && (
        <ConstructorElement
          type="top"
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
          isLocked="true"
          extraClass="ml-8 mr-2"
        />
      )}
      <ul className={`${styles.ingredients} custom-scroll`}>
        {ingredientList.map((item, index) => (
          <li className={`${styles.ingredient} mr-2`} key={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => {
                burgerDataDispatch({
                  type: "deleteIngredient",
                  id: item._id,
                });
              }}
            />
          </li>
        ))}
      </ul>
      {bun && (
        <ConstructorElement
          type="bottom"
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
          isLocked="true"
          extraClass="ml-8 mr-2"
        />
      )}
      <div className={`${styles.order} mt-10`}>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleSetOrder}
          disabled={!bun}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
};

export default BurgerConstructor;
