import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css"
import Button from "../../components/Button/Button";
import cn from "classnames"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {

    let navigate = useNavigate()
    let dispatch = useDispatch<AppDispatch>()
    let profile = useSelector((s:RootState)=> s.user.profile)

    useEffect(()=>{
        dispatch(getProfile())
    }, [dispatch])

    let logout = ()=>{
        dispatch(userActions.logout())
        navigate("/auth/login")
    }

    return <div className={styles["layout"]}>
        <div className={styles["sidebar"]}>
            {/* Профиль */}
            <div className={styles["user"]}>
                <img className={styles["avatar"]} src="/avatar.svg"></img>
                <div className={styles["name"]}>{profile?.name}</div>
                <div className={styles["email"]}>{profile?.email}</div>
            </div>

            <div className={styles["menu"]}>
                {/* Меню */}
                <NavLink className={({ isActive }) => cn(styles["link"], {
                    [styles.active]: isActive
                })} to="/">
                    <img className={styles["icon"]} src="/menu-icon.svg"></img>
                    Меню
                </NavLink>
                {/* Корзина */}
                <NavLink className={({ isActive }) => cn(styles["link"], {
                    [styles.active]: isActive
                })} to="/cart">
                    <img className={styles["icon"]} src="/cart-icon.svg"></img>
                    Корзина
                </NavLink>
            </div>
            {/* Кнопка выхода */}
            <Button className={styles["logout"]} onClick={logout}>
                <img className={styles["icon"]} src="/logout.svg"></img>
                Выход
            </Button>
        </div>
        <div className={styles["content"]}>
            <Outlet />
        </div>
    </div>
}