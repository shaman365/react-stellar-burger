import { Routes, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import HomePage from "../pages/home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </DndProvider>
  );
}

export default App;
