// import React, { useCallback, useState } from 'react';
// import { Navigate } from 'react-router-dom';

import styles from "./login.module.css";
import { Link } from 'react-router-dom';

// import { useAuth } from '../services/auth';
// import { Button } from '../components/button';
// import { Input } from '../components/input';
// import { PasswordInput } from '../components/password-input';

import AppHeader from "../app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function LoginPage() {
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

  return (
    <div className="section">
      <AppHeader />

      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          name={"email"}
          placeholder="E-mail"
          isIcon={true}          
        />
        <PasswordInput name={"password"} extraClass="mt-24" />
        <Button
          htmlType="button"
          type="primary"
          size="large"
        >
          Войти
        </Button>
      </div>  
      <div className={styles.additionalActions}>
        <h3 className="text text_type_main-small">Вы — новый пользователь? <Link className={styles.link} to="/register">Зарегистрироваться</Link></h3>
        <h3 className="text text_type_main-small">Забыли пароль? <Link className={styles.link} to="/forgot-password">Восстановить пароль</Link></h3>
      </div>
    </div>
  );
}
