import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../../types/hooks";
import commonStyles from "../../common.module.css";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getUser, updateUser, clearStatus } from "../../../../services/user";
import styles from "./profile-form.module.css";
import { getUserDataFromStore } from "../../../../utils/utils";

export default function ProfileForm() {
    const dispatch = useAppDispatch();
    const location = useLocation();

    const [form, setValue] = useState({ email: "", password: "", name: "" });

    const [isVisible, setVisible] = useState(false);

    const [fieldDisabled, setDisabled] = useState({ name: "name", disabled: true, icon: "EditIcon" });

    const onChange = (e: React.FormEvent<HTMLInputElement> ) => {
        setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
        setVisible(true);
    };

    const { status, user } = useAppSelector(getUserDataFromStore);

    const inputRef = React.createRef();

    useEffect(() => {
        dispatch(clearStatus());
        dispatch(getUser());
        setValue({ ...form, email: user.email, name: user.name });
    }, [location]);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(updateUser(form));
        setVisible(false);
    }

    const handleCancel = (e) => {
        dispatch(clearStatus());
        dispatch(getUser());
        setValue({ ...form, email: user.email, name: user.name, password: "" });
        setVisible(false);
    }

    const onIconClick = (e) => {
        setDisabled({ ...fieldDisabled, disabled: false });
        setTimeout(() => inputRef.current?.focus(), 0);
    }

    const onBlur = (e) => {
        setDisabled({ ...fieldDisabled, disabled: true });
    }

    return (

        <div className={styles.profileActions}>
            <form className={styles.profileFormFields} onSubmit={handleSubmit}>
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

                <div className={styles.profileButtonsContainer}>
                    {isVisible &&
                        <>
                            <Button
                                htmlType="button"
                                type="secondary"
                                size="large"
                                onClick={handleCancel}
                            >
                                Отмена
                            </Button>
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                disabled={form.password.length < 6 || form.email.length < 1 || form.name.length < 1}
                            >
                                Сохранить
                            </Button>
                        </>
                    }
                </div>
            </form>
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