import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.nav}>
                    <li className={styles.nav_item_constructor}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default">Конструктор</p>
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
                        <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


export default AppHeader;