import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css"
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
    email: {
        value: string
    },
    password: {
        value: string
    }
}

export function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch<AppDispatch>()
    let { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user)

    useEffect(() => {
        if (jwt) {
            navigate("/")
        }
    }, [jwt, navigate])

    let submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearLoginError())
        let target = e.target as typeof e.target & LoginForm
        let { email, password } = target
        //console.log(email.value)
        //console.log(password.value)
        await sendLogin(email.value, password.value)
    }

    let sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }))
    }

    return <div className={styles["login"]} >
        <Headling>Вход</Headling>
        {loginErrorMessage && <div className={styles["error"]}>{loginErrorMessage}</div>}
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