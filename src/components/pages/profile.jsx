import { useNavigate } from 'react-router-dom';

import styles from "./profile.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../services/user";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleLogout = (e) => {
    setActive(true);
    dispatch(logout());
    navigate("/");
  }

  return (
    <div className={styles.section}>
      <div className={styles.profileActionsContainer}>
        <nav>
          <ul className={styles.profileMenu}>
            <li className={styles.menuItemProfile}>
              <NavLink className={({ isActive }) =>
                isActive ? styles.active : styles.pending
              } end to="/profile"                 >
                Профиль
              </NavLink>

            </li>
            <li className={styles.menuItemHistory}>
              <NavLink className={({ isActive }) =>
                isActive ? styles.active : styles.pending
              } end to="orders">
                История заказов
              </NavLink>

            </li>
            <li className={styles.menuItemExit}>
              <span className={active ? styles.active : styles.pending} onClick={handleLogout}>
                Выход
              </span>

            </li>
            <li className={styles.profileNotion}>
              <span className={`text text_type_main-default text_color_inactive ${styles.dartText}`}>
                В этом разделе вы можете изменить свои персональные данные
              </span>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div >

  );
}
