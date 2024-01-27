import React from "react";
import style from "./NavBar.module.css";
import { useStateManagment } from "../../store/store";
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

    return (
        <div>
            <NavBarDrawer />
            <div className={style.navBar}>
                <div className={style.navbarList}>
                    <div className={`${style.logo} ${style.cursor}`}>T/</div>
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
                    >
                        SMART HOME
                    </div>
                    <div
                        className={style.category}
                        onMouseEnter={() => {
                            changeStatusDrawer(true);
                            changeStatusOfLifeStyleCategory(true);
                        }}
                        onMouseLeave={() => {
                            changeStatusDrawer(false);
                            changeStatusOfLifeStyleCategory(false);
                        }}
                    >
                        LIFE STYLE
                    </div>
                </div>
                <div className={style.navbarList}>
                    <div className={style.cursor}>discover</div>
                    <div className={style.cursor}>support</div>
                    <Icon.Search color={"black"} className={style.cursor} />
                    <Icon.PersonCircle size={20} color={"black"} className={style.cursor} />
                    <Icon.BoxArrowInRight size={25} color={"black"} className={style.cursor} />
                </div>
            </div>
        </div>
    );
}
