import style from "./LoginPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { makeAuthorization } from "../../lib/request";
import { useUser } from "../../store/store";

export default function LoginPage() {
    const message = useUser(state => state.authenticationMessage);
    const setAuthenticationMessage = useUser(state => state.setAuthenticationMessage);
    const setUser = useUser(state => state.setUser);
    const setError = useUser(state => state.setError);

    const {
        register, // метод формы, который возвращает объект, поэтому деструкт. в самой форме
        formState: { errors }, // содержит разные св-ва
        watch,
        handleSubmit, // функия-обертка над нашим кастомным хэндлером - onSubmit, в случае ошибки не допустит отправку данных
        reset
    } = useForm({
        mode: "onBlur" // настройка режима: если убрать фокус с инпут, при ошибке сразу высветится коммент error
    });

    const onSubmit = async data => {
        // наш хэндлер
        const serverAnswer = await makeAuthorization(data);

        if (serverAnswer.data) {
            setAuthenticationMessage(serverAnswer.data.message);
            setUser(serverAnswer.data.user);
        } else {
            setError(serverAnswer.error.message); // при наличии ошибки
        }

        reset();
    };

    return (
        <div className={style.container}>
            <div className={style.loginTitle}>log in</div>
            {!message ? (
                <div>
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

                        <button type="submit" className={style.button}>
                            Log in
                        </button>
                    </form>

                    <div className={style.forgotPasswordText}>Forgot your password?</div>
                    <div className={style.registerText}>
                        Don`t have an account yet?
                        <NavLink
                            to="/authentication/register"
                            onClick={() => {
                                setAuthenticationMessage(null);
                            }}
                            className={style.registerNavlink}
                        >
                            <span className={style.spanText}> Register</span>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className={style.messageContainer}>{message}</div>
            )}
        </div>
    );
}
