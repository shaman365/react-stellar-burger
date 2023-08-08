import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { ingredientPropType } from '../../utils/prop-types';

const BurgerConstructor = ({ data }) => {

    const ingredientList = React.useMemo(() => data.filter(item => item.type == "sauce" || item.type == "main"), [data]);
    const bunList = React.useMemo(() => data.filter(item => item.type == "bun"), [data]);
    const price = React.useMemo(() => ingredientList.reduce((sum, item) => { return sum + item.price }, 0) + bunList.reduce((sum, item) => { return sum + item.price }, 0), [data]);

    return (
        <section className={styles.section}>
            {
                bunList.length > 0 && (
                    <ConstructorElement
                        type="top"
                        text={bunList[0].name + ' ' + '(верх)'}
                        price={bunList[0].price}
                        thumbnail={bunList[0].image}
                        isLocked='true'
                        extraClass='ml-8 mr-2'
                    />
                )
            }
            <ul className={`${styles.ingredients} custom-scroll`}>
                {
                    ingredientList.map(item => (
                        <li className={`${styles.ingredient} mr-2`} key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    ))
                }
            </ul>
            {
                bunList.length > 0 && (
                    <ConstructorElement
                        type="bottom"
                        text={bunList[1].name + ' ' + '(низ)'}
                        price={bunList[1].price}
                        thumbnail={bunList[1].image}
                        isLocked='true'
                        extraClass='ml-8 mr-2'
                    />
                )
            }
            <div className={`${styles.order} mt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-default">
                        {price}
                    </p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: ingredientPropType
};

export default BurgerConstructor;