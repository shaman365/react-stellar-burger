import {useEffect, useState} from 'react'
import styles from "./app.module.css";
//import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import api from '../../utils/api'

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    api.getIngredients()
    .then(resultData => setData(resultData.data))
    .catch(error => {
    });
  }, []
  )
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
