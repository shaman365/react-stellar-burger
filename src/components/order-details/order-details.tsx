import styles from "./order-details.module.css";
import commonStyles from "../pages/common.module.css";
import orderAccept from "../../images/done.svg";
import { useAppSelector } from "../../types/hooks";
import { RootState, TOrderData } from "../../types/types";

const OrderDetails = () => {

  const { orderData } : {orderData: TOrderData}= useAppSelector((state: RootState) => state);
  const status = orderData?.status || "unknown";
  const orderNumber = orderData.order.number;

  return (
    <div className={styles.container}>
      {status === "loading" && (
        <>
          <p className="text text_type_main-medium mt-20 mb-30">
            Подождите, идёт оформление заказа
          </p>
          <span className={commonStyles.loaderOrderPending}></span>
        </>
      )}
      {status === "reject" && (
        <p className="text text_type_main-large mt-10 mb-30">
          Ошибка, попробуйте позже
        </p>
      )}
      {status === "fulfilled" && (
        <p className="text text_type_digits-large mt-30">{orderNumber}</p>
      )}
      {status === "unknown" && (
        <p className="text text_type_main-large mt-10 mb-30">
          Неизвестная ошибка
        </p>
      )}

      {status === "fulfilled" && (
        <>
          <p className="text text_type_main-medium mt-8">
            идентификатор заказа
          </p>
          <img className="mt-15" src={orderAccept} alt="Подтверждение заказа" />
          <p className="text text_type_main-default mt-15">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mb-30 mt-2">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
