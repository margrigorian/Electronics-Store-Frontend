import style from "./Reviews.module.css";
import { useUser, useProducts } from "../../store/store";
import { getProduct, deleteComment } from "../../lib/request";
import * as Icon from "react-bootstrap-icons";
import Rating from "@mui/material/Rating";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function Reviews({ makeRequest }) {
    const user = useUser(state => state.user);
    const product = useProducts(state => state.product);

    async function deleteUserCmment(commentId) {
        await deleteComment(product.id, commentId, user.token);
        makeRequest();
    }

    return (
        <div className={style.evaluationContainer}>
            <div>CUSTOMER REVIEWS</div>
            {product.comments.length > 0 ? (
                <div className={style.reviewsContainer}>
                    {product.comments.map((el, i) => (
                        <div key={`commentId-${el.comment_id}`} className={style.review}>
                            <div>
                                <div className={style.nameAndStarsContainer}>
                                    <div className={style.username}>{el.username}</div>
                                    {el.rate ? (
                                        <Rating
                                            name="read-only"
                                            key={`rateId-${Math.random()}`}
                                            value={el.rate}
                                            readOnly
                                            size="small"
                                            sx={{
                                                "& .MuiRating-iconFilled": {
                                                    color: "rgb(6, 130, 171)"
                                                }
                                            }}
                                        />
                                    ) : (
                                        <Rating
                                            name="read-only"
                                            value={null}
                                            size="small"
                                            readOnly
                                        />
                                    )}
                                </div>
                                <div className={style.comment}>{el.comment}</div>
                            </div>
                            <div className={style.fotterOfCommentContainer}>
                                <div>
                                    <Icon.HandThumbsUp className={style.handIcon} />
                                    <Icon.HandThumbsDown className={style.handIcon} />
                                </div>
                                {user ? (
                                    user.status === "admin" || el.user_id === user.id ? (
                                        <div
                                            onClick={() => {
                                                deleteUserCmment(el.comment_id);
                                            }}
                                            className={style.deleteCommentText}
                                        >
                                            Delete comment
                                        </div>
                                    ) : (
                                        ""
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={style.noReviewContainer}>
                    <DriveFileRenameOutlineIcon />
                    <div>NO REVIEWS</div>
                </div>
            )}
        </div>
    );
}
