import { useDispatch, useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { AppDispatch, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "./Cart.module.css"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

let DELIVERY_FEE = 169

export function Cart() {
    let [cartProducts, setCartProducts] = useState<Product[]>([])
    let items = useSelector((s: RootState) => s.cart.items)
    let jwt = useSelector((s: RootState) => s.user.jwt)
    let navigate = useNavigate()
    let dispatch = useDispatch<AppDispatch>()

    let total = items.length > 0 && items.map(i => {
        let product = cartProducts.find(p => p.id == i.id)
        if (!product) {
            return 0
        }
        return i.count * product.price
    }).reduce((acc, i) => acc + i, 0) || 0

    let getItem = async (id: number) => {
        let { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
        return data
    }

    let loadAllItems = async () => {
        let res = await Promise.all(items.map(i => getItem(i.id)))
        setCartProducts(res)
    }

    let checkout = async () => {
        await axios.post(`${PREFIX}/order`,{
            products: items
        }, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        dispatch(cartActions.clean())
        navigate("/success")
    }

    useEffect(() => {
        loadAllItems()
        /* console.log(items) */
    }, [items])

    return <>
        <Headling className={styles["headling"]}>Корзина</Headling>
        {items.length > 0 && items.map(i => {
            let product = cartProducts.find(p => p.id == i.id)
            if (!product) {
                return
            }
            return <CartItem key={product.id} count={i.count} {...product} />
        })}
        {items.length === 0 && <div>Корзина пуста...</div>}
        <div className={styles["line"]}>
            <div className={styles["text"]}>Итог</div>
            <div className={styles["price"]}>{total}<span>&nbsp;P</span></div>
        </div>
        <hr className={styles["hr"]} />
        <div className={styles["line"]}>
            <div className={styles["text"]}>Доставка</div>
            <div className={styles["price"]}>{DELIVERY_FEE}<span>&nbsp;P</span></div>
        </div>
        <hr className={styles["hr"]} />
        <div className={styles["line"]}>
            <div className={styles["text"]}>Итог <span className={styles["total-count"]}>({items.length})</span></div>
            <div className={styles["price"]}>{total + DELIVERY_FEE}&nbsp;<span>P</span></div>
        </div>
        <hr className={styles["hr"]} />
        <div className={styles["checkout"]}>
            <Button appearence="big" onClick={checkout}>Оформить</Button>
        </div>
    </>
}