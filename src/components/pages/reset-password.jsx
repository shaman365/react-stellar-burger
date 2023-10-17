import { useState } from "react";
import styles from "./pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import api from "../../utils/api";


export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [form, setValue] = useState({ token: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log('useEffect localStorage.getItem("isResetRequested"): ', localStorage.getItem("isResetRequested"));
    if (!localStorage.getItem("isResetRequested")) {
      navigate('/')
    }
  }, []);


  const [status, setStatus] = useState(null);

  const resetPassword = (e) => {
    setStatus("loading")
    api.reset(form).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.removeItem("isResetRequested");
      navigate("/login");
      e.preventDefault();
    })
    .catch(error => {
      console.error("forgotPassword error: ", error);
      setStatus("rejected")
    })
  };

  return (
    <div>
      <AppHeader />

      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          name={"password"}
          onChange={onChange}
          value={form.password}
          extraClass="mt-24"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.token}
          name={"token"}
        />
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={resetPassword}
          disabled={form.password.length < 6 || form.token.length < 1}
        >
          Сохранить
        </Button>
      </div>
      <div className={styles.additionalActions}>
        <h3 className="text text_type_main-small">
          Вспомнили пароль?
          <Link className={styles.link} to="/register">
            Войти
          </Link>
        </h3>
      </div>
      <div className={styles.messageContaner}>
        {status === "loading" && <span className={styles.loader}></span>}
        {status === "rejected" && (
          <p className="text text_type_main-medium">Ошибка. Проверьте введенный код и попробуйте еще раз.</p>
        )}
      </div>
    </div>
  );
}
