import { useEffect, useState } from 'react'
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients, reducer } from '../../services/ingredients';

function App() {

  //const [data, setData] = useState({ ingredients: [], hasError: false, errorMessage: '' });
  //const [modalActive, setModalActive] = useState({ active: false, type: '', ingredient: '' });

  const dispatch = useDispatch();
  const modalData = useSelector((state) => state.modalData)

  console.log('modalData: ', modalData)

  const { loading, error } = useSelector(state => state.ingredientsData);

  useEffect(() => {
    dispatch(loadIngredients())
  }, []
  )

  return (
    //    <AppHeader />
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={styles.main}>
        {
          !error && (
            <>
              {/* <h2>la la la </h2> */}
              <BurgerIngredients />
              {/* <BurgerConstructor /> */}
            }
            </>
          )
        }                {
          loading && (
            <p className="text text_type_main-large">
              Загрузка данных...
            </p>
          )
        }

        {
          error && (
            <p className="text text_type_main-large">
              Ошибка, попробуйте позже ({error.message})
            </p>
          )
        }
      </main>
      <div className={styles.modals_container}>
        {
          modalData.active && (
            <Modal>
              {
                modalData.type === 'order' &&
                <OrderDetails />
              }
              {
                modalData.type === 'ingredient' &&
                <IngredientDetails ingredient={modalData.ingredient} />
              }
            </Modal>
          )
        }
      </div>
    </DndProvider >
  );
}

export default App;
