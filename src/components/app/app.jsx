import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import HomePage from "../pages/home";

{
  /* <Route path="/" element={<ProtectedRouteElement element={<HomePage />}/>} /> */
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </DndProvider>
  );
}

export default App;
