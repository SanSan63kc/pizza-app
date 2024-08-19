import styles from "./CartItem.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { cartActions } from "../../store/cart.slice"
import { CartItemProps } from "./CartItem.props"

function CartItem(props: CartItemProps) {

    let dispatch = useDispatch<AppDispatch>()

    let increase = () => {
        dispatch(cartActions.add(props.id))
    }

    let descrease = () => {
        dispatch(cartActions.remove(props.id))
    }

    let remove = () => {
        dispatch(cartActions.delete(props.id))
    }

    return (
        <div className={styles["item"]}>
            <div className={styles["image"]} style={{ backgroundImage: `url("${props.image}")` }}></div>
            <div className={styles["description"]}>
                <div className={styles["name"]}>{props.name}</div>
                <div className={styles["price"]}>{props.price}&nbsp;Р</div>
            </div>
            <div className={styles["actions"]}>
                <button className={styles["button"]} onClick={descrease}>
                    <img className={styles["small-icon"]} src="/minus.svg"></img>
                </button>
                <div className={styles["number"]}>{props.count}</div>
                <button className={styles["button"]} onClick={increase}>
                    <img className={styles["small-icon"]} src="/plus.svg"></img>
                </button>
                <button className={styles["remove"]} onClick={remove}>
                    <img className={styles["small-icon"]} src="/cart-button-icon.svg"></img>
                </button>
            </div>

            {/* <div className={styles["rating"]}>

                <img className={styles["small-icon"]} src="/star-icon.svg"></img>
            </div> */}
        </div>
    )
}

export default CartItem