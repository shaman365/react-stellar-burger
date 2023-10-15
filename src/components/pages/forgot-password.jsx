import React, { useCallback, useState } from "react";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../services/user";

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("forgotPassword: ", e);
    console.log("forgotPassword: ", form);
    dispatch(forgotPassword(form));
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
          onClick={handleSubmit}
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
    </div>
  );
}
