import { create } from "zustand";

export const useStateManagment = create(set => ({
    isOpenedNavBarDrawer: false,
    isOpenedSmartHomeCategory: false,
    isOpenedLifeStyleCategory: false,
    renderOfSearchPage: false,
    isOpenedSearchDrawer: false,
    isOpenedFilterDrawer: false,
    isActiveSubcategory: "",
    defaultOrderRadio: "",

    changeStatusOfNavBarDrawer: status => set(state => ({ isOpenedNavBarDrawer: status })),
    changeStatusOfSmartHomeCategory: status =>
        set(state => ({ isOpenedSmartHomeCategory: status })),
    changeStatusOfLifeStyleCategory: status =>
        set(state => ({ isOpenedLifeStyleCategory: status })),
    setRenderOfSearchPage: render => set({ renderOfSearchPage: render }),
    changeStatusOfSearchDrawer: status => set(state => ({ isOpenedSearchDrawer: status })),
    changeStatusOfFilterDrawer: status => set(state => ({ isOpenedFilterDrawer: status })),
    setActiveSubcategory: category => set({ isActiveSubcategory: category }),
    setDefaultOrderRadio: status => set({ defaultOrderRadio: status })
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
    products: null,
    error: null,

    setCategories: arr => set({ categories: arr }),
    setProducts: arr => set({ products: arr }),
    setError: message => set({ error: message })
}));

export const useFilters = create(set => ({
    search: "",
    subcategories: null, // массив
    priceMin: null, // чтобы отрисовывать в SLIDER, значение string выдает ошибку
    priceMax: null,
    order: "", // для request, null выдаст ошибку 406
    page: 1,
    limit: 8,

    setSearch: value => set({ search: value }),
    setSubcategories: value => set({ subcategories: value }),
    setPriceMin: value => set({ priceMin: value }),
    setPriceMax: value => set({ priceMax: value }),
    setOrder: value => set({ order: value }),
    setPage: value => set({ page: value }),
    setLimit: value => set({ limit: value })
}));
