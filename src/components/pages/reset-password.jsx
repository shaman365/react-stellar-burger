import { useState } from "react";
import styles from "./pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import api from "../../utils/api";
import { useForm } from "../../hooks/useForm";


export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({});

  useEffect(() => {
    if (!localStorage.getItem("isResetRequested")) {
      navigate('/')
    }
  }, []);


  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading")
    api.reset(values).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.removeItem("isResetRequested");
      navigate("/login");
      e.preventDefault();
    })
      .catch(error => {
        console.error("forgotPassword error: ", error);
        setStatus("rejected")
      })
  };

  return (
    <div>
      <form className={styles.login} name="reset-password" onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          name={"password"}
          onChange={handleChange}
          value={values.password}
          extraClass="mt-24"
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.token}
          name={"token"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="large"
          disabled={values.password.length < 6 || values.token.length < 1}
        >
          Сохранить
        </Button>
      </form>

      <div className={styles.additionalActions}>
        <h3 className="text text_type_main-small">
          Вспомнили пароль?
          <Link className={styles.link} to="/register">
            Войти
          </Link>
        </h3>
      </div>
      <div className={styles.messageContaner}>
        {status === "loading" && <span className={styles.loader}></span>}
        {status === "rejected" && (
          <p className={`text text_type_main-medium ${styles.errorMessage}`}>Ошибка. Проверьте введенный код и попробуйте еще раз.</p>
        )}
      </div>
    </div>
  );
}
