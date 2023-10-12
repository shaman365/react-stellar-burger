import React, { useCallback, useState } from "react";
// import { Navigate } from 'react-router-dom';

import styles from "./profile.module.css";
import { Link } from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function ProfilePage() {
  const [value, setValue] = React.useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <AppHeader />

      <div className={styles.section}>
        <div className={styles.profileActionsContainer}>
          <nav>
            <ul className={styles.profileMenu}>
              <li className={styles.menuItemProfile}>
                <span className="text text_type_main-medium">Профиль</span>
              </li>
              <li className={styles.menuItemHistory}>
                <span className="text text_type_main-medium text_color_inactive">
                  История заказов
                </span>
              </li>
              <li className={styles.menuItemExit}>
                <span className="text text_type_main-medium text_color_inactive">Выход</span>
              </li>
              <li className={styles.profileNotion}>
                <span className="text text_type_main-default text_color_inactive">
                  В этом разделе вы можете изменить свои персональные данные
                </span>
              </li>
            </ul>
          </nav>
          <form className={styles.profileActions}>
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
            <PasswordInput name={"password"} />
          </form>
        </div>
      </div>
    </div>
  );
}
