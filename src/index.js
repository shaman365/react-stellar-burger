import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { store } from "./services/store";
import { Provider } from 'react-redux'
import LoginPage from "./components/pages/login";
import RegistrationPage from "./components/pages/registration"
import ForgotPasswordPage from "./components/pages/forgot-password"
import ResetPasswordPage from "./components/pages/reset-password"
import ProfilePage from "./components/pages/profile"
import IngredientDetailsPage from "./components/pages/ingredient-details"


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode >,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
