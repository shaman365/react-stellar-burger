import { useState } from "react";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const [status, setStatus] = useState(null);

  const forgotPassword = (e) => {
    setStatus("loading")
    api
      .forgot(form)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("isResetRequested", true);
        navigate("/reset-password");
        e.preventDefault();
      })
      .catch((error) => {
        console.error("forgotPassword error: ", error);
        setStatus("rejected")
      });
  };

  return (
    <div className="section">
      <AppHeader />

      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="button"
          type="primary"
          value={form.email}
          name={"email"}
          size="large"
          onClick={forgotPassword}
          disabled={form.email.length < 4}
        >
          Восстановить
        </Button>
      </div>
      <div className={styles.additionalActions}>
        <h3 className="text text_type_main-small">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </h3>
      </div>
      <div className={styles.messageContaner}>
        {status === "loading" && <span className={styles.loader}></span>}
        {status === "rejected" && (
          <p className="text text_type_main-medium">Ошибка, попробуйте позже.</p>
        )}
      </div>
    </div>
  );
}
