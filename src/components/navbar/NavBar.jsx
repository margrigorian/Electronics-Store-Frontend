import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useStateManagment, useUser, useFilters } from "../../store/store";
import NavBarDrawer from "../navbar_drawer/NavBarDrawer";
import * as Icon from "react-bootstrap-icons";

export default function NavBar() {
    const changeStatusDrawer = useStateManagment(state => state.changeStatusDrawer);
    const changeStatusOfSmartHomeCategory = useStateManagment(
        state => state.changeStatusOfSmartHomeCategory
    );
    const changeStatusOfLifeStyleCategory = useStateManagment(
        state => state.changeStatusOfLifeStyleCategory
    );

    // чтобы login форма отрисовывалась, а не висело сообщение об авторизации
    const setAuthenticationMessage = useUser(state => state.setAuthenticationMessage);
    // закрытие при переходах filterDrawer
    const setActiveSubcategory = useStateManagment(state => state.setActiveSubcategory);
    const changeStatusFilterDrawer = useStateManagment(state => state.changeStatusFilterDrawer);
    const setDefaultOrderRadio = useStateManagment(state => state.setDefaultOrderRadio);
    const setOrder = useFilters(state => state.setOrder);
    const setPage = useFilters(state => state.setPage);

    return (
        <div>
            <NavBarDrawer />
            <div className={style.navBar}>
                <div className={style.navbarList}>
                    <NavLink
                        to={"/"}
                        onClick={() => {
                            // filter param
                            setActiveSubcategory("");
                            changeStatusFilterDrawer(false);
                            setDefaultOrderRadio("");
                            setOrder("");
                            setPage(1);
                        }}
                        className={`${style.logo} ${style.cursor}`}
                    >
                        <div>T/</div>
                    </NavLink>

                    <div
                        className={style.category}
                        onMouseEnter={() => {
                            changeStatusDrawer(true);
                            changeStatusOfSmartHomeCategory(true);
                        }}
                        onMouseLeave={() => {
                            changeStatusDrawer(false);
                            changeStatusOfSmartHomeCategory(false);
                        }}
                        onClick={() => {
                            // filter param
                            setActiveSubcategory("");
                            changeStatusFilterDrawer(false);
                            setDefaultOrderRadio("");
                            setOrder("");
                            setPage(1);
                            // navbar drawer
                            changeStatusDrawer(false);
                        }}
                    >
                        SMART HOME
                    </div>
                    <NavLink to={"catalog/life-style"} className={style.category}>
                        <div
                            onMouseEnter={() => {
                                changeStatusDrawer(true);
                                changeStatusOfLifeStyleCategory(true);
                            }}
                            onMouseLeave={() => {
                                changeStatusDrawer(false);
                                changeStatusOfLifeStyleCategory(false);
                            }}
                            onClick={() => {
                                // filter param
                                setActiveSubcategory("");
                                changeStatusFilterDrawer(false);
                                setDefaultOrderRadio("");
                                setOrder("");
                                setPage(1);
                                // navbar drawer
                                changeStatusDrawer(false);
                            }}
                        >
                            LIFE STYLE
                        </div>
                    </NavLink>
                </div>
                <div className={style.navbarList}>
                    <div className={style.infoChapter}>discover</div>
                    <div className={style.infoChapter}>support</div>
                    <Icon.Search color={"black"} className={style.cursor} />
                    <Icon.PersonCircle size={20} color={"black"} className={style.cursor} />
                    <NavLink
                        to={"/authentication/login"}
                        onClick={() => {
                            // filter param
                            setActiveSubcategory("");
                            changeStatusFilterDrawer(false);
                            setDefaultOrderRadio("");
                            setOrder("");
                            setPage(1);
                            // ...
                            setAuthenticationMessage(null);
                        }}
                        className={style.loginIcon}
                    >
                        <Icon.BoxArrowInRight size={25} color={"black"} className={style.cursor} />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
