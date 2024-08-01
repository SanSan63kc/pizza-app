import { Link } from "react-router-dom"
import styles from "./ProductCard.module.css"
import { ProductCardProps } from "./ProductCard.props"

function ProductCard({ id, title, description, image, price, rating }: ProductCardProps) {
    return (
        <Link to="/" className={styles["link"]}>
            <div className={styles["card"]}>
                <div className={styles["head"]} style={{ backgroundImage: `url("${image}")` }}>
                    <div className={styles["price"]}>
                        {price}&nbsp;
                        <span className={styles["currency"]}>Р</span>
                    </div>
                    <button className={styles["add-to-cart"]}>
                        <img className={styles["small-icon"]} src="/cart-button-icon.svg"></img>
                    </button>
                    <div className={styles["rating"]}>
                        {rating}&nbsp;
                        <img className={styles["small-icon"]} src="/star-icon.svg"></img>
                    </div>
                </div>
                <div className={styles["footer"]}>
                    <div className={styles["title"]}>
                        {title}
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