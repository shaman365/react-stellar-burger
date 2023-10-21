import { useEffect } from "react";
import styles from "./pages.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login, clearStatus } from "../../services/user";

import { useForm } from "../../hooks/useForm";

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { status } = useSelector((state) => state.user);

  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  }

  useEffect(() => {
    dispatch(clearStatus());
  }, [location]);

  return (
    <>
      <form name="login" onSubmit={handleSubmit}>
        <div className={styles.login}>
          <h2 className="text text_type_main-medium">Вход</h2>
          <EmailInput
            onChange={handleChange}
            value={values.email}
            name={"email"}
            placeholder="Логин"
          />
          <PasswordInput
            name={"password"}
            onChange={handleChange}
            value={values.password}
            placeholder="Пароль"
            extraClass="mt-24"
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            error={status}
            disabled={(values.password && values.password.length < 6) || values.email && values.email.length < 1}
          >
            Войти
          </Button>
        </div>
        <div className={styles.additionalActions}>
          <h3 className="text text_type_main-small">
            Вы — новый пользователь?{" "}
            <Link className={styles.link} to="/register">
              Зарегистрироваться
            </Link>
          </h3>
          <h3 className="text text_type_main-small">
            Забыли пароль?
            <Link className={styles.link} to="/forgot-password">
              Восстановить пароль
            </Link>
          </h3>
        </div>
        <div className={styles.messageContaner}>
          {status === "loading" && (
            <span className={styles.loader}></span>
          )}
          {status === "rejected" && (
            <p className={`text text_type_main-medium ${styles.errorMessage}`}>
              Ошибка авторизации
            </p>
          )}
        </div>
      </form>
    </>
  );
}
