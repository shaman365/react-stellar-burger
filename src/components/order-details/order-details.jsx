import styles from './order-details.module.css'
import orderAccept from '../../images/done.svg'

const OrderDetails = () => {
    return (
      <div className={styles.container}>
        <p className="text text_type_digits-large mt-30">
          034536
        </p>
        <p className="text text_type_main-medium mt-8">
          идентификатор заказа
        </p>
        <img className='mt-15' src={orderAccept} alt="Подтверждение заказа"/>
        <p className="text text_type_main-default mt-15">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mb-30 mt-2">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    )
  }

  export default OrderDetails