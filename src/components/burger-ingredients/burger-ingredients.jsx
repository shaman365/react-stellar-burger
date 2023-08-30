import { useMemo, useState, useRef } from 'react';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { ingredientsPropType } from '../../utils/prop-types';
import PropTypes from 'prop-types';

const BurgerIngredients = ({ data, onOpenModal }) => {
    const [current, setCurrent] = useState('bun');
    
    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    const bunList = useMemo(() => data.filter((item) => item.type === 'bun'), [data]);
    const mainList = useMemo(() => data.filter((item) => item.type === 'main'), [data]);
    const sauceList = useMemo(() => data.filter((item) => item.type === 'sauce'), [data]);

    return (
        <section className={styles.section}>

            <h1 className="text text_type_main-large">Соберите бургер</h1>

            <nav className={styles.nav}>

                <Tab value="bun" active={current === 'bun'} onClick={() => {setCurrent('bun'); bunRef.current.scrollIntoView({behavior: 'smooth',block: 'start'})}}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => {setCurrent('sauce'); sauceRef.current.scrollIntoView({behavior: 'smooth',block: 'start'})}}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => {setCurrent('main'); mainRef.current.scrollIntoView({behavior: 'smooth',block: 'start'})}}>
                    Начинки
                </Tab>
            </nav>

            <div className={`${styles.constructor} mt-10 custom-scroll`}>
                <p className="text text_type_main-medium mb-6" ref={bunRef}>
                    Булки
                </p>
                <ul className={`${styles.ingredients} ml-4`}>
                    {
                        bunList.map(item => (
                            <li className={styles.ingredient} key={item._id}>
                                <button className={styles.button} onClick={() => {onOpenModal('ingredient', item)}}>
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
                <p className="text text_type_main-medium mb-6" ref={sauceRef}>
                    Соусы
                </p>
                <ul className={`${styles.ingredients} ml-4`}>
                    {
                        sauceList.map(item => (
                            <li className={styles.ingredient} key={item._id}>
                                <button className={styles.button} onClick={() => {onOpenModal('ingredient', item)}}>
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
                <p className="text text_type_main-medium mb-6" ref={mainRef}>
                    Начинка
                </p>
                <ul className={`${styles.ingredients} ml-4`}>
                    {
                        mainList.map(item => (
                            <li className={styles.ingredient} key={item._id}>
                                <button className={styles.button} onClick={() => {onOpenModal('ingredient', item)}}>
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
    data: ingredientsPropType,
    onOpenModal: PropTypes.func.isRequired
};

export default BurgerIngredients;