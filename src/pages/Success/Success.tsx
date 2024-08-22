import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Success.module.css"

export function Success() {
    let navigate = useNavigate()
    return (
        <div className={styles["success"]}> 
            <img src="/product-demo.jsp"></img>
            <div className={styles["text"]}>Ваш заказ успешно оформлен</div>
            <Button appearence="big" onClick={()=>navigate("/")}>Сделать новый</Button>
        </div>

    )
}