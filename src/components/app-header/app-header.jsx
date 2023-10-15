import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link } from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.nav}>
                    <li className={styles.nav_item_constructor}>
                        <BurgerIcon type="primary" />
                        <Link className={styles.link} to="/"><span className="text text_type_main-default">Конструктор</span></Link>
                    </li>
                    <li className={styles.nav_item_order_feed}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                    </li>
                    <li className={styles.logo}>
                        <Logo />
                    </li>
                    <li className={styles.nav_item_lk}>
                        <ProfileIcon type="secondary" />                        
                        <Link className={styles.link} to="/profile"><span className="text text_type_main-default text_color_inactive">Личный кабинет</span></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default AppHeader;