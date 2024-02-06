import style from "./SearchPage.module.css";
import { useState, useEffect } from "react";
import { useStateManagment, useFilters, useProducts } from "../../store/store";
import { getSearchProductList } from "../../lib/request";
import FilterDrawer from "../../components/filter_drawer/FilterDrawer";
import Product from "../../components/product/Product";
import * as Icon from "react-bootstrap-icons";
import Pagination from "@mui/material/Pagination";

export default function SearchPage() {
    // рендеринг Search Page
    const renderOfSearchPage = useStateManagment(state => state.renderOfSearchPage);
    // DRAWER
    const changeStatusOfFilterDrawer = useStateManagment(state => state.changeStatusOfFilterDrawer);
    // DEFAULT RADIO
    const setDefaultOrderRadio = useStateManagment(state => state.setDefaultOrderRadio);
    // PRODUCTS
    const products = useProducts(state => state.products);
    const setProducts = useProducts(state => state.setProducts);
    const error = useProducts(state => state.error);
    const setError = useProducts(state => state.setError);
    // FILTERS
    const search = useFilters(state => state.search);
    const isActiveSubcategory = useStateManagment(state => state.isActiveSubcategory);
    const setActiveSubcategory = useStateManagment(state => state.setActiveSubcategory);
    // c backend для отрисовки на front
    const subcategories = useFilters(state => state.subcategories);
    const setSubcategories = useFilters(state => state.setSubcategories);
    const setPriceMin = useFilters(state => state.setPriceMin);
    const setPriceMax = useFilters(state => state.setPriceMax);
    const order = useFilters(state => state.order);
    const setOrder = useFilters(state => state.setOrder);
    const page = useFilters(state => state.page);
    const setPage = useFilters(state => state.setPage);
    const limit = useFilters(state => state.limit);
    // PAGINATION
    const [numberOfPages, setNumberOfPages] = useState(1);

    useEffect(() => {
        makeRequest("", "", order);
    }, [renderOfSearchPage, isActiveSubcategory, page, limit]);

    function makeRequest(min, max, orderType) {
        getSearchProductList(search, isActiveSubcategory, min, max, orderType, page, limit).then(
            result => {
                if (result.data && result.data.data.products.length > 0) {
                    setProducts(result.data.data.products);
                    const subcategoriesArr = result.data.data.subcategories;
                    setSubcategories(subcategoriesArr);
                    // если сабкатегория одна, сразу ее устанавливаем
                    // будет использоваться только при filterDrawer
                    // subcategories не сразу преобразуется, поэтому условие единожды сработает
                    if (subcategoriesArr.length === 1 && subcategories === null) {
                        setActiveSubcategory(subcategoriesArr[0]);
                    }

                    setPriceMin(result.data.data.priceMin);
                    setPriceMax(result.data.data.priceMax);
                    setNumberOfPages(Math.ceil(result.data.data.length / limit));
                } else {
                    setError(result.error.message);
                }
            }
        );
    }

    return (
        <div className={style.container}>
            <FilterDrawer makeRequest={makeRequest} />
            <div className={style.resultTitle}>
                {search ? `SEARCH RESULTS FOR ${search.toUpperCase()}` : "PRODUCTS"}
            </div>
            {subcategories ? (
                <div>
                    <div className={style.filterAndPaginationContainer}>
                        <div
                            onClick={() => {
                                changeStatusOfFilterDrawer(true);
                            }}
                            className={style.filterContainer}
                        >
                            <Icon.Sliders2 size={"18px"} />
                            <div className={style.filterTitle}>FILTER AND ORDER</div>
                        </div>
                        <Pagination
                            count={numberOfPages}
                            page={page}
                            onChange={(evt, num) => setPage(num)}
                        />
                    </div>

                    <div className={style.resultContainer}>
                        {subcategories.length > 1 ? (
                            <div className={style.subcategoriesContainer}>
                                <div
                                    onClick={() => {
                                        setActiveSubcategory("");
                                        setOrder("");
                                        setDefaultOrderRadio("");
                                        setPage(1);
                                    }}
                                    className={
                                        isActiveSubcategory === ""
                                            ? style.activeSubcategory
                                            : style.subcategory
                                    }
                                >
                                    ALL
                                </div>
                                {subcategories.map((el, i) => (
                                    <div
                                        key={`subcategoryId-${i}`}
                                        onClick={() => {
                                            setActiveSubcategory(el);
                                            setOrder("");
                                            setDefaultOrderRadio("");
                                            setPage(1);
                                        }}
                                        className={
                                            isActiveSubcategory === `${el}`
                                                ? style.activeSubcategory
                                                : style.subcategory
                                        }
                                    >
                                        {el.toUpperCase()}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // в случае одной категории
                            <div className={style.subcategoriesContainer}>
                                <div className={style.activeSubcategory}>
                                    {subcategories[0].toUpperCase()}
                                </div>
                            </div>
                        )}
                        <div className={style.productsContainer}>
                            <div className={style.secondProductsContainer}>
                                {products.map(el => (
                                    <div key={`productId-${el.id}`} className={style.product}>
                                        <Product
                                            title={el.title}
                                            price={el.price}
                                            rate={el.rate}
                                            image={el.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>No result</div>
            )}
        </div>
    );
}
