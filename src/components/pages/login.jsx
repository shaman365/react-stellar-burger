import React, { useCallback, useState } from "react";

import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { login } from "../../services/user";

export default function LoginPage() {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  // let login = useCallback(
  //   (e) => {
  //     console.log("login: ", e);
  //     // e.preventDefault();
  //     console.log("login: ", form);
  //     dispatch(login(form));
  //   },
  //   [form]
  // );

  function handleSubmit(e) {
    console.log("login: ", e);
    // e.preventDefault();
    console.log("login: ", form);
    dispatch(login(form));
  }

  return (
    <>
      <AppHeader />
      <form name="login">
        <div className={styles.login}>
          <h2 className="text text_type_main-medium">Вход</h2>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={"email"}
            placeholder="Логин"
          />
          <PasswordInput
            name={"password"}
            onChange={onChange}
            value={form.password}
            placeholder="Логин"
            extraClass="mt-24"
          />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleSubmit}
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
      </form>
    </>
  );
}
