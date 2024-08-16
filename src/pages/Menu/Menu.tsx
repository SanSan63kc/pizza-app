import { ChangeEvent, useEffect, useState } from "react";
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
    let [filter, setFilter] = useState<string>("")

    useEffect(() => {
        getMenu(filter)
    }, [filter])

    let getMenu = async (name?: string) => {
        try {
            setIsLoading(true)

            let { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                params: {
                    name
                }
            })
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

    let updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value)
    }

    //console.log("вытаскиваю данные", products)

    return <>
        <div className={styles["head"]}>
            <Headling>Меню</Headling>
            <Search placeholder="Введите блюдо или состав" onChange={updateFilter}>
            </Search>
        </div>
        <div>
            {error && <>{error}</>}
            {!isLoading && products.length > 0 && <MenuList products={products} />}
            {!isLoading && products.length == 0 && <>Не найдено блюд по запросу</>}
            {isLoading && <>Загружаем продукты...</>}
        </div>
    </>
}

export default Menu