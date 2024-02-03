import style from "./ProductListPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateManagment, useProducts, useFilters } from "../../store/store";
import FilterDrawer from "../../components/filter_drawer/FilterDrawer";
import Product from "../../components/product/Product";
import { getProductList } from "../../lib/request";
import * as Icon from "react-bootstrap-icons";
import Pagination from "@mui/material/Pagination";

export default function ProductListPage() {
    // DRAWER
    const isActiveSubcategory = useStateManagment(state => state.isActiveSubcategory);
    const setActiveSubcategory = useStateManagment(state => state.setActiveSubcategory);
    const changeStatusFilterDrawer = useStateManagment(state => state.changeStatusFilterDrawer);
    // DEFAULT RADIO
    const setDefaultOrderRadio = useStateManagment(state => state.setDefaultOrderRadio);
    // PRODUCTS
    const products = useProducts(state => state.products);
    const setProducts = useProducts(state => state.setProducts);
    const error = useProducts(state => state.error);
    const setError = useProducts(state => state.setError);
    // FILTERS
    const { category } = useParams(); // передаем в запрос
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
    const [value, setValue] = useState(null);

    useEffect(() => {
        makeRequest("", "", order, page);
    }, [isActiveSubcategory, page, limit]);

    function makeRequest(min, max, orderType, p) {
        getProductList("", category, isActiveSubcategory, min, max, orderType, p, limit).then(
            result => {
                if (result.data) {
                    console.log(result.data.data);
                    setProducts(result.data.data.products);
                    setSubcategories(result.data.data.subcategories);
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
            <div className={style.categoryName}>{category}</div>
            <div className={style.subcategoryContainer}>
                <div
                    onClick={() => {
                        setActiveSubcategory("");
                        setOrder("");
                        setDefaultOrderRadio("");
                        setPage(1);
                    }}
                    className={
                        isActiveSubcategory === "" ? style.activeSubcategory : style.subcategory
                    }
                >
                    all
                </div>
                {subcategories
                    ? subcategories.map((el, i) => (
                          <div
                              key={`subcategoryId-${i}`}
                              onClick={() => {
                                  setActiveSubcategory(el.subcategory);
                                  setOrder("");
                                  setDefaultOrderRadio("");
                                  setPage(1);
                              }}
                              className={
                                  isActiveSubcategory === `${el.subcategory}`
                                      ? style.activeSubcategory
                                      : style.subcategory
                              }
                          >
                              {el.subcategory}
                          </div>
                      ))
                    : ""}
            </div>
            <div className={style.filterAndPaginationContainer}>
                <div
                    onClick={() => {
                        changeStatusFilterDrawer(true);
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
            <div className={style.productsContainer}>
                {products ? (
                    products.map(el => (
                        <Product
                            key={`productId-${el.id}`}
                            title={el.title}
                            price={el.price}
                            rate={el.rate}
                            image={el.image}
                        />
                    ))
                ) : (
                    <div className={style.loading}>Loading...</div>
                )}
            </div>
        </div>
    );
}
