import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, useLocation, Outlet } from "react-router-dom";

const AppHeader = () => {
    const location = useLocation();

    return (
    <>
        <header className={styles.header}>
            <nav>
                <ul className={styles.nav}>
                    <li className={styles.nav_item_constructor}>
                        <NavLink className={({ isActive }) => isActive ? styles.active : styles.pending} to="/">
                            <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                            <span className="text text_type_main-default">Конструктор</span>
                        </NavLink>
                    </li>
                    <li className={styles.nav_item_order_feed}>
                        <NavLink className={({ isActive }) => isActive ? styles.active : styles.pending} to="/feed">
                            <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                            <span className="text text_type_main-default">Лента заказов</span>
                        </NavLink>
                    </li>
                    <li className={styles.logo}>
                        <Logo />
                    </li>
                    <li className={styles.nav_item_lk}>
                        <NavLink className={({ isActive }) => isActive ? styles.active : styles.pending} to="/profile">
                            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
                            <span className="text text_type_main-default">Личный кабинет</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
        <Outlet/>
    </>
    )
}
export default AppHeader;