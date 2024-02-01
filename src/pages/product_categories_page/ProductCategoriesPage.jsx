import style from "./ProductCategoriesPage.module.css";
import { useEffect } from "react";
import { useProducts } from "../../store/store";
import { getFeildOfApplicationCategories } from "../../lib/request";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function ProductCategoriesPage() {
    const categories = useProducts(state => state.categories);
    const setCategories = useProducts(state => state.setCategories);
    const setError = useProducts(state => state.setError);

    let currentPath = window.location.pathname;
    currentPath = currentPath.split("/");
    const category = currentPath[currentPath.length - 1];
    useEffect(() => {
        getFeildOfApplicationCategories(category).then(result => {
            if (result.data) {
                let data = result.data.data.categories;
                console.log(data);
                data = data.map(el => {
                    return { ...el, products: [...el.products, "All Product"] };
                });
                setCategories(data);
            } else {
                // необходимо ли отражать NOT FOUND, который не должен случиться?
                setError(result.error.message); // при наличии ошибки
            }
        });
    }, []);

    return (
        <div className={style.container}>
            {categories ? (
                // при индесации map i возникает ;, что ведет к ошибке
                categories.map(el => (
                    <div key={`categoryId-${Math.random()}`} className={style.categoryContainer}>
                        <div className={style.categoryName}>{el.category}</div>
                        <button className={style.moreButton}>More</button>
                        <div className={style.productsContainer}>
                            {el.products.map((item, i) =>
                                i !== el.products.length - 1 ? (
                                    <div key={`productId-${item.id}`} className={style.product}>
                                        <div className={style.productName}>{item.title}</div>
                                        <div className={style.slogan}>Description or slogan</div>
                                        <button className={style.learnMoreButton}>
                                            Learn more
                                        </button>
                                        <img src={item.image} className={style.image} />
                                    </div>
                                ) : (
                                    <div
                                        key={`productId-${Math.random()}`}
                                        className={style.allProductContainer}
                                    >
                                        <div>{item}</div>
                                        <button className={style.arrowButton}>
                                            <ArrowForwardIcon />
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className={style.loading}>Loading...</div>
            )}
        </div>
    );
}
