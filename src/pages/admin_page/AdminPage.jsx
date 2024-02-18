import style from "./AdminPage.module.css";
import { useState, useEffect } from "react";
import { useUser, useProducts, useFilters } from "../../store/store";
import { getAllProductsWithCategoryStructure } from "../../lib/request.js";
import PostProductForm from "../../components/post_product_form/PostProductForm.jsx";
import * as Icon from "react-bootstrap-icons";

export default function AdminPage() {
    const user = useUser(state => state.user);
    const setStructure = useProducts(state => state.setStructure);
    const setProducts = useProducts(state => state.setProducts);
    const setSubcategories = useFilters(state => state.setSubcategories);
    const setPriceMin = useFilters(state => state.setPriceMin);
    const setPriceMax = useFilters(state => state.setPriceMax);
    // PAGINATION
    const page = useFilters(state => state.page);
    const setPage = useFilters(state => state.setPage);
    const limit = useFilters(state => state.limit);
    const [numberOfPages, setNumberOfPages] = useState(1);

    useEffect(() => {
        if (user) {
            getAllProductsWithCategoryStructure(user.token).then(result => {
                if (result.data) {
                    setStructure(result.data.data.structure);
                    setSubcategories(result.data.data.subcategories);
                    setProducts(result.data.data.products);
                    setPriceMin(result.data.data.priceMin);
                    setPriceMax(result.data.data.priceMax);
                    setNumberOfPages(Math.ceil(result.data.data.length / limit));
                }
            });
        }
    }, []);

    return (
        <div className={style.container}>
            {user && user.status === "admin" ? (
                <div>
                    <div className={style.adminTitle}>admin</div>
                    <PostProductForm />
                </div>
            ) : (
                <div className={style.lockIconContainer}>
                    <Icon.PersonLock size={"200px"} />
                </div>
            )}
        </div>
    );
}
