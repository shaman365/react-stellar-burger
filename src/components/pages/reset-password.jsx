import React, { useCallback, useState } from "react";

import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/user";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ token: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("resetPassword: ", e);
    console.log("resetPassword: ", form);
    dispatch(resetPassword(form));
  }

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
        <Button htmlType="button" type="primary" size="large" onClick={handleSubmit} disabled={form.password.length < 6 || form.token.length < 1}>
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
    </div>
  );
}
