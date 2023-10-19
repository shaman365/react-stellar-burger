import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/user";
import LoginPage from "../pages/login";
import RegistrationPage from "../pages/registration"
import ForgotPasswordPage from "../pages/forgot-password"
import ResetPasswordPage from "../pages/reset-password"
import ProfilePage from "../pages/profile"
import IngredientDetailsPage from "../pages/ingredient-details"
import ProfileForm from "../pages/profile-form"
import AppHeader from "../app-header/app-header"
import Orders from "../pages/orders"
import { OnlyAuth, OnlyUnAuth } from "../app/protected-route";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
      </Routes >
    </>

  );
}

export default App;
