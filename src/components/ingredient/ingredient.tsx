import styles from './ingredient.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { useDrag } from "react-dnd"
import { NavLink, useLocation } from "react-router-dom"
import { RootState, TIngredient, TIngredientProps, TBurgerData } from "../../types/types"
import { useAppSelector } from '../../types/hooks'

const getIngredientsCount = (ingredient: TIngredient, array: TIngredient[]) => {
    const count = array.reduce((total, item) => {
        if (item._id === ingredient._id) {
            return total += 1
        }
        return total
    }, 0)

    return count
}

const Ingredient = ({ ingredientData }: TIngredientProps) => {

    const location = useLocation();

    const getBurgerData = (state: RootState) => state.burgerData as TBurgerData;

    const burgerData = useAppSelector(getBurgerData);

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

export default Ingredient