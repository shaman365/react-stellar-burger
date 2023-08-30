import {useEffect, useState} from 'react'
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import api from '../../utils/api'

function App() {

  const [data, setData] = useState({ingredients: [], hasError: false, errorMessage: ''});
  const [modalActive, setModalActive] = useState({active: false, type: '', ingredient: ''});

  useEffect(() => {
    api.getIngredients()
    .then(resultData => setData({...data, ingredients: [...resultData.data]}))
    .catch(error => setData({...data, hasError: true, errorMessage: error}));
  }, []
  )

  function handleOpenModal(modalType, ingredient = {}) {
    if (modalType === 'order')   {
      setModalActive({...modalActive, active: true,type: 'order'})
    } else if (modalType === 'ingredient') {
      setModalActive({...modalActive, active: true, type: 'ingredient', ingredient: ingredient})
    }
  }

  function handleCloseModal() {
    setModalActive({
      ...modalActive,
      active: false
    });
  }
  
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {
          !data.hasError && (
            <>
              <BurgerIngredients data={data.ingredients} onOpenModal={handleOpenModal}/>
              <BurgerConstructor data={data.ingredients} onOpenModal={handleOpenModal}/>
            </>
          )
        }
        {
          data.hasError && (
            <p className="text text_type_main-large">
              Ошибка, попробуйте позже ({data.errorMessage})
          </p>   
          )
        }      
      </main>
      <div className={styles.modals_container}>
        {
          modalActive.active && (
          <Modal onCloseModal={handleCloseModal}>
            {
              modalActive.type === 'order' &&
              <OrderDetails/>
            }
            {
              modalActive.type === 'ingredient' &&
              <IngredientDetails ingredient={modalActive.ingredient}/>
            }          
          </Modal>
          )
        }
      </div>
      </>
  );
}

export default App;
