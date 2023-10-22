import { useNavigate } from "react-router-dom";

import styles from "./profile.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../../services/user";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [active, setActive] = useState(false);

  const handleLogout = (e) => {
    setActive(true);
    dispatch(logout());
    navigate("/");
  };

  return (
    <main className={styles.main}>
      <div className={styles.section}>
        <div className={styles.profileContainer}>
          <nav>
            <ul className={styles.profileMenu}>
              <li className={styles.menuItemProfile}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.pending
                  }
                  end
                  to="/profile"
                >
                  Профиль
                </NavLink>
              </li>
              <li className={styles.menuItemHistory}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.pending
                  }
                  end
                  to="orders"
                >
                  История заказов
                </NavLink>
              </li>
              <li className={styles.menuItemExit}>
                <span
                  className={active ? styles.active : styles.pending}
                  onClick={handleLogout}
                >
                  Выход
                </span>
              </li>
              <li className={styles.profileNotion}>
                <span
                  className={`text text_type_main-default text_color_inactive`}
                >
                  {location === "/profile"
                    ? "В этом разделе вы можете изменить свои персональные данные"
                    : location === "/profile/orders"
                    ? "В этом разделе вы можете просмотреть свою историю заказов"
                    : ""}
                </span>
              </li>
            </ul>
          </nav>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
