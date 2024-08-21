import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import styles from "./Cart.module.css"

let DELIVERY_FEE = 169

export function Cart() {
    let [cartProducts, setCartProducts] = useState<Product[]>([])
    let items = useSelector((s: RootState) => s.cart.items)

    let total = items.length > 0 && items.map(i => {
        let product = cartProducts.find(p => p.id == i.id)
        if (!product) {
            return 0
        }
        return i.count*product.price
    }).reduce((acc, i)=>acc+i,0) || 0

    let getItem = async (id: number) => {
        let { data } = await axios.get<Product>(`${PREFIX}/products/${id}`)
        return data
    }

    let loadAllItems = async () => {
        let res = await Promise.all(items.map(i => getItem(i.id)))
        setCartProducts(res)
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
        <hr className={styles["hr"]}/>
        <div className={styles["line"]}>
            <div className={styles["text"]}>Доставка</div>
            <div className={styles["price"]}>{DELIVERY_FEE}<span>&nbsp;P</span></div>
        </div>
        <hr className={styles["hr"]}/>
        <div className={styles["line"]}>
            <div className={styles["text"]}>Итог</div>
            <div className={styles["price"]}>{total + DELIVERY_FEE}&nbsp;<span>P</span></div>
        </div>
        <hr className={styles["hr"]}/>
    </>
}