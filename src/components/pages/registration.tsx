import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./common.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { register, clearStatus } from "../../services/user";
import { useForm } from "../../hooks/useForm";
import { getUserDataFromStore } from "../../utils/utils";
import { TUserUpdateData } from "../../types/types"

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearStatus());
  }, [location]);

  const { values, handleChange } = useForm<TUserUpdateData>({ name: '', email: '', password: '' });

  const { status } = useSelector(getUserDataFromStore);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(register(values));
  }

  return (
    <>
      <form name="register" onSubmit={handleSubmit}>
        <div className={styles.login}>
          <h2 className="text text_type_main-medium">Регистрация</h2>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
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
        <div className={styles.messageContaner}>
          {status === "loading" && (
            <span className={styles.loader}></span>
          )}
          {status === "rejected" && (
            <p className={`text text_type_main-medium ${styles.errorMessage}`}>
              Ошибка при регистрации. Проверьте введенный email.
            </p>
          )}
          {status === "success" && (
            <Navigate to="/"></Navigate>
          )}
        </div>
      </form>
    </>
  );
}
