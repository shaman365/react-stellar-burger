import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDispatch, useSelector } from "react-redux"
import { openModalIngredient } from '../../services/modal'
import { useDrag } from "react-dnd"
import { ingredientPropType } from "../../utils/prop-types"

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

    const dispatch = useDispatch()

    const burgerData = useSelector(state => state.burgerData)

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
            <button
                className={styles.button}
                onClick={() => {
                    dispatch(openModalIngredient(ingredientData))
                }}
            >
                <img className="ml-4 mr-4" src={ingredientData.image} alt={ingredientData.name} />
                <div className={`${styles.price} mt-1 mb-1}`}>
                    <p className="text text_type_digits-default">{ingredientData.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className="text text_type_main-default">
                    {ingredientData.name}
                </p>
            </button>
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