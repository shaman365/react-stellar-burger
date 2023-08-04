import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './app-header.module.css';

const AppHeader = () => {
    return (
        <>
            <header className={appHeader.header}>
                <nav>
                    <ul className={appHeader.navList}>
                        <li className={appHeader.navItem}>
                            <BurgerIcon type="primary"/>
                            <h3 className="text text_type_main-default">Конструктор</h3>
                        </li>
                        <li className={appHeader.navItem}>
                            <ListIcon type="secondary"/>
                            <h3 className="text text_type_main-default text_color_inactive">Лента заказов</h3>
                        </li>
                        <li className={appHeader.navLogp}>
                            <Logo/>
                        </li>
                        <li className={appHeader.navItem}>
                            <ProfileIcon type="secondary"/>
                            <h3 className="text text_type_main-default text_color_inactive">Личный кабинет</h3>
                        </li>
                    </ul>                
                </nav>
            </header>
        </>        
    )
    }
    

export default AppHeader;