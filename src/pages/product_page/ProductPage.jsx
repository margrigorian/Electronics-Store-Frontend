import style from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts, useUser } from "../../store/store";
import { getProduct } from "../../lib/request";
import UserReview from "../../components/user_review/UserReview";
import Reviews from "../../components/reviews/Reviews";
import * as Icon from "react-bootstrap-icons";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";

export default function ProductPage() {
    const user = useUser(state => state.user);
    const { id } = useParams();
    const product = useProducts(state => state.product);
    const setProduct = useProducts(state => state.setProduct);
    const setError = useProducts(state => state.setError);
    const quantity = useProducts(state => state.quantity);
    const setQuantity = useProducts(state => state.setQuantity);
    const setUserRate = useProducts(state => state.setUserRate);

    useEffect(() => {
        makeRequest();
    }, []);

    function makeRequest() {
        getProduct(id).then(result => {
            if (result.data) {
                const data = result.data.data.product;
                console.log(data);
                setProduct(data);

                // если есть пользователь и есть оценки
                if (user && data.rates.length > 0) {
                    const rate = data.rates.find(el => el.user_id === user.id);
                    // ранее данная оценка товару текущим пользователем
                    if (rate) {
                        setUserRate(rate.rate);
                    } else {
                        // чтобы не отображалась стара оценка к другому товару
                        setUserRate(null);
                    }
                }
            } else {
                setError(result.error.message);
            }
        });
    }

    return (
        <div className={style.container}>
            {product ? (
                <div>
                    <div className={style.productContainer}>
                        <div className={style.imagesContainer}>
                            <img src={product.image} className={style.image} />
                            <img src={product.image} className={style.image} />
                        </div>
                        <div className={style.productDescription}>
                            <div>
                                <div className={style.title}>{product.title.toUpperCase()}</div>
                                <div className={style.priceAndRateContainer}>
                                    <div className={style.price}>{`$ ${product.price}`}</div>
                                    <div>
                                        {product.avgRating !== null ? (
                                            <div className={style.rateContainer}>
                                                <StarBorderPurple500Icon
                                                    sx={{
                                                        fontSize: "22px",
                                                        color: "rgb(6, 130, 171)"
                                                    }}
                                                />
                                                &nbsp;
                                                <div>{Number(product.avgRating).toFixed(1)}</div>
                                            </div>
                                        ) : (
                                            <StarBorderPurple500Icon
                                                sx={{
                                                    fontSize: "22px",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                                className={style.star}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={style.description}>{product.description}</div>
                                {product.quantity > 0 ? (
                                    <div className={style.quantityContainer}>
                                        <div className={style.quantityTitle}>Quantity</div>
                                        <button
                                            onClick={() => {
                                                setQuantity(quantity - 1);
                                            }}
                                            disabled={quantity > 1 ? "" : true}
                                            className={style.minusButton}
                                        >
                                            &ndash;
                                        </button>
                                        <div className={style.quantity}>{quantity}</div>
                                        <button
                                            onClick={() => {
                                                setQuantity(quantity + 1);
                                            }}
                                            disabled={quantity < product.quantity ? "" : true}
                                            className={style.plusButton}
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <div className={style.outOfStockText}>Product out of stock</div>
                                )}
                            </div>
                            <div>
                                {user === null ? (
                                    <div className={style.pleaseLoginText}>Please login</div>
                                ) : (
                                    ""
                                )}
                                <div className={style.addButtonContainer}>
                                    <button
                                        disabled={user && product.quantity > 0 ? "" : true}
                                        className={
                                            user ? style.addProductButton : style.disabledButton
                                        }
                                    >
                                        ADD TO BASKET
                                    </button>
                                    <div className={style.iconsContainer}>
                                        <Icon.Heart size={"18px"} className={style.cursor} />
                                        <Icon.Share size={"18px"} className={style.cursor} />
                                        <Icon.ChatSquareDots
                                            size={"20px"}
                                            className={style.cursor}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <UserReview getProduct={makeRequest} />
                    <Reviews makeRequest={makeRequest} />
                </div>
            ) : (
                <div className={style.loading}>Loading...</div>
            )}
        </div>
    );
}
