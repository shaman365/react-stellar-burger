import styles from "./app.module.css";
import { data } from "../../utils/data";
import Header from "../header/header"

function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
      	<Header/>
        
      </pre>
    </div>
  );
}

export default App;
