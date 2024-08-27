import { Await, useLoaderData } from "react-router-dom"
import { Product } from "../../interfaces/product.interface"
import { Suspense } from "react"
import styles from "./Product.module.css"

export function ProductPage() {

    /* id: number,
    name: string,
    price: number,
    ingredients: string[],
    image: string,
    rating: number */

    let data = useLoaderData() as { data: Product }
    return <>
        <Suspense fallback={"Загружаю"}>
            <Await
                resolve={data.data}
            >
                {({ data }: { data: Product }) => (
                    <div className={styles["productPage"]}>
                        {/* Имя товара */}
                        <div className={styles["title"]}>{data.name}</div>
                        {/* Картинка товара */}
                        <div className={styles["image"]}>
                            <img src={data.image}></img>
                        </div>
                        {/* Ингридиенты */}
                        <div className={styles["ingridients"]}>
                            Ингридиенты: {data.ingredients.join(", ")}
                        </div>
                        {/* Цена */}
                        <div className={styles["price"]}>
                            Цена - {data.price}
                        </div>
                        {/* Рейтинг */}
                        <div  className={styles["rating"]}>
                            Рейтинг - {data.rating}
                        </div>
                    </div>
                )}
            </Await>
        </Suspense>
    </>
}