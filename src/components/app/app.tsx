import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../pages/home/home";
import { useAppDispatch } from "../../types/hooks";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/user";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration";
import ForgotPasswordPage from "../pages/forgot-password";
import ResetPasswordPage from "../pages/reset-password";
import ProfilePage from "../pages/profile/profile";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfileForm from "../pages/profile/form/profile-form";
import AppHeader from "../app-header/app-header";
import Orders from "../pages/profile/orders/orders";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import FeedPage from "../pages/feed/feed";
import Page404 from "../pages/404/404";
import OrderId from "../order-id/order-id";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { loadIngredients } from "../../services/ingredients";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const PATH_HOME = "/";
  const PATH_INGREDIENTS = "/ingredients/:ingredientId";
  const PATH_LOGIN = "/login";
  const PATH_REGISTER = "/register";
  const PATH_FORGOT = "/forgot-password";
  const PATH_RESET = "/reset-password";
  const PATH_PROFILE = "/profile";
  const PATH_ORDER_LIST = "orders";
  const PATH_ORDER = "/order";
  const PATH_FEED = "/feed";
  const PATH_FEED_ORDER_NUMBER = PATH_FEED + "/:number";
  const PATH_PROFILE_ORDER_NUMBER =
    PATH_PROFILE + "/" + PATH_ORDER_LIST + "/:number";

  const background: null | Location = location.state && location.state.background;

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
        <Route
          path={PATH_INGREDIENTS}
          element={<IngredientDetails isFullScreen={true} />}
        />
        <Route
          path={PATH_LOGIN}
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path={PATH_REGISTER}
          element={<OnlyUnAuth component={<RegistrationPage />} />}
        />
        <Route
          path={PATH_FORGOT}
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path={PATH_RESET}
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path={PATH_PROFILE}
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route index element={<ProfileForm />} />
          <Route path={PATH_ORDER_LIST} element={<Orders />}>
            <Route path=":number" element={<OrderId />} />
          </Route>
        </Route>
        <Route path={PATH_FEED} element={<FeedPage />}>
          <Route path=":number" element={<OrderId />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>

      {background && (
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
          <Route
            path={PATH_FEED_ORDER_NUMBER}
            element={
              <Modal onClose={handleModalClose}>
                <OrderId />
              </Modal>
            }
          />
          <Route
            path={PATH_PROFILE_ORDER_NUMBER}
            element={
              <Modal onClose={handleModalClose}>
                <OrderId />
              </Modal>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
    </>
  );
}

export default App;
