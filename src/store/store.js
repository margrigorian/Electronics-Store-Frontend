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
    renderOfAdminPage: false,

    changeStatusOfNavBarDrawer: status => set(state => ({ isOpenedNavBarDrawer: status })),
    changeStatusOfSmartHomeCategory: status =>
        set(state => ({ isOpenedSmartHomeCategory: status })),
    changeStatusOfLifeStyleCategory: status =>
        set(state => ({ isOpenedLifeStyleCategory: status })),
    setRenderOfSearchPage: render => set({ renderOfSearchPage: render }),
    changeStatusOfSearchDrawer: status => set(state => ({ isOpenedSearchDrawer: status })),
    changeStatusOfFilterDrawer: status => set(state => ({ isOpenedFilterDrawer: status })),
    setActiveSubcategory: category => set({ isActiveSubcategory: category }),
    setDefaultOrderRadio: status => set({ defaultOrderRadio: status }),
    setRenderOfAdminPage: render => set({ renderOfAdminPage: render })
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
    // для post/put, возможно нужно вынести отдельно
    structure: null,
    selectedFieldOfApplication: "",
    selectedCategory: "",
    selectedSubcategory: "",
    selectedImage: null,
    title: "",
    description: "",
    selectedQuantity: "",
    selectedPrice: "",
    // для отрисовки на странице ProductCategoriesPage
    categories: null,
    products: null, // arr
    product: null,
    // для страницы Admin Page, общее количество товаров в базе
    length: null,
    // для контроля выбора количества товара на Product Page
    quantity: 10,
    userRate: null,
    userComment: "",
    evaluation: null,
    error: null,

    // для post/put
    setStructure: obj => set({ structure: obj }),
    setSelectedFieldOfApplication: feild => set({ selectedFieldOfApplication: feild }),
    setSelectedCategory: category => set({ selectedCategory: category }),
    setSelectedSubcategory: subcategory => set({ selectedSubcategory: subcategory }),
    setSelectedImage: image => set({ selectedImage: image }),
    setTitle: text => set({ title: text }),
    setDescription: text => set({ description: text }),
    setSelectedQuantity: quantity => set({ selectedQuantity: quantity }),
    setSelectedPrice: price => set({ selectedPrice: price }),
    // PRODUCT LIST
    setCategories: arr => set({ categories: arr }),
    setProducts: arr => set({ products: arr }),
    setLength: number => set({ length: number }),
    // ДЛЯ Product Page
    setProduct: product => set({ product: product }),
    setQuantity: value => set({ quantity: value }),
    setUserRate: value => set({ userRate: value }),
    setEvaluation: action => set({ evaluation: action }),
    setUserComment: comment => set({ userComment: comment }),
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
