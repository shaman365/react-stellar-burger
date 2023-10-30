import { useEffect } from "react";
import styles from "./common.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login, clearStatus } from "../../services/user";
import { useForm } from "../../hooks/useForm";
import { isEmptyObj } from "../../utils/utils";
import { getUserDataFromStore } from "../../utils/utils";

export default function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { status } = useSelector(getUserDataFromStore);

  const { values, handleChange } = useForm({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  }

  useEffect(() => {
    dispatch(clearStatus());
  }, [location]);

  const isButtonDisabled = () => {
    if (isEmptyObj(values)) return true;
    if (!values.email || !values.password) return true;

    return values.password.length < 1 || values.email.length < 1
  }

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
            disabled={isButtonDisabled()}

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
