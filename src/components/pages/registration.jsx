import React, { useCallback, useState } from "react";
// import { Navigate } from 'react-router-dom';

import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function RegistrationPage() {
  //   let auth = useAuth();

  //   const [form, setValue] = useState({ email: '', password: '' });

  //   const onChange = e => {
  //     setValue({ ...form, [e.target.name]: e.target.value });
  //   };

  //   let login = useCallback(
  //     e => {
  //       e.preventDefault();
  //       auth.signIn(form);
  //     },
  //     [auth, form]
  //   );

  //   if (auth.user) {
  //     return (
  //       <Navigate
  //         to={'/'}
  //       />
  //     );

  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <AppHeader />

      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
        />
        <PasswordInput name={"password"} extraClass="mt-24" />
        <Button htmlType="button" type="primary" size="large">
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
    </div>
  );
}
