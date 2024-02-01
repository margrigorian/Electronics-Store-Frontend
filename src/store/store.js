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

export const useUser = create(set => ({
    authenticationMessage: null,
    user: null,
    error: null,

    setAuthenticationMessage: text => set({ authenticationMessage: text }),
    setUser: obj => set({ user: obj }),
    setError: message => set({ error: message })
}));

export const useProducts = create(set => ({
    categories: null,
    error: null,

    setCategories: arr => set({ categories: arr }),
    setError: message => set({ error: message })
}));
