import { useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import styles from "./Menu.module.css"
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList";

export function Menu() {

    let [products, setProducts] = useState<Product[]>([])
    let [isLoading, setIsLoading] = useState<boolean>(false)
    let [error, setError] = useState<string | undefined>("")

    let getMenu = async () => {
        try {
            setIsLoading(true)
            
            let { data } = await axios.get<Product[]>(`${PREFIX}/products`)
            setProducts(data)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
            if (e instanceof AxiosError) {
                setError(e.message)
            }
            setIsLoading(false)
            return
        }
    }

    useEffect(() => {
        getMenu()
    }, [])

    //console.log("вытаскиваю данные", products)

    return <>
        <div className={styles["head"]}>
            <Headling>Меню</Headling>
            <Search placeholder="Введите блюдо или состав">
            </Search>
        </div>
        <div>
            {error && <>{error}</>}
            {!isLoading && <MenuList products={products}/>}
            {isLoading && <>Загружаем продукты...</>}
        </div>
    </>
}