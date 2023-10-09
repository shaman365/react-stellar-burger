import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import MainPage from "../pages/main";
import LoginPage from "../pages/login";

// import {ProtectedRouteElement} from "./components/protected-route";
// import {ProvideAuth} from "./services/auth";

{
  /* <Route path="/" element={<ProtectedRouteElement element={<HomePage />}/>} /> */
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
