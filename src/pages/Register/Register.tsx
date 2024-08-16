import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input";
import styles from "../Login/Login.module.css"
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
    email: {
        value: string
    },
    password: {
        value: string
    },
    name: {
        value: string
    }
}

export function Register() {
    let navigate = useNavigate()
    let dispatch = useDispatch<AppDispatch>()
    let { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user)

    useEffect(() => {
        if (jwt) {
            navigate("/")
        }
    }, [jwt, navigate])

    let submit = async (e: FormEvent) => {
        e.preventDefault()
        dispatch(userActions.clearRegisterError())
        let target = e.target as typeof e.target & RegisterForm
        let { email, password, name } = target
        dispatch(register({ email: email.value, password: password.value, name: name.value }))
    }

    return <div className={styles["login"]} >
        <Headling>Регистрация</Headling>
        {registerErrorMessage && <div className={styles["error"]}>{registerErrorMessage}</div>}
        <form className={styles["form"]} onSubmit={submit}>
            <div className={styles["field"]}>
                <label htmlFor="email">Ваш email</label>
                <Input id="email" name="email" placeholder="Email"></Input>
            </div>
            <div className={styles["field"]}>
                <label htmlFor="password">Ваш пароль</label>
                <Input id="password" name="password" type="password" placeholder="Пароль"></Input>
            </div>
            <div className={styles["field"]}>
                <label htmlFor="name">Ваше имя</label>
                <Input id="name" name="name" placeholder="Введите имя"></Input>
            </div>
            <Button appearence="big">Зарегистрироваться</Button>
        </form>
        <div className={styles["links"]}>
            <div>Есть аккаунт?</div>
            <Link to="/auth/login">Войти</Link>
        </div>
    </div>
}