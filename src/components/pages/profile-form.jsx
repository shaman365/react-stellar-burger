import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "./pages.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser, updateUser, logout, clearStatus } from "../../services/user";
import styles from "./profile.module.css";

export default function ProfileForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [form, setValue] = useState({ email: "", password: "", name: "" });

    const [fieldDisabled, setDisabled] = useState({ name: "name", disabled: true, icon: "EditIcon" });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const { status, user } = useSelector((state) => state.user);

    const inputRef = React.createRef();

    useEffect(() => {
        dispatch(clearStatus());
        dispatch(getUser());
        setValue({ ...form, email: user.email, name: user.name });
    }, [location]);

    const handleSubmit = (e) => {
        console.log("handleSubmit form:", JSON.stringify(form));
        dispatch(updateUser(form))
    }

    const handleCancel = (e) => {
        dispatch(getUser());
        setValue({ ...form, email: user.email, name: user.name, password: "" });
    }

    const onIconClick = (e) => {
        setDisabled({ ...fieldDisabled, disabled: false });
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    const onBlur = (e) => {
        console.log("onBlur called: e.target: ", e.target);
        setDisabled({ ...fieldDisabled, disabled: true });
    }

    const handleLogout = (e) => {
        dispatch(logout());
        navigate("/");
    }

    return (

        <div className={styles.profileActions}>
            <form className={styles.profileFormFields}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChange}
                    value={form.name}
                    name={"name"}
                    icon={'EditIcon'}
                    onIconClick={onIconClick}
                    ref={inputRef}
                    onBlur={onBlur}
                    disabled={fieldDisabled.disabled}
                />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={"email"}
                    placeholder="Логин"
                    isIcon={true}
                />
                <PasswordInput
                    name={"password"}
                    value={form.password}
                    onChange={onChange}
                    icon={'EditIcon'}
                />
            </form>
            <div className={styles.profileButtonsContainer}>
                <Button
                    htmlType="button"
                    type="secondary"
                    size="large"
                    onClick={handleCancel}
                >
                    Отмена
                </Button>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    disabled={form.password.length < 6 || form.email.length < 1 || form.name.length < 1}
                >
                    Сохранить
                </Button>
            </div>
            <div className={commonStyles.messageContaner}>
                {status === "loading" && (
                    <span className={commonStyles.loader}></span>
                )}
                {status === "rejected" && (
                    <p className={`text text_type_main-medium ${commonStyles.errorMessage}`}>
                        Ошибка, попробуйте позже
                    </p>
                )}
                {status === "fulfilled" && (
                    <p className="text text_type_main-medium">
                        Данные успешно изменены
                    </p>
                )}
            </div>

        </div>)
}