import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css"
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../../helpers/API";
import { LoginResponse } from "../../interfaces/auth.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

export function Login() {
    let [error, setError] = useState<string | null>()
    let navigate = useNavigate()
    let dispatch = useDispatch<AppDispatch>()

    let submit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)
        let target = e.target as typeof e.target & LoginForm
        let { email, password } = target
        console.log(email.value)
        console.log(password.value)
        await sendLogin(email.value, password.value)
    }

    let sendLogin = async (email: string, password: string) => {
        try {
            let { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                email,
                password
            })
            console.log(data)
            localStorage.setItem("jwt", data.access_token)
            dispatch(userActions.addJwt(data.access_token))
            navigate("/")
        } catch (e) {
            if (e instanceof AxiosError) {
                setError(e.response?.data.message)
            }
        }
    }

    return <div className={styles["login"]} >
        <Headling>Вход</Headling>
        {error && <div className={styles["error"]}>{error}</div>}
        <form className={styles["form"]} onSubmit={submit}>
            <div className={styles["field"]}>
                <label htmlFor="email">Ваш email</label>
                <Input id="email" name="email" placeholder="Email"></Input>
            </div>
            <div className={styles["field"]}>
                <label htmlFor="password">Ваш пароль</label>
                <Input id="password" name="password" type="password" placeholder="Пароль"></Input>
            </div>
            <Button appearence="big">Вход</Button>
        </form>
        <div className={styles["links"]}>
            <div>Нет аккаунта?</div>
            <Link to="/auth/register">Зарегистирироваться</Link>
        </div>
    </div>
}