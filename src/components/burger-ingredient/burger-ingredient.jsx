import styles from "./burger-ingredient.module.css"
import { useDispatch } from "react-redux"
import { useDrag, useDrop } from "react-dnd"
import { ingredientPropType } from "../../utils/prop-types"
import { deleteIngredient, sortIngredients } from "../../services/burger"
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import { useSelector } from "react-redux"

export default function BurgerIngredient({ingredientData}) {

  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.burgerData.ingredients)
  const dropIndex = ingredients.findIndex(item => item.key === ingredientData.key)
  
  const [, drag, preview] = useDrag(() => ({
    type: 'burgerIngredient',
    item: ingredientData,
  }))

  const [, drop] = useDrop(() => ({
    accept: 'burgerIngredient',
    hover: (item) => {
      const dragIndex = ingredients.findIndex(ingredient => ingredient.key === item.key)
      dispatch(sortIngredients({dragIndex: dragIndex, dropIndex:dropIndex}))
    },
    drop: (item) => {
      const dragIndex = ingredients.findIndex(ingredient => ingredient.key === item.key)
      dispatch(sortIngredients({dragIndex: dragIndex, dropIndex:dropIndex}))
    }
  }))
  
  return (
    <div ref={preview}>
      <li className={`${styles.ingredient} mr-2`} ref={drop}>
        <div ref={drag}>
          <DragIcon type="primary"/>
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

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType
} 