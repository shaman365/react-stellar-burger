import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"
import { useDrag } from "react-dnd"
import { ingredientPropType } from "../../utils/prop-types"
import { NavLink, useLocation } from "react-router-dom"

const getIngredientsCount = (ingredient, array) => {
    const count = array.reduce((total, item) => {
        if (item._id === ingredient._id) {
            return total += 1
        }
        return total
    }, 0)

    return count
}

const Ingredient = ({ ingredientData }) => {

    const location = useLocation();

    const getBurgerData = (state) => state.burgerData;

    const burgerData = useSelector(getBurgerData);

    let ingredientCount = 0

    if (ingredientData.type === 'bun') {
        ingredientCount = getIngredientsCount(ingredientData, burgerData.bun)
    } else {
        ingredientCount = getIngredientsCount(ingredientData, burgerData.ingredients)
    }

    const [, drag] = useDrag(() => ({
        type: 'ingredient',
        item: ingredientData,
    }))

    return (
        <li className={styles.ingredient} ref={drag}>
            <NavLink
                className={styles.link}
                to={`/ingredients/${ingredientData._id}`}
                state={{ background: location }}
            >

                <img className="ml-4 mr-4" src={ingredientData.image} alt={ingredientData.name} />
                <div className={`${styles.price} mt-1 mb-1}`}>
                    <p className="text text_type_digits-default">{ingredientData.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">
                    {ingredientData.name}
                </p>
            </NavLink>
            {
                ingredientCount > 0
                &&
                <Counter count={ingredientCount} size="default" extraClass={styles.counter} />
            }
        </li>
    )
}

Ingredient.propTypes = {
    ingredientData: ingredientPropType
}

export default Ingredient