import style from "./PostProductForm.module.css";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useUser, useProducts } from "../../store/store";
import { postProduct } from "../../lib/request";
import SelectedCategoriesInputs from "../selected_categories_inputs/SelectedCategoriesInputs";

export default function PostProductForm() {
    const user = useUser(state => state.user);
    // SELECT
    const selectedFieldOfApplication = useProducts(state => state.selectedFieldOfApplication);
    const setSelectedFieldOfApplication = useProducts(state => state.setSelectedFieldOfApplication);
    const selectedCategory = useProducts(state => state.selectedCategory);
    const setSelectedCategory = useProducts(state => state.setSelectedCategory);
    const selectedSubcategory = useProducts(state => state.selectedSubcategory);
    const setSelectedSubcategory = useProducts(state => state.setSelectedSubcategory);
    // IMAGE
    const [selectedImage, setSelectedImage] = useState("");
    const imagePicker = useRef(null);

    const {
        register, // метод формы, который возвращает объект, поэтому деструкт. в самой форме
        setValue,
        formState: { errors }, // содержит разные св-ва
        watch,
        handleSubmit, // функия-обертка над нашим кастомным хэндлером - onSubmit, в случае ошибки не допустит отправку данных
        reset
    } = useForm({
        mode: "onBlur" // настройка режима: если убрать фокус с инпут, при ошибке сразу высветится коммент error
    });

    const onSubmit = async data => {
        // const form = document.getElementById("form");
        // const formData = new FormData(form);
        // formData.append("image", data.image);
        await postProduct(data, user.token).then(result => console.log(result));
        setSelectedImage(null);
        setSelectedFieldOfApplication("");
        setSelectedCategory("");
        setSelectedSubcategory("");
        reset();
    };

    return (
        <div className={style.container}>
            <div className={style.formContainer}>
                <div
                    className={style.imageContainer}
                    onClick={() => {
                        // через ref сработает клик на image input
                        imagePicker.current.click();
                    }}
                    style={{
                        border: errors?.image && "1px solid rgb(212, 31, 31)",
                        boxShadow: errors?.image && "none"
                    }}
                >
                    {selectedImage ? (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            className={style.uploadImage}
                        />
                    ) : (
                        <div className={style.defaultImage}></div>
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form} id="form">
                    <div>
                        <div className={style.inputContainer}>
                            <input
                                {...register("title", {
                                    // делаем валидацию
                                    required: "This field is required" // сообщение ошибки
                                })}
                                placeholder="Title"
                                style={{
                                    borderBottom: errors?.title && "1px solid rgb(212, 31, 31)",
                                    boxShadow: errors?.title && "none"
                                }}
                                className={style.titleInput}
                            />
                            <div className={style.error}>
                                {/* В объекте errors существует ошибка, связанная с ключом title */}
                                {errors?.title && <p>{errors?.title.message}</p>}
                            </div>
                        </div>

                        <div className={style.textareaContainer}>
                            <textarea
                                className={style.description}
                                {...register("description", {
                                    // делаем валидацию
                                    required: "This field is required" // сообщение ошибки
                                })}
                                placeholder="Description"
                                style={{
                                    border: errors?.description && "1px solid rgb(212, 31, 31)",
                                    boxShadow: errors?.description && "none"
                                }}
                            ></textarea>
                        </div>
                    </div>

                    <div className={style.selectContainer}>
                        {/* SELECT */}
                        <SelectedCategoriesInputs register={register} errors={errors} />

                        {/* ДЛЯ  ЗАГРУЗКИ ИЗОБРАЖЕНИЯ */}
                        <div className={style.imageInputContainer}>
                            <input
                                {...register("image", {
                                    // делаем валидацию
                                    required: "This field is required" // сообщение ошибки
                                })}
                                type="file"
                                accept="image/*,.png,.jpeg,.jpg"
                                className={style.hiddenImageInput}
                                ref={imagePicker}
                                onChange={evt => {
                                    // проверка для исключения ошибки
                                    if (evt.target.files[0]) {
                                        setSelectedImage(evt.target.files[0]);
                                        setValue("image", evt.target.files[0]);
                                    }
                                }}
                            />
                        </div>
                        <div className={style.quantityAndPriceContainer}>
                            <div>
                                <input
                                    {...register("quantity", {
                                        // делаем валидацию
                                        required: "This field is required" // сообщение ошибки
                                    })}
                                    placeholder="0"
                                    className={style.quantitativeWindow}
                                />
                                <div
                                    className={style.inputLabel}
                                    style={{ color: errors?.quantity && "rgb(212, 31, 31)" }}
                                >
                                    Quantity
                                </div>
                            </div>
                            <div>
                                <input
                                    {...register("price", {
                                        // делаем валидацию
                                        required: "This field is required" // сообщение ошибки
                                    })}
                                    placeholder="0"
                                    className={style.quantitativeWindow}
                                />
                                <div
                                    className={style.inputLabel}
                                    style={{ color: errors?.price && "rgb(212, 31, 31)" }}
                                >
                                    Price
                                </div>
                            </div>
                        </div>
                        <div className={style.buttonsContainer}>
                            <button
                                type="button"
                                className={style.resetButton}
                                onClick={() => {
                                    setSelectedImage("");
                                    setSelectedFieldOfApplication("");
                                    setSelectedCategory("");
                                    setSelectedSubcategory("");
                                    reset();
                                }}
                            >
                                RESET
                            </button>
                            <button
                                type="submit"
                                className={style.addButton}
                                // без доп. настройки срабатывает с ошибкой,
                                // так как не было непосредственно клика на input
                                onClick={() => {
                                    // if (selectedImage) setValue("image", selectedImage);
                                    // setValue("image", selectedImage);
                                    setValue("feildOfApplication", selectedFieldOfApplication);
                                    setValue("category", selectedCategory);
                                    setValue("subcategory", selectedSubcategory);
                                }}
                            >
                                ADD PRODUCT
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
