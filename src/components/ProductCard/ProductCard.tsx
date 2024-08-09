import { Link } from "react-router-dom"
import styles from "./ProductCard.module.css"
import { ProductCardProps } from "./ProductCard.props"
import { MouseEvent } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { cartActions } from "../../store/cart.slice"

function ProductCard({ id, name, description, image, price, rating }: ProductCardProps) {

    let dispatch = useDispatch<AppDispatch>()

    let add = (e: MouseEvent) => {
        e.preventDefault()
        dispatch(cartActions.add(id))
    }

    return (
        <Link to={`/product/${id}`} className={styles["link"]}>
            <div className={styles["card"]}>
                <div className={styles["head"]} style={{ backgroundImage: `url("${image}")` }}>
                    <div className={styles["price"]}>
                        {price}&nbsp;
                        <span className={styles["currency"]}>Р</span>
                    </div>
                    <button className={styles["add-to-cart"]}  onClick={add}>
                        <img className={styles["small-icon"]} src="/cart-button-icon.svg"></img>
                    </button>
                    <div className={styles["rating"]}>
                        {rating}&nbsp;
                        <img className={styles["small-icon"]} src="/star-icon.svg"></img>
                    </div>
                </div>
                <div className={styles["footer"]}>
                    <div className={styles["title"]}>
                        {name}
                    </div>
                    <div className={styles["description"]}>
                        {description}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard