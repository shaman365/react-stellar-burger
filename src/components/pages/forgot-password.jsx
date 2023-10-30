import { useState } from "react";
import styles from "./common.module.css";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useForm } from "../../hooks/useForm";


export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({email: ''});

  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading")
    api
      .forgot(values)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("isResetRequested", true);
        navigate("/reset-password");
        e.preventDefault();
      })
      .catch((error) => {
        console.error("forgotPassword error: ", error);
        setStatus("rejected")
      });
  };

  return (
    <div className="section">
      <form className={styles.login} name="forgot-password" onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="submit"
          type="primary"
          name={"email"}
          size="large"
          disabled={values.email && values.email.length < 4}
        >
          Восстановить
        </Button>
      </form>
      <div className={styles.additionalActions}>
        <h3 className="text text_type_main-small">
          Вспомнили пароль?
          <Link className={styles.link} to="/login">
            Войти
          </Link>
        </h3>
      </div>
      <div className={styles.messageContaner}>
        {status === "loading" && <span className={styles.loader}></span>}
        {status === "rejected" && (
          <p className={`text text_type_main-medium ${styles.errorMessage}`}>Ошибка, попробуйте позже.</p>
        )}
      </div>
    </div>
  );
}
