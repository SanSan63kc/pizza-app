import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { Product } from "../../interfaces/product.interface";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX } from "../../helpers/API";

export function Cart() {
    let [cartProducts, setCartProducts] = useState<Product[]>([])
    let items = useSelector((s: RootState) => s.cart.items)

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
    }, [items, loadAllItems])

    return <>
        <Headling>Корзина</Headling>
        {items.map(i => {
            let product = cartProducts.find(p => p.id==i.id)
            if (!product){
                return 
            }
            return <CartItem count={i.count} {...product}/>
        })}
    </>
}