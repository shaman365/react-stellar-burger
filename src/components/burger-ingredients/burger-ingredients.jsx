import React from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { ingredientPropType } from '../../utils/prop-types';

const BurgerIngredients = ({ data }) => {
    const [current, setCurrent] = React.useState('bun');

    const bunList = React.useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
    const mainList = React.useMemo(() => data.filter((item) => item.type === 'main'), [data]);
    const sauceList = React.useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);

    return (
        <section className={styles.section}>

            <h1 className="text text_type_main-large">Соберите бургер</h1>

            <nav className={styles.nav}>

                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>

            <div className={`${styles.constructor} mt-10 custom-scroll`}>
                <p className="text text_type_main-medium mb-6">
                    Булки
                </p>
                <ul className={`${styles.ingredients} ml-4`}>
                    {
                        bunList.map(item => (
                            <li className={styles.ingredient} key={item._id}>
                                <button className={styles.button}>
                                    <img className="ml-4 mr-4" src={item.image} alt={item.name} />
                                    <div className={`${styles.price} mt-1 mb-1}`}>
                                        <p className="text text_type_digits-default">{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className="text text_type_main-default">
                                        {item.name}
                                    </p>
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
                <p className="text text_type_main-medium mb-6">
                    Соусы
                </p>
                <ul className={`${styles.ingredients} ml-4`}>
                    {
                        sauceList.map(item => (
                            <li className={styles.ingredient} key={item._id}>
                                <button className={styles.button}>
                                    <img className="ml-4 mr-4" src={item.image} alt={item.name} />
                                    <div className={`${styles.price} mt-1 mb-1}`}>
                                        <p className="text text_type_digits-default">{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className="text text_type_main-default">
                                        {item.name}
                                    </p>
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
                <p className="text text_type_main-medium mb-6">
                    Начинка
                </p>
                <ul className={`${styles.ingredients} ml-4`}>
                    {
                        mainList.map(item => (
                            <li className={styles.ingredient} key={item._id}>
                                <button className={styles.button}>
                                    <img className="ml-4 mr-4" src={item.image} alt={item.name} />
                                    <div className={`${styles.price} mt-1 mb-1}`}>
                                        <p className="text text_type_digits-default">{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                    <p className="text text_type_main-default">
                                        {item.name}
                                    </p>
                                </button>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: ingredientPropType
};

export default BurgerIngredients;