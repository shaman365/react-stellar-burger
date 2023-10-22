import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styles from "./home.module.css";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalData);

  const { loading, error } = useSelector((state) => state.ingredientsData);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          {!error && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
          {loading && (
            <p className="text text_type_main-large">Загрузка данных...</p>
          )}
          {error && (
            <p className="text text_type_main-large">
              Ошибка, попробуйте позже ({error.message})
            </p>
          )}
        </main>
      </DndProvider>
    </>
  );
}
