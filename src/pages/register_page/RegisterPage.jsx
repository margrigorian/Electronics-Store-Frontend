import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import style from "./RegisterPage.module.css";

export default function RegisterPage() {
    const {
        register, // метод формы, который возвращает объект, поэтому деструкт. в самой форме
        formState: { errors }, // содержит разные св-ва
        watch,
        handleSubmit, // функия-обертка над нашим кастомным хэндлером - onSubmit, в случае ошибки не допустит отправку данных
        reset
    } = useForm({
        mode: "onBlur" // настройка режима: если убрать фокус с инпут, при ошибке сразу высветится коммент error
    });

    const onSubmit = data => {
        // наш хэндлер
        delete data.repeatedPassword; // убираем повторный пароля
        console.log(JSON.stringify(data));
        reset();
    };

    return (
        <div className={style.container}>
            <div className={style.registerTitle}>register</div>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <div className={style.inputContainer}>
                    <input
                        {...register("email", {
                            // делаем валидацию
                            required: "This field is required", // сообщение ошибки
                            pattern: {
                                value: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})/,
                                message: "Please enter a valid email" // сообщение ошибки
                            }
                        })}
                        placeholder="email address"
                        className={style.input}
                    />
                    <div className={style.error}>
                        {/* В объекте errors существует ошибка, связанная с ключом email */}
                        {errors?.email && <p>{errors?.email.message}</p>}
                    </div>
                </div>

                <div className={style.inputContainer}>
                    <input
                        {...register("username", {
                            required: "This field is required"
                        })}
                        placeholder="username"
                        className={style.input}
                        style={{ borderColor: errors?.username && "rgb(212, 31, 31)" }}
                    />
                    <div className={style.error}>
                        {errors?.username && <p>{errors?.username.message}</p>}
                    </div>
                </div>

                <div className={style.inputContainer}>
                    <input
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 5,
                                message: "Minimum of 5 characters"
                            }
                        })}
                        placeholder="password"
                        className={style.input}
                    />
                    <div className={style.error}>
                        {errors?.password && <p>{errors?.password.message}</p>}
                    </div>
                </div>

                <div className={style.inputContainer}>
                    <input
                        {...register("repeatedPassword", {
                            // делаем валидацию
                            required: "This field is required", // сообщение ошибки
                            validate: val => {
                                if (watch("password") !== val) {
                                    return "Your passwords do no match";
                                }
                            }
                        })}
                        placeholder="repeat password"
                        className={style.input}
                    />
                    <div className={style.error}>
                        {/* В объекте errors существует ошибка, связанная с ключом email */}
                        {errors?.repeatedPassword && <p>{errors?.repeatedPassword.message}</p>}
                    </div>
                </div>

                <div className={style.text}>
                    By registering, you agree to our <span className={style.spanText}>Terms</span>,
                    <span className={style.spanText}> Privacy Policy</span> and
                    <span> Cookie Policy</span>.
                </div>

                <button type="submit" className={style.button}>
                    Create account
                </button>
            </form>

            <div className={style.loginText}>
                Do you already have an account?&nbsp;
                <NavLink to="/login" className={style.loginNavlink}>
                    <span className={style.spanLogin}>Log in</span>
                </NavLink>
            </div>
        </div>
    );
}
