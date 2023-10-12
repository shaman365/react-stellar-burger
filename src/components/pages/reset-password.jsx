import React, { useCallback, useState } from 'react';
// import { Navigate } from 'react-router-dom';

import styles from "./pages.module.css";
import { Link } from "react-router-dom";

// import { useAuth } from '../services/auth';
// import { Button } from '../components/button';
// import { Input } from '../components/input';
// import { PasswordInput } from '../components/password-input';

import AppHeader from "../app-header/app-header";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ResetPasswordPage() {
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

  const [value, setValue] = React.useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <AppHeader />

      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput name={"password"} extraClass="mt-24" />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button htmlType="button" type="primary" size="large">
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
