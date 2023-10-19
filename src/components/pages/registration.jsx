import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { register } from "../../services/user";

export default function RegistrationPage() {
  const dispatch = useDispatch();

  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(form));
  }

  return (
    <>
      <form name="register" onSubmit={handleSubmit}>
        <div className={styles.login}>
          <h2 className="text text_type_main-medium">Регистрация</h2>

          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
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
            extraClass="mt-24"
          />
          <Button htmlType="submit" type="primary" size="large" >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.additionalActions}>
          <h3 className="text text_type_main-small">
            Уже зарегистрированы?
            <Link className={styles.link} to="/login">
              Войти
            </Link>
          </h3>
        </div>
      </form>
    </>
  );
}
