import { create } from "zustand";

export const useStateManagment = create(set => ({
    isOpenedSmartHomeCategory: false,
    isOpenedLifeStyleCategory: false,
    isOpenedDrawer: false,

    changeStatusDrawer: status => set(state => ({ isOpenedDrawer: status })),

    changeStatusOfSmartHomeCategory: status =>
        set(state => ({ isOpenedSmartHomeCategory: status })),

    changeStatusOfLifeStyleCategory: status => set(state => ({ isOpenedLifeStyleCategory: status }))
}));
