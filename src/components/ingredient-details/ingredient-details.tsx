import styles from './ingredient-details.module.css'
import { useAppSelector } from '../../types/hooks';
import { useParams } from 'react-router-dom';
import { getIngredientById } from '../../utils/utils';
import { getIngredientsDetailsFromStore } from "../../utils/utils"
import { TIngredientDetailsProps, TIngredient } from "../../types/types"

const IngredientDetails = ({ isFullScreen }: TIngredientDetailsProps) => {

  const { ingredientId } = useParams();
  const data = useAppSelector(getIngredientsDetailsFromStore) as TIngredient[];

  const ingredient: TIngredient = getIngredientById(data, ingredientId);

  return (
    <section className={isFullScreen ? styles.section : ''}>
      <div className={styles.container}>
        {ingredient &&
          <>
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
          </>
        }
      </div>
    </section>
  )
}

export default IngredientDetails