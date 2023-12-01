import styles from "./burger-ingredient.module.css"
import { useDrag, useDrop } from "react-dnd"
import { deleteIngredient, sortIngredients } from "../../services/burger"
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { RootState, TIngredient, TIngredientProps } from "../../types/types"
import { useAppDispatch, useAppSelector } from "../../types/hooks"

export default function BurgerIngredient({ ingredientData }: TIngredientProps) {

  const dispatch = useAppDispatch()

  const getIngredients = (state: RootState) => state.burgerData.ingredients;
  const ingredients: TIngredient[] = useAppSelector(getIngredients);
  const dropIndex = ingredients.findIndex(item => item.key === ingredientData.key)

  const [, drag, preview] = useDrag(() => ({
    type: 'burgerIngredient',
    item: ingredientData,
  }))

  const [, drop] = useDrop(() => ({
    accept: 'burgerIngredient',
    hover: (item: TIngredient) => {
      const dragIndex = ingredients.findIndex(ingredient => ingredient.key === item.key)
      dispatch(sortIngredients({ dragIndex: dragIndex, dropIndex: dropIndex }))
    },
    drop: (item: TIngredient) => {
      const dragIndex = ingredients.findIndex(ingredient => ingredient.key === item.key)
      dispatch(sortIngredients({ dragIndex: dragIndex, dropIndex: dropIndex }))
    }
  }))

  return (
    <div ref={preview}>
      <li className={`${styles.ingredient} mr-2`} ref={drop}>
        <div ref={drag}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={ingredientData.name}
          price={ingredientData.price}
          thumbnail={ingredientData.image}
          handleClose={() => {
            dispatch(deleteIngredient(ingredientData))
          }}
        />
      </li>
    </div>
  )
}