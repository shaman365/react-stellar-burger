import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../pages/home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/user";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration"
import ForgotPasswordPage from "../pages/forgot-password"
import ResetPasswordPage from "../pages/reset-password"
import ProfilePage from "../pages/profile"
import IngredientDetails from "../ingredient-details/ingredient-details"
import ProfileForm from "../pages/profile-form"
import AppHeader from "../app-header/app-header"
import Orders from "../pages/orders"
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { OnlyAuth, OnlyUnAuth } from "../app/protected-route";
import { loadIngredients } from "../../services/ingredients";
import api from "../../utils/api"

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);


  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientDetails isFullScreen={true} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<Orders />}>
            {/* <Route path=":id" element={<OrdersId />} /> */}
          </Route>
        </Route>
      </Routes >

      {background &&
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails isFullScreen={false} />
              </Modal>
            }
          />

          <Route
            path='/order'
            element={
              <OnlyAuth
                component={
                  <Modal onClose={handleModalClose}>
                    <OrderDetails />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      }
    </>

  );
}

export default App;
