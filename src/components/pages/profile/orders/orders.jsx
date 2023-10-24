import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./orders.module.css";
import OrderCard from "../../../order-card/order-card"

export default function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <ul className={`${styles.orderList} custom-scroll`}>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
            <OrderCard/>
        </ul>
    )
}