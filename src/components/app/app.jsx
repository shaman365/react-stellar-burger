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

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const PATH_HOME = '/';
  const PATH_INGREDIENTS = '/ingredients/:ingredientId'
  const PATH_LOGIN = '/login';
  const PATH_REGISTER = '/register';
  const PATH_FORGOT = '/forgot-password';
  const PATH_RESET = '/reset-password';
  const PATH_PROFILE = '/profile';
  const PATH_ORDER_LIST = '/orders';
  const PATH_ORDER = '/order';

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(loadIngredients());
  }, []);


  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const handleModalClose = () => {
    navigate(-1);
  };


  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={PATH_HOME} element={<HomePage />} />
        <Route path={PATH_INGREDIENTS} element={<IngredientDetails isFullScreen={true} />} />
        <Route path={PATH_LOGIN} element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path={PATH_REGISTER} element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path={PATH_FORGOT} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path={PATH_RESET} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path={PATH_PROFILE} element={<OnlyAuth component={<ProfilePage />} />}>
          <Route index element={<ProfileForm />} />
          <Route path={PATH_ORDER_LIST} element={<Orders />}>
            {/* <Route path=":id" element={<OrdersId />} /> */}
          </Route>
        </Route>
      </Routes >

      {background &&
        <Routes>
          <Route
            path={PATH_INGREDIENTS}
            element={
              <Modal onClose={handleModalClose}>
                <IngredientDetails isFullScreen={false} />
              </Modal>
            }
          />

          <Route
            path={PATH_ORDER}
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
