import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser, updateUser, logout, clearStatus } from "../../services/user";
import styles from "./orders.module.css";

export default function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            <p className="text text_type_main-large">Orders is under construction</p>

        </div>
    )
}