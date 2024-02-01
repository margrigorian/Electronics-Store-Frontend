import React, { useState } from "react";
import style from "./NavBarDrawer.module.css";
import { NavLink } from "react-router-dom";
import { useStateManagment } from "../../store/store";
import { Drawer } from "@mui/material";
import * as Icon from "react-bootstrap-icons";
import KitchenIcon from "@mui/icons-material/Kitchen";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ElectricScooterIcon from "@mui/icons-material/ElectricScooter";
import SpaIcon from "@mui/icons-material/Spa";
import SportsMotorsportsOutlinedIcon from "@mui/icons-material/SportsMotorsportsOutlined";
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";

export default function SmartHomeDrawer() {
    const isOpenedSmartHomeCategory = useStateManagment(state => state.isOpenedSmartHomeCategory);
    const isOpenedLifeStyleCategory = useStateManagment(state => state.isOpenedLifeStyleCategory);
    const isOpenedDrawer = useStateManagment(state => state.isOpenedDrawer);

    const changeStatusDrawer = useStateManagment(state => state.changeStatusDrawer);
    const changeStatusOfSmartHomeCategory = useStateManagment(
        state => state.changeStatusOfSmartHomeCategory
    );
    const changeStatusOfLifeStyleCategory = useStateManagment(
        state => state.changeStatusOfLifeStyleCategory
    );

    return (
        <div>
            <Drawer
                anchor="top"
                open={isOpenedDrawer}
                disableScrollLock={true}
                sx={{ zIndex: "0" }}
            >
                {isOpenedSmartHomeCategory ? (
                    <div
                        className={style.drawerContent}
                        onMouseEnter={() => {
                            changeStatusDrawer(true);
                            changeStatusOfSmartHomeCategory(true);
                        }}
                        onMouseLeave={() => {
                            changeStatusDrawer(false);
                            changeStatusOfSmartHomeCategory(false);
                        }}
                    >
                        <div className={style.categoryContainer}>
                            <div className={style.iconContainer}>
                                <Icon.AspectRatio size={"45px"} />
                                <div className={style.categoryTitle}>TV & Media</div>
                            </div>
                            <div className={style.iconContainer}>
                                <Icon.DropletHalf size={"40px"} />
                                <div className={style.categoryTitle}>Vacuum Cleaner</div>
                            </div>
                            <div className={style.iconContainer}>
                                <Icon.Fan size={"40px"} />
                                <div className={style.categoryTitle}>Environment Aplliance</div>
                            </div>
                            <div className={style.iconContainer}>
                                <KitchenIcon sx={{ fontSize: "40px" }} />
                                <div className={style.categoryTitle}>Kitchen Aplliance</div>
                            </div>
                            <div className={style.iconContainer}>
                                <TipsAndUpdatesOutlinedIcon sx={{ fontSize: "45px" }} />
                                <div className={style.categoryTitle}>Illumination</div>
                            </div>
                            <div className={style.iconContainer}>
                                <Icon.Mouse2Fill size={"40px"} />
                                <div className={style.categoryTitle}>Smart Device</div>
                            </div>
                        </div>
                    </div>
                ) : isOpenedLifeStyleCategory ? (
                    <div
                        className={style.drawerContent}
                        onMouseEnter={() => {
                            changeStatusDrawer(true);
                            changeStatusOfLifeStyleCategory(true);
                        }}
                        onMouseLeave={() => {
                            changeStatusDrawer(false);
                            changeStatusOfLifeStyleCategory(false);
                        }}
                    >
                        <div className={style.categoryContainer}>
                            <NavLink
                                to={"catalog/life-style"}
                                onClick={() => {
                                    changeStatusDrawer(false);
                                }}
                                className={style.navlink}
                            >
                                <div className={style.iconContainer}>
                                    <Icon.Watch size={"45px"} />
                                    <div className={style.categoryTitle}>Wearable</div>
                                </div>
                            </NavLink>
                            <div className={style.iconContainer}>
                                <ElectricScooterIcon sx={{ fontSize: "50px" }} />
                                <div className={style.categoryTitle}>Vehicle</div>
                            </div>
                            <NavLink
                                to={"catalog/life-style"}
                                onClick={() => {
                                    changeStatusDrawer(false);
                                }}
                                className={style.navlink}
                            >
                                <div className={style.iconContainer}>
                                    <Icon.Display size={"50px"} />
                                    <div className={style.categoryTitle}>Office</div>
                                </div>
                            </NavLink>
                            <div className={style.iconContainer}>
                                <SpaIcon sx={{ fontSize: "50px" }} />
                                <div className={style.categoryTitle}>Personal Care</div>
                            </div>
                            <div className={style.iconContainer}>
                                <SportsMotorsportsOutlinedIcon sx={{ fontSize: "55px" }} />
                                <div className={style.categoryTitle}>Sport</div>
                            </div>
                            <div className={style.iconContainer}>
                                <CableOutlinedIcon sx={{ fontSize: "50px" }} />
                                <div className={style.categoryTitle}>Accessories</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </Drawer>
        </div>
    );
}
