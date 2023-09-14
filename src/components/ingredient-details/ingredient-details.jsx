import styles from './ingredient-details.module.css'
import { ingredientPropType } from '../../utils/prop-types';

const IngredientDetails = ({ ingredient }) => {

  console.log('IngredientDetails. ingredient: ', ingredient);

  return (
    <div className={styles.container}>
      <p className={`${styles.title} text text_type_main-large mt-10 ml-10`}>
        Детали ингредиента
      </p>
      <img src={ingredient.image_large} alt="Изображение ингредиента" />
      <p className="text text_type_main-medium mt-4">
        {ingredient.name}
      </p>
      <ul className={`${styles.details} mt-8 mb-15`}>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.calories}
          </p>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.fat}
          </p>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType,
};

export default IngredientDetails